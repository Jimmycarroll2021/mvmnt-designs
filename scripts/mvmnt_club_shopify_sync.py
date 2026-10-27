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

def test_connection():
    """Verifies that the configured access token successfully authenticates with Shopify."""
    config = load_config()
    if not config:
        print(f"[STATUS] Waiting for config file at: {CONFIG_PATH}")
        return False
        
    domain = config.get("SHOPIFY_STORE_DOMAIN", "mvmnt-club.myshopify.com")
    token = config.get("SHOPIFY_ADMIN_ACCESS_TOKEN")
    api_version = config.get("SHOPIFY_API_VERSION", "2024-04")
    
    if not token or not token.startswith("shpat_"):
        print("[ERROR] Token in config does not appear to be a valid Shopify Admin token (should start with 'shpat_').")
        return False
        
    url = f"https://{domain}/admin/api/{api_version}/shop.json"
    req = urllib.request.Request(url, headers={
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
        "User-Agent": "MVMNT-Growth-Engine/1.0"
    })
    
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            shop = data.get("shop", {})
            print(f"[SUCCESS] Connected to Shopify Store: {shop.get('name')} ({shop.get('myshopify_domain')})")
            print(f"  Currency:     {shop.get('currency')} {shop.get('money_format')}")
            print(f"  Plan:         {shop.get('plan_name')}")
            print(f"  Store Email:  {shop.get('email')}")
            return True
    except urllib.error.HTTPError as e:
        print(f"[AUTH ERROR] HTTP {e.code}: {e.reason}")
        return False
    except Exception as e:
        print(f"[CONNECTION ERROR] {e}")
        return False

if __name__ == "__main__":
    test_connection()
