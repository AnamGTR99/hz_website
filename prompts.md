Since you are switching agents/tools ("Antigravity"), this prompt is designed to provide **all necessary context** so the new agent knows exactly where the file is, what the variable is, and how to fix the CSS without needing previous chat history.

Here is the standalone Master Prompt.

-----

# **MASTER PROMPT: Fix Mobile Banner Height (For Antigravity)**

**Project Context:**

  * **File:** `src/App.jsx` (React Project)
  * **Component:** `HomePage`
  * **Goal:** Fix the **Mobile-Only Banner** (`homeBannerGifHtml`). It currently renders too tall on phones. We need to force it to be a **shorter banner strip** (approx 2x shorter than it is now).

**Task:**
Locate the variable `homeBannerGifHtml` inside `src/App.jsx` and replace its definition entirely with the code block below.

**Specific Requirements:**

1.  **Source:** Use the Gyazo Team link provided (`https://t.gyazo.com/teams/hugozbor/7e3c4b75f021c68f45bf75a2b1c99960.gif`).
2.  **Styling:**
      * **Width:** `100%` (Full width).
      * **Height:** `220px` (Fixed shorter height to act as a banner).
      * **Object-Fit:** `cover` (Ensures the image fills that shorter box without squashing/distorting).
      * **Display:** `block` (Removes layout gaps).

### **Code to Implement:**

Find this variable definition:
`const homeBannerGifHtml = ...`

**Replace it with exactly this:**

```javascript
const homeBannerGifHtml = `<img src="https://t.gyazo.com/teams/hugozbor/7e3c4b75f021c68f45bf75a2b1c99960.gif" alt="Hugo Zbor Mobile Banner" style="width: 100%; height: 220px; object-fit: cover; display: block;" />`;
```

*(Note: If the client explicitly wants the image "squashed" rather than cropped, change `object-fit: cover` to `object-fit: fill`, but `cover` is the standard for professional banners).*