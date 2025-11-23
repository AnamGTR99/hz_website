This is the "Nuclear Option" for mobile video. It is the most robust way to guarantee video playback on iPhones, iPads, and Android devices, handling everything from Safari's strict policies to Low Power Mode blocking.

Here is the redesigned, highly detailed prompt for **Stage 88**.

-----

### **Agent Prompt: Stage 88 - Ultimate Mobile Video Autoplay Fix**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 88 Goal:** Implement a bulletproof solution to force the Home Page video banner to auto-play on all mobile devices (especially iOS/Safari).
**Method:** Use a combination of HTML attributes, direct DOM manipulation via `setAttribute`, and user-interaction fallbacks to bypass browser autoplay blocks.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Import Hooks:**

  * Ensure `useRef` and `useEffect` are imported from `'react'`.

**2. Update `HomePage` Component:**

  * **Add Ref:** Create a ref: `const videoRef = useRef(null);`

  * **Add "Bulletproof" Effect:** Add this specific `useEffect` hook. It attempts to play immediately, and if that fails, it sets up a one-time listener to play on the first user touch.

    ```javascript
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      // 1. Force attributes directly on the DOM (bypasses React prop filtering)
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("muted", "true");
      video.muted = true; // JS property must also be set

      // 2. Define Play Function
      const attemptPlay = () => {
        video.play().catch((err) => {
          console.log("Autoplay blocked, waiting for interaction:", err);
        });
      };

      // 3. Try playing immediately
      attemptPlay();

      // 4. Fallback: Try playing on the very first user interaction (touch/click)
      // This fixes issues in "Low Power Mode" on iPhones
      const onInteraction = () => {
        attemptPlay();
        // Remove listeners after first attempt
        window.removeEventListener("touchstart", onInteraction);
        window.removeEventListener("click", onInteraction);
      };

      window.addEventListener("touchstart", onInteraction, { once: true });
      window.addEventListener("click", onInteraction, { once: true });

      return () => {
        window.removeEventListener("touchstart", onInteraction);
        window.removeEventListener("click", onInteraction);
      };
    }, []);
    ```

**3. Update the `<video>` Tag:**

  * Replace the existing video tag with this exact configuration. Note the redundant attributes—this is intentional for maximum compatibility.

    ```jsx
    <video
      ref={videoRef}
      className="w-full h-auto object-cover pointer-events-none"
      src="/home_banner.mp4"
      type="video/mp4"
      autoPlay
      loop
      muted={true}        // React Prop
      muted="muted"       // HTML Attribute redundancy
      playsInline={true}  // React Prop
      playsinline="true"  // HTML Attribute redundancy
      webkit-playsinline="true" // iOS Legacy
      preload="auto"      // Performance
    >
      Your browser does not support the video tag.
    </video>
    ```

**4. Output:**

  * Generate the updated `HomePage` component code with this logic included.

-----

**Note to Agent:** This specific combination of `setAttribute` in `useEffect` and the interaction fallback listeners is required to bypass strict autoplay policies on modern iOS versions. Do not simplify this logic.