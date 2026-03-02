import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectCurrentUser, selectIsAuthenticated } from '../../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { User, LogOut } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Signed out successfully');
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-[100] h-[65px] w-full bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 flex items-center">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-10">
          <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
            Cric<span className="text-blue-500">Social</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <Link to="/web-series" className="hover:text-blue-500 transition-colors">Web Series</Link>
            <Link to="/movies" className="hover:text-blue-500 transition-colors">Movies</Link>
            <Link to="/live" className="flex items-center gap-2 hover:text-red-500 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              Live Match
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          {/* Auth Conditional UI */}
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-4 pl-4 border-l border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-[10px] font-black uppercase text-white tracking-widest">
                  {user?.name?.split(' ')[0]}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="hidden sm:block text-[11px] font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
              <motion.span animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-current rounded-full" />
              <motion.span animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-full h-0.5 bg-current rounded-full" />
              <motion.span animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-current rounded-full" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-[65px] left-0 w-full bg-slate-900 border-b border-white/5 p-6 flex flex-col gap-6 overflow-hidden"
          >
            <Link to="/web-series" onClick={() => setIsMenuOpen(false)} className="text-slate-300 font-black uppercase tracking-[0.2em] text-[10px]">Web Series</Link>
            <Link to="/movies" onClick={() => setIsMenuOpen(false)} className="text-slate-300 font-black uppercase tracking-[0.2em] text-[10px]">Movies</Link>
            <Link to="/live" onClick={() => setIsMenuOpen(false)} className="text-red-500 font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-red-600"></span>
              Live Match
            </Link>
            
            <hr className="border-white/5" />

            {isAuthenticated ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className="text-white font-black uppercase text-[10px] tracking-widest">{user?.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full bg-red-500/10 text-red-500 font-black uppercase tracking-widest text-[10px] py-4 rounded-xl border border-red-500/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-blue-600 text-white text-center font-black uppercase tracking-widest text-[10px] py-4 rounded-xl shadow-lg shadow-blue-600/20"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-slate-800 text-white text-center font-black uppercase tracking-widest text-[10px] py-4 rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;