Yes, I understand exactly what you are asking.

**1. Mobile Home Page Text:**
You want the headers (like "HUGOZBOR FOR OMNEE WORLD") to be smaller on mobile so they **do not wrap** to a second line. They must stay on a single line.

**2. Overlay "Share" Button:**
For Graphics and Videos, you want the same square "Copy" button we added to Websites.

  * **However**, instead of copying an external link, it will generate the **Deep Link** for that specific overlay (e.g., `https://hugozbor.com/my-work/graphics/graphic-1`).
  * This allows people to copy the link, send it to a friend, and when the friend opens it, the website loads with that exact overlay open.

Here is the detailed prompt for **Stage 72**.

-----

### **Agent Prompt: Stage 72 - Fix Mobile Typography & Add Overlay "Share" Button**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 72 Goal:**

1.  **Home Page:** Force section titles (e.g., "HUGOZBOR FOR OMNEE WORLD") to fit on **one line** on mobile devices.
2.  **Overlays:** Add a "Copy Deep Link" (Share) button to **Graphics** and **Video** overlays.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Update Home Page Typography (Single Line Fix):**

  * Locate the `HomePage` component.
  * Find the `<h2>` headers for all 3 sections ("HUGOZBOR FOR OMNEE WORLD", "HUGOZBOR FOR MATTE BLACK DEPT", "HUGOZBOR FOR LOVENANGELS").
  * **Current Class:** `text-xl md:text-2xl ...`
  * **Change to:** `text-[11px] xs:text-xs sm:text-sm md:text-2xl font-bold text-gray-900 uppercase mb-4 md:mb-6 leading-snug whitespace-nowrap`
      * *Explanation:*
          * `text-[11px]`: Starts very small to ensure it fits on narrow phones.
          * `whitespace-nowrap`: **Forces** the text to stay on one line no matter what.

**2. Update `WorkOverlay` (Add "Share" Button):**

  * Locate the Action Bar logic (bottom of overlay).
  * We need to generate the dynamic Deep Link.
    ```javascript
    // Construct the URL dynamically based on where the user is
    const shareableLink = `${window.location.origin}/my-work/${item.category[0]}/${item.id}`;
    ```
  * **Add the Button:**
      * Locate the "Left Side" container where the Instagram button lives.
      * Wrap the Instagram button and this new Copy button in a `div` with `className="flex gap-2 w-full md:w-auto"`.
      * **Insert the Copy Button Code** (Use the same styling as the Website Copy button):
    <!-- end list -->
    ```jsx
    <button
      onClick={() => handleCopyUrl(shareableLink)}
      className="flex-none w-12 md:w-10 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
      title="Copy Link to Project"
    >
      {isCopied ? (
        <Check className="size-5 text-green-600" />
      ) : (
        <img 
          src="/copy_favicon.jpeg" 
          alt="Copy" 
          className="w-5 h-5 object-contain"
        />
      )}
    </button>
    ```

**3. Logic Check:**

  * Ensure this button appears for **Graphics** and **Videos** (items that might not have `websiteUrl`, but *always* have an ID).
  * Ensure the `handleCopyUrl` function (created in Stage 67) is accessible to this new button.

**4. Output:**

  * Generate the updated `HomePage` (headers) and `WorkOverlay` (share button) code.

-----

**Note to Agent:** For the Home Page, prioritizing `whitespace-nowrap` combined with a smaller mobile font size is the only way to guarantee single-line text on small devices.