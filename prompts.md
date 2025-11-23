This is a standard "Home Button" functionality. We simply need to wrap the Logo image and text in a clickable element that triggers the `setCurrentPage('home')` function.

Here is the detailed prompt for **Stage 89**.

-----

### **Agent Prompt: Stage 89 - Make Logo Clickable (Redirect to Home)**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 89 Goal:** Ensure the "Hugo Zbor" Logo (Red Bug + Text) in the fixed header acts as a **Home Button**.
**Behavior:** Clicking the logo on **Mobile or Desktop** should navigate the user to the Home Page and close the mobile menu if it is open.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Locate `Header` Component:**

  * Find the `div` that contains the Logo image (`logo.png`) and the text (`HUGO ZBOR`).
  * This is usually inside the top flex row: `div className="flex items-center justify-between..."`

**2. Wrap Logo in Clickable Container:**

  * **Current:** Likely a `div` containing the `img` and `span`.
  * **Change to:** A `<button>` element.
  * **Logic:**
    ```jsx
    <button 
      onClick={() => {
        setCurrentPage('home');      // 1. Go to Home
        setIsMobileMenuOpen(false);  // 2. Close menu if open
      }}
      className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
    >
      {/* Existing Logo Image */}
      <img src="/Logo/logo.png" alt="Hugo Zbor Logo" className="..." />
      
      {/* Existing Logo Text */}
      <span className="...">HUGO ZBOR</span>
    </button>
    ```

**3. Verify Props:**

  * Ensure the `Header` component is receiving `setCurrentPage` as a prop (it should be already).

**4. Output:**

  * Generate the updated `Header` component code.

-----

**Note to Agent:** This applies to the **main sticky header**. Since the mobile and desktop views share this top bar, changing it here fixes it for both devices instantly.