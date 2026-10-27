"""Curated candidate expansion and auditable, draft-only output."""

import argparse
import csv
import hashlib
import json
import math
import re
import shutil
import sys
import tempfile
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

from . import ENGINE_VERSION
from .inputs import InputError, digest, normalize, read_clubs, read_config, read_metrics

DEFAULT_CONFIG = Path(__file__).resolve().parents[2] / "config" / "custom_cycling" / "taxonomy.json"
OUTPUT_NAMES = ("opportunities.json", "opportunities.csv", "page_briefs.json")
FIELDS = ("id", "keyword", "cluster", "buyer_role", "intent", "location", "target_page",
          "priority_score", "score_components", "rationale", "source_refs", "evidence_status",
          "metrics", "requires_validation", "deal_value_assumption_aud")
EXCLUDED_CONTEXT = re.compile(r"\b(sewing|jobs?|replica|secondhand|second hand|used clothing)\b")
BASE_VALIDATIONS = [
    "Validate demand and commercial fit; a candidate is not measured search demand.",
    "Verify every product, price, minimum quantity, payment and delivery statement before publication.",
    "Human editorial approval required; no page publication or advertising action is authorised by this output.",
]


def score_candidate(intent, phrase, city, aggregates, metric):
    components = {
        "commercial_intent": 35 if intent == "transactional" else 28,
        "buyer_fit": 25,
        "product_specificity": min(15, 8 + len(phrase.split())),
        "aggregate_market_coverage": min(10, aggregates["city_counts"].get(city, 0) // 3),
        "imported_volume_signal": 0,
    }
    if metric and metric["volume"] is not None:
        components["imported_volume_signal"] = min(15, int(math.log10(1 + metric["volume"]) * 5))
    return components


def expand(config, aggregates, metrics):
    candidates = {}
    excluded, duplicate_candidates, matched_metrics = 0, 0, set()
    for cluster in config["clusters"]:
        for term_index, term in enumerate(cluster["terms"], 1):
            phrase = term["phrase"]
            if EXCLUDED_CONTEXT.search(phrase):
                excluded += 1
                continue
            for location in config["locations"]:
                # City variants express research geography, never a local office or affiliation.
                keyword = f"{phrase} {location.casefold()}"
                key = (normalize(keyword), normalize(location))
                refs = [f"taxonomy:{cluster['id']}:term:{term_index}"] + cluster.get("source_refs", [])
                city_count = aggregates["city_counts"].get(location, 0)
                if location != "Australia" and city_count:
                    refs.append(f"clubs_csv:aggregate_city:{normalize(location).replace(' ', '_')}")
                imported = metrics.get(key)
                metric = imported["data"] if imported else None
                if imported:
                    matched_metrics.add(key)
                    refs.extend(imported["source_refs"])
                if key in candidates:
                    duplicate_candidates += 1
                    candidates[key]["source_refs"] = sorted(set(candidates[key]["source_refs"] + refs))
                    continue
                components = score_candidate(term["intent"], phrase, location, aggregates, metric)
                validations = list(BASE_VALIDATIONS)
                if location != "Australia":
                    validations.append("Confirm service and delivery feasibility for this city; do not imply a local office, local club customer or affiliation.")
                if cluster["id"] in ("masters_aero", "club_stores"):
                    validations.append("Confirm proposed fit, performance or club-store capabilities with product and operating evidence.")
                if "zero float" in phrase or "no minimum" in phrase:
                    validations.append("This phrase contains an unverified offer hypothesis; confirm payment terms, order minimums, capacity and approval before making the claim.")
                rationale = [
                    f"Curated {term['intent'].replace('_', ' ')} phrase for {cluster['buyer_role']}.",
                    "Priority is a transparent planning heuristic, not revenue, conversion probability or keyword difficulty.",
                    "Buyer fit is assigned by the curated taxonomy; validate it with actual buyers.",
                    "Deal-value range is an unmeasured planning assumption in AUD, not historical sales or a forecast.",
                    "Campaign playbook references describe proposed messaging strategy, not verified product or operating proof.",
                ]
                if location != "Australia":
                    rationale.append(f"City has {city_count} unique clubs in the supplied source; this measures list coverage only, not search volume, customer relationships or service availability.")
                if metric:
                    rationale.append("Metrics were imported by the operator and have not been independently verified; their date and provenance are retained.")
                else:
                    rationale.append("No matching metrics supplied; volume, CPC and competition are unknown.")
                candidates[key] = {
                    "id": "kw_" + hashlib.sha256((key[0] + "|" + key[1]).encode()).hexdigest()[:16],
                    "keyword": keyword, "cluster": cluster["name"], "buyer_role": cluster["buyer_role"],
                    "intent": term["intent"], "location": location, "target_page": cluster["target_page"],
                    "priority_score": sum(components.values()), "score_components": components,
                    "rationale": rationale, "source_refs": sorted(refs),
                    "evidence_status": "candidate_with_imported_metrics" if metric else "unvalidated_hypothesis",
                    "metrics": metric, "requires_validation": validations,
                    "deal_value_assumption_aud": {**cluster["assumed_order_value_aud"], "status": "planning_assumption_not_measured"},
                }
    opportunities = sorted(candidates.values(), key=lambda item: (-item["priority_score"], item["keyword"], item["location"]))
    return opportunities, {
        "excluded_context_terms": excluded, "deduplicated_candidates": duplicate_candidates,
        "matched_metric_rows": len(matched_metrics), "unmatched_metric_rows": len(metrics) - len(matched_metrics),
    }


def build_briefs(opportunities, config):
    grouped, clusters = defaultdict(list), defaultdict(list)
    for opportunity in opportunities:
        grouped[opportunity["target_page"]].append(opportunity)
    for cluster in config["clusters"]:
        clusters[cluster["target_page"]].append(cluster)
    briefs = []
    for target, values in sorted(grouped.items()):
        national = [item for item in values if item["location"] == "Australia"]
        primary = (national or values)[0]["keyword"]
        relevant = clusters[target]
        def combined(field):
            return list(dict.fromkeys(item for cluster in relevant for item in cluster[field]))
        briefs.append({
            "target_page": target, "primary_keyword": primary,
            "secondary_keywords": [item["keyword"] for item in values if item["keyword"] != primary],
            "buyer_roles": list(dict.fromkeys(cluster["buyer_role"] for cluster in relevant)),
            "buyer_pains": combined("buyer_pains"), "proposed_sections": combined("proposed_sections"),
            "cta": "Request a custom cycling kit consultation and a confirmed quote.",
            "evidence_needed": combined("evidence_needed") + [
                "Validate topic demand and useful original buyer information before creating or revising a page.",
                "Check existing content and canonical coverage; avoid duplicate or doorway city pages.",
                "Confirm location coverage without implying an office, customer relationship or affiliation.",
            ],
            "publish_status": "draft_only", "review_required": True,
            "content_status": "research_brief_not_ready_to_publish",
            "source_refs": sorted(set(ref for cluster in relevant for ref in cluster.get("source_refs", []))),
            "locality_policy": "City variants are secondary research terms on one canonical topic page; no city or named-club pages are generated.",
            "deal_value_assumptions_aud": [
                {**cluster["assumed_order_value_aud"], "status": "planning_assumption_not_measured"}
                for cluster in relevant
            ],
        })
    return briefs


def write_json(path, payload):
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False, allow_nan=False) + "\n", encoding="utf-8")


