import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/features/Hero";
import { TrendingSection } from "../components/features/MediaCard";

const Home = () => {
  const originalSeries = [
    {
      id: 1,
      title: "The Gabba Miracle",
      episodes: "6 Episodes",
      tag: "ORIGINAL",
      image:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 2,
      title: "Behind the Stumps",
      episodes: "8 Episodes",
      tag: "PREMIUM",
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 3,
      title: "Spin Kings",
      episodes: "4 Episodes",
      tag: "ORIGINAL",
      image:
        "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 4,
      title: "Willow & Leather",
      episodes: "10 Episodes",
      tag: "NEW",
      image:
        "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="overflow-x-hidden pt-20"
    >
      <Hero />

      <div className="p-4 md:p-10 space-y-16 pb-20">
        <TrendingSection />

        <section>
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              className="h-8 w-1.5 bg-blue-600 rounded-full origin-bottom"
            />
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl font-black text-white uppercase tracking-wider"
            >
              Original Series
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {originalSeries.map((series, index) => (
              <motion.div
                key={series.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-slate-900 transition-colors duration-500 group-hover:border-blue-500/30">
                  {/* Image with a soft "breath" animation on hover */}
                  <motion.img
                    src={series.image}
                    alt={series.title}
                    whileHover={{ scale: 1.08, filter: "brightness(0.8)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-4 flex flex-col justify-end">
                    {/* Minimal tag fade */}
                    <motion.span className="text-[8px] font-black text-blue-400 tracking-[0.2em] mb-1">
                      {series.tag}
                    </motion.span>

                    <h3 className="text-white font-bold text-lg leading-tight uppercase tracking-tight">
                      {series.title}
                    </h3>

                    {/* Reveal description/episode count on hover */}
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: "auto" }}
                      className="text-slate-400 text-[10px] mt-1 font-medium overflow-hidden"
                    >
                      {series.episodes} • Watch Now
                    </motion.p>
                  </div>

                  {/* Minimal subtle Play Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-blue-600/20 backdrop-blur-md rounded-full flex items-center justify-center border border-blue-500/40">
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-blue-400 border-b-[4px] border-b-transparent ml-0.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Home;
