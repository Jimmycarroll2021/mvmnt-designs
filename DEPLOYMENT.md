# MVMNT DESIGNS — Production Deployment & DevOps Architecture

**Target Platform:** [MVMNT DESIGNS Digital Agency](https://github.com/Jimmycarroll2021/mvmnt-designs)  
**GitHub Repository:** `Jimmycarroll2021/mvmnt-designs`  
**Remote Connection:** `git@github.com:Jimmycarroll2021/mvmnt-designs.git` (SSH) / `https://github.com/Jimmycarroll2021/mvmnt-designs.git`  
**Primary Branch:** `main`  
**Hosting & CDN:** Vercel Global Edge Network  

---

## 1. Executive Summary

This document establishes the production deployment, version control hygiene, and edge caching architecture for **MVMNT DESIGNS**, an elite digital product design and creative technology agency.

The platform is engineered with modern vanilla web standards (HTML5 semantic landmarks, CSS3 custom property design tokens, and modular ES6+ JavaScript), ensuring zero build-step overhead, instant edge distribution, and sub-100ms first contentful paint (FCP) across global regions.

---

## 2. Vercel Global Edge Configuration (`vercel.json`)

To prevent stale client-side cache while aggressively caching immutable static assets across edge nodes, create or maintain `vercel.json` at the repository root:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    },
    {
      "source": "/(.*).html",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store, no-cache, must-revalidate, proxy-revalidate" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### Key Capabilities Configured:
1. **Zero-Stale HTML Delivery:** Edge CDN nodes validate with the origin on every HTML request (`max-age=0, must-revalidate`). Visitors always experience new releases immediately upon push without hard-refreshing.
2. **Immutable Asset Caching:** High-resolution case study mockups, SVGs, and web fonts in `/assets/` are cached for 1 year (`max-age=31536000, immutable`).
3. **Clean URLs:** Extensionless routing (`/about`, `/work`, `/contact`) is handled natively by the edge without client-side redirect lag.

---

## 3. Git Repository Architecture & Standards

### File Structure
```text
mvmnt-designs/
├── .gitattributes          # LF line normalization & explicit binary mappings
├── .gitignore              # Clean version control exclusions
├── DEPLOYMENT.md           # This deployment & DevOps specification
├── vercel.json             # Vercel Edge routing & cache headers
├── index.html              # Primary production single-page application
├── assets/
│   ├── images/             # Optimized portfolio assets, mockups, brand marks
│   └── fonts/              # Custom agency typography (e.g., PP Fraktion, Inter)
├── api/
│   └── contact.js          # Serverless intake endpoint (Vercel Edge/Node)
└── scripts/                # QA verification & Playwright automated audit suites
```

### Commit Message Convention
All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` User-facing features, sections, or interactions
- `fix:` Bug fixes, layout adjustments, and accessibility repairs
- `docs:` Documentation, READMEs, and deployment specifications
- `style:` Formatting, whitespace, and non-functional CSS changes
- `refactor:` Code restructuring without functional changes
- `test:` Automated test scripts and visual audit evidence

---

## 4. Local Development & Preview

Because the platform uses zero-dependency vanilla web standards, local development is instantaneous:

### Option 1: Python HTTP Server (Built-in)
```powershell
# From C:\Users\Jimmy\Documents\mvmnt-designs
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2: VS Code / Cursor Live Server
Right-click `index.html` and click **"Open with Live Server"**.

### Option 3: Vercel CLI (Local Serverless Functions + Edge Emulation)
```powershell
npm install -g vercel
vercel dev
```

---

## 5. Live Production Deployment Pipeline

### Automated Continuous Deployment (GitHub + Vercel Integration)
1. Navigate to the [Vercel Dashboard](https://vercel.com/new).
2. Import the GitHub repository: `Jimmycarroll2021/mvmnt-designs`.
3. Framework Preset: Select **Other** (Static Site).
4. Root Directory: `./` (Repository root).
5. Click **Deploy**.

Every subsequent push to `main` will automatically trigger an atomic global edge deployment with sub-minute build times. Pull requests automatically generate unique preview deployment URLs.

### Custom Domain Configuration
When ready to connect the agency custom domain:
1. In Vercel Project Settings &rarr; **Domains**.
2. Add your custom domain (e.g., `mvmntdesigns.com` or `mvmnt.design`).
3. Set the following DNS records with your registrar:
   - **Type:** `A` | **Name:** `@` | **Value:** `76.76.21.21`
   - **Type:** `CNAME` | **Name:** `www` | **Value:** `cname.vercel-dns.com`
4. Vercel automatically provisions and renews managed wildcard SSL/TLS certificates via Let's Encrypt.

---

## 6. Pre-Flight Verification & Quality Checklist

Before any production push, verify the following:
- [x] Git repository initialized on branch `main`
- [x] `.gitignore` and `.gitattributes` committed
- [x] Remote `origin` linked to `git@github.com:Jimmycarroll2021/mvmnt-designs.git`
- [ ] Responsive layout verified at 320px, 390px, 768px, 1024px, and 1440px with 0px horizontal overflow
- [ ] All interactive CTAs and inquiry modals tested for keyboard trap prevention (`Escape` key support)
- [ ] All portfolio images loaded with responsive `aspect-ratio` and explicit dimensions
