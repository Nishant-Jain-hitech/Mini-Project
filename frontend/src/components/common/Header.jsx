import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
} from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { LogOut, Bell, Newspaper, Menu, X, Zap } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogout = (e) => {
    e.stopPropagation();
    localStorage.removeItem("token");
    dispatch(logout());
    toast.success("Signed out successfully");
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[100]">
      <nav className="h-[65px] w-full bg-slate-950/90 backdrop-blur-2xl border-b border-white/5 px-4 md:px-10 flex items-center shadow-2xl">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link
              to={isAuthenticated ? "/home" : "/"}
              className="text-lg md:text-2xl font-black tracking-tighter text-white uppercase font-sports italic group"
            >
              CRIC
              <span className="text-blue-500 group-hover:text-blue-400 transition-colors">
                SOCIAL
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <NavLink to="/web-series" label="Web Series" />
              <NavLink to="/watchlist" label="Watchlist" />
              <NavLink
                to="/news"
                label="News"
                icon={<Newspaper className="w-3 h-3" />}
              />
              <Link
                to="/live-scorecard"
                className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-all"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                Live Score
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <button className="hidden sm:block p-2 text-slate-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950"></span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <Link to="/profile" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg border border-white/10 overflow-hidden bg-slate-800 transition-all duration-300 group-hover:border-blue-500/50">
                    {user?.profile_image ? (
                      <img
                        src={user.profile_image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white font-black text-xs">
                        {user?.username?.charAt(0)}
                      </div>
                    )}
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:block p-2 text-slate-500 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-[9px] font-black uppercase tracking-widest bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-500 transition-all active:scale-95"
              >
                Sign In
              </Link>
            )}

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-300 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-[70px] left-4 right-4 bg-slate-950 backdrop-blur-3xl border border-white/10 rounded-2xl p-4 shadow-2xl lg:hidden flex flex-col gap-2"
            >
              <MobileNavLink
                to="/web-series"
                label="Web Series"
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileNavLink
                to="/watchlist"
                label="Watchlist"
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileNavLink
                to="/news"
                label="News"
                icon={<Newspaper className="w-3.5 h-3.5" />}
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileNavLink
                to="/live-scorecard"
                label="Live Scores"
                isLive
                onClick={() => setIsMenuOpen(false)}
              />

              {isAuthenticated && (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="mt-1 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-500/10 text-red-500 font-bold uppercase text-[10px] tracking-widest border border-red-500/20"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

const NavLink = ({ to, label, icon }) => (
  <Link
    to={to}
    className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 relative group font-bold"
  >
    {icon}
    {label}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
  </Link>
);

const MobileNavLink = ({ to, label, onClick, isLive, icon }) => (
  <motion.div whileTap={{ scale: 0.97, x: 4 }} className="w-full">
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-blue-600/70 active:bg-blue-600/70 transition-all group border border-white/[0.02]"
    >
      <div className="flex items-center gap-3">
        <span className="text-slate-400 group-hover:text-blue-400 transition-colors">
          {icon || <Zap className="w-3.5 h-3.5" />}
        </span>
        <span className="text-[11px] font-black text-slate-200 uppercase tracking-widest group-hover:text-white transition-colors">
          {label}
        </span>
      </div>
      {isLive && (
        <span className="flex h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
      )}
    </Link>
  </motion.div>
);

export default Header;
