This is a smart request. Hardcoding 195+ countries directly into your main `App.jsx` file will make it huge and messy.

To do this cleanly, we will tell the agent to:

1.  **Create a separate file** called `src/countries.js` to hold the massive list of data.
2.  **Import** that list into your App.
3.  **Build the Searchable Dropdown** so users can type "United K..." and find it instantly among the 190+ options.

Here is the updated, highly detailed prompt for **Stage 127 (Full World Version)**.

-----

### **Agent Prompt: Stage 127 - Add Full World Country Code Picker**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 127 Goal:** Enhance the Contact Page with a **Searchable Country Code Dropdown** containing **ALL \~195 world countries**.
**Strategy:** Move the data to a separate file (`src/countries.js`) to keep the main code clean, then implement a searchable split-input for the phone field.

**Files to Create/Modify:**

1.  **Create:** `src/countries.js` (Holds the data).
2.  **Modify:** `src/App.jsx` (Imports data and updates UI).

**Icons to Import (`App.jsx`):** `ChevronDown`, `Search`.

-----

### **Detailed Implementation Requirements:**

**1. Create Data File (`src/countries.js`):**

  * Create a new file in the `src` folder.
  * **Content:** Export a constant array named `COUNTRY_CODES`.
  * **Task for Agent:** Populate this array with **ALL** standard ISO country codes (Afghanistan to Zimbabwe).
  * **Format:**
    ```javascript
    export const COUNTRY_CODES = [
      { code: 'AF', label: 'Afghanistan', dial: '+93', flag: '🇦🇫' },
      { code: 'AL', label: 'Albania', dial: '+355', flag: '🇦🇱' },
      // ... INSERT ALL 190+ COUNTRIES HERE ...
      { code: 'AU', label: 'Australia', dial: '+61', flag: '🇦🇺' },
      // ...
      { code: 'US', label: 'United States', dial: '+1', flag: '🇺🇸' },
      // ...
      { code: 'ZW', label: 'Zimbabwe', dial: '+263', flag: '🇿🇼' }
    ];
    ```

**2. Create `CountrySelect` Component (in `App.jsx`):**

  * Import the data: `import { COUNTRY_CODES } from './countries';`
  * Build a component that manages:
      * **State:** `isOpen` (dropdown visibility), `search` (filter text).
      * **Filtering:** Filter the `COUNTRY_CODES` list based on the `search` state (match Label or Dial code).
      * **UI:**
          * **Trigger:** A button showing `{selected.flag} {selected.dial}` and a Chevron.
          * **Dropdown:** An absolute `div` containing a sticky **Search Bar** input and a scrollable list of countries.
  * **Selection:** Clicking a country should call `onChange(country)` and close the dropdown.

**3. Update `ContactForm` Component:**

  * **State:** Add `const [countryCode, setCountryCode] = useState(COUNTRY_CODES.find(c => c.code === 'AU') || COUNTRY_CODES[0]);` (Default to Australia).
  * **Logic:** Locate the "Phone Number" input area (visible only when `contactMethod === 'messages'`).
  * **Layout:** Replace the single input with a **Flex Row**:
      * **Left:** `<CountrySelect selected={countryCode} onChange={setCountryCode} />`
      * **Right:** `<input type="tel" ... />` (The phone number field).
  * **Formspree Integration:** Add a hidden input to ensure the dial code is sent:
    `<input type="hidden" name="country_dial_code" value={countryCode.dial} />`

**4. Styling Details:**

  * Ensure the Dropdown list has `max-h-64` and `overflow-y-auto` so the user can scroll through the long list of countries.
  * The Search Input inside the dropdown should have `autoFocus` so the user can type immediately.

**5. Output:**

  * Generate the full `src/countries.js` file content.
  * Generate the updated `App.jsx` file with the imports and refactored Contact Form.

-----

**Note to Agent:** Please ensure the `COUNTRY_CODES` array is complete. You can generate the standard list of countries with their ISO codes, Dial codes, and Emoji flags.