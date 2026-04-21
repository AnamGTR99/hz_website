import React, { useState, useEffect, useMemo } from 'react'
import { Instagram, Mail, X, ChevronDown, ChevronUp, Phone, MessageCircle, Copy, Menu, ChevronLeft, ChevronRight, Globe, Check, Search } from 'lucide-react'
import { COUNTRY_CODES } from './countries'
import { selectedClients, clientsCopy } from '../data/clients'
import adminSubmissions from '../data/admin-submissions.json'

// Date parsing helper function
const parseDateString = (dateStr) => {
  if (!dateStr) return new Date(0);
  // New format "14 SEP 2025" parses natively in JS Date
  return new Date(dateStr);
};

const normalizeClientSlug = (name) => {
  if (!name) return '';
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  const overrides = {
    omneeworld: 'omnee_world',
    ultralightlondon: 'ultralight',
    ultralight_london: 'ultralight',
  };
  return overrides[base] || base;
};

const isPersonalClient = (client) => {
  if (!client) return false;
  const normalized = client.toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized === 'hugozbor';
};

// Portfolio Data Structure
const graphicsPortfolio = [
  {
    id: 'graphic-lowheads-2026',
    title: 'ANIMATED MAGAZINE FOR LOWHEADS [2026]',
    client: 'lowheads',
    category: ['graphics', 'videos', 'view-all'],
    date: '14 APR 2026',
    by: 'Hugo Zbor',
    description: '',
    tags: ['Poster', 'Cover Art', 'Magazine Edit'],
    slideVideos: [
      'https://i.imgur.com/lsBvLPB.mp4',
      'https://i.imgur.com/T9UHavK.mp4',
      'https://i.imgur.com/8WSRAHg.mp4',
      'https://i.imgur.com/zxrgcIi.mp4',
      'https://i.imgur.com/psyDDsT.mp4',
      'https://i.imgur.com/g639j2R.mp4',
    ],
    thumbnailUrl: null,
    instagramLink: 'https://www.instagram.com/p/DW65n-fD7eP/?img_index=1',
  },
  {
    id: 'graphic-1',
    title: '"COLLECTOR" GRAPHIC FOR 99CLOVER',
    client: '99clover',
    category: ['graphics', 'view-all'],
    date: '07 JUN 2025',
    by: 'Hugo Zbor',
    description: 'Personal project and graphic for @99CLOVER\'s "Time Capsule" Collection. All assets for the cards were made from scratch.',
    tags: ['Poster'],
    thumbnailUrl: 'https://i.gyazo.com/99278e03730352ab96d102f95723b876.jpg',
    embedHtml: `<a href="https://gyazo.com/99278e03730352ab96d102f95723b876"><img src="https://i.gyazo.com/99278e03730352ab96d102f95723b876.jpg" alt="Image from Gyazo" width="320"/></a>`,
    instagramLink: 'https://www.instagram.com/p/DKj-UbtvXRs/?img_index=1',
  },
  {
    id: 'graphic-2',
    title: 'MAGAZINE PAGE SPREAD FOR 99CLOVER',
    client: '99clover',
    category: ['graphics', 'view-all'],
    date: '09 SEP 2025',
    by: 'Hugo Zbor',
    description: 'Japanese fashion magazine product catalog work for @99CLOVER',
    tags: ['Magazine', 'Poster'],
    thumbnailUrl: 'https://i.gyazo.com/dc6f1a1957e07a79cf25e91e3e526769.jpg',
    embedHtml: `<a href="https://gyazo.com/dc6f1a1957e07a79cf25e91e3e526769"><img src="https://i.gyazo.com/dc6f1a1957e07a79cf25e91e3e526769.jpg" alt="Image from Gyazo" width="640"/></a>`,
    instagramLink: 'https://www.instagram.com/p/DOYcmlRDxsE/?img_index=1',
  },
  {
    id: 'graphic-3',
    title: '"LET IT RIP"',
    client: 'hugozbor',
    category: ['graphics', 'view-all'],
    date: '20 APR 2025',
    by: 'Hugo Zbor',
    description: 'Personal project, remaking classic beyblade packaging from scratch.',
    tags: ['Cover Art', 'Merch'],
    thumbnailUrl: 'https://i.gyazo.com/259be76df328300ee08cf84aad0b0a91.jpg',
    embedHtml: `<a href="https://gyazo.com/259be76df328300ee08cf84aad0b0a91"><img src="https://i.gyazo.com/259be76df328300ee08cf84aad0b0a91.jpg" alt="Image from Gyazo" width="2511"/></a>`,
    instagramLink: 'https://www.instagram.com/p/DIqaE6BvY-X/?img_index=1',
  },
  {
    id: 'graphic-aformunseen-combined',
    title: 'PASSPORT FLYER FOR AFORMUNSEEN',
    client: 'aformunseen',
    category: ['graphics', 'view-all'],
    date: '14 SEP 2025',
    by: 'Hugo Zbor',
    description: 'Custom, ready to print (300 DPI) flyers for @AFORMUNSEEN \'s Amsterdam Fashion Week 2025 Booth',
    tags: ['Flyer'],
    slides: [
      'https://i.gyazo.com/46939a78ea4f03c3947e227d62bd6ccf.jpg', // passport flyer
      'https://i.gyazo.com/151e6aba017ac02929427581684fdf95.jpg'  // wallet flyer
    ],
    thumbnailUrl: 'https://i.gyazo.com/46939a78ea4f03c3947e227d62bd6ccf.jpg',
    instagramLink: 'https://www.instagram.com/p/DOlVYFWD8mU/?img_index=1',
  },
  {
    id: 'graphic-5',
    title: '"INSIDER"',
    client: 'hugozbor',
    category: ['graphics', 'view-all'],
    date: '14 MAY 2025',
    by: 'Hugo Zbor',
    description: '1 month personal side project. 264 layers in photoshop',
    tags: ['Poster',],
    thumbnailUrl: 'https://i.gyazo.com/5b11300b1372618d7c0b7d132ff7e4df.jpg',
    embedHtml: `<a href="https://gyazo.com/5b11300b1372618d7c0b7d132ff7e4df"><img src="https://i.gyazo.com/5b11300b1372618d7c0b7d132ff7e4df.jpg" alt="Image from Gyazo" width="6000"/></a>`,
    instagramLink: 'https://www.instagram.com/p/DJoZGzYPjXQ/?img_index=1',
  },
  {
    id: 'graphic-6',
    title: 'NINTENDO INSPIRED COVER ART',
    client: 'hugozbor',
    category: ['graphics', 'view-all'],
    date: '12 JUN 2025',
    by: 'Hugo Zbor',
    description: 'Nintendo Mii Poster / Album Cover Concept',
    tags: ['Cover Art'],
    thumbnailUrl: 'https://i.gyazo.com/a3e46e1a3c71d79c42689a3836be3c19.jpg',
    embedHtml: `<a href="https://gyazo.com/a3e46e1a3c71d79c42689a3836be3c19"><img src="https://i.gyazo.com/a3e46e1a3c71d79c42689a3836be3c19.jpg" alt="Image from Gyazo" width="3512"/></a>`,
    instagramLink: 'https://www.instagram.com/p/DKzMRiaPc9E/?img_index=1',
  },
  {
    id: 'graphic-7',
    title: 'MAGAZINE COVER',
    client: '99clover',
    category: ['graphics', 'view-all'],
    date: '21 JUN 2025',
    by: 'Hugo Zbor',
    description: 'Japanese Magazine inspired cover page for @99CLOVER Lookbook',
    tags: ['Magazine', 'Lookbook'],
    thumbnailUrl: 'https://i.gyazo.com/1abf8ea18b8fa94850cd26ca528cfb7d.jpg',
    embedHtml: `<a href="https://gyazo.com/1abf8ea18b8fa94850cd26ca528cfb7d"><img src="https://i.gyazo.com/1abf8ea18b8fa94850cd26ca528cfb7d.jpg" alt="Image from Gyazo" width="2000"/></a>`,
    instagramLink: 'https://www.instagram.com/p/DLKhaWVPlaw/?img_index=1',
  },
  {
    id: 'graphic-8',
    title: 'POSTER FOR 99CLOVER',
    client: '99clover',
    category: ['graphics', 'view-all'],
    date: '03 JUL 2025',
    by: 'Hugo Zbor',
    description: 'Tekken Inspired graphic for @99CLOVER \'s "Time Capsule" Collection',
    tags: ['Poster'],
    thumbnailUrl: 'https://i.gyazo.com/a18a3f456b68e9592cb6686216453596.jpg',
    embedHtml: `<a href="https://gyazo.com/a18a3f456b68e9592cb6686216453596"><img src="https://i.gyazo.com/a18a3f456b68e9592cb6686216453596.jpg" alt="Image from Gyazo" width="3000"/></a>`,
    instagramLink: 'https://www.instagram.com/p/DLpJzJDys0D/?img_index=1',
  },
  {
    id: 'graphic-9',
    title: 'MAGAZINE PAGE SPREAD FOR CASHMIIER HABITS',
    client: 'cashmiier_habits',
    category: ['graphics', 'view-all'],
    date: '07 JUL 2025',
    by: 'Hugo Zbor',
    description: 'Japanese fashion magazine product catalog work for @CASHMIIERHABITS',
    tags: ['Magazine', 'Poster'],
    thumbnailUrl: 'https://i.gyazo.com/eecc292274c9cce937c22f6070956da4.jpg',
    embedHtml: `<a href="https://gyazo.com/eecc292274c9cce937c22f6070956da4"><img src="https://i.gyazo.com/eecc292274c9cce937c22f6070956da4.jpg" alt="Image from Gyazo" width="2818"/></a>`,
    instagramLink: 'https://www.instagram.com/hugozbor/',
  },
  {
    id: 'graphic-10',
    title: '"HARDWARE"',
    client: 'brutalimagery',
    category: ['graphics', 'view-all'],
    date: '11 JUL 2025',
    by: 'Hugo Zbor',
    description: <>Graphic for my personal project <a href="https://www.instagram.com/brutalimagery" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">@brutalimagery</a></>,
    tags: ['Poster'],
    thumbnailUrl: 'https://i.gyazo.com/99960e186bb5cdbbf731f4af34042995.jpg',
    embedHtml: `<a href="https://gyazo.com/99960e186bb5cdbbf731f4af34042995"><img src="https://i.gyazo.com/99960e186bb5cdbbf731f4af34042995.jpg" alt="Image from Gyazo" width="1500"/></a>`,
    instagramLink: 'https://www.instagram.com/p/DL7o7ADvyvs/?img_index=1',
  },
  {
    id: 'graphic-11',
    title: '"BRUTAL WORLD RECORDS"',
    client: 'brutalimagery',
    category: ['graphics', 'view-all'],
    date: '04 JUN 2025',
    by: 'Hugo Zbor',
    description: 'Remake of the iconic world record book in the style of @brutalimagery',
    tags: ['Poster'],
    thumbnailUrl: 'https://i.gyazo.com/4cd6c7e474e485e886eb51acfe70a07b.jpg',
    embedHtml: `<a href="https://gyazo.com/4cd6c7e474e485e886eb51acfe70a07b"><img src="https://i.gyazo.com/4cd6c7e474e485e886eb51acfe70a07b.jpg" alt="Image from Gyazo" width="3000"/></a>`,
    instagramLink: 'https://www.instagram.com/p/DKeiNEWP1cG/?img_index=1',
  },
  {
    id: 'graphic-13',
    title: 'GRAPHIC FOR 99CLOVER',
    client: '99clover',
    category: ['graphics', 'view-all'],
    date: '21 JUN 2025',
    by: 'Hugo Zbor',
    description: 'In-game clothing selection screen for @99CLOVER',
    tags: ['Poster'],
    thumbnailUrl: 'https://i.gyazo.com/841a3c816f0da4ec95a07d5172a7f6ef.jpg',
    embedHtml: `<a href="https://gyazo.com/841a3c816f0da4ec95a07d5172a7f6ef"><img src="https://i.gyazo.com/841a3c816f0da4ec95a07d5172a7f6ef.jpg" alt="Image from Gyazo" width="7400"/></a>`,
    instagramLink: 'https://www.instagram.com/p/DLKhaWVPlaw/?img_index=5',
  },
  {
    id: 'graphic-14',
    title: 'VIDEO GAME CD COVER ART CONCEPT',
    client: 'hugozbor',
    category: ['graphics', 'view-all'],
    date: '27 MAY 2025',
    by: 'Hugo Zbor',
    description: 'Inspired by PS2 CD Covers',
    tags: ['Cover Art'],
    thumbnailUrl: 'https://i.gyazo.com/92ee85e57fe4da1d2f753fdf69dd1fb7.jpg',
    embedHtml: `<a href="https://gyazo.com/92ee85e57fe4da1d2f753fdf69dd1fb7"><img src="https://i.gyazo.com/92ee85e57fe4da1d2f753fdf69dd1fb7.jpg" alt="Image from Gyazo" width="3000"/></a>`,
    instagramLink: 'https://www.instagram.com/p/DHs6JdzvYLm/?img_index=1',
  },
  {
    id: 'graphic-thumbnail-sayso',
    title: 'THUMBNAIL FOR SAYSO',
    client: 'sayso',
    category: ['graphics', 'view-all'],
    date: '27 FEB 2026',
    by: 'Hugo Zbor',
    tags: ['Thumbnail'],
    thumbnailUrl: '/thumbnails/graphic-thumbnail-sayso.jpg',
    fullImageUrl: '/thumbnails/graphic-thumbnail-sayso.jpg',
    videoEmbedUrl: null,
    instagramLink: 'https://www.youtube.com/watch?v=t_FDERai5Bc',
    embedHtml: null,
    fallbackAsset: null,
  },
]

// Sort Graphics: Newest (b) to Oldest (a)
graphicsPortfolio.sort((a, b) => {
  return parseDateString(b.date) - parseDateString(a.date);
});

