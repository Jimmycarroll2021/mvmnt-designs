# Custom cycling keyword engine delivery record

Date: 2026-10-28. Baseline: `390d0f8e954be97c255e895dcbe2316c4cd0b723` (clean working tree at discovery).

## Objective and authority

Build a useful local, reproducible keyword expansion engine for Australian custom cycling buyers: club committees, race directors and corporate/charity teams. Expand proactively beyond Search Console, then produce ranked opportunities and Shopify page recommendations for mvmnt.club. Authorised: local implementation, documentation, synthetic tests and independent verification. Excluded: production changes, external publishing, outreach, paid calls, private data upload and credential access.

## Acceptance

- A1: `python scripts/custom_cycling_keyword_engine.py --clubs PATH --output-dir PATH` works using Python standard library without network, credentials or external packages.
- A2: Proactive taxonomy covers core custom kit, club stores, masters/aero, corporate/charity, race/event buyers and Sydney/Melbourne/Brisbane/Adelaide/Perth, regardless of Search Console availability.
- A3: Every normalized, deduplicated opportunity includes buyer intent, cluster, location, target page, explainable ranking and provenance. Search volume/CPC/order values remain unknown unless supplied with evidence; hypotheses are labelled.
- A4: Configurable club CSV loading validates headers and malformed/missing inputs explicitly. Derived output excludes emails, warm introductions, hooks, notes and raw club records; aggregate city/tier coverage is sufficient.
- A5: Optional local metrics CSV adds explicitly sourced measurements, with source/date and input provenance retained. No live API dependency.
- A6: Persist opportunities JSON/CSV, canonical page briefs and run manifest with source/output identities and warnings. Draft page recommendations make no verified service, product, manufacturing, delivery or commercial guarantees.
- A7: Synthetic regression checks exercise deterministic reruns, duplicates, malformed inputs, multiple locations, metric provenance, privacy and publish gating. Separate verifier checks the exact final candidate and saves receipts.
- A8: A user-facing guide supplies exact commands, schemas, output locations, ranking explanation, limitations and the live Shopify integration gate.

## Discovery evidence

- Existing `scripts/custom_cycling_keyword_engine.py` prints static five-cluster strategy and unsafe unverified guarantee copy; no durable run output, keyword expansion loop, measurement provider or Shopify publisher exists there.
- Existing `dynamic_keyword_cycler.py` and `google_growth_engine.py` contain separate credential-dependent Google helpers. They must not be imported or executed by this local engine.
- Root package is an agency-site monorepo: static site plus Next.js/Sanity workspaces. Existing browser tests exercise that agency site, not mvmnt.club Shopify publishing. No source evidence found here establishes a Shopify publishing surface.
- Club source exists at `C:/Users/Jimmy/Documents/CLUBS/AUSTRALIA_CLUBS_PRIORITISED.csv`; inspected metadata only: 105 records; headers `tier,name,city,members,est,email,warm_via,hook,notes`. All names/cities present; no exact duplicate names. Counts: Sydney 33, Adelaide 24, Melbourne 15, Brisbane 12, Perth 10, Canberra 6, Gold Coast 5. These are file-derived observations, not verified current club facts.
- No prior task-specific memory hit located. Unrelated MVMNT memory records were not used as factual evidence.
- Existing `evidence/` is the established evidence location; no existing planning directory was found. This record contains no club contacts or raw records.

## Proposed contract

CLI: `--clubs PATH --output-dir PATH [--metrics CSV]`.

Suggested opportunities JSON fields: `id,keyword,cluster,buyer_role,intent,location,target_page,priority_score,score_components,rationale,source_refs,evidence_status,metrics,requires_validation`. Combine provenance when deduplicating normalized keyword plus location; canonical page grouping prevents duplicate city/intent pages.

Suggested outputs: `opportunities.json`, `opportunities.csv`, `page_briefs.json`, `run_manifest.json`. Manifest records schema/engine version, input hashes/counts, warnings and output hashes. Briefs remain `draft_only`; metrics null unless supplied with source/date. Private local outputs should default outside public/deployable site roots and remain ignored by Git.

