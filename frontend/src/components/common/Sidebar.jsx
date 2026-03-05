import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  X,
  Home,
  Trophy,
  Calendar,
  Clapperboard,
  ChevronDown,
} from "lucide-react";

const Sidebar = ({ isMobileOpen, toggleSidebar }) => {
  const [userVote, setUserVote] = useState(null);
  const [votes, setVotes] = useState({ ind: 65, aus: 35 });
  const [isTrendingOpen, setIsTrendingOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("International");

  const categories = [
    { id: "cat-intl", name: "International" },
    { id: "cat-ipl", name: "IPL 2026" },
    { id: "cat-bb", name: "Big Bash" },
  ];

  const allMatchData = {
    International: [
      { id: "match-intl-1", teams: "IND vs AUS", fans: "2.4k" },
      { id: "match-intl-2", teams: "ENG vs NZ", fans: "1.1k" },
    ],
    "IPL 2026": [
      { id: "match-ipl-1", teams: "CSK vs MI", fans: "5.8k" },
      { id: "match-ipl-2", teams: "RCB vs KKR", fans: "4.2k" },
    ],
    "Big Bash": [
      { id: "match-bb-1", teams: "SS vs MS", fans: "800" },
      { id: "match-bb-2", teams: "BH vs AS", fans: "650" },
    ],
  };

  const handleVote = (team) => {
    if (userVote === team) return;
    setVotes((prev) => {
      const newVotes = { ...prev };
      if (userVote) newVotes[userVote] -= 1;
      newVotes[team] += 1;
      return newVotes;
    });
    setUserVote(team);
  };

  const handleUndo = () => {
    if (!userVote) return;
    setVotes((prev) => ({ ...prev, [userVote]: prev[userVote] - 1 }));
    setUserVote(null);
  };

  const navLinkStyles = ({ isActive }) => `
    flex items-center gap-3.5 p-3.5 rounded-xl transition-all duration-300 group font-poppins
    ${
      isActive
        ? "text-white bg-blue-600 shadow-[0_10px_20px_rgba(37,99,235,0.2)]"
        : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
    }
  `;

  return (
    <>
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[150]"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 lg:top-[65px] left-0 z-[160]
          h-full lg:h-[calc(100vh-65px)] bg-slate-950 border-r border-white/[0.08]
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${isMobileOpen ? "translate-x-0 w-[280px]" : "-translate-x-full lg:translate-x-0 w-[280px]"}
          flex flex-col font-poppins
        `}
      >
        <div className="lg:hidden flex items-center justify-between p-6 border-b border-white/[0.05]">
          <span className="text-lg font-black tracking-tighter text-white uppercase italic">
            CRIC<span className="text-blue-500">SOCIAL</span>
          </span>
          <button
            onClick={toggleSidebar}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto no-scrollbar flex-1">
          <nav className="space-y-1.5 mb-8">
            <NavLink
              to="/home"
              onClick={() => isMobileOpen && toggleSidebar()}
              className={navLinkStyles}
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold text-[13px] uppercase tracking-wider">
                Home
              </span>
            </NavLink>

            <NavLink
              to="/pavilion"
              onClick={() => isMobileOpen && toggleSidebar()}
              className={navLinkStyles}
            >
              <Trophy className="w-5 h-5" />
              <div className="flex flex-1 items-center justify-between">
                <span className="font-semibold text-[13px] uppercase tracking-wider">
                  Pavilion
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              </div>
            </NavLink>

            <NavLink
              to="/series"
              onClick={() => isMobileOpen && toggleSidebar()}
              className={navLinkStyles}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-semibold text-[13px] uppercase tracking-wider">
                Series
              </span>
            </NavLink>

            <NavLink
              to="/cinema"
              onClick={() => isMobileOpen && toggleSidebar()}
              className={navLinkStyles}
            >
              <Clapperboard className="w-5 h-5" />
              <span className="font-semibold text-[13px] uppercase tracking-wider">
                Cinema
              </span>
            </NavLink>
          </nav>

          <div className="bg-white/[0.03] rounded-2xl border border-white/[0.05] p-4">
            <button
              onClick={() => setIsTrendingOpen(!isTrendingOpen)}
              className="w-full flex items-center justify-between group mb-4"
            >
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-blue-400 transition-colors">
                Trending Pavilion
              </h3>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isTrendingOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isTrendingOpen && (
              <div className="space-y-4">
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`text-[9px] font-bold uppercase whitespace-nowrap px-3 py-1.5 rounded-lg transition-all
                        ${selectedCategory === cat.name ? "bg-blue-600 text-white" : "bg-white/[0.05] text-slate-500"}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {allMatchData[selectedCategory].map((match) => (
                    <button
                      key={match.id}
                      className="w-full text-left p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] transition-all group"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[11px] font-bold text-slate-200 group-hover:text-blue-400 uppercase tracking-wide">
                          {match.teams}
                        </p>
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                      </div>
                      <p className="text-[9px] text-slate-500 font-medium uppercase tracking-tight">
                        {match.fans} fans in booth
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 p-5 rounded-2xl bg-gradient-to-b from-blue-600/10 to-transparent border border-blue-500/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1 w-1 rounded-full bg-blue-500 animate-ping" />
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                Live Fan Poll
              </p>
            </div>

            <p className="text-[13px] text-white font-bold leading-snug mb-5">
              Who wins the 2nd Test at Adelaide?
            </p>

            <div className="space-y-5">
              <button
                onClick={() => handleVote("ind")}
                className="w-full group"
              >
                <div className="flex justify-between items-center text-[10px] font-bold mb-2">
                  <span
                    className={
                      userVote === "ind"
                        ? "text-blue-400"
                        : "text-slate-400 group-hover:text-slate-200"
                    }
                  >
                    TEAM INDIA {userVote === "ind" && "✓"}
                  </span>
                  <span className="text-slate-500">{votes.ind}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${userVote === "ind" ? "bg-blue-500" : "bg-slate-700"}`}
                    style={{ width: `${votes.ind}%` }}
                  />
                </div>
              </button>

              <button
                onClick={() => handleVote("aus")}
                className="w-full group"
              >
                <div className="flex justify-between items-center text-[10px] font-bold mb-2">
                  <span
                    className={
                      userVote === "aus"
                        ? "text-blue-400"
                        : "text-slate-400 group-hover:text-slate-200"
                    }
                  >
                    AUSTRALIA {userVote === "aus" && "✓"}
                  </span>
                  <span className="text-slate-500">{votes.aus}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${userVote === "aus" ? "bg-blue-500" : "bg-slate-700"}`}
                    style={{ width: `${votes.aus}%` }}
                  />
                </div>
              </button>
            </div>

            {userVote && (
              <button
                onClick={handleUndo}
                className="w-full mt-6 py-2.5 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-colors bg-white/[0.02] rounded-lg border border-white/[0.05]"
              >
                Reset Vote
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isMobileOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
