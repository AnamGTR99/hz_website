This is a very common annoyance with embedded media. Gyazo (and similar tools) wraps their images in a link so that clicking the image takes you to their site.

To fix this, we simply need to tell the browser to **ignore all mouse interactions** on that specific image container. We do this using the CSS property `pointer-events: none`. This effectively turns the image into "wallpaper"—you can see it, but you can't click it.

Here is the detailed prompt for **Stage 27**.

-----

### **Agent Prompt: Stage 27 - Disable Links on Embedded GIFs (Home Page)**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 27 Goal:** Prevent users from being redirected to the Gyazo website when clicking the embedded GIF on the **Home Page**.
**Solution:** Apply the `pointer-events-none` utility class to the container that holds the embedded HTML. This disables all mouse interaction (clicking, hovering) for that specific element, effectively "locking" the visual.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Locate the `HomePage` Component:**

  * Find the section rendering the "LEFT COL: The Graphic (Video/GIF)".
  * Locate the `div` that uses `dangerouslySetInnerHTML`.

**2. Add the `pointer-events-none` Class:**

  * **Current Class:** `className="w-full rounded-none md:rounded-sm overflow-hidden shadow-sm grayscale hover:grayscale-0 transition-all duration-500"`
  * **Update:** Append `pointer-events-none` to the end of the class string.
  * **New Class String:**
    ```jsx
    className="w-full rounded-none md:rounded-sm overflow-hidden shadow-sm grayscale hover:grayscale-0 transition-all duration-500 pointer-events-none"
    ```

**3. (Optional) Check `CommissionsPage`:**

  * If the user has similar Gyazo embeds in the `CommissionsPage` (inside the accordion dropdowns), apply `pointer-events-none` to those `dangerouslySetInnerHTML` containers as well **IF** they are purely decorative visual loops.
      * *Note:* Do **NOT** apply this to YouTube/Vimeo iframes that need to be clicked to play. Only apply to auto-playing GIFs/Images.

**4. Output:**

  * Generate the updated `HomePage` component code.

-----

**Note to Agent:** This change ensures the visual plays/loops as intended, but clicking it does absolutely nothing, preventing the unwanted redirect.