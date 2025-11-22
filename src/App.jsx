import React, { useState, useEffect, useMemo } from 'react'
import { Instagram, Mail, X, ChevronDown, ChevronUp, Phone, MessageCircle, Copy, Menu, ChevronLeft, ChevronRight, Globe } from 'lucide-react'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

// Date parsing helper function
const parseDateString = (dateStr) => {
  if (!dateStr) return new Date(0); // Fallback for missing dates
  
  // 1. Remove ordinal suffixes (st, nd, rd, th) from the day
  // Example: "14th September 2025" -> "14 September 2025"
  const cleanDate = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
  
  // 2. Convert to standard Date object
  return new Date(cleanDate);
};

// Portfolio Data Structure
const graphicsPortfolio = [
  {
    id: 'graphic-1',
    title: 'COLLECTOR',
    category: ['graphics', 'view-all'],
    date: '7th June 2025',
    by: 'Hugo Zbor',
    description: 'Trading Card Graphics with CSGO taste',
    thumbnailUrl: '/Pictures/work8.jpg',
    fullImageUrl: '/Pictures/work8.jpg',
    instagramLink: 'https://www.instagram.com/p/DKj-UbtvXRs/?img_index=1',
  },
  {
    id: 'graphic-2',
    title: '99Clover magazine cover',
    category: ['graphics', 'view-all'],
    date: '9th September 2025',
    by: 'Hugo Zbor',
    description: 'Japanese style magazine cover for 99Clover',
    thumbnailUrl: '/Pictures/Mock Medium.jpeg',
    fullImageUrl: '/Pictures/Mock Medium.jpeg',
    instagramLink: 'https://www.instagram.com/p/DOYcmlRDxsE/?img_index=1',
  },
  {
    id: 'graphic-3',
    title: 'Let it rip',
    category: ['graphics', 'view-all'],
    date: '20th April 2025',
    by: 'Hugo Zbor',
    description: 'Bey Blade personal project',
    thumbnailUrl: '/Pictures/work3.jpg',
    fullImageUrl: '/Pictures/work3.jpg',
    instagramLink: 'https://www.instagram.com/p/DIqaE6BvY-X/?img_index=1',
  },
  {
    id: 'graphic-aformunseen-combined',
    title: 'aformunseen Campaign',
    category: ['graphics', 'view-all'],
    date: '14th September 2025',
    by: 'Hugo Zbor',
    description: 'Full campaign visuals including passport flyer and wallet flyer for @aformunseen.',
    slides: [
      '/Pictures/1.jpg', // passport flyer
      '/Pictures/2.jpg'  // wallet flyer
    ],
    thumbnailUrl: '/Pictures/1.jpg',
    instagramLink: 'https://www.instagram.com/p/DOlVYFWD8mU/?img_index=1',
  },
  {
    id: 'graphic-5',
    title: 'Hugo\'s Room',
    category: ['graphics', 'view-all'],
    date: '14th May 2025',
    by: 'Hugo Zbor',
    description: '3 month long personal project for @brutalimagery',
    thumbnailUrl: '/Pictures/work12.jpg',
    fullImageUrl: '/Pictures/work12.jpg',
    instagramLink: 'https://www.instagram.com/p/DJoZGzYPjXQ/?img_index=1',
  },
  {
    id: 'graphic-6',
    title: 'Nintendo Mii Album Cover',
    category: ['graphics', 'view-all'],
    date: '12th June 2025',
    by: 'Hugo Zbor',
    description: 'Album cover variation using Nintendo MII',
    thumbnailUrl: '/Pictures/Full V3.jpg',
    fullImageUrl: '/Pictures/Full V3.jpg',
    instagramLink: 'https://www.instagram.com/p/DKzMRiaPc9E/?img_index=1',
  },
  {
    id: 'graphic-7',
    title: '99Clover poster',
    category: ['graphics', 'view-all'],
    date: '21st June 2025',
    by: 'Hugo Zbor',
    description: 'Graphic poster for 99Clover',
    thumbnailUrl: '/Pictures/work5.jpg',
    fullImageUrl: '/Pictures/work5.jpg',
    instagramLink: 'https://www.instagram.com/p/DLKhaWVPlaw/?img_index=1',
  },
  {
    id: 'graphic-8',
    title: 'VOL #99 TIME CAPSULE',
    category: ['graphics', 'view-all'],
    date: '3rd July 2025',
    by: 'Hugo Zbor',
    description: 'Part of the \'TIME CAPSULE\' Collection of 99Clover',
    thumbnailUrl: '/Pictures/work2.jpg',
    fullImageUrl: '/Pictures/work2.jpg',
    instagramLink: 'https://www.instagram.com/p/DLpJzJDys0D/?img_index=1',
  },
  {
    id: 'graphic-9',
    title: 'Magazine cover for CASHMIIER Habits',
    category: ['graphics', 'view-all'],
    date: '7th July 2025',
    by: 'Hugo Zbor',
    description: 'Japanese magainze flyer done for @CASHMIIERHABITS',
    thumbnailUrl: '/Pictures/final v2.jpg',
    fullImageUrl: '/Pictures/final v2.jpg',
    instagramLink: 'https://www.instagram.com/hugozbor/',
  },
  {
    id: 'graphic-10',
    title: 'Hugo\'s DJ Set',
    category: ['graphics', 'view-all'],
    date: '11th July 2025',
    by: 'Hugo Zbor',
    description: 'A graphic for a personal project',
    thumbnailUrl: '/Pictures/work11.jpg',
    fullImageUrl: '/Pictures/work11.jpg',
    instagramLink: 'https://www.instagram.com/p/DL7o7ADvyvs/?img_index=1',
  },
  {
    id: 'graphic-11',
    title: 'BWR2025',
    category: ['graphics', 'view-all'],
    date: '4th June 2025',
    by: 'Hugo Zbor',
    description: 'Cover graphic for @brutalimagery',
    thumbnailUrl: '/Pictures/work4.jpg',
    fullImageUrl: '/Pictures/work4.jpg',
    instagramLink: 'https://www.instagram.com/p/DKeiNEWP1cG/?img_index=1',
  },
  {
    id: 'graphic-13',
    title: 'Character Select',
    category: ['graphics', 'view-all'],
    date: '21st June 2025',
    by: 'Hugo Zbor',
    description: 'In-game clothing select graphic for 99Clover',
    thumbnailUrl: '/Pictures/work7.jpg',
    fullImageUrl: '/Pictures/work7.jpg',
    instagramLink: 'https://www.instagram.com/p/DLKhaWVPlaw/?img_index=5',
  },
  {
    id: 'graphic-14',
    title: 'CD Album Cover',
    category: ['graphics', 'view-all'],
    date: '27th May 2025',
    by: 'Hugo Zbor',
    description: 'CD Album Cover variation for comissions',
    thumbnailUrl: '/Pictures/work9.jpg',
    fullImageUrl: '/Pictures/work9.jpg',
    instagramLink: 'https://www.instagram.com/p/DHs6JdzvYLm/?img_index=1',
  },
]

