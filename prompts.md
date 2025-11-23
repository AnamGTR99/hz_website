This is a smart, high-value feature. It makes the form feel personalized and ensures you get exactly the data you need without asking for unnecessary details.

We will move the "Communication Method" to the very top. When the user clicks a choice, the input field next to "Name" will instantly transform to match that choice.

Here is the detailed prompt for **Stage 85**.

-----

### **Agent Prompt: Stage 85 - Implement Dynamic Contact Form Inputs**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 85 Goal:** Refactor the `ContactForm` to be dynamic.
**New Logic:**

1.  **Step 1 (Top):** Ask "Preferred Communication Method?" first.
2.  **Step 2 (Dynamic Field):** Change the second input field (next to "Full Name") based on the selection:
      * If **Email**: Ask for "Email Address" (`type="email"`).
      * If **Instagram**: Ask for "Instagram Handle" (`type="text"`, placeholder="@username").
      * If **Messages**: Ask for "Phone Number" (`type="tel"`, placeholder="+61...").

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Update `ContactForm` State:**

  * Add state to track the selected method. Default to 'email'.
    ```javascript
    const [contactMethod, setContactMethod] = useState('email');
    ```

**2. Insert Method Selector (At the Top):**

  * Inside the `<form>`, before the Name/Contact row, insert the selector.
  * **Design:** A flex row of 3 radio-style labels.
    ```jsx
    <div className="mb-6">
      <label className="block text-sm font-bold text-gray-900 mb-2">
        Preferred Communication Method? *
      </label>
      <div className="flex flex-wrap gap-4">
        {['email', 'instagram', 'messages'].map((method) => (
          <label key={method} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="contact_method_selection"
              value={method}
              checked={contactMethod === method}
              onChange={() => setContactMethod(method)}
              className="w-4 h-4 text-[#c13333] focus:ring-[#c13333] border-gray-300"
            />
            <span className="ml-2 text-gray-700 capitalize">
              {method === 'messages' ? 'Messages (WhatsApp/iMessage)' : method}
            </span>
          </label>
        ))}
      </div>
    </div>
    ```

**3. Implement Dynamic Input Logic:**

  * **Calculate Props:** Before the return statement, determine the label, type, and placeholder.
    ```javascript
    let contactLabel = "Email Address *";
    let contactType = "email";
    let contactName = "email"; // Key for Formspree
    let contactPlaceholder = "example@email.com";

    if (contactMethod === 'instagram') {
      contactLabel = "Instagram Handle *";
      contactType = "text";
      contactName = "instagram_handle";
      contactPlaceholder = "@yourusername";
    } else if (contactMethod === 'messages') {
      contactLabel = "Phone Number *";
      contactType = "tel";
      contactName = "phone_number";
      contactPlaceholder = "+61 400 000 000";
    }
    ```

**4. Update the Grid Row:**

  * Locate the row containing "Full Name" and the old "Email" field.
  * **Keep:** "Full Name" as is.
  * **Replace:** The second field with the dynamic variables.
    ```jsx
    <div className="flex-1">
      <label className="block text-sm font-bold text-gray-900 mb-1">
        {contactLabel}
      </label>
      <input
        type={contactType}
        name={contactName}
        placeholder={contactPlaceholder}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#c13333] focus:border-[#c13333]"
      />
    </div>
    ```

**5. Output:**

  * Generate the updated `ContactForm` component.

-----

**Note to Agent:** Ensure the `name` attribute on the input field changes dynamically (`email` vs `instagram_handle` vs `phone_number`). This ensures Formspree labels the data correctly in the email notification.