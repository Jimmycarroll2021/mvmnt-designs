"""Requirement-driven, local-only CLI acceptance tests using synthetic data.

Run: python -m unittest discover -s scripts -p test_custom_cycling_keyword_engine.py -v
No live club database, network, credentials, or publishing is required.
"""

import csv
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


ENGINE = Path(__file__).with_name("custom_cycling_keyword_engine.py")
TAXONOMY = ENGINE.parent.parent / "config" / "custom_cycling" / "taxonomy.json"
CLUB_FIELDS = ["tier", "name", "city", "members", "est", "email", "warm_via", "hook", "notes"]
METRIC_FIELDS = ["keyword", "location", "volume", "cpc_aud", "competition", "source", "observed_at"]
OUTPUTS = ("opportunities.json", "opportunities.csv", "page_briefs.json", "run_manifest.json")
PRIVATE_VALUES = ("SYNTHETIC_PRIVATE_CLUB_ALPHA", "private-alpha@example.invalid",
                  "PRIVATE_WARM_CONTACT", "PRIVATE_OUTREACH_HOOK", "PRIVATE_NOTES_TOKEN")


class KeywordEngineAcceptanceTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="mvmnt-keyword-test-")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.clubs = self.root / "clubs.csv"
        self.output = self.root / "output"
        self.rows = [dict(zip(CLUB_FIELDS, ["1", PRIVATE_VALUES[0], "Sydney", "120", "1984",
                                           PRIVATE_VALUES[1], PRIVATE_VALUES[2], PRIVATE_VALUES[3],
                                           PRIVATE_VALUES[4]])),
                     dict(zip(CLUB_FIELDS, ["2", "SYNTHETIC_PRIVATE_CLUB_BETA", "Melbourne", "85",
                                           "1993", "beta@example.invalid", "", "", ""]))]
        self.write_csv(self.clubs, CLUB_FIELDS, self.rows)

    @staticmethod
    def write_csv(path, fields, rows):
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("w", encoding="utf-8", newline="") as handle:
            writer = csv.DictWriter(handle, fieldnames=fields)
            writer.writeheader()
            writer.writerows(rows)

    def invoke(self, clubs=None, output=None, metrics=None, guarded=False, config=None):
        args = ["--clubs", str(clubs or self.clubs), "--output-dir", str(output or self.output)]
        if metrics is not None:
            args += ["--metrics", str(metrics)]
        if config is not None:
            args += ["--config", str(config)]
        if guarded:
            # Executed in the engine process: attempted networking/child programs fail the test.
            guard = (
                "import runpy,sys,socket,urllib.request,subprocess,os; "
                "deny=lambda *a,**k: (_ for _ in ()).throw(RuntimeError('FORBIDDEN_EXTERNAL_ACTION')); "
                "socket.create_connection=deny; socket.getaddrinfo=deny; socket.socket.connect=deny; "
                "socket.socket.connect_ex=deny; urllib.request.urlopen=deny; subprocess.Popen=deny; "
                "os.system=deny; sys.argv=sys.argv[1:]; sys.path.insert(0,os.path.dirname(sys.argv[0])); "
                "runpy.run_path(sys.argv[0],run_name='__main__')"
            )
            command = [sys.executable, "-c", guard, str(ENGINE), *args]
        else:
            command = [sys.executable, str(ENGINE), *args]
        return subprocess.run(command, capture_output=True, text=True, encoding="utf-8",
                              errors="replace", timeout=30, cwd=self.root)

    def successful_run(self, **kwargs):
        result = self.invoke(**kwargs)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        output = kwargs.get("output", self.output)
        for name in OUTPUTS:
            self.assertTrue((output / name).is_file(), name)
        return result, json.loads((output / "opportunities.json").read_text(encoding="utf-8"))

    def assert_rejected(self, result):
        self.assertNotEqual(result.returncode, 0, "Invalid input incorrectly reported success")
        self.assertTrue(result.stderr.strip() or result.stdout.strip(), "Failure needs a diagnostic")

    def test_valid_cli_schema_and_no_fabricated_metrics(self):
        _, opportunities = self.successful_run()
        self.assertIsInstance(opportunities, list)
        self.assertGreater(len(opportunities), 0)
        required = {"id", "keyword", "cluster", "buyer_role", "intent", "location", "target_page",
                    "priority_score", "score_components", "rationale", "source_refs", "evidence_status",
                    "metrics", "requires_validation"}
        identities = set()
        for item in opportunities:
            self.assertTrue(required <= item.keys(), required - item.keys())
            for field in ("id", "keyword", "cluster", "buyer_role", "intent", "target_page", "rationale"):
                self.assertTrue(item[field], field)
            self.assertIsInstance(item["score_components"], dict)
            self.assertIsInstance(item["source_refs"], list)
            self.assertTrue(item["source_refs"])
            self.assertIsNone(item["metrics"], "No supplied search data means metrics stay unknown")
            self.assertTrue(item["requires_validation"])
            self.assertIsInstance(item["priority_score"], (int, float))
            self.assertTrue(0 <= item["priority_score"] <= 100)
            identity = (" ".join(item["keyword"].casefold().split()), str(item["location"]).casefold())
            self.assertNotIn(identity, identities)
            identities.add(identity)

    def test_sensitive_club_fields_never_reach_outputs_or_console(self):
        result, _ = self.successful_run()
        text = result.stdout + result.stderr + "".join((self.output / n).read_text(encoding="utf-8") for n in OUTPUTS)
        for token in PRIVATE_VALUES + ("SYNTHETIC_PRIVATE_CLUB_BETA", "beta@example.invalid"):
            self.assertNotIn(token, text)

    def test_input_bytes_unchanged_and_output_is_contained(self):
        before = self.clubs.read_bytes()
        self.successful_run()
        self.assertEqual(self.clubs.read_bytes(), before)
        self.assertEqual({p.name for p in self.root.iterdir()}, {"clubs.csv", "output"})

    def test_runs_without_network_or_external_programs(self):
        self.successful_run(guarded=True)

    def test_deterministic_data_across_runs_and_row_order(self):
        self.successful_run()
        first = {name: (self.output / name).read_bytes() for name in OUTPUTS if name != "run_manifest.json"}
        second_output = self.root / "second"
        self.write_csv(self.clubs, CLUB_FIELDS, list(reversed(self.rows)))
        self.successful_run(output=second_output)
        for name, data in first.items():
            self.assertEqual(data, (second_output / name).read_bytes(), name)

    def test_duplicate_club_rows_do_not_inflate_priorities(self):
        _, first = self.successful_run()
        self.write_csv(self.clubs, CLUB_FIELDS, self.rows + [self.rows[0], self.rows[0]])
        _, second = self.successful_run(output=self.root / "duplicates")
        self.assertEqual(first, second, "Duplicate source rows must not manufacture stronger demand")

    def test_briefs_group_canonical_pages_and_remain_review_only(self):
        _, opportunities = self.successful_run()
        briefs = json.loads((self.output / "page_briefs.json").read_text(encoding="utf-8"))
        self.assertIsInstance(briefs, list)
        pages = []
        for brief in briefs:
            for field in ("target_page", "primary_keyword", "secondary_keywords", "buyer_pains",
                          "proposed_sections", "cta", "evidence_needed", "publish_status", "review_required"):
                self.assertIn(field, brief)
            self.assertEqual(brief["publish_status"], "draft_only")
            self.assertIs(brief["review_required"], True)
            self.assertTrue(brief["evidence_needed"])
            page = brief["target_page"]
            self.assertTrue(page.startswith("/"))
            self.assertNotRegex(page, r"\[|\]|\{|\}|\?|#|//|/\.\.")
            self.assertNotIn(page.rstrip("/"), pages)
            pages.append(page.rstrip("/"))
        self.assertEqual(set(pages), {row["target_page"].rstrip("/") for row in opportunities})

    def test_outputs_avoid_deal_estimates_and_delivery_guarantees(self):
        self.successful_run()
        generated = " ".join((self.output / n).read_text(encoding="utf-8") for n in ("opportunities.json", "page_briefs.json"))
        for pattern in (r'"avg_deal_value"', r'"estimated_revenue"', r'guaranteed season.start delivery',
                        r'we refund our entire margin', r'\$\d[\d,]*\s*[–-]\s*\$\d'):
            self.assertNotRegex(generated.lower(), pattern)

    def test_csv_contains_same_opportunities(self):
        _, opportunities = self.successful_run()
        with (self.output / "opportunities.csv").open(encoding="utf-8-sig", newline="") as handle:
            rows = list(csv.DictReader(handle))
        self.assertEqual(len(rows), len(opportunities))
        self.assertEqual({r["id"] for r in rows}, {r["id"] for r in opportunities})
        self.assertEqual({r["keyword"] for r in rows}, {r["keyword"] for r in opportunities})

    def test_manifest_identity_counts_and_hashes(self):
        _, opportunities = self.successful_run()
        manifest = json.loads((self.output / "run_manifest.json").read_text(encoding="utf-8"))
        for field in ("schema_version", "engine_version", "generated_at", "input_hashes", "row_counts",
                      "warnings", "counts", "output_sha256", "no_network"):
            self.assertIn(field, manifest)
        self.assertIs(manifest["no_network"], True)
        self.assertIsInstance(manifest["warnings"], list)
        digest = hashlib.sha256(self.clubs.read_bytes()).hexdigest()
        self.assertIn(digest, json.dumps(manifest["input_hashes"]))
        self.assertIn(len(opportunities), manifest["counts"].values())
        for name in OUTPUTS:
            if name != "run_manifest.json":
                self.assertEqual(manifest["output_sha256"][name], hashlib.sha256((self.output / name).read_bytes()).hexdigest())

    def test_metrics_join_only_exact_normalized_term_and_location(self):
        _, baseline = self.successful_run()
        sample = baseline[0]
        metrics = self.root / "metrics.csv"
        row = dict(zip(METRIC_FIELDS, ["  " + sample["keyword"].upper() + "  ", sample["location"],
                                      "123", "4.25", "0.45", "synthetic_manual_export", "2026-10-01"]))
        self.write_csv(metrics, METRIC_FIELDS, [row])
        before = metrics.read_bytes()
        _, enriched = self.successful_run(output=self.root / "enriched", metrics=metrics)
        matched = [item for item in enriched if item["metrics"] is not None]
        self.assertEqual(len(matched), 1)
        self.assertEqual(matched[0]["id"], sample["id"])
        for field, expected in (("volume", 123), ("cpc_aud", 4.25), ("competition", .45)):
            self.assertEqual(matched[0]["metrics"][field], expected)
        self.assertEqual(matched[0]["metrics"]["source"], "synthetic_manual_export")
        self.assertEqual(metrics.read_bytes(), before)

    def test_missing_clubs_fails(self):
        self.assert_rejected(self.invoke(clubs=self.root / "missing.csv"))

    def test_missing_required_club_header_fails(self):
        self.write_csv(self.clubs, ["name", "members"], [{"name": "Synthetic", "members": "10"}])
        self.assert_rejected(self.invoke())

    def test_header_only_clubs_report_no_data_without_success_receipts(self):
        self.write_csv(self.clubs, ["name", "city"], [])
        result = self.invoke()
        self.assert_rejected(result)
        self.assertEqual(result.returncode, 2)
        self.assertIn("no data", (result.stdout + result.stderr).lower())
        self.assertFalse((self.output / "run_manifest.json").exists())

    def test_malformed_quoted_csv_fails(self):
        self.clubs.write_text('name,city\n"unterminated,Sydney\n', encoding="utf-8")
        self.assert_rejected(self.invoke())

    def test_missing_metrics_file_fails(self):
        self.assert_rejected(self.invoke(metrics=self.root / "missing-metrics.csv"))

    def test_invalid_metrics_are_rejected_without_fabrication(self):
        for field, value in (("volume", "-1"), ("volume", "NaN"), ("cpc_aud", "nonsense"),
                             ("cpc_aud", "-2"), ("competition", "Infinity"), ("source", ""),
                             ("observed_at", "yesterday-ish")):
            with self.subTest(field=field, value=value):
                row = dict(zip(METRIC_FIELDS, ["custom cycling kit australia", "Australia", "123", "4.25", ".45",
                                               "synthetic", "2026-10-01"]))
                row[field] = value
                metrics = self.root / "bad-metrics.csv"
                self.write_csv(metrics, METRIC_FIELDS, [row])
                self.assert_rejected(self.invoke(metrics=metrics))

    def test_invalid_input_preserves_existing_outputs(self):
        self.successful_run()
        before = {name: (self.output / name).read_bytes() for name in OUTPUTS}
        self.clubs.write_text("unrelated,fields\na,b\n", encoding="utf-8")
        self.assert_rejected(self.invoke())
        for name, data in before.items():
            self.assertEqual((self.output / name).read_bytes(), data, name)

    def test_output_directory_cannot_be_a_file(self):
        self.output.write_text("preserve me", encoding="utf-8")
        self.assert_rejected(self.invoke())
        self.assertEqual(self.output.read_text(encoding="utf-8"), "preserve me")

    def test_valid_rerun_refuses_to_replace_existing_receipts(self):
        self.successful_run()
        before = {name: (self.output / name).read_bytes() for name in OUTPUTS}
        self.assert_rejected(self.invoke())
        for name, data in before.items():
            self.assertEqual((self.output / name).read_bytes(), data, name)

    def test_minimal_club_columns_are_supported(self):
        self.write_csv(self.clubs, ["name", "city"], [{"name": "Synthetic Minimum", "city": "Sydney"}])
        self.successful_run()

    def test_duplicate_normalized_seed_combines_provenance(self):
        _, baseline = self.successful_run()
        taxonomy = json.loads(TAXONOMY.read_text(encoding="utf-8"))
        first = taxonomy["clusters"][0]
        original_phrase = first["terms"][0]["phrase"]
        first["terms"].append({"phrase": "  " + original_phrase.upper() + "  ",
                               "intent": first["terms"][0]["intent"]})
        config = self.root / "duplicate-taxonomy.json"
        config.write_text(json.dumps(taxonomy), encoding="utf-8")
        _, opportunities = self.successful_run(output=self.root / "duplicate-seeds", config=config)
        self.assertEqual(len(opportunities), len(baseline))
        original = {item["id"]: item for item in baseline}
        self.assertEqual(set(original), {item["id"] for item in opportunities})
        affected = [item for item in opportunities if item["keyword"].startswith(original_phrase)]
        self.assertTrue(affected)
        for item in affected:
            old = original[item["id"]]
            self.assertEqual(item["priority_score"], old["priority_score"])
            self.assertTrue(set(map(json.dumps, old["source_refs"])) <= set(map(json.dumps, item["source_refs"])))

    def test_empty_taxonomy_fails_instead_of_false_success(self):
        taxonomy = json.loads(TAXONOMY.read_text(encoding="utf-8"))
        taxonomy["clusters"] = []
        config = self.root / "empty-taxonomy.json"
        config.write_text(json.dumps(taxonomy), encoding="utf-8")
        self.assert_rejected(self.invoke(config=config))

    def test_output_must_not_overwrite_input(self):
        dangerous = self.output / "opportunities.csv"
        self.write_csv(dangerous, CLUB_FIELDS, self.rows)
        before = dangerous.read_bytes()
        self.assert_rejected(self.invoke(clubs=dangerous))
        self.assertEqual(dangerous.read_bytes(), before)


if __name__ == "__main__":
    unittest.main()
