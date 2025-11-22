This is a clear design update. We are shifting the Desktop Overlay layout to match the "Stacked" Mobile layout (so buttons take up two rows instead of squeezing onto one), and we are updating the specific color in the About section.

Here is the detailed prompt for **Stage 74**.

***

### **Agent Prompt: Stage 74 - Update Overlay Layout & About Page Color**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 74 Goal:**
1.  **About Page:** Update the background color of the Infobox Header ("Hugo Zbor") to a specific red tone.
2.  **Overlay UI:** Change the button layout on **Desktop** to match the **Mobile** layout.
    * **Current Desktop:** Side-by-side (Row).
    * **New Desktop:** Stacked (Column). Row 1: [External Link] + [Copy]. Row 2: [Work With Hugo].

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

---

### **Detailed Implementation Requirements:**

**1. Update About Page Color:**
* Locate the `AboutPage` component.
* Find the **Infobox** container (Right Column).
* Look for the header div: `div className="bg-[#b0c4de] ..."`
* **Change Background:** Replace `bg-[#b0c4de]` with **`bg-[#ddb3b3]`**.

**2. Refactor `WorkOverlay` Layout (Force Stacked):**
* Locate the "Action Bar" container at the bottom of the `WorkOverlay` component.
* **Current Classes:** `flex flex-col md:flex-row items-stretch md:items-center gap-3 md:justify-between mt-6`
* **Change to:** `flex flex-col gap-3 mt-6`
    * *Explanation:* We are removing `md:flex-row` and `md:justify-between`. This forces the container to be a vertical column on **ALL** screen sizes.

**3. Verify Button Widths:**
* **Left Group (Instagram/Web + Copy):**
    * Ensure the wrapping `div` has `w-full`.
    * Ensure the main button (Instagram/Web) has `flex-grow` or `w-full` so it stretches to fill the space next to the copy button.
* **Right Group (Work With Hugo):**
    * Ensure the CTA button has `w-full`.
    * Remove any `md:w-auto` classes that restricted its width on desktop. It should now be full width on desktop too.

**4. Visual Result:**
* **Row 1:** [ View on Instagram/Website (Long) ] [ Copy Icon (Square) ]
* **Row 2:** [ Work With Hugo (Full Width Red Bar) ]

**5. Output:**
* Generate the updated `AboutPage` (color change) and `WorkOverlay` (layout change) components.

---

**Note to Agent:** The key is removing the `md:` responsive prefixes that were forcing the row layout on desktop. We want the "Mobile Stack" everywhere.