import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWatchlist, removeFromWatchlist } from "../api/api";
import { updateWatchlist } from "../redux/slices/authSlice";
import { Loader2, Trash2, Play, Bookmark } from "lucide-react";
import toast from "react-hot-toast";

const Watchlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchWatchlist();
        setItems(data);
      } catch (err) {
        toast.error(err.message || "Could not load watchlist");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await removeFromWatchlist(id);

      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);

      if (response.watchlist) {
        dispatch(updateWatchlist(response.watchlist));
      } else {
        dispatch(updateWatchlist(updatedItems));
      }

      toast.success("Removed from watchlist");
    } catch (err) {
      toast.error(err.message || "Failed to remove item");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#020617] flex justify-center items-center">
        <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] pt-28 px-6 md:px-12 pb-20">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-600/20">
            <Bookmark className="text-white w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">
              My Watchlist
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
              {items.length} Saved Productions
            </p>
          </div>
        </header>

        {items.length === 0 ? (
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-20 text-center">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
              Your theater is empty.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-blue-500/50 hover:-translate-y-2 shadow-2xl"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={item.title}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-blue-600 p-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-blue-500">
                      <Play className="text-white fill-current w-6 h-6" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-lg text-white/60 hover:text-red-500 hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 z-20 disabled:cursor-not-allowed"
                  >
                    {deletingId === item.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>

                <div className="p-4 bg-gradient-to-b from-slate-900 to-black">
                  <p className="text-blue-500 text-[8px] font-black uppercase tracking-widest mb-1">
                    {item.category || "Web Series"}
                  </p>
                  <h3 className="text-white font-bold text-sm md:text-base leading-tight line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
