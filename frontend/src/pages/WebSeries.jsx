import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WebSeries = () => {
    const [activeFilter, setActiveFilter] = useState('All Series');

    const seriesData = [
        { id: 1, title: "The Test: A New Era", episodes: "8 Episodes", tags: ["Documentaries"], progress: 60, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKco4tKh0WZRUDTW0ARkZRWPcBH8isX7F1xQ&s", description: "Witness the transformation of Indian Cricket under Virat Kohli—where a relentless pace battery and a fearless mindset conquered the world’s toughest arenas." },
        { id: 2, title: "The Gracious Defiance", episodes: "6 Episodes", tags: ["Documentaries"], progress: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMwYXEAHdXSla4h4ayUUcSlAZ_bFcKv1j2Fw9N1tzDZg&s", description: "A deep dive into Kane Williamson’s 2019 campaign—where a captain's calm redefined victory." },
        { id: 9, title: "King of the Caribbean", episodes: "4 Episodes", tags: ["Documentaries"], progress: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRen05kd3EzILIIDdG2wxF7lF8B7AkWVCp7eA&s", description: "Exploring the legendary swagger and dominance of Sir Viv Richards on the world stage." },
        { id: 4, title: "Captain's Mindset", episodes: "12 Episodes", tags: ["Masterclass"], progress: 20, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWCOuD1P4D-nvHY_Akxo44WN84NkWgHJuoXQ&s", description: "Learn the tactical and psychological secrets of the world's most successful cricket captains." },
        { id: 5, title: "Roar of the Lion", episodes: "4 Episodes", tags: ["Documentaries"], progress: 0, image: "https://w0.peakpx.com/wallpaper/250/314/HD-wallpaper-yuvaraj-singh-icc-yuvi-yuvraj-singh-thumbnail.jpg", description: "The incredible story of Yuvraj Singh's fight both on the pitch and for his life." },
        { id: 6, title: "Selection Day", episodes: "6 Episodes", tags: ["Drama"], progress: 45, image: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?q=80&w=800", description: "Two brothers raised to be cricket stars must face a system that tests their bond." },
        { id: 7, title: "Spin Wizardry", episodes: "8 Episodes", tags: ["Masterclass"], progress: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ0ljr7wI_G1oewCfZyEHF3tHALj17mehhQQ&s", description: "A technical masterclass on the art of spin bowling from the greatest to ever do it." },
        { id: 8, title: "The Final Over", episodes: "3 Episodes", tags: ["Drama"], progress: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ohhuhSb5u4cfuk-VXchlZEfmvdurzj_uUw&s", description: "A high-stakes drama surrounding the pressure and glory of cricket's most decisive moments." }
    ];

    const filters = ['All Series', 'Documentaries', 'Drama', 'Masterclass'];

    const filteredData = activeFilter === 'All Series'
        ? seriesData
        : seriesData.filter(item => item.tags.includes(activeFilter));

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 md:px-10">
            <header className="mb-12">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 mb-2">
                    <div className="h-10 w-1.5 bg-blue-600 rounded-full"></div>
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                        Web <span className="text-blue-500">Series</span>
                    </h1>
                </motion.div>
                <p className="text-slate-500 text-sm max-w-xl">
                    Filtering {filteredData.length} titles in <span className="text-blue-400 font-bold">{activeFilter}</span>
                </p>
            </header>

            <div className="flex gap-3 mb-12 overflow-x-auto pb-2 no-scrollbar">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-6 py-2 rounded-xl border text-[10px] font-black uppercase transition-all whitespace-nowrap ${activeFilter === filter
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                            : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/20'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredData.map((series) => (
                        <motion.div
                            layout
                            key={series.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -10 }}
                            className="group relative"
                        >
                            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 bg-slate-900 group-hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
                                <img src={series.image} alt={series.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="absolute top-4 left-4">
                                    <span className="bg-black/60 backdrop-blur-md text-[8px] font-black text-white px-2 py-1 rounded-md uppercase tracking-widest border border-white/10">
                                        {series.tags[0]}
                                    </span>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6">

                                    {/* Default Info (Hides on Hover) */}
                                    <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
                                        <h3 className="text-xl font-black text-white uppercase leading-none mb-2">
                                            {series.title}
                                        </h3>
                                        <p className="text-slate-400 text-xs font-bold">{series.episodes}</p>
                                    </div>

                                    {/* Hover Description (Shows on Hover) */}
                                    <div className="absolute bottom-20 left-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                        <p className="text-slate-200 text-xs font-medium leading-relaxed italic">
                                            {series.description || "Deep dive into the tactical masterclass of the gentleman's game."}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        {series.progress > 0 && (
                                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                                                <div className="h-full bg-blue-600" style={{ width: `${series.progress}%` }} />
                                            </div>
                                        )}

                                        <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase rounded-xl transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            {series.progress > 0 ? 'Continue Watching' : 'Start Binging'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default WebSeries;