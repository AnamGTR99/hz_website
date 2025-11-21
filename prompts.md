This is a dual-task stage: **Data Mapping** and **UI Refinement**.

We need to map the specific "Project X" identifiers to your code's IDs (e.g., `graphic-12`) and then restructure the overlay's action area to be a "split bar" (Instagram on left, CTA on right).

Here is the highly detailed prompt for **Stage 28**.

-----

### **Agent Prompt: Stage 28 - Update Graphics Data & Overlay UI**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 28 Goal:**

1.  **Data Update:** Update the `graphicsPortfolio` array in `App.jsx` with the real titles and Instagram links provided below. Use the "Project X" number to match the ID (e.g., Project 12 = `id: 'graphic-12'`).
2.  **Overlay Redesign:** Update the `WorkOverlay` component to remove the Date, update the Title source, and rearrange the buttons into a split layout (Instagram Left, CTA Right).

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

**Icons to Import:**

  * From `lucide-react`, import: `Instagram`.

-----

### **Part 1: Update Data (`graphicsPortfolio`)**

**Instructions:**

  * Locate the `graphicsPortfolio` array.
  * For each item, update the `title` and add a new property `instagramLink`.
  * **Map the data as follows:**

<!-- end list -->

1.  **ID: `graphic-12`**
      * Title: "Wallet Flyer for aformunseen"
      * instagramLink: "[https://www.instagram.com/p/DOlVYFWD8mU/?img\_index=1](https://www.instagram.com/p/DOlVYFWD8mU/?img_index=1)"
2.  **ID: `graphic-6`**
      * Title: "Nintendo Mii Album Cover"
      * instagramLink: "[https://www.instagram.com/p/DKzMRiaPc9E/?img\_index=1](https://www.instagram.com/p/DKzMRiaPc9E/?img_index=1)"
3.  **ID: `graphic-7`**
      * Title: "99Clover poster"
      * instagramLink: "[https://www.instagram.com/p/DLKhaWVPlaw/?img\_index=1](https://www.instagram.com/p/DLKhaWVPlaw/?img_index=1)"
4.  **ID: `graphic-1`**
      * Title: "COLLECTOR"
      * instagramLink: "[https://www.instagram.com/p/DKj-UbtvXRs/?img\_index=1](https://www.instagram.com/p/DKj-UbtvXRs/?img_index=1)"
5.  **ID: `graphic-10`**
      * Title: "Hugo's DJ Set"
      * instagramLink: "[https://www.instagram.com/p/DL7o7ADvyvs/?img\_index=1](https://www.instagram.com/p/DL7o7ADvyvs/?img_index=1)"
6.  **ID: `graphic-5`**
      * Title: "Hugo's Room"
      * instagramLink: "[https://www.instagram.com/p/DJoZGzYPjXQ/?img\_index=1](https://www.instagram.com/p/DJoZGzYPjXQ/?img_index=1)"
7.  **ID: `graphic-14`**
      * Title: "CD Album Cover"
      * instagramLink: "[https://www.instagram.com/p/DHs6JdzvYLm/?img\_index=1](https://www.instagram.com/p/DHs6JdzvYLm/?img_index=1)"
8.  **ID: `graphic-11`**
      * Title: "BWR2025"
      * instagramLink: "[https://www.instagram.com/p/DKeiNEWP1cG/?img\_index=1](https://www.instagram.com/p/DKeiNEWP1cG/?img_index=1)"
9.  **ID: `graphic-3`**
      * Title: "Let it rip"
      * instagramLink: "[https://www.instagram.com/p/DIqaE6BvY-X/?img\_index=1](https://www.instagram.com/p/DIqaE6BvY-X/?img_index=1)"
10. **ID: `graphic-2`**
      * Title: "99Clover magazine cover"
      * instagramLink: "[https://www.instagram.com/p/DOYcmlRDxsE/?img\_index=1](https://www.instagram.com/p/DOYcmlRDxsE/?img_index=1)"
11. **ID: `graphic-13`**
      * Title: "Character Select"
      * instagramLink: "[https://www.instagram.com/p/DLKhaWVPlaw/?img\_index=5](https://www.instagram.com/p/DLKhaWVPlaw/?img_index=5)"
12. **ID: `graphic-8`**
      * Title: "VOL \#99 TIME CAPSULE"
      * instagramLink: "[https://www.instagram.com/p/DLpJzJDys0D/?img\_index=1](https://www.instagram.com/p/DLpJzJDys0D/?img_index=1)"
13. **ID: `graphic-4`**
      * Title: "aformunseen"
      * instagramLink: "[https://www.instagram.com/p/DOlVYFWD8mU/?img\_index=1](https://www.instagram.com/p/DOlVYFWD8mU/?img_index=1)"
14. **ID: `graphic-9`**
      * Title: "Magazine cover for CASHMIIER Habits"
      * instagramLink: "[https://www.instagram.com/hugozbor/](https://www.instagram.com/hugozbor/)"

-----

### **Part 2: Refactor Overlay UI (`WorkOverlay`)**

**Instructions:**

1.  **Locate the "RIGHT SIDE: Text Content"** `div`.
2.  **Remove the Date:** Find `<p className="...">{item.date}</p>` and **delete it**.
3.  **Update Title:** Ensure the `<h2>` uses `{item.title}` (which is now updated).
4.  **Create the Action Bar:**
      * Replace the existing single "Work With Hugo" button with a Flex container.

      * **Container Class:** `className="mt-8 flex items-center justify-between"` (This pushes items to far left and far right).

      * **Left Item (Instagram Button):**

          * Condition: Only show if `item.instagramLink` exists.
          * Element: `<a>` tag opening in new tab.
          * Style: Minimalist circle or small rounded button.
          * Code:

        <!-- end list -->

        ```jsx
        {item.instagramLink && (
          <a 
            href={item.instagramLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-pink-100 hover:text-pink-600 transition-colors"
            title="View on Instagram"
          >
            <Instagram className="size-6" />
          </a>
        )}
        ```

      * **Right Item (CTA Button):**

          * Element: Keep the existing "Work With Hugo" button logic.
          * Style: Keep existing red styling.
          * Code:

        <!-- end list -->

        ```jsx
        <button 
          onClick={() => {
            onClose(); 
            setCurrentPage('contact'); 
          }}
          className="px-6 py-2 bg-[#c13333] text-white font-medium rounded-md hover:bg-red-700 transition-colors"
        >
          Work With Hugo
        </button>
        ```

**Output:**
Generate the updated `graphicsPortfolio` array and the refactored `WorkOverlay` component.