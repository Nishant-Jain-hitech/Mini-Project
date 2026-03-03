import React from "react";

const Movies = () => {
  return (
    <div className="min-h-screen bg-[#020617] animate-in fade-in duration-700">
      {/* Cinematic Header */}
      <header className="relative h-[60vh] flex items-end p-6 md:p-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2000&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-40 scale-105"
            alt="Cinema Backdrop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <span className="bg-blue-600 text-[10px] font-black uppercase px-3 py-1 rounded-full text-white tracking-widest mb-4 inline-block">
            Featured Premiere
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
            The Final <span className="text-blue-500">Over</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mb-8 font-medium">
            An exclusive CricSocial original documentary following the untold
            stories of the 2024 World Cup comeback.
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-blue-500 hover:text-white transition-all active:scale-95"
            >
              Watch Now
            </button>
            <button
              type="button"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-black uppercase tracking-widest rounded-2xl border border-white/10 hover:bg-white/20 transition-all"
            >
              + My List
            </button>
          </div>
        </div>
      </header>

      {/* Movie Grid Section */}
      <section className="p-6 md:px-20 py-12">
        <h2 className="text-2xl font-black text-white uppercase italic mb-8">
          Fan Favorites
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="aspect-[2/3] bg-slate-900 rounded-2xl border border-white/5 overflow-hidden hover:border-blue-500/50 transition-all group cursor-pointer"
            >
              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
                <span className="text-slate-700 font-black italic">
                  POSTER {i}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Movies;