Optional metrics CSV suggested fields: `keyword,location,volume,cpc_aud,competition,source,observed_at`. Implementer may narrow this contract before dispatch is final; communicate any change to test/docs owners through coordinator.

## Ownership and state

- Architect/discovery leaf: this `TASK.md` only. Completed instruction/index/permission reads, baseline/source/CSV metadata discovery and bounded plan. No production or API actions.
- Coordinator: reserves exact owners, records acceptance and next actions from evidence metadata.
- Engine implementer proposed exclusive scope: `scripts/custom_cycling_keyword_engine.py`, new `scripts/custom_cycling/`, new `config/custom_cycling/`; ignored-output entry requires one explicit owner.
- Independent tests proposed exclusive scope: `scripts/test_custom_cycling_keyword_engine.py`, `tests/fixtures/custom_cycling/` synthetic data only.
- Documentation proposed exclusive scope: `CUSTOM_CYCLING_ENGINE.md` and optional `scripts/run_custom_cycling.ps1`.
- Independent verifier: read exact combined candidate; write verification receipts to a separately reserved evidence path. Implementation evidence is not independent acceptance.

Next action: coordinator dispatches independent code/tests/docs leaves with the agreed shared CLI and file schema; then assigns exact-candidate integration verification. Live Shopify adapter and publishing require verified store/app surface, original business claims, existing pages and explicit release authority.

## User steering: exact commercial seeds and campaign hooks

User subsequently specified the following inputs. The numeric order bands are user-provided assumptions, not measured values, forecasts, verified prices or priority evidence.

| Cluster | Required seed terms | Intended buyer | Assumed order band AUD |
|---|---|---|---|
| Core Custom Kit | custom cycling kit australia; custom cycling jerseys australia; bespoke cycling kits | Race squads; Gran Fondo teams | 5,000-25,000 |
| Club Zero Float | custom cycling kit for clubs; zero float club store cycling; no minimum custom cycling kit | Presidents; kit secretaries | 8,000-35,000 per season |
| Masters | custom aero cycling jersey; custom cycling bib shorts; masters fit cycling jerseys | Masters/veterans; AVCC audience context | 4,000-15,000 |
| Corporate | corporate custom cycling jerseys; charity ride custom cycling kit; tour de cure team kit | Corporate sponsorship leads | 10,000-50,000 |
| City | custom cycling kit melbourne; custom cycling kit sydney; custom cycling kit brisbane; custom cycling kit adelaide; custom cycling kit perth | Relevant local teams/committees | 5,000-20,000 |

Messaging source located directly at `C:/Users/Jimmy/Documents/CLUBS/MVMNT_CAMPAIGN_PLAYBOOK.md`; no broad private scan or cloud upload was needed. Use abstract messaging themes and source references, not private personalisation/contact content.

| Hook to integrate into draft briefs | Source lines | Evidence status and safe use |
|---|---|---|
| Reduce committee effort around ordering, payments and inventory | 49-50 | Campaign model/self-reported script assertions; private-store operation and zero-float terms unverified. Frame as buyer problem/design question until checked. |
| Preserve club history and distinctive identity in a design concept | 48, 137 | Proposed offer. Free design requires scope/terms and business approval; no existing free service proven. |
| Discuss masters sizing, club cut and sleeve/back coverage | 51 | Playbook product-positioning assertion; actual garments/size guide not validated. Brief should request fit-guide evidence. |
| Work backwards from the season/event date to a production plan | 52 | Proposed planning process. Avoid guaranteeing delivery, fixed capacity or cutoff dates. |
| Give committee champions usable sizing/member-FAQ materials | 53 | Proposed support assets; their existence and delivery not checked. |
| Explain repeat/new-member ordering and archived artwork | 54 | Proposed ongoing service; price permanence and unrestricted reorder availability unverified. |
| Coordinate sponsor artwork and a sponsor prospectus | 55, 61-78 | Document self-reports prior attraction success, but no independent case evidence. Sponsor funding/cheaper kit is not guaranteed. |
| Address late-kit, wrong-size and committee-blame objections | 82-90 | Proposed delivery/refund/remake promises with conditions; do not publish as active guarantees without validation and authorised terms. |

