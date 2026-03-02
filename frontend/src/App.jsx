import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Header from './components/common/Header'
import Sidebar from './components/common/Sidebar'
import Home from './pages/Home'
import Pavilion from './pages/Pavilion'
import Cinema from './pages/Cinema'
import WebSeries from './pages/WebSeries'
import Movies from './pages/Movies'
import Login from './pages/Login'
import Register from './pages/Register'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import CookiePolicy from './pages/legal/CookiePolicy'
import TermsOfService from './pages/legal/TermsOfService'
import OfficialMerch from './pages/community/OfficialMerch'
import FanClubs from './pages/community/FanClubs'
import Profile from './pages/Profile'
import LiveScorecard from './pages/LiveScorecard'
import Footer from './components/common/Footer'
import Series from './pages/Series'
import Landing from './pages/Landing'
import Watchlist from './pages/Watchlist'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isLandingPage = location.pathname === '/';
  
  const showLayout = !isAuthPage; 

  return (
    <div className='h-screen w-screen bg-slate-950 text-white flex flex-col overflow-hidden relative font-sans'>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '12px',
          },
        }}
      />

      {showLayout && <Header />}

      <AnimatePresence>
        {!sidebarOpen && showLayout && !isLandingPage && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden fixed bottom-8 left-6 z-[60] bg-blue-600 p-4 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)] text-xl border border-blue-400/30"
          >
            🏏
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex flex-1 overflow-hidden relative">
        {showLayout && !isLandingPage && (
          <Sidebar
            isMobileOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 min-h-0 flex flex-col overflow-y-auto custom-scrollbar scroll-smooth bg-slate-950">
          
          <div className={`flex-1 w-full ${isAuthPage ? 'flex items-center justify-center' : ''}`}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/pavilion" element={<Pavilion />} />
                  <Route path="/web-series" element={<WebSeries />} />
                  <Route path="/series" element={<Series />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/cinema" element={<Cinema />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/cookies" element={<CookiePolicy />} />
                  <Route path="/merch" element={<OfficialMerch />} />
                  <Route path="/fan-clubs" element={<FanClubs />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/live-scorecard" element={<LiveScorecard />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </div>

          {showLayout && <Footer />}
        </main>
      </div>
    </div>
  )
}

export default App