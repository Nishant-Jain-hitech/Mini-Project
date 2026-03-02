// import React, { useState, useEffect } from 'react';
// import { fetchMatchScorecard } from '../api/api';

// const LiveScorecard = () => {
//   const [match, setMatch] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const DEFAULT_MATCH_ID = "ea479cff-ddbe-48e0-9e4a-528f61a8a175"; 

//   useEffect(() => {
//     const getScoreData = async () => {
//       setLoading(true);
//       const result = await fetchMatchScorecard(DEFAULT_MATCH_ID);
      
//       if (result && result.status === "success") {
//         setMatch(result.data);
//       } else {
//         setError("Could not load live scores. Check API credits.");
//       }
//       setLoading(false);
//     };

//     getScoreData();
//     // Optional: Set interval for auto-refresh every 60 seconds
//     const interval = setInterval(getScoreData, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#020617] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-blue-500 font-black uppercase tracking-widest text-xs">Syncing Live Data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !match) {
//     return (
//       <div className="min-h-screen bg-[#020617] flex items-center justify-center p-8 text-center">
//         <div className="bg-slate-900 border border-white/10 p-10 rounded-[2rem]">
//           <p className="text-red-500 font-bold mb-4">{error || "No Match Data Found"}</p>
//           <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-2 rounded-xl text-xs font-black uppercase">Try Again</button>
//         </div>
//       </div>
//     );
//   }

//   // Extracting data for cleaner UI access
//   const currentInnings = match.scorecard?.[match.scorecard.length - 1];
//   const battingStats = currentInnings?.batting || [];
//   const bowlingStats = currentInnings?.bowling || [];

//   return (
//     <div className="min-h-screen bg-[#020617] p-4 md:p-8 animate-in fade-in duration-700">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Main Score Header */}
//         <header className="bg-slate-900 border border-white/10 rounded-[2rem] p-6 md:p-10 mb-8 relative overflow-hidden shadow-2xl">
//           <div className="absolute top-0 right-0 p-6">
//             <span className="flex items-center gap-2 bg-red-600/10 border border-red-600/20 px-4 py-2 rounded-full">
//               <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
//               <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">
//                 {match.status?.includes("Live") ? "Live" : "Finished"} • {match.venue}
//               </span>
//             </span>
//           </div>

//           <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4">
//             <div className="text-center md:text-left">
//               <div className="flex items-center gap-3 mb-2">
//                 <h3 className="text-white font-black uppercase tracking-widest text-sm">{match.teams[0]}</h3>
//               </div>
//               <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
//                 {match.score?.[0]?.inning}: {match.score?.[0]?.r}/{match.score?.[0]?.w} ({match.score?.[0]?.o} ov)
//               </p>
//             </div>

//             <div className="text-center">
//               <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{match.matchType.toUpperCase()}</p>
//               <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic">
//                 {match.score?.[match.score.length - 1]?.r}/{match.score?.[match.score.length - 1]?.w}
//               </h2>
//               <p className="text-blue-500 font-bold mt-2 text-sm uppercase tracking-tighter">{match.status}</p>
//             </div>

//             <div className="text-center md:text-right">
//               <div className="flex items-center gap-3 mb-2 justify-center md:justify-end">
//                 <h3 className="text-white font-black uppercase tracking-widest text-sm">{match.teams[1]}</h3>
//               </div>
//               <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
//                 {match.score?.[1]?.inning || "Yet to bat"}
//               </p>
//             </div>
//           </div>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           <div className="lg:col-span-2 space-y-6">
//             {/* Batting Table */}
//             <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
//               <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
//                 <h4 className="text-white text-xs font-black uppercase tracking-widest">Batter ({currentInnings?.inning})</h4>
//                 <div className="flex gap-8 text-[10px] font-bold text-slate-500 uppercase">
//                   <span className="w-8 text-center">R</span>
//                   <span className="w-8 text-center">B</span>
//                   <span className="w-8 text-center">4s</span>
//                   <span className="w-8 text-center">6s</span>
//                   <span className="w-12 text-center">SR</span>
//                 </div>
//               </div>
//               <div className="p-2">
//                 {battingStats.length > 0 ? battingStats.map((player, idx) => (
//                   <div key={idx} className="flex justify-between items-center px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
//                     <div className="flex flex-col">
//                       <span className="text-sm font-bold text-blue-400">{player.batsman?.name}</span>
//                       <span className="text-[9px] text-slate-500 uppercase font-medium">{player.dismissalText}</span>
//                     </div>
//                     <div className="flex gap-8 text-xs font-black text-white">
//                       <span className="w-8 text-center">{player.r}</span>
//                       <span className="w-8 text-center text-slate-500">{player.b}</span>
//                       <span className="w-8 text-center text-slate-500">{player["4s"]}</span>
//                       <span className="w-8 text-center text-slate-500">{player["6s"]}</span>
//                       <span className="w-12 text-center text-slate-500">{player.sr}</span>
//                     </div>
//                   </div>
//                 )) : <p className="text-slate-500 text-xs p-4">No batting data available yet.</p>}
//               </div>
//             </div>

//             {/* Bowling Table */}
//             <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
//               <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
//                 <h4 className="text-white text-xs font-black uppercase tracking-widest">Bowler</h4>
//                 <div className="flex gap-8 text-[10px] font-bold text-slate-500 uppercase">
//                   <span className="w-8 text-center">O</span>
//                   <span className="w-8 text-center">M</span>
//                   <span className="w-8 text-center">R</span>
//                   <span className="w-8 text-center">W</span>
//                   <span className="w-12 text-center">EC</span>
//                 </div>
//               </div>
//               <div className="p-2">
//                 {bowlingStats.length > 0 ? bowlingStats.map((player, idx) => (
//                   <div key={idx} className="flex justify-between items-center px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
//                     <span className="text-sm font-bold text-slate-300">{player.bowler?.name}</span>
//                     <div className="flex gap-8 text-xs font-black text-white">
//                       <span className="w-8 text-center">{player.o}</span>
//                       <span className="w-8 text-center text-slate-500">{player.m}</span>
//                       <span className="w-8 text-center text-slate-500">{player.r}</span>
//                       <span className="w-8 text-center text-blue-500">{player.w}</span>
//                       <span className="w-12 text-center text-slate-500">{player.eco}</span>
//                     </div>
//                   </div>
//                 )) : <p className="text-slate-500 text-xs p-4">No bowling data available.</p>}
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
//               <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">Match Info</h4>
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-slate-500 text-[9px] uppercase font-bold">Venue</p>
//                   <p className="text-slate-200 text-xs font-bold">{match.venue}</p>
//                 </div>
//                 <div>
//                   <p className="text-slate-500 text-[9px] uppercase font-bold">Date</p>
//                   <p className="text-slate-200 text-xs font-bold">{match.date}</p>
//                 </div>
//                 <div>
//                   <p className="text-slate-500 text-[9px] uppercase font-bold">Toss</p>
//                   <p className="text-slate-200 text-xs font-bold">{match.tossWinner} won and chose to {match.tossChoice}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveScorecard;



import React from 'react'

export default function LiveScorecard() {
  return (
    <div>LiveScorecard</div>
  )
}
