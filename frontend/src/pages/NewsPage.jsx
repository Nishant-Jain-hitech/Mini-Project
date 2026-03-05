import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchNews } from "../api/api";
import { Newspaper, Clock, ExternalLink, Zap } from "lucide-react";

const NewsPage = () => {
  const { data: news, isLoading, isError } = useQuery({
    queryKey: ["allNews"],
    queryFn: fetchNews,
    staleTime: 300000,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Loading Latest News...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Zap className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-white font-black uppercase text-xl mb-2">Something went wrong</h2>
        <p className="text-slate-500 text-sm">Failed to fetch the latest cricket updates.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-poppins">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Newspaper className="w-5 h-5 text-blue-500" />
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">CricSocial Exclusive</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            THE <span className="text-blue-600">NEWSROOM</span>
          </h1>
        </div>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest border-l border-white/10 pl-4">
          Latest Cricket Updates <br /> & Transfer Rumors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news?.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={item.id || index}
            className="group bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 flex flex-col"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={item.image || "https://via.placeholder.com/800x450?text=CricSocial+News"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-blue-600 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-xl">
                  {item.category || "Cricket"}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-slate-500 text-[9px] font-bold uppercase tracking-wider mb-3">
                <Clock className="w-3 h-3" />
                {item.time || "Just Now"}
              </div>
              <h3 className="text-lg font-bold text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6 line-clamp-3">
                {item.description || item.content}
              </p>
              
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">
                  Read Article <ExternalLink className="w-3 h-3" />
                </button>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] text-white font-bold">
                    +
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;