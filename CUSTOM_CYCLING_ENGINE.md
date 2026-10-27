# Custom cycling opportunity engine

Turn local club geography and a curated keyword taxonomy into a shortlist for human review. The engine writes opportunity files, draft page briefs and an audit manifest. It runs locally with Python's standard library; it does not call Google, change Shopify or publish content.

## Run it

Use PowerShell with Python available. Both `--clubs` and `--output-dir` are required. The output directory must be absent or empty; choose a fresh folder for each run. Keep outputs in a task-specific temporary folder outside the checkout:

```powershell
Set-Location -LiteralPath 'C:\Users\Jimmy\Documents\mvmnt-designs'
$cyclingRun = Join-Path $env:TEMP ('mvmnt-custom-cycling-' + [guid]::NewGuid().ToString('N'))
python .\scripts\custom_cycling_keyword_engine.py --clubs 'C:\Users\Jimmy\Documents\CLUBS\AUSTRALIA_CLUBS_PRIORITISED.csv' --output-dir $cyclingRun
Get-ChildItem -LiteralPath $cyclingRun
```

The club CSV requires `name` and `city` and at least one data row; `tier` is optional and accepts A, B or C, with other values counted as unknown. A header-only club CSV exits with error code 2 and writes no output. The input provides aggregate city and tier signals. Output must not contain club names, email addresses, contacts or outreach hooks. Treat the source CSV as private; do not paste its rows into briefs or external services. A city's club count is a prospecting signal, not measured search demand or permission to contact anyone.

To try the workflow without private data:

```powershell
$cyclingDemo = Join-Path $env:TEMP ('mvmnt-cycling-demo-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $cyclingDemo | Out-Null
$cyclingClubs = Join-Path $cyclingDemo 'synthetic-clubs.csv'
@'
name,city,tier
Synthetic Example A,Sydney,A
Synthetic Example B,Melbourne,B
'@ | Set-Content -LiteralPath $cyclingClubs -Encoding utf8
python .\scripts\custom_cycling_keyword_engine.py --clubs $cyclingClubs --output-dir (Join-Path $cyclingDemo 'results')
```

## Add measured keyword data

The optional `--metrics` CSV uses these headers:

```csv
keyword,location,volume,cpc_aud,competition,source,observed_at
```

Provide actual observations with their source and observation date. Match `keyword` and `location` to an opportunity's values; matching normalizes case, punctuation and whitespace. `volume` is a nonnegative whole number, `cpc_aud` is nonnegative, and `competition` is a number from 0 to 1. Use a short provider label for `source` and a nonfuture `YYYY-MM-DD` date for `observed_at`. At least one metric per row is required; blank metric cells remain unknown. Preserve the original export for audit. Do not invent numbers or convert missing observations to zero. Without matching metrics, the engine leaves volume, CPC and competition unknown. Source and observation date travel with imported metrics.

```powershell
$cyclingMeasuredRun = Join-Path $env:TEMP ('mvmnt-cycling-measured-' + [guid]::NewGuid().ToString('N'))
$cyclingMetrics = Join-Path $env:TEMP 'mvmnt-keyword-metrics.csv'
# Place your real, reviewed CSV at $cyclingMetrics before running this command.
python .\scripts\custom_cycling_keyword_engine.py --clubs 'C:\Users\Jimmy\Documents\CLUBS\AUSTRALIA_CLUBS_PRIORITISED.csv' --metrics $cyclingMetrics --output-dir $cyclingMeasuredRun
```

There is no live Google Ads connection in this workflow. The CSV option does not fetch or validate an account's keyword forecasts. Imported metrics need human review for geography, age, units and source reliability.

## Review the outputs

