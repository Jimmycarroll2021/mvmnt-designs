"""Bounded input readers. Club records never leave this module."""

import csv
import hashlib
import json
import math
import re
import unicodedata
from collections import Counter
from datetime import date
from pathlib import Path

MAX_INPUT_BYTES = 10 * 1024 * 1024
MAX_ROWS = 20000
LOCATIONS = ("Australia", "Sydney", "Melbourne", "Brisbane", "Adelaide", "Perth", "Canberra", "Gold Coast")
METRIC_COLUMNS = ("keyword", "location", "volume", "cpc_aud", "competition", "source", "observed_at")


class InputError(ValueError):
    """Safe public error that contains no private record values."""


def normalize(value):
    value = unicodedata.normalize("NFKC", value).casefold()
    return " ".join(re.sub(r"[^\w\s]", " ", value).split())


def digest(path):
    checksum = hashlib.sha256()
    with Path(path).open("rb") as stream:
        for chunk in iter(lambda: stream.read(65536), b""):
            checksum.update(chunk)
    return checksum.hexdigest()


def checked_file(path, kind):
    path = Path(path)
    if not path.is_file():
        raise InputError(f"{kind}: supplied input is not a readable file")
    size = path.stat().st_size
    if not 0 < size <= MAX_INPUT_BYTES:
        raise InputError(f"{kind}: file must be nonempty and at most 10 MiB")
    return path


def read_csv(path, required, kind):
    path = checked_file(path, kind)
    try:
        with path.open(encoding="utf-8-sig", newline="") as stream:
            reader = csv.DictReader(stream, strict=True)
            fields = reader.fieldnames or []
            if len(fields) != len(set(fields)) or not set(required).issubset(fields):
                raise InputError(f"{kind}: missing required columns or duplicate headers")
            rows = []
            for index, row in enumerate(reader, 2):
                if index > MAX_ROWS + 1:
                    raise InputError(f"{kind}: exceeds 20000 data rows")
                if None in row or any(value is None for value in row.values()):
                    raise InputError(f"{kind}: malformed column count at row {index}")
                if any(len(value) > 20000 for value in row.values()):
                    raise InputError(f"{kind}: oversized field at row {index}")
                rows.append((index, row))
    except (UnicodeError, csv.Error) as exc:
        raise InputError(f"{kind}: invalid UTF-8 or CSV syntax") from exc
    if not rows:
        raise InputError(f"{kind}: no data rows")
    return rows


def read_clubs(path):
    """Return approved aggregate geography/tier counts, never names or contacts."""
    rows = read_csv(path, ("name", "city"), "clubs")
    cities, tiers, seen = Counter(), Counter(), set()
    duplicates = 0
    known = {normalize(city): city for city in LOCATIONS[1:]}
    unknown_cities = 0
    for index, row in rows:
        if not row["name"].strip() or not row["city"].strip():
            raise InputError(f"clubs: blank name or city at row {index}")
        key = (normalize(row["name"]), normalize(row["city"]))
        if key in seen:
            duplicates += 1
            continue
        seen.add(key)
        city = known.get(normalize(row["city"]))
        if city:
            cities[city] += 1
        else:
            unknown_cities += 1
        tier = row.get("tier", "").strip().upper()
        tiers[tier if tier in ("A", "B", "C") else "unknown"] += 1
    return {
        "input_rows": len(rows), "unique_clubs": len(seen), "duplicate_rows": duplicates,
        "city_counts": dict(sorted(cities.items())), "tier_counts": dict(sorted(tiers.items())),
        "unmapped_city_count": unknown_cities,
    }


def number(value, label, index, upper=None, integer=False):
    if not value.strip():
        return None
    try:
        result = float(value)
    except ValueError as exc:
        raise InputError(f"metrics: invalid {label} at row {index}") from exc
    if not math.isfinite(result) or result < 0 or (upper is not None and result > upper):
        raise InputError(f"metrics: out of range {label} at row {index}")
    if integer and not result.is_integer():
        raise InputError(f"metrics: {label} must be a whole number at row {index}")
    return int(result) if integer else result


