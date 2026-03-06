import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
} from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { LogOut, Bell, Newspaper, Menu, X, Zap, Trash2, CheckCheck, Clock } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Release", message: "Mirzapur S3 is now live!", time: "2 mins ago", unread: true },
    { id: 2, title: "Match Alert", message: "IND vs AUS starts in 1 hour.", time: "1 hour ago", unread: true },
    { id: 3, title: "System", message: "Welcome to CricSocial!", time: "2 days ago", unread: false },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifRef = useRef(null);

  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = (e) => {
    e.stopPropagation();
    localStorage.removeItem("token");
    dispatch(logout());
    toast.success("Signed out successfully");
    navigate("/login");
    setIsMenuOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[100]">
      <nav className="h-[75px] w-full bg-slate-950/90 backdrop-blur-2xl border-b border-white/5 px-4 md:px-10 flex items-center shadow-2xl">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link
              to={isAuthenticated ? "/home" : "/"}
              className="text-lg md:text-2xl font-black tracking-tighter text-white uppercase font-sports italic group"
            >
              CRIC<span className="text-blue-500 group-hover:text-blue-400 transition-colors">SOCIAL</span>
            </Link>

            <div className="hidden lg:flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em]">
              <CustomNavLink to="/web-series" label="Web Series" />
              <CustomNavLink to="/watchlist" label="Watchlist" />
              <CustomNavLink to="/news" label="News" icon={<Newspaper className="w-3 h-3" />} />
              <NavLink
                to="/live-scorecard"
                className={({ isActive }) => 
                  `flex items-center gap-2 transition-all px-3 py-2 rounded-xl ${
                    isActive ? "bg-red-500/10 text-red-500 border border-red-500/20" : "text-red-500/70 hover:text-red-400"
                  }`
                }
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                Live Score
              </NavLink>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            {/* Notification Management */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`p-2 transition-colors relative rounded-lg ${isNotifOpen ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-[8px] font-black text-white flex items-center justify-center rounded-full border-2 border-slate-950 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-[320px] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Notifications</h3>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="flex items-center gap-1 text-[9px] font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase"
                        >
                          <CheckCheck size={12} /> Mark Read
                        </button>
                      )}
                    </div>

                    <div className="max-h-[360px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <div 
                            key={n.id} 
                            className={`p-4 border-b border-white/5 flex gap-3 transition-colors hover:bg-white/[0.03] relative group ${n.unread ? 'bg-blue-600/5' : ''}`}
                          >
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.unread ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-slate-700'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-100 mb-0.5 truncate">{n.title}</p>
                              <p className="text-[10px] text-slate-400 leading-relaxed mb-2 line-clamp-2">{n.message}</p>
                              <div className="flex items-center gap-2 text-slate-500">
                                <Clock size={10} />
                                <span className="text-[9px] font-medium uppercase">{n.time}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => deleteNotification(n.id)}
                              className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-500 hover:text-red-500 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 px-6 text-center">
                          <Bell className="w-8 h-8 text-slate-800 mx-auto mb-3" />
                          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Everything is up to date</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <Link to="/profile" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg border border-white/10 overflow-hidden bg-slate-800 transition-all duration-300 group-hover:border-blue-500/50">
                    {user?.profile_image ? (
                      <img src={user.profile_image} alt="Profile" className="w-full h-full object-cover" />
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
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-[80px] left-4 right-4 bg-slate-950 backdrop-blur-3xl border border-white/10 rounded-2xl p-4 shadow-2xl lg:hidden flex flex-col gap-2"
            >
              <MobileNavLink to="/web-series" label="Web Series" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/watchlist" label="Watchlist" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/news" label="News" icon={<Newspaper className="w-3.5 h-3.5" />} onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/live-scorecard" label="Live Scores" isLive onClick={() => setIsMenuOpen(false)} />

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

const CustomNavLink = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 border font-bold ${
        isActive
          ? "bg-blue-600/10 text-blue-500 border-blue-500/20"
          : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

const MobileNavLink = ({ to, label, onClick, isLive, icon }) => (
  <motion.div whileTap={{ scale: 0.97, x: 4 }} className="w-full">
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => 
        `flex items-center justify-between p-3.5 rounded-xl transition-all group border ${
          isActive 
            ? "bg-blue-600/20 border-blue-500/30 text-white" 
            : "bg-white/[0.03] border-white/[0.02] text-slate-200 hover:bg-white/[0.06]"
        }`
      }
    >
      <div className="flex items-center gap-3">
        <span className="text-slate-400 group-hover:text-blue-400 transition-colors">
          {icon || <Zap className="w-3.5 h-3.5" />}
        </span>
        <span className="text-[11px] font-black uppercase tracking-widest transition-colors">
          {label}
        </span>
      </div>
      {isLive && (
        <span className="flex h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
      )}
    </NavLink>
  </motion.div>
);

export default Header;