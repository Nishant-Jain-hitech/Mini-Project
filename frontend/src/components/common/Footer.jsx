import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/5 bg-slate-950/50 pt-12 pb-8 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-black tracking-tighter text-white mb-4 uppercase">
              CRIC<span className="text-blue-500">SOCIAL</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              The ultimate destination for cricket fans. Stream exclusive web series,
              interact with the pavilion, and stay updated with the live match pulse.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Platform</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="/web-series" className="hover:text-blue-500 transition-colors">Web Series</a></li>
              <li><a href="/movies" className="hover:text-blue-500 transition-colors">Movies</a></li>
              <li><a href="/pavilion" className="hover:text-blue-500 transition-colors">The Pavilion</a></li>
              <li><a href="/live" className="hover:text-blue-500 transition-colors">Live Scoreboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Community</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="/about-us" className="hover:text-blue-500 transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Official Merch</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Fan Clubs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Connect</h3>
            <div className="flex gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600/20 hover:border-blue-500 transition-all cursor-pointer">
                𝕏
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600/20 hover:border-blue-500 transition-all cursor-pointer">
                📸
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600/20 hover:border-blue-500 transition-all cursor-pointer">
                📺
              </div>
            </div>
            <p className="text-[10px] text-slate-500">Join 1M+ fans on social media.</p>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-slate-500">
            © 2026 CricSocial. No affiliation with ICC or BCCI. All rights reserved.
          </p>
          <div className="flex gap-6 text-[11px] text-slate-500">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;