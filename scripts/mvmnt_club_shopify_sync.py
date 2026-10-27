#!/usr/bin/env python3
"""
MVMNT.CLUB // SECURE SHOPIFY STORE SYNCHRONIZATION ENGINE
Reads credentials strictly from the local secure environment config:
  C:\\Users\\Jimmy\\.gemini\\config\\shopify_mvmnt_club.env
Never outputs secrets or tokens to stdout or chat.
"""

import os
import sys
import json
import argparse
import urllib.request
import urllib.error

CONFIG_PATH = r"C:\Users\Jimmy\.gemini\config\shopify_mvmnt_club.env"
API_VERSION = "2025-01"

def load_config():
    """Loads Shopify store credentials from local secure config file."""
    if not os.path.exists(CONFIG_PATH):
        return None
    
    config = {}
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                config[key.strip()] = val.strip().strip('"').strip("'")
    return config

def execute_graphql(query, variables=None):
    """Executes an authenticated GraphQL query or mutation against Shopify Admin API."""
    config = load_config()
    if not config:
        raise ValueError("Missing local Shopify configuration file.")
        
    domain = config.get("SHOPIFY_STORE_DOMAIN", "mvmnt-club.myshopify.com")
    token = config.get("SHOPIFY_ADMIN_ACCESS_TOKEN")
    api_ver = config.get("SHOPIFY_API_VERSION", API_VERSION)
    
    if not token or not token.startswith("shpat_"):
        raise ValueError("Invalid or missing SHOPIFY_ADMIN_ACCESS_TOKEN in config.")
        
    url = f"https://{domain}/admin/api/{api_ver}/graphql.json"
    payload = {"query": query}
    if variables:
        payload["variables"] = variables
        
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "X-Shopify-Access-Token": token,
            "Content-Type": "application/json",
            "User-Agent": "MVMNT-Growth-Engine/2.0"
        }
    )
    
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if "errors" in data:
                print(f"[GRAPHQL ERROR] {data['errors']}")
            return data
    except urllib.error.HTTPError as e:
        print(f"[HTTP ERROR {e.code}] {e.read().decode('utf-8')}")
        return None
    except Exception as e:
        print(f"[REQUEST ERROR] {e}")
        return None

def test_connection():
    """Read-only verification of Shopify credentials and store state."""
    query = """
    {
      shop {
        name
        myshopifyDomain
        currencyCode
        plan {
          displayName
        }
        email
      }
    }
    """
    res = execute_graphql(query)
    if res and "data" in res and res["data"].get("shop"):
        shop = res["data"]["shop"]
        print(f"[SUCCESS] Read-Only Connection Verified:")
        print(f"  Store:        {shop['name']} ({shop['myshopifyDomain']})")
        print(f"  Currency:     {shop['currencyCode']}")
        print(f"  Plan:         {shop['plan']['displayName']}")
        print(f"  Store Email:  {shop['email']}")
        print(f"  API Version:  {API_VERSION}")
        return True
    return False

def check_page(handle):
    """Checks if a page exists by handle."""
    query = """
    query GetPage($query: String!) {
      pages(first: 1, query: $query) {
        edges {
          node {
            id
            title
            handle
            isPublished
            updatedAt
          }
        }
      }
    }
    """
    res = execute_graphql(query, {"query": f"handle:{handle}"})
    if res and "data" in res and res["data"].get("pages", {}).get("edges"):
        return res["data"]["pages"]["edges"][0]["node"]
    return None

