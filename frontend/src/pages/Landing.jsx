import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Users, Tv } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl lg:text-8xl font-black tracking-tighter uppercase italic mb-6">
              The Digital <span className="text-blue-500">Stadium</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg lg:text-xl font-medium mb-10">
              Experience cricket like never before. Real-time scores, fan
              pavilions, and a community that never stops cheering.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group"
              >
                Enter the Crease
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition-all"
              >
                Join the Club
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
          >
            {[
              {
                icon: <Trophy />,
                title: "Live Action",
                desc: "Ball-by-ball updates and deep stats.",
              },
              {
                icon: <Users />,
                title: "Fan Pavilion",
                desc: "Connect with fans across the globe.",
              },
              {
                icon: <Tv />,
                title: "Entertainment",
                desc: "Movies, series, and exclusive content.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500 mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="font-black uppercase tracking-widest mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