def csv_value(value):
    if value is None:
        return ""
    if isinstance(value, (dict, list, bool)):
        return json.dumps(value, ensure_ascii=False, sort_keys=True, allow_nan=False)
    # Protect spreadsheets opening externally supplied provider labels/config text.
    text = str(value)
    return "'" + text if text.lstrip().startswith(("=", "+", "-", "@")) else text


def persist(output_dir, opportunities, briefs, manifest):
    target = Path(output_dir).absolute()
    if target.exists() and (not target.is_dir() or any(target.iterdir())):
        raise InputError("output: directory must be absent or empty; previous results are never overwritten")
    target.parent.mkdir(parents=True, exist_ok=True)
    stage = Path(tempfile.mkdtemp(prefix=".keyword-engine-", dir=target.parent))
    try:
        write_json(stage / "opportunities.json", opportunities)
        write_json(stage / "page_briefs.json", briefs)
        with (stage / "opportunities.csv").open("w", encoding="utf-8", newline="") as stream:
            writer = csv.DictWriter(stream, fieldnames=FIELDS)
            writer.writeheader()
            for opportunity in opportunities:
                writer.writerow({key: csv_value(opportunity[key]) for key in FIELDS})
        manifest["output_sha256"] = {name: digest(stage / name) for name in OUTPUT_NAMES}
        write_json(stage / "run_manifest.json", manifest)
        if target.exists():
            target.rmdir()  # Empty target only; never remove existing results.
        stage.rename(target)
    finally:
        if stage.exists():
            shutil.rmtree(stage)


