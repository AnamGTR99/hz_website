This is the final video addition for this batch. We will add the **"VISUALISER FOR FUCKBARRETTA"** project to your portfolio.

**Important:** You did not provide a thumbnail filename, so the code will look for **`/barretta.png`**. Please take a screenshot of the video, name it exactly `barretta.png`, and drop it in your `public` folder.

Here is the detailed prompt for **Stage 115**.

-----

### **Agent Prompt: Stage 115 - Add "Fuckbarretta" Video**

**Project:** "Hugozbor" Artist Portfolio Website
**Stage 115 Goal:** Add the **"VISUALISER FOR FUCKBARRETTA"** video to the `videoPortfolio` array.
**Assets:**

  * **Thumbnail:** `/barretta.png` (User must upload this file to the public root).
  * **Embed:** Vimeo (Clean parameters injected).
  * **Link:** Instagram Post.

**File to Modify:** `react:Hugozbor Portfolio:App.jsx`

-----

### **Detailed Implementation Requirements:**

**1. Update `videoPortfolio` Data:**

  * Locate the `videoPortfolio` array.
  * **Add** the following object to the array:

<!-- end list -->

```javascript
{
  id: 'video-barretta',
  title: 'VISUALISER FOR FUCKBARRETTA',
  date: '22 JUN 2025',
  description: 'Visualiser for artist, shot by client, assembled and produced by Hugo Zbor.',
  category: ['videos', 'view-all'],
  
  // Thumbnail path (User needs to upload this file)
  thumbnailUrl: '/barretta.png',
  
  // Instagram Link
  instagramLink: 'https://www.instagram.com/p/DLLI7Unx11r/',
  
  videoEmbedUrl: null,

  // Cleaned Vimeo Embed (Added title=0, byline=0, portrait=0)
  embedHtml: `<div style="padding:80% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1140203885?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="newvid #1"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
},
```

**2. Output:**

  * Generate the updated `videoPortfolio` array code.

-----

**Note to Agent:** Ensure the `thumbnailUrl` points to `/barretta.png`. Ensure the `padding:80%` is preserved in the embed string.