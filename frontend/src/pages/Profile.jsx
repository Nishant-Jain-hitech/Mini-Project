import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, setCredentials } from '../redux/slices/authSlice';
import { updateProfile } from '../api/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('My Collection');
  const [image, setImage] = useState(user?.profile_image || null);
  const [newUsername, setNewUsername] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef(null);

  const mockCollection = [
    { id: 1, name: "Virat Kohli", rarity: "Legendary", type: "Batsman", power: 98 },
    { id: 2, name: "Jasprit Bumrah", rarity: "Epic", type: "Bowler", power: 94 },
    { id: 3, name: "Ben Stokes", rarity: "Rare", type: "All-Rounder", power: 88 },
    { id: 4, name: "Rashid Khan", rarity: "Epic", type: "Bowler", power: 92 },
  ];

  const mockActivity = [
    { id: 1, action: "Won Match", target: "vs Thunderbirds", xp: "+450 XP", time: "2h ago" },
    { id: 2, action: "Unlocked Card", target: "Ben Stokes", xp: "Rare Drop", time: "5h ago" },
    { id: 3, action: "Rank Up", target: "Gold II", xp: "+1000 XP", time: "1d ago" },
  ];

  useEffect(() => {
    if (user?.username) setNewUsername(user.username);
    if (user?.profile_image) setImage(user.profile_image);
  }, [user]);

  const tabs = [
    { id: 'collection', label: 'My Collection' },
    { id: 'activity', label: 'Activity' },
    { id: 'settings', label: 'Settings' }
  ];

  const handleUpdateProfile = async () => {
    const trimmedName = newUsername.trim();
    if (!trimmedName || trimmedName.length < 3) return toast.error("Username must be at least 3 characters");

    const previousData = { ...user };
    const token = localStorage.getItem('token');
    setIsUpdating(true);
    
    dispatch(setCredentials({
      user: { ...user, username: trimmedName, profile_image: image },
      token: token
    }));

    try {
      const response = await updateProfile(trimmedName, image);
      dispatch(setCredentials({
        user: { ...user, username: response.username, profile_image: response.profile_image },
        token: token
      }));
      toast.success("Profile updated!");
    } catch (err) {
      dispatch(setCredentials({ user: previousData, token: token }));
      toast.error(err.message || "Failed to sync with server");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setImage(compressedBase64);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6 md:p-20 text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-900 rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl shadow-blue-500/10">
          <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
            <h1 className="text-[12rem] font-black italic">#{user?.username?.length || '00'}</h1>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <button 
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="w-40 h-40 rounded-full border-8 border-white/20 overflow-hidden bg-slate-950 flex items-center justify-center cursor-pointer group relative"
            >
              {image ? (
                <img src={image} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="text-white/20 flex flex-col items-center">
                  <span className="text-6xl font-black mb-1 uppercase">{user?.username?.charAt(0) || '?'}</span>
                  <span className="text-[10px] font-black uppercase">Upload</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs font-black uppercase">Change</span>
              </div>
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />

            <div className="text-center md:text-left">
              <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-2">{user?.username || 'Guest'}</h1>
              <p className="text-blue-100 font-bold uppercase tracking-widest text-sm mb-6">Level {user?.username?.length || 1} Cricket Strategist</p>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 inline-block">
                <p className="text-[10px] text-blue-100 font-black uppercase opacity-60">Identity</p>
                <p className="text-sm font-bold">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-12 flex gap-8 border-b border-white/5 pb-4">
           {tabs.map((tab) => (
             <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.label)}
                className={`text-sm font-black uppercase tracking-widest relative pb-4 ${activeTab === tab.label ? 'text-blue-500' : 'text-slate-500'}`}
             >
               {tab.label}
               {activeTab === tab.label && (
                 <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full" />
               )}
             </button>
           ))}
        </nav>

        {/* Tab Content */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {activeTab === 'My Collection' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockCollection.map((item) => (
                    <div key={item.id} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:border-blue-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="text-blue-500 font-black">P{item.power}</span>
                      </div>
                      <h3 className="text-lg font-black uppercase italic">{item.name}</h3>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{item.type} • {item.rarity}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Activity' && (
                <div className="space-y-4">
                  {mockActivity.map((act) => (
                    <div key={act.id} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.07] transition-colors">
                      <div className="flex gap-4 items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <div>
                          <p className="text-xs font-black uppercase tracking-tight text-slate-400">{act.action}</p>
                          <p className="text-lg font-bold italic">{act.target}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-500 font-black text-sm">{act.xp}</p>
                        <p className="text-[10px] text-slate-600 uppercase font-black">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Settings' && (
                <div className="max-w-xl space-y-6">
                  <div className="group">
                    <label className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Display Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white mt-2 outline-none focus:border-blue-500 transition-all" 
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handleUpdateProfile}
                    disabled={isUpdating}
                    className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 disabled:opacity-50 transition-all active:scale-95"
                  >
                    {isUpdating ? "Syncing..." : "Save Changes"}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Profile;