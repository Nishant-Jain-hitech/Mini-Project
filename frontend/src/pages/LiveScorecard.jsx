import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchMatchScorecard,
  fetchLiveMatches,
  fetchFallbackScorecard,
  fetchNews,
} from "../api/api";

const LiveScorecard = () => {
  const {
    data: match,
    isLoading: matchLoading,
    error: matchError,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["liveScorecard"],
    queryFn: async () => {
      try {
        const liveMatches = await fetchLiveMatches();
        let matchId = "ea479cff-ddbe-48e0-9e4a-528f61a8a175";

        if (liveMatches?.status === "success" && liveMatches.data?.length > 0) {
          matchId = liveMatches.data[0].id;
        }

        const result = await fetchMatchScorecard(matchId);
        return result.data;
      } catch (err) {
        const fallback = await fetchFallbackScorecard();
        return { ...fallback.data, isFallback: true };
      }
    },
    staleTime: 30000,
    refetchInterval: 30000,
  });

  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ["cricketNews"],
    queryFn: fetchNews,
    staleTime: 300000,
  });

  if (matchLoading && !match) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-500 font-black uppercase tracking-widest text-xs">
            Syncing Live Data...
          </p>
        </div>
      </div>
    );
  }

  const hasScorecard = match?.scorecard && match.scorecard.length > 0;
  const currentInnings = hasScorecard
    ? match.scorecard[match.scorecard.length - 1]
    : null;
  const battingStats = currentInnings?.batting || [];
  const bowlingStats = currentInnings?.bowling || [];

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-8 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        {match?.isFallback && (
          <div className="mb-4 bg-red-600/10 border border-red-600/20 p-4 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center">
            ⚠️ Live API Limit Reached. Showing Fallback Data from Backend.
          </div>
        )}

        <header className="bg-slate-900 border border-white/10 rounded-[2rem] p-6 md:p-10 mb-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-6">
            <span className="flex items-center gap-2 bg-red-600/10 border border-red-600/20 px-4 py-2 rounded-full">
              <span
                className={`w-2 h-2 rounded-full bg-red-600 ${match?.status?.includes("Live") ? "animate-pulse" : ""}`}
              />
              <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">
                {match?.status?.includes("Live") ? "Live" : "Match Update"} •{" "}
                {match?.venue}
              </span>
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4">
            <div className="text-center md:text-left">
              <h3 className="text-white font-black uppercase tracking-widest text-sm">
                {match?.teams?.[0]}
              </h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                {match?.score?.[0]?.inning || "Innings 1"}:{" "}
                {match?.score?.[0]?.r || 0}/{match?.score?.[0]?.w || 0} (
                {match?.score?.[0]?.o || 0} ov)
              </p>
            </div>

            <div className="text-center">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                {match?.matchType?.toUpperCase()}
              </p>
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic">
                {match?.score?.[match?.score?.length - 1]?.r || 0}/
                {match?.score?.[match?.score?.length - 1]?.w || 0}
              </h2>
              <p className="text-blue-500 font-bold mt-2 text-sm uppercase tracking-tighter">
                {match?.status}
              </p>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-white font-black uppercase tracking-widest text-sm">
                {match?.teams?.[1]}
              </h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                {match?.score?.[1]?.inning || "Yet to bat"}
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {hasScorecard ? (
              <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
                  <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
                    <h4 className="text-white text-xs font-black uppercase tracking-widest">
                      Batting: {currentInnings?.inning}
                    </h4>
                    <div className="flex gap-4 md:gap-8 text-[10px] font-bold text-slate-500 uppercase">
                      <span className="w-8 text-center">R</span>
                      <span className="w-8 text-center">B</span>
                      <span className="w-8 text-center">4s</span>
                      <span className="w-8 text-center">6s</span>
                      <span className="w-12 text-center">SR</span>
                    </div>
                  </div>
                  <div className="p-2">
                    {battingStats.map((player, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-blue-400">
                            {player.batsman?.name}
                          </span>
                          <span className="text-[9px] text-slate-500 uppercase font-medium">
                            {player.dismissalText}
                          </span>
                        </div>
                        <div className="flex gap-4 md:gap-8 text-xs font-black text-white">
                          <span className="w-8 text-center">{player.r}</span>
                          <span className="w-8 text-center text-slate-500">
                            {player.b}
                          </span>
                          <span className="w-8 text-center text-slate-500">
                            {player["4s"]}
                          </span>
                          <span className="w-8 text-center text-slate-500">
                            {player["6s"]}
                          </span>
                          <span className="w-12 text-center text-slate-500">
                            {player.sr}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">
                  Scorecard Unavailable
                </h4>
                <p className="text-slate-500 text-[10px] max-w-xs leading-relaxed font-bold uppercase tracking-tighter">
                  Detailed stats unavailable for this match.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">
                Trending News
              </h4>
              <div className="space-y-4">
                {newsLoading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-white/5 rounded w-3/4"></div>
                    <div className="h-4 bg-white/5 rounded w-1/2"></div>
                  </div>
                ) : (
                  news?.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-white/5 pb-3 last:border-0"
                    >
                      <span className="text-blue-500 text-[8px] font-black uppercase tracking-widest">
                        {item.category}
                      </span>
                      <p className="text-white text-xs font-bold mt-1 leading-snug">
                        {item.title}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">
                Match Analytics
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-500 text-[9px] uppercase font-bold">
                    Venue
                  </p>
                  <p className="text-slate-200 text-xs font-bold">
                    {match?.venue || "TBD"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 text-[9px] uppercase font-bold">
                    Match Date
                  </p>
                  <p className="text-slate-200 text-xs font-bold">
                    {match?.date || "N/A"}
                  </p>
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
