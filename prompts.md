This is a great addition. A "Virtual Business Card" (vCard) style page is very professional and incredibly useful for networking. You can just drop the `hugozbor.com/info` link to anyone on WhatsApp or Instagram, and they get everything they need.

Here is the highly detailed prompt to transform the `InfoPage` into this clean, portrait-style contact card.

-----

### **Agent Prompt: Stage 15 - Build "Virtual Business Card" Info Page**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 15 Goal:** Redesign the hidden `/info` page (`InfoPage` component) to function as a personal **Virtual Business Card**.
**Layout:** Clean, portrait format, centered content. High-quality profile photo at the top, followed by name, role, and direct action buttons (Phone, WhatsApp, Email).

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

**Icons to Import:**

  * From `lucide-react`, import: `Phone`, `MessageCircle` (for WhatsApp), `Mail`, `Copy`.

-----

### **Detailed Implementation Requirements:**

**1. Define Data:**

  * **Image Source:** `/Pictures/info_page.jpg`
  * **Phone Number:** `+61 0483 879 841`
  * **WhatsApp Link:** `https://wa.me/61483879841` (Formatted correctly without the leading '0' and with country code).
  * **Email:** `contact@hugozbor.com`

**2. Rebuild `InfoPage` Component:**

  * **Replace** the existing content of `InfoPage` with this new structure:

    ```jsx
    function InfoPage() {
      const phoneNumber = "+61 0483 879 841";
      const email = "contact@hugozbor.com";
      
      const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
      };

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          {/* CARD CONTAINER */}
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            
            {/* 1. PROFILE IMAGE (Full width top or large circle) */}
            <div className="w-full aspect-square relative">
               <img 
                 src="/Pictures/info_page.jpg" 
                 alt="Hugo Zbor" 
                 className="w-full h-full object-cover"
               />
            </div>

            {/* 2. DETAILS SECTION */}
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Hugo Zbor</h1>
              <p className="text-sm text-gray-500 uppercase tracking-widest mt-1 mb-6">
                Creative Director
              </p>

              {/* 3. ACTION BUTTONS (Stacked) */}
              <div className="space-y-3">
                
                {/* PHONE BUTTON */}
                <a 
                  href="tel:+61483879841"
                  className="flex items-center justify-center w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Phone className="size-5 mr-2" />
                  <span className="font-medium">Call Me</span>
                </a>

                {/* WHATSAPP BUTTON (Green-ish) */}
                <a 
                  href="https://wa.me/61483879841"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-3 px-4 bg-[#25D366] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="size-5 mr-2" />
                  <span className="font-medium">WhatsApp</span>
                </a>

                {/* EMAIL BUTTON (Copy Action) */}
                <button 
                  onClick={() => copyToClipboard(email)}
                  className="flex items-center justify-center w-full py-3 px-4 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Mail className="size-5 mr-2" />
                  <span className="font-medium">Copy Email</span>
                </button>

              </div>
              
              {/* Footer Note */}
              <p className="text-xs text-gray-400 mt-8">
                Melbourne, Australia<br/>
                © Hugo Zbor 2025
              </p>
            </div>
          </div>
        </div>
      );
    }
    ```

**3. Styling Notes:**

  * Ensure the image uses `object-cover` so it looks professional regardless of the file's aspect ratio.
  * The WhatsApp button uses the brand color `#25D366` to be instantly recognizable.
  * The page itself should be centered in the viewport (`min-h-screen flex items-center`) so it looks good on both mobile phones and desktop screens.

Please generate the updated `App.jsx` file with this new `InfoPage`.