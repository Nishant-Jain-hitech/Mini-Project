import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCredentials,
  selectIsAuthenticated,
} from "../redux/slices/authSlice";
import { loginUser } from "../api/api";
import toast from "react-hot-toast";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const from = location.state?.from?.pathname || "/home";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading("Authenticating...");

    try {
      const response = await loginUser(formData);

      const authData = {
        user: response.user,
        token: response.access_token,
      };

      localStorage.setItem("token", response.access_token);
      dispatch(setCredentials(authData));

      toast.success(`Welcome back, ${response.user.username}!`, {
        id: loadingToast,
      });

      navigate(from, { replace: true });
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail || "Invalid email or password";
      toast.error(`Caught out! ${errorMessage}`, { id: loadingToast });
      console.error("Login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Login <span className="text-blue-500">Social</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">
            {location.state?.from
              ? `Sign in to access ${location.state.from.pathname}`
              : "Ready for the next innings?"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="email"
              placeholder="Email Address"
              required
              disabled={isSubmitting}
              autoComplete="email"
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-50"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              required
              disabled={isSubmitting}
              autoComplete="current-password"
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-50"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group disabled:bg-blue-800 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                SIGN IN
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm font-medium">
            New to the stadium?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
