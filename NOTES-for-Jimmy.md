# NOTES for Jimmy (not rendered on the site)

SEO foundations branch `seo/pages-20261125`. Items that need a decision or a fact only you can supply.

- TODO (env): add `NEXT_PUBLIC_SITE_URL` (default `https://mvmnt-designs.vercel.app`; set `https://mvmntdesign.com` at cutover) and `NEXT_PUBLIC_GA4_ID` (empty = GA4 off) to `frontend/.env.example`. The agent could not edit that file (permission deny rule on `.env*`).
- TODO (MERGE BLOCKER, S11): `frontend/app/api/booking/route.ts` only `console.log`s enquiries (including PII) to Vercel function logs; nothing emails or stores them. The "within 24 hours" promise has been removed (the form now says only "Your enquiry has been received"), and `/privacy` no longer claims enquiries are "reviewed". It still routes privacy access/deletion requests through the same form, because no contact email is published. Choose a delivery path (email provider or CRM; needs credentials) and a published contact email, then remove the PII logging and update `/privacy`. Do not drive traffic to the new pages until this is done. `frontend/app/actions.ts` has no delivery path (draft mode only); repo-root `api/submit.js` sits outside the Vercel Root Directory `frontend`.
- TODO (privacy, S10): no `/privacy` page exists. It must disclose the enquiry form data, Vercel Speed Insights and GA4 (if `NEXT_PUBLIC_GA4_ID` is set). Supply the business/contact details you want published there.
- TODO (domain cutover, S13): set `NEXT_PUBLIC_SITE_URL=https://mvmntdesign.com` in Vercel production, 301 `mvmnt-designs.vercel.app` to `mvmntdesign.com`, retire the separate static site, verify a new Search Console property (replace the token in `frontend/app/layout.tsx`) and resubmit the sitemap.
- TODO (Sydney): no Sydney page until there is Sydney-specific substance (client, process or location facts).
- Removed from JSON-LD because they are not published on the site: Section 133/TGA/Schedule 4 claims, "legacy agencies 3 to 6 months" comparison, "zero database vulnerabilities", HotDoc/HealthEngine/Best Practice, "Premier", state-by-state areaServed, job title "Lead Digital Architect". Re-add only if published in visible copy.
- Legacy test `scripts/test_mvmnt_site.py` targets the old static `index.html` at `C:\Users\Jimmy\Documents\mvmnt-designs`, not the Next.js app. New route checks: `scripts/test_seo_routes.py`.

## Page slice 1 (/web-design-canberra, /medical-practice-website-design, /branding-canberra)

- TODO (allied health): "allied health" has been REMOVED from the medical page title, H1, meta description, JSON-LD, footer label and all cross-links, because no published copy names it. If allied health (or physiotherapy) practices are a target market, publish that and it can be added back (the keyword research shows demand for "allied health website design" and "physiotherapy website design").
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

## Page slice 3 (/work, /privacy; /dental-website-design NOT built)

- TODO (dental, gates /dental-website-design): not built. No dental-specific fact is published, so the page would be a doorway clone of `/medical-practice-website-design`. Confirm dental practices are a target market and supply dental-specific substance (practice or booking systems supported, any dental work that can be shown). Until then dental is not named anywhere in rendered copy.
- TODO (privacy, business details): `/privacy` names "MVMNT Design" only. Supply the legal entity name, ABN and a contact email you want published; access, correction and deletion requests currently go through the enquiry form because no email is published.
- TODO (privacy, review): the policy describes only what the code does today. Please confirm or add: how long enquiries are kept, whether you share or sell personal information (the page makes no commitment either way), and whether you want a statement about the Australian Privacy Principles. Have it reviewed by your adviser before relying on it.
- TODO (privacy, keep in sync): `/privacy` says enquiries are "recorded in the application logs of our hosting provider, Vercel, where it is reviewed" (true of `app/api/booking/route.ts` today). When you choose an email or CRM delivery path (S11), update that paragraph and name the new processor. The GA4 paragraph renders only when `NEXT_PUBLIC_GA4_ID` is set. The Studio Scoper paragraph names Google and OpenAI because `app/api/scope/route.ts` uses them when a key is set; update it if the provider changes. "Last updated 25 November 2026" is set in `app/privacy/page.tsx` (LAST_UPDATED); change it when you publish.
- TODO (Hali link): `/work` names the Hali Institute with no outbound link, as on the homepage. GEAR links to fuelwithgear.com and MVMNT Club to mvmnt.club, as on the homepage.
- Note: `/work` carries no FAQ and no results or metrics, only the published case descriptions. Header, footer and related-links "Selected work" now go to `/work`; the footer legal row links `/privacy`.

