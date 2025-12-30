import sys
from playwright.sync_api import sync_playwright

def verify_dynamic():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000")

        page.fill("textarea", "Tell me about Gravity")

        # Updated to match actual button text "Generate Guide"
        page.click("button:has-text('Generate Guide')")

        page.wait_for_timeout(3000)

        if not page.is_visible("text=Gravity (Gurutvakarshan)"):
             print("❌ Gravity topic not found.")
             sys.exit(1)

        print("✅ Dynamic/Mock verification passed!")
        browser.close()

if __name__ == "__main__":
    verify_dynamic()