def run(clubs_path, output_dir, metrics_path=None, config_path=DEFAULT_CONFIG):
    """Run local research once. No network, secrets, Shopify or advertising clients."""
    config = read_config(config_path)
    aggregates = read_clubs(clubs_path)
    metrics, metric_counts = read_metrics(metrics_path) if metrics_path else ({}, {"input_rows": 0, "unique_rows": 0, "duplicate_rows": 0})
    opportunities, generation_counts = expand(config, aggregates, metrics)
    if not opportunities:
        raise InputError("generation: no eligible candidates; no output was written")
    briefs = build_briefs(opportunities, config)
    warnings = [
        "All content is review-required draft research; not a Shopify import or publishing payload.",
        "Keyword candidates and deal values are hypotheses; missing metrics remain null, never invented.",
        "Club source contributes aggregate geography only; no club names, contacts, notes or affiliations are exported.",
        "Scoring: commercial intent (28/35) + curated buyer fit (25) + phrase specificity (up to 15) + club list city coverage (up to 10) + imported volume signal (up to 15).",
    ]
    if not metrics_path:
        warnings.append("No metrics CSV supplied; search volume, CPC and competition remain unknown.")
    if aggregates["duplicate_rows"]:
        warnings.append("Duplicate club name/city rows were counted once; no private identifiers are reported.")
    if aggregates["unmapped_city_count"]:
        warnings.append("Unmapped club cities excluded from locality coverage; only approved Australian metros are expanded.")
    if metric_counts["duplicate_rows"]:
        warnings.append("Identical duplicate metrics were deduplicated with combined row provenance.")
    if generation_counts["unmatched_metric_rows"]:
        warnings.append("Some metrics have no curated candidate match; they did not create arbitrary new keywords.")
    if generation_counts["deduplicated_candidates"]:
        warnings.append("Duplicate candidate keywords/locations merged; first curated mapping wins and all source references are retained.")
    input_metadata = {
        "clubs": {"sha256": digest(clubs_path), "row_count": aggregates["input_rows"]},
        "config": {"sha256": digest(config_path), "cluster_count": len(config["clusters"])},
        "metrics": {"sha256": digest(metrics_path), "row_count": metric_counts["input_rows"]} if metrics_path else None,
    }
    manifest = {
        "schema_version": "1.0", "engine_version": ENGINE_VERSION,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "status": "completed_draft_research", "no_network": True,
        "publish_status": "draft_only", "inputs": input_metadata,
        "input_hashes": {kind: metadata["sha256"] if metadata else None for kind, metadata in input_metadata.items()},
        "row_counts": {"clubs": aggregates["input_rows"], "metrics": metric_counts["input_rows"]},
        "club_aggregates": aggregates, "metrics_counts": metric_counts,
        "counts": {"opportunities": len(opportunities), "page_briefs": len(briefs), **generation_counts,
                   "by_cluster": dict(sorted(Counter(item["cluster"] for item in opportunities).items()))},
        "warnings": warnings,
        "held_for_review": [{"seed": "tour de cure team kit", "reason": "Branded user-supplied seed excluded from expansion pending relevance, rights and no-affiliation review; no partnership or endorsement is implied."}],
    }
    persist(output_dir, opportunities, briefs, manifest)
    return manifest


def parser():
    result = argparse.ArgumentParser(description="Generate local, review-only Australian custom cycling keyword opportunities and canonical page briefs. No publishing, network, outreach or spend.")
    result.add_argument("--clubs", required=True, type=Path, help="UTF-8 CSV: name,city required; tier optional. Private rows remain local; only aggregates are exported.")
    result.add_argument("--output-dir", required=True, type=Path, help="Explicit absent or empty output directory. Existing evidence is never overwritten.")
    result.add_argument("--metrics", type=Path, help="Optional CSV: keyword,location,volume,cpc_aud,competition,source,observed_at. Numeric blanks are unknown; competition is 0..1; dates YYYY-MM-DD; provider label only.")
    result.add_argument("--config", type=Path, default=DEFAULT_CONFIG, help="Optional curated taxonomy JSON; default config/custom_cycling/taxonomy.json.")
    return result


def main(argv=None):
    args = parser().parse_args(argv)
    try:
        manifest = run(args.clubs, args.output_dir, args.metrics, args.config)
    except InputError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2
    except OSError:
        print("ERROR: unable to read inputs or persist output; check file access and available disk space", file=sys.stderr)
        return 2
    print(json.dumps({"status": manifest["status"], "opportunities": manifest["counts"]["opportunities"],
                      "page_briefs": manifest["counts"]["page_briefs"], "no_network": True}))
    return 0