// Sort Graphics: Newest (b) to Oldest (a)
graphicsPortfolio.sort((a, b) => {
  return parseDateString(b.date) - parseDateString(a.date);
});

// Video Portfolio Data Structure
const videoPortfolio = [
  {
    id: 'video-brainwash',
    title: 'BRAINWASH',
    date: '18th November 2025',
    description: '',
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/trcAZwylfcQ/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/trcAZwylfcQ?modestbranding=1&rel=0&iv_load_policy=3&color=white',
  },
  {
    id: 'video-character',
    title: 'CHARACTER CUSTOMISATION',
    date: '17th August 2025',
    description: '',
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/7uS8SP67Exg/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/7uS8SP67Exg?modestbranding=1&rel=0&iv_load_policy=3&color=white',
  },
  {
    id: 'video-omnee',
    title: 'HUGOZBOR for OMNEE WORLD',
    date: '24th October 2025',
    description: '',
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/eTzvPmUzJ6E/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/eTzvPmUzJ6E?modestbranding=1&rel=0&iv_load_policy=3&color=white',
  },
  {
    id: 'video-lovenangels',
    title: 'HUGOZBOR for LOVENANGELS',
    date: '25th October 2025',
    description: '',
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/Qziv5xrXTgc/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/Qziv5xrXTgc?modestbranding=1&rel=0&iv_load_policy=3&color=white',
  },
  {
    id: 'video-99clover',
    title: 'Hugozbor for 99Clover U.S.S Promo',
    date: '4th November 2025',
    description: '',
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/GLyH_Vveiik/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/GLyH_Vveiik?modestbranding=1&rel=0&iv_load_policy=3&color=white',
  },
  {
    id: 'video-ds',
    title: 'DS Intro',
    date: '3rd December 2024',
    description: '',
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/dJgwioZ2I4E/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/dJgwioZ2I4E?modestbranding=1&rel=0&iv_load_policy=3&color=white',
  },
  {
    id: 'video-runway',
    title: 'RUNWAY Visuals',
    date: '12th September 2025',
    description: '',
    category: ['videos', 'view-all'],
    thumbnailUrl: 'https://img.youtube.com/vi/yeudVooMwSM/maxresdefault.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/yeudVooMwSM?modestbranding=1&rel=0&iv_load_policy=3&color=white',
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
    category: ['websites', 'view-all'],
    by: 'Hugo Zbor',
    date: '2025',
    thumbnailUrl: 'https://i.gyazo.com/8bdac84d59e63c4ccadb28bde0df117d.gif',
    websiteUrl: 'https://ryansimarchive.com',
    embedHtml: `<img src="https://i.gyazo.com/8bdac84d59e63c4ccadb28bde0df117d.gif" alt="Ryan Sim Archive" style="width:100%; height:auto;" />`,
  },
  {
    id: 'web-2',
    title: 'hz-archive.vercel.app',
    category: ['websites', 'view-all'],
    by: 'Hugo Zbor',
    date: '2025',
    thumbnailUrl: 'https://i.gyazo.com/73873edb9b88b05a28964c7b3c288566.gif',
    websiteUrl: 'https://hz-archive.vercel.app/',
    embedHtml: `<img src="https://i.gyazo.com/73873edb9b88b05a28964c7b3c288566.gif" alt="HZ Archive" style="width:100%; height:auto;" />`,
  },
]

