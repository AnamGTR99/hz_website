This is a complete visual overhaul of the Info Page to match the reference "Linktree-style" card exactly.

We will rebuild the `InfoPage` component with a **specific grid layout** for the buttons (1 Full, 2 Split, 1 Full, 1 Full) and apply the correct styling (Rounded borders, grayscale profile picture, Red email button).

Here is the highly detailed prompt for **Stage 126**.

***

### **Agent Prompt: Stage 126 - Redesign Info Page (Manager Card)**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 126 Goal:** Completely redesign the `InfoPage` component to match the provided reference image (f223fa10...).
**New Asset:** Profile picture path is `/Pictures/anam_pfp.JPG` (or `/anam_pfp.JPG` - check standard path).

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

**Icons to Import:**
* From `lucide-react`, ensure you have: `Phone`, `Instagram`, `Mail`.
* *Note:* For **iMessage** and **WhatsApp**, use the custom SVGs provided in the instructions below to ensure brand accuracy.

---

### **Detailed Implementation Requirements:**

**1. Define Custom Icons (Inside `InfoPage` or as helpers):**
* **iMessage Bubble:** Simple speech bubble SVG.
* **WhatsApp:** Standard WhatsApp SVG path.

**2. Rebuild `InfoPage` Component Structure:**
* **Background:** Keep the light gray/white page background.
* **Header:** Render the **Main Site Logo** (Red Bug) at the very top, *outside* the card.
* **Main Card:**
    * `bg-white w-full max-w-[360px] rounded-3xl shadow-xl overflow-hidden p-6 border border-gray-100` (Rounded corners are key).
* **Profile Section:**
    * Image: `/Pictures/anam_pfp.JPG`
    * Style: `w-24 h-24 rounded-full object-cover mx-auto mb-4 grayscale` (Black & white filter as per image).
    * Text: "Shei" (Bold, Large) and "TALENT MANAGER" (Small, Uppercase, Gray).

**3. Action Buttons Layout (The Grid):**
* **Row 1 (Phone):** Full width. White bg, Gray border. Icon + "+61 483 879 841".
* **Row 2 (Split):** Flex row with `gap-3`.
    * **Left (iMessage):** 50% width. White bg, Gray border. Icon + "iMessage". Link: `sms:+61483879841`.
    * **Right (WhatsApp):** 50% width. White bg, Gray border. Icon + "WhatsApp". Link: `https://wa.me/61483879841`.
* **Row 3 (Instagram):** Full width. White bg, Gray border. Icon + "Instagram".
* **Row 4 (Email):** Full width. **Red Background (`bg-[#c13333]`)**, White Text. Icon + "contact@hugozbor.com".

**4. Styling Specifics:**
* All buttons should have `rounded-xl` (extra rounded) and `h-14` (tall touch target).
* Use `flex items-center justify-start px-4` for button content alignment (Icon left, text centered or left).

**5. Footer:**
* "Melbourne, Australia" and Copyright text centered at the bottom of the card.

**6. Output:**
* Generate the fully replaced `InfoPage` component code.

---

**Note to Agent:** The "Split Row" for iMessage and WhatsApp is the most important structural change. Ensure they sit side-by-side perfectly.