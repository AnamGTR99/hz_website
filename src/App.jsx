import React, { useState, useEffect } from 'react'
import { ChevronLeft, Instagram, Mail, X, ChevronDown, ChevronUp } from 'lucide-react'

// Portfolio Data Structure
const graphicsPortfolio = [
  {
    id: 'graphic-1',
    title: 'Project Title 1',
    category: ['graphics', 'view-all'],
    date: 'October 2025',
    by: 'Client Name Here',
    thumbnailUrl: '/2015_05_20/IMG_1118.JPG',
    fullImageUrl: '/2015_05_20/IMG_1118.JPG',
  },
  {
    id: 'graphic-2',
    title: 'Project Title 2',
    category: ['graphics', 'view-all'],
    date: 'September 2025',
    by: 'Self-Initiated',
    thumbnailUrl: '/2015_05_20/IMG_1119.JPG',
    fullImageUrl: '/2015_05_20/IMG_1119.JPG',
  },
  {
    id: 'graphic-3',
    title: 'Project Title 3',
    category: ['graphics', 'view-all'],
    date: 'August 2025',
    by: 'Another Client',
    thumbnailUrl: '/2015_05_20/IMG_1120.JPG',
    fullImageUrl: '/2015_05_20/IMG_1120.JPG',
  },
  {
    id: 'graphic-4',
    title: 'Project Title 4',
    category: ['graphics', 'view-all'],
    date: 'July 2025',
    by: 'Client Name Here',
    thumbnailUrl: '/2015_05_20/IMG_1121.JPG',
    fullImageUrl: '/2015_05_20/IMG_1121.JPG',
  },
  {
    id: 'graphic-5',
    title: 'Project Title 5',
    category: ['graphics', 'view-all'],
    date: 'June 2025',
    by: 'Self-Initiated',
    thumbnailUrl: '/2015_05_20/IMG_1123.JPG',
    fullImageUrl: '/2015_05_20/IMG_1123.JPG',
  },
]

// Video Portfolio Data Structure
const videoPortfolio = [
  {
    id: 'video-1',
    title: 'Sample Video Project 1',
    category: ['videos', 'view-all'],
    description: 'A sample description for the first video.',
    thumbnailUrl: '/2015_05_20/IMG_1118.JPG',
    videoEmbedUrl: 'https://www.youtube.com/embed/qkFYqY3vr84',
  },
  {
    id: 'video-2',
    title: 'Sample Video Project 2',
    category: ['videos', 'view-all'],
    description: 'A sample description for the second video.',
    thumbnailUrl: '/2015_05_20/IMG_1119.JPG',
    videoEmbedUrl: 'https://www.youtube.com/embed/qkFYqY3vr84',
  },
]

// Master Portfolio List (combines graphics and videos)
const allPortfolioItems = [...graphicsPortfolio, ...videoPortfolio]

// --- Asset Variables for Commissions Page ---
// 1. IMAGE PATHS
const visualArtImg = "/assets_comission_page/visual_art.png"
const creativeDirectionImg = "/assets_comission_page/creative_direction.png"

// 2. VIDEO HTML (from video_visuals.txt)
const videoVisualsHtml = `<a href="https://gyazo.com/22e0b339f1a8815b6c8e1fb42eecd2c7"><img src="https://i.gyazo.com/22e0b339f1a8815b6c8e1fb42eecd2c7.gif" alt="Image from Gyazo" width="596"/></a>`

// 3. WEB DESIGN HTML (from web_design.txt)
const webDesignHtml = `<a href="https://gyazo.com/8bdac84d59e63c4ccadb28bde0df117d"><img src="https://i.gyazo.com/8bdac84d59e63c4ccadb28bde0df117d.gif" alt="Image from Gyazo" width="600"/></a><a href="https://gyazo.com/e660702e8f799446cf3f52cbd75e7835"><img src="https://i.gyazo.com/e660702e8f799446cf3f52cbd75e7835.gif" alt="Image from Gyazo" width="600"/></a>`

// --- End Asset Variables ---

