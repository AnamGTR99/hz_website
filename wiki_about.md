# About Page Documentation (`wiki_about.md`)

## Overview

The About page (`AboutPage` component in `App.jsx`) is a React component that displays Hugo Zbor's biography in a Wikipedia-inspired layout. It combines personal storytelling with a clean, encyclopedia-style presentation.

## Component Structure

### Location
- **File**: `src/App.jsx`
- **Component**: `AboutPage` (lines 732-834)
- **Dependencies**: React, Tailwind CSS, Lucide React icons

### Component Hierarchy

```
AboutPage
├── PageHeader (mobile navigation)
└── Main Content Wrapper
    ├── Left Column (3/4 width on desktop)
    │   └── Prose Content
    │       ├── Page Title (H1)
    │       ├── Intro Paragraphs
    │       ├── Section 1: "Introduction to Design"
    │       │   └── Image Grid (2 images)
    │       ├── Section 2: "High School and Covid Lockdown"
    │       └── Section 3: "Moving to Australia"
    └── Right Column (1/3 width on desktop)
        ├── Main InfoBox
        ├── InfoBox Component (Covid photo)
        └── InfoBox Component (Student ID photo)
```

## Layout System

### Responsive Design

The page uses a **two-column layout** on desktop and **single-column** on mobile:

- **Desktop (md: breakpoint and above)**:
  - Left column: `w-full md:w-3/4` (75% width)
  - Right column: `w-full md:w-1/3` (33% width)
  - Spacing: `md:space-x-8` (32px horizontal gap)

- **Mobile**:
  - Both columns stack vertically (`flex-col`)
  - Full width for both columns
  - Right sidebar appears below main content

### Typography

- **Font Family**: Helvetica, Arial, sans-serif (applied via inline styles)
- **Font Weight**: 400 (normal) for body text
- **Page Title**: `text-4xl` (36px) with bottom border
- **Section Headers**: Handled by `SectionHeader` component with `text-2xl` (24px)
- **Body Text**: Standard prose styling with `prose prose-lg` classes

## Content Sections

### 1. Introduction Paragraphs
- Personal introduction mentioning age, location, and background
- Links to Wikipedia articles for locations (Melbourne, Jakarta)
- Sets the narrative tone

### 2. Section: "Introduction to Design"
- Story about discovering Photoshop in fifth grade
- **Image Grid**: Two side-by-side images in bordered boxes:
  - "Hugo in the fifth grade" (`/2015_05_20/IMG_1118.JPG`)
  - "Hugo using Photoshop in 2016" (`/2015_05_20/IMG_1119.JPG`)
- Responsive: Stacks vertically on small screens (`flex-col sm:flex-row`)

### 3. Section: "High School and Covid Lockdown"
- Narrative about screen-printing and starting 99Clover brand
- Links to relevant Wikipedia articles and Instagram

### 4. Section: "Moving to Australia"
- Story about moving to Australia, studying computer science
- Mentions rediscovering passion for design
- References Instagram account and growth as an artist

## Sidebar Components

### Main InfoBox
Located in the right column, displays:
- **Title**: "Hugo Zbor" (centered, bold, `text-xl`)
- **Portrait Image**: `/2015_05_20/IMG_1120.JPG`
- **Information List**:
  - Born: Jakarta, Indonesia (linked to Wikipedia)
  - Known For: Graphic Design (linked to Wikipedia)
  - Fields: Computer science (linked to Wikipedia)
  - Website: hugozbor.com

**Styling**:
- Border: `border border-gray-300`
- Background: `bg-gray-50`
- Padding: `p-4`
- Rounded corners: `rounded-lg`

### InfoBox Component
Reusable component for additional sidebar images:
- **Props**: `imageUrl`, `caption`, `altText`
- **Styling**: Same as main infobox (bordered, gray background, centered)
- **Usage**: Two instances showing Covid lockdown photo and student ID photo

## Supporting Components

### PageHeader Component
- **Purpose**: Mobile navigation header
- **Features**:
  - Back arrow button (ChevronLeft icon)
  - Page title ("About")
  - Only visible on mobile (`md:hidden`)
  - Border bottom separator

### SectionHeader Component
- **Purpose**: Wikipedia-style section titles
- **Features**:
  - Section title text
  - `[edit]` button that links to contact page
  - Bottom border separator (`border-b border-gray-300`)
  - Styling: `text-2xl font-normal`

## Styling Approach

### Tailwind CSS Classes
The component primarily uses Tailwind utility classes:
- **Layout**: `flex`, `flex-col`, `md:flex-row`, `max-w-4xl`, `mx-auto`
- **Spacing**: `px-4`, `md:px-0`, `mt-4`, `md:mt-8`, `space-x-8`, `gap-4`
- **Typography**: `prose`, `prose-lg`, `text-4xl`, `text-sm`
- **Colors**: `text-gray-600`, `text-blue-600`, `bg-gray-50`, `border-gray-300`
- **Responsive**: Extensive use of `md:` breakpoint prefixes

