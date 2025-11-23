This is a great move. Hosting on Giphy and using an iframe is much lighter on the user's data plan than a 40MB local file, and it guarantees playback.

I will strip out the text link ("via GIPHY") from the code you provided so it looks clean, and I'll set the iframe width to `100%` so it fits the phone screen perfectly.

Here is the detailed prompt for **Stage 92**.

-----

### **Agent Prompt: Stage 92 - Update Mobile Banner to Giphy Embed**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 92 Goal:** Update the **Mobile-Only** Home Page banner to use the specific Giphy iframe provided by the user.
**Details:**

1.  Replace the local file reference with the Giphy embed code.
2.  **Clean Up:** Remove the `<p>via GIPHY</p>` text from the code so only the visual remains.
3.  **Responsive:** Ensure the iframe width is set to `100%` to fit mobile screens.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Update `homeBannerGifHtml` Variable:**

  * Locate the `const homeBannerGifHtml = ...` definition at the top of `App.jsx`.
  * **Replace** the string content with this cleaned-up Giphy iframe code:
    ```javascript
    const homeBannerGifHtml = `<iframe src="https://giphy.com/embed/g2eKKkGXUbKPb4NmQH" width="100%" height="100%" style="aspect-ratio: 480/96;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`;
    ```
      * *Note:* I changed `width="480"` to `width="100%"` and added `aspect-ratio` to ensure it scales correctly without distortion. I removed the `<p>` tag link.

**2. Verify Container:**

  * Ensure the mobile container in `HomePage` still has `pointer-events-none`.
      * `className="block md:hidden w-full pointer-events-none ..."`
      * *Reason:* This prevents the Giphy "hover" overlays (share buttons, etc.) from appearing or being clickable.

**3. Output:**

  * Generate the updated `homeBannerGifHtml` variable definition.

-----

**Note to Agent:** The aspect ratio `480/96` corresponds to the original Giphy dimensions provided. This ensures the iframe reserves the correct amount of vertical space on the phone.