- `opportunities.json` and `opportunities.csv`: normalized, deduplicated keyword opportunities with explicit heuristic priority scores. Buyer topics cover core custom kit, club stores, masters/aero kit and corporate/charity teams; metro opportunities cover Sydney, Melbourne, Brisbane, Adelaide, Perth, Canberra and Gold Coast.
- `page_briefs.json`: grouped draft briefs for four proposed topic pages: `/pages/custom-cycling-kit`, `/pages/club-stores`, `/pages/custom-aero-cycling-kit` and `/pages/corporate-custom-cycling`. These are proposed targets, not confirmation that pages exist. Each brief includes keywords, buyer pains, proposed sections, a CTA and evidence needed. `publish_status` is `draft_only`; `review_required` is `true`.
- `run_manifest.json`: input and output identity hashes, counts and the local/no-network execution declaration. Hashes identify the files used; they do not establish that their contents are commercially accurate.

The bundled taxonomy contains 35 phrases expanded across eight locations (Australia plus seven metros), producing 280 opportunities and four briefs. Custom configurations can change these counts. The manifest hashes the three output data files; it does not include a hash of itself. Review its `held_for_review` list: the branded seed `tour de cure team kit` is excluded from generation pending relevance, rights and affiliation review. Its presence records a user-supplied idea, not a partnership or endorsement.

Review the score explanation before acting on the ranking. A priority score is a planning heuristic, not predicted traffic, revenue, order value or a probability of conversion. Curated terms and buyer pains are hypotheses. Club geography is observed input; search volume is observed only when supplied by a real metrics source. Tier labels inherit the source's meaning and need business review.

The score combines commercial intent (28 or 35), curated buyer fit (25), phrase specificity (up to 15), aggregate city list coverage (up to 10) and imported volume (up to 15). Tier counts, CPC, competition and assumed deal values do not add score points. Missing volume adds no points; that is not evidence of zero demand. Review `score_components`, `rationale`, `source_refs`, `requires_validation` and the manifest warnings together. Unmatched metrics do not generate new keywords.

The default taxonomy is `config/custom_cycling/taxonomy.json`. To review a different taxonomy, supply `--config PATH` with a reviewed configuration file. Record that change alongside the run; it changes the hypotheses and may change the ranking. Configured order-value ranges are planning assumptions, not measured sales or promised deal values.

Choose opportunities that match MVMNT's actual offer and capacity. Review comparable locations and buyer intents together, check existing pages for overlap, then decide whether a stronger existing page serves the need. Geographic terms do not automatically justify separate city pages.

## Prepare content and hand off manually

Use each brief's `evidence_needed` as a content gate. Verify order minimums, pricing, fabric origin, fit options, store/payment arrangements, delivery timing, refund terms and any performance or guarantee claim against approved business records. Obtain permission for testimonials, customer identities and photography. Unsupported claims stay out of customer-facing copy.

The local [campaign playbook](../CLUBS/MVMNT_CAMPAIGN_PLAYBOOK.md) informs strategy around committee administration, club identity, fit, season timing and sponsor design. Treat these as topics to validate with buyers. Playbook hooks do not establish delivery guarantees, free offers, affiliations or customer relationships; named organizations require independent evidence before appearing as endorsements or customers.

Write useful content that answers the buyer's actual questions, with specific verified examples and an honest next step. Avoid near-identical city pages, invented local presence and bulk keyword variants that add no value. Google's [spam policies](https://developers.google.com/search/docs/essentials/spam-policies) cover doorway abuse and scaled content abuse; generating briefs alone does not establish policy compliance or indexing eligibility.

After commercial and editorial review, manually transfer approved copy into a Shopify draft, check the actual URL, layout, metadata, links and enquiry journey, and use the store's existing approval/publishing process. These JSON and CSV outputs are review artifacts, not Shopify import files. The engine performs no store changes, outreach or automatic publishing.

## Check the local implementation

```powershell
Set-Location -LiteralPath 'C:\Users\Jimmy\Documents\mvmnt-designs'
python .\scripts\test_custom_cycling_keyword_engine.py
```

This command runs the local regression suite when the test file is present. A passing suite verifies only its covered local behavior; it does not prove SEO performance, live Google Ads access or a working Shopify customer journey. Consult the task's saved verification evidence for the exact tested candidate and result.
