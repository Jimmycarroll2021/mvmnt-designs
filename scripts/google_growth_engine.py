#!/usr/bin/env python3
"""
MVMNT STUDIO // LIVE GOOGLE GROWTH ENGINE
Direct integration with Google Search Console, Google Indexing API, and Core Web Vitals.
Service Account Identity: seo-agent@search-438422.iam.gserviceaccount.com
Credentials: C:\\Users\\Jimmy\\.gemini\\config\\seo_agent_service_account.json
"""

import os
import sys
import json
import urllib.parse
from datetime import datetime, timedelta
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

KEY_PATH = r"C:\Users\Jimmy\.gemini\config\seo_agent_service_account.json"
SCOPES = [
    "https://www.googleapis.com/auth/webmasters",
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/indexing"
]

def get_session():
    """Initialises an authorized session using the local Google Cloud service account."""
    if not os.path.exists(KEY_PATH):
        raise FileNotFoundError(f"Service account key not found at: {KEY_PATH}")
    creds = service_account.Credentials.from_service_account_file(KEY_PATH, scopes=SCOPES)
    return AuthorizedSession(creds)

def list_verified_sites():
    """Lists all Search Console properties accessible by this service account."""
    session = get_session()
    resp = session.get("https://www.googleapis.com/webmasters/v3/sites")
    if resp.status_code != 200:
        print(f"[ERROR] Failed to list sites: {resp.status_code} {resp.text}")
        return []
    sites = resp.json().get("siteEntry", [])
    return sites

def query_search_analytics(site_url="sc-domain:mvmnt.club", days=28, limit=15):
    """Fetches real-time search queries, impressions, clicks, CTR, and SERP position."""
    session = get_session()
    site_encoded = urllib.parse.quote(site_url, safe="")
    url = f"https://www.googleapis.com/webmasters/v3/sites/{site_encoded}/searchAnalytics/query"
    
    end_date = (datetime.utcnow() - timedelta(days=2)).strftime("%Y-%m-%d")
    start_date = (datetime.utcnow() - timedelta(days=days)).strftime("%Y-%m-%d")
    
    payload = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": ["query"],
        "rowLimit": limit
    }
    
    resp = session.post(url, json=payload)
    if resp.status_code != 200:
        print(f"[ERROR] Search Analytics query failed ({resp.status_code}): {resp.text}")
        return []
    return resp.json().get("rows", [])

def submit_url_to_indexing_api(target_url):
    """Submits a URL to the Google Indexing API for rapid Googlebot crawling."""
    session = get_session()
    url = "https://indexing.googleapis.com/v3/urlNotifications:publish"
    payload = {
        "url": target_url,
        "type": "URL_UPDATED"
    }
    resp = session.post(url, json=payload)
    return resp.status_code, resp.json()

if __name__ == "__main__":
    print("=" * 70)
    print("   MVMNT STUDIO // LIVE GOOGLE SEARCH CONSOLE & GROWTH ENGINE")
    print(f"   Identity: seo-agent@search-438422.iam.gserviceaccount.com")
    print("=" * 70)
    
    # 1. List Verified Properties
    print("\n1. VERIFIED SEARCH CONSOLE PROPERTIES:")
    sites = list_verified_sites()
    if not sites:
        print("   No verified properties currently assigned.")
    for s in sites:
        print(f"   - Property: {s.get('siteUrl')} (Permission: {s.get('permissionLevel')})")
        
    # 2. Query Live Search Performance
    print("\n2. LIVE TOP SEARCH QUERIES (Last 28 Days):")
    if sites:
        primary_site = sites[0].get('siteUrl')
        rows = query_search_analytics(primary_site, days=28, limit=10)
        if rows:
            print(f"   {'Keyword Query':<35} | {'Clicks':<6} | {'Impressions':<12} | {'CTR':<8} | {'Avg Pos':<8}")
            print("   " + "-" * 75)
            for r in rows:
                kw = r['keys'][0]
                clicks = r['clicks']
                impr = r['impressions']
                ctr = f"{r['ctr']*100:.1f}%"
                pos = f"{r['position']:.1f}"
                print(f"   {kw:<35} | {clicks:<6} | {impr:<12} | {ctr:<8} | {pos:<8}")
        else:
            print("   No search data recorded for this window.")
            
    print("\n" + "=" * 70)
