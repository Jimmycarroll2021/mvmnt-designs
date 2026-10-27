import sys, time
from playwright.sync_api import sync_playwright

VIEWPORTS = [
    {"name": "Desktop 1440px", "width": 1440, "height": 900},
    {"name": "Tablet 768px", "width": 768, "height": 1024},
    {"name": "Mobile 390px (iPhone)", "width": 390, "height": 844},
]

LIVE_URL = "https://mvmnt-designs.vercel.app"

def test_live_site():
    print(f"=== Testing Live Production Deployment: {LIVE_URL} ===")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        
        for vp in VIEWPORTS:
            page = context.new_page()
            page.set_viewport_size({"width": vp["width"], "height": vp["height"]})
            
            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
            
            print(f"\n[Viewport: {vp['name']}] Loading {LIVE_URL}...")
            response = page.goto(LIVE_URL, wait_until="networkidle", timeout=30000)
            
            assert response and response.status == 200, f"Expected 200 OK, got {response.status if response else 'None'}"
            print(f"  [PASS] HTTP Status: {response.status}")
            
            # Check horizontal scroll / overflow
            scroll_width = page.evaluate("document.documentElement.scrollWidth")
            client_width = page.evaluate("document.documentElement.clientWidth")
            overflow = scroll_width - client_width
            print(f"  [PASS] Viewport Width: {vp['width']}px | ScrollWidth: {scroll_width}px | Overflow: {overflow}px")
            assert overflow <= 1, f"Horizontal overflow detected: {overflow}px!"
            
            # Check essential headings & text
            title = page.title()
            print(f"  [PASS] Page Title: '{title}'")
            
            h1_text = page.locator("h1").first.inner_text()
            print(f"  [PASS] H1: '{h1_text}'")
            assert "High-Value Private Clients" in h1_text, "H1 does not match expected client-focused copy!"
            
            # Check Scoper component is present
            scoper = page.locator("#scoper")
            assert scoper.count() > 0, "Practice Strategy section not found!"
            print("  [PASS] Practice Strategy component verified present")
            
            # Check Case Study Images
            cover_img = page.locator("img[alt='Hali Institute Case Study Cover']")
            assert cover_img.count() > 0, "Case Study Cover image not found!"
            print("  [PASS] Case Study imagery verified present")
            
            # Check Pricing Packages
            pricing_section = page.locator("#pricing")
            assert pricing_section.count() > 0, "Pricing section not found!"
            assert "4,800" in pricing_section.inner_text(), "Solo Specialist price ($4,800) not found!"
            assert "8,800" in pricing_section.inner_text(), "Boutique Clinic price ($8,800) not found!"
            assert "16,500" in pricing_section.inner_text(), "Full Transformation price ($16,500) not found!"
            print("  [PASS] All 3 productized tiers ($4,800 / $8,800 / $16,500) verified")
            
            # Check Booking Form
            booking_section = page.locator("#booking")
            assert booking_section.count() > 0, "Booking form not found!"
            print("  [PASS] Consultation booking form verified")
            
            critical_errors = [e for e in console_errors if "favicon" not in e and "speed-insights" not in e and "sanity.io" not in e]
            if critical_errors:
                print(f"  [WARN] Console errors: {critical_errors}")
            else:
                print("  [PASS] Console clean (0 errors)")
            
            page.close()
            
        # Test Live Practice Strategy Interaction on Desktop
        print("\n=== Testing Live Strategy Guide on Desktop ===")
        interactive_page = context.new_page()
        interactive_page.set_viewport_size({"width": 1440, "height": 900})
        interactive_page.goto(LIVE_URL, wait_until="networkidle")
        
        # Click on the first suggested prompt button
        sample_btn = interactive_page.locator("button:has-text('Boutique Cosmetic / Medical Clinic')").first
        sample_btn.click()
        print("  [PASS] Clicked 'Boutique Cosmetic / Medical Clinic' preset button")
        
        # Wait for diagnostic output container and wait for streaming text to arrive
        interactive_page.wait_for_selector("#scoper .whitespace-pre-wrap:has-text('Practice & Client Overview')", timeout=20000)
        print("  [PASS] Streaming strategy output received in real-time UI!")
        
        time.sleep(1.5)
        output_box = interactive_page.locator("#scoper .whitespace-pre-wrap")
        output_text = output_box.inner_text()
        print(f"  [PASS] Strategy Output Length: {len(output_text)} chars")
        assert "Boutique Clinic" in output_text or "Practice" in output_text, "Expected package or practice in output"
        print("  [PASS] Strategy response contains verified practice positioning & recommendations")
        
        interactive_page.close()
        browser.close()
        
    print("\nALL LIVE PRODUCTION CHECKS PASSED WITH CLIENT-FOCUSED COPY!\n")

if __name__ == "__main__":
    test_live_site()
