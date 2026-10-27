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
import urllib.request
import urllib.error

CONFIG_PATH = r"C:\Users\Jimmy\.gemini\config\shopify_mvmnt_club.env"

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
    api_version = config.get("SHOPIFY_API_VERSION", "2024-04")
    
    if not token or not token.startswith("shpat_"):
        raise ValueError("Invalid or missing SHOPIFY_ADMIN_ACCESS_TOKEN in config.")
        
    url = f"https://{domain}/admin/api/{api_version}/graphql.json"
    payload = {"query": query}
    if variables:
        payload["variables"] = variables
        
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "X-Shopify-Access-Token": token,
            "Content-Type": "application/json",
            "User-Agent": "MVMNT-Growth-Engine/1.0"
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
    """Verifies that the configured access token successfully authenticates with Shopify."""
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
        print(f"[SUCCESS] Connected to Shopify Store: {shop['name']} ({shop['myshopifyDomain']})")
        print(f"  Currency:     {shop['currencyCode']}")
        print(f"  Plan:         {shop['plan']['displayName']}")
        print(f"  Store Email:  {shop['email']}")
        return True
    return False

def check_page(handle="custom-cycling-kit"):
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
    """Generates high-converting, professional Australian custom kit page HTML."""
    return """
<div class="mvmnt-custom-kit-container" style="max-width: 960px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937; line-height: 1.7;">

  <!-- Hero Section -->
  <div style="text-align: center; padding: 48px 20px 40px; background: #0b0f19; color: #ffffff; border-radius: 16px; margin-bottom: 48px;">
    <span style="display: inline-block; background: #1e293b; color: #38bdf8; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 6px 14px; border-radius: 9999px; margin-bottom: 16px;">Zero-Float Club Stores</span>
    <h1 style="font-size: 36px; font-weight: 800; line-height: 1.2; margin: 0 0 16px; color: #ffffff;">Custom Cycling Kit Australia</h1>
    <p style="font-size: 18px; color: #94a3b8; max-width: 680px; margin: 0 auto 28px;">
      Never float $10,000 of club funds, chase member bank transfers, or store unwanted sizes in a committee member's garage again.
    </p>
    <a href="#enquire" style="display: inline-block; background: #38bdf8; color: #0b0f19; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 8px; text-decoration: none; transition: opacity 0.2s;">Request Free 3D Heritage Kit Concept</a>
  </div>

  <!-- Key Pains & Benefits Grid -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 48px;">
    
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px;">
      <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px;">Zero Financial Risk for Committees</h3>
      <p style="font-size: 14px; color: #475569; margin: 0;">
        We build a private on-demand online store for your club. Members order and pay directly online. Your committee never has to front capital or risk club cash reserves.
      </p>
    </div>

    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px;">
      <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px;">Zero Garage Inventory</h3>
      <p style="font-size: 14px; color: #475569; margin: 0;">
        Eliminate leftover stock, awkward extra-small sizes, and unsold kit. Orders are batched and shipped individually or delivered in bulk directly to club distribution.
      </p>
    </div>

    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px;">
      <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px;">Pro Race & Masters Aero Cuts</h3>
      <p style="font-size: 14px; color: #475569; margin: 0;">
        Italian technical fabrics engineered for Australian summers. Sizing from 2XS to 3XL in both aero race-cut and comfortable club fits so every member looks and feels fast.
      </p>
    </div>

  </div>

  <!-- Trusted by Clubs Section -->
  <div style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 40px 0; margin-bottom: 48px; text-align: center;">
    <h3 style="font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-top: 0; margin-bottom: 20px;">Proven with Australian Cycling Clubs</h3>
    <p style="font-size: 15px; color: #334155; max-width: 720px; margin: 0 auto;">
      Trusted by racing organisations and cycling clubs including <strong>Capital Region Masters Cycling Club (CRMCC)</strong>, Cartel Racing, and Madera Floors. We understand Australian club culture, committee governance, and racer expectations.
    </p>
  </div>

  <!-- How It Works Timeline -->
  <div style="margin-bottom: 56px;">
    <h2 style="font-size: 26px; font-weight: 800; text-align: center; color: #0f172a; margin-bottom: 36px;">How The MVMNT Club Store Model Works</h2>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">
      <div style="padding: 20px; border-left: 3px solid #38bdf8; background: #ffffff;">
        <div style="font-weight: 800; color: #38bdf8; font-size: 14px; margin-bottom: 6px;">STEP 1</div>
        <h4 style="font-size: 16px; margin: 0 0 8px; color: #0f172a;">Design & 3D Render</h4>
        <p style="font-size: 13px; color: #64748b; margin: 0;">We take your existing club heritage or create a modern aesthetic concept with full 3D interactive renders.</p>
      </div>

      <div style="padding: 20px; border-left: 3px solid #38bdf8; background: #ffffff;">
        <div style="font-weight: 800; color: #38bdf8; font-size: 14px; margin-bottom: 6px;">STEP 2</div>
        <h4 style="font-size: 16px; margin: 0 0 8px; color: #0f172a;">Sample Kit & Fitting</h4>
        <p style="font-size: 13px; color: #64748b; margin: 0;">We supply a fit kit and fabric swatches so committee members and riders confirm their exact sizing with confidence.</p>
      </div>

      <div style="padding: 20px; border-left: 3px solid #38bdf8; background: #ffffff;">
        <div style="font-weight: 800; color: #38bdf8; font-size: 14px; margin-bottom: 6px;">STEP 3</div>
        <h4 style="font-size: 16px; margin: 0 0 8px; color: #0f172a;">Dedicated Club Portal</h4>
        <p style="font-size: 13px; color: #64748b; margin: 0;">We open your private club order portal for 2-3 weeks. Members order jerseys, bibs, vests, and accessories directly.</p>
      </div>

      <div style="padding: 20px; border-left: 3px solid #38bdf8; background: #ffffff;">
        <div style="font-weight: 800; color: #38bdf8; font-size: 14px; margin-bottom: 6px;">STEP 4</div>
        <h4 style="font-size: 16px; margin: 0 0 8px; color: #0f172a;">Production & Delivery</h4>
        <p style="font-size: 13px; color: #64748b; margin: 0;">Manufactured with precision and delivered on schedule before the new racing or club calendar begins.</p>
      </div>
    </div>
  </div>

  <!-- Enquiry / CTA Form Area -->
  <div id="enquire" style="background: #0f172a; color: #ffffff; padding: 40px; border-radius: 16px; text-align: center;">
    <h3 style="font-size: 24px; font-weight: 800; margin: 0 0 12px; color: #ffffff;">Book a Free Heritage Kit Design Concept</h3>
    <p style="font-size: 15px; color: #94a3b8; max-width: 580px; margin: 0 auto 28px;">
      Presenting to your committee soon? Send us your club logo, current kit photos, and approximate active rider count. We will prepare a 3D digital concept for your next committee meeting.
    </p>
    <a href="/pages/contact" style="display: inline-block; background: #38bdf8; color: #0f172a; font-weight: 700; font-size: 16px; padding: 14px 32px; border-radius: 8px; text-decoration: none;">Contact Our Custom Team</a>
  </div>

</div>
"""