def read_metrics(path):
    rows = read_csv(path, METRIC_COLUMNS, "metrics")
    values, duplicates = {}, 0
    for index, row in rows:
        if not row["keyword"].strip() or not row["location"].strip():
            raise InputError(f"metrics: blank keyword or location at row {index}")
        key = (normalize(row["keyword"]), normalize(row["location"]))
        source = row["source"].strip()
        # A short provider label is supported, not URLs, free-text notes or contacts.
        if not re.fullmatch(r"[A-Za-z][A-Za-z ._-]{0,79}", source):
            raise InputError(f"metrics: source must be a short provider label at row {index}")
        try:
            observed = date.fromisoformat(row["observed_at"].strip())
        except ValueError as exc:
            raise InputError(f"metrics: observed_at must be YYYY-MM-DD at row {index}") from exc
        if observed > date.today():
            raise InputError(f"metrics: future observed_at at row {index}")
        payload = {
            "volume": number(row["volume"], "volume", index, integer=True),
            "cpc_aud": number(row["cpc_aud"], "cpc_aud", index),
            "competition": number(row["competition"], "competition", index, upper=1),
            "source": source, "observed_at": observed.isoformat(),
        }
        if all(payload[key] is None for key in ("volume", "cpc_aud", "competition")):
            raise InputError(f"metrics: at least one metric is required at row {index}")
        if key in values:
            if values[key]["data"] != payload:
                raise InputError(f"metrics: conflicting duplicate keyword/location at row {index}")
            values[key]["source_refs"].append(f"metrics_csv:row:{index}")
            duplicates += 1
        else:
            values[key] = {"data": payload, "source_refs": [f"metrics_csv:row:{index}"]}
    return values, {"input_rows": len(rows), "unique_rows": len(values), "duplicate_rows": duplicates}


def read_config(path):
    path = checked_file(path, "config")
    try:
        config = json.loads(path.read_text(encoding="utf-8-sig"))
    except (UnicodeError, json.JSONDecodeError) as exc:
        raise InputError("config: invalid UTF-8 or JSON") from exc
    if not isinstance(config, dict) or config.get("schema_version") != "1.0":
        raise InputError("config: schema_version must be 1.0")
    locations = config.get("locations")
    if (not isinstance(locations, list) or not locations or
            any(not isinstance(city, str) or city not in LOCATIONS for city in locations)):
        raise InputError("config: locations must use supported Australian geography")
    config["locations"] = list(dict.fromkeys(locations))
    clusters = config.get("clusters")
    if not isinstance(clusters, list) or not 1 <= len(clusters) <= 20:
        raise InputError("config: requires 1 to 20 clusters")
    ids = set()
    for cluster in clusters:
        if not isinstance(cluster, dict):
            raise InputError("config: cluster must be an object")
        for field in ("id", "name", "buyer_role", "target_page"):
            if (not isinstance(cluster.get(field), str) or not cluster[field].strip()
                    or len(cluster[field]) > 200):
                raise InputError(f"config: cluster requires {field}")
        if not re.fullmatch(r"[a-z_]{1,40}", cluster["id"]) or cluster["id"] in ids:
            raise InputError("config: cluster ids must be unique lower-case identifiers")
        ids.add(cluster["id"])
        refs = cluster.get("source_refs", [])
        if (not isinstance(refs, list) or len(refs) > 20 or
                any(not isinstance(ref, str) or not re.fullmatch(r"[a-z_:]{1,100}", ref) for ref in refs)):
            raise InputError("config: source_refs must be safe strategy reference identifiers")
        if not re.fullmatch(r"/pages/[a-z0-9-]+", cluster["target_page"]):
            raise InputError("config: target_page must be a canonical /pages/ path")
        terms = cluster.get("terms")
        if not isinstance(terms, list) or not 1 <= len(terms) <= 100:
            raise InputError("config: each cluster requires 1 to 100 curated terms")
        for term in terms:
            if isinstance(term, dict) and isinstance(term.get("phrase"), str):
                term["phrase"] = term["phrase"].strip()
            if (not isinstance(term, dict) or not isinstance(term.get("phrase"), str)
                    or not re.fullmatch(r"[a-zA-Z][a-zA-Z '-]{2,139}", term["phrase"])
                    or not ("cycling" in normalize(term["phrase"]).split() or "gran fondo" in normalize(term["phrase"]))
                    or term.get("intent") not in ("transactional", "commercial_investigation")):
                raise InputError("config: invalid curated cycling phrase or commercial intent")
            term["phrase"] = normalize(term["phrase"])
        for field in ("buyer_pains", "proposed_sections", "evidence_needed"):
            if (not isinstance(cluster.get(field), list) or not 1 <= len(cluster[field]) <= 20 or
                    any(not isinstance(item, str) or not item.strip() or len(item) > 1000 for item in cluster[field])):
                raise InputError(f"config: cluster requires nonempty {field}")
        assumption = cluster.get("assumed_order_value_aud")
        if (not isinstance(assumption, dict) or
                any(type(assumption.get(key)) not in (int, float) for key in ("min", "max")) or
                not 0 <= assumption["min"] <= assumption["max"] < 10000000):
            raise InputError("config: invalid planning-only order value range")
    return config
