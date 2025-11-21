This stage involves a massive data update and some specific UI tuning to match your new requirements.

We need to update the `graphicsPortfolio` array with the specific metadata from your text file, increase the whitespace (padding) in the grid cards, and ensure the Overlay displays the new Description field.

Here is the highly detailed prompt for **Stage 30**.

-----

### **Agent Prompt: Stage 30 - Update Graphics Data, Grid Padding & Overlay Details**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 30 Goal:**

1.  **Data Injection:** Update the `graphicsPortfolio` array with real Titles, Dates, and Descriptions based on the provided list.
2.  **Grid Refinement:** Increase the padding inside the Graphic Grid Cards (so content isn't tight to the edges) and display the **Date** below the Title.
3.  **Overlay Update:** Add the **Date** and **Description** fields to the Overlay modal.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Part 1: Update `graphicsPortfolio` Data**

**Instructions:**

  * Locate the `graphicsPortfolio` array.
  * Update **every item** to include the new `date` and `description` properties, and ensure the `title` matches the "Real name" provided below.
  * **Map the data exactly as follows:**

<!-- end list -->

1.  **ID: `graphic-12`**
      * Title: "Wallet Flyer for aformunseen"
      * Date: "14th September 2025"
      * Description: "Comission for aformunseen"
2.  **ID: `graphic-6`**
      * Title: "Nintendo Mii Album Cover"
      * Date: "12th June 2025"
      * Description: "Album cover variation using Nintendo MII"
3.  **ID: `graphic-7`**
      * Title: "99Clover poster"
      * Date: "21st June 2025"
      * Description: "Graphic poster for 99Clover"
4.  **ID: `graphic-1`**
      * Title: "COLLECTOR"
      * Date: "7th June 2025"
      * Description: "Trading Card Graphics with CSGO taste"
5.  **ID: `graphic-10`**
      * Title: "Hugo's DJ Set"
      * Date: "11th July 2025"
      * Description: "A graphic for a personal project"
6.  **ID: `graphic-5`**
      * Title: "Hugo's Room"
      * Date: "14th May 2025"
      * Description: "3 month long personal project for @brutalimagery"
7.  **ID: `graphic-14`**
      * Title: "CD Album Cover"
      * Date: "27th May 2025"
      * Description: "CD Album Cover variation for comissions"
8.  **ID: `graphic-11`**
      * Title: "BWR2025"
      * Date: "4th June 2025"
      * Description: "Cover graphic for @brutalimagery"
9.  **ID: `graphic-3`**
      * Title: "Let it rip"
      * Date: "20th April 2025"
      * Description: "Bey Blade personal project"
10. **ID: `graphic-2`**
      * Title: "99Clover magazine cover"
      * Date: "9th September 2025"
      * Description: "Japanese style magazine cover for 99Clover"
11. **ID: `graphic-13`**
      * Title: "Character Select"
      * Date: "21st June 2025"
      * Description: "In-game clothing select graphic for 99Clover"
12. **ID: `graphic-8`**
      * Title: "VOL \#99 TIME CAPSULE"
      * Date: "3rd July 2025"
      * Description: "Part of the 'TIME CAPSULE' Collection of 99Clover"
13. **ID: `graphic-4`**
      * Title: "aformunseen"
      * Date: "14th September 2025"
      * Description: "Passport flyer done for @aformunseen"
14. **ID: `graphic-9`**
      * Title: "Magazine cover for CASHMIIER Habits"
      * Date: "7th July 2025"
      * Description: "Japanese magainze flyer done for @CASHMIIERHABITS"

-----

### **Part 2: Update Grid Layout (`MyWorkPage`)**

**Instructions:**

1.  **Increase Padding:** Find the item wrapper (the `<button>` or card container) inside the `.map()` loop.
      * Change the padding class from `p-3` (or `p-4`) to **`p-6`**.
      * *Reason:* The user stated the boxes look "too tight". `p-6` adds more breathing room around the image and text.
2.  **Add Date to Grid:**
      * Below the existing Title (`h3`), insert the date.
      * Code:
    <!-- end list -->
    ```jsx
    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
      {item.title}
    </h3>
    {/* NEW: Date Display */}
    <p className="text-xs text-gray-500 mt-1 font-medium">
      {item.date}
    </p>
    ```

-----

### **Part 3: Update Overlay UI (`WorkOverlay`)**

**Instructions:**

1.  **Re-add Date:** Inside the "RIGHT SIDE: Text Content" div, below the Title (`h2`), add the date back in.
      * Code: `<p className="text-sm text-gray-500 mt-1 mb-4">{item.date}</p>`
2.  **Add Description:** Below the date, add the description paragraph.
      * Code: `<p className="text-base text-gray-800 leading-relaxed mb-6">{item.description}</p>`
3.  **Layout Check:** Ensure these text elements sit *above* the Action Buttons (Instagram/CTA).

**Output:**
Generate the updated `graphicsPortfolio` array, `MyWorkPage` component, and `WorkOverlay` component.