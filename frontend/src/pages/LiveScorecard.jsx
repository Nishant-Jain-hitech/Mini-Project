import React from 'react';

const LiveScorecard = () => {
  const battingStats = [
    { name: 'Steven Smith', runs: 84, balls: 112, fours: 9, sixes: 1, sr: 75.0, active: true },
    { name: 'Travis Head', runs: 42, balls: 56, fours: 5, sixes: 0, sr: 75.0, active: true },
  ];

  const bowlingStats = [
    { name: 'Jasprit Bumrah', overs: 18, maidens: 4, runs: 52, wickets: 2, econ: 2.8 },
    { name: 'R. Ashwin', overs: 22, maidens: 2, runs: 78, wickets: 1, econ: 3.5 },
  ];

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-8 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Score Header */}
        <header className="bg-slate-900 border border-white/10 rounded-[2rem] p-6 md:p-10 mb-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-6">
            <span className="flex items-center gap-2 bg-red-600/10 border border-red-600/20 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">Live • Adelaide Oval</span>
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🇦🇺</span>
                <h3 className="text-white font-black uppercase tracking-widest text-sm">Australia</h3>
              </div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">1st Inn: 312 | 2nd Inn (Current)</p>
            </div>

            <div className="text-center">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">2nd Test • Day 4</p>
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic">284/4</h2>
              <p className="text-blue-500 font-bold mt-2 text-sm uppercase tracking-tighter">Australia lead by 112 runs</p>
            </div>

            <div className="text-center md:text-right">
              <div className="flex items-center gap-3 mb-2 justify-center md:justify-end">
                <h3 className="text-white font-black uppercase tracking-widest text-sm">India</h3>
                <span className="text-2xl">🇮🇳</span>
              </div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">1st Inn: 484</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left/Middle Column: Scoreboard Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Batting Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
                <h4 className="text-white text-xs font-black uppercase tracking-widest">Batter</h4>
                <div className="flex gap-8 text-[10px] font-bold text-slate-500 uppercase">
                  <span className="w-8 text-center">R</span>
                  <span className="w-8 text-center">B</span>
                  <span className="w-8 text-center">4s</span>
                  <span className="w-8 text-center">6s</span>
                  <span className="w-12 text-center">SR</span>
                </div>
              </div>
              <div className="p-2">
                {battingStats.map((player) => (
                  <div key={player.name} className="flex justify-between items-center px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
                    <span className={`text-sm font-bold ${player.active ? 'text-blue-400' : 'text-slate-300'}`}>
                      {player.name} {player.active && '*'}
                    </span>
                    <div className="flex gap-8 text-xs font-black text-white">
                      <span className="w-8 text-center">{player.runs}</span>
                      <span className="w-8 text-center text-slate-500">{player.balls}</span>
                      <span className="w-8 text-center text-slate-500">{player.fours}</span>
                      <span className="w-8 text-center text-slate-500">{player.sixes}</span>
                      <span className="w-12 text-center text-slate-500">{player.sr}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bowling Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
                <h4 className="text-white text-xs font-black uppercase tracking-widest">Bowler</h4>
                <div className="flex gap-8 text-[10px] font-bold text-slate-500 uppercase">
                  <span className="w-8 text-center">O</span>
                  <span className="w-8 text-center">M</span>
                  <span className="w-8 text-center">R</span>
                  <span className="w-8 text-center">W</span>
                  <span className="w-12 text-center">EC</span>
                </div>
              </div>
              <div className="p-2">
                {bowlingStats.map((player) => (
                  <div key={player.name} className="flex justify-between items-center px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
                    <span className="text-sm font-bold text-slate-300">{player.name}</span>
                    <div className="flex gap-8 text-xs font-black text-white">
                      <span className="w-8 text-center">{player.overs}</span>
                      <span className="w-8 text-center text-slate-500">{player.maidens}</span>
                      <span className="w-8 text-center text-slate-500">{player.runs}</span>
                      <span className="w-8 text-center text-blue-500">{player.wickets}</span>
                      <span className="w-12 text-center text-slate-500">{player.econ}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commentary Feed */}
            <div className="space-y-4">
               <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] px-2">Live Commentary</h4>
               {[
                 { over: '74.2', text: 'Bumrah to Smith, FOUR! Classy punch through covers. Smith reaches his 80s in style.', type: 'boundary' },
                 { over: '74.1', text: 'Bumrah to Smith, no run. Solid defense back to the bowler.', type: 'dot' },
                 { over: '73.6', text: 'Ashwin to Head, 1 run. Tucked away to square leg for a single.', type: 'run' }
               ].map((item, i) => (
                 <div key={i} className="bg-white/5 border border-white/5 p-5 rounded-2xl flex gap-6 items-start">
                   <span className="text-blue-500 font-black text-sm">{item.over}</span>
                   <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* Right Column: Match Info / Sidebar */}
          <div className="space-y-6">
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-6">
              <h4 className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">Win Probability</h4>
              <div className="flex h-3 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-blue-500" style={{ width: '65%' }} />
                <div className="h-full bg-slate-600" style={{ width: '10%' }} />
                <div className="h-full bg-white/20" style={{ width: '25%' }} />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                <span>AUS 65%</span>
                <span>Draw 10%</span>
                <span>IND 25%</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">Match Info</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-500 text-[9px] uppercase font-bold">Series</p>
                  <p className="text-slate-200 text-xs font-bold">Border-Gavaskar Trophy</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[9px] uppercase font-bold">Umpires</p>
                  <p className="text-slate-200 text-xs font-bold">Richard Kettleborough, Nitin Menon</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[9px] uppercase font-bold">Toss</p>
                  <p className="text-slate-200 text-xs font-bold">India won the toss and elected to bat</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LiveScorecard;