def create_or_update_custom_kit_page(publish=True):
    """Creates or updates the /pages/custom-cycling-kit landing page on Shopify."""
    handle = "custom-cycling-kit"
    title = "Custom Cycling Kit Australia | Zero-Float Club Stores"
    body_html = build_custom_kit_page_html()
    
    existing = check_page(handle)
    if existing:
        page_id = existing["id"]
        print(f"[STATUS] Found existing page: {title} (ID: {page_id})")
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
            print(f"[SUCCESS] Page updated successfully: https://mvmnt-club.myshopify.com/pages/{p['handle']}")
            return p
        else:
            print(f"[ERROR] Failed to update page: {res}")
            return None
    else:
        print(f"[STATUS] Creating new landing page: {title}...")
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
            print(f"[SUCCESS] Page created successfully: https://mvmnt-club.myshopify.com/pages/{p['handle']}")
            return p
        else:
            print(f"[ERROR] Failed to create page: {res}")
            return None

if __name__ == "__main__":
    if test_connection():
        print("\n--- Verifying & Creating Custom Cycling Kit Landing Page ---")
        p = create_or_update_custom_kit_page(publish=True)
        if p:
            print(f"\n[VERIFIED] Live page ready at: https://mvmnt.club/pages/custom-cycling-kit")
