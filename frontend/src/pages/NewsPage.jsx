import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchNews } from "../api/api";
import { Clock, ChevronRight } from "lucide-react";

const NewsPage = () => {
  const { data: news, isLoading, isError } = useQuery({
    queryKey: ["allNews"],
    queryFn: fetchNews,
    staleTime: 300000,
  });

  const dummyImages = [
    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1593766788306-28561086694e?auto=format&fit=crop&q=80&w=800"
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 font-poppins overflow-x-hidden">
      <div className="pt-[80px] md:pt-[100px] px-4 md:px-10 pb-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">CricSocial News</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
              THE <span className="text-blue-500">NEWS</span>ROOM
            </h1>
          </div>
          
          <div className="max-w-xs border-l-2 border-blue-600/20 pl-5">
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
              Exclusive insights and raw match analysis delivered from the boundary.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {news?.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              key={item.id || index}
              className="group flex flex-col bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.05] hover:border-blue-500/20 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image || dummyImages[index % dummyImages.length]}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="bg-blue-600 text-white text-[9px] font-black uppercase px-3 py-1 rounded-lg">
                    {item.category || "Cricket"}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  {item.time || "2 Hours Ago"}
                </div>

                <h3 className="text-lg font-bold text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed mb-8 line-clamp-2 font-medium">
                  {item.description || "Detailed match coverage and updates on current developments."}
                </p>
                
                <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between group/link">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/link:text-white transition-colors">
                    Read Story
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-blue-600 transition-all duration-300">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;