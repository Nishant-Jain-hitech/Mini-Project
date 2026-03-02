import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Globe, Zap } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { id: 'stat-fans', label: 'Active Fans', value: '2M+', icon: <Users className="w-5 h-5" /> },
    { id: 'stat-matches', label: 'Matches Tracked', value: '50K+', icon: <Trophy className="w-5 h-5" /> },
    { id: 'stat-countries', label: 'Countries', value: '120+', icon: <Globe className="w-5 h-5" /> },
    { id: 'stat-speed', label: 'Data Speed', value: '0.2s', icon: <Zap className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-6 md:px-20">
      <header className="max-w-4xl mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl font-black text-white uppercase italic tracking-tighter mb-6"
        >
          More Than Just <br />
          <span className="text-blue-500">A Scoreboard.</span>
        </motion.h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
          CricSocial was born in the stands. We felt the static nature of sports apps didn't capture 
          the electricity of a last-over thriller. We built a digital stadium where data meets 
          discussion, and every boundary feels personal.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.id} // Fixed: Using explicit ID field
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl text-center"
          >
            <div className="bg-blue-600/20 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-500">
              {stat.icon}
            </div>
            <h3 className="text-3xl font-black text-white">{stat.value}</h3>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <section className="grid md:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white uppercase">The Vision</h2>
            <p className="text-slate-400">To create the world's most immersive cricket ecosystem, bridging the gap between raw data and fan emotion.</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white uppercase">The Tech</h2>
            <p className="text-slate-400">Powered by real-time low-latency streams and a community-first architecture, ensuring you're always in the crease.</p>
          </div>
        </div>
        <div className="aspect-video bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[40px] shadow-2xl shadow-blue-500/10 border border-white/10 flex items-center justify-center overflow-hidden italic font-black text-4xl text-white/20 uppercase tracking-tighter">
          #CricSocialCulture
        </div>
      </section>
    </div>
  );
};

export default AboutUs;