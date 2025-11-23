This is a quick swap back to a high-quality direct image source. Since this is a direct GIF link from Gyazo Teams, the quality should be much sharper than the standard embedded version.

We will strip the `<a>` tag to prevent clicking and set the width to 100% so it fills the phone screen perfectly.

Here is the detailed prompt for **Stage 93**.

-----

### **Agent Prompt: Stage 93 - Update Mobile Banner to High-Res Gyazo GIF**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 93 Goal:** Replace the Mobile-Only Home Banner with the specific high-quality Gyazo GIF provided.
**Details:**

1.  Replace the Giphy iframe code with the new Gyazo Image source.
2.  **Clean Up:** Remove the `<a>` wrapper so it isn't a link.
3.  **Styling:** Use `width: 100%; height: auto;` to ensure it displays at maximum resolution width on mobile screens.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Update `homeBannerGifHtml` Variable:**

  * Locate the `const homeBannerGifHtml = ...` definition at the top of `App.jsx`.
  * **Replace** the existing content with this code:
    ```javascript
    const homeBannerGifHtml = `<img src="https://t.gyazo.com/teams/hugozbor/7e3c4b75f021c68f45bf75a2b1c99960.gif" alt="Hugo Zbor Mobile Banner" style="width: 100%; height: auto;" />`;
    ```

**2. Verify Container:**

  * Ensure the mobile container in `HomePage` still has `pointer-events-none`.
      * `className="block md:hidden w-full pointer-events-none ..."`
      * *Reason:* This ensures the user cannot drag, save, or click the GIF, keeping the experience app-like.

**3. Output:**

  * Generate the updated `homeBannerGifHtml` variable definition.

-----

**Note to Agent:** Do not include the `<a href...>` tag from the source. Only use the `<img>` tag to keep the user on the website.