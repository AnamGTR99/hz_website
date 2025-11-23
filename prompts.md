You are absolutely right. When we redesigned the Home Page with the full-width banner, we accidentally overwrote the line of code that renders the "HOME" title on mobile.

Because the `PageHeader` component already has `md:hidden` built into it (from our previous work), we can simply add it back to the top of the Home Page, and it will automatically appear on mobile and stay hidden on desktop.

Here is the detailed prompt for **Stage 81**.

-----

### **Agent Prompt: Stage 81 - Restore "HOME" Title on Mobile**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 81 Goal:** Restore the "HOME" page title to the mobile view of the Home Page.
**Problem:** The `<PageHeader />` component was accidentally removed during the banner redesign, causing the "HOME" title to disappear from mobile screens.
**Solution:** Re-insert the `PageHeader` component at the very top of the `HomePage` return statement.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Locate `HomePage` Component:**

  * Find the start of the `return` statement inside `HomePage`.

**2. Insert `PageHeader`:**

  * **Insert** the following line as the **first child** inside the main wrapper `div` (before the Banner).
    ```jsx
    {/* Mobile-only Page Title */}
    <PageHeader title="HOME" showBack={false} />
    ```

**3. Adjust Banner Spacing (Optional but Recommended):**

  * Locate the Banner container `div` immediately below the new header.
  * **Current:** `className="w-full mb-16 ..."`
  * **Update:** You might not need to change anything if standard flow applies, but ensuring `mt-0` on the banner is good so it sits flush against the "HOME" header on mobile.

**4. Output:**

  * Generate the updated `HomePage` component code.

-----

**Note to Agent:** The `PageHeader` component is already defined to be `md:hidden`, so adding this line will correctly show "HOME" on mobile only, exactly as it was before.