## Review fixes (content and SEO review)

- Pricing: removed "every package includes copywriting" (only Solo Specialist and Boutique Clinic list clinical copywriting) and the word "fixed" for the packages. Confirm whether Practice Transformation includes copywriting; if so it can be said.
- Branding: the "How much does branding cost?" answer now says there is no standalone branding price. Hali is no longer presented as identity work (it is published as a website and digital experience). GEAR image alt on the new pages describes the pouches without calling them design concepts; the homepage alt is unchanged.
- Shopify: title shortened; the "turn complex commercial processes into revenue" claim removed; the MVMNT Club FAQ uses the published wording ("Shopify fulfilment workflows") and no longer says "built on Shopify". Confirm if MVMNT Club runs on Shopify and the FAQ can say so.
- "A digital experience that reflects the care behind the practice" is removed from the new pages (AHPRA guard: no statements about the quality of a client's care). It remains on the homepage, where it was already published; consider removing it there too.
- Duplicate FAQs (45-minute intake, copywriting, post-launch updates) removed from `/web-design-canberra` and `/branding-canberra`; they stay on `/medical-practice-website-design` and the homepage. `/web-design-canberra` still has little Canberra-specific substance beyond Hali; supply Canberra facts (other Canberra clients, in-person meetings, service area) to strengthen it.
- TODO (env, still open): the permission rules block edits to `frontend/.env.example`; add `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GA4_ID` there by hand.

## On-page SEO edits (2026-11-26)

- Scope: these edits change the Next.js app only (today `mvmnt-designs.vercel.app`). mvmntdesign.com is still the separate static site and its source is not in this repo, so its missing canonical, Open Graph, JSON-LD, robots.txt and sitemap.xml, its `en-GB` lang and its soft 404s (every unknown path returns the home page with status 200) are NOT fixed by this branch. [JIMMY TO CONFIRM] where that site's source lives, or do the domain cutover (S13) so this app serves the domain.
- No Search Console data exists for either host under the Google account the SEO agent uses, so titles and descriptions are written from what each page offers, not from search queries. Verify mvmntdesign.com (and the vercel.app host) in Search Console, then revisit titles against real queries.
- Done: the homepage H1 is now one complete phrase ("Bespoke design for ambitious brands."; the rotating words now sit inside the H1, with no visual change). The medical page meta description was 165 characters and is now 153. The `/work` description now names what MVMNT Club is, using the page's own wording. Open Graph image width and height now match the real files (1440 x 960 and 1536 x 1024; they were declared as 1200 x 630 and 1200 x 800).
- TODO (share image): the default Open Graph image is the Hali cover at 1440 x 960 (3:2). Social cards crop to about 1.91:1. Supply a purpose-made 1200 x 630 share image if you want control of the crop.
- TODO (Organization JSON-LD): it carries name, URL, founder, slogan and areas served only. Logo, address, phone, email and social profiles are left out because none is published. Supply any you want published on the site first.
- TODO (Next.js security notice): `next build` on the installed Next.js 16.4.3 reports "affected by a known security vulnerability" and stops once before continuing on retry. No dependency was upgraded on this branch. Decide whether to upgrade Next.js (separate change, needs its own test pass).
- TODO (legacy static files): repo-root `index.html`, `robots.txt` and `sitemap.xml` point at `mvmntdesigns.com` (with an s), which does not resolve. They sit outside the Vercel Root Directory `frontend`. Delete them, or correct the domain, when the static site is retired.
- TODO (mvmntdesign.com host, at cutover): `www.mvmntdesign.com` does not resolve; `http://` redirects with a 302, not a 301; the Cloudflare bot challenge returned 403 to a browser-style user agent on 2026-11-26. Add the www record with a 301 to the apex, make the http redirect a 301, and check in Search Console that Googlebot is not challenged.
- Note: `sitemap.xml` stamps every static route with the build time as `lastmod`. Harmless, but switch to real edit dates if Google starts ignoring it.
- Checks: `scripts/test_seo_routes.py` now also fails on a title over 60 characters, a description over 155, or an H1 that ends on a dangling word.
