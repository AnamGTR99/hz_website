This is a classic solution for "Asset Heavy" portfolios. A branded loading screen turns a slow load time into a professional "moment" rather than a glitchy experience.

We will implement a **Global Loading State**. The site will remain white with a pulsating logo until the browser confirms that the heavy Mobile Banner GIF has fully downloaded and is ready to play.

Here is the highly detailed prompt for **Stage 103**.

-----

### **Agent Prompt: Stage 103 - Implement Pulsating Logo Loading Screen**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 103 Goal:** Add a global **Loading Screen** that blocks the view until the heavy assets (specifically the Mobile Home Banner) are fully loaded.
**Visuals:** A solid white full-screen overlay with the **Main Logo** centered and pulsating (`animate-pulse`).
**Logic:**

1.  App starts in `isLoading = true`.
2.  A `useEffect` triggers the pre-loading of the heavy GIF image.
3.  Once the image reports "Loaded" (or a minimum safety timer of 1.5s passes), fade out the loader and reveal the site.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Create `LoadingScreen` Component:**

  * Define this helper component at the top of the file.
    ```jsx
    function LoadingScreen() {
      return (
        <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            {/* Main Logo */}
            <img 
              src="/Logo/logo.png" 
              alt="Loading..." 
              className="w-24 h-auto md:w-32" 
            />
          </div>
        </div>
      );
    }
    ```

**2. Update `App` Component State:**

  * inside `App()`, add state: `const [isLoading, setIsLoading] = useState(true);`

**3. Implement Preload Logic (`useEffect`):**

  * Add a `useEffect` to handle the asset loading.
    ```javascript
    useEffect(() => {
      const handleLoad = () => setIsLoading(false);

      // 1. Define the heavy asset URL (The Mobile Banner)
      const heavyAssetUrl = "https://t.gyazo.com/teams/hugozbor/d191e5f334046b8099e6174ed727adf6.gif";

      // 2. Create an image instance to force download
      const img = new Image();
      img.src = heavyAssetUrl;

      // 3. Listen for load completion
      if (img.complete) {
        handleLoad();
      } else {
        img.onload = handleLoad;
        img.onerror = handleLoad; // Fail safe: load app anyway if image breaks
      }

      // 4. Safety Timeout: Force load after 4 seconds if network is too slow
      const timer = setTimeout(handleLoad, 4000);

      return () => {
        img.onload = null;
        img.onerror = null;
        clearTimeout(timer);
      };
    }, []);
    ```

**4. Update Render Return:**

  * Wrap the main App JSX in a conditional or overlay logic.
    ```jsx
    return (
      <>
        {/* Conditionally Render Loader */}
        {isLoading && <LoadingScreen />}

        {/* Main App Content (Hidden or rendered behind loader) */}
        {/* Use 'hidden' class if loading to prevent scrollbars, or just render standard DOM */}
        <div className={`bg-white min-h-screen flex flex-col ${isLoading ? 'hidden' : ''}`}>
           {/* ... Header, Main, Footer ... */}
        </div>
      </>
    );
    ```

**5. Output:**

  * Generate the updated `App` component including the `LoadingScreen` definition and the preloading logic.

-----

**Note to Agent:** Use the specific Gyazo URL provided in the prompt code for preloading. This ensures the user only sees the site once that specific large GIF is ready to display.