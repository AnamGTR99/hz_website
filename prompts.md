This is the critical "Cleanup" phase. Since we just standardized all the filenames in Stage 123, any file sitting in your folders that **doesn't** match those clean IDs is likely garbage (old versions, duplicates, unused screenshots).

Here is the highly detailed prompt for **Stage 124** to automate this purge safely.

***

### **Agent Prompt: Stage 124 - Purge Unused Assets (Garbage Collection)**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 124 Goal:** Delete all files in the `public/` directory (and subdirectories) that are **NOT** referenced in the codebase.
**Reason:** To reduce repository size and remove unused/duplicate assets.

**Task:**
1.  **Scan Codebase:** Read `src/App.jsx` and `index.html`. Extract every string that looks like a file path (e.g., `/Pictures/graphic-1.jpeg`, `/videos/brainwash.mp4`, `/logo.png`, `/mobile_banner.gif`). This is your **"Keep List"**.
2.  **Scan File System:** List every file inside `public/`, `public/Pictures/`, `public/videos/`, `public/Logo/`, and `public/about_page/`.
3.  **Compare & Delete:** If a file exists in the system but is **NOT** found in your "Keep List", **delete it**.

**⚠️ CRITICAL SAFETY EXCEPTIONS (Do Not Delete):**
* `favicon.ico`
* `robots.txt`
* `manifest.json`
* `sitemap.xml` (if exists)
* `_redirects` (if exists)

---

### **Execution Steps for Agent:**

**1. Build "Keep List":**
* Parse `src/App.jsx`. Look for `src="..."`, `href="..."`, `thumbnailUrl: "..."`, `fullImageUrl: "..."`, and `videoFile: "..."`.
* *Example Match:* If code contains `/Pictures/graphic-1.jpeg`, add `graphic-1.jpeg` to the Keep List.

**2. Audit `public/Pictures`:**
* Iterate through all files.
* If `old_messy_name.jpg` is NOT in the Keep List -> **DELETE**.
* If `graphic-1.jpeg` IS in the Keep List -> **KEEP**.

**3. Audit `public/videos`:**
* Remove any `.mp4` files not referenced in `videoPortfolio`.

**4. Audit `public/about_page`:**
* Remove any images not referenced in the `AboutPage` component.

**5. Audit Root `public/`:**
* Remove unused banner GIFs or temp screenshots.

**6. Report:**
* List the filenames that were deleted so the user can verify.

---

**Note to Agent:** Be aggressive but precise. We only want the files that are actively being used by the live website. All others must go to save space.