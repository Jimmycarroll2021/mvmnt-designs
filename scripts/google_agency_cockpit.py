"""
MVMNT STUDIO // GOOGLE AGENCY GROWTH COCKPIT
Programmatic Integration with Google's Growth & Marketing Ecosystem:
  1. Google Search Console API (Live Search Queries, Clicks, Impressions, Position)
  2. Google Indexing API (Direct Bot Notification to Index URLs in minutes)
  3. Google Ads API / Keyword Planner (Search Volume, CPC Bids, Competition Index)
  4. Google Analytics 4 (GA4) Data API (Real-Time Traffic, Conversion Events)
  5. Google PageSpeed Insights & CrUX API (Live Core Web Vitals Score)
"""

import os
import sys
import json

def get_installed_google_sdk_status():
    """Audits the local environment for official Google growth libraries."""
    sdks = {
        "google-ads": ("google.ads.googleads", "Official Google Ads & Keyword Planner Python SDK"),
        "google-api-python-client": ("googleapiclient", "Official Google API Client (Search Console, Indexing, GA4, My Business)"),
        "google-auth": ("google.auth", "Google IAM & Service Account Authentication"),
        "google-auth-oauthlib": ("google_auth_oauthlib", "Interactive OAuth 2.0 Flow Handler"),
    }
    
    status = {}
    for pkg, (import_name, desc) in sdks.items():
        try:
            __import__(import_name)
            status[pkg] = {"installed": True, "description": desc}
        except ImportError:
            status[pkg] = {"installed": False, "description": desc}
    return status

def generate_gsc_verification_tag_snippet(verification_code="YOUR_VERIFICATION_TOKEN_HERE"):
    """Generates the Next.js App Router meta tag for instant domain verification."""
    return f"""// Add to frontend/app/layout.tsx in generateMetadata():
verification: {{
  google: '{verification_code}',
}},
"""

def generate_gsc_ranking_query_template():
    """Template code for querying Google Search Console API for keyword rankings."""
    return '''from googleapiclient.discovery import build
from google.oauth2 import service_account

SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']
KEY_FILE = 'service_account.json'  # or application default credentials

def get_top_ranking_keywords(site_url='https://mvmnt-designs.vercel.app/'):
    creds = service_account.Credentials.from_service_account_file(KEY_FILE, scopes=SCOPES)
    service = build('searchconsole', 'v1', credentials=creds)
    
    # Request last 28 days of keyword query data
    request = {
        'startDate': '2026-10-01',
        'endDate': '2026-10-28',
        'dimensions': ['query', 'page'],
        'rowLimit': 25,
        'aggregationType': 'byPage'
    }
    
    response = service.searchanalytics().query(siteUrl=site_url, body=request).execute()
    rows = response.get('rows', [])
    for row in rows:
        keyword = row['keys'][0]
        clicks = row['clicks']
        impressions = row['impressions']
        ctr = row['ctr']
        avg_position = row['position']
        print(f"Keyword: {keyword:<35} Pos: {avg_position:<5.1f} Clicks: {clicks:<4} Impr: {impressions}")
'''

def generate_google_indexing_api_template():
    """Template for submitting URLs directly to Googlebot for immediate crawling."""
    return '''from googleapiclient.discovery import build
from google.oauth2 import service_account

SCOPES = ["https://www.googleapis.com/auth/indexing"]
KEY_FILE = 'service_account.json'

def submit_url_for_immediate_index(url_to_crawl='https://mvmnt-designs.vercel.app'):
    creds = service_account.Credentials.from_service_account_file(KEY_FILE, scopes=SCOPES)
    service = build('indexing', 'v3', credentials=creds)
    
    content = {
        'url': url_to_crawl,
        'type': 'URL_UPDATED'  # or 'URL_DELETED'
    }
    response = service.urlNotifications().publish(body=content).execute()
    print("Googlebot Indexing Request Sent:", response)
'''

if __name__ == '__main__':
    print("=== MVMNT STUDIO // GOOGLE AGENCY GROWTH SDK AUDIT ===")
    status = get_installed_google_sdk_status()
    for sdk, details in status.items():
        mark = "[INSTALLED]" if details['installed'] else "[MISSING]"
        print(f"  {mark} {sdk:<26} -> {details['description']}")
    print("\nNext.js Verification Snippet:\n", generate_gsc_verification_tag_snippet())
