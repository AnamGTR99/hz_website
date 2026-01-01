### Codex Prompt — Premium pass: hierarchy + rhythm + CTA framing (no new CTAs)

Copy/paste **exactly** this into Codex:

```text
TASK: Make the Clients page feel more premium (Option A) by improving hierarchy, rhythm, and CTA framing.

FILE: src/App.jsx

CONSTRAINTS (DO NOT VIOLATE):
- Keep Option A (text-first). No logos yet.
- NO outbound links.
- ONLY ONE CTA button on this page, and it must navigate to setCurrentPage('contact').
- Must remain mobile-first and look excellent on phone.

GOALS:
1) Add hierarchy inside the list:
   - The first 4 clients should feel like “anchors” (bigger/stronger).
   - Remaining clients should be slightly smaller/lighter (still uppercase).
2) Improve rhythm/spacing:
   - Increase vertical breathing room between rows (especially on mobile).
   - Soften the “directory” feel by reducing strict symmetry: apply a subtle offset to the second column on desktop only.
3) Strengthen CTA framing:
   - Add one short line above the button to make the next step feel intentional.
   - Do NOT add a second CTA.

INSTRUCTIONS:
1) Find the `ClientsPage` component.
2) In the “Selected” section:
   A) Change the heading label from "Selected" to "Selected collaborations" (same style).
   B) Change the <ul> grid to:
      - Keep 1 column on mobile, 2 columns from sm up.
      - Increase gap-y slightly.
      - Add a subtle top offset to the second column ONLY on desktop (md+) to break perfect symmetry.
3) Implement anchored hierarchy:
   - In the map() loop, determine if an item is in the first 4 entries.
   - If index < 4:
     - Use larger text on desktop and slightly larger on mobile.
     - Keep strong tracking and uppercase.
   - Else:
     - Use slightly smaller text and slightly softer color (e.g., gray-800).
4) Row styling:
   - Replace the heavy border under every row with either:
     - a lighter border (gray-50/100) OR
     - only show border on non-anchor items
   Keep it subtle and consistent.
5) Micro-copy:
   - Replace "Marks/logotypes available on request." with either:
     - "Logotypes available upon request."
   Keep it quiet and low contrast.
6) CTA framing:
   - Add a single line of copy above the button, e.g.:
     "For new collaborations and commissions."
   Style it as small/medium body text, low contrast, and ensure it is NOT clickable.
7) Do not change anything outside ClientsPage.

IMPLEMENTATION DETAILS (BE PRECISE):
- Use `selectedClients.map((c, idx) => ...)`
- Apply conditional classNames based on idx < 4
- For the second-column offset:
  - Wrap the <li> contents in a container OR apply a utility that targets items that land in the right column.
  - Simplest approach: use `sm:grid-cols-2` and apply `sm:translate-y-?` to every item whose idx is odd, but ONLY on md+ (e.g., `md:translate-y-1` or `md:translate-y-2`).
  - Keep the offset subtle (no more than 8px).
- Ensure mobile remains clean: no weird stagger that causes misalignment on small screens; the offset must start at md+.

OUTPUT REQUIREMENTS:
- Print a concise summary:
  - Files modified
- Then print ONLY the updated `ClientsPage` component.
```

#### What you should see after running this

* The first 4 clients read as “top anchors” (subtle but obvious).
* The list breathes more; it feels less like a directory.
* On desktop, the second column is subtly staggered (premium editorial rhythm).
* The “Selected collaborations” label feels more authored.
* One quiet line above the button makes the CTA feel inevitable.
* Still only one CTA, still no outbound links, still mobile-first.