// Video Portfolio Data Structure
const videoPortfolio = [
  {
    id: 'video-hugozbor-social-creatures-2026',
    title: '"Social Creatures" an animation by Hugo Zbor [2026]',
    client: 'hugozbor',
    date: '28 MAR 2026',
    tags: ['Animation'],
    category: ['videos', 'view-all', 'personal-work'],
    thumbnailUrl: 'https://img.youtube.com/vi/9g0eBzoLldA/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/9g0eBzoLldA?si=SrIQEG_GI8XDmN_U',
    instagramLink: 'https://www.instagram.com/p/DWtoMVhARk-/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-converse-campaign-2-2026',
    title: 'CONVERSE - Campaign Video #2 [2026]',
    client: 'converse',
    date: '13 APR 2026',
    tags: ['VFX', 'Green Screen', 'Shot by HUGO ZBOR'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/vcOHz9nbufY/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/vcOHz9nbufY?si=0u91TzADnYegb5x4',
    instagramLink: 'https://www.instagram.com/p/DXEzXk1AVUh/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-tokyomilkshop-midnight-hours-2026',
    title: 'TOKYOMILKSHOP - Midnight Hours [2026]',
    client: 'tokyomilkshop',
    date: '20 MAR 2026',
    tags: ['VFX', 'Rotoscoping', 'Footage from client', 'Visualiser'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/PeO3VzzblPA/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/PeO3VzzblPA?si=rq-3X9fD7hcRXMhx',
    instagramLink: 'https://www.instagram.com/reel/DWG0vapgW41/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-bumper-animation-2026',
    title: 'HUGO ZBOR Bumper Animation [2026]',
    client: 'hugozbor',
    date: '14 MAR 2026',
    tags: ['Animation'],
    category: ['videos', 'view-all', 'personal-work'],
    thumbnailUrl: 'https://img.youtube.com/vi/rs3262td8yk/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/rs3262td8yk?si=WPr9wPxTQclK9Gvv',
    instagramLink: 'https://www.instagram.com/reel/DV0Se6bAmK8/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-bridgeboyzmilita-draco-bag-2026',
    title: 'BRIDGEBOYZMILITA - Draco Bag Campaign Video [2026]',
    client: 'bridgeboyzmilita',
    date: '16 FEB 2026',
    tags: ['Footage from client', 'VFX', 'Rotoscoping'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/GgrzYsNmdPY/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/GgrzYsNmdPY?si=14sVsfwSb4dS61e9',
    instagramLink: 'https://www.instagram.com/reel/DUzQH6GDwIq/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-haircuts-2026',
    title: 'Haircuts [2026]',
    client: 'hugozbor',
    date: '01 MAR 2026',
    tags: ['Shot by HUGO ZBOR', 'VFX', 'Rotoscoping'],
    category: ['videos', 'view-all', 'personal-work'],
    thumbnailUrl: 'https://img.youtube.com/vi/eDZUNJPmk1w/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/eDZUNJPmk1w?si=-cKvW5AsTMdXa9sL',
    instagramLink: 'https://www.instagram.com/p/DVVB20PD1Sr/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-99clover-camo-campaign-2026',
    title: '99CLOVER - CAMO Campaign Video [2026]',
    client: '99clover',
    date: '24 FEB 2026',
    tags: ['Footage from client', 'VFX'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/J3RMFU6_njA/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/J3RMFU6_njA?si=EIVMVvXWYtXJEoAG',
    instagramLink: 'https://www.instagram.com/p/DVHEW2Ak13_/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-99clover-dont-blend-in-2026',
    title: '99CLOVER - "Dont Blend In" [2026]',
    client: '99clover',
    date: '01 MAR 2026',
    tags: ['VFX', 'Rotoscoping', 'Shot by HUGO ZBOR'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/nl8YwYUqSeg/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/nl8YwYUqSeg?si=cTDK6MLecXHy44M3',
    instagramLink: 'https://www.instagram.com/p/DU5qBivDwJL/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-pigeon-factory-2026',
    title: 'The Pigeon Factory [2026]',
    client: 'hugozbor',
    date: '09 JAN 2026',
    tags: ['Animation'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/mYaXF3qKmtQ/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/mYaXF3qKmtQ?si=-gN7kd0BQl2UbaP9',
    instagramLink: 'https://www.instagram.com/p/DTSdookD2eI/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-directors-reel-2025',
    title: 'HUGO ZBOR Director\'s Reel [2025]',
    client: 'hugozbor',
    date: '29 DEC 2025',
    tags: ['Animation', '3D', 'VFX', 'Rotoscoping', 'Shot by HUGO ZBOR'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/geQcLv-wbG0/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/geQcLv-wbG0?si=bJ0rlI6c5eyxrQv4',
    instagramLink: 'https://www.instagram.com/p/DS1-90ZD_rO/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-converse-campaign-video-2026',
    title: 'CONVERSE - Campaign Video [2026]',
    client: 'converse',
    date: '30 JAN 2026',
    tags: ['Animation', 'Shot by HUGO ZBOR', 'Rotoscoping'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/m43UDjFE_vA/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/m43UDjFE_vA?si=eWPFHwE8UQENH1nC',
    instagramLink: 'https://www.instagram.com/p/DUVD4umDw0Y/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-hz-mag-2026',
    title: 'HZ MAG [2026]',
    client: 'hugozbor',
    date: '03 JAN 2026',
    description: 'HZ MAG video.',
    tags: ['Shot by HUGO'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/csJ2lQ7k0No/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/csJ2lQ7k0No?si=JYO36JlOEe91bdjr',
    instagramLink: 'https://www.instagram.com/p/DTA0-sbD8KI/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-99clover-restock-2026',
    title: '99CLOVER - Restock Campaign Video [2026]',
    client: '99clover',
    date: '05 JAN 2026',
    description: 'Campaign video for 99CLOVER.',
    tags: ['Shot by HUGO'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/YOz-Xyaj5VY/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/YOz-Xyaj5VY?si=lpAoA5e3Sil6NoRM',
    instagramLink: 'https://www.instagram.com/p/DTFw-tgkgr-/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-saga-fightwear-rashguard-3-2025',
    title: 'SAGA FIGHTWEAR - Rashguard Campaign Video #3 [2025]',
    client: 'saga_fightwear',
    date: '28 DEC 2025',
    description: 'Campaign video for SAGA Fightwear rashguard.',
    tags: ['Rotoscoping', 'Shot by HUGO'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/TNW-hxnGtGw/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/TNW-hxnGtGw?si=0bC5dUs9iy63p-g2',
    instagramLink: 'https://www.instagram.com/p/DSzkwE-gbdd/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-beneculture-christmas-2025',
    title: 'BENECULTURE - Christmas Campaign Video [2025]',
    client: 'beneculture',
    date: '23 DEC 2025',
    description: 'Christmas campaign video for BENECULTURE.',
    tags: ['Footage shot by client', 'Rotoscoping'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/ahOF73fKxS0/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/ahOF73fKxS0?si=j37pfd-bJp7_YeNP',
    instagramLink: 'https://www.instagram.com/p/DSkrpN8CKmH/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-saga-fightwear-rashguard',
    title: 'SAGA FIGHTWEAR - Rashguard Campaign Video',
    client: 'saga_fightwear',
    date: '08 DEC 2025',
    description: 'Campaign video for SAGA Fightwear rashguard.',
    tags: ['Shot by HUGO'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/R5HMJK971O8/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/R5HMJK971O8?si=w0XryMbrwSH3pf11',
    instagramLink: 'https://www.youtube.com/watch?v=R5HMJK971O8&list=PLmj9gUUkopg1ZJAh-hfB1dtpTzqaFd2vu&index=3',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-saga-fightwear-rashguard-2025',
    title: 'SAGA FIGHTWEAR - Rashguard Campaign Video [2025]',
    client: 'saga_fightwear',
    date: '01 DEC 2025',
    description: 'Campaign video for SAGA Fightwear rashguard.',
    tags: ['Shot by HUGO'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/4YbKXj-EXXs/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/4YbKXj-EXXs?si=na250lVkmdxrf9I5',
    instagramLink: 'https://www.youtube.com/watch?v=4YbKXj-EXXs&list=PLmj9gUUkopg1ZJAh-hfB1dtpTzqaFd2vu&index=4',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-99clover-p90-chain-2-2025',
    title: '99CLOVER - P90 Chain Campaign Video #2 [2025]',
    client: '99clover',
    date: '02 OCT 2025',
    description: 'Campaign video for 99CLOVER.',
    tags: ['Shot by HUGO'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/FEsSSO3yRv8/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/FEsSSO3yRv8?si=6XDLMx69oJfZl-1Q',
    instagramLink: 'https://www.instagram.com/p/DPTmsh-j7Rv/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-99clover-p90-chain-2025',
    title: '99CLOVER - P90 Chain Campaign Video [2025]',
    client: '99clover',
    date: '25 JUL 2025',
    description: 'Campaign video for 99CLOVER.',
    tags: ['Shot by HUGO'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/Iz03ffd8PXw/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/Iz03ffd8PXw?si=ra-SzWDVPyxpQDzW',
    instagramLink: 'https://www.instagram.com/p/DMh-Rfgy7ZB/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-weredecaying-birth-2025',
    title: 'Were Decaying - Birth [2025]',
    client: 'weredecaying',
    date: '11 DEC 2025',
    description: 'Animation for Were Decaying.',
    tags: ['Animation'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/lOVRHCVHBrM/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/lOVRHCVHBrM?si=hAuXru-iy0I4r_A4',
    instagramLink: 'https://www.youtube.com/watch?v=lOVRHCVHBrM&list=PLmj9gUUkopg1ZJAh-hfB1dtpTzqaFd2vu&index=1',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-the-short-ending-2025',
    title: 'The Short Ending [2025]',
    client: 'hugozbor',
    date: '29 NOV 2025',
    tags: [],
    category: ['videos', 'view-all', 'personal-work'],
    thumbnailUrl: 'https://img.youtube.com/vi/tffTQTnR2vo/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/tffTQTnR2vo?si=w-g7sOdZPZjNJzd-',
    instagramLink: 'https://www.instagram.com/p/DRmlaK3D0oe/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-sometimes-things-have-to-break-2025',
    title: 'Sometimes things have to broken into pieces before they can come back together and make sense [2025]',
    client: 'hugozbor',
    date: '16 NOV 2025',
    tags: [],
    category: ['videos', 'view-all', 'personal-work'],
    thumbnailUrl: 'https://img.youtube.com/vi/WaD_S5jAXBM/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/WaD_S5jAXBM?si=Hzq1re3c2MsaqTM8',
    instagramLink: 'https://www.instagram.com/reel/DRHLvCcAdfd/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-three-dumb-mice-2026',
    title: '"Three Dumb Mice", an animation by Hugo Zbor [2026]',
    client: 'hugozbor',
    date: '14 JAN 2026',
    tags: ['Animation'],
    category: ['videos', 'view-all', 'personal-work'],
    thumbnailUrl: 'https://img.youtube.com/vi/SY3_CrzkW20/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/SY3_CrzkW20?si=C4VXXn_1AlqYreeU',
    instagramLink: 'https://www.instagram.com/reel/DTfSMjTD2G5/',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-brainwash',
    title: 'MORNING ROUTINE',
    client: 'hugozbor',
    date: '18 NOV 2025',
    description: 'Experimental video inspired by early 2000s TV shows',
    tags: [],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/trcAZwylfcQ/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/pmPiKDC4ZWg?si=eNYG4XZleP31C19m',
    embedHtml: null,
    fallbackAsset: null,
    instagramLink: 'https://www.instagram.com/p/DRJ2US5D11L/',
  },
  {
    id: 'video-character',
    title: 'HUGO ZBOR\'S UNDERGROUND',
    client: 'hugozbor',
    date: '17 AUG 2025',
    description: 'Character customisation video Inspired by Tony Hawk\'s Underground',
    tags: [],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/7uS8SP67Exg/maxresdefault.jpg',
    instagramLink: 'https://www.instagram.com/p/DNdOXwlPiFE/',
    videoEmbedUrl: 'https://www.youtube.com/embed/kUdCAVFH8Hw?si=zsRqQZqmIIMT1jpb',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-omnee',
    title: 'OMNEEWORLD - PS2 Chain Campaign Video #2 [2025]',
    client: 'omnee_world',
    date: '24 OCT 2025',
    description: 'Greenscreen video, shot by client and assembled and edited by Hugo Zbor',
    tags: ['VFX', 'Footage from client'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/eTzvPmUzJ6E/maxresdefault.jpg',
    instagramLink: 'https://www.instagram.com/reel/DQKmaH9kvvZ/',

    videoEmbedUrl: 'https://www.youtube.com/embed/c_748vWaow8?si=vngPuLYFvXWhbx3x',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-lovenangels',
    title: 'VISUALS FOR LOVENANGELS',
    client: 'lovenangels',
    date: '25 OCT 2025',
    description: 'Photos shot by client, 3D Assets made by in-house 3D artist, everything assembled by Hugo Zbor',
    tags: ['3D', 'Footage from client'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/Qziv5xrXTgc/maxresdefault.jpg',
    instagramLink: 'https://www.instagram.com/p/DQNWnMBk9Kp/?img_index=1',

    videoEmbedUrl: 'https://www.youtube.com/embed/LMiUh2yyU3c?si=TtTFHX3VWDJyMiOw',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-99clover',
    title: '99CLOVER - USS Pop-Up Campaign Video [2025]',
    client: '99clover',
    date: '04 NOV 2025',
    description: 'Greenscreen video, shot by @99CLOVER and assembled and edited by Hugo Zbor',
    tags: ['VFX', 'Footage from client'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/GLyH_Vveiik/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/lgggbGeV1Jw?si=ZSfogsk3EFRKmybK',
    embedHtml: null,
    fallbackAsset: null,
    instagramLink: 'https://www.instagram.com/p/DQognlkkkwi/',
  },
  {
    id: 'video-ds',
    title: 'INTRO VISUALS FOR 99CLOVER',
    client: '99clover',
    date: '03 DEC 2024',
    description: 'Intro Inspired by Nintendo DS, made from scratch',
    tags: ['Animation'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/dJgwioZ2I4E/maxresdefault.jpg',
    instagramLink: 'https://www.instagram.com/p/DOTUFshDyEX/?img_index=1',

    // 1. DISABLE YOUTUBE
    videoEmbedUrl: null,

    // 2. ENABLE VIMEO (Clean Mode)
    // Note: Added title=0&byline=0&portrait=0 to the src URL
    embedHtml: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1140196791?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="DS"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
    fallbackAsset: null,
  },
  {
    id: 'video-runway',
    title: 'STAGE VISUALS FOR 99CLOVER',
    client: '99clover',
    date: '12 SEP 2025',
    description: 'Looping visuals for @99CLOVER \'s Runway',
    tags: ['Loop', 'Animation'],
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/yeudVooMwSM/maxresdefault.jpg',
    instagramLink: 'https://www.instagram.com/p/DOTUFshDyEX/?img_index=1',

    // 1. DISABLE YOUTUBE
    videoEmbedUrl: null,

    // 2. ENABLE VIMEO (Clean Mode)
    // Note: Added title=0&byline=0&portrait=0 to the src URL
    embedHtml: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1139926579?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="99CLOVER VIDEO LOOP.mp4"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
    fallbackAsset: null,
  },
  {
    id: 'video-omnee-2',
    title: 'OMNEE WORLD - iPod Wallet Campaign Video [2025]',
    client: 'omnee_world',
    date: '24 OCT 2025',
    description: 'Greenscreen video, shot by client and assembled and edited by Hugo Zbor',
    tags: ['VFX', 'Footage from client'],
    category: ['videos', 'view-all'],

    // Updated Thumbnail Path
    thumbnailUrl: '/thumbnails/video-omnee-2 Small.png',

    // No Instagram link provided
    instagramLink: 'https://www.instagram.com/p/DQDBfk7E1QZ/',

    videoEmbedUrl: 'https://www.youtube.com/embed/fAhJ3dL7xP4?si=OBpXQeqaNgQyAnHC',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-piecebyp',
    title: 'COMMERCIAL FOR PIECEBYP',
    client: 'piecebyp',
    date: '10 OCT 2025', // Estimated date
    description: 'Greenscreen video, shot, assembled and edited by Hugo Zbor',
    tags: ['VFX', 'Shot by HUGO ZBOR'],
    category: ['videos', 'view-all'],

    // Thumbnail from public root
    thumbnailUrl: '/thumbnails/video-piecebyp Small.png',

    // Instagram Link
    instagramLink: 'https://www.instagram.com/reel/DPcxw5lj-nk/',

    videoEmbedUrl: 'https://www.youtube.com/embed/LeGmbvK9m8E?si=zLVfbf99GHfAIHOl',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-airlines',
    title: 'IN-FLIGHT ENTERTAINMENT',
    client: 'hugozbor',
    date: '12 NOV 2025',
    description: 'In-flight entertaintment, everything done by Hugo Zbor.',
    tags: ['Shot by HUGO ZBOR'],
    category: ['videos', 'view-all'],

    // Thumbnail from public root
    thumbnailUrl: '/thumbnails/video-airlines Small.png',

    // Instagram Link
    instagramLink: 'https://www.instagram.com/reel/DQ7DIMHD3FP/',

    videoEmbedUrl: 'https://www.youtube.com/embed/WP61s4dXqp8?si=arX-fAcWOJE4Cwbb',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-gta',
    title: 'GTA VIDEO FOR 99CLOVER',
    client: '99clover',
    date: '15 SEP 2025',
    description: 'Filmed, Shot and editted by Hugo Zbor',
    tags: ['Shot by HUGO ZBOR'],
    category: ['videos', 'view-all'],

    // Thumbnail path (User needs to upload this file)
    thumbnailUrl: '/thumbnails/video-gta Small.png',

    // Instagram Link
    instagramLink: 'https://www.instagram.com/reel/DOnuzl3j33e/',

    videoEmbedUrl: 'https://www.youtube.com/embed/_hE-eVnkcNg?si=GO7LvbZTRpyM6xZM',
    embedHtml: null,
    fallbackAsset: null,
  },
  {
    id: 'video-barretta',
    title: 'VISUALISER FOR FUCKBARRETTA',
    client: 'baretta',
    date: '22 JUN 2025',
    description: 'Visualiser for artist, shot by client, assembled and produced by Hugo Zbor.',
    tags: ['Visualiser', 'Footage from client'],
    category: ['videos', 'view-all'],

    // Thumbnail path (User needs to upload this file)
    thumbnailUrl: '/thumbnails/video-barretta Small.png',

    // Instagram Link
    instagramLink: 'https://www.instagram.com/p/DLLI7Unx11r/',

    videoEmbedUrl: 'https://www.youtube.com/embed/rurdSpi9NhA?si=t6zd-w0eHbEqjVXW',
    embedHtml: null,
    fallbackAsset: null,
  },
]

// Sort Videos: Newest (b) to Oldest (a)
videoPortfolio.sort((a, b) => {
  return parseDateString(b.date) - parseDateString(a.date);
});

// Website Portfolio Data Structure
const websitePortfolio = [
  {
    id: 'web-1',
    title: 'ryansimarchive.com',
    client: 'ryansimarchive.com',
    category: ['websites', 'view-all'],
    by: 'Hugo Zbor',
    date: '6 NOV 2025',
    tags: ['Portfolio'],
    thumbnailUrl: 'https://i.gyazo.com/8bdac84d59e63c4ccadb28bde0df117d.gif',
    websiteUrl: 'https://ryansimarchive.com',
    embedHtml: `<img src="https://i.gyazo.com/8bdac84d59e63c4ccadb28bde0df117d.gif" alt="Ryan Sim Archive" style="width:100%; height:auto;" />`,
  },
  {
    id: 'web-2',
    title: 'HUGO ZBOR PORTFOLIO SITE (OLD)',
    client: 'hugozbor',
    category: ['websites', 'view-all'],
    by: 'Hugo Zbor',
    date: '6 AUG 2025',
    tags: ['Portfolio'],
    thumbnailUrl: 'https://i.gyazo.com/73873edb9b88b05a28964c7b3c288566.gif',
    websiteUrl: 'https://hz-archive.vercel.app/',
    embedHtml: `<img src="https://i.gyazo.com/73873edb9b88b05a28964c7b3c288566.gif" alt="HZ Archive" style="width:100%; height:auto;" />`,
  },
  {
    id: 'web-hugo-current',
    title: 'HUGO ZBOR WEBSITE',
    client: 'hugozbor',
    category: ['websites', 'view-all'],
    by: 'Hugo Zbor',
    date: '20 NOV 2025',
    description: 'Yup i made this website from scratch as well',
    tags: ['Portfolio'],
    thumbnailUrl: 'https://i.gyazo.com/4adf6a6ce1449314c0d5c0400a237867.gif',
    websiteUrl: 'https://hugozbor.com',
    embedHtml: `<img src="https://i.gyazo.com/4adf6a6ce1449314c0d5c0400a237867.gif" alt="Hugozbor Current Website" style="width:100%; height:auto;" />`,
  },
]

const shuffleArray = (array) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// --- Asset Variables for Commissions Page ---
// --- RAW HTML VIDEO FOR iOS AUTOPLAY (Critical) ---
const homeBannerVideoHtml = `
  <video 
    class="home-banner-video w-full h-auto object-cover pointer-events-none"
    autoplay
    loop
    muted
    muted="muted"
    playsinline
    playsinline="true"
    webkit-playsinline
    preload="auto"
    style="width:100%; height:auto;"
  >
    <source src="/extra_assets/home_banner.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
`;

const homeBannerGifHtml = `<a href="https://gyazo.com/1c95e37e4ccc3e66234262b1741f4e22" style="display: block;"><img src="https://i.gyazo.com/1c95e37e4ccc3e66234262b1741f4e22.gif" alt="Hugo Zbor Mobile Banner" style="width: 100%; height: 105px; object-fit: fill; display: block;" fetchpriority="high" loading="eager" /></a>`;

const homeHeroVisual = `<a href="https://gyazo.com/22e0b339f1a8815b6c8e1fb42eecd2c7"><img src="https://i.gyazo.com/22e0b339f1a8815b6c8e1fb42eecd2c7.gif" alt="Image from Gyazo" width="596"/></a>`
const homeHeroVisualMiddle = `<a href="https://gyazo.com/75685a544745afa2a314cf0c78ab4532"><img src="https://i.gyazo.com/75685a544745afa2a314cf0c78ab4532.gif" alt="Raw Footage to Real Life" style="width: 100%; height: auto;" /></a>`
const homeHeroVisual2 = `<a href="https://gyazo.com/db5a51e28dcee28c3827b07284262632"><img src="https://i.gyazo.com/db5a51e28dcee28c3827b07284262632.gif" alt="Image from Gyazo" style="width: 100%; height: auto;" /></a>`

// --- End Asset Variables ---

const TAG_OPTIONS = [
  'Animation',
  '3D',
  'VFX',
  'Compositing',
  'Rotoscoping',
  'Loop',
  'Video',
  'Sound Design',
  'Poster',
  'Cover Art',
  'Merch',
  'Flyer',
  'Magazine',
  'Lookbook',
  'Visualiser',
  'Landing Page',
  'Portfolio',
  'E-commerce',
  'Footage from client',
  'Edit',
  'Direction',
  'Shot by HUGO ZBOR',
  'Thumbnail',
]

const extractYouTubeId = (value) => {
  if (!value) return '';
  const match = value.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{6,})/);
  return match ? match[1] : '';
};

const extractIframeSrc = (value) => {
  if (!value) return '';
  const match = value.match(/src=["']([^"']+)["']/i);
  return match ? match[1] : '';
};

const buildAdminItem = (entry) => {
  const base = {
    id: entry.id || `admin-${entry.createdAt || Date.now()}`,
    title: entry.title || 'Untitled',
    client: entry.client || '',
    date: entry.date || '',
    description: entry.description || '',
    tags: entry.tags || [],
  };

  if (entry.mediaType === 'video') {
    const iframeSrc = extractIframeSrc(entry.embedLink);
    const youtubeId = extractYouTubeId(iframeSrc || entry.embedLink || entry.shareLink);
    const videoEmbedUrl = iframeSrc || (youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null);
    const thumbnailUrl = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null;

    return {
      ...base,
      category: ['videos', 'view-all'],
      thumbnailUrl,
      videoEmbedUrl,
      instagramLink: entry.shareLink || null,
      embedHtml: null,
      fallbackAsset: null,
    };
  }

  if (entry.mediaType === 'graphic') {
    const imageUrl = entry.embedLink || entry.shareLink || '';
    return {
      ...base,
      category: ['graphics', 'view-all'],
      thumbnailUrl: imageUrl,
      embedHtml: imageUrl ? `<img src="${imageUrl}" alt="${base.title}" style="width:100%; height:auto;" />` : null,
    };
  }

  if (entry.mediaType === 'website') {
    const previewUrl = entry.embedLink || entry.shareLink || '';
    return {
      ...base,
      category: ['websites', 'view-all'],
      thumbnailUrl: previewUrl,
      websiteUrl: entry.shareLink || null,
      embedHtml: previewUrl ? `<img src="${previewUrl}" alt="${base.title}" style="width:100%; height:auto;" />` : null,
    };
  }

  return null;
};

const adminPortfolioItems = Array.isArray(adminSubmissions)
  ? adminSubmissions.map(buildAdminItem).filter(Boolean)
  : [];

// Master Portfolio List (combines graphics, videos, and websites)
// IMPORTANT: Defined AFTER all portfolio arrays to ensure up-to-date data
const allPortfolioItems = [...graphicsPortfolio, ...videoPortfolio, ...websitePortfolio, ...adminPortfolioItems]

// TikTokIcon component
const TikTokIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// LoadingScreen component
function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        {/* Main Logo */}
        <img
          src="/extra_assets/logo.png"
          alt="Loading..."
          className="w-24 h-auto md:w-32"
        />
      </div>
    </div>
  );
}

// GridCarousel component for items with multiple images
function GridCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000) // Auto-switch every 3 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={images[currentIndex]}
        alt="Carousel Slide"
        className="w-full h-auto object-contain rounded-lg select-none"
      />
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// PageHeader component for mobile back arrow
function PageHeader({ title, isActive = false }) {
  return (
    <div className="md:hidden flex items-center justify-center p-4 border-b border-gray-200 bg-white relative">
      <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: isActive ? '#c13333' : '#1a1a1a' }}>{title}</h2>
    </div>
  )
}

function Header({ currentPage, currentCategory, setCurrentPage }) {
  const [showMyWorkDropdown, setShowMyWorkDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMyWorkActive = currentPage === 'my-work'
  const showClientsNav = true

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 w-full transition-all duration-300">
      {/* Top Bar (Row 1) */}
      <div className="max-w-4xl mx-auto px-4 py-3 md:px-0 flex flex-row md:flex-col items-center justify-between md:justify-center md:pt-8 md:pb-4">
        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="size-6 text-gray-700" />
          ) : (
            <Menu className="size-6 text-gray-700" />
          )}
        </button>

        {/* Logo */}
        <button
          onClick={() => {
            setCurrentPage('home');
            setIsMobileMenuOpen(false);
          }}
          className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img
            src="/extra_assets/logo.png"
            alt="Hugo Zbor Logo"
            className="h-10 w-auto md:h-16"
          />
        </button>

        {/* Spacer for mobile to center logo (invisible on desktop) */}
        <div className="md:hidden w-6"></div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-row items-center space-x-8 mt-4">
          <button
            onClick={() => setCurrentPage('home')}
            className={
              currentPage === 'home'
                ? 'font-bold text-lg text-[#c13333]'
                : 'font-bold text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
          >
            HOME
          </button>
          <div
            className="relative"
            onMouseEnter={() => setShowMyWorkDropdown(true)}
            onMouseLeave={() => setShowMyWorkDropdown(false)}
          >
            <button
              onClick={() => setCurrentPage('my-work', 'videos')}
              className={
                isMyWorkActive
                  ? 'font-bold text-lg text-[#c13333]'
                  : 'font-bold text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
              }
            >
              MY WORK
            </button>
            {/* Dropdown Menu */}
            {showMyWorkDropdown && (
              <div className="absolute top-full left-0 pt-4 -mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[150px] z-50">
                <button
                  onClick={() => {
                    setCurrentPage('my-work', 'videos')
                    setShowMyWorkDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 font-medium text-lg hover:bg-gray-50 ${currentPage === 'my-work' && currentCategory === 'videos'
                    ? 'text-[#c13333]'
                    : 'text-brandBlack'
                    }`}
                >
                  Videos
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('my-work', 'graphics')
                    setShowMyWorkDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 font-medium text-lg hover:bg-gray-50 ${currentPage === 'my-work' && currentCategory === 'graphics'
                    ? 'text-[#c13333]'
                    : 'text-brandBlack'
                    }`}
                >
                  Graphics
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('my-work', 'websites')
                    setShowMyWorkDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 font-medium text-lg hover:bg-gray-50 ${currentPage === 'my-work' && currentCategory === 'websites'
                    ? 'text-[#c13333]'
                    : 'text-brandBlack'
                    }`}
                >
                  Websites
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('my-work', 'view-all')
                    setShowMyWorkDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 font-medium text-lg hover:bg-gray-50 ${currentPage === 'my-work' && currentCategory === 'view-all'
                    ? 'text-[#c13333]'
                    : 'text-brandBlack'
                    }`}
                >
                  View all
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setCurrentPage('commissions')}
            className={
              currentPage === 'commissions'
                ? 'font-bold text-lg text-[#c13333]'
                : 'font-bold text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
          >
            COMMISSIONS
          </button>
          {showClientsNav && (
            <button
              onClick={() => setCurrentPage('clients')}
              className={
                currentPage === 'clients'
                  ? 'font-bold text-lg text-[#c13333]'
                  : 'font-bold text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
              }
            >
              CLIENTS
            </button>
          )}
          <button
            onClick={() => setCurrentPage('about')}
            className={
              currentPage === 'about'
                ? 'font-bold text-lg text-[#c13333]'
                : 'font-bold text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
          >
            ABOUT
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className={
              currentPage === 'contact'
                ? 'font-bold text-lg text-[#c13333]'
                : 'font-bold text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
          >
            CONTACT
          </button>
        </nav>
      </div>

      {/* Mobile Menu (Row 2 - Sticky Expandable) */}
      {isMobileMenuOpen && (
        <div className="w-full bg-white border-t border-gray-100 flex flex-col items-center py-4 space-y-4 shadow-lg md:hidden">
          <button
            onClick={() => {
              setCurrentPage('home')
              setIsMobileMenuOpen(false)
            }}
            className={
              currentPage === 'home'
                ? 'font-bold text-lg text-[#c13333]'
                : 'font-bold text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
          >
            HOME
          </button>
          <button
            onClick={() => {
              setCurrentPage('my-work', 'videos')
              setIsMobileMenuOpen(false)
            }}
            className={
              isMyWorkActive
                ? 'font-bold text-lg text-[#c13333]'
                : 'font-bold text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
          >
            MY WORK
          </button>
          <button
            onClick={() => {
              setCurrentPage('commissions')
              setIsMobileMenuOpen(false)
            }}
            className={
              currentPage === 'commissions'
                ? 'font-bold text-lg text-[#c13333]'
                : 'font-bold text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
          >
            COMMISSIONS
          </button>
          {showClientsNav && (
            <button
              onClick={() => {
                setCurrentPage('clients')
                setIsMobileMenuOpen(false)
              }}
              className={
                currentPage === 'clients'
                  ? 'font-bold text-lg text-[#c13333]'
                  : 'font-bold text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
              }
            >
              CLIENTS
            </button>
          )}
          <button
            onClick={() => {
              setCurrentPage('about')
              setIsMobileMenuOpen(false)
            }}
            className={
              currentPage === 'about'
                ? 'font-bold text-lg text-[#c13333]'
                : 'font-bold text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
          >
            ABOUT
          </button>
          <button
            onClick={() => {
              setCurrentPage('contact')
              setIsMobileMenuOpen(false)
            }}
            className={
              currentPage === 'contact'
                ? 'font-bold text-lg text-[#c13333]'
                : 'font-bold text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
          >
            CONTACT
          </button>
        </div>
      )}
    </header>
  )
}

function HomePage({ setCurrentPage, currentPage }) {
  useEffect(() => {
    const video = document.querySelector(".home-banner-video");
    if (!video) return;

    // Reinforce attributes in case Safari strips them
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("muted", "true");
    video.muted = true;

    // Try immediate autoplay
    const tryPlay = () => {
      video.play().catch(() => {
        // Safari may still block autoplay – fallback below.
      });
    };

    tryPlay();

    // Fallback: retry play on first user interaction
    const events = ["touchstart", "click"];
    const handleOnce = () => tryPlay();

    events.forEach(event =>
      window.addEventListener(event, handleOnce, { once: true })
    );

    return () => {
      events.forEach(event =>
        window.removeEventListener(event, handleOnce)
      );
    };
  }, []);

  return (
    <div className="w-full mb-20">
      {/* Mobile-only Page Title */}
      <PageHeader title="HOME" isActive={currentPage === 'home'} />

      {/* --- 1. HERO BANNER --- */}
      <div className="w-full mb-16 md:mb-24">

        {/* A. MOBILE VERSION (GIF) - Visible only on mobile */}
        <div
          className="block md:hidden w-full pointer-events-none"
          dangerouslySetInnerHTML={{ __html: homeBannerGifHtml }}
        />

        {/* B. DESKTOP VERSION (VIDEO) - Hidden on mobile */}
        <div
          className="hidden md:block w-full pointer-events-none"
          dangerouslySetInnerHTML={{ __html: homeBannerVideoHtml }}
        />

      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* --- 2. HIGH-IMPACT SECTION (Split Layout) --- */}
        <div className="mb-24 md:mb-32">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase text-left mb-12 leading-tight">
            Creating Visual Experiences
          </h1>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Image Left */}
            <div className="w-full md:w-1/2">
              <div
                className="w-full pointer-events-none"
                dangerouslySetInnerHTML={{ __html: homeHeroVisual }} // iPod Image
              />
            </div>

            {/* Text Right */}
            <div className="w-full md:w-1/2">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">The Foundation of Hugo Zbor</h3>
              <p className="text-sm md:text-base font-normal text-gray-600 leading-relaxed mb-6">
                Hugo's process is built on a decade of dedication to digital creation. What began as self-taught experimentation in digital arts, evolved into managing the design, creative direction, and visual branding for many campaigns and brands. Hugo's design with both creative instinct and a practical understanding of visual strategy and application.
              </p>
              <button
                onClick={() => setCurrentPage('about')}
                className="text-xs font-bold uppercase border-b border-black pb-1 hover:text-gray-600 transition-colors"
              >
                Learn more about me
              </button>
            </div>
          </div>
        </div>

        {/* --- 3. UPGRADE CREATIVES SECTION (Stacked Layout) --- */}
        <div className="mb-24 md:mb-32">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase mb-8 text-left">
            Upgrade Your Creatives
          </h2>

          {/* Full Width Image */}
          <div
            className="w-full mb-8 pointer-events-none"
            dangerouslySetInnerHTML={{ __html: homeHeroVisualMiddle }} // 3-Panel Image
          />

          {/* Text Below */}
          <div className="max-w-3xl">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Creative Trajectory</h3>
            <p className="text-sm md:text-base font-normal text-gray-600 leading-relaxed mb-6">
              Whether you have rough raw footage or Hollywood greenscreen studio, Hugo can help build the world you're envisioning. Hugo's focus is on transforming your initial concept into a seamless and professionally executed final digital asset.
            </p>
            <button
              onClick={() => setCurrentPage('commissions')}
              className="text-xs font-bold uppercase border-b border-black pb-1 hover:text-gray-600 transition-colors"
            >
              Explore Project Options
            </button>
          </div>
        </div>

        {/* --- 4. LATEST PROJECTS SECTION (Stacked Layout) --- */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase mb-8 text-left">
            Latest Projects
          </h2>

          {/* Full Width Image */}
          <div
            className="w-full mb-8 pointer-events-none"
            dangerouslySetInnerHTML={{ __html: homeHeroVisual2 }} // Crane Image
          />

          {/* Text Below */}
          <div className="max-w-3xl">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Creative Trajectory</h3>
            <p className="text-sm md:text-base font-normal text-gray-600 leading-relaxed mb-6">
              Since launching the Instagram account @hugozbor in early 2025, work has been met with incredible support, connecting Hugo with influential designers. Hugo is currently in a phase of rapid growth, where Hugo focus on maintaining a high standard of output.
            </p>
            <button
              onClick={() => setCurrentPage('my-work', 'view-all')}
              className="text-xs font-bold uppercase border-b border-black pb-1 hover:text-gray-600 transition-colors"
            >
              VIEW MORE OF MY WORK
            </button>
          </div>
        </div>

        {/* --- 5. CALL TO ACTION --- */}
        <div className="mt-16 mb-20 text-center">
          <h2 className="text-3xl font-bold text-brandBlack mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Contact Us
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            Tell us about your idea, project, or vision. Hugo and the management team will review your request and get back to you with next steps.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-3 bg-[#c13333] text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Submit Inquiry
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// My Work Landing Page - Three boxes layout (no subheadings)
function MyWorkLandingPage({ setCurrentPage, currentPage }) {
  return (
    <>
      <PageHeader title="My work" isActive={currentPage === 'my-work'} />
      <div className="max-w-7xl mx-auto px-4 md:px-0 mt-4 md:mt-8">
        <div className="flex flex-col items-center gap-8 md:gap-12">
          {/* Top Row: Videos and Graphics */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full">
            {/* Videos Box - Left */}
            <div className="flex flex-col items-center">
              <p className="text-base md:text-lg text-brandBlack font-medium mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Videos
              </p>
              <button
                onClick={() => setCurrentPage('my-work', 'videos')}
                className="bg-gray-200 rounded-lg p-12 md:p-20 aspect-[4/3] w-56 md:w-72 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
              >
              </button>
            </div>

            {/* Graphics Box - Right */}
            <div className="flex flex-col items-center">
              <p className="text-base md:text-lg text-brandBlack font-medium mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Graphics
              </p>
              <button
                onClick={() => setCurrentPage('my-work', 'graphics')}
                className="bg-gray-200 rounded-lg p-12 md:p-20 aspect-[4/3] w-56 md:w-72 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
              >
              </button>
            </div>
          </div>

          {/* Bottom Row: Websites - Centered */}
          <div className="flex flex-col items-center">
            <p className="text-base md:text-lg text-brandBlack font-medium mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Websites
            </p>
            <button
              onClick={() => setCurrentPage('my-work', 'websites')}
              className="bg-gray-200 rounded-lg p-12 md:p-20 aspect-[4/3] w-56 md:w-72 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
            >
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// WorkOverlay Component (Modal)
function WorkOverlay({ item, onClose, setCurrentPage, isRestrictedRegion, currentCategory, items, onNavigate }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isCopied, setIsCopied] = useState(false)

  // Generate deep link for sharing Graphics and Videos
  const shareCategory = currentCategory === 'personal-work' ? 'personal-work' : item.category[0];
  const shareableLink = `${window.location.origin}/my-work/${shareCategory}/${item.id}`;
  const currentIndex = items ? items.findIndex((entry) => entry.id === item.id) : -1
  const hasMultipleItems = items && items.length > 1
  const previousItem = hasMultipleItems && currentIndex > -1 ? items[(currentIndex - 1 + items.length) % items.length] : null
  const nextItem = hasMultipleItems && currentIndex > -1 ? items[(currentIndex + 1) % items.length] : null

  const handleCopyUrl = (url) => {
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div
      className="fixed inset-0 bg-white/30 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Main Modal Box */}
      <div
        className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row pt-12 md:pt-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 z-10"
        >
          <X className="size-6" />
        </button>

        {/* LEFT SIDE: Image or Video */}
        <div className="w-full md:w-1/2 bg-gray-100">
          {/* DEBUG: CHECK REGION */}
          {isRestrictedRegion ? (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center p-8">
              <h1 className="text-4xl font-bold text-red-600 text-center uppercase">
                U R IN INDO
              </h1>
            </div>
          ) : item.videoEmbedUrl ? (
            // 2. RENDER VIDEO (YouTube/Direct Embed)
            <div className="w-full h-full p-4 md:p-8 flex items-center justify-center">
              <iframe
                src={item.videoEmbedUrl}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video rounded-lg shadow-lg"
              ></iframe>
            </div>
          ) : item.embedHtml ? (
            // 3. RENDER HTML EMBED (Vimeo/Gyazo)
            <div
              className={`w-full h-auto bg-gray-50 p-4 md:p-8 ${item.category.includes('videos') ? '' : 'pointer-events-none'
                }`}
              dangerouslySetInnerHTML={{ __html: item.embedHtml }}
            />
          ) : item.slideVideos && item.slideVideos.length > 0 ? (
            // 4a. RENDER VIDEO CAROUSEL (autoplay looping video slides)
            <div className={`relative w-full h-64 md:h-full flex items-center justify-center bg-black ${item.id === 'graphic-lowheads-2026' ? 'p-[5%]' : ''}`}>
              <video
                key={currentSlideIndex}
                src={item.slideVideos[currentSlideIndex]}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
              {item.slideVideos.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + item.slideVideos.length) % item.slideVideos.length)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % item.slideVideos.length)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
                    {item.slideVideos.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentSlideIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            // 4b. RENDER IMAGE (with carousel support)
            <div className="relative w-full h-64 md:h-full">
              <img
                src={item.slides ? item.slides[currentSlideIndex] : item.fullImageUrl}
                alt={item.title}
                className="w-full h-full object-contain"
              />
              {/* Navigation arrows for multiple images */}
              {item.slides && item.slides.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + item.slides.length) % item.slides.length)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % item.slides.length)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                  {/* Slide indicators */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {item.slides.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentSlideIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: Text Content */}
        <div className="w-full md:w-1/2 p-4 md:p-8 pb-6 md:pb-8 flex flex-col justify-center">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>{item.title}</h2>

            {/* Date */}
            <p className="text-sm text-gray-500 mt-1 mb-4">{item.date}</p>

            {/* Tags */}
            {item.tags && item.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 500 }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Action Bar - Stacked Layout */}
            <div className="flex flex-col gap-3 mt-6">

              {/* LEFT: External Link (Instagram OR Website) */}
              <div className="flex gap-4">

                {/* A. Instagram Button with Share (for Graphics/Videos) */}
                {item.instagramLink && (
                  <div className="flex gap-2 w-full">
                    <a
                      href={item.instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow flex items-center justify-center gap-2 px-4 py-3 md:py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <Instagram className="size-5" />
                      <span className="font-medium">View Post</span>
                    </a>

                    {/* Share Button (Copy Deep Link) - Only for Graphics/Videos */}
                    {!item.websiteUrl && (
                      <button
                        onClick={() => handleCopyUrl(shareableLink)}
                        className="flex-none w-12 md:w-10 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
                        title="Copy Link to Project"
                      >
                        {isCopied ? (
                          <Check className="size-5 text-green-600" />
                        ) : (
                          <img
                            src="/extra_assets/copy_favicon.png"
                            alt="Copy"
                            className="w-5 h-5 object-contain"
                          />
                        )}
                      </button>
                    )}
                  </div>
                )}

                {/* B. Website Button with Copy */}
                {item.websiteUrl && (
                  <div className="flex gap-2 w-full">
                    {/* View Website Button */}
                    <a
                      href={item.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow flex items-center justify-center gap-2 px-4 py-3 md:py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <Globe className="size-5" />
                      <span className="font-medium">View Website</span>
                    </a>

                    {/* Copy Button (Square) */}
                    <button
                      onClick={() => handleCopyUrl(item.websiteUrl)}
                      className="flex-none w-12 md:w-10 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
                      title="Copy Link"
                    >
                      {isCopied ? (
                        <Check className="size-5 text-green-600" />
                      ) : (
                        <img
                          src="/extra_assets/copy_favicon.png"
                          alt="Copy"
                          className="w-5 h-5 object-contain"
                        />
                      )}
                    </button>
                  </div>
                )}

                {/* C. Share Button (for Graphics/Videos without Instagram) */}
                {!item.instagramLink && !item.websiteUrl && (
                  <button
                    onClick={() => handleCopyUrl(shareableLink)}
                    className="flex-none w-12 md:w-10 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
                    title="Copy Link to Project"
                  >
                    {isCopied ? (
                      <Check className="size-5 text-green-600" />
                    ) : (
                      <img
                        src="/extra_assets/copy_favicon.png"
                        alt="Copy"
                        className="w-5 h-5 object-contain"
                      />
                    )}
                  </button>
                )}
              </div>

              {/* RIGHT: CTA */}
              <button
                onClick={() => {
                  onClose();
                  setCurrentPage('contact');
                }}
                className="px-6 py-3 md:py-2 bg-[#c13333] text-white font-medium rounded-md hover:bg-red-700 transition-colors w-full"
              >
                Work With Hugo
              </button>
            </div>
          </div>
        </div>
        {previousItem && (
          <button
            onClick={() => onNavigate(previousItem.id)}
            className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-md"
            aria-label="Previous item"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}
        {nextItem && (
          <button
            onClick={() => onNavigate(nextItem.id)}
            className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-md"
            aria-label="Next item"
          >
            <ChevronRight className="size-5" />
          </button>
        )}
      </div>
    </div>
  )
}

// Category pages with sub-navigation
function MyWorkCategoryPage({ category, setCurrentPage, currentPage, currentItemId, isRestrictedRegion }) {
  const [selectedItem, setSelectedItem] = useState(null)

  // Helper function to distribute items into columns for left-to-right flow
  const distributeItems = (items, columnCount) => {
    const columns = Array.from({ length: columnCount }, () => []);
    items.forEach((item, index) => {
      columns[index % columnCount].push(item);
    });
    return columns;
  };

  // Render masonry grid with specified column count
  const renderMasonryGrid = (columnCount) => {
    const columns = distributeItems(displayedItems, columnCount);

    return (
      <div className="flex gap-4 md:gap-6">
        {columns.map((columnItems, columnIndex) => (
          <div key={columnIndex} className="flex-1 flex flex-col gap-4 md:gap-6">
            {columnItems.map(item => {
              const isWebsite = item.category.includes('websites')

              // Conditional padding: Websites get more breathing room (p-5), Graphics/Videos get smaller padding on mobile (p-2)
              const paddingClass = isWebsite ? "p-5 md:p-6" : "p-2 md:p-6"
              const cardClasses = `break-inside-avoid mb-6 group bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-lg w-full text-left ${paddingClass}`

              let imageStyles = "w-full rounded-lg shadow-sm block"
              if (item.category.includes('graphics')) {
                imageStyles += " h-auto object-contain"
              } else if (item.category.includes('videos')) {
                imageStyles += " aspect-[5/4] object-cover"
              } else if (item.category.includes('websites')) {
                imageStyles += " aspect-video object-cover"
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage('my-work', category, item.id)}
                  className={cardClasses}
                >
                  {item.slideVideos && item.slideVideos.length > 0 ? (
                    <video
                      src={item.slideVideos[0]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full aspect-[3/4] object-cover rounded-lg"
                    />
                  ) : item.slides && item.slides.length > 1 ? (
                    <GridCarousel images={item.slides} />
                  ) : (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className={imageStyles}
                    />
                  )}
                  <div className="mt-3 text-left">
                    <h3 className="text-[10px] md:text-sm font-bold text-gray-900 uppercase tracking-wide leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[9px] md:text-xs text-gray-500 mt-1 font-medium">
                      {item.date}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderGrid = (columnCount) => {
    const gridClass = columnCount === 3 ? 'grid-cols-3' : 'grid-cols-2'

    return (
      <div className={`grid ${gridClass} gap-4 md:gap-6`}>
        {displayedItems.map(item => {
          const isWebsite = item.category.includes('websites')

          const paddingClass = isWebsite ? "p-5 md:p-6" : "p-2 md:p-6"
          const cardClasses = `group bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-lg w-full text-left ${paddingClass}`

          let imageStyles = "w-full rounded-lg shadow-sm block"
          if (item.category.includes('graphics')) {
            imageStyles += " h-auto object-contain"
          } else if (item.category.includes('videos')) {
            imageStyles += " aspect-[5/4] object-cover"
          } else if (item.category.includes('websites')) {
            imageStyles += " aspect-video object-cover"
          }

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage('my-work', category, item.id)}
              className={cardClasses}
            >
              {item.slideVideos && item.slideVideos.length > 0 ? (
                <video
                  src={item.slideVideos[0]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
              ) : item.slides && item.slides.length > 1 ? (
                <GridCarousel images={item.slides} />
              ) : (
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className={imageStyles}
                />
              )}
              <div className="mt-3 text-left">
                <h3 className="text-[10px] md:text-sm font-bold text-gray-900 uppercase tracking-wide leading-tight">
                  {item.title}
                </h3>
                <p className="text-[9px] md:text-xs text-gray-500 mt-1 font-medium">
                  {item.date}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    )
  }
  const categoryNames = {
    'graphics': 'Graphics',
    'videos': 'Videos',
    'websites': 'Websites',
    'view-all': 'View all',
    'personal-work': 'Personal work'
  }

  const categorySubheadings = {
    'graphics': 'Featuring work ranging from editorial graphics and campaign assets to branded visuals.',
    'videos': 'Featuring work ranging from commercials and music videos to campaign content.',
    'websites': 'Featuring work ranging from portfolio sites and brand pages to campaign microsites.',
    'view-all': 'Featuring work ranging from commercials and editorial graphics to web and campaign assets.',
    'personal-work': 'A curated selection of HUGO ZBOR\'s independent work created without client attachment.'
  }

  const displayedItems = useMemo(() => {
    const excludedPersonalIds = new Set(['web-hugo-current', 'graphic-6'])
    const isPersonalItem = (item) => isPersonalClient(item.client) && !excludedPersonalIds.has(item.id)

    if (category === 'personal-work') {
      return [...allPortfolioItems]
        .filter(isPersonalItem)
        .sort((a, b) => parseDateString(b.date) - parseDateString(a.date))
    }

    const baseItems = category !== 'view-all'
      ? allPortfolioItems.filter(item => item.category.includes(category))
      : allPortfolioItems

    if (category === 'websites') {
      return [...baseItems].sort((a, b) => parseDateString(b.date) - parseDateString(a.date))
    }

    if (category === 'view-all') {
      return [...baseItems].sort((a, b) => parseDateString(b.date) - parseDateString(a.date))
    }

    return [...baseItems].sort((a, b) => parseDateString(b.date) - parseDateString(a.date))
  }, [category])

  useEffect(() => {
    if (currentItemId) {
      const targetItem = allPortfolioItems.find(item => item.id === currentItemId)
      if (targetItem) {
        setSelectedItem(targetItem)
      }
    } else {
      setSelectedItem(null)
    }
  }, [currentItemId])

  const isWebsiteTab = category === 'websites'
  const websiteLayout = "flex flex-wrap justify-center gap-8 px-4 md:px-0 mt-8"
  const standardLayout = "columns-2 gap-3 md:columns-2 lg:columns-3 md:gap-6 space-y-3 md:space-y-6 px-2 md:px-0 mt-4 md:mt-8"
  const containerClass = isWebsiteTab ? websiteLayout : standardLayout

  return (
    <>
      <PageHeader title="My work" isActive={currentPage === 'my-work'} />
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        {/* Sub-navigation */}
        <nav className="flex flex-row flex-wrap justify-center items-center gap-4 md:gap-8 mt-4 md:mt-8">
          <button
            onClick={() => setCurrentPage('my-work', 'personal-work')}
            className={
              category === 'personal-work'
                ? 'font-bold text-sm md:text-lg text-[#c13333]'
                : 'font-medium text-sm md:text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            PERSONAL WORK
          </button>
          <button
            onClick={() => setCurrentPage('my-work', 'videos')}
            className={
              category === 'videos'
                ? 'font-bold text-sm md:text-lg text-[#c13333]'
                : 'font-medium text-sm md:text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            VIDEOS
          </button>
          <button
            onClick={() => setCurrentPage('my-work', 'graphics')}
            className={
              category === 'graphics'
                ? 'font-bold text-sm md:text-lg text-[#c13333]'
                : 'font-medium text-sm md:text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            GRAPHICS
          </button>
          <button
            onClick={() => setCurrentPage('my-work', 'websites')}
            className={
              category === 'websites'
                ? 'font-bold text-sm md:text-lg text-[#c13333]'
                : 'font-medium text-sm md:text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            WEBSITES
          </button>
          <button
            onClick={() => setCurrentPage('my-work', 'view-all')}
            className={
              category === 'view-all'
                ? 'font-bold text-sm md:text-lg text-[#c13333]'
                : 'font-medium text-sm md:text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
            }
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            VIEW ALL
          </button>
        </nav>
        <p className="text-center text-sm md:text-base text-gray-500 mt-3 font-normal" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
          {categorySubheadings[category] || categorySubheadings['view-all']}
        </p>

        {/* Gallery */}
        {/* CASE A: WEBSITES (Now using Overlay instead of direct links) */}
        {category === 'websites' ? (
          <div className="flex flex-wrap justify-center gap-8 px-4 md:px-0 mt-8">
            {displayedItems.map(item => {
              const wrapperClass = "group w-full max-w-2xl bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block p-4"

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage('my-work', category, item.id)}
                  className={wrapperClass}
                >
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-auto shadow-sm rounded-md"
                  />
                  <div className="p-4">
                    <h3 className="text-[10px] md:text-sm font-bold text-gray-900 uppercase tracking-wide leading-tight truncate">
                      {item.title}
                    </h3>
                    <p className="text-[9px] md:text-xs text-gray-500 mt-1 font-medium">
                      {item.date}
                    </p>
                  </div>
                </button>
              )
            })}
            {/* Show a message if no items match the filter */}
            {displayedItems.length === 0 && (
              <p className="text-center text-gray-500" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                No projects found in this category.
              </p>
            )}
          </div>
        ) : (
          /* CASE B: GRAPHICS/VIDEOS (New L-R Masonry) */
          <>
            {/* Mobile View (2 Columns) */}
            <div className="block md:hidden mt-4 px-2">
              {category === 'videos' || category === 'graphics' || category === 'view-all' || category === 'personal-work' ? renderGrid(2) : renderMasonryGrid(2)}
            </div>

            {/* Desktop View (3 Columns) */}
            <div className="hidden md:block mt-8 px-0">
              {category === 'videos' || category === 'graphics' || category === 'view-all' || category === 'personal-work' ? renderGrid(3) : renderMasonryGrid(3)}
            </div>

            {/* Show a message if no items match the filter */}
            {displayedItems.length === 0 && (
              <p className="text-center text-gray-500 mt-8" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                No projects found in this category.
              </p>
            )}
          </>
        )}
      </div>

      {/* Overlay */}
      {selectedItem && (
        <WorkOverlay
          item={selectedItem}
          onClose={() => setCurrentPage('my-work', category, null)}
          setCurrentPage={setCurrentPage}
          isRestrictedRegion={isRestrictedRegion}
          currentCategory={category}
          items={displayedItems}
          onNavigate={(nextItemId) => setCurrentPage('my-work', category, nextItemId)}
        />
      )}
    </>
  )
}

// SectionHeader Component (for Wikipedia-style section titles)
function SectionHeader({ title, setCurrentPage }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-300 mt-8 pb-1">
      <h2 className="!text-2xl !font-normal !mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>{title}</h2>
      <button
        onClick={() => setCurrentPage('contact')}
        className="text-sm text-blue-600 hover:underline"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        [edit]
      </button>
    </div>
  )
}

// InfoBox Component (for sidebar images with captions)
function InfoBox({ imageUrl, caption, altText }) {
  return (
    <div className="border border-gray-300 bg-gray-50 rounded-lg p-3 mt-6 text-center">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-auto"
      />
      <p className="text-sm text-gray-700 mt-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>{caption}</p>
    </div>
  )
}

function ClientsPage({ setCurrentPage, currentPage }) {
  return (
    <div className="w-full pb-20">
      {/* Mobile-only Page Title (consistent with other pages) */}
      {typeof PageHeader === 'function' ? (
        <PageHeader title="Clients" isActive={currentPage === 'clients'} />
      ) : null}

      <div className="max-w-4xl mx-auto px-4 md:px-0 mt-6 md:mt-10">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brandBlack uppercase tracking-wide">
            {clientsCopy.title}
          </h1>
          <p
            className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed"
            style={{ fontWeight: 400 }}
          >
            {clientsCopy.subline}
          </p>
        </div>

        {/* Client grid */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
            Selected collaborations
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {selectedClients.map((c) => (
              <button
                key={c.name}
                onClick={() => setCurrentPage('clients', normalizeClientSlug(c.name))}
                className="group rounded-xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center justify-center h-20 md:h-24">
                  <img
                    src={c.logo}
                    alt={`${c.name} logo`}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wide">
                  {c.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA (only CTA) */}
        <div className="mt-12 md:mt-16">
          <h3 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-wide mb-2 text-center">
            Work With Hugo
          </h3>
          <p className="mb-3 text-sm text-gray-500 text-center" style={{ fontWeight: 400 }}>
            For new collaborations and commissions.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => setCurrentPage('contact')}
              className="w-full md:w-auto px-8 py-3 bg-[#c13333] text-white font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              Work With Hugo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClientWorkPage({ clientSlug, setCurrentPage, currentPage, currentItemId, isRestrictedRegion }) {
  const [selectedItem, setSelectedItem] = useState(null)

  const clientName = useMemo(() => {
    const match = selectedClients.find((client) => normalizeClientSlug(client.name) === clientSlug)
    return match ? match.name : clientSlug.replace(/_/g, ' ')
  }, [clientSlug])

  const clientItems = useMemo(() => {
    return allPortfolioItems
      .filter((item) => item.client === clientSlug)
      .sort((a, b) => parseDateString(b.date) - parseDateString(a.date))
  }, [clientSlug])

  useEffect(() => {
    if (currentItemId) {
      const targetItem = clientItems.find((item) => item.id === currentItemId)
      if (targetItem) {
        setSelectedItem(targetItem)
      }
    } else {
      setSelectedItem(null)
    }
  }, [currentItemId, clientItems])

  const renderGrid = (columnCount) => {
    const gridClass = columnCount === 3 ? 'grid-cols-3' : 'grid-cols-2'

    return (
      <div className={`grid ${gridClass} gap-4 md:gap-6`}>
        {clientItems.map((item) => {
          const isWebsite = item.category.includes('websites')
          const paddingClass = isWebsite ? "p-5 md:p-6" : "p-2 md:p-6"
          const cardClasses = `group bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-lg w-full text-left ${paddingClass}`

          let imageStyles = "w-full rounded-lg shadow-sm block"
          if (item.category.includes('graphics')) {
            imageStyles += " h-auto object-contain"
          } else if (item.category.includes('videos')) {
            imageStyles += " aspect-[5/4] object-cover"
          } else if (item.category.includes('websites')) {
            imageStyles += " aspect-video object-cover"
          }

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage('clients', clientSlug, item.id)}
              className={cardClasses}
            >
              {item.slideVideos && item.slideVideos.length > 0 ? (
                <video
                  src={item.slideVideos[0]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
              ) : item.slides && item.slides.length > 1 ? (
                <GridCarousel images={item.slides} />
              ) : (
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className={imageStyles}
                />
              )}
              <div className="mt-3 text-left">
                <h3 className="text-[10px] md:text-sm font-bold text-gray-900 uppercase tracking-wide leading-tight">
                  {item.title}
                </h3>
                <p className="text-[9px] md:text-xs text-gray-500 mt-1 font-medium">
                  {item.date}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <>
      <PageHeader title="Clients" isActive={currentPage === 'clients'} />
      <div className="max-w-4xl mx-auto px-4 md:px-0 mt-6 md:mt-10">
        <div className="flex flex-col items-center text-center gap-2 mb-6">
          <button
            onClick={() => setCurrentPage('clients', 'landing')}
            className="text-xs text-gray-500 uppercase tracking-widest hover:text-[#c13333] transition-colors"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Back to Clients
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-brandBlack uppercase tracking-wide">
            {clientName}
          </h1>
        </div>

        {clientItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-8" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            No projects publicly availble for this client yet.
          </p>
        ) : (
          <>
            <div className="block md:hidden mt-4 px-2">
              {renderGrid(2)}
            </div>
            <div className="hidden md:block mt-8 px-0">
              {renderGrid(3)}
            </div>
          </>
        )}
      </div>

      {selectedItem && (
        <WorkOverlay
          item={selectedItem}
          onClose={() => setCurrentPage('clients', clientSlug, null)}
          setCurrentPage={setCurrentPage}
          isRestrictedRegion={isRestrictedRegion}
          items={clientItems}
          onNavigate={(nextItemId) => setCurrentPage('clients', clientSlug, nextItemId)}
        />
      )}
    </>
  )
}

// About Page Component
function AboutPage({ setCurrentPage, currentPage }) {
  // Wiki Styles
  const styles = {
    link: "text-[#c13333] hover:underline cursor-pointer",
    header: "font-serif text-2xl border-b border-[#a2a9b1] pb-1 mb-4 mt-8 flex justify-between items-end",
    infoboxCell: "py-1 px-2 align-top text-sm border-b border-gray-100 last:border-0",
    infoboxLabel: "font-bold w-24", // Fixed width label for alignment
  };

  return (
    <div className="bg-white min-h-screen pb-20 text-[#202122] font-sans font-normal text-[15px] leading-[1.6]">
      {/* 1. Mobile Navigation Header */}
      <PageHeader title="About" isActive={currentPage === 'about'} />

      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-6">

        {/* 2. Page Title */}
        <h1 className="font-sans font-bold uppercase tracking-wide text-3xl md:text-4xl border-b border-[#a2a9b1] pb-1 mb-4">
          Hugo Zbor
        </h1>

        {/* Intro Text - Mobile Only (appears above photo) */}
        <p className="mb-4 md:hidden font-normal">
          Hugo Zbor (born Jakarta, Indonesia) is a 21-year-old <span className={styles.link}>artist</span>, <span className={styles.link}>editor</span>, and <span className={styles.link}>web designer</span> based in <span className={styles.link}>Melbourne, Australia</span>.
        </p>

        {/* 3. Main Layout Container (Flex Column on Mobile, Row on Desktop) */}
        <div className="flex flex-col md:flex-row md:gap-8 items-start">

          {/* --- COLUMN A: INFOBOX (Profile) --- */}
          {/* ORDER-1: Shows first on mobile. ORDER-2: Shows second (right) on desktop */}
          <div className="w-full md:w-72 shrink-0 order-1 md:order-2 mb-6 md:mb-0">
            <div className="border border-[#a2a9b1] bg-[#f8f9fa] p-1 text-sm shadow-sm">
              <div className="bg-[#ddb3b3] p-2 text-center font-bold font-serif text-lg mb-1">Hugo Zbor</div>

              <img src="/about_page/me.jpg" alt="Hugo Zbor Profile" className="w-full h-auto border border-[#a2a9b1] mb-2" />

              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr>
                    <td className={styles.infoboxCell + " " + styles.infoboxLabel}>Born</td>
                    <td className={styles.infoboxCell}><a href="https://en.wikipedia.org/wiki/Jakarta" target="_blank" rel="noopener noreferrer" className={styles.link}>Jakarta, Indonesia</a></td>
                  </tr>
                  <tr>
                    <td className={styles.infoboxCell + " " + styles.infoboxLabel}>Nationality</td>
                    <td className={styles.infoboxCell}><a href="https://en.wikipedia.org/wiki/Indonesians" target="_blank" rel="noopener noreferrer" className={styles.link}>Indonesian</a></td>
                  </tr>
                  <tr>
                    <td className={styles.infoboxCell + " " + styles.infoboxLabel}>Known for</td>
                    <td className={styles.infoboxCell}><a href="https://en.wikipedia.org/wiki/Graphic_design" target="_blank" rel="noopener noreferrer" className={styles.link}>Graphic Design</a>, <a href="https://en.wikipedia.org/wiki/Web_design" target="_blank" rel="noopener noreferrer" className={styles.link}>Web Design</a></td>
                  </tr>
                  <tr>
                    <td className={styles.infoboxCell + " " + styles.infoboxLabel}>Website</td>
                    <td className={styles.infoboxCell}><a href="https://hugozbor.com" target="_blank" rel="noopener noreferrer" className={styles.link}>hugozbor.com</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* --- COLUMN B: MAIN ARTICLE --- */}
          {/* ORDER-2: Shows second on mobile. ORDER-1: Shows first (left) on desktop */}
          <div className="w-full md:flex-1 order-2 md:order-1 min-w-0">
            {/* min-w-0 prevents flex items from overflowing container */}

            {/* Intro Text - Desktop Only */}
            <p className="mb-4 hidden md:block font-normal">
              Hugo Zbor (born Jakarta, Indonesia) is a 21-year-old <span className={styles.link}>artist</span>, <span className={styles.link}>editor</span>, and <span className={styles.link}>web designer</span> based in <span className={styles.link}>Melbourne, Australia</span>.
            </p>

            {/* Table of Contents */}
            <div className="border border-[#a2a9b1] bg-[#f8f9fa] p-3 mb-6 rounded-sm inline-block w-full sm:w-auto sm:min-w-[250px]">
              <div className="font-bold text-center mb-2 text-sm">Contents</div>
              <ul className="text-sm list-decimal list-inside space-y-1 text-[#c13333]">
                <li><a href="#design" className="hover:underline">Introduction to Design</a></li>
                <li><a href="#lockdown" className="hover:underline">High School and Covid Lockdown</a></li>
                <li><a href="#australia" className="hover:underline">Moving to Australia</a></li>
                <li><a href="#renaissance" className="hover:underline">Personal Renaissance</a></li>
              </ul>
            </div>

            {/* SECTION 1 */}
            <div id="design" className={styles.header}>
              <h2>Introduction to Design</h2>
              <span className="text-xs text-[#c13333] font-sans font-normal hidden sm:inline">[<button onClick={() => setCurrentPage('contact')} className="hover:underline">edit</button>]</span>
            </div>

            {/* Image 1: Floated right on all screens, smaller on mobile */}
            <div className="border border-[#c8ccd1] bg-[#f8f9fa] p-1 mb-2 float-right ml-3 w-24 md:w-48">
              <img src="/about_page/hugo_5th_grade.png" alt="Hugo in 5th Grade" className="w-full h-auto mb-1" />
              <div className="p-1 text-[10px] md:text-xs text-gray-600 leading-tight">Hugo in the fifth grade</div>
            </div>

            {/* Image 2: Floated right on all screens, smaller on mobile */}
            <div className="border border-[#c8ccd1] bg-[#f8f9fa] p-1 mb-2 float-right ml-3 w-24 md:w-48">
              <img src="/about_page/hugo_photoshop.png" alt="Hugo using Photoshop" className="w-full h-auto mb-1" />
              <div className="p-1 text-[10px] md:text-xs text-gray-600 leading-tight">Hugo using <a href="https://en.wikipedia.org/wiki/Adobe_Photoshop" target="_blank" rel="noopener noreferrer" className={styles.link}>Photoshop</a> in 2016</div>
            </div>

            <p className="mb-4 font-normal">Around the fifth grade, I was borrowing my mum's laptop and I stumbled across a video of someone editing photos with <a href="https://www.adobe.com/products/photoshop.html" target="_blank" rel="noopener noreferrer" className={styles.link}>Photoshop</a> on <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className={styles.link}>YouTube</a>. At the time, you were able to do 30-day free trials, so I secretly downloaded it and kept making new emails to keep using it. I was really bad at watching tutorials, so I started learning by trying out every single tool and then just testing random things.</p>

            <p className="mb-4 font-normal">For the next 5 years I would continue to learn and use <a href="https://www.adobe.com/products/photoshop.html" target="_blank" rel="noopener noreferrer" className={styles.link}>Photoshop</a> as a hobby for fun (making memes and silly images).</p>

            {/* SECTION 2 */}
            <div id="lockdown" className={styles.header}>
              <h2>High School and Covid Lockdown</h2>
              <span className="text-xs text-[#c13333] font-sans font-normal hidden sm:inline">[<button onClick={() => setCurrentPage('contact')} className="hover:underline">edit</button>]</span>
            </div>

            {/* FLOATED IMAGE CONTAINER */}
            <div className="border border-[#c8ccd1] bg-[#f8f9fa] p-1 mb-4 ml-4 float-right w-1/2 md:w-[220px]">
              {/* Image */}
              <img
                src="/about_page/hugo_covid.png"
                alt="Hugo during Covid"
                className="w-full h-auto mb-1"
              />
              {/* Caption */}
              <div className="p-1 text-[11px] md:text-xs text-gray-600 leading-tight">
                Hugo during <a href="https://en.wikipedia.org/wiki/COVID-19_pandemic" target="_blank" rel="noopener noreferrer" className={styles.link}>Covid Lockdown</a>
              </div>
            </div>

            <p className="mb-4 font-normal">Mid-Highschool, after COVID lockdown began, I started venturing into <a href="https://en.wikipedia.org/wiki/Screen_printing" target="_blank" rel="noopener noreferrer" className={styles.link}>screen-printing</a>. After many failures, I actually made a few graphic t-shirts. My first "order" was printing 50 tote bags for my sister's graduation year.</p>

            <p className="mb-4 font-normal">After COVID lockdown, two friends and I decided to start a <a href="https://www.instagram.com/99clover" target="_blank" rel="noopener noreferrer" className={styles.link}>99Clover</a>, a clothing brand. It was initially just for our friends, but blew up locally.</p>

            <p className="mb-4 font-normal">This was when I first started taking <a href="https://www.adobe.com/products/photoshop.html" target="_blank" rel="noopener noreferrer" className={styles.link}>Photoshop</a> seriously.</p>

            {/* SECTION 3 */}
            <div id="australia" className={`${styles.header} clear-both pt-4`}>
              <h2>Moving to Australia</h2>
              <span className="text-xs text-[#c13333] font-sans font-normal hidden sm:inline">[<button onClick={() => setCurrentPage('contact')} className="hover:underline">edit</button>]</span>
            </div>

            {/* FLOATED IMAGE CONTAINER 1 */}
            <div className="border border-[#c8ccd1] bg-[#f8f9fa] p-1 mb-2 ml-4 float-right w-32 md:w-48">
              {/* Image 1 */}
              <img
                src="/about_page/hugo_student_id.png"
                alt="Hugo Student ID"
                className="w-full h-auto mb-1"
              />
              {/* Caption 1 */}
              <div className="p-1 text-[10px] md:text-xs text-gray-600 leading-tight">
                Hugo's student ID in 2023
              </div>
            </div>

            <p className="mb-4 font-normal">I moved to <a href="https://en.wikipedia.org/wiki/Australia" target="_blank" rel="noopener noreferrer" className={styles.link}>Australia</a>, in 2022, to study <a href="https://en.wikipedia.org/wiki/Unemployment" target="_blank" rel="noopener noreferrer" className={styles.link}>computer science</a> and I kept running the brand (remotely) while attempting to balance it with studying. I noticed my love for design was fading and feeling like a chore. I would always rush and design quickly, because I wanted to get it out of the way.</p>

            <p className="mb-4 font-normal">Mid-2024, I stumbled across a <a href="https://en.wikipedia.org/wiki/Music_video" target="_blank" rel="noopener noreferrer" className={styles.link}>music video</a> that was so refreshingly creative, it inspired me to start designing again. I started pushing myself out of my comfort zone and trying new things, finally learning again after such a long time. Around this time, I finally started to enjoy studying <a href="https://en.wikipedia.org/wiki/Unemployment" target="_blank" rel="noopener noreferrer" className={styles.link}>computer science</a>, and I began incorporating my graphic design skills into coding projects.</p>

            {/* SECTION 4: Personal Renaissance */}
            <div id="renaissance" className={`${styles.header} clear-both pt-4`}>
              <h2>Personal Renaissance</h2>
              <span className="text-xs text-[#c13333] font-sans font-normal hidden sm:inline">[<button onClick={() => setCurrentPage('contact')} className="hover:underline">edit</button>]</span>
            </div>

            {/* Parent Wrapper (Positioning Only - No Border) */}
            <div className="float-right ml-4 w-32 md:w-[420px] mb-4 flex flex-col md:flex-row gap-2">

              {/* IMAGE 1: Hugo in Melbourne (Own Box) */}
              <div className="border border-[#c8ccd1] bg-[#f8f9fa] p-1 w-full">
                <img
                  src="/about_page/hugoxlaptop.jpg"
                  alt="Hugo in Melbourne"
                  className="w-full h-auto mb-1"
                />
                <div className="p-1 text-[10px] md:text-xs text-gray-600 leading-tight">
                  Hugo in Melbourne, Oct 2025
                </div>
              </div>

              {/* IMAGE 2: Hugo and Shei (Own Box) */}
              <div className="border border-[#c8ccd1] bg-[#f8f9fa] p-1 w-full">
                <img
                  src="/about_page/shei.jpg"
                  alt="Hugo and Shei"
                  className="w-full h-auto mb-1"
                />
                <div className="p-1 text-[10px] md:text-xs text-gray-600 leading-tight">
                  Hugo and Shei, Nov 2025
                </div>
              </div>

            </div>

            <p className="mb-4 font-normal">In February, 2025, I started posting more on a new design account I made (<a href="https://www.instagram.com/hugozbor" target="_blank" rel="noopener noreferrer" className={styles.link}>@hugozbor</a> on <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Instagram</a>). My art was met with overwhelming support and I've even been contacted by designers that inspired me in the past. A few months after this I decided to get a <span className={styles.link}>manager</span> to help organise and push my output to a different level. His name is <b>Shei</b> (<a href="https://www.instagram.com/sheivault" target="_blank" rel="noopener noreferrer" className={styles.link}>@sheivault</a>) and he was actually the first person I met at uni, years ago, on the very first day.</p>

            <p className="mb-4 font-normal">I am endlessly grateful for everything that lead me to where im at today. I believe I am now growing, as an artist, faster than ever before.</p>

          </div>
        </div>
      </div>
    </div >
  );
}

// Accordion Component for Commissions
function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-300">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-4 text-left hover:bg-gray-50 transition-colors duration-200"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        <h3 className="text-lg font-bold text-brandBlack">{title}</h3>
        {isOpen ? (
          <ChevronUp className="size-5 text-gray-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="size-5 text-gray-600 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 pr-8" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
          {children}
        </div>
      )}
    </div>
  )
}

// Commissions Page Component
function CommissionsPage({ activeSection, setCurrentPage, currentPage }) {
  const handleToggle = (sectionId) => {
    if (activeSection === sectionId) {
      // If clicking the open section, close it
      setCurrentPage('commissions', null)
    } else {
      // Open the clicked section
      setCurrentPage('commissions', sectionId)
    }
  }

  return (
    <>
      <PageHeader title="Commissions" isActive={currentPage === 'commissions'} />
      <div className="max-w-4xl mx-auto px-4 md:px-0 mt-4 md:mt-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brandBlack mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Campaigns & Creative Direction
          </h1>
          <p className="text-sm md:text-base font-normal text-gray-600 leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Hugo Zbor collaborates with artists, brands, and creative teams on visual projects ranging from campaign work to select commissions.          </p>
        </div>

        <div
          id="campaign-call"
          className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-10 my-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-brandBlack mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Planning a Launch or Rollout?
          </h2>
          <div className="text-sm md:text-base text-gray-600 leading-relaxed space-y-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            <p>For brands, artists, and agencies preparing a defined release moment.</p>
            <p>We approach campaigns as cohesive creative systems rather than individual assets.</p>
          </div>
          <button
            onClick={() => {
              setCurrentPage('commissions', 'campaigncall')
            }}
            className="mt-6 w-full md:w-auto px-8 py-3 bg-[#c13333] text-white font-medium rounded-md hover:bg-red-700 transition-colors"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Apply for Campaign Strategy Call
          </button>
          <p className="mt-3 text-xs text-gray-500" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            Applications are reviewed by management. If aligned, we’ll send available times.
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-0">
          <div className="mb-6">
            <h2 className="text-lg md:text-xl font-bold text-brandBlack" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Standalone Commissions
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-600" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              For single deliverables or smaller-scope projects, browse categories below.
            </p>
          </div>
          <AccordionItem
            title="Visual Art & Graphic Design"
            isOpen={activeSection === 'visual-art'}
            onToggle={() => handleToggle('visual-art')}
          >
            <div>
              <p className="mb-3" style={{ fontWeight: 400 }}>Custom visuals in Hugo's signature style, including:</p>
              <ul className="list-disc list-inside space-y-1 ml-4" style={{ fontWeight: 400 }}>
                <li>Digital artworks</li>
                <li>Character-based visuals</li>
                <li>Graphic posters</li>
                <li>Album/EP artwork</li>
                <li>Single covers</li>
                <li>Merch mockups</li>
                <li>Campaign visuals</li>
                <li>Editorial graphics</li>
              </ul>
              <p className="mt-3" style={{ fontWeight: 400 }}>Designed for artists, brands, and creative campaigns needing distinct, high-quality visuals.</p>
              <a
                href="/my-work/graphics"
                className="inline-block mt-6 text-sm text-gray-400 underline hover:text-[#c13333] transition-colors"
                style={{ fontWeight: 400 }}
              >
                view previous graphic work
              </a>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Video & Motion Visuals"
            isOpen={activeSection === 'video-motion'}
            onToggle={() => handleToggle('video-motion')}
          >
            <div>
              <p className="mb-3" style={{ fontWeight: 400 }}>Creative video work, including:</p>
              <ul className="list-disc list-inside space-y-1 ml-4" style={{ fontWeight: 400 }}>
                <li>Visual loops (10–30s)</li>
                <li>Green screen compositing</li>
                <li>Rotoscoping and matte work</li>
                <li>3D/Blender-enhanced motion visuals</li>
                <li>Music promo visuals</li>
                <li>Video composites and FX</li>
                <li>Motion graphics</li>
                <li>Animated assets</li>
              </ul>
              <p className="mt-3" style={{ fontWeight: 400 }}>Designed for music promotion, product launches, and brand campaigns.</p>
              <a
                href="/my-work/videos"
                className="inline-block mt-6 text-sm text-gray-400 underline hover:text-[#c13333] transition-colors"
                style={{ fontWeight: 400 }}
              >
                view previous video work
              </a>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Creative Direction & Consulting"
            isOpen={activeSection === 'creative-direction'}
            onToggle={() => handleToggle('creative-direction')}
          >
            <div>
              <p className="mb-3" style={{ fontWeight: 400 }}>Vision-level involvement and leadership, including:</p>
              <ul className="list-disc list-inside space-y-1 ml-4" style={{ fontWeight: 400 }}>
                <li>Creative strategy</li>
                <li>Aesthetic development</li>
                <li>Brand identity direction</li>
                <li>Moodboards & visual planning</li>
                <li>Campaign concepting</li>
                <li>Asset review & feedback</li>
                <li>On-call creative consulting</li>
              </ul>
              <p className="mt-3" style={{ fontWeight: 400 }}>Ideal for clients wanting direction beyond simple asset creation.</p>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Web Design & Digital Experience"
            isOpen={activeSection === 'web-design'}
            onToggle={() => handleToggle('web-design')}
          >
            <div>
              <p className="mb-3" style={{ fontWeight: 400 }}>Custom website design & digital experiences:</p>
              <ul className="list-disc list-inside space-y-1 ml-4" style={{ fontWeight: 400 }}>
                <li>Portfolio websites</li>
                <li>Artist sites</li>
                <li>Brand landing pages</li>
                <li>Shopify storefronts</li>
                <li>E-commerce design</li>
                <li>Custom-coded visuals</li>
                <li>Advanced layouts</li>
              </ul>
              <p className="mt-3" style={{ fontWeight: 400 }}>Built from scratch to match your brand identity and creative direction.</p>
              <a
                href="/my-work/websites"
                className="inline-block mt-6 text-sm text-gray-400 underline hover:text-[#c13333] transition-colors"
                style={{ fontWeight: 400 }}
              >
                view previous web design work
              </a>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Content Creation (Artists & Influencers)"
            isOpen={activeSection === 'content-creation'}
            onToggle={() => handleToggle('content-creation')}
          >
            <p className="mb-3" style={{ fontWeight: 400 }}>Ongoing content for talent and creators:</p>
            <ul className="list-disc list-inside space-y-1 ml-4" style={{ fontWeight: 400 }}>
              <li>Short-form visuals</li>
              <li>TikTok / Reels production</li>
              <li>Promo materials</li>
              <li>Mixed-media posts</li>
              <li>Creative storytelling assets</li>
            </ul>
            <p className="mt-3" style={{ fontWeight: 400 }}>Made for building strong and consistent online presence.</p>
            <a
              href="/my-work/personal-work"
              className="inline-block mt-6 text-sm text-gray-400 underline hover:text-[#c13333] transition-colors"
              style={{ fontWeight: 400 }}
            >
              view previous content
            </a>
          </AccordionItem>

          <AccordionItem
            title="Collaboration Projects"
            isOpen={activeSection === 'collaboration'}
            onToggle={() => handleToggle('collaboration')}
          >
            <p className="mb-3" style={{ fontWeight: 400 }}>Cross-disciplinary creative collaborations:</p>
            <ul className="list-disc list-inside space-y-1 ml-4" style={{ fontWeight: 400 }}>
              <li>Fashion × visual design</li>
              <li>Brand partnerships</li>
              <li>Capsule visuals</li>
              <li>Experimental art projects</li>
              <li>Visuals for events or exhibitions</li>
            </ul>
            <p className="mt-3" style={{ fontWeight: 400 }}>Open to select clients depending on creative fit.</p>
            <a
              href="/clients"
              className="inline-block mt-6 text-sm text-gray-400 underline hover:text-[#c13333] transition-colors"
              style={{ fontWeight: 400 }}
            >
              view my collaborated work
            </a>
          </AccordionItem>

          <AccordionItem
            title="Custom Requests"
            isOpen={activeSection === 'custom'}
            onToggle={() => handleToggle('custom')}
          >
            <p style={{ fontWeight: 400 }}>
              If your project doesn't fit the categories above, Hugo accepts custom one-off or long-term commissions depending on availability.
              Describe your idea in the contact form to get started.
            </p>
          </AccordionItem>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-16 mb-20 text-center">
          <h2 className="text-3xl font-bold text-brandBlack mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Commission Inquiry
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            For standalone projects or custom requests, submit a commission inquiry below.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => {
                window.location.href = '/contact?type=commission'
              }}
              className="px-8 py-3 bg-[#c13333] text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Submit Inquiry
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// CountrySelect Component
function CountrySelect({ selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  // Filter countries based on search
  const filteredCountries = COUNTRY_CODES.filter(country =>
    country.label.toLowerCase().includes(search.toLowerCase()) ||
    country.dial.includes(search)
  )

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
      >
        <span className="text-lg">{selected.flag}</span>
        <span className="text-brandBlack">{selected.dial}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-20 overflow-hidden">
            {/* Search Bar */}
            <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#c13333]"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
                />
              </div>
            </div>

            {/* Country List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onChange(country)
                    setIsOpen(false)
                    setSearch('')
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="flex-1 text-brandBlack text-sm">{country.label}</span>
                  <span className="text-gray-500 text-sm">{country.dial}</span>
                </button>
              ))}
              {filteredCountries.length === 0 && (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  No countries found
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Contact Page Component

function ContactPage({ setCurrentPage, currentPage }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const requestType = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return new URLSearchParams(window.location.search).get('type') || ''
  }, [])
  const defaultRequestType = requestType === 'campaign'
    ? 'Campaign / Launch / Rollout'
    : requestType === 'commission'
      ? 'Standalone Commission'
      : ''

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.target
    const data = new FormData(form)
    const formspreeEndpoint = 'https://formspree.io/f/xldawqyy'

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        // Success! Trigger the "Thank You" page.
        setIsSubmitted(true)
      } else {
        // Handle server errors
        alert('Error: Could not submit form. Please try again.')
      }
    } catch (error) {
      // Handle network errors
      alert('Error: Network problem. Please check your connection.')
    }
  }

  if (isSubmitted) {
    // Success View
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-0 mt-4 md:mt-8">
        <div className="text-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
          <h1 className="text-3xl md:text-4xl text-brandBlack mb-4" style={{ fontWeight: 400 }}>
            Thank You! Your inquiry has been submitted.
          </h1>
          <p className="text-lg md:text-xl text-brandBlack mb-4" style={{ fontWeight: 400 }}>
            I've received your message and will review your project details. You can expect an email from{' '}
            <a href="mailto:contact@hugozbor.com" className="text-[#c13333] hover:underline" style={{ fontWeight: 400 }}>
              contact@hugozbor.com
            </a>
            {' '}within 1-2 business days. In the meantime, feel free to check out{' '}
            <button
              onClick={() => setCurrentPage('my-work', 'view-all')}
              className="text-[#c13333] underline hover:no-underline cursor-pointer"
              style={{ fontWeight: 400 }}
            >
              my latest work
            </button>
            .
          </p>
        </div>
      </div>
    )
  }

  // Form View
  return (
    <>
      <PageHeader title="Contact" isActive={currentPage === 'contact'} />
      <div className="max-w-4xl mx-auto px-4 md:px-0 mt-4 md:mt-8">
        {/* Header Text */}
        <p className="text-sm md:text-base font-normal text-gray-600 leading-relaxed mb-6 text-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          You can email{' '}
          <a href="mailto:contact@hugozbor.com" className="text-[#c13333] hover:underline" style={{ fontWeight: 400 }}>
            contact@hugozbor.com
          </a>
          {', contact Hugo\'s manager '}
          <a
            href="https://hugozbor.com/info"
            className="text-[#c13333] hover:underline"
            style={{ fontWeight: 400 }}
          >
            Shei
          </a>
          {', or fill out the form below.'}
          <span className="block">
            We'll get back to you within 1-2 business days.
          </span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
          <div>
            <label className="block text-brandBlack mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              What best describes your request?*
            </label>
            <select
              name="request_type"
              required
              defaultValue={defaultRequestType}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333] bg-white"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
            >
              <option value="" disabled>Select an option</option>
              <option value="Campaign / Launch / Rollout">Campaign / Launch / Rollout</option>
              <option value="Standalone Commission">Standalone Commission</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>
          {/* Row 1: Name & Contact */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-brandBlack mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-brandBlack mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
              />
            </div>
          </div>

          {/* Row 2: Service Selection */}
          <div>
            <label className="block text-brandBlack mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              What service(s) are you looking for?*
            </label>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input
                  type="checkbox"
                  name="service_type"
                  value="Visual Art & Graphic Design"
                  required
                  className="mr-2"
                  style={{ accentColor: '#c13333' }}
                />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>Visual Art & Graphic Design</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input
                  type="checkbox"
                  name="service_type"
                  value="Video & Motion Visuals"
                  className="mr-2"
                  style={{ accentColor: '#c13333' }}
                />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>Video & Motion Visuals</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input
                  type="checkbox"
                  name="service_type"
                  value="Creative Direction & Consulting"
                  className="mr-2"
                  style={{ accentColor: '#c13333' }}
                />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>Creative Direction & Consulting</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input
                  type="checkbox"
                  name="service_type"
                  value="Web Design & Digital Experience"
                  className="mr-2"
                  style={{ accentColor: '#c13333' }}
                />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>Web Design & Digital Experience</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input
                  type="checkbox"
                  name="service_type"
                  value="Content Creation (Artists & Influencers)"
                  className="mr-2"
                  style={{ accentColor: '#c13333' }}
                />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>Content Creation (Artists & Influencers)</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input
                  type="checkbox"
                  name="service_type"
                  value="Collaboration Projects"
                  className="mr-2"
                  style={{ accentColor: '#c13333' }}
                />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>Collaboration Projects</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input
                  type="checkbox"
                  name="service_type"
                  value="Custom Requests"
                  className="mr-2"
                  style={{ accentColor: '#c13333' }}
                />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>Custom Requests</span>
              </label>
            </div>
          </div>

          {/* Row 3: Launch/Rollout */}
          <div>
            <label className="block text-brandBlack mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              Is this part of a larger launch or rollout?*
            </label>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input type="radio" name="launch_rollout" value="Yes" required className="mr-2" style={{ accentColor: '#c13333' }} />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>Yes</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input type="radio" name="launch_rollout" value="Not sure yet" required className="mr-2" style={{ accentColor: '#c13333' }} />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>Not sure yet</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input type="radio" name="launch_rollout" value="No" required className="mr-2" style={{ accentColor: '#c13333' }} />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>No</span>
              </label>
            </div>
          </div>

          {/* Row 4: Budget */}
          <div>
            <label className="block text-brandBlack mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              Estimated Budget*
            </label>
            <input
              type="text"
              name="budget"
              placeholder="e.g. $1,000 or $5k–$10k"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
            />
          </div>

          {/* Row 5: Decision Maker */}
          <div>
            <label className="block text-brandBlack mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              Are you the primary decision maker?*
            </label>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input type="radio" name="decision_maker" value="Yes" required className="mr-2" style={{ accentColor: '#c13333' }} />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>Yes</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input type="radio" name="decision_maker" value="Shared decision" required className="mr-2" style={{ accentColor: '#c13333' }} />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>Shared decision</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input type="radio" name="decision_maker" value="No (collecting information)" required className="mr-2" style={{ accentColor: '#c13333' }} />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>No (collecting information)</span>
              </label>
            </div>
          </div>

          {/* Row 6: Timeline */}
          <div>
            <label className="block text-brandBlack mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              Ideal Timeline*
            </label>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input type="checkbox" name="timeline" value="Less than 2 weeks" className="mr-2" style={{ accentColor: '#c13333' }} />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>Less than 2 weeks</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input type="checkbox" name="timeline" value="2–4 weeks" className="mr-2" style={{ accentColor: '#c13333' }} />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>2–4 weeks</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input type="checkbox" name="timeline" value="1–2 months" className="mr-2" style={{ accentColor: '#c13333' }} />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>1–2 months</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input type="checkbox" name="timeline" value="2–3 months" className="mr-2" style={{ accentColor: '#c13333' }} />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>2–3 months</span>
              </label>
              <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                <input type="checkbox" name="timeline" value="Flexible / planning stage" className="mr-2" style={{ accentColor: '#c13333' }} />
                <span className="text-brandBlack" style={{ fontWeight: 400 }}>Flexible / planning stage</span>
              </label>
            </div>
          </div>

          {/* Row 7: Guided Questions */}
          <div className="space-y-4">
            <div>
              <label className="block text-brandBlack mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                What are you launching or promoting?*
              </label>
              <input
                type="text"
                name="project_launch"
                required
                placeholder="e.g album rollout, clothing brand launch, music video / visualiser"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
              />
            </div>
            <div>
              <label className="block text-brandBlack mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                What does success look like for this project?*
              </label>
              <input
                type="text"
                name="project_success"
                required
                placeholder="e.g. launch visibility, brand positioning, conversion, cohesion across a rollout"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
              />
            </div>
            <div>
              <label className="block text-brandBlack mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
                Reference links (optional)
              </label>
              <textarea
                name="project_reference_links"
                placeholder="Paste links here"
                rows={1}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333] resize-none overflow-hidden"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
                onInput={(event) => {
                  event.target.style.height = 'auto'
                  event.target.style.height = `${event.target.scrollHeight}px`
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-white border border-gray-300 rounded-lg text-brandBlack hover:bg-[#c13333] hover:text-white transition-colors"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
          >
            Submit Project Inquiry
          </button>
        </form>
      </div>
    </>
  )
}

// Footer Component
function Footer({ setCurrentPage }) {
  return (
    <footer className="max-w-4xl mx-auto px-4 md:px-0 mt-16 md:mt-24 py-8 border-t border-gray-200">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Icon Group */}
        <div className="flex flex-row space-x-6">
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/hugozbor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            <Instagram className="size-6" />
          </a>

          {/* TikTok Link */}
          <a
            href="https://www.tiktok.com/@hugozbor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Visit Hugo Zbor on TikTok"
          >
            <TikTokIcon className="size-6" />
          </a>

          {/* Email Link */}
          <a
            href="mailto:contact@hugozbor.com"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            <Mail className="size-6" />
          </a>
        </div>

        {/* Copyright Text */}
        <p className="text-sm text-gray-500" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          © HUGOZBOR 2025
        </p>

        {/* Terms & Conditions Link */}
        <button
          onClick={() => setCurrentPage('terms')}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          Terms & Conditions
        </button>
      </div>
    </footer>
  )
}

// Terms & Conditions Page Component
function TermsPage({ setCurrentPage, currentPage }) {
  return (
    <>
      <PageHeader title="Terms & Conditions" isActive={currentPage === 'terms'} />
      <div className="max-w-4xl mx-auto px-4 md:px-0 mt-4 md:mt-8">
        <div className="bg-gray-100 rounded-lg p-8 md:p-12">
          <div className="prose max-w-none font-normal text-gray-700" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <h1 className="text-3xl font-bold text-brandBlack mb-2">Terms & Conditions — HUGOZBOR</h1>

            <p className="text-sm text-gray-600 mb-6">Last updated: 16th November 2025</p>

            <p className="font-normal text-gray-700 mb-6">
              Welcome to the official website of HUGOZBOR ("Hugo", "we", "our", "the Artist").
              By accessing or using this website, you agree to the following Terms & Conditions.
              If you do not agree, please discontinue use of the site.
            </p>

            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">1. Intellectual Property & Ownership</h2>

            <p className="font-normal text-gray-700 mb-4">
              All artwork, designs, visuals, graphics, videos, animations, website content, branding, logos, and all related creative material displayed on this website (collectively, the "Content") are the exclusive property of HUGOZBOR.
            </p>

            <p className="font-normal text-gray-700 mb-4">Unless explicitly stated otherwise:</p>

            <p className="font-normal text-gray-700 mb-4">All Content is owned, created, and copyrighted by HUGOZBOR.</p>

            <p className="font-normal text-gray-700 mb-4">All rights are reserved.</p>

            <p className="font-normal text-gray-700 mb-4">
              No Content may be copied, reproduced, edited, redistributed, resold, showcased commercially, or used for training datasets, AI models, or promotional material without written permission from Hugo.
            </p>

            <p className="font-normal text-gray-700 mb-6">Unauthorized use may result in legal action.</p>

            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">2. Usage Rights for Commissioned Work</h2>

            <p className="font-normal text-gray-700 mb-4">When a client commissions Hugo for a project:</p>

            <p className="font-normal text-gray-700 mb-4">
              The client receives a license to use the final delivered artwork only for the agreed purpose (e.g., social media promotion, album artwork, brand visuals, website usage).
            </p>

            <p className="font-normal text-gray-700 mb-4">Ownership is not transferred unless explicitly negotiated in writing.</p>

            <p className="font-normal text-gray-700 mb-4">
              Raw project files (PSD, Blender files, project files, layers, etc.) are not included unless separately purchased.
            </p>

            <p className="font-normal text-gray-700 mb-2">Hugo retains:</p>

            <ul className="list-disc list-inside font-normal text-gray-700 mb-4 ml-4">
              <li>Artistic copyright</li>
              <li>Portfolio rights</li>
              <li>Rights to showcase the project publicly</li>
            </ul>

            <p className="font-normal text-gray-700 mb-6">
              No client may resell, redistribute, mint NFTs, or sublicense the artwork unless paid and approved in writing.
            </p>

            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">3. Pricing, Payments & Deposits</h2>

            <p className="font-normal text-gray-700 mb-4">
              All project quotes are provided based on project complexity, timeline, and deliverables.
            </p>

            <p className="font-normal text-gray-700 mb-4">A deposit may be required before work begins. Deposits are non-refundable.</p>

            <p className="font-normal text-gray-700 mb-4">Work will not begin until payment terms are agreed on.</p>

            <p className="font-normal text-gray-700 mb-4">Projects requiring urgent turnaround may incur a rush fee.</p>

            <p className="font-normal text-gray-700 mb-6">Final files are delivered only after full payment is completed.</p>

            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">4. Revisions</h2>

            <p className="font-normal text-gray-700 mb-4">Unless otherwise stated:</p>

            <p className="font-normal text-gray-700 mb-4">
              Projects include a set number of revisions defined in the project agreement.
            </p>

            <p className="font-normal text-gray-700 mb-4">Additional revisions or scope changes may incur extra charges.</p>

            <p className="font-normal text-gray-700 mb-6">
              Once a project is approved and delivered, further modifications are treated as a new project.
            </p>

            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">5. Refund Policy</h2>

            <p className="font-normal text-gray-700 mb-4">Due to the nature of creative work:</p>

            <p className="font-normal text-gray-700 mb-4">All payments are final.</p>

            <p className="font-normal text-gray-700 mb-4">No refunds are provided once work has begun.</p>

            <p className="font-normal text-gray-700 mb-4">Deposits are non-refundable.</p>

            <p className="font-normal text-gray-700 mb-6">
              If Hugo is unable to complete a project for any reason, a partial refund may be considered at Hugo's discretion.
            </p>

            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">6. Website Usage</h2>

            <p className="font-normal text-gray-700 mb-4">You agree not to:</p>

            <ul className="list-disc list-inside font-normal text-gray-700 mb-6 ml-4">
              <li>Copy or scrape any Content</li>
              <li>Reproduce or modify the site or its assets</li>
              <li>Use the website for illegal purposes</li>
              <li>Attempt to breach security or access restricted parts of the site</li>
            </ul>

            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">7. Privacy</h2>

            <p className="font-normal text-gray-700 mb-6">
              Any information provided via contact forms, emails, or inquiries will be used solely for communication and project-related purposes.
              We do not sell or share personal information with third parties.
            </p>

            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">8. External Links</h2>

            <p className="font-normal text-gray-700 mb-6">
              This website may include links to external websites.
              We are not responsible for the content, policies, or security of third-party sites.
            </p>

            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">9. Liability</h2>

            <p className="font-normal text-gray-700 mb-4">
              All Content on this site is provided for general informational/portfolio purposes.
            </p>
            <p className="font-normal text-gray-700 mb-2">Hugo is not liable for:</p>

            <ul className="list-disc list-inside font-normal text-gray-700 mb-6 ml-4">
              <li>Damages from website access</li>
              <li>Client misuse of artwork</li>
              <li>Losses stemming from external platforms or third-party tools</li>
            </ul>

            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">10. Modifications to Terms</h2>

            <p className="font-normal text-gray-700 mb-6">
              Hugo may update these Terms & Conditions at any time. Updated terms will be posted on this page with a revised "Last Updated" date.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

function CampaignCallPage() {
  const [availabilityErrors, setAvailabilityErrors] = useState(['', '', ''])
  const redirectUrl = useMemo(() => {
    if (typeof window === 'undefined') return '/commissions/thank-you'
    return `${window.location.origin}/commissions/thank-you`
  }, [])
  const formspreeEndpoint = 'https://formspree.io/f/xkovznna'

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const data = new FormData(form)

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json',
        },
      })

      if (response.ok) {
        window.location.href = redirectUrl
      } else {
        alert('Error: Could not submit form. Please try again.')
      }
    } catch (error) {
      alert('Error: Network problem. Please check your connection.')
    }
  }

  return (
    <>
      <PageHeader title="Commissions" isActive />
      <div className="max-w-2xl mx-auto px-4 md:px-0 mt-6 md:mt-10 pb-20">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-brandBlack mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Campaign Strategy Call Application
          </h1>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            Use this form for launches, drops, and rollout campaigns. Include your availability and we’ll follow up by email with next steps and a Google Meet link if aligned.
          </p>
          <p className="mt-2 text-xs text-gray-500" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            We review campaign applications before confirming a call.
          </p>
        </div>

        <form
          method="POST"
          action="https://formspree.io/f/xkovznna"
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8 space-y-6"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
        >
          <input type="hidden" name="_redirect" value={redirectUrl} />

          <div className="space-y-4">
            <div>
              <label className="block text-brandBlack mb-2">Full Name *</label>
              <input
                type="text"
                name="full_name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
              />
            </div>
            <div>
              <label className="block text-brandBlack mb-2">Email *</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
              />
              <p className="mt-1 text-xs text-gray-500">We’ll send the Google Meet link here.</p>
            </div>
            <div>
              <label className="block text-brandBlack mb-2">Brand / Artist / Agency Name *</label>
              <input
                type="text"
                name="brand_name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
              />
            </div>
            <div>
              <label className="block text-brandBlack mb-2">Website / Instagram Link</label>
              <input
                type="text"
                name="link"
                placeholder="@yourinstagram handle or www.yourbrand.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-brandBlack mb-2">What are you launching? *</label>
              <textarea
                name="launch_description"
                required
                placeholder="Briefly describe the product / release / campaign."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
              />
            </div>
            <div>
              <label className="block text-brandBlack mb-2">Target launch date or campaign window *</label>
              <input
                type="text"
                name="launch_window"
                required
                placeholder="e.g., Mar 10 -- Mar 24"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
              />
            </div>
            <div>
              <label className="block text-brandBlack mb-2">Budget range *</label>
              <input
                type="text"
                name="budget_range"
                required
                placeholder="e.g. $750 - $2,000 USD"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-brandBlack mb-2">Timezone *</label>
                <input
                  type="text"
                  name="timezone"
                  required
                  placeholder="AEDT, GMT+11, EST, PST"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-brandBlack mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Melbourne"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">Select 3 time windows where you’re available for a 20–30 minute call.</p>
            {[1, 2, 3].map((index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 bg-white">
                <p className="text-sm font-medium text-gray-700 mb-3">Preferred Time Window {index}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brandBlack mb-2 text-sm">Day *</label>
                    <select
                      name={`availability_${index}_day`}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-brandBlack focus:outline-none focus:border-[#c13333] bg-white"
                    >
                      <option value="" disabled>Select</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-brandBlack mb-2 text-sm">Time of day *</label>
                    <select
                      name={`availability_${index}_time_of_day`}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-brandBlack focus:outline-none focus:border-[#c13333] bg-white"
                    >
                      <option value="" disabled>Select</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-[#c13333] text-white font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            Submit Application
          </button>
          <p className="text-xs text-gray-500">
            If aligned, management will email you time confirmation and a Google Meet link.
          </p>
        </form>
      </div>
    </>
  )
}

function CampaignThankYouPage() {
  return (
    <>
      <PageHeader title="Commissions" isActive />
      <div className="max-w-2xl mx-auto px-4 md:px-0 mt-8 pb-20 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-brandBlack mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          Application received
        </h1>
        <p className="text-sm md:text-base text-gray-600" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
          Thanks — we’ll review your details and follow up by email with next steps if aligned.
        </p>
      </div>
    </>
  )
}

function InfoPage({ setCurrentPage }) {
  // Custom SVG Icons
  const iMessageIcon = () => (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  )

  const WhatsAppIcon = () => (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-4 pt-6 pb-8">
      {/* MAIN CARD */}
      <div className="bg-white w-full max-w-[360px] rounded-3xl shadow-xl overflow-hidden p-6 border border-gray-100">

        {/* PROFILE SECTION */}
        <div className="text-center">
          <img
            src="/extra_assets/anam_pfp.JPG"
            alt="Shei"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 grayscale"
          />
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700 }}>
            Shei
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            TALENT MANAGER
          </p>
        </div>

        {/* ACTION BUTTONS GRID */}
        <div className="w-full space-y-3 mt-6">

          {/* ROW 1: PHONE (Full Width) */}
          <a
            href="tel:+61483879841"
            className="flex items-center justify-start w-full h-14 px-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <Phone className="size-5 text-gray-700 mr-3" />
            <span className="font-medium text-gray-900">+61 483 879 841</span>
          </a>

          {/* ROW 2: SPLIT (iMessage + WhatsApp) */}
          <div className="flex flex-row gap-3">
            {/* LEFT: iMessage */}
            <a
              href="sms:+61483879841"
              className="flex-1 flex flex-col items-center justify-center h-14 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <div className="text-gray-700">
                {iMessageIcon()}
              </div>
              <span className="text-xs font-medium text-gray-900 mt-1">iMessage</span>
            </a>

            {/* RIGHT: WhatsApp */}
            <a
              href="https://wa.me/61483879841"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center h-14 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <div className="text-gray-700">
                {WhatsAppIcon()}
              </div>
              <span className="text-xs font-medium text-gray-900 mt-1">WhatsApp</span>
            </a>
          </div>

          {/* ROW 3: INSTAGRAM (Full Width) */}
          <a
            href="https://www.instagram.com/hugozbor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-start w-full h-14 px-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <Instagram className="size-5 text-gray-700 mr-3" />
            <span className="font-medium text-gray-900">Instagram</span>
          </a>

          {/* ROW 4: EMAIL (Full Width - Red Background) */}
          <a
            href="mailto:contact@hugozbor.com"
            className="flex items-center justify-start w-full h-14 px-4 bg-[#c13333] rounded-xl hover:opacity-90 transition-opacity"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <Mail className="size-5 text-white mr-3" />
            <span className="font-medium text-white">contact@hugozbor.com</span>
          </a>

        </div>

        {/* FOOTER */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            Melbourne, Australia
          </p>
          <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            © HUGO ZBOR 2026
          </p>
        </div>

      </div>
    </div>
  )
}

function AdminPage() {
  const adminPassword = 'Anamgtr@99'
  const [isAuthorized, setIsAuthorized] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem('admin-auth') === 'true'
  )
  const [passwordInput, setPasswordInput] = useState('')
  const [mediaType, setMediaType] = useState('video')
  const [selectedTags, setSelectedTags] = useState([])
  const [formState, setFormState] = useState({
    title: '',
    date: '',
    client: '',
    description: '',
    shareLink: '',
    embedLink: '',
  })
  const [statusMessage, setStatusMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) => (
      prev.includes(tag)
        ? prev.filter((item) => item !== tag)
        : [...prev, tag]
    ))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setStatusMessage('')

    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mediaType,
          title: formState.title,
          date: formState.date,
          client: formState.client,
          description: formState.description,
          shareLink: formState.shareLink,
          embedLink: formState.embedLink,
          tags: selectedTags,
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage || 'Failed to save entry.')
      }

      setStatusMessage('Saved locally.')
      setFormState({
        title: '',
        date: '',
        client: '',
        description: '',
        shareLink: '',
        embedLink: '',
      })
      setSelectedTags([])
    } catch (error) {
      setStatusMessage(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAuthSubmit = (event) => {
    event.preventDefault()
    if (passwordInput === adminPassword) {
      sessionStorage.setItem('admin-auth', 'true')
      setIsAuthorized(true)
      setPasswordInput('')
      setStatusMessage('')
    } else {
      setStatusMessage('Incorrect password.')
    }
  }

  return (
    <div className="w-full pb-20">
      <PageHeader title="Admin" isActive />
      <div className="max-w-4xl mx-auto px-4 md:px-0 mt-6 md:mt-10">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-brandBlack uppercase tracking-wide">
            Admin
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed" style={{ fontWeight: 400 }}>
            Add new work entries locally.
          </p>
        </div>

        {!isAuthorized ? (
          <form className="max-w-md space-y-4" onSubmit={handleAuthSubmit}>
            <div>
              <label className="block text-brandBlack mb-2" style={{ fontWeight: 400 }}>
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
                style={{ fontWeight: 400 }}
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-[#c13333] text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Enter
            </button>
            {statusMessage && (
              <p className="text-sm text-gray-500" style={{ fontWeight: 400 }}>
                {statusMessage}
              </p>
            )}
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-brandBlack mb-2" style={{ fontWeight: 400 }}>
                Media type
              </label>
              <select
                value={mediaType}
                onChange={(event) => setMediaType(event.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333] bg-white"
                style={{ fontWeight: 400 }}
              >
                <option value="video">Video</option>
                <option value="graphic">Graphic</option>
                <option value="website">Website</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-brandBlack mb-2" style={{ fontWeight: 400 }}>
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formState.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
                  style={{ fontWeight: 400 }}
                />
              </div>
              <div>
                <label className="block text-brandBlack mb-2" style={{ fontWeight: 400 }}>
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formState.date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
                  style={{ fontWeight: 400 }}
                />
              </div>
            </div>

            <div>
              <label className="block text-brandBlack mb-2" style={{ fontWeight: 400 }}>
                Client name
              </label>
              <input
                type="text"
                name="client"
                list="client-options"
                value={formState.client}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
                style={{ fontWeight: 400 }}
              />
              <datalist id="client-options">
                {selectedClients.map((client) => (
                  <option key={client.name} value={client.name} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-brandBlack mb-2" style={{ fontWeight: 400 }}>
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formState.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333] resize-y"
                style={{ fontWeight: 400 }}
              />
            </div>

            <div>
              <label className="block text-brandBlack mb-3" style={{ fontWeight: 400 }}>
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {TAG_OPTIONS.map((tag) => (
                  <label
                    key={tag}
                    className={`px-3 py-1 rounded-full border text-xs cursor-pointer transition-colors ${selectedTags.includes(tag)
                      ? 'bg-[#c13333] text-white border-[#c13333]'
                      : 'bg-white text-gray-600 border-gray-300'
                      }`}
                    style={{ fontWeight: 500 }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                      className="hidden"
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>

            {(mediaType === 'video' || mediaType === 'graphic') && (
              <>
                <div>
                  <label className="block text-brandBlack mb-2" style={{ fontWeight: 400 }}>
                    Link to share
                  </label>
                  <input
                    type="text"
                    name="shareLink"
                    value={formState.shareLink}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
                    style={{ fontWeight: 400 }}
                  />
                </div>
                <div>
                  <label className="block text-brandBlack mb-2" style={{ fontWeight: 400 }}>
                    Embedded link
                  </label>
                  <input
                    type="text"
                    name="embedLink"
                    value={formState.embedLink}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
                    style={{ fontWeight: 400 }}
                  />
                </div>
              </>
            )}

            {mediaType === 'website' && (
              <p className="text-sm text-gray-500" style={{ fontWeight: 400 }}>
                Website entries are not configured yet.
              </p>
            )}

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-[#c13333] text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save entry'}
            </button>
            {statusMessage && (
              <p className="text-sm text-gray-500" style={{ fontWeight: 400 }}>
                {statusMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

function App() {
  const parseUrl = () => {
    if (typeof window === 'undefined') {
      return { page: 'home', category: 'landing', itemId: null }
    }

    const path = window.location.pathname
    const parts = path.split('/').filter(Boolean)

    if (parts.length === 0) {
      return { page: 'home', category: 'landing', itemId: null }
    }

    const root = parts[0].toLowerCase()

    if (root === 'my-work') {
      const subCategory = (parts[1] || 'landing').toLowerCase()
      const itemId = parts[2] || null
      return { page: 'my-work', category: subCategory, itemId }
    }

    if (root === 'clients') {
      const subClient = (parts[1] || 'landing').toLowerCase()
      const itemId = parts[2] || null
      if (subClient === 'hugozbor') {
        return { page: 'clients', category: 'landing', itemId: null }
      }
      return { page: 'clients', category: subClient, itemId }
    }

    if (root === 'commissions') {
      const subCategory = parts[1] || null // For commissions, null means all sections closed
      if (subCategory === 'thank-you') {
        return { page: 'commissions', category: 'campaign-thank-you', itemId: null }
      }
      return { page: 'commissions', category: subCategory, itemId: null }
    }

    const allowedPages = new Set(['home', 'about', 'clients', 'contact', 'terms', 'info', 'admin'])
    if (allowedPages.has(root)) {
      return { page: root, category: 'landing', itemId: null }
    }

    return { page: 'home', category: 'landing', itemId: null }
  }

  const initialUrlState = parseUrl()
  const [currentPage, _setCurrentPage] = useState(initialUrlState.page)
  const [currentCategory, _setCurrentCategory] = useState(initialUrlState.category)
  const [currentItemId, _setCurrentItemId] = useState(initialUrlState.itemId)
  const [isLoading, setIsLoading] = useState(true)
  const [isRestrictedRegion, setIsRestrictedRegion] = useState(false)

  const setCurrentPage = (page, category = null, itemId = null) => {
    _setCurrentPage(page)

    let url = '/'
    let nextCategory = currentCategory
    let nextItemId = itemId || null

    if (page === 'home') {
      nextCategory = 'landing'
      _setCurrentCategory(nextCategory)
      _setCurrentItemId(null)
    } else if (page === 'my-work') {
      nextCategory = (category || currentCategory || 'landing').toLowerCase()
      _setCurrentCategory(nextCategory)
      nextItemId = itemId || null
      _setCurrentItemId(nextItemId)
      if (nextCategory === 'landing') {
        url = '/my-work'
      } else if (nextCategory === 'view-all') {
        url = '/my-work/view-all'
      } else {
        url = `/my-work/${nextCategory}`
      }
      if (nextItemId) {
        url += `/${nextItemId}`
      }
    } else if (page === 'clients') {
      nextCategory = (category || 'landing').toLowerCase()
      if (nextCategory === 'hugozbor') {
        nextCategory = 'landing'
      }
      _setCurrentCategory(nextCategory)
      nextItemId = itemId || null
      _setCurrentItemId(nextItemId)
      if (nextCategory === 'landing') {
        url = '/clients'
      } else {
        url = `/clients/${nextCategory}`
      }
      if (nextItemId) {
        url += `/${nextItemId}`
      }
    } else if (page === 'commissions') {
      nextCategory = category // For commissions, category can be null (all closed) or a section ID
      _setCurrentCategory(nextCategory)
      _setCurrentItemId(null)
      if (nextCategory) {
        url = nextCategory === 'campaign-thank-you'
          ? '/commissions/thank-you'
          : `/commissions/${nextCategory}`
      } else {
        url = '/commissions'
      }
    } else {
      nextCategory = 'landing'
      _setCurrentCategory(nextCategory)
      _setCurrentItemId(null)
      url = `/${page}`
    }

    if (page === 'home') {
      url = '/'
    }

    window.history.pushState({ page, category: nextCategory, itemId: nextItemId }, '', url)
    const closingOverlay = page === currentPage && currentCategory === nextCategory && currentItemId && !nextItemId
    if (!nextItemId && !closingOverlay) {
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    const handlePopState = () => {
      const { page, category, itemId } = parseUrl()
      _setCurrentPage(page)
      _setCurrentCategory(page === 'my-work' || page === 'clients' ? category : 'landing')
      _setCurrentItemId(page === 'my-work' || page === 'clients' ? itemId : null)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Preload heavy assets
  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    // 1. Define the heavy asset URL (The Mobile Banner)
    const heavyAssetUrl = "https://i.gyazo.com/1c95e37e4ccc3e66234262b1741f4e22.gif";

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
  }, [])

  // Check user's location for region-specific content
  useEffect(() => {
    // Check user's location via our Vercel API
    fetch('/api/geo')
      .then((res) => res.json())
      .then((data) => {
        console.log('User Location:', data.country); // For debugging

        // If user is in Indonesia (ID), mark as restricted
        if (data.country === 'ID') {
          setIsRestrictedRegion(true);
        }
      })
      .catch((err) => {
        console.error('Geo check failed, defaulting to global version.', err);
      });
  }, []);


  return (
    <>
      {/* Conditionally Render Loader */}
      {isLoading && <LoadingScreen />}

      {/* Main App Content (Hidden or rendered behind loader) */}
      <div className={`bg-white min-h-screen flex flex-col ${isLoading ? 'hidden' : ''}`}>
        {/* Header is now Global and Sticky */}
        <Header currentPage={currentPage} currentCategory={currentCategory} setCurrentPage={setCurrentPage} />

        <main className="flex-grow">
          {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} currentPage={currentPage} />}
          {currentPage === 'my-work' && currentCategory === 'graphics' && (
            <MyWorkCategoryPage category="graphics" setCurrentPage={setCurrentPage} currentPage={currentPage} currentItemId={currentItemId} isRestrictedRegion={isRestrictedRegion} />
          )}
          {currentPage === 'my-work' && currentCategory === 'personal-work' && (
            <MyWorkCategoryPage category="personal-work" setCurrentPage={setCurrentPage} currentPage={currentPage} currentItemId={currentItemId} isRestrictedRegion={isRestrictedRegion} />
          )}
          {currentPage === 'my-work' && currentCategory === 'videos' && (
            <MyWorkCategoryPage category="videos" setCurrentPage={setCurrentPage} currentPage={currentPage} currentItemId={currentItemId} isRestrictedRegion={isRestrictedRegion} />
          )}
          {currentPage === 'my-work' && currentCategory === 'websites' && (
            <MyWorkCategoryPage category="websites" setCurrentPage={setCurrentPage} currentPage={currentPage} currentItemId={currentItemId} isRestrictedRegion={isRestrictedRegion} />
          )}
          {currentPage === 'my-work' && currentCategory === 'view-all' && (
            <MyWorkCategoryPage category="view-all" setCurrentPage={setCurrentPage} currentPage={currentPage} currentItemId={currentItemId} isRestrictedRegion={isRestrictedRegion} />
          )}
          {currentPage === 'my-work' && currentCategory === 'landing' && (
            <MyWorkLandingPage setCurrentPage={setCurrentPage} currentPage={currentPage} />
          )}
          {currentPage === 'commissions' && currentCategory !== 'campaigncall' && currentCategory !== 'campaign-thank-you' && (
            <CommissionsPage
              activeSection={currentCategory}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
          {currentPage === 'commissions' && currentCategory === 'campaigncall' && <CampaignCallPage />}
          {currentPage === 'commissions' && currentCategory === 'campaign-thank-you' && <CampaignThankYouPage />}
          {currentPage === 'clients' && currentCategory === 'landing' && (
            <ClientsPage setCurrentPage={setCurrentPage} currentPage={currentPage} />
          )}
          {currentPage === 'clients' && currentCategory !== 'landing' && currentCategory !== 'hugozbor' && (
            <ClientWorkPage
              clientSlug={currentCategory}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              currentItemId={currentItemId}
              isRestrictedRegion={isRestrictedRegion}
            />
          )}
          {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} currentPage={currentPage} />}
          {currentPage === 'contact' && <ContactPage setCurrentPage={setCurrentPage} currentPage={currentPage} />}
          {currentPage === 'terms' && <TermsPage setCurrentPage={setCurrentPage} currentPage={currentPage} />}
          {currentPage === 'info' && <InfoPage setCurrentPage={setCurrentPage} />}
          {currentPage === 'admin' && <AdminPage />}
        </main>
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </>
  )
}

export default App
