import React from 'react';

const FanClubs = () => {
  const clubs = [
    { id: 1, name: "The Blue Tigers", members: "45.2k", description: "The official home for India fans. Discussions, watch parties, and exclusive memes.", icon: "🇮🇳" },
    { id: 2, name: "Baggy Green Brigade", members: "28.9k", description: "Uniting Australian cricket fans globally. Tactical analysis and historic highlights.", icon: "🇦🇺" },
    { id: 3, name: "The Barmy Army Hub", members: "31.5k", description: "Singing through the Test matches. For England fans who never stop cheering.", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] p-6 md:p-16 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter">Fan Clubs</h1>
          <p className="text-slate-400 mt-2 font-medium">Find your tribe. Join specialized fan communities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div key={club.id} className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl hover:bg-slate-900 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-6 group-hover:border-blue-500/50 transition-colors">
                {club.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-2">{club.name}</h3>
              <p className="text-blue-500 text-xs font-black uppercase mb-4 tracking-widest">{club.members} Members</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">{club.description}</p>
              <button type="button" className="w-full py-3 border border-white/10 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">
                Join Club
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FanClubs;