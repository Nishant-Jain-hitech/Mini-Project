import React from 'react';
import { motion } from 'framer-motion';

const trendingData = [
    {
        id: 1,
        title: "Mahendra: The Last Captain",
        category: "Web Series",
        rating: "9.8",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800"
    },
    {
        id: 2,
        title: "Blue Blood: 2011 Story",
        category: "Documentary",
        rating: "9.5",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800"
    },
    {
        id: 3,
        title: "The Gabba Miracle",
        category: "Movie",
        rating: "9.9",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800"
    },
    {
        id: 4,
        title: "Under the Lights",
        category: "Originals",
        rating: "8.7",
        image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=800"
    },
    {
        id: 5,
        title: "Raw Pace: The Shoaib Story",
        category: "Biography",
        rating: "9.2",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800"
    },
    {
        id: 6,
        title: "Border-Gavaskar Saga",
        category: "Web Series",
        rating: "9.6",
        image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=800"
    },
    {
        id: 7,
        title: "Inside the IPL Bubble",
        category: "Documentary",
        rating: "8.9",
        image: "https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=800"
    },
    {
        id: 8,
        title: "The Lord's Balcony",
        category: "Movie",
        rating: "9.4",
        image: "https://images.unsplash.com/photo-1533749047139-189de3cf06d3?q=80&w=800"
    },
];

const MediaCard = ({ title, rating, category, image }) => (
    <motion.div
        whileHover={{ y: -8 }}
        className="group relative cursor-pointer"
    >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900 group-hover:border-blue-500/50 shadow-2xl transition-colors duration-500">
            <motion.img
                src={image}
                alt={title}
                whileHover={{ scale: 1.15, filter: "brightness(0.5)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full w-full object-cover opacity-80"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                    <span className="ml-1 text-white text-xl">▶</span>
                </div>
            </motion.div>

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                    <span className="text-[9px] font-black text-white uppercase tracking-tighter">Watch Trailer</span>
                </div>
            </div>
        </div>

        <div className="mt-4 px-1">
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-500">{category}</span>
                <span className="text-[10px] font-bold text-yellow-500 flex items-center gap-1">
                    <span className="animate-pulse">★</span> {rating}
                </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 uppercase tracking-tight">
                {title}
            </h3>
        </div>
    </motion.div>
);

export const TrendingSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-between mb-8"
            >
                <div className="flex items-center gap-3">
                    <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
                    <h2 className="text-xl font-black text-white uppercase tracking-wider">Trending Now</h2>
                </div>
                <button className="text-[11px] font-bold text-slate-500 hover:text-blue-400 uppercase tracking-widest transition-colors">View All</button>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                {trendingData.map((item) => (
                    <motion.div key={item.id} variants={cardVariants}>
                        <MediaCard {...item} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default MediaCard;