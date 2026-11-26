"""
SEO route checks for the Next.js app (frontend/). Standard library only.

Run against a running server, for example:
    npm run build && npm run start          (in frontend/, with NEXT_PUBLIC_SITE_URL set)
    python scripts/test_seo_routes.py --base http://127.0.0.1:3000 --site-url https://mvmnt-designs.vercel.app

Checks:
  1. Every route in ROUTES returns 200 with a self-canonical (canonical == SITE_URL + path).
  2. An unknown slug returns 404 and is noindex.
  3. /robots.txt references SITE_URL in its Sitemap line (production) or disallows all (preview).
  4. /sitemap.xml lists only SITE_URL hosts and includes every route in ROUTES.
  5. Every route's FAQPage JSON-LD matches its visible FAQ exactly (homepage must have one).
  6. Every route has exactly one H1 and a unique <title> and meta description.
  7. Every title is at most 60 characters, every description at most 155, and no H1 ends on a dangling word.
Exit code 0 on pass, 1 on any failure.
"""

import argparse
import html
import json
import re
import sys
import urllib.error
import urllib.request

# Add each planned page here when its route ships.
ROUTES = [
    "/",
    "/web-design-canberra",
    "/medical-practice-website-design",
    "/branding-canberra",
    "/shopify-developer",
    "/pricing",
    "/work",
    "/privacy",
]
# Routes with no FAQ by design (portfolio and compliance pages): they must carry no FAQPage node.
NO_FAQ_ROUTES = {"/work", "/privacy"}
UNKNOWN = "/does-not-exist-xyz"
TITLE_MAX = 60
DESC_MAX = 155
# An H1 that ends on one of these words is an unfinished phrase (for example "Bespoke design for").
DANGLING = {"for", "of", "to", "with", "and", "the", "a"}


