import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { registerUser } from "../api/api";
import toast from "react-hot-toast";
import { User, Mail, Lock, ShieldCheck, Loader2 } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading("Creating your profile...");

    try {
      const response = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      const authData = {
        user: {
          username: response.username,
          email: response.email,
        },
        token: response.access_token,
      };

      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
        dispatch(setCredentials(authData));
      }

      toast.success("Welcome to the club! Registration successful.", {
        id: loadingToast,
      });
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail || "Registration failed. Try again.";
      toast.error(`Run out! ${errorMessage}`, { id: loadingToast });
      console.error("Registration error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Join <span className="text-blue-500">The Club</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">
            Become a part of the global cricket fanhood.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Username"
              required
              disabled={isSubmitting}
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-50"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="email"
              placeholder="Email Address"
              required
              disabled={isSubmitting}
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
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-50"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-slate-950 font-black py-4 rounded-2xl transition-all hover:bg-blue-500 hover:text-white flex items-center justify-center gap-2 disabled:bg-slate-700 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                REGISTER NOW
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 text-sm font-medium">
          Already have a ticket?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Sign in here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
