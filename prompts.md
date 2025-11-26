This sets up the "Switching Engine" in your website.

We will teach the **Overlay** to look at that `isRestrictedRegion` variable we created in Part 1.

  * **If `true` (Indonesia):** It will look for a new property called `fallbackAsset` (where we will put the Gyazo GIF).
  * **If `false` (Rest of World):** It continues showing the high-quality Vimeo embed.

We will also update your data structure to include this new `fallbackAsset` slot for every video, leaving it empty for now so we can fill it in one by one in the next steps.

Here is the detailed prompt for **Stage 122 (Part 2)**.

-----

### **Agent Prompt: Stage 122 (Part 2) - Implement Region-Based Content Switching**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 122 (Part 2) Goal:**

1.  **Update Overlay Logic:** Modify `WorkOverlay` to conditionally render a "Safe Fallback" asset (Gyazo GIF) if `isRestrictedRegion` is true.
2.  **Update Data Structure:** Add the `fallbackAsset` property (initially `null`) to all items in the `videoPortfolio` array to prepare for data entry.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Refactor `WorkOverlay` Media Rendering:**

  * Locate the "Left Side" media rendering block (where it checks for `videoUrl`, `embedHtml`, etc.).
  * **Insert a New Top-Level Check:**
    ```jsx
    {/* 1. CHECK RESTRICTED REGION (Indonesia Fix) */}
    {isRestrictedRegion && item.fallbackAsset ? (
       <div 
         className="w-full h-auto bg-gray-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
         dangerouslySetInnerHTML={{ __html: item.fallbackAsset }}
       />
    ) : item.videoUrl ? (
       /* 2. DIRECT MP4 ... existing code ... */
    ) : item.embedHtml ? (
       /* 3. VIMEO EMBED ... existing code ... */
    ) : (
       /* 4. STATIC IMAGE ... existing code ... */
    )}
    ```
      * *Note:* `pointer-events-none` is added to the fallback container to prevent clicking the Gyazo link, ensuring the user stays on the portfolio.

**2. Prepare `videoPortfolio` Data:**

  * Locate the `videoPortfolio` array.
  * **Action:** Add `fallbackAsset: null,` to **EVERY** video object in the array.
      * *Example:*
    <!-- end list -->
    ```javascript
    {
      id: 'video-brainwash',
      title: 'MORNING ROUTINE',
      // ... existing props ...
      embedHtml: `...`,
      fallbackAsset: null, // <--- ADD THIS LINE TO ALL VIDEOS
    },
    ```

**3. Output:**

  * Generate the updated `WorkOverlay` component.
  * Generate the updated `videoPortfolio` array structure (you don't need to print every single video if they are all the same update, just show the pattern or update the whole list if feasible).

-----

**Note to Agent:** This is a structural update. We are not adding the actual GIF links yet; we are just creating the logic and the data slot to hold them.