// Master Portfolio List (combines graphics and videos)
const allPortfolioItems = [...graphicsPortfolio, ...videoPortfolio, ...websitePortfolio]
const shuffleArray = (array) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// --- Asset Variables for Commissions Page ---
// 1. IMAGE PATHS
const visualArtImg = "/Pictures/work2.jpg"
const creativeDirectionImg = "/assets_comission_page/creative_direction.png"

// 2. VIDEO HTML (from video_visuals.txt)
const videoVisualsHtml = `<a href="https://gyazo.com/22e0b339f1a8815b6c8e1fb42eecd2c7"><img src="https://i.gyazo.com/22e0b339f1a8815b6c8e1fb42eecd2c7.gif" alt="Image from Gyazo" width="596"/></a>`
const homeHeroVisual = `<a href="https://gyazo.com/22e0b339f1a8815b6c8e1fb42eecd2c7"><img src="https://i.gyazo.com/22e0b339f1a8815b6c8e1fb42eecd2c7.gif" alt="Image from Gyazo" width="596"/></a>`
const homeHeroVisualMiddle = `<a href="https://gyazo.com/75685a544745afa2a314cf0c78ab4532"><img src="https://i.gyazo.com/75685a544745afa2a314cf0c78ab4532.gif" alt="Raw Footage to Real Life" style="width: 100%; height: auto;" /></a>`
const homeHeroVisual2 = `<a href="https://gyazo.com/db5a51e28dcee28c3827b07284262632"><img src="https://i.gyazo.com/db5a51e28dcee28c3827b07284262632.gif" alt="Image from Gyazo" style="width: 100%; height: auto;" /></a>`

// 3. WEB DESIGN HTML (from web_design.txt)
const webDesignHtml = `<a href="https://gyazo.com/8bdac84d59e63c4ccadb28bde0df117d"><img src="https://i.gyazo.com/8bdac84d59e63c4ccadb28bde0df117d.gif" alt="Image from Gyazo" width="600"/></a><a href="https://gyazo.com/e660702e8f799446cf3f52cbd75e7835"><img src="https://i.gyazo.com/e660702e8f799446cf3f52cbd75e7835.gif" alt="Image from Gyazo" width="600"/></a>`

