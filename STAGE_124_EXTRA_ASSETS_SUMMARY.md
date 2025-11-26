# Stage 124 Update - Extra Assets Folder

## Summary
Updated codebase to reference assets moved to `public/extra_assets/`.

## Changes
The following file paths were updated in `src/wikipedia_content/App.jsx` and `index.html`:

| Asset | Old Path | New Path |
|-------|----------|----------|
| Home Banner Video | `/home_banner.mp4` | `/extra_assets/home_banner.mp4` |
| Mobile Banner GIF | `/mobile_banner.gif` | `/extra_assets/mobile_banner.gif` |
| Logo | `/logo.png` | `/extra_assets/logo.png` |
| Copy Favicon | `/copy_favicon.jpeg` | `/extra_assets/copy_favicon.jpeg` |

## Verification
- Confirmed files exist in `public/extra_assets/`
- Updated all references in `App.jsx`
- Updated preload link in `index.html`
