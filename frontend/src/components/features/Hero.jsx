import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-slate-950">
      {/* Background Image with Parallax Zoom */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=2000"
          alt="Cricket Stadium"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent"></div>
      </motion.div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center gap-6">

        {/* Live Score Mini-Card with Pulse */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 w-fit px-4 py-2 rounded-full"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <p className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
            Live: IND 245/4 (42.1) • v/s AUS
          </p>
        </motion.div>

        {/* Series Title & Info with Staggered Fade */}
        <div className="space-y-4 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white leading-[0.9] uppercase tracking-tighter"
          >
            Beyond the <br />
            <span className="text-blue-500 italic">Boundary</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-lg"
          >
            A raw, unfiltered look into the lives of cricket's biggest legends.
            From dressing room secrets to the final ball drama.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          <button className="group bg-white text-slate-900 font-black px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 shadow-xl shadow-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current transition-transform group-hover:scale-125" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            WATCH NOW
          </button>

          <button className="bg-white/5 backdrop-blur-md text-white font-black px-8 py-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            WATCHLIST
          </button>
        </motion.div>
      </div>

      {/* Social Proof Hook with Floating Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-12 right-8 hidden lg:block text-right"
      >
        <p className="text-5xl font-black text-white leading-none">4.9<span className="text-blue-500">/</span>5</p>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Fan Rating • 20k Reviews</p>
      </motion.div>
    </div>
  );
};

export default Hero;