This is a very quick text update. Since the Graphics and Videos share the same "Instagram Button" logic in the overlay, changing the text in one place will instantly update it for both categories.

Here is the detailed prompt for **Stage 75**.

***

### **Agent Prompt: Stage 75 - Update Overlay Button Text**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 75 Goal:** Update the text label on the external link button for Graphics and Videos.
**Change:** Replace the text **"View on Instagram"** with **"View Post"**.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

---

### **Detailed Implementation Requirements:**

**1. Locate `WorkOverlay` Component:**
* Find the "Action Bar" section at the bottom of the overlay.

**2. Update Button Label:**
* Look for the conditional block checking for `item.instagramLink`.
* Find the `<span>` element containing the button text.
* **Current:** `<span>View on Instagram</span>`
* **Change to:** `<span>View Post</span>`

**3. Output:**
* Generate the updated `WorkOverlay` component code.

---

**Note to Agent:** Do **not** change the "View Website" button text. This change applies only to the Instagram link button.