The AVCC affiliation route in lines 175-181 is a proposal in a draft message, not evidence of partnership, endorsement or federation approval. Tour de Cure is absent from this playbook; keep it only as a user-supplied search intent requiring branded-query/affiliation review. No evidence located for an active no-minimum-order service. Public briefs must not infer partnership, manufacturing origin, Italian fabrics, scarcity/capacity, product performance or order economics from campaign copy.

Architect steering result: completed read-only messaging discovery and this task-record addition. No source edits, outreach or publishing. Coordinator should pass this result to implementation/docs owners and include exact seeds, assumption labels and claim/affiliation warnings in independent verification.

## Frozen integration result

State: **integrated, pending independent verification**. Baseline commit remains `390d0f8e954be97c255e895dcbe2316c4cd0b723`; changes are local and uncommitted. No deployment, push, publishing or outreach occurred.

Saved receipt: `evidence/custom-cycling-engine/INTEGRATION.json`. It pins seven candidate files (engine entry point, package init/engine/inputs, taxonomy, tests and guide). Canonical candidate-file-manifest SHA256: `d6e5fb9d47b6857589e550bb7e54e6f89cc23364937c68179d3f73dc79fc5f1f`. All engine/test file hashes stayed unchanged across integration; guide hash independently matches the coordinator's final documentation freeze.

- Real private input run succeeded with exit 0: 105 source rows -> 280 unique keyword/location opportunities and four canonical draft briefs. No metrics file was supplied; all opportunity metrics remain null.
- Output location: `C:/Users/Jimmy/.codex/artifacts/mvmnt-custom-cycling/20261027T211222Z/outputs`. Run receipt is private sibling `integration-receipt.json`. The source CSV hash remained unchanged.
- All three manifest-declared output hashes independently match their files. All briefs remain `draft_only` with review required. The branded user seed `tour de cure team kit` is preserved in manifest `held_for_review`, excluded from expansion pending review; no affiliation is asserted.
- Runtime audit wrapper blocked socket activity, additional processes and sensitive credential-path reads. This is bounded Python instrumentation, not OS isolation. An earlier runpy wrapper attempt failed before engine execution due to its missing script-directory import path; its receipt was preserved at `.../20261027T211209Z/integration-receipt.json`, then the wrapper was corrected without source changes.
- Privacy exact-value scan found zero occurrences across generated files for 105 club names, 87 emails, six warm-introduction values, 18 hooks and two notes (distinct values of at least six characters). Shorter values are outside that check; synthetic privacy tests and independent review provide separate structural evidence.
- Coordinator relayed independent focused regression evidence: 24/24 passed in 5.107 seconds using `PYTHONDONTWRITEBYTECODE=1 python -m unittest discover -s scripts -p test_custom_cycling_keyword_engine.py -v`. Its test-file SHA256 matches the frozen candidate. This integration executor did not duplicate the suite or run unrelated website tests.

Owners at handoff: implementation owns engine/taxonomy; test executor owns focused suite; documentation owns guide; integration executor owns this record plus INTEGRATION.json; independent verifier owns VERIFICATION.json. Coordinator owns acceptance. Next action: independent verifier checks exact candidate and integrated real-run evidence; coordinator records acceptance only from saved verifier results. Demand, rankings, revenue, active business guarantees, live Shopify integration and customer journey remain unverified.

## Coordinator acceptance

Final state: **accepted local build**. Coordinator accepted A1-A8 after the separate verifier reported PASS with no blockers: 24 focused regression tests plus 25 independent checks, including real-output hashes and privacy. Verification receipt: `evidence/custom-cycling-engine/VERIFICATION.json`, SHA256 `b7918783e963fcb11e92f942462fa53b38702e370bdeec9cb1921bb8c019a229`.

INTEGRATION.json now references that verification and coordinator decision; its exact candidate metadata is unchanged. Local build work is complete. No production publishing or live SEO, revenue, business-guarantee or Shopify customer-journey claim is accepted by this result.
