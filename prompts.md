This is the common "Aspect Ratio" fight. If an image is forced to `width="600"` (like in the embed code) but the phone screen is only 390px wide, browsers sometimes try to compensate by stretching the height if we aren't explicit.

We will fix this by forcing the CSS to ignore the `width="600"` attribute and instead obey **"Width: 100% of Screen"** and **"Height: Automatic"** (to keep the shape correct).

Here is the detailed prompt for **Stage 95**.

-----

### **Agent Prompt: Stage 95 - Fix Mobile Banner Distortion (Gyazo)**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 95 Goal:** Update the **Mobile-Only** Home Page banner to use the new public Gyazo GIF link, ensuring it scales perfectly without stretching or distortion.
**New Asset:** `https://t.gyazo.com/teams/hugozbor/7e3c4b75f021c68f45bf75a2b1c99960.gif`

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Update `homeBannerGifHtml` Variable:**

  * Locate the `const homeBannerGifHtml = ...` definition at the top of `App.jsx`.

  * **Replace** the entire string with the code below.

  * **Crucial Changes:**

    1.  **Source:** Updated to the new Gyazo Team link.
    2.  **No `<a>` Tag:** Removed to prevent clicking.
    3.  **CSS Reset:** Removed `width="600"`. Added `style="width: 100%; height: auto; display: block;"`. This forces the browser to calculate the height based on the screen width, preventing the "stretched" look.

    <!-- end list -->

    ```javascript
    const homeBannerGifHtml = `<img src="https://t.gyazo.com/teams/hugozbor/7e3c4b75f021c68f45bf75a2b1c99960.gif" alt="Hugo Zbor Mobile Banner" style="width: 100%; height: auto; display: block;" />`;
    ```

**2. Verify Container:**

  * Ensure the mobile container in `HomePage` is still:
    `className="block md:hidden w-full pointer-events-none"`

**3. Output:**

  * Generate the updated `homeBannerGifHtml` variable definition.

-----

**Note to Agent:** The key to fixing the "weird stretching" is `height: auto`. This tells the browser to ignore any previous height constraints and respect the image's natural shape.