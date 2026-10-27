#!/usr/bin/env python3
"""
MVMNT.CLUB // HIGH-TICKET CUSTOM CYCLING KEYWORD & REVENUE EXPANSION ENGINE
Expands beyond narrow historical brand queries into high-value custom kit commercial search terms:
  - Custom Cycling Kits Australia ($3,000 - $30,000 order value)
  - Club Kit Zero-Float Solutions
  - Masters-Fit Pro Jerseys & Bib Shorts
  - Corporate / Gran Fondo Charity Team Kits
  - City-specific commercial landing page matrices (Sydney, Melbourne, Brisbane, Adelaide, Perth)
"""

import os
import sys
import json
import csv
from datetime import datetime

# High-Ticket Commercial Custom Cycling Search Universe (Australia Focus)
CUSTOM_CYCLING_KEYWORD_MATRIX = [
    {
        "cluster": "Core Custom Cycling Kit",
        "primary": "custom cycling kit australia",
        "secondary": ["custom cycling jerseys australia", "custom cycling apparel", "bespoke cycling kits"],
        "intent": "High Transactional (Club & Team Orders)",
        "avg_deal_value": "$5,000 – $25,000 AUD",
        "target_page": "/pages/custom-cycling-kit"
    },
    {
        "cluster": "Cycling Club Zero-Float Stores",
        "primary": "custom cycling kit for clubs",
        "secondary": ["cycling club kit design", "no minimum custom cycling kit", "zero float club store cycling"],
        "intent": "Commercial Investigation (Club Committees)",
        "avg_deal_value": "$8,000 – $35,000 AUD / season",
        "target_page": "/pages/club-stores"
    },
    {
        "cluster": "Aero & Masters Race Cut Apparel",
        "primary": "custom aero cycling jersey",
        "secondary": ["custom cycling bib shorts", "masters fit cycling jerseys", "aerodynamic custom cycling kit"],
        "intent": "Transactional (Competitive Teams & Crits)",
        "avg_deal_value": "$4,000 – $15,000 AUD",
        "target_page": "/collections/custom-aero-series"
    },
    {
        "cluster": "Corporate & Gran Fondo Events",
        "primary": "corporate custom cycling jerseys",
        "secondary": ["charity ride custom cycling kit", "gran fondo team kit design", "corporate cycling apparel australia"],
        "intent": "High-Ticket B2B Corporate",
        "avg_deal_value": "$10,000 – $50,000 AUD",
        "target_page": "/pages/corporate-custom-cycling"
    },
    {
        "cluster": "Geographic Metros (Australia)",
        "primary": "custom cycling kit melbourne",
        "secondary": [
            "custom cycling kit sydney",
            "custom cycling kit brisbane",
            "custom cycling kit adelaide",
            "custom cycling kit perth"
        ],
        "intent": "Local Commercial",
        "avg_deal_value": "$5,000 – $20,000 AUD",
        "target_page": "/pages/custom-cycling-kit-[city]"
    }
]

def load_prioritised_clubs():
    """Loads the 105 prioritised Australian cycling clubs database."""
    csv_path = r"C:\Users\Jimmy\Documents\CLUBS\AUSTRALIA_CLUBS_PRIORITISED.csv"
    if not os.path.exists(csv_path):
        return []
    clubs = []
    with open(csv_path, mode='r', encoding='utf-8', errors='ignore') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row.get('name'):
                clubs.append(row)
    return clubs

def generate_custom_kit_editorial_copy(cluster_name="Core Custom Cycling Kit"):
    """
    Generates high-converting, direct-response copy addressing committee pain points:
    No float, no chasing money, masters cut, season-start delivery guarantee.
    """
    return {
        "h1_title": "Custom Cycling Kit Engineered for Australia's Premier Clubs & Teams.",
        "subheading": "Zero Club Float · Zero Member Chasing · Guaranteed Season-Start Delivery.",
        "lead_paragraph": (
            "Most custom kit suppliers create endless committee headaches: boxes of unsold stock, "
            "angry riders waiting months for late shipments, and awkward volunteer chasing for bank transfers. "
            "MVMNT.CLUB eliminates the float completely. We design bespoke, race-proven kit tailored to your "
            "club's heritage, launch a private direct-order portal for your riders, and guarantee delivery before round one."
        ),
        "three_pillars": [
            {
                "title": "01. The No-Float Club Store",
                "desc": "Your club touches zero cash, zero inventory, and zero leftovers. Members order and pay directly online."
            },
            {
                "title": "02. The Masters & Pro-Fit Library",
                "desc": "Italian technical fabrics cut for real riders. Generous sleeve coverage, high-density endurance chamois, and aerodynamic drag reduction."
            },
            {
                "title": "03. The Season-Start Guarantee",
                "desc": "Your kit arrives in riders' hands two weeks before your opening race, or we refund our entire margin."
            }
        ],
        "meta_title": "Custom Cycling Kit Australia | Zero-Float Club Stores | MVMNT.CLUB",
        "meta_description": (
            "Bespoke custom cycling kits & team apparel for Australian cycling clubs and racing squads. "
            "Zero upfront club float, private member stores, and race-proven Italian fabrics."
        )
    }

if __name__ == '__main__':
    print("=" * 75)
    print("   MVMNT.CLUB // HIGH-TICKET CUSTOM CYCLING KEYWORD EXPANSION")
    print("=" * 75)
    
    print("\n1. COMMERCIAL HIGH-VALUE KEYWORD CLUSTERS:")
    for c in CUSTOM_CYCLING_KEYWORD_MATRIX:
        print(f"\n   [Cluster: {c['cluster']}]")
        print(f"   Primary Keyword:     '{c['primary']}'")
        print(f"   Secondary Variations: {', '.join(c['secondary'])}")
        print(f"   Estimated Deal Value: {c['avg_deal_value']}")
        print(f"   Target Page:          {c['target_page']}")
        
    clubs = load_prioritised_clubs()
    print(f"\n2. AUSTRALIAN CYCLING CLUB ECOSYSTEM LINK:")
    print(f"   Loaded {len(clubs)} targeted Australian cycling clubs from playbook.")
    sample = [c['name'] + ' (' + c['city'] + ')' for c in clubs[:5]]
    print(f"   Top Targets: {', '.join(sample)}")
    
    print("\n3. GENERATED DYNAMIC COPY FOR HIGH-TICKET CUSTOM KIT PAGE:")
    copy = generate_custom_kit_editorial_copy()
    print(f"   H1: {copy['h1_title']}")
    print(f"   Subheading: {copy['subheading']}")
    print(f"   Meta Description: {copy['meta_description']}")
    print("\n" + "=" * 75)
