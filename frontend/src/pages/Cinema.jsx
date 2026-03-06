import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Volume2,
  Maximize,
  SkipForward,
  Info,
  Plus,
  Check,
  Bookmark,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, updateWatchlist } from "../redux/slices/authSlice";
import { toggleWatchlistAPI } from "../api/api";
import toast from "react-hot-toast";

const Cinema = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const media = [
    {
      id: "movie_dhoni_01",
      title: "MS Dhoni: The Untold Story",
      type: "Movie",
      category: "Biopic",
      rating: "8.5",
      year: "2016",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUtKl0XWIsxOliIYaH5xZHG4Drtz37EZIs16TmOTQv7ppBYoOIh6_c7opQhHCVS_wpwC4uQXg2mS1Tp98RAs1oGX1B6hl2KzfdA0oR_PI4Q&s=10",
      description:
        "The life of MS Dhoni, from a ticket collector to the World Cup-winning captain of India.",
    },
    {
      id: "movie_tambe_02",
      title: "Kaun Pravin Tambe?",
      type: "Movie",
      category: "Inspirational",
      rating: "8.2",
      year: "2022",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSUGI0esxMo7ab84MblFgV2-lnCkxDquRZ6-2xl8_hEFbnNTcI7nWVx_65dXvAIIKIzhe4_gNo9HGwd5TZlgDNEAF_omXmg-lOXEpOVd5&s=10",
      description:
        "The extraordinary journey of a cricketer who made his professional debut at age 41.",
    },
    {
      id: "series_test_03",
      title: "The Test",
      type: "Web Series",
      category: "Docu-series",
      rating: "8.9",
      year: "2020",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy-KHD_-C2Cnk_Ual23wRpvysaw57oDeFUveO4f9z-f9iZx38ZJyQLQimcX70qCfEmk97AXoeXdHPn4vySKimJpnE2PSZvjpLa1-yWwPVu&s=10",
      description:
        "Inside the Australian Men's Cricket Team's journey of redemption.",
    },
    {
      id: "movie_83_04",
      title: "83",
      type: "Movie",
      category: "Historical",
      rating: "7.5",
      year: "2021",
      image: "https://static.toiimg.com/photo/87976035.jpeg",
      description:
        "The story of India's incredible 1983 World Cup victory at Lord's.",
    },
  ];

  const handleWatchlistToggle = async (e, contentId) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to manage your watchlist");
      return;
    }

    const itemToToggle = media.find((m) => m.id === contentId);
    if (!itemToToggle) return;

    const movieData = {
      id: String(itemToToggle.id),
      title: String(itemToToggle.title),
      rating: String(itemToToggle.rating),
      category: String(itemToToggle.category || itemToToggle.type),
      image: String(itemToToggle.image),
    };

    try {
      // This calls your POST /auth/watchlist/toggle
      const response = await toggleWatchlistAPI(movieData);

      // IMPORTANT: Your backend returns { status, action, watchlist }
      if (
        response.status === "success" ||
        response.message?.includes("success")
      ) {
        // Update Redux state with the new array from backend
        // This ensures the "Check" icon appears/disappears immediately
        dispatch(updateWatchlist(response.watchlist));

        toast.success(
          response.action === "added"
            ? "Added to Watchlist"
            : "Removed from Watchlist",
          {
            style: {
              borderRadius: "10px",
              background: "#020617",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          },
        );
      }
    } catch (err) {
      toast.error(err.message || "Failed to update watchlist");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20 overflow-x-hidden pt-20">
      {/* Featured Hero Section */}
      <div className="relative h-[75vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="https://static.toiimg.com/photo/87976035.jpeg"
          className="w-full h-full object-cover object-[center_25%] opacity-60"
          alt="Featured"
        />
        <div className="absolute bottom-20 left-4 md:left-12 z-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4"
          >
            <span className="bg-blue-600 w-fit text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-blue-600/30">
              Featured Biopic
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-none">
              83: THE <span className="text-blue-500 text-outline">GLORY</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-xl font-medium leading-relaxed mb-4">
              Experience the cinematic journey of Kapil's Devils as they
              conquered the world against all odds at Lord's.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedVideo(media[3])}
                className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                <Play className="w-4 h-4 fill-current" /> Play Now
              </button>
              <button
                onClick={(e) => handleWatchlistToggle(e, media[3].id)}
                className={`px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all border flex items-center gap-2 ${
                  user?.watchlist?.includes(media[3].id)
                    ? "bg-blue-600/20 border-blue-500 text-blue-400"
                    : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                }`}
              >
                {user?.watchlist?.includes(media[3].id) ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Watchlist
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="px-4 md:px-12 -mt-16 relative z-30">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest border-l-4 border-blue-600 pl-4">
            Fan Favorites
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {media.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div
                className="relative aspect-[2/3] rounded-[2rem] overflow-hidden border border-white/5 group-hover:border-blue-500/50 transition-all shadow-2xl bg-slate-900"
                onClick={() => setSelectedVideo(item)}
              >
                <img
                  src={item.image}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100"
                  alt={item.title}
                />

                {/* Watchlist Quick Add Button */}
                <button
                  onClick={(e) => handleWatchlistToggle(e, item.id)}
                  className={`absolute top-6 left-6 p-3 rounded-xl backdrop-blur-xl border transition-all z-20 ${
                    user?.watchlist?.includes(item.id)
                      ? "bg-blue-600 border-blue-400 text-white"
                      : "bg-black/60 border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  {user?.watchlist?.includes(item.id) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <p className="text-white text-[11px] font-bold mb-6 leading-relaxed transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 line-clamp-4">
                    {item.description}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVideo(item);
                    }}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                  >
                    Watch Trailer
                  </button>
                </div>

                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-xl text-yellow-500 text-[10px] font-black border border-white/10 flex items-center gap-1">
                  <span className="text-xs">★</span> {item.rating}
                </div>
              </div>

              <div className="mt-6 px-2">
                <h3 className="text-white font-black group-hover:text-blue-500 transition-colors uppercase text-md tracking-tight">
                  {item.title}
                </h3>
                <div className="flex items-center gap-3 mt-2.5">
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                    {item.year}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-800" />
                  <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest">
                    {item.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Player Overlay */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-0 md:p-12"
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-8 right-8 text-white/40 hover:text-white z-[510] p-3 bg-white/5 rounded-full border border-white/10 transition-all hover:rotate-90"
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl aspect-video bg-slate-950 rounded-none md:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.2)] border-none md:border border-white/10"
            >
              <img
                src={selectedVideo.image}
                className="absolute inset-0 w-full h-full object-cover opacity-10 blur-3xl scale-150"
                alt=""
              />

              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-transparent to-black/90">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="p-8 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6"
                  >
                    <Play className="w-16 h-16 text-blue-500 fill-current opacity-40" />
                  </motion.div>
                  <p className="text-blue-500/30 font-black uppercase tracking-[0.8em] text-[10px]">
                    CricSocial Premium Streaming
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                <div className="mb-8 flex justify-between items-end">
                  <div>
                    <div className="flex gap-3 mb-3">
                      <span className="text-blue-500 text-[9px] font-black uppercase tracking-[0.2em] bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                        {selectedVideo.type}
                      </span>
                      <span className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                        {selectedVideo.year}
                      </span>
                    </div>
                    <h3 className="text-white font-black uppercase tracking-tighter text-3xl md:text-5xl italic leading-none">
                      {selectedVideo.title}
                    </h3>
                  </div>
                  <div className="hidden lg:flex gap-4">
                    <button className="p-4 bg-white/5 rounded-2xl text-white hover:bg-white/10 border border-white/5 transition-all">
                      <Info className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) =>
                        handleWatchlistToggle(e, selectedVideo.id)
                      }
                      className={`p-4 rounded-2xl border transition-all ${
                        user?.watchlist?.includes(selectedVideo.id)
                          ? "bg-blue-600 border-blue-400 text-white"
                          : "bg-white/5 text-white hover:bg-white/10 border-white/5"
                      }`}
                    >
                      {user?.watchlist?.includes(selectedVideo.id) ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Plus className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="group h-2 w-full bg-white/5 rounded-full relative cursor-pointer">
                    <div className="absolute top-0 left-0 h-full w-[35%] bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)]" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-10">
                      <button className="text-white hover:text-blue-500 transition-all hover:scale-110">
                        <Play className="w-8 h-8 fill-current" />
                      </button>
                      <button className="text-white hover:text-blue-500 transition-all hover:scale-110">
                        <SkipForward className="w-7 h-7 fill-current" />
                      </button>
                      <span className="text-[11px] text-slate-500 font-black font-mono tracking-widest">
                        24:02 / 02:30:15
                      </span>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="text-[9px] text-blue-500 font-black px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md tracking-widest uppercase">
                        4K Ultra HD
                      </span>
                      <button className="text-white hover:text-blue-500 transition-all">
                        <Maximize className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cinema;
