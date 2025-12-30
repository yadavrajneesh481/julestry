import sys
from playwright.sync_api import sync_playwright

def verify_markdown_parsing():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Go to the local app
        page.goto("http://localhost:3000")

        # Define the Markdown prompt
        markdown_prompt = """# JavaScript Objects - Complete Guide (Basic to Advanced)
> **Goal**: JavaScript Objects ko zero level se advanced + edge cases + interview-ready level tak deeply samajhna ---

## 1️⃣ BASICS

### 💡 What is a JavaScript Object?
**Definition**:
A **JavaScript Object** is a collection of key-value pairs where keys are strings (or Symbols) and values can be any data type.

**Simple words**:
🔹 Object ek container hai jisme data **key aur value** ke form me store hota hai.
🔹 Real world me jaise ek student ke paas name, age, marks hote hain – waise hi JS me object hota hai.

```js
const student = {
  name: "Raj",
  age: 22,
  isActive: true
};
```
"""

        # Fill the textarea
        page.fill("textarea", markdown_prompt)

        # Click Generate
        # Updated to match actual button text "Generate Guide"
        page.click("button:has-text('Generate Guide')")

        # Wait for the result
        # The logic adds a 1.5s delay, so wait at least that long.
        page.wait_for_timeout(3000)

        # Verify Title Extraction (Should strip #)
        if not page.is_visible("text=JavaScript Objects - Complete Guide"):
            print("❌ Title not found or incorrect.")
            # Debug: print content
            # print(page.content())
            sys.exit(1)

        # Verify Section Title (Should strip 1️⃣)
        # Looking for "BASICS"
        if not page.is_visible("text=BASICS"):
            print("❌ Section 'BASICS' not found.")
            sys.exit(1)

        # Verify Content inside section
        if not page.is_visible("text=What is a JavaScript Object?"):
            print("❌ Inner content 'What is a JavaScript Object?' not found.")
            sys.exit(1)

        if not page.is_visible("text=Real world me jaise ek student"):
            print("❌ Hindi content not found.")
            sys.exit(1)

        # Check code block presence (approximate)
        if not page.is_visible("text=const student = {"):
            print("❌ Code block content not found.")
            sys.exit(1)

        print("✅ Markdown verification passed!")
        browser.close()

if __name__ == "__main__":
    verify_markdown_parsing()
