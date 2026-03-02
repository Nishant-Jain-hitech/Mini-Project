import React from 'react';

const Cinema = () => {
  const media = [
    {
      id: 1,
      title: "MS Dhoni: The Untold Story",
      type: "Movie",
      category: "Biopic",
      rating: "8.5",
      year: "2016",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUtKl0XWIsxOliIYaH5xZHG4Drtz37EZIs16TmOTQv7ppBYoOIh6_c7opQhHCVS_wpwC4uQXg2mS1Tp98RAs1oGX1B6hl2KzfdA0oR_PI4Q&s=10", // Exact link retained
      description: "The life of MS Dhoni, from a ticket collector to the World Cup-winning captain of India."
    },
    {
      id: 2,
      title: "Kaun Pravin Tambe?",
      type: "Movie",
      category: "Inspirational",
      rating: "8.2",
      year: "2022",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSUGI0esxMo7ab84MblFgV2-lnCkxDquRZ6-2xl8_hEFbnNTcI7nWVx_65dXvAIIKIzhe4_gNo9HGwd5TZlgDNEAF_omXmg-lOXEpOVd5&s=10", // Exact link retained
      description: "The extraordinary journey of a cricketer who made his professional debut at age 41."
    },
    {
      id: 3,
      title: "The Test",
      type: "Web Series",
      category: "Docu-series",
      rating: "8.9",
      year: "2020",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy-KHD_-C2Cnk_Ual23wRpvysaw57oDeFUveO4f9z-f9iZx38ZJyQLQimcX70qCfEmk97AXoeXdHPn4vySKimJpnE2PSZvjpLa1-yWwPVu&s=10", // Exact link retained
      description: "Inside the Australian Men's Cricket Team's journey of redemption."
    },
    {
      id: 4,
      title: "83",
      type: "Movie",
      category: "Historical",
      rating: "7.5",
      year: "2021",
      image: "https://static.toiimg.com/photo/87976035.jpeg", // Exact link retained
      description: "The story of India's incredible 1983 World Cup victory at Lord's."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <div className="relative h-[65vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
        <img
          src="https://static.toiimg.com/photo/87976035.jpeg" // Exact link retained
          // Object position adjusted to focus on faces and prevent cropping under the nav bar
          className="w-full h-full object-cover object-[center_25%] opacity-70 animate-in zoom-in duration-1000"
          alt="Featured"
        />
        <div className="absolute bottom-12 left-4 md:left-10 z-20 max-w-2xl">
          <span className="bg-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block shadow-lg shadow-blue-600/20">Featured Biopic</span>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 italic leading-none">83: THE GLORY</h1>
          <p className="text-slate-300 text-lg mb-6 line-clamp-2 font-medium">Experience the cinematic journey of Kapil's Devils as they conquered the world against all odds.</p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-8 py-3 rounded-xl font-black uppercase text-sm hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 active:scale-95">▶ Play Now</button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/10 px-8 py-3 rounded-xl font-black uppercase text-sm hover:bg-white/20 transition-all">Details</button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 -mt-2 relative z-30">
        <h2 className="text-xl font-black text-white uppercase tracking-widest mb-8 border-l-4 border-blue-600 pl-4">Fan Favorites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {media.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 group-hover:border-blue-500/50 transition-all shadow-2xl bg-slate-900">
                <img
                  src={item.image}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 duration-300">
                  <p className="text-white text-xs font-bold mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 line-clamp-3">{item.description}</p>
                  <button className="w-full py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-colors">Watch Trailer</button>
                </div>
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-yellow-500 text-[10px] font-black border border-white/10">
                  ★ {item.rating}
                </div>
              </div>
              <div className="mt-5 px-1">
                <h3 className="text-white font-black group-hover:text-blue-400 transition-colors uppercase text-sm tracking-tight leading-tight">{item.title}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">{item.year}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                  <span className="text-[10px] text-blue-500 font-black uppercase tracking-wider">{item.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cinema;