# NOTES for Jimmy (not rendered on the site)

SEO foundations branch `seo/pages-20261125`. Items that need a decision or a fact only you can supply.

- TODO (env): add `NEXT_PUBLIC_SITE_URL` (default `https://mvmnt-designs.vercel.app`; set `https://mvmntdesign.com` at cutover) and `NEXT_PUBLIC_GA4_ID` (empty = GA4 off) to `frontend/.env.example`. The agent could not edit that file (permission deny rule on `.env*`).
- TODO (conversion blocker, S11): `frontend/app/api/booking/route.ts` only `console.log`s enquiries (including PII) and promises contact within 24 hours. Choose a delivery path (email provider or CRM; needs credentials), then remove the PII logging and make the promise match reality. Not yet checked: `frontend/app/actions.ts`, repo-root `api/submit.js`.
- TODO (privacy, S10): no `/privacy` page exists. It must disclose the enquiry form data, Vercel Speed Insights and GA4 (if `NEXT_PUBLIC_GA4_ID` is set). Supply the business/contact details you want published there.
- TODO (domain cutover, S13): set `NEXT_PUBLIC_SITE_URL=https://mvmntdesign.com` in Vercel production, 301 `mvmnt-designs.vercel.app` to `mvmntdesign.com`, retire the separate static site, verify a new Search Console property (replace the token in `frontend/app/layout.tsx`) and resubmit the sitemap.
- TODO (Sydney): no Sydney page until there is Sydney-specific substance (client, process or location facts).
- Removed from JSON-LD because they are not published on the site: Section 133/TGA/Schedule 4 claims, "legacy agencies 3 to 6 months" comparison, "zero database vulnerabilities", HotDoc/HealthEngine/Best Practice, "Premier", state-by-state areaServed, job title "Lead Digital Architect". Re-add only if published in visible copy.
- Legacy test `scripts/test_mvmnt_site.py` targets the old static `index.html` at `C:\Users\Jimmy\Documents\mvmnt-designs`, not the Next.js app. New route checks: `scripts/test_seo_routes.py`.

## Page slice 1 (/web-design-canberra, /medical-practice-website-design, /branding-canberra)

- TODO (allied health): the medical page title, H1 and homepage link say "Medical & allied health". The published copy says "private practices", "clinic" and "solo specialists" but never names allied health or physiotherapy. Confirm allied health practices are a target market; if not, drop "allied health" from the title, H1, meta description, footer label and homepage link. Physiotherapy is deliberately not named in rendered copy until you confirm it.
- TODO (logo-only): /branding-canberra does not offer a logo-only engagement, print or packaging production, because none is published. If you offer logo-only work, add it and the "logo design canberra" wording.
- TODO (Google Business Profile): the Canberra SERP has a local pack, which needs a GBP. Decide whether a service-area profile with no public address is acceptable.
- TODO (GST): prices are shown as published ("$4,800 AUD" etc.) with no GST statement. Confirm whether they include GST.
- TODO (Hali link): Hali Institute is named on the new pages exactly as on the homepage, with no outbound link. Confirm whether a link to its site is wanted.
- Note: related-links blocks and the footer "Services" list read `frontend/app/content/service-links.ts`. Packages and work currently link to `/#pricing` and `/#work`; switch them to `/pricing` and `/work` when those routes ship.

## Page slice 2 (/shopify-developer, /pricing)

- TODO (website care plan): `/website-care-plan` was NOT built, because the plan gates it on facts only you can supply. Studio Care is a `#studio-care` section on `/pricing` instead (footer and related links say "Website care plan" and point to `/pricing#studio-care`). To justify a standalone page, confirm: which sites are eligible (only sites you built, or existing WordPress/Shopify sites too), minimum term, what happens to unused hours, and response times.
- TODO (Shopify Partner): `/shopify-developer` makes no "Shopify Partner" or "Shopify Expert" claim. Confirm whether you hold a Partner account (and want a Partner Directory listing); if so, it can be added to the copy.
- TODO (Shopify pricing): no Shopify price is published, so the page says Shopify work is scoped individually. Supply a starting price for store starters if you want one shown.
- TODO (Shopify and Studio Care): the page does not say whether Studio Care covers Shopify stores (managed hosting does not apply to Shopify). Confirm if it does.
- TODO (GST): `/pricing` shows prices as published ("$4,800 AUD") with no GST statement. Confirm GST treatment and it will be added to the pricing table and FAQ.
- Note: the Shopify copy on `/shopify-developer` is ported from the "Custom Shopify Architecture" section of the static mvmntdesign.com (fetched 2026-11-25), so it survives the domain cutover. GEAR is described there only as brand and digital work, not as a Shopify build, because the published copy does not say it runs on Shopify.
- Header and footer "Packages" now link to `/pricing`; the footer Services list adds Shopify development, Pricing and Website care plan. "Selected Work" still links to `/#work` until slice 3 ships `/work`.
