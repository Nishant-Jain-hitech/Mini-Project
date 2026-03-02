import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = ({ isMobileOpen, toggleSidebar }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState({ ind: 65, aus: 35 });

  const [isTrendingOpen, setIsTrendingOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("International");

  const categories = [
    { id: 'cat-intl', name: "International" },
    { id: 'cat-ipl', name: "IPL 2026" },
    { id: 'cat-bb', name: "Big Bash" }
  ];

  const allMatchData = {
    "International": [
      { id: 'match-intl-1', teams: "IND vs AUS", fans: "2.4k" },
      { id: 'match-intl-2', teams: "ENG vs NZ", fans: "1.1k" }
    ],
    "IPL 2026": [
      { id: 'match-ipl-1', teams: "CSK vs MI", fans: "5.8k" },
      { id: 'match-ipl-2', teams: "RCB vs KKR", fans: "4.2k" }
    ],
    "Big Bash": [
      { id: 'match-bb-1', teams: "SS vs MS", fans: "800" },
      { id: 'match-bb-2', teams: "BH vs AS", fans: "650" }
    ]
  };

  const handleVote = () => {
    if (!hasVoted) {
      setVotes({ ind: 66, aus: 34 });
      setHasVoted(true);
    }
  };

  const navLinkStyles = ({ isActive }) => `
    flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group
    ${isActive
      ? 'text-blue-500 bg-blue-500/10 border-r-4 border-blue-500 shadow-lg shadow-blue-500/5'
      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}
  `;

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close Sidebar Overlay"
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] cursor-default"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 lg:top-[60px] left-0 z-[60] lg:z-40
        h-full lg:h-[calc(100vh-60px)] bg-slate-950 border-r border-white/5
        transition-all duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 w-72 lg:w-72'}
        flex flex-col
      `}>

        <div className="lg:hidden flex items-center justify-between p-6 border-b border-white/5">
          <span className="text-xl font-black tracking-tighter text-white uppercase">Menu</span>
          <button 
            type="button"
            onClick={toggleSidebar} 
            className="p-2 -mr-2 text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <nav className="space-y-2">
            <NavLink to="/" onClick={() => isMobileOpen && toggleSidebar()} className={navLinkStyles}>
              <span className="text-xl">🏠</span>
              <span className="font-bold text-sm">Home</span>
            </NavLink>

            <NavLink to="/pavilion" onClick={() => isMobileOpen && toggleSidebar()} className={navLinkStyles}>
              <span className="text-xl">🏏</span>
              <div className="flex flex-1 items-center justify-between">
                <span className="font-bold text-sm">Pavilion</span>
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
            </NavLink>

            <NavLink to="/series" onClick={() => isMobileOpen && toggleSidebar()} className={navLinkStyles}>
              <span className="text-xl">📅</span>
              <span className="font-bold text-sm">Series</span>
            </NavLink>

            <NavLink to="/cinema" onClick={() => isMobileOpen && toggleSidebar()} className={navLinkStyles}>
              <span className="text-xl">🎬</span>
              <span className="font-bold text-sm">Cinema</span>
            </NavLink>
          </nav>
        </div>

        <div className="px-6 py-4 flex-1 overflow-y-auto no-scrollbar">
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setIsTrendingOpen(!isTrendingOpen)}
              className="w-full flex items-center justify-between group"
            >
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-slate-300 transition-colors">
                Trending Pavilion
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${isTrendingOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isTrendingOpen && (
              <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex flex-wrap gap-2 mb-4 border-b border-white/5 pb-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`text-[9px] font-black uppercase px-2 py-1 rounded transition-all
                        ${selectedCategory === cat.name
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {allMatchData[selectedCategory].map((match) => (
                    <button
                      key={match.id}
                      type="button"
                      className="w-full text-left group cursor-pointer p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-xs font-bold text-white group-hover:text-blue-400 uppercase">{match.teams}</p>
                        <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                      </div>
                      <p className="text-[9px] text-slate-500 font-medium">{match.fans} fans in the booth</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20">
            <p className="text-[10px] font-bold text-blue-400 mb-2 font-mono italic tracking-tighter">#FANPOLL_LIVE</p>
            <p className="text-xs text-white font-bold leading-tight mb-4">Who wins the 2nd Test at Adelaide?</p>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span className="text-slate-300">IND</span>
                  <span className={hasVoted ? "text-blue-400" : "text-slate-500"}>{votes.ind}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-700 rounded-full"
                    style={{ width: `${votes.ind}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span className="text-slate-300">AUS</span>
                  <span className="text-slate-500">{votes.aus}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-700 transition-all duration-700 rounded-full"
                    style={{ width: `${votes.aus}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleVote}
              disabled={hasVoted}
              className={`w-full mt-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all
                ${hasVoted ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 cursor-not-allowed' : 'text-white border-white/10 hover:bg-white/5 active:scale-95'}`}
            >
              {hasVoted ? '✓ Voted' : 'Cast Vote'}
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-600 p-0.5">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-black text-white uppercase">PRO</div>
          </div>
          <div>
            <p className="text-xs font-bold text-white">Guest User</p>
            <p className="text-[10px] text-blue-400 font-medium">Level 12 Fan</p>
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