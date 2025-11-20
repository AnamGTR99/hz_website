This is a purely aesthetic "polish" stage, specifically focusing on **Typography Hierarchy**.

In web design, if everything is bold, nothing is bold. We need to reduce the "weight" of your body text so the headings stand out more.

Here is the detailed prompt for **Stage 19**.

***

### **Agent Prompt: Stage 19 - Fix Typography Hierarchy (Unbold Body Text)**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 19 Goal:** Fix the font weight issues on the **Home Page** and **Terms & Conditions Page**.
**Problem:** Body text is currently rendering as **Bold**, making it difficult to distinguish from headings.
**Solution:** Set specific text blocks to `font-normal` (standard weight) and ensuring only actual Headings remain Bold.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

---

### **Detailed Implementation Requirements:**

**1. Fix Home Page (`HomePage` Component):**
* Locate the `HomePage` component.
* Find the description paragraph text: *"Hugo Zbor is a multidisciplinary digital artist combining creativity..."*
* **Current Class (likely):** It might have `font-bold`, `font-medium`, or be inheriting a bold weight from a parent.
* **Action:** Force this text to be standard weight and slightly lighter in color to improve hierarchy.
* **New Class:** `className="text-sm md:text-base font-normal text-gray-600 leading-relaxed max-w-md mb-8"`
    * *Note: Explicitly adding `font-normal` overrides any parent styles.*

**2. Fix Terms & Conditions Page (`TermsPage` Component):**
* Locate the `TermsPage` component.
* **The Rule:** Only the **Numbered Headings** (e.g., "1. Intellectual Property...") should be Bold. All other paragraphs must be unbolded.
* **Action:**
    * Find the container holding the terms content.
    * Check if a parent `div` has `font-bold` or `font-semibold`. If so, remove it.
    * Update every `<p>` tag that contains body text (e.g., "All artwork, designs, visuals...", "Unless explicitly stated otherwise...", "No Content may be copied...").
    * **Change:** Set their class to `font-normal text-gray-700`.
    * **Keep:** Ensure the headings (`<h2>` or `<h3>` tags like "1. Intellectual Property & Ownership") remain `font-bold text-black`.

**3. Output:**
* Generate the updated `HomePage` and `TermsPage` components with these typography corrections applied.

---

**Note to Agent:** The user specifically highlighted that **"Anything not numbered should be unbolded"** on the Terms page. Ensure strict adherence to this rule.