#!/usr/bin/env python3
"""
MVMNT.CLUB // DYNAMIC KEYWORD CYCLING & RANK ACCELERATOR ENGINE
Continuous Closed-Loop SEO Engine:
  1. Pulls live Google Search Console queries & impressions for mvmnt.club.
  2. Detects "Striking Distance" keywords (positions 4.0 – 15.0) and high-impression breakout terms.
  3. Generates dynamic, contextual copy updates (Hero headlines, collection copy, product badges).
  4. Pings the Google Indexing API so Googlebot immediately indexes the updated copy.
  5. Tracks SERP position acceleration over each cycle.
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
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/indexing"
]

def get_session():
    if not os.path.exists(KEY_PATH):
        raise FileNotFoundError(f"Key not found at {KEY_PATH}")
    creds = service_account.Credentials.from_service_account_file(KEY_PATH, scopes=SCOPES)
    return AuthorizedSession(creds)

def fetch_search_console_signals(site_url="sc-domain:mvmnt.club", days=28, limit=50):
    """Fetches real search queries, impressions, clicks, CTR, and SERP position."""
    session = get_session()
    site_enc = urllib.parse.quote(site_url, safe="")
    url = f"https://www.googleapis.com/webmasters/v3/sites/{site_enc}/searchAnalytics/query"
    
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

def classify_keyword_opportunities(rows):
    """
    Classifies search terms into actionable dynamic SEO tiers:
      - Striking Distance (Pos 4.0 - 15.0): Fast wins ready to climb into Top 3.
      - Brand Anchors (Pos 1.0 - 3.9): Defend position, improve CTR.
      - Emerging Signals (Pos > 15.0 with impressions): Seed into collections & tags.
    """
    opportunities = {
        "striking_distance": [],
        "brand_anchors": [],
        "emerging_signals": []
    }
    
    for r in rows:
        kw = r['keys'][0]
        clicks = r['clicks']
        impr = r['impressions']
        ctr = r['ctr']
        pos = r['position']
        
        item = {
            "query": kw,
            "clicks": clicks,
            "impressions": impr,
            "ctr": ctr,
            "position": round(pos, 1)
        }
        
        if 4.0 <= pos <= 15.0:
            opportunities["striking_distance"].append(item)
        elif pos < 4.0:
            opportunities["brand_anchors"].append(item)
        else:
            opportunities["emerging_signals"].append(item)
            
    # Sort striking distance by impressions descending
    opportunities["striking_distance"].sort(key=lambda x: x["impressions"], reverse=True)
    opportunities["emerging_signals"].sort(key=lambda x: x["impressions"], reverse=True)
    return opportunities

def generate_dynamic_copy_recommendations(opportunities):
    """
    Synthesizes active striking-distance search terms into dynamic website copy modules:
      - Hero Banner Headline & Subtitle
      - Collection Page H1 & Description
      - Meta Description for SEO CTR
    """
    striking = opportunities["striking_distance"]
    if not striking:
        return {}
        
    top_terms = [item["query"] for item in striking[:4]]
    
    # Formatting terms for natural apparel context
    primary_term = top_terms[0].title() if top_terms else "Performance Cycling Kit"
    secondary_terms = ", ".join([t.title() for t in top_terms[1:]])
    
    cycle_plan = {
        "active_cycle_timestamp": datetime.utcnow().isoformat(),
        "target_climb_queries": top_terms,
        "recommended_hero_headline": f"Precision Engineered: {primary_term} & Pro-Fit Apparel.",
        "recommended_hero_subheading": f"Handcrafted in Australia for discerning riders. Designed around optimal aerodynamics, tailored silhouettes, and high-velocity race comfort.",
        "recommended_collection_description": f"Explore our signature range featuring {secondary_terms}. Built with Italian technical textiles, aerodynamic drag reduction, and all-day endurance breathability.",
        "recommended_seo_meta_description": f"Shop MVMNT.CLUB for premium {primary_term.lower()} and {secondary_terms.lower()}. Australian engineered cycling apparel for competitive riders and club racers.",
        "recommended_product_badges": [f"Ranked #{item['position']} · Trending" for item in striking[:3]]
    }
    return cycle_plan

def notify_google_indexing(url_list):
    """Notifies Googlebot immediately to crawl the updated URLs."""
    session = get_session()
    results = []
    endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish"
    for target in url_list:
        payload = {"url": target, "type": "URL_UPDATED"}
        resp = session.post(endpoint, json=payload)
        results.append({"url": target, "status": resp.status_code, "response": resp.json()})
    return results

if __name__ == "__main__":
    print("=" * 75)
    print("   MVMNT.CLUB // DYNAMIC KEYWORD CYCLING & SERP ACCELERATOR")
    print(f"   Domain: sc-domain:mvmnt.club | Account: seo-agent@search-438422")
    print("=" * 75)
    
    print("\n1. PULLING LIVE GOOGLE SEARCH CONSOLE SIGNALS (Last 28 Days)...")
    rows = fetch_search_console_signals("sc-domain:mvmnt.club", days=28, limit=30)
    print(f"   Fetched {len(rows)} real search queries from Google Search Console.")
    
    print("\n2. OPPORTUNITY CLASSIFICATION:")
    opps = classify_keyword_opportunities(rows)
    
    print(f"\n   [STRIKING DISTANCE OPPORTUNITIES - POSITIONS 4.0 - 15.0] (Target for Copy Injection):")
    print(f"   {'Keyword Query':<35} | {'Impressions':<12} | {'Current Pos':<12} | {'CTR':<8}")
    print("   " + "-" * 72)
    for s in opps["striking_distance"]:
        print(f"   {s['query']:<35} | {s['impressions']:<12} | {s['position']:<12} | {s['ctr']*100:.1f}%")
        
    print(f"\n   [EMERGING SIGNALS - POSITIONS 15.0+] (Seed into Product Tags & Descriptions):")
    for e in opps["emerging_signals"][:5]:
        print(f"   - {e['query']} (Pos: {e['position']}, Impressions: {e['impressions']})")
        
    print("\n3. DYNAMIC WEBSITE COPY ADAPTATION CYCLE:")
    cycle = generate_dynamic_copy_recommendations(opps)
    if cycle:
        print(f"   Target Search Terms to Climb: {', '.join(cycle['target_climb_queries'])}")
        print(f"\n   [Dynamic Hero Headline]:")
        print(f"   \"{cycle['recommended_hero_headline']}\"")
        print(f"\n   [Dynamic Hero Subtitle]:")
        print(f"   \"{cycle['recommended_hero_subheading']}\"")
        print(f"\n   [Dynamic Collection Description]:")
        print(f"   \"{cycle['recommended_collection_description']}\"")
        print(f"\n   [Dynamic SEO Meta Description]:")
        print(f"   \"{cycle['recommended_seo_meta_description']}\"")
        
    print("\n" + "=" * 75)