def build_custom_kit_page_html():
    """
    Generates high-converting, professional Australian custom kit page HTML.
    Strictly enforces:
      - Exactly ONE <h1> tag for SEO integrity
      - Accurate contact copy that does not promise non-existent attachment fields
      - Validated semantic hierarchy (h1 -> h2 -> h3)
    """
    return """
<div class="mvmnt-custom-kit-container" style="max-width: 960px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937; line-height: 1.7;">

  <!-- Hero Section (Sole H1 Tag) -->
  <header style="text-align: center; padding: 48px 20px 40px; background: #0b0f19; color: #ffffff; border-radius: 16px; margin-bottom: 48px;">
    <span style="display: inline-block; background: #1e293b; color: #38bdf8; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 6px 14px; border-radius: 9999px; margin-bottom: 16px;">Zero-Float Club Stores</span>
    <h1 style="font-size: 36px; font-weight: 800; line-height: 1.2; margin: 0 0 16px; color: #ffffff;">Custom Cycling Kit Australia</h1>
    <p style="font-size: 18px; color: #94a3b8; max-width: 680px; margin: 0 auto 28px;">
      Never float $10,000 of club funds, chase member bank transfers, or store unwanted sizes in a committee member's garage again.
    </p>
    <a href="#enquire" style="display: inline-block; background: #38bdf8; color: #0b0f19; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 8px; text-decoration: none;">Request Free 3D Heritage Kit Concept</a>
  </header>

  <!-- Key Benefits Grid (H2) -->
  <section style="margin-bottom: 48px;">
    <h2 style="font-size: 24px; font-weight: 800; text-align: center; color: #0f172a; margin-bottom: 32px;">Zero Financial Risk for Australian Committees</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
      
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px;">
        <h3 style="font-size: 17px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 10px;">Zero Financial Risk for Committees</h3>
        <p style="font-size: 14px; color: #475569; margin: 0;">
          We build a private on-demand online store for your club. Members order and pay directly online. Your committee never has to front capital or risk club cash reserves.
        </p>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px;">
        <h3 style="font-size: 17px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 10px;">Zero Garage Inventory</h3>
        <p style="font-size: 14px; color: #475569; margin: 0;">
          Eliminate leftover stock, awkward extra-small sizes, and unsold kit. Orders are batched and shipped individually or delivered in bulk directly to club distribution.
        </p>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px;">
        <h3 style="font-size: 17px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 10px;">Pro Race & Masters Aero Cuts</h3>
        <p style="font-size: 14px; color: #475569; margin: 0;">
          Italian technical fabrics engineered for Australian conditions. Sizing from 2XS to 3XL in both aero race-cut and comfortable club fits so every member looks and feels fast.
        </p>
      </div>

    </div>
  </section>

  <!-- Social Proof Section (H2) -->
  <section style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 40px 0; margin-bottom: 48px; text-align: center;">
    <h2 style="font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-top: 0; margin-bottom: 16px;">Proven with Australian Cycling Clubs</h2>
    <p style="font-size: 15px; color: #334155; max-width: 720px; margin: 0 auto;">
      Trusted by racing organisations and cycling clubs including <strong>Capital Region Masters Cycling Club (CRMCC)</strong>, Cartel Racing, and Madera Floors. We understand Australian club culture, committee governance, and racer expectations.
    </p>
  </section>

  <!-- How It Works (H2) -->
  <section style="margin-bottom: 56px;">
    <h2 style="font-size: 24px; font-weight: 800; text-align: center; color: #0f172a; margin-bottom: 36px;">How The MVMNT Club Store Model Works</h2>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">
      <div style="padding: 20px; border-left: 3px solid #38bdf8; background: #ffffff;">
        <div style="font-weight: 800; color: #38bdf8; font-size: 13px; margin-bottom: 6px;">STEP 1</div>
        <h3 style="font-size: 16px; margin: 0 0 8px; color: #0f172a;">Design & 3D Render</h3>
        <p style="font-size: 13px; color: #64748b; margin: 0;">We take your existing club heritage or create a modern aesthetic concept with full 3D interactive renders.</p>
      </div>

      <div style="padding: 20px; border-left: 3px solid #38bdf8; background: #ffffff;">
        <div style="font-weight: 800; color: #38bdf8; font-size: 13px; margin-bottom: 6px;">STEP 2</div>
        <h3 style="font-size: 16px; margin: 0 0 8px; color: #0f172a;">Sample Kit & Fitting</h3>
        <p style="font-size: 13px; color: #64748b; margin: 0;">We supply a fit kit and fabric swatches so committee members and riders confirm their exact sizing with confidence.</p>
      </div>

      <div style="padding: 20px; border-left: 3px solid #38bdf8; background: #ffffff;">
        <div style="font-weight: 800; color: #38bdf8; font-size: 13px; margin-bottom: 6px;">STEP 3</div>
        <h3 style="font-size: 16px; margin: 0 0 8px; color: #0f172a;">Dedicated Club Portal</h3>
        <p style="font-size: 13px; color: #64748b; margin: 0;">We open your private club order portal for 2-3 weeks. Members order jerseys, bibs, vests, and accessories directly.</p>
      </div>

      <div style="padding: 20px; border-left: 3px solid #38bdf8; background: #ffffff;">
        <div style="font-weight: 800; color: #38bdf8; font-size: 13px; margin-bottom: 6px;">STEP 4</div>
        <h3 style="font-size: 16px; margin: 0 0 8px; color: #0f172a;">Production & Delivery</h3>
        <p style="font-size: 13px; color: #64748b; margin: 0;">Manufactured with precision and delivered on schedule before the new racing or club calendar begins.</p>
      </div>
    </div>
  </section>

  <!-- Enquiry / CTA Form Area (H2) -->
  <section id="enquire" style="background: #0b0f19; color: #ffffff; padding: 40px; border-radius: 16px; text-align: center;">
    <h2 style="font-size: 24px; font-weight: 800; margin: 0 0 12px; color: #ffffff;">Request a Free 3D Heritage Kit Concept</h2>
    <p style="font-size: 15px; color: #94a3b8; max-width: 620px; margin: 0 auto 28px;">
      Presenting to your committee soon? Send an enquiry with your club name and rider numbers below. Our team will follow up directly via email to review your design and collect your logos and current kit photos.
    </p>
    <a href="/pages/contact" style="display: inline-block; background: #38bdf8; color: #0b0f19; font-weight: 700; font-size: 16px; padding: 14px 32px; border-radius: 8px; text-decoration: none;">Contact Our Custom Team</a>
  </section>

</div>
"""

