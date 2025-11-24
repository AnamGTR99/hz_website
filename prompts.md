This is a content and layout update for the `AboutPage`. We need to add more images to the "sidebar" areas of the text and clean up the Infobox data.

To keep the layout unbreakable on mobile, the best strategy is to **stack the images vertically** inside the existing "Floated Right" containers. This creates a vertical column of images that the text flows around, exactly like a Wikipedia article with multiple photos in one section.

Here is the detailed prompt for **Stage 117**.

***

### **Agent Prompt: Stage 117 - Update About Page Images & Infobox**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 117 Goal:** Add specific images to the `AboutPage` sections and update the Infobox data.
**Design Strategy:** Stack the new images inside the existing right-floated containers to ensure they fit perfectly on both mobile and web without overlapping text.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

---

### **Detailed Implementation Requirements:**

**1. Update "Introduction to Design" Images:**
* Locate the **floated image container** in the "Introduction to Design" section (`id="design"`).
* **Current:** Contains 1 image (`hugo_5th_grade.png`).
* **Action:** Update the container to hold **2 Images** stacked vertically (add `mb-4` between them if needed).
    1.  **Top Image:**
        * **Source:** `/about_page/hugo_5th_grade.png`
        * **Caption:** "Hugo in the fifth grade"
    2.  **Bottom Image:**
        * **Source:** `/about_page/hugo_photoshop.png`
        * **Caption:** "Hugo using Photoshop in 2016"

**2. Update "Moving to Australia" Images:**
* Locate the **floated image container** in the "Moving to Australia" section (`id="australia"`).
* **Current:** Contains 1 image (`hugo_student_id.png`).
* **Action:** Update the container to hold **3 Images** stacked vertically.
    1.  **Top Image:**
        * **Source:** `/about_page/hugo_student_id.png`
        * **Caption:** "Hugo's student ID in 2023"
    2.  **Middle Image:**
        * **Source:** `/about_page/hugoxlaptop.png`
        * **Caption:** "Hugo in Melbourne, Oct 2025"
    3.  **Bottom Image:**
        * **Source:** `/about_page/shei.png`
        * **Caption:** "Hugo and Shei, Nov 2025"

**3. Update Infobox (Education):**
* Locate the **Infobox** (Right Column profile card).
* Find the row for **"Education"**.
* **Action:** Remove the text "University of Melbourne". Leave the cell empty or remove the row entirely if preferred (user said "remove... in that bubble").
    * *Recommendation:* `<td className={styles.infoboxCell}></td>` (Empty cell to keep alignment).

**4. Output:**
* Generate the updated `AboutPage` component code.

---

**Note to Agent:** Ensure all new images use the same responsive classes (`w-full h-auto`) inside the parent float container (`w-32 md:w-48`). This ensures they resize perfectly on mobile. Add a small margin (`mb-4`) between stacked images/captions so they don't touch.