### Inline Styles
Some styling is applied via inline `style` props:
- Font family: `fontFamily: 'Helvetica, Arial, sans-serif'`
- Font weight: `fontWeight: 400`
- Margin bottom: `marginBottom: '1em'`

### Prose Classes
The main content uses Tailwind's `prose` classes for typography:
- `prose prose-lg`: Applies default prose styling with larger text
- `max-w-none`: Removes max-width constraint
- `!font-normal`: Overrides default prose font-weight

## Image Optimization

### Image Display
- **Format**: JPG files from `/2015_05_20/` directory
- **Responsive**: `w-full h-auto` ensures images scale properly
- **Lazy Loading**: Not explicitly implemented (could be added)
- **Alt Text**: All images have descriptive alt text for accessibility

### Image Containers
Images are wrapped in bordered boxes:
- Border: `border border-gray-300`
- Background: `bg-gray-50`
- Padding: `p-3`
- Rounded: `rounded-lg`
- Centered: `text-center`

## Link Strategy

### External Links
All external links include:
- `target="_blank"`: Opens in new tab
- `rel="noopener noreferrer"`: Security best practice
- `className="text-blue-600 hover:underline"`: Wikipedia-style blue links

### Link Types
1. **Wikipedia Links**: Links to relevant Wikipedia articles (Melbourne, Jakarta, etc.)
2. **Product Links**: Links to Adobe Photoshop, YouTube
3. **Social Links**: Instagram account links
4. **Website Link**: hugozbor.com

## Performance Optimizations

### Current Optimizations
1. **Component Structure**: Clean, minimal React component
2. **CSS**: Utility-first approach with Tailwind (smaller bundle)
3. **Responsive Images**: Uses `w-full h-auto` for proper scaling
4. **Conditional Rendering**: Mobile header only renders on mobile

### Potential Improvements
1. **Image Lazy Loading**: Could add `loading="lazy"` to images
2. **Image Optimization**: Could use WebP format or responsive image srcsets
3. **Code Splitting**: About page could be lazy-loaded
4. **Font Loading**: Could preload fonts for better performance

## Accessibility Features

### Current Implementation
- **Semantic HTML**: Uses proper heading hierarchy (H1, H2)
- **Alt Text**: All images have descriptive alt attributes
- **Link Labels**: Links have clear, descriptive text
- **Color Contrast**: Uses standard blue links (`text-blue-600`) on white background

### Areas for Improvement
- **ARIA Labels**: Could add more ARIA labels for screen readers
- **Keyboard Navigation**: Edit buttons could have better keyboard focus states
- **Skip Links**: Could add skip navigation links

## Mobile Optimization

### Mobile-Specific Features
1. **PageHeader**: Shows back button and title on mobile
2. **Stacked Layout**: Content stacks vertically on small screens
3. **Image Grid**: Two-column image grid becomes single column on mobile
4. **Spacing**: Reduced padding and margins on mobile (`px-4` vs `md:px-0`)

### Breakpoints
- **Mobile**: Default (no prefix)
- **Desktop**: `md:` breakpoint (768px and above)

## Integration with App

### Navigation
- Accessed via header navigation: "ABOUT" button
- URL routing: `/about` path
- State management: Uses `setCurrentPage` prop to navigate

### State Management
- **Current Page**: Managed by parent `App` component
- **No Local State**: AboutPage is a presentational component (no useState)
- **Props**: Receives `setCurrentPage` function for navigation

## Code Quality

### Strengths
1. **Clean Structure**: Well-organized component with clear sections
2. **Reusable Components**: `SectionHeader` and `InfoBox` are reusable
3. **Consistent Styling**: Uses design system (Tailwind) consistently
4. **Responsive**: Fully responsive design

### Code Organization
- **Component Definition**: Lines 732-834 in `App.jsx`
- **Supporting Components**: `SectionHeader` (lines 702-716), `InfoBox` (lines 718-730)
- **Dependencies**: React hooks (none used), Lucide icons (ChevronLeft)

## Future Enhancements

### Potential Additions
1. **Table of Contents**: Could add a TOC sidebar like Wikipedia
2. **Search Functionality**: Could add in-page search
3. **Image Lightbox**: Could add lightbox for viewing images full-size
4. **Edit Functionality**: The `[edit]` buttons could have actual functionality
5. **References Section**: Could add a references/citations section
6. **Timeline View**: Could add a visual timeline of Hugo's journey

## Comparison with Wikipedia Style

### Similarities
- Two-column layout (content + sidebar)
- Section headers with edit links
- InfoBox sidebar with key information
- Blue links to external resources
- Bordered image containers
- Clean, readable typography

### Differences
- Uses Tailwind CSS instead of custom Wikipedia CSS
- Simpler structure (no TOC, no references section)
- No search functionality
- No lightbox for images
- More modern, minimal design aesthetic

## Conclusion

The current About page is a well-structured, responsive React component that successfully mimics Wikipedia's layout while maintaining Hugo Zbor's personal brand aesthetic. It's optimized for both desktop and mobile viewing, uses modern CSS utilities, and provides a clean reading experience. The component is maintainable and could be easily extended with additional features like search, lightbox, or TOC functionality.

