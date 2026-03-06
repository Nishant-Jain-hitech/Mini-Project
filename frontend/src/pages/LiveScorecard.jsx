import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchMatchScorecard,
  fetchLiveMatches,
  fetchFallbackScorecard,
} from "../api/api";
import {
  MapPin,
  Calendar,
  Trophy,
  Zap,
  ShieldCheck,
  Target,
} from "lucide-react";

const LiveScorecard = () => {
  const [activeInning, setActiveInning] = useState(0);

  const { data: match, isLoading } = useQuery({
    queryKey: ["liveScorecard"],
    queryFn: async () => {
      try {
        const liveMatchesRes = await fetchLiveMatches();
        
        const matchesList = liveMatchesRes?.data?.data || [];
        
        let matchId = "ea479cff-ddbe-48e0-9e4a-528f61a8a175";

        if (Array.isArray(matchesList) && matchesList.length > 0) {
          matchId = matchesList[0].id;
        }

        const result = await fetchMatchScorecard(matchId);
        
        const scorecardData = result?.data?.data || result?.data;

        if (!scorecardData || !scorecardData.scorecard) {
          throw new Error("Invalid scorecard structure");
        }

        return scorecardData;
      } catch (err) {
        const fallback = await fetchFallbackScorecard();
        return {
          ...(fallback?.data?.data || fallback?.data),
          isFallback: true,
        };
      }
    },
    staleTime: 30000,
  });

  useEffect(() => {
    if (match?.scorecard?.length > 0) {
      setActiveInning(match.scorecard.length - 1);
    }
  }, [match]);

  if (isLoading && !match) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const scorecard = match?.scorecard || [];
  const currentData = scorecard[activeInning];

  return (
    <div className="min-h-screen bg-[#020617] font-poppins text-white">
      <div className="pt-24 md:pt-32 px-4 md:px-8 pb-12 max-w-7xl mx-auto">
        {match?.isFallback && (
          <div className="mb-6 flex justify-center">
            <span className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] px-4 py-1.5 rounded-full uppercase font-black tracking-widest">
              Live Data Unavailable • Showing Fallback
            </span>
          </div>
        )}

        <header className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-6 md:p-10 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Trophy size={120} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-blue-600/20 text-blue-500 text-[10px] font-black uppercase px-3 py-1 rounded-md border border-blue-500/20">
                {match?.matchType || "Match"}
              </span>
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">
                {match?.name}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-4">
                  {match?.status}
                </h1>
                <div className="flex flex-wrap gap-4 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-blue-500" />{" "}
                    {match?.venue}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-blue-500" />{" "}
                    {match?.date}
                  </span>
                </div>
              </div>

              <div className="flex justify-between md:justify-end gap-10 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
                {match?.score?.map((s, i) => (
                  <div key={i} className="text-center md:text-right">
                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-1">
                      {match?.teamInfo?.[i]?.shortname ||
                        match?.teams?.[i] ||
                        "Team"}
                    </p>
                    <p className="text-2xl font-black italic">
                      {s.r}/{s.w}
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold">
                      {s.o} OV
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="flex gap-2 mb-6 bg-white/5 p-1.5 rounded-2xl w-fit">
          {scorecard.map((inn, idx) => (
            <button
              key={idx}
              onClick={() => setActiveInning(idx)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeInning === idx
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {inn.inning?.split("Inning")[0] || `Innings ${idx + 1}`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
              <div className="px-8 py-5 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
                <Zap size={16} className="text-yellow-500" />
                <h3 className="text-xs font-black uppercase tracking-widest">
                  Batting Stats
                </h3>
              </div>

              <div className="md:hidden p-4 space-y-3">
                {currentData?.batting?.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white/5 rounded-2xl p-4 border border-white/5"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-blue-400 font-bold text-sm">
                          {p.batsman?.name}
                        </p>
                        <p className="text-[9px] text-slate-500 uppercase leading-tight">
                          {p.dismissalText || "Not Out"}
                        </p>
                      </div>
                      <p className="text-xl font-black">
                        {p.r}
                        <span className="text-[10px] text-slate-500 font-normal ml-1">
                          ({p.b})
                        </span>
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center pt-3 border-t border-white/5">
                      <div>
                        <p className="text-[8px] text-slate-500 font-black">
                          4s
                        </p>
                        <p className="text-xs font-bold">{p["4s"]}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-slate-500 font-black">
                          6s
                        </p>
                        <p className="text-xs font-bold">{p["6s"]}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-slate-500 font-black">
                          SR
                        </p>
                        <p className="text-xs font-bold text-blue-500">
                          {p.sr}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden md:block p-6">
                <table className="w-full">
                  <thead>
                    <tr className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] border-b border-white/5">
                      <th className="pb-4 text-left">Batsman</th>
                      <th className="pb-4 text-center">R</th>
                      <th className="pb-4 text-center">B</th>
                      <th className="pb-4 text-center">4s</th>
                      <th className="pb-4 text-center">6s</th>
                      <th className="pb-4 text-right">SR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {currentData?.batting?.map((p, i) => (
                      <tr key={i} className="group hover:bg-white/[0.02]">
                        <td className="py-4">
                          <p className="text-sm font-bold text-blue-400">
                            {p.batsman?.name}
                          </p>
                          <p className="text-[9px] text-slate-500 uppercase">
                            {p.dismissalText || "Not Out"}
                          </p>
                        </td>
                        <td className="text-center font-black">{p.r}</td>
                        <td className="text-center text-slate-400 text-sm">
                          {p.b}
                        </td>
                        <td className="text-center text-slate-400 text-sm">
                          {p["4s"]}
                        </td>
                        <td className="text-center text-slate-400 text-sm">
                          {p["6s"]}
                        </td>
                        <td className="text-right font-bold text-blue-500 text-sm">
                          {p.sr}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
              <div className="px-8 py-5 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
                <Target size={16} className="text-red-500" />
                <h3 className="text-xs font-black uppercase tracking-widest">
                  Bowling Stats
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full p-6 block md:table">
                  <thead className="hidden md:table-header-group">
                    <tr className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                      <th className="p-6 text-left">Bowler</th>
                      <th className="text-center">O</th>
                      <th className="text-center">M</th>
                      <th className="text-center">R</th>
                      <th className="text-center">W</th>
                      <th className="text-right pr-8">ECO</th>
                    </tr>
                  </thead>
                  <tbody className="block md:table-row-group">
                    {currentData?.bowling?.map((b, i) => (
                      <tr
                        key={i}
                        className="border-b border-white/5 last:border-0 block md:table-row"
                      >
                        <td className="p-4 md:p-6 block md:table-cell">
                          <p className="text-sm font-bold text-white">
                            {b.bowler?.name}
                          </p>
                        </td>
                        <td className="px-4 py-2 md:p-0 text-center inline-block md:table-cell">
                          <span className="md:hidden text-[8px] text-slate-500 block">
                            O
                          </span>{" "}
                          {b.o}
                        </td>
                        <td className="px-4 py-2 md:p-0 text-center inline-block md:table-cell">
                          <span className="md:hidden text-[8px] text-slate-500 block">
                            M
                          </span>{" "}
                          {b.m}
                        </td>
                        <td className="px-4 py-2 md:p-0 text-center inline-block md:table-cell">
                          <span className="md:hidden text-[8px] text-slate-500 block">
                            R
                          </span>{" "}
                          {b.r}
                        </td>
                        <td className="px-4 py-2 md:p-0 text-center inline-block md:table-cell font-black text-red-500">
                          <span className="md:hidden text-[8px] text-slate-500 block">
                            W
                          </span>{" "}
                          {b.w}
                        </td>
                        <td className="px-4 py-2 md:p-0 text-right md:pr-8 inline-block md:table-cell font-bold text-slate-400">
                          {b.eco}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-8 shadow-xl">
              <ShieldCheck className="mb-4 text-white/50" size={32} />
              <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-2">
                Toss Update
              </h4>
              <p className="text-white font-bold italic uppercase leading-tight">
                {match?.tossWinner || "Information"} won the toss and elected to{" "}
                {match?.tossChoice || "play"}.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
              <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                Innings Summary
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Extras
                  </span>
                  <span className="text-sm font-black">
                    {currentData?.extras?.t || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Total Score
                  </span>
                  <span className="text-lg font-black text-blue-500">
                    {currentData?.totals?.r || 0}/{currentData?.totals?.w || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Run Rate
                  </span>
                  <span className="text-sm font-black italic">
                    {currentData?.totals?.rr || "0.0"}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LiveScorecard;