def fetch(url: str) -> tuple[int, str]:
    req = urllib.request.Request(url, headers={"User-Agent": "seo-route-check"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace")


def canonical_of(doc: str) -> str | None:
    for tag in re.findall(r"<link[^>]+>", doc):
        if re.search(r'rel="canonical"', tag):
            m = re.search(r'href="([^"]+)"', tag)
            return html.unescape(m.group(1)) if m else None
    return None


def norm(u: str) -> str:
    return u.rstrip("/") or u


def jsonld_nodes(doc: str) -> list[dict]:
    nodes: list[dict] = []
    for raw in re.findall(
        r'<script type="application/ld\+json"[^>]*>(.*?)</script>', doc, re.S
    ):
        data = json.loads(raw)
        nodes.extend(data.get("@graph", [data]) if isinstance(data, dict) else data)
    return nodes


def visible_faqs(doc: str) -> list[tuple[str, str]]:
    section = re.search(r'<section[^>]*id="questions".*?</section>', doc, re.S)
    if not section:
        return []
    pairs = re.findall(
        r"<summary[^>]*>(.*?)</summary>\s*<p[^>]*>(.*?)</p>", section.group(0), re.S
    )
    strip = lambda s: html.unescape(re.sub(r"<[^>]+>|<!-- -->", "", s)).strip()
    return [(strip(q), strip(a)) for q, a in pairs]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="http://127.0.0.1:3000")
    ap.add_argument("--site-url", default="https://mvmnt-designs.vercel.app")
    args = ap.parse_args()
    base, site = args.base.rstrip("/"), args.site_url.rstrip("/")
    failures: list[str] = []

    def check(ok: bool, msg: str) -> None:
        print(f"  [{'PASS' if ok else 'FAIL'}] {msg}")
        if not ok:
            failures.append(msg)

    print("1. Routes return 200 with a self-canonical")
    docs: dict[str, str] = {}
    for path in ROUTES:
        status, doc = fetch(base + path)
        docs[path] = doc
        canon = canonical_of(doc)
        check(status == 200, f"{path} status {status}")
        check(
            canon is not None and norm(canon) == norm(site + path),
            f"{path} canonical {canon}",
        )

    print("2. Unknown slug is a real 404")
    status, doc = fetch(base + UNKNOWN)
    check(status == 404, f"{UNKNOWN} status {status}")
    check(
        re.search(r'<meta name="robots" content="noindex', doc) is not None,
        f"{UNKNOWN} is noindex",
    )

    print("3. robots.txt")
    status, robots = fetch(base + "/robots.txt")
    check(status == 200, f"/robots.txt status {status}")
    preview = (
        re.search(r"^Disallow: /\s*$", robots, re.M) is not None
        and "Allow: /\n" not in robots
    )
    if preview:
        print(
            "  [INFO] non-production robots (disallow all); Sitemap line not expected"
        )
    else:
        check(f"Sitemap: {site}/sitemap.xml" in robots, "robots Sitemap uses SITE_URL")
        check(
            "Disallow: /api/" in robots and "Disallow: /studio/" in robots,
            "robots disallows /api/ and /studio/",
        )

    print("4. sitemap.xml")
    status, sm = fetch(base + "/sitemap.xml")
    locs = re.findall(r"<loc>(.*?)</loc>", sm)
    check(
        status == 200 and len(locs) > 0,
        f"/sitemap.xml status {status}, {len(locs)} URLs",
    )
    check(all(loc.startswith(site) for loc in locs), "every sitemap URL uses SITE_URL")
    for path in ROUTES:
        check(
            any(norm(loc) == norm(site + path) for loc in locs), f"sitemap lists {path}"
        )

    print("5. FAQ JSON-LD matches the visible FAQ")
    for path, doc in docs.items():
        faq_nodes = [n for n in jsonld_nodes(doc) if n.get("@type") == "FAQPage"]
        if path in NO_FAQ_ROUTES:
            check(len(faq_nodes) == 0, f"{path} has no FAQPage node (found {len(faq_nodes)})")
            continue
        check(
            len(faq_nodes) == 1, f"{path} has one FAQPage node (found {len(faq_nodes)})"
        )
        if faq_nodes:
            ld = [
                (q["name"], q["acceptedAnswer"]["text"])
                for q in faq_nodes[0]["mainEntity"]
            ]
            vis = visible_faqs(doc)
            check(len(vis) > 0, f"{path} visible FAQ found ({len(vis)} items)")
            check(ld == vis, f"{path} FAQPage questions/answers equal the visible FAQ")

    print("6. One H1, unique title and description")
    titles: dict[str, str] = {}
    descs: dict[str, str] = {}
    for path, doc in docs.items():
        h1s = re.findall(r"<h1[\s>]", doc)
        check(len(h1s) == 1, f"{path} has one H1 (found {len(h1s)})")
        t = re.search(r"<title>(.*?)</title>", doc, re.S)
        d = re.search(r'<meta name="description" content="([^"]*)"', doc)
        check(t is not None, f"{path} has a <title>")
        check(d is not None, f"{path} has a meta description")
        if t:
            titles.setdefault(html.unescape(t.group(1)), path)
        if d:
            descs.setdefault(html.unescape(d.group(1)), path)
    check(len(titles) == len(docs), f"titles unique ({len(titles)}/{len(docs)})")
    check(len(descs) == len(docs), f"descriptions unique ({len(descs)}/{len(docs)})")

    print("7. Title and description length, complete H1")
    for path, doc in docs.items():
        t = re.search(r"<title>(.*?)</title>", doc, re.S)
        d = re.search(r'<meta name="description" content="([^"]*)"', doc)
        tl = len(html.unescape(t.group(1))) if t else 0
        dl = len(html.unescape(d.group(1))) if d else 0
        check(0 < tl <= TITLE_MAX, f"{path} title is {tl} characters (max {TITLE_MAX})")
        check(
            0 < dl <= DESC_MAX,
            f"{path} description is {dl} characters (max {DESC_MAX})",
        )
        h1 = re.search(r"<h1[^>]*>(.*?)</h1>", doc, re.S)
        text = re.sub(r"<!-- -->|<[^>]+>", " ", h1.group(1)) if h1 else ""
        text = " ".join(html.unescape(text).split())
        last = text.lower().rstrip(".").rsplit(" ", 1)[-1] if text else ""
        check(
            bool(text) and last not in DANGLING,
            f"{path} H1 is a complete phrase: {text!r}",
        )

    print(f"\n{'PASS' if not failures else 'FAIL'}: {len(failures)} failure(s)")
    return 0 if not failures else 1


if __name__ == "__main__":
    sys.exit(main())
