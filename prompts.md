This is the final piece for Stage 65. We will add this specific video update to the list so the agent handles all of them in one go.

Here is the addendum prompt for **Stage 65 (Refined)**.

***

### **Agent Prompt: Stage 65 (Refined) - Update "Character Customisation" Video Data**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 65 Goal:** Update the metadata for the "Character Customisation" video within the `videoPortfolio` array.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

---

### **Detailed Implementation Requirements:**

**1. Update `videoPortfolio` Data:**
* Locate the `videoPortfolio` array.
* Find the object with **ID:** `video-character`.
* **Update the properties to:**
    * **Title:** `"HUGO ZBOR'S UNDERGROUND"`
    * **Description:** `"Character customisation video Inspired by Tony Hawk's Underground"`
    * **Add Property:** `instagramLink: 'https://www.instagram.com/p/DNdOXwlPiFE/'`

**2. Output:**
* Include this update in the `videoPortfolio` array regeneration along with the other videos from the previous prompt.

---

**Note to Agent:** Ensure the `instagramLink` is added correctly so the icon button appears in the overlay.