def update_or_create_page(handle, title, body_html, publish=True):
    """Updates existing page or creates if missing."""
    existing = check_page(handle)
    if existing:
        page_id = existing["id"]
        print(f"[STATUS] Updating existing page: {title} (ID: {page_id}, Handle: {handle})")
        update_mutation = """
        mutation UpdatePage($id: ID!, $page: PageUpdateInput!) {
          pageUpdate(id: $id, page: $page) {
            page {
              id
              title
              handle
              isPublished
              updatedAt
            }
            userErrors {
              field
              message
            }
          }
        }
        """
        res = execute_graphql(update_mutation, {
            "id": page_id,
            "page": {
              "title": title,
              "body": body_html,
              "isPublished": publish
            }
        })
        if res and res.get("data", {}).get("pageUpdate", {}).get("page"):
            p = res["data"]["pageUpdate"]["page"]
            print(f"[SUCCESS] Page updated: https://mvmnt-club.myshopify.com/pages/{p['handle']}")
            return p
        else:
            print(f"[ERROR] Update failed: {res}")
            return None
    else:
        print(f"[STATUS] Creating page: {title} (Handle: {handle})...")
        create_mutation = """
        mutation CreatePage($page: PageCreateInput!) {
          pageCreate(page: $page) {
            page {
              id
              title
              handle
              isPublished
            }
            userErrors {
              field
              message
            }
          }
        }
        """
        res = execute_graphql(create_mutation, {
            "page": {
              "title": title,
              "handle": handle,
              "body": body_html,
              "isPublished": publish
            }
        })
        if res and res.get("data", {}).get("pageCreate", {}).get("page"):
            p = res["data"]["pageCreate"]["page"]
            print(f"[SUCCESS] Page created: https://mvmnt-club.myshopify.com/pages/{p['handle']}")
            return p
        else:
            print(f"[ERROR] Create failed: {res}")
            return None

def sync_landing_pages():
    """Synchronizes both the navigation handle (/pages/custom-kit) and SEO handle (/pages/custom-cycling-kit)."""
    title = "Custom Cycling Kit Australia | Zero-Float Club Stores"
    body_html = build_custom_kit_page_html()
    
    print("\n--- Synchronizing Navigation Handle: /pages/custom-kit ---")
    p1 = update_or_create_page("custom-kit", title, body_html, publish=True)

    print("\n--- Synchronizing SEO Keyword Handle: /pages/custom-cycling-kit ---")
    p2 = update_or_create_page("custom-cycling-kit", title, body_html, publish=True)

    return p1 and p2

def main():
    parser = argparse.ArgumentParser(description="MVMNT.CLUB Secure Shopify Store Synchronization Engine")
    parser.add_argument("--publish", action="store_true", help="Explicitly authorises writing and publishing updates to Shopify")
    parser.add_argument("--test", action="store_true", help="Runs read-only connection test only (default behavior)")
    args = parser.parse_args()

    # Default to test-connection if --publish is not passed
    if not args.publish:
        print("[MODE] Read-Only Connection Test (no changes made to Shopify).")
        print("To publish landing page updates, re-run with: python scripts/mvmnt_club_shopify_sync.py --publish\n")
        ok = test_connection()
        sys.exit(0 if ok else 1)

    print("[MODE] Production Publishing Authorized.")
    if not test_connection():
        print("[ERROR] Connection test failed. Aborting publishing.")
        sys.exit(1)

    success = sync_landing_pages()
    if success:
        print("\n[VERIFIED] Both /pages/custom-kit and /pages/custom-cycling-kit are live and synchronized.")
    else:
        print("\n[WARNING] Synchronization encountered errors.")
        sys.exit(1)

if __name__ == "__main__":
    main()
