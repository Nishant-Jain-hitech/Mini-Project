import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LegalLayout = ({ title, lastUpdated, children }) => {
  return (
    <div className="min-h-screen bg-[#020617] p-6 md:p-20">
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Link
          to="/"
          className="text-blue-500 text-xs font-black uppercase tracking-widest hover:text-white transition-colors mb-8 inline-block"
        >
          ← Back to Home
        </Link>

        <header className="mb-12">
          <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
            {title}
          </h1>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl">
          <div className="space-y-8 text-slate-300 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

LegalLayout.propTypes = {
  title: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LegalLayout;
