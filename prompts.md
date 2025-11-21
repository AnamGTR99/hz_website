This works almost exactly the same way as the Analytics integration. We just need to install the specific package for "Speed Insights" and drop the component next to the Analytics one.

Here is the detailed prompt for **Stage 39**.

-----

### **Agent Prompt: Stage 39 - Integrate Vercel Speed Insights**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 39 Goal:** Integrate the Vercel Speed Insights SDK into the application to track performance metrics (Core Web Vitals).

**Dependency Required:**

  * Run command: `npm install @vercel/speed-insights`

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Import the Speed Insights Component:**

  * At the very top of `App.jsx` (with the other imports), add:
    ```javascript
    import { SpeedInsights } from "@vercel/speed-insights/react";
    ```
      * *Note: Ensure you import from `/react`, not `/next`, as this is a Vite application.*

**2. Add to Render Tree:**

  * Locate the main `App` component's `return` statement.
  * Place the `<SpeedInsights />` component **inside** the main wrapper `div`, right next to the `<Analytics />` component you added previously.
  * **Code Structure:**
    ```jsx
    function App() {
      // ... existing hooks ...

      return (
        <div className="bg-white min-h-screen flex flex-col">
          {/* ... Header, Main, Footer ... */}
          
          {/* Vercel Tracking Components */}
          <Analytics />
          <SpeedInsights />
        </div>
      );
    }
    ```

**3. Output:**

  * Run the installation command.
  * Generate the updated `App.jsx` file.

-----

**Note to Agent:** Keep the import clean and place the component at the root level of the JSX to ensure it captures metrics for the whole session.