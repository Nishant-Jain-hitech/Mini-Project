import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialIcons = [
    { icon: '𝕏', id: 'x-twitter' },
    { icon: '📸', id: 'instagram' },
    { icon: '📺', id: 'youtube' }
  ];

  return (
    <footer className="mt-20 border-t border-white/5 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto pt-16 pb-8 px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand Section */}
          <div className="col-span-1">
            <h2 className="text-xl font-black tracking-tighter text-white mb-4 uppercase italic">
              CRIC<span className="text-blue-500">SOCIAL</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              The ultimate destination for cricket fans. Stream exclusive web series,
              interact with the pavilion, and stay updated with the live match pulse.
            </p>
          </div>

          {/* Platform Section */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest opacity-70">Platform</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link to="/web-series" className="hover:text-blue-500 transition-colors flex items-center gap-2 group">
                  <span className="h-px w-0 bg-blue-500 group-hover:w-3 transition-all duration-300" /> Web Series
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-blue-500 transition-colors flex items-center gap-2 group">
                  <span className="h-px w-0 bg-blue-500 group-hover:w-3 transition-all duration-300" /> Movies
                </Link>
              </li>
              <li>
                <Link to="/pavilion" className="hover:text-blue-500 transition-colors flex items-center gap-2 group">
                  <span className="h-px w-0 bg-blue-500 group-hover:w-3 transition-all duration-300" /> The Pavilion
                </Link>
              </li>
              <li>
                <Link to="/live" className="hover:text-blue-500 transition-colors flex items-center gap-2 group">
                  <span className="h-px w-0 bg-blue-500 group-hover:w-3 transition-all duration-300" /> Live Scoreboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest opacity-70">Community</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link to="/about-us" className="hover:text-blue-500 transition-colors flex items-center gap-2 group">
                  <span className="h-px w-0 bg-blue-500 group-hover:w-3 transition-all duration-300" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-500 transition-colors flex items-center gap-2 group">
                  <span className="h-px w-0 bg-blue-500 group-hover:w-3 transition-all duration-300" /> Contact
                </Link>
              </li>
              <li>
                <Link to="/merch" className="hover:text-blue-500 transition-colors flex items-center gap-2 group">
                  <span className="h-px w-0 bg-blue-500 group-hover:w-3 transition-all duration-300" /> Official Merch
                </Link>
              </li>
              <li>
                <Link to="/fan-clubs" className="hover:text-blue-500 transition-colors flex items-center gap-2 group">
                  <span className="h-px w-0 bg-blue-500 group-hover:w-3 transition-all duration-300" /> Fan Clubs
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section - FIXED KEYS */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest opacity-70">Connect</h3>
            <div className="flex gap-4 mb-4">
              {socialIcons.map((item) => (
                <div
                  key={item.id}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600/20 hover:border-blue-500 transition-all cursor-pointer group"
                >
                  <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Join 1M+ fans on social media.</p>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-slate-500 font-medium text-center md:text-left">
            © 2026 CricSocial. No affiliation with ICC or BCCI. All rights reserved.
          </p>
          <div className="flex gap-6 text-[11px] text-slate-500 font-bold uppercase tracking-tighter">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;