// PageHeader component for mobile back arrow
function PageHeader({ title, onBack }) {
  return (
    <div className="md:hidden flex items-center justify-center p-4 relative border-b border-gray-200">
      <button 
        onClick={onBack} 
        className="absolute left-4"
      >
        <ChevronLeft className="size-6 text-gray-700" />
      </button>
      <h2 className="text-xl font-bold text-brandBlack" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>{title}</h2>
    </div>
  )
}

function Header({ currentPage, setCurrentPage }) {
  const [showMyWorkDropdown, setShowMyWorkDropdown] = useState(false)
  const isMyWorkActive = currentPage === 'my-work' || currentPage.startsWith('my-work/')

  return (
    <header>
      <div className="max-w-4xl mx-auto px-3 md:px-0 flex flex-col items-center pt-6 pb-3 md:pt-8 md:pb-4">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img 
            src="/logo.png" 
            alt="Hugo Zbor Logo" 
            className="h-12 w-auto md:h-16"
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-8 mt-4 relative">
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
              onClick={() => setCurrentPage('my-work/graphics')}
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
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[150px] z-50">
                <button
                  onClick={() => {
                    setCurrentPage('my-work/graphics')
                    setShowMyWorkDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 font-medium text-lg hover:bg-gray-50 ${
                    currentPage === 'my-work/graphics' ? 'text-[#c13333]' : 'text-brandBlack'
                  }`}
                >
                  Graphics
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('my-work/videos')
                    setShowMyWorkDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 font-medium text-lg hover:bg-gray-50 ${
                    currentPage === 'my-work/videos' ? 'text-[#c13333]' : 'text-brandBlack'
                  }`}
                >
                  Videos
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('my-work/websites')
                    setShowMyWorkDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 font-medium text-lg hover:bg-gray-50 ${
                    currentPage === 'my-work/websites' ? 'text-[#c13333]' : 'text-brandBlack'
                  }`}
                >
                  Websites
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('my-work/view-all')
                    setShowMyWorkDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 font-medium text-lg hover:bg-gray-50 ${
                    currentPage === 'my-work/view-all' ? 'text-[#c13333]' : 'text-brandBlack'
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
    </header>
  )
}

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0 mt-4 md:mt-8">
      {/* Content Box */}
      <div className="bg-gray-200 rounded-lg p-8 md:p-16">
        {/* Text */}
        <p className="text-center text-xl md:text-2xl text-brandBlack">
          Home page content here
        </p>
      </div>
    </div>
  )
}

// My Work Landing Page - Three boxes layout (no subheadings)
function MyWorkLandingPage({ setCurrentPage }) {
  return (
    <>
      <PageHeader title="My work" onBack={() => setCurrentPage('home')} />
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
              onClick={() => setCurrentPage('my-work/graphics')}
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
              onClick={() => setCurrentPage('my-work/videos')}
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
            onClick={() => setCurrentPage('my-work/websites')}
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
            <div className="w-full aspect-video">
              <iframe
                src={item.videoEmbedUrl}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          ) : (
            // RENDER IMAGE (Original)
            <img 
              src={item.fullImageUrl} 
              alt={item.title}
              className="w-full h-64 md:h-full object-contain"
            />
          )}
        </div>
        
        {/* RIGHT SIDE: Text Content */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>{item.title}</h2>
            
            {/* Conditional Text */}
            {item.description ? (
              // For Videos
              <p className="text-lg text-gray-600 mt-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>{item.description}</p>
            ) : (
              // For Graphics
              <>
                <p className="text-lg text-gray-600 mt-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>By: {item.by}</p>
                <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Date: {item.date}</p>
              </>
            )}
            
            {/* Work With Hugo Button */}
            <button 
              onClick={() => {
                onClose()
                setCurrentPage('contact')
              }}
              className="mt-6 px-5 py-2 bg-[#c13333] text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Work With Hugo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Category pages with sub-navigation
function MyWorkCategoryPage({ category, setCurrentPage }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const categoryNames = {
    'graphics': 'Graphics',
    'videos': 'Videos',
    'websites': 'Websites',
    'view-all': 'View all'
  }

  // Filter items based on current category
  const filteredItems = allPortfolioItems.filter(item => item.category.includes(category))

  return (
    <>
      <PageHeader title="My work" onBack={() => setCurrentPage('home')} />
      <div className="max-w-4xl mx-auto px-4 md:px-0">
      {/* Sub-navigation */}
      <nav className="flex flex-col items-center md:flex-row md:justify-center md:space-x-6 space-y-2 md:space-y-0 mt-4 md:mt-8">
        <button
          onClick={() => setCurrentPage('my-work/graphics')}
          className={
            category === 'graphics'
              ? 'font-medium text-lg text-[#c13333]'
              : 'font-medium text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
          }
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          Graphics
        </button>
        <button
          onClick={() => setCurrentPage('my-work/videos')}
          className={
            category === 'videos'
              ? 'font-medium text-lg text-[#c13333]'
              : 'font-medium text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
          }
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          Videos
        </button>
        <button
          onClick={() => setCurrentPage('my-work/websites')}
          className={
            category === 'websites'
              ? 'font-medium text-lg text-[#c13333]'
              : 'font-medium text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
          }
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          Websites
        </button>
        <button
          onClick={() => setCurrentPage('my-work/view-all')}
          className={
            category === 'view-all'
              ? 'font-medium text-lg text-[#c13333]'
              : 'font-medium text-lg text-brandBlack hover:text-[#c13333] transition-colors duration-200'
          }
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          View all
        </button>
      </nav>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
        {filteredItems.map(item => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group bg-gray-100 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <img 
              src={item.thumbnailUrl} 
              alt={item.title} 
              className="w-full h-64 md:h-72 object-cover"
            />
          </button>
        ))}
        {/* Show a message if no items match the filter */}
        {filteredItems.length === 0 && (
          <p className="sm:col-span-2 lg:col-span-3 text-center text-gray-500" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            No projects found in this category.
          </p>
        )}
      </div>
      </div>

      {/* Overlay */}
      {selectedItem && (
        <WorkOverlay 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)}
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
function AboutPage({ setCurrentPage }) {
  return (
    <>
      {/* 1. MOBILE HEADER */}
      <PageHeader title="About" onBack={() => setCurrentPage('home')} />
      
      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="max-w-4xl mx-auto px-4 md:px-0 mt-4 md:mt-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          
          {/* --- LEFT SIDE: MAIN TEXT (Uses 'prose') --- */}
          <div className="w-full md:w-3/4">
            <div className="prose prose-lg max-w-none !font-normal" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
              
              {/* Page Title */}
              <h1 className="!text-4xl border-b border-gray-300 pb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Hugo Zbor</h1>
              
              {/* Intro Paragraph */}
              <p style={{ fontWeight: 400 }}>I'm Hugo, a 21-year-old artist, editor, and web designer, based in <a href="https://en.wikipedia.org/wiki/Melbourne" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Melbourne, Australia</a>.</p>
              <p style={{ fontWeight: 400 }}>I was born and raised in <a href="https://en.wikipedia.org/wiki/Jakarta" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Jakarta, Indonesia</a>. As a little kid, I was always interested in arts - I drew here and there, but never ever took it that seriously.</p>
              
              {/* --- Section 1 --- */}
              <SectionHeader title="Introduction to Design" setCurrentPage={setCurrentPage} />
              <p style={{ fontWeight: 400 }}>Around the fifth grade, I was borrowing my mum's laptop and I stumbled across a video of someone editing photos with <a href="https://www.adobe.com/products/photoshop.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Photoshop</a> on <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">YouTube</a>. At the time, you were able to do 30-day free trials, so I secretly downloaded it and kept making new emails to keep using it. I was really bad at watching tutorials, so I started learning by trying out every single tool and then just testing random things.</p>
              
              {/* Images in bordered boxes */}
              <div className="flex flex-col sm:flex-row gap-4 my-4">
                <div className="border border-gray-300 bg-gray-50 rounded-lg p-3 text-center flex-1">
                  <img 
                    src="/2015_05_20/IMG_1118.JPG" 
                    alt="Hugo in the fifth grade" 
                    className="w-full h-auto" 
                  />
                  <p className="text-sm text-gray-700 mt-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>Hugo in the fifth grade</p>
                </div>
                <div className="border border-gray-300 bg-gray-50 rounded-lg p-3 text-center flex-1">
                  <img 
                    src="/2015_05_20/IMG_1119.JPG" 
                    alt="Hugo using Photoshop in 2016" 
                    className="w-full h-auto" 
                  />
                  <p className="text-sm text-gray-700 mt-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>Hugo using Photoshop in 2016</p>
                </div>
              </div>
              
              <p style={{ fontWeight: 400 }}>For the next 5 years I would continue to learn and use <a href="https://www.adobe.com/products/photoshop.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Photoshop</a> as a hobby for fun (making memes and silly images).</p>
              
              {/* --- Section 2 --- */}
              <SectionHeader title="High School and Covid Lockdown" setCurrentPage={setCurrentPage} />
              <p style={{ fontWeight: 400, marginBottom: '1em' }}>Mid-Highschool, after COVID lockdown began, I started venturing into <a href="https://en.wikipedia.org/wiki/Screen_printing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">screen-printing</a>. After many failures, I actually made a few graphic t-shirts. My first "order" was printing 50 tote bags for my sister's graduation year.</p>
              <p style={{ fontWeight: 400, marginBottom: '1em' }}>After COVID lockdown, two friends and I decided to start a <a href="https://www.instagram.com/99clover" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">99Clover</a>, a clothing brand. It was initially just for our friends, but blew up locally.</p>
              <p style={{ fontWeight: 400 }}>This was when I first started taking <a href="https://www.adobe.com/products/photoshop.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Photoshop</a> seriously.</p>
              
              {/* --- Section 3 --- */}
              <SectionHeader title="Moving to Australia" setCurrentPage={setCurrentPage} />
              <p style={{ fontWeight: 400, marginBottom: '1em' }}>I moved to <a href="https://en.wikipedia.org/wiki/Australia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Australia</a>, in 2022, to study <a href="https://en.wikipedia.org/wiki/Unemployment" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">computer science</a> and I kept running the brand (remotely) while attempting to balance it with studying. I noticed my love for design was fading and feeling like a chore. I would always rush and design quickly, because I wanted to get it out of the way.</p>
              
              <p style={{ fontWeight: 400, marginBottom: '1em' }}>Mid-2024, I stumbled across a <a href="https://en.wikipedia.org/wiki/Music_video" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">music video</a> that was so refreshingly creative, it inspired me to start designing again. I started pushing myself out of my comfort zone and trying new things, finally learning again after such a long time. Around this time, I finally started to enjoy studying <a href="https://en.wikipedia.org/wiki/Unemployment" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">computer science</a>, and I began incorporating my graphic design skills into coding projects.</p>
              
              <p style={{ fontWeight: 400 }}>In February, 2025, I started posting more on a new design account I made (<a href="https://www.instagram.com/hugozbor" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@hugozbor</a> on <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Instagram</a>). My art was met with overwhelming support and I've even been contacted by designers that inspired me in the past. I am extremely grateful and I believe I am now growing - as an artist - faster than ever before.</p>
            
            </div>
          </div>
          
          {/* --- RIGHT SIDE: SIDEBAR --- */}
          <div className="w-full md:w-1/3 mt-6 md:mt-0">
            
            {/* Main Info Box */}
            <div className="border border-gray-300 bg-gray-50 rounded-lg p-4">
              <h3 className="text-center font-bold text-xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Hugo Zbor</h3>
              <img 
                src="/2015_05_20/IMG_1120.JPG"
                alt="Hugo Zbor" 
                className="w-full mt-2 border border-gray-200" 
              />
              <ul className="text-sm mt-4 space-y-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <li><strong className="w-20 inline-block">Born:</strong> <a href="https://en.wikipedia.org/wiki/Jakarta" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Jakarta, Indonesia</a></li>
                <li><strong className="w-20 inline-block">Known For:</strong> <a href="https://en.wikipedia.org/wiki/Graphic_design" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Graphic Design</a></li>
                <li><strong className="w-20 inline-block">Fields:</strong> <a href="https://en.wikipedia.org/wiki/Unemployment" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Computer science</a></li>
                <li><strong className="w-20 inline-block">Website:</strong> <a href="https://hugozbor.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">hugozbor.com</a></li>
              </ul>
            </div>
            
            {/* Other Info Boxes */}
            <InfoBox 
              imageUrl="/2015_05_20/IMG_1121.JPG"
              caption="Hugo during Covid Lockdown"
              altText="Hugo at desk during Covid"
            />
            
            <InfoBox 
              imageUrl="/2015_05_20/IMG_1123.JPG"
              caption="Hugo's student ID in 2023"
              altText="Hugo Zbor's student ID"
            />
            
          </div>
        </div>
      </div>
    </>
  )
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
function CommissionsPage({ setCurrentPage }) {
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index)
  }

  return (
    <>
      <PageHeader title="Commissions" onBack={() => setCurrentPage('home')} />
      <div className="max-w-4xl mx-auto px-4 md:px-0 mt-4 md:mt-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brandBlack mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Commissions
          </h1>
          <p className="text-lg text-gray-700" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            Explore the full range of creative services offered by Hugo Zbor. Each project is custom-built to your vision.
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-0">
          <AccordionItem
            title="Visual Art & Graphic Design"
            isOpen={openDropdown === 0}
            onToggle={() => toggleDropdown(0)}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="mb-3" style={{ fontWeight: 400 }}>Custom visuals crafted in Hugo's signature style, including:</p>
                <ul className="list-disc list-inside space-y-1 ml-4" style={{ fontWeight: 400 }}>
                  <li>Digital artworks</li>
                  <li>Character-based visuals</li>
                  <li>Abstract / surreal compositions</li>
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
            isOpen={openDropdown === 1}
            onToggle={() => toggleDropdown(1)}
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
                  <li>Surreal edits</li>
                  <li>Motion graphics</li>
                  <li>Animated assets</li>
                </ul>
                <p className="mt-3" style={{ fontWeight: 400 }}>Crafted for music promotion, product launches, and brand campaigns.</p>
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
            isOpen={openDropdown === 2}
            onToggle={() => toggleDropdown(2)}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="mb-3" style={{ fontWeight: 400 }}>Vision-level involvement and aesthetic leadership, including:</p>
                <ul className="list-disc list-inside space-y-1 ml-4" style={{ fontWeight: 400 }}>
                  <li>Creative strategy</li>
                  <li>Aesthetic development</li>
                  <li>Brand identity direction</li>
                  <li>Moodboards & visual planning</li>
                  <li>Campaign concepting</li>
                  <li>Asset review & feedback</li>
                  <li>Artistic supervision</li>
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
            isOpen={openDropdown === 3}
            onToggle={() => toggleDropdown(3)}
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
                  <li>UI/UX development</li>
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
            title="Branding & Identity"
            isOpen={openDropdown === 4}
            onToggle={() => toggleDropdown(4)}
          >
            <p className="mb-3" style={{ fontWeight: 400 }}>End-to-end brand identity design, including:</p>
            <ul className="list-disc list-inside space-y-1 ml-4" style={{ fontWeight: 400 }}>
              <li>Logo design</li>
              <li>Typography systems</li>
              <li>Color palettes</li>
              <li>Visual language development</li>
              <li>Brand guidelines</li>
              <li>Social identity kits</li>
              <li>Packaging concepts</li>
            </ul>
            <p className="mt-3" style={{ fontWeight: 400 }}>Perfect for new brands or those undergoing a rebrand.</p>
          </AccordionItem>

          <AccordionItem
            title="Content Creation (Artists & Influencers)"
            isOpen={openDropdown === 5}
            onToggle={() => toggleDropdown(5)}
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
            isOpen={openDropdown === 6}
            onToggle={() => toggleDropdown(6)}
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
            isOpen={openDropdown === 7}
            onToggle={() => toggleDropdown(7)}
          >
            <p style={{ fontWeight: 400 }}>
              If your project doesn't fit the categories above, Hugo accepts custom one-off or long-term commissions depending on availability.
              Describe your idea in the contact form to get started.
            </p>
          </AccordionItem>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-12 mb-8 text-center">
          <h2 className="text-3xl font-bold text-brandBlack mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Start a Commission
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>
            Tell us about your idea, project, or vision. Hugo and the management team will review your request and get back to you with next steps.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-3 bg-[#c13333] text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Submit Inquiry
            </button>
            <a
              href="mailto:contact@hugozbor.com"
              className="text-gray-600 hover:text-gray-900 underline"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
            >
              Email: contact@hugozbor.com
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

// Contact Page Component
function ContactPage({ setCurrentPage }) {
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
        <div className="text-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <h1 className="text-3xl md:text-4xl font-bold text-brandBlack mb-4">
            Thank You! Your inquiry has been submitted.
          </h1>
          <p className="text-lg md:text-xl text-brandBlack mb-4">
            I've received your message and will review your project details. You can expect an email from{' '}
            <a href="mailto:contact@hugozbor.com" className="text-[#c13333] hover:underline">
              contact@hugozbor.com
            </a>
            {' '}within 1-2 business days. In the meantime, feel free to check out{' '}
            <button
              onClick={() => setCurrentPage('my-work/view-all')}
              className="text-[#c13333] underline hover:no-underline cursor-pointer font-medium"
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
      <PageHeader title="Contact" onBack={() => setCurrentPage('home')} />
      <div className="max-w-4xl mx-auto px-4 md:px-0 mt-4 md:mt-8">
      {/* Header Text */}
      <p className="text-lg md:text-xl text-brandBlack mb-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        Have a project in mind or just want to say hi? I'd love to hear about it. Fill out the form below and I'll get back to you within 1-2 business days.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        {/* Row 1: Name & Email */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label className="block text-brandBlack font-medium mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            />
          </div>
          <div className="flex-1">
            <label className="block text-brandBlack font-medium mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            />
          </div>
        </div>

        {/* Row 2: Service Checkboxes */}
        <div>
          <label className="block text-brandBlack font-medium mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            What service(s) are you looking for?*
          </label>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <input 
                type="checkbox" 
                name="service_graphics" 
                value="true" 
                checked={services.graphics}
                onChange={handleServiceChange}
                className="mr-2" 
              />
              <span className="text-brandBlack">Graphics (Poster, Cover Art, Flyer, etc)</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <input 
                type="checkbox" 
                name="service_video" 
                value="true" 
                checked={services.video}
                onChange={handleServiceChange}
                className="mr-2" 
              />
              <span className="text-brandBlack">Video Editing / Motion Graphics</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <input 
                type="checkbox" 
                name="service_webdesign" 
                value="true" 
                checked={services.webdesign}
                onChange={handleServiceChange}
                className="mr-2" 
              />
              <span className="text-brandBlack">Webdesign</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <input 
                type="checkbox" 
                name="service_creative_direction" 
                value="true" 
                checked={services.creativeDirection}
                onChange={handleServiceChange}
                className="mr-2" 
              />
              <span className="text-brandBlack">Creative Direction / Strategy</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <input 
                type="checkbox" 
                name="service_full_project" 
                value="true" 
                checked={services.fullService}
                onChange={handleServiceChange}
                className="mr-2" 
              />
              <span className="text-brandBlack">Bit of Everything (Full-Service Project)</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <input 
                type="checkbox" 
                name="service_not_sure" 
                value="true" 
                checked={services.notSure}
                onChange={handleServiceChange}
                className="mr-2" 
              />
              <span className="text-brandBlack">Not Sure Yet</span>
            </label>
          </div>
        </div>

        {/* Row 3: Text Area */}
        <div>
          <label className="block text-brandBlack font-medium mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Tell me more about your project*
          </label>
          <textarea
            name="project_details"
            required
            rows={6}
            placeholder={detailsPlaceholder}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333] resize-vertical"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          />
        </div>

        {/* Row 4: Budget */}
        <div>
          <label className="block text-brandBlack font-medium mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            What's your estimated budget?*
          </label>
          <input
            type="text"
            name="budget"
            required
            placeholder="e.g. $750 - $1500 USD etc"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-brandBlack focus:outline-none focus:border-[#c13333]"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          />
        </div>

        {/* Row 5: Timeline */}
        <div>
          <label className="block text-brandBlack font-medium mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Ideal Project Timeline?*
          </label>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <input type="checkbox" name="timeline" value="Urgent (< 2 weeks)" className="mr-2" />
              <span className="text-brandBlack">Urgent (&lt; 2 weeks)</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <input type="checkbox" name="timeline" value="Standard (2-3 weeks)" className="mr-2" />
              <span className="text-brandBlack">Standard (2-3 weeks)</span>
            </label>
            <label className="flex items-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <input type="checkbox" name="timeline" value="Flexible (1-2 months)" className="mr-2" />
              <span className="text-brandBlack">Flexible (1-2 months)</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-white border border-gray-300 rounded-lg text-brandBlack font-medium hover:bg-[#c13333] hover:text-white transition-colors"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
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
function TermsPage({ setCurrentPage }) {
  return (
    <>
      <PageHeader title="Terms & Conditions" onBack={() => setCurrentPage('home')} />
      <div className="max-w-4xl mx-auto px-4 md:px-0 mt-4 md:mt-8">
        <div className="bg-gray-100 rounded-lg p-8 md:p-12">
          <div className="prose max-w-none" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <h1 className="text-3xl font-bold text-brandBlack mb-2">Terms & Conditions — HUGOZBOR</h1>
            
            <p className="text-sm text-gray-600 mb-6">Last updated: 16th November 2025</p>
            
            <p className="text-brandBlack mb-6">
              Welcome to the official website of HUGOZBOR ("Hugo", "we", "our", "the Artist").
              By accessing or using this website, you agree to the following Terms & Conditions.
              If you do not agree, please discontinue use of the site.
            </p>
            
            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">1. Intellectual Property & Ownership</h2>
            
            <p className="text-brandBlack mb-4">
              All artwork, designs, visuals, graphics, videos, animations, website content, branding, logos, and all related creative material displayed on this website (collectively, the "Content") are the exclusive property of HUGOZBOR.
            </p>
            
            <p className="text-brandBlack mb-4">Unless explicitly stated otherwise:</p>
            
            <p className="text-brandBlack mb-4">All Content is owned, created, and copyrighted by HUGOZBOR.</p>
            
            <p className="text-brandBlack mb-4">All rights are reserved.</p>
            
            <p className="text-brandBlack mb-4">
              No Content may be copied, reproduced, edited, redistributed, resold, showcased commercially, or used for training datasets, AI models, or promotional material without written permission from Hugo.
            </p>
            
            <p className="text-brandBlack mb-6">Unauthorized use may result in legal action.</p>
            
            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">2. Usage Rights for Commissioned Work</h2>
            
            <p className="text-brandBlack mb-4">When a client commissions Hugo for a project:</p>
            
            <p className="text-brandBlack mb-4">
              The client receives a license to use the final delivered artwork only for the agreed purpose (e.g., social media promotion, album artwork, brand visuals, website usage).
            </p>
            
            <p className="text-brandBlack mb-4">Ownership is not transferred unless explicitly negotiated in writing.</p>
            
            <p className="text-brandBlack mb-4">
              Raw project files (PSD, Blender files, project files, layers, etc.) are not included unless separately purchased.
            </p>
            
            <p className="text-brandBlack mb-2">Hugo retains:</p>
            
            <ul className="list-disc list-inside text-brandBlack mb-4 ml-4">
              <li>Artistic copyright</li>
              <li>Portfolio rights</li>
              <li>Rights to showcase the project publicly</li>
            </ul>
            
            <p className="text-brandBlack mb-6">
              No client may resell, redistribute, mint NFTs, or sublicense the artwork unless paid and approved in writing.
            </p>
            
            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">3. Pricing, Payments & Deposits</h2>
            
            <p className="text-brandBlack mb-4">
              All project quotes are provided based on project complexity, timeline, and deliverables.
            </p>
            
            <p className="text-brandBlack mb-4">A deposit may be required before work begins. Deposits are non-refundable.</p>
            
            <p className="text-brandBlack mb-4">Work will not begin until payment terms are agreed on.</p>
            
            <p className="text-brandBlack mb-4">Projects requiring urgent turnaround may incur a rush fee.</p>
            
            <p className="text-brandBlack mb-6">Final files are delivered only after full payment is completed.</p>
            
            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">4. Revisions</h2>
            
            <p className="text-brandBlack mb-4">Unless otherwise stated:</p>
            
            <p className="text-brandBlack mb-4">
              Projects include a set number of revisions defined in the project agreement.
            </p>
            
            <p className="text-brandBlack mb-4">Additional revisions or scope changes may incur extra charges.</p>
            
            <p className="text-brandBlack mb-6">
              Once a project is approved and delivered, further modifications are treated as a new project.
            </p>
            
            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">5. Refund Policy</h2>
            
            <p className="text-brandBlack mb-4">Due to the nature of creative work:</p>
            
            <p className="text-brandBlack mb-4">All payments are final.</p>
            
            <p className="text-brandBlack mb-4">No refunds are provided once work has begun.</p>
            
            <p className="text-brandBlack mb-4">Deposits are non-refundable.</p>
            
            <p className="text-brandBlack mb-6">
              If Hugo is unable to complete a project for any reason, a partial refund may be considered at Hugo's discretion.
            </p>
            
            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">6. Website Usage</h2>
            
            <p className="text-brandBlack mb-4">You agree not to:</p>
            
            <ul className="list-disc list-inside text-brandBlack mb-6 ml-4">
              <li>Copy or scrape any Content</li>
              <li>Reproduce or modify the site or its assets</li>
              <li>Use the website for illegal purposes</li>
              <li>Attempt to breach security or access restricted parts of the site</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">7. Privacy</h2>
            
            <p className="text-brandBlack mb-6">
              Any information provided via contact forms, emails, or inquiries will be used solely for communication and project-related purposes.
              We do not sell or share personal information with third parties.
            </p>
            
            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">8. External Links</h2>
            
            <p className="text-brandBlack mb-6">
              This website may include links to external websites.
              We are not responsible for the content, policies, or security of third-party sites.
            </p>
            
            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">9. Liability</h2>
            
            <p className="text-brandBlack mb-4">
              All Content on this site is provided for general informational/portfolio purposes.
            </p>
            <p className="text-brandBlack mb-2">Hugo is not liable for:</p>
            
            <ul className="list-disc list-inside text-brandBlack mb-6 ml-4">
              <li>Damages from website access</li>
              <li>Client misuse of artwork</li>
              <li>Losses stemming from external platforms or third-party tools</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-brandBlack mb-4 mt-8">10. Modifications to Terms</h2>
            
            <p className="text-brandBlack mb-6">
              Hugo may update these Terms & Conditions at any time. Updated terms will be posted on this page with a revised "Last Updated" date.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="bg-white min-h-screen">
      {/* Header is now ONLY shown on Home (mobile) but ALWAYS on web */}
      <div className={currentPage === 'home' ? 'block' : 'hidden md:block'}>
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'my-work/graphics' && <MyWorkCategoryPage category="graphics" setCurrentPage={setCurrentPage} />}
        {currentPage === 'my-work/videos' && <MyWorkCategoryPage category="videos" setCurrentPage={setCurrentPage} />}
        {currentPage === 'my-work/websites' && <MyWorkCategoryPage category="websites" setCurrentPage={setCurrentPage} />}
        {currentPage === 'my-work/view-all' && <MyWorkLandingPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'commissions' && <CommissionsPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'contact' && <ContactPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'terms' && <TermsPage setCurrentPage={setCurrentPage} />}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default App