// --- End Asset Variables ---

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
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
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
        <div className="flex flex-col items-center md:items-center">
          <img 
            src="/logo.png" 
            alt="Hugo Zbor Logo" 
            className="h-10 w-auto md:h-16"
          />
        </div>

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
              onClick={() => setCurrentPage('my-work', 'graphics')}
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
                    setCurrentPage('my-work', 'graphics')
                    setShowMyWorkDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 font-medium text-lg hover:bg-gray-50 ${
                    currentPage === 'my-work' && currentCategory === 'graphics'
                      ? 'text-[#c13333]'
                      : 'text-brandBlack'
                  }`}
                >
                  Graphics
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('my-work', 'videos')
                    setShowMyWorkDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 font-medium text-lg hover:bg-gray-50 ${
                    currentPage === 'my-work' && currentCategory === 'videos'
                      ? 'text-[#c13333]'
                      : 'text-brandBlack'
                  }`}
                >
                  Videos
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('my-work', 'websites')
                    setShowMyWorkDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 font-medium text-lg hover:bg-gray-50 ${
                    currentPage === 'my-work' && currentCategory === 'websites'
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
                  className={`w-full text-left px-4 py-2 font-medium text-lg hover:bg-gray-50 ${
                    currentPage === 'my-work' && currentCategory === 'view-all'
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
              setCurrentPage('my-work', 'graphics')
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
  return (
    <>
      {/* Mobile-only Page Title */}
      <PageHeader title="HOME" showBack={false} isActive={currentPage === 'home'} />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-6 md:mt-20 mb-20">
        
        {/* ================= SECTION 1: OMNEE WORLD (Graphic Left, Text Right) ================= */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 uppercase leading-none tracking-tight mb-12 md:mb-16">
          Creating Next Level <br className="hidden md:block" />
          Digital Products
        </h1>

        <div className="flex flex-col md:flex-row items-start md:space-x-12 lg:space-x-20">
          {/* GRAPHIC COL (Left on Desktop, Top on Mobile) */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 order-1 md:order-1">
            <div
              className="w-full rounded-none md:rounded-sm overflow-hidden shadow-sm transition-all duration-500 pointer-events-none"
              dangerouslySetInnerHTML={{ __html: homeHeroVisual }}
            />
          </div>

          {/* TEXT COL (Right on Desktop, Bottom on Mobile) */}
          <div className="w-full md:w-1/2 flex flex-col justify-center pt-2 md:pt-4 order-2 md:order-2">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase mb-6 leading-snug">
              Hugozbor for <br />
              Omnee World
            </h2>
            <p className="text-sm md:text-base font-normal text-gray-600 leading-relaxed max-w-md mb-8">
              Hugo Zbor is an artist combining creativity with strategy to craft unforgettable online experiences. He helps elevate brands and define their digital presence.
            </p>
            <button
              onClick={() => setCurrentPage('my-work', 'view-all')}
              className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 self-start hover:text-gray-600 hover:border-gray-600 transition-colors"
            >
              See More
            </button>
          </div>
        </div>

        {/* ================= SECTION 2: RAW FOOTAGE (Text Left, Graphic Right) ================= */}
        <div className="mt-12 md:mt-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 uppercase leading-none tracking-tight mb-12 md:mb-16 text-center">
            Raw Footage To <br className="hidden md:block" />
            Real-Life
          </h1>

          <div className="flex flex-col md:flex-row items-start md:space-x-12 lg:space-x-20">
            
            {/* TEXT COL (Left on Desktop, Bottom on Mobile) */}
            <div className="w-full md:w-5/12 flex flex-col justify-center pt-2 md:pt-4 order-2 md:order-1">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase mb-6 leading-snug">
                Hugozbor For <br />
                Matte Black Dept
              </h2>
              <p className="text-sm md:text-base font-normal text-gray-600 leading-relaxed max-w-md mb-8">
                We pride ourselves on flexibility. Whether you have rough raw footage or just a fleeting idea, we can take it and transform it into your exact vision. No constraints, just creative problem solving to get the look you need.
              </p>
              <button
                onClick={() => setCurrentPage('my-work')}
                className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 self-start hover:text-gray-600 hover:border-gray-600 transition-colors"
              >
                See More
              </button>
            </div>

            {/* GRAPHIC COL (Right on Desktop, Top on Mobile) */}
            <div className="w-full md:w-7/12 mb-8 md:mb-0 order-1 md:order-2">
              <div 
                className="w-full rounded-none md:rounded-sm overflow-hidden shadow-sm transition-all duration-500 pointer-events-none"
                dangerouslySetInnerHTML={{ __html: homeHeroVisualMiddle }}
              />
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: LOVENANGELS (Graphic Left, Text Right) ================= */}
        <div className="mt-12 md:mt-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 uppercase leading-none tracking-tight mb-12 md:mb-16 text-right">
            A Collective of <br className="hidden md:block" />
            Visionaries
          </h1>

          <div className="flex flex-col md:flex-row items-start md:space-x-12 lg:space-x-20">
            
            {/* GRAPHIC COL (Left on Desktop, Top on Mobile) */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 order-1 md:order-1">
              <div 
                className="w-full rounded-none md:rounded-sm overflow-hidden shadow-sm transition-all duration-500 pointer-events-none"
                dangerouslySetInnerHTML={{ __html: homeHeroVisual2 }}
              />
            </div>

            {/* TEXT COL (Right on Desktop, Bottom on Mobile) */}
            <div className="w-full md:w-1/2 flex flex-col justify-center pt-2 md:pt-4 order-2 md:order-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase mb-6 leading-snug">
                Hugozbor For <br />
                Lovenangels
              </h2>
              <p className="text-sm md:text-base font-normal text-gray-600 leading-relaxed max-w-md mb-8">
                Hugo works with a network of diverse artists, ranging from 3D visual experts to high-quality rendering specialists. Together, they combine talents to build comprehensive, high-fidelity digital worlds.
              </p>
              <button 
                onClick={() => setCurrentPage('my-work')}
                className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 self-start hover:text-gray-600 hover:border-gray-600 transition-colors"
              >
                See More
              </button>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

// My Work Landing Page - Three boxes layout (no subheadings)
function MyWorkLandingPage({ setCurrentPage, currentPage }) {
  return (
    <>
      <PageHeader title="My work" isActive={currentPage === 'my-work'} />
      <div className="max-w-7xl mx-auto px-4 md:px-0 mt-4 md:mt-8">
      <div className="flex flex-col items-center gap-8 md:gap-12">
        {/* Top Row: Graphics and Videos */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full">
          {/* Graphics Box - Left */}
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
          
          {/* Videos Box - Right */}
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
function WorkOverlay({ item, onClose, setCurrentPage }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  return (
    <div 
      className="fixed inset-0 bg-white/30 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Main Modal Box */}
      <div 
        className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row"
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
          {item.videoEmbedUrl ? (
            // RENDER VIDEO
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
            // RENDER HTML EMBED (For Websites/Gyazo)
            <div 
              className="w-full h-full flex items-center justify-center bg-gray-50 p-4 md:p-8 pointer-events-none"
              dangerouslySetInnerHTML={{ __html: item.embedHtml }}
            />
          ) : (
            // RENDER IMAGE (with carousel support)
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
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          index === currentSlideIndex ? 'bg-white' : 'bg-white/50'
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
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>{item.title}</h2>
            
            {/* Date */}
            <p className="text-sm text-gray-500 mt-1 mb-4">{item.date}</p>
            
            {/* Description */}
            <p className="text-base font-normal text-gray-800 leading-relaxed mb-6">{item.description}</p>
            
            {/* Action Bar - Split Layout */}
            <div className="mt-8 flex items-center justify-between">
              
              {/* LEFT: External Link (Instagram OR Website) */}
              <div className="flex gap-4">
                
                {/* A. Instagram Button */}
                {item.instagramLink && (
                  <a 
                    href={item.instagramLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-pink-100 hover:text-pink-600 transition-colors"
                    title="View on Instagram"
                  >
                    <Instagram className="size-8" />
                  </a>
                )}

                {/* B. Website Button (NEW) */}
                {item.websiteUrl && (
                  <a 
                    href={item.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <Globe className="size-5" />
                    <span className="font-medium">View Website</span>
                  </a>
                )}
              </div>

              {/* RIGHT: CTA (Keep Existing) */}
              <button 
                onClick={() => {
                  onClose(); 
                  setCurrentPage('contact'); 
                }}
                className="px-8 py-3 bg-[#c13333] text-white font-medium rounded-md hover:bg-red-700 transition-colors text-lg"
              >
                Work With Hugo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Category pages with sub-navigation
function MyWorkCategoryPage({ category, setCurrentPage, currentPage, currentItemId }) {
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
              const isExternal = !!item.websiteUrl
              const isVideo = item.category.includes('videos')
              const isWebsite = item.category.includes('websites')
              const internalCardClasses = 'group bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-105 p-2 md:p-6 rounded-lg w-full'

              let imageStyles = "w-full rounded-lg shadow-sm block"
              if (item.category.includes('graphics')) {
                imageStyles += " h-auto object-contain"
              } else if (item.category.includes('videos')) {
                imageStyles += " aspect-[5/4] object-cover"
              } else if (item.category.includes('websites')) {
                imageStyles += " aspect-video object-cover"
              }

              if (isExternal) {
                const cardClasses = 'group bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-105 p-0 rounded-lg w-full'
                return (
                  <a
                    key={item.id}
                    href={item.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClasses}
                  >
                    <img 
                      src={item.thumbnailUrl} 
                      alt={item.title} 
                      className={imageStyles}
                    />
                    <div className="mt-3 text-left">
                      <h3 className="text-[10px] md:text-sm font-bold text-gray-900 uppercase tracking-wide leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[9px] md:text-xs text-gray-500 mt-1 font-medium">
                        {item.date}
                      </p>
                    </div>
                  </a>
                )
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage('my-work', category, item.id)}
                  className={internalCardClasses}
                >
                  {item.slides && item.slides.length > 1 ? (
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
  const categoryNames = {
    'graphics': 'Graphics',
    'videos': 'Videos',
    'websites': 'Websites',
    'view-all': 'View all'
  }

  const displayedItems = useMemo(() => {
    if (category !== 'view-all') {
      return allPortfolioItems.filter(item => item.category.includes(category))
    }
    return shuffleArray(allPortfolioItems)
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
          onClick={() => setCurrentPage('my-work', 'graphics')}
          className={
            category === 'graphics'
              ? 'font-medium text-sm md:text-lg text-[#c13333]'
              : 'font-medium text-sm md:text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
          }
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          GRAPHICS
        </button>
        <button
          onClick={() => setCurrentPage('my-work', 'videos')}
          className={
            category === 'videos'
              ? 'font-medium text-sm md:text-lg text-[#c13333]'
              : 'font-medium text-sm md:text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
          }
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          VIDEOS
        </button>
        <button
          onClick={() => setCurrentPage('my-work', 'websites')}
          className={
            category === 'websites'
              ? 'font-medium text-sm md:text-lg text-[#c13333]'
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
              ? 'font-medium text-sm md:text-lg text-[#c13333]'
              : 'font-medium text-sm md:text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
          }
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          VIEW ALL
        </button>
      </nav>

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
            {renderMasonryGrid(2)}
          </div>

          {/* Desktop View (3 Columns) */}
          <div className="hidden md:block mt-8 px-0">
            {renderMasonryGrid(3)}
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
              <div className="bg-[#b0c4de] p-2 text-center font-bold font-serif text-lg mb-1">Hugo Zbor</div>
              
              <img src="/2015_05_20/IMG_1120.JPG" alt="Profile" className="w-full h-auto border border-[#a2a9b1] mb-2" />
              
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
                    <td className={styles.infoboxCell + " " + styles.infoboxLabel}>Education</td>
                    <td className={styles.infoboxCell}><a href="https://en.wikipedia.org/wiki/University_of_Melbourne" target="_blank" rel="noopener noreferrer" className={styles.link}>University of Melbourne</a></td>
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
              </ul>
            </div>

            {/* SECTION 1 */}
            <div id="design" className={styles.header}>
              <h2>Introduction to Design</h2>
              <span className="text-xs text-[#c13333] font-sans font-normal hidden sm:inline">[<button onClick={() => setCurrentPage('contact')} className="hover:underline">edit</button>]</span>
            </div>
            
            {/* Image: Floated right on all screens, smaller on mobile */}
            <div className="border border-[#c8ccd1] bg-[#f8f9fa] p-1 mb-2 float-right ml-3 w-24 md:w-48">
               <img src="/2015_05_20/IMG_1118.JPG" alt="Fifth Grade" className="w-full h-auto mb-1"/>
               <div className="p-1 text-[10px] md:text-xs text-gray-600 leading-tight">Hugo in the fifth grade discovering <span className={styles.link}>Photoshop</span>.</div>
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
                 src="/2015_05_20/IMG_1121.JPG"
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

            {/* FLOATED IMAGE CONTAINER */}
            <div className="border border-[#c8ccd1] bg-[#f8f9fa] p-1 mb-2 ml-4 float-right w-32 md:w-48">
               {/* Image */}
               <img 
                 src="/2015_05_20/IMG_1123.JPG"
                 alt="Student ID" 
                 className="w-full h-auto mb-1"
               />
               {/* Caption */}
               <div className="p-1 text-[10px] md:text-xs text-gray-600 leading-tight">
                 Hugo's student ID in 2023
               </div>
            </div>

            <p className="mb-4 font-normal">I moved to <a href="https://en.wikipedia.org/wiki/Australia" target="_blank" rel="noopener noreferrer" className={styles.link}>Australia</a>, in 2022, to study <a href="https://en.wikipedia.org/wiki/Unemployment" target="_blank" rel="noopener noreferrer" className={styles.link}>computer science</a> and I kept running the brand (remotely) while attempting to balance it with studying. I noticed my love for design was fading and feeling like a chore. I would always rush and design quickly, because I wanted to get it out of the way.</p>
            
            <p className="mb-4 font-normal">Mid-2024, I stumbled across a <a href="https://en.wikipedia.org/wiki/Music_video" target="_blank" rel="noopener noreferrer" className={styles.link}>music video</a> that was so refreshingly creative, it inspired me to start designing again. I started pushing myself out of my comfort zone and trying new things, finally learning again after such a long time. Around this time, I finally started to enjoy studying <a href="https://en.wikipedia.org/wiki/Unemployment" target="_blank" rel="noopener noreferrer" className={styles.link}>computer science</a>, and I began incorporating my graphic design skills into coding projects.</p>
            
            <p className="mb-4 font-normal">In February, 2025, I started posting more on a new design account I made (<a href="https://www.instagram.com/hugozbor" target="_blank" rel="noopener noreferrer" className={styles.link}>@hugozbor</a> on <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Instagram</a>). My art was met with overwhelming support and I've even been contacted by designers that inspired me in the past. I am extremely grateful and I believe I am now growing - as an artist - faster than ever before.</p>

          </div>
        </div>
      </div>
    </div>
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
            Commissions
          </h1>
          <p className="text-sm md:text-base font-normal text-gray-600 leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Explore the full range of creative services offered by Hugo Zbor. Each project is custom-built to your vision.
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-0">
          <AccordionItem
            title="Visual Art & Graphic Design"
            isOpen={activeSection === 'visual-art'}
            onToggle={() => handleToggle('visual-art')}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
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
              </div>
              <div className="w-full md:w-80 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                <img 
                  src={visualArtImg} 
                  alt="Visual Art Example"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Video & Motion Visuals"
            isOpen={activeSection === 'video-motion'}
            onToggle={() => handleToggle('video-motion')}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="mb-3" style={{ fontWeight: 400 }}>High-level creative video work, including:</p>
                <ul className="list-disc list-inside space-y-1 ml-4" style={{ fontWeight: 400 }}>
                  <li>Visual loops (10–30s)</li>
                  <li>Green screen edits</li>
                  <li>3D/Blender-enhanced motion visuals</li>
                  <li>Music promo visuals</li>
                  <li>Video composites and FX</li>
                  <li>Motion graphics</li>
                  <li>Animated assets</li>
                </ul>
                <p className="mt-3" style={{ fontWeight: 400 }}>Designed for music promotion, product launches, and brand campaigns.</p>
              </div>
              <div className="w-full md:w-80 flex-shrink-0">
                <div 
                  className="rounded-lg overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: videoVisualsHtml }} 
                />
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Creative Direction & Consulting"
            isOpen={activeSection === 'creative-direction'}
            onToggle={() => handleToggle('creative-direction')}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
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
              <div className="w-full md:w-80 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                <img 
                  src={creativeDirectionImg}
                  alt="Creative Direction Example"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Web Design & Digital Experience"
            isOpen={activeSection === 'web-design'}
            onToggle={() => handleToggle('web-design')}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
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
              </div>
              <div 
                className="w-full md:w-80 flex-shrink-0 rounded-lg overflow-hidden shadow-md"
                dangerouslySetInnerHTML={{ __html: webDesignHtml }} 
              />
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
              <li>TikTok / Reels edits</li>
              <li>Promo materials</li>
              <li>Mixed-media posts</li>
              <li>Creative storytelling assets</li>
            </ul>
            <p className="mt-3" style={{ fontWeight: 400 }}>Made for building strong and consistent online presence.</p>
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
            Start a Commission
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
    </>
  )
}

// Contact Page Component
function ContactPage({ setCurrentPage, currentPage }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [services, setServices] = useState({
    graphics: false,
    video: false,
    webdesign: false,
    creativeDirection: false,
    fullService: false,
    notSure: false
  })
  const [detailsPlaceholder, setDetailsPlaceholder] = useState("What's the goal? Who's the audience? Any links to references?")

  const placeholderPrompts = {
    default: "What's the goal? Who's the audience? Any links to references?",
    graphics: "What kind of graphics (e.g., poster, cover art)? What's the style or mood? Any specific text to include?",
    video: "How long is the final video? What's the style (e.g., cinematic, vlog, promo)? Do you have the raw footage?",
    webdesign: "What's the purpose of the site (e.g., portfolio, e-commerce)? Do you have a brand guide? Any example sites you like?",
    creativeDirection: "What's the overall project? What's the main message or feeling you want to convey? What are the key deliverables?",
    fullService: "This is a full project! Please describe the overall vision, goals, and any known components (e.g., branding, video, web).",
    notSure: "No problem! Please describe your idea or problem, and we can figure out the best approach together."
  }

  useEffect(() => {
    // 1. Get all keys that are 'true' (checked)
    const checkedServices = Object.keys(services).filter(key => services[key])
    
    // 2. Apply logic
    if (checkedServices.length === 1) {
      // If exactly ONE is checked, show its specific prompt
      const selectedKey = checkedServices[0]
      setDetailsPlaceholder(placeholderPrompts[selectedKey])
    } else {
      // If ZERO or MULTIPLE are checked, show the default
      setDetailsPlaceholder(placeholderPrompts.default)
    }
  }, [services])

  const handleServiceChange = (e) => {
    const { name, checked } = e.target
    
    // We map the Formspree 'name' attribute to our state key
    const stateKeyMap = {
      'service_graphics': 'graphics',
      'service_video': 'video',
      'service_webdesign': 'webdesign',
      'service_creative_direction': 'creativeDirection',
      'service_full_project': 'fullService',
      'service_not_sure': 'notSure'
    }
    
    const stateKey = stateKeyMap[name]
    if (stateKey) {
      setServices(prev => ({
        ...prev,
        [stateKey]: checked
      }))
    }
  }

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
      <p className="text-sm md:text-base font-normal text-gray-600 leading-relaxed mb-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        Have a project in mind or just want to say hi? I'd love to hear about it. Fill out the form below and I'll get back to you within 1-2 business days.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
        {/* Row 1: Name & Email */}
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
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
            />
          </div>
        </div>

        {/* Row 2: Service Checkboxes */}
        <div>
          <label className="block text-brandBlack mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            What service(s) are you looking for?*
          </label>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              <input 
                type="checkbox" 
                name="service_graphics" 
                value="true" 
                checked={services.graphics}
                onChange={handleServiceChange}
                className="mr-2" 
              />
              <span className="text-brandBlack" style={{ fontWeight: 400 }}>Graphics (Poster, Cover Art, Flyer, etc)</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              <input 
                type="checkbox" 
                name="service_video" 
                value="true" 
                checked={services.video}
                onChange={handleServiceChange}
                className="mr-2" 
              />
              <span className="text-brandBlack" style={{ fontWeight: 400 }}>Video Editing / Motion Graphics</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              <input 
                type="checkbox" 
                name="service_webdesign" 
                value="true" 
                checked={services.webdesign}
                onChange={handleServiceChange}
                className="mr-2" 
              />
              <span className="text-brandBlack" style={{ fontWeight: 400 }}>Webdesign</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              <input 
                type="checkbox" 
                name="service_creative_direction" 
                value="true" 
                checked={services.creativeDirection}
                onChange={handleServiceChange}
                className="mr-2" 
              />
              <span className="text-brandBlack" style={{ fontWeight: 400 }}>Creative Direction / Strategy</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              <input 
                type="checkbox" 
                name="service_full_project" 
                value="true" 
                checked={services.fullService}
                onChange={handleServiceChange}
                className="mr-2" 
              />
              <span className="text-brandBlack" style={{ fontWeight: 400 }}>Bit of Everything (Full-Service Project)</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              <input 
                type="checkbox" 
                name="service_not_sure" 
                value="true" 
                checked={services.notSure}
                onChange={handleServiceChange}
                className="mr-2" 
              />
              <span className="text-brandBlack" style={{ fontWeight: 400 }}>Not Sure Yet</span>
            </label>
          </div>
        </div>

        {/* Row 3: Text Area */}
        <div>
          <label className="block text-brandBlack mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            Tell me more about your project*
          </label>
          <textarea
            name="project_details"
            required
            rows={6}
            placeholder={detailsPlaceholder}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333] resize-vertical"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
          />
        </div>

        {/* Row 4: Budget */}
        <div>
          <label className="block text-brandBlack mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            What's your estimated budget?*
          </label>
          <input
            type="text"
            name="budget"
            required
            placeholder="e.g. $750 - $1500 USD etc"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
          />
        </div>

        {/* Row 5: Timeline */}
        <div>
          <label className="block text-brandBlack mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            Ideal Project Timeline?*
          </label>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              <input type="checkbox" name="timeline" value="Urgent (< 2 weeks)" className="mr-2" />
              <span className="text-brandBlack" style={{ fontWeight: 400 }}>Urgent (&lt; 2 weeks)</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              <input type="checkbox" name="timeline" value="Standard (2-3 weeks)" className="mr-2" />
              <span className="text-brandBlack" style={{ fontWeight: 400 }}>Standard (2-3 weeks)</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              <input type="checkbox" name="timeline" value="Flexible (1-2 months)" className="mr-2" />
              <span className="text-brandBlack" style={{ fontWeight: 400 }}>Flexible (1-2 months)</span>
            </label>
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

function InfoPage({ setCurrentPage }) {
  const phoneNumber = "+61 483 879 841"
  const email = "contact@hugozbor.com"
  
  const copyToClipboard = (text) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text)
      alert("Copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* CARD CONTAINER */}
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* 1. PROFILE IMAGE (Full width top or large circle) */}
        <div className="w-full aspect-square relative overflow-hidden">
           <img 
             src="/Pictures/info_page_2.png" 
             alt="Shei" 
             className="w-full h-full object-cover object-left"
           />
        </div>

        {/* 2. DETAILS SECTION */}
        <div className="p-8 text-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontWeight: 700 }}>Shei</h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest mt-1 mb-6" style={{ fontWeight: 400 }}>
            Talent Manager
          </p>

          {/* 3. ACTION BUTTONS (Stacked & Aligned) */}
          <div className="w-full space-y-3 mt-6">
            
            {/* PHONE ROW (Display + Call Action) */}
            <a 
              href="tel:+61483879841"
              className="flex items-center justify-start w-full p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-colors group"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <div className="bg-gray-900 text-white p-2 rounded-md group-hover:scale-105 transition-transform">
                <Phone className="size-5" />
              </div>
              <span className="ml-3 font-medium text-gray-900">{phoneNumber}</span>
            </a>
            
            {/* WHATSAPP BUTTON (Green) */}
            <a 
              href="https://wa.me/61483879841"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start w-full p-3 bg-[#25D366] text-white rounded-xl shadow-sm hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 500 }}
            >
              <MessageCircle className="size-6" />
              <span className="ml-3 font-bold">WhatsApp</span>
            </a>
            
            {/* EMAIL BUTTON (Copy Action) */}
            <button 
              onClick={() => copyToClipboard(email)}
              className="flex items-center justify-start w-full p-3 bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200 transition-colors"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <div className="text-gray-600">
                <Mail className="size-6" />
              </div>
              <span className="ml-3 font-medium text-gray-700">{email}</span>
            </button>

          </div>
          
          {/* Footer Note */}
          <p className="text-xs text-gray-400 mt-8" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            Melbourne, Australia<br/>
            © Hugozbor 2025
          </p>
        </div>
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

    if (root === 'commissions') {
      const subCategory = parts[1] || null // For commissions, null means all sections closed
      return { page: 'commissions', category: subCategory, itemId: null }
    }

    const allowedPages = new Set(['home', 'about', 'contact', 'terms', 'info'])
    if (allowedPages.has(root)) {
      return { page: root, category: 'landing', itemId: null }
    }

    return { page: 'home', category: 'landing', itemId: null }
  }

  const initialUrlState = parseUrl()
  const [currentPage, _setCurrentPage] = useState(initialUrlState.page)
  const [currentCategory, _setCurrentCategory] = useState(initialUrlState.category)
  const [currentItemId, _setCurrentItemId] = useState(initialUrlState.itemId)

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
    } else if (page === 'commissions') {
      nextCategory = category // For commissions, category can be null (all closed) or a section ID
      _setCurrentCategory(nextCategory)
      _setCurrentItemId(null)
      if (nextCategory) {
        url = `/commissions/${nextCategory}`
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
    if (!nextItemId) {
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    const handlePopState = () => {
      const { page, category, itemId } = parseUrl()
      _setCurrentPage(page)
      _setCurrentCategory(page === 'my-work' ? category : 'landing')
      _setCurrentItemId(page === 'my-work' ? itemId : null)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header is now Global and Sticky */}
      <Header currentPage={currentPage} currentCategory={currentCategory} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} currentPage={currentPage} />}
        {currentPage === 'my-work' && currentCategory === 'graphics' && (
          <MyWorkCategoryPage category="graphics" setCurrentPage={setCurrentPage} currentPage={currentPage} currentItemId={currentItemId} />
        )}
        {currentPage === 'my-work' && currentCategory === 'videos' && (
          <MyWorkCategoryPage category="videos" setCurrentPage={setCurrentPage} currentPage={currentPage} currentItemId={currentItemId} />
        )}
        {currentPage === 'my-work' && currentCategory === 'websites' && (
          <MyWorkCategoryPage category="websites" setCurrentPage={setCurrentPage} currentPage={currentPage} currentItemId={currentItemId} />
        )}
        {currentPage === 'my-work' && currentCategory === 'view-all' && (
          <MyWorkCategoryPage category="view-all" setCurrentPage={setCurrentPage} currentPage={currentPage} currentItemId={currentItemId} />
        )}
        {currentPage === 'my-work' && currentCategory === 'landing' && (
          <MyWorkLandingPage setCurrentPage={setCurrentPage} currentPage={currentPage} />
        )}
        {currentPage === 'commissions' && (
          <CommissionsPage 
            activeSection={currentCategory} 
            setCurrentPage={setCurrentPage} 
            currentPage={currentPage} 
          />
        )}
        {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} currentPage={currentPage} />}
        {currentPage === 'contact' && <ContactPage setCurrentPage={setCurrentPage} currentPage={currentPage} />}
        {currentPage === 'terms' && <TermsPage setCurrentPage={setCurrentPage} currentPage={currentPage} />}
        {currentPage === 'info' && <InfoPage setCurrentPage={setCurrentPage} />}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
      
      {/* Vercel Tracking Components */}
      <Analytics />
      <SpeedInsights />
    </div>
  )
}

export default App

