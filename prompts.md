This is a quick styling fix. We just need to add the `font-bold` utility class to the active state logic in the "My Work" sub-navigation menu.

Here is the detailed prompt for **Stage 69**.

-----

### **Agent Prompt: Stage 69 - Bold Active Category in "My Work"**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 69 Goal:** Update the "My Work" sub-navigation menu so that the **currently active category** (e.g., "GRAPHICS") is **Bold** (`font-bold`) in addition to being Red.
**Scope:** This applies to both Mobile and Desktop views.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Locate `MyWorkPage` Sub-Navigation:**

  * Find the `<nav>` element inside the `MyWorkPage` component.
  * Look for the loop that renders the category buttons ("Graphics", "Videos", "Websites", "View all").

**2. Update Active Class Logic:**

  * Find the conditional styling for the buttons.
  * **Current Logic:** Likely something like:
    `activeCategory === 'graphics' ? 'text-red-600 ...' : 'text-gray-900 ...'`
  * **Required Change:** Add `font-bold` to the active string.
  * **New Logic:**
    ```jsx
    className={`... ${
      activeCategory === 'category-name' 
        ? 'text-[#c13333] font-bold'  // <-- ADD font-bold HERE
        : 'text-gray-900 font-medium hover:text-[#c13333] transition-colors'
    }`}
    ```

**3. Apply to All Categories:**

  * Ensure this change is applied to all 4 buttons: Graphics, Videos, Websites, and View All.

**4. Output:**

  * Generate the updated `MyWorkPage` component code.

-----

**Note to Agent:** The goal is visual hierarchy. The active tab must clearly stand out with the same bold weight as the main "HUGO ZBOR" logo/header text.