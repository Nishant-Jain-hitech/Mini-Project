import React, { useState, useRef } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('My Collection');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const tabs = [
    { id: 'collection', label: 'My Collection' },
    { id: 'activity', label: 'Activity' },
    { id: 'settings', label: 'Settings' }
  ];

  const activityLog = [
    { id: 'act-1', action: 'Predicted Australia to win', time: '2h ago', points: '+50 pts' },
    { id: 'act-2', action: 'Shared a post in The Pavilion', time: '5h ago', points: '+10 pts' },
    { id: 'act-3', action: 'Completed "Test Fan" Milestone', time: '1d ago', points: '+200 pts' }
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6 md:p-20 animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto">
        
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-900 rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl shadow-blue-500/10">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <h1 className="text-[12rem] font-black italic">#18</h1>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <button 
              type="button"
              onClick={triggerFileInput}
              aria-label="Upload profile picture"
              className="w-40 h-40 rounded-full border-8 border-white/20 overflow-hidden bg-slate-950 flex items-center justify-center cursor-pointer group relative outline-none focus:ring-4 focus:ring-blue-400"
            >
              {image ? (
                <img src={image} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="text-white/20 flex flex-col items-center">
                  <span className="text-4xl">+</span>
                  <span className="text-[10px] font-black uppercase tracking-tighter">Upload</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs font-black uppercase">Change</span>
              </div>
            </button>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange} 
            />

            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                 <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter">Alex Fan</h1>
                 <span className="bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded-md">PRO</span>
              </div>
              <p className="text-blue-100 font-bold uppercase tracking-widest text-sm mb-6">Level 12 Cricket Strategist</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <p className="text-[10px] text-blue-100 font-black uppercase opacity-60">Pavilion Posts</p>
                  <p className="text-xl font-black text-white">128</p>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <p className="text-[10px] text-blue-100 font-black uppercase opacity-60">Correct Predictions</p>
                  <p className="text-xl font-black text-white">42</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="mt-12 flex gap-8 border-b border-white/5 pb-4 overflow-x-auto">
           {tabs.map((tab) => (
             <button 
                key={tab.id} 
                type="button"
                onClick={() => setActiveTab(tab.label)}
                className={`text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap outline-none focus:text-blue-400 ${activeTab === tab.label ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
             >
               {tab.label}
             </button>
           ))}
        </nav>

        <div className="mt-8 animate-in fade-in slide-in-from-top-2 duration-500">
          {activeTab === 'My Collection' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['badge-gold', 'badge-silver', 'badge-bronze'].map((id, i) => (
                <div key={id} className="bg-white/5 border border-white/10 rounded-2xl p-4 group hover:border-blue-500/50 transition-colors">
                  <div className="aspect-square bg-slate-800 rounded-xl mb-4 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all text-2xl">
                    🏆
                  </div>
                  <p className="text-white font-bold text-xs uppercase tracking-tighter">Match Badge #{i + 1}</p>
                  <p className="text-slate-500 text-[10px]">Earned: 12 Feb 2026</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Activity' && (
            <div className="space-y-4">
              {activityLog.map((act) => (
                <div key={act.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-white text-sm font-bold">{act.action}</p>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest">{act.time}</p>
                  </div>
                  <span className="text-blue-500 font-black text-xs">{act.points}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Settings' && (
            <div className="max-w-xl space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="display-name" className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Display Name</label>
                  <input id="display-name" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white mt-2 outline-none focus:border-blue-500 transition-colors" defaultValue="Alex Fan" />
                </div>
                <div>
                  <label htmlFor="fav-team" className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Favorite Team</label>
                  <select id="fav-team" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white mt-2 outline-none focus:border-blue-500 appearance-none transition-colors">
                    <option value="in">India 🇮🇳</option>
                    <option value="au">Australia 🇦🇺</option>
                    <option value="en">England 🏴󠁧󠁢󠁥󠁮󠁧󠁿</option>
                  </select>
                </div>
              </div>
              <button type="button" className="px-6 py-3 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-colors active:scale-95">
                Save Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;