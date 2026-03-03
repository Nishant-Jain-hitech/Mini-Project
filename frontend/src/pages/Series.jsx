import React from "react";

const Series = () => {
  const seriesData = [
    {
      id: 1,
      title: "India tour of Australia",
      subtitle: "Border-Gavaskar Trophy",
      date: "Nov 2025 - Jan 2026",
      status: "Live",
      format: "Test",
      teams: ["🇮🇳", "🇦🇺"],
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "IPL 2026",
      subtitle: "Indian Premier League",
      date: "Mar 2026 - May 2026",
      status: "Upcoming",
      format: "T20",
      teams: ["🏏"],
      image:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "The Ashes",
      subtitle: "ENG vs AUS",
      date: "June 2026",
      status: "Scheduled",
      format: "Test",
      teams: ["🏴󠁧󠁢󠁥󠁮󠁧󠁿", "🇦🇺"],
      image:
        "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=500&auto=format&fit=crop",
    },
  ];

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
          Cricket Series
        </h1>
        <p className="text-slate-400 mt-2 font-medium">
          Explore major tournaments and international tours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seriesData.map((item) => (
          <div
            key={item.id}
            className="group relative bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
          >
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10" />
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
              />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    item.status === "Live"
                      ? "bg-red-600 animate-pulse"
                      : "bg-blue-600"
                  }`}
                >
                  {item.status}
                </span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">
                  {item.format}
                </span>
              </div>
            </div>

            <div className="p-6 relative z-20">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black text-white leading-tight group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-bold mt-1">
                    {item.subtitle}
                  </p>
                </div>
                <div className="flex -space-x-2">
                  {item.teams.map((emoji) => (
                    <div
                      key={`${item.id}-${emoji}`}
                      className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-sm shadow-xl"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-500 mb-6">
                <span className="text-xs font-bold">📅 {item.date}</span>
              </div>

              <button
                type="button"
                className="w-full py-3 bg-white/5 hover:bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl border border-white/10 hover:border-blue-500 transition-all active:scale-95"
              >
                View Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Series;
