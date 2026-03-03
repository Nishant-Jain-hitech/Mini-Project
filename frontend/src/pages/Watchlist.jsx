import React, { useEffect, useState } from "react";
import { fetchWatchlist } from "../api/api";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Watchlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchWatchlist();
        setItems(data);
      } catch (err) {
        toast.error("Could not load watchlist");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-black text-white uppercase mb-8">
        My Watchlist
      </h1>
      {items.length === 0 ? (
        <p className="text-slate-500">No items saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 rounded-2xl p-4 border border-white/5"
            >
              <img
                src={item.image}
                className="rounded-xl mb-4"
                alt={item.title}
              />
              <h3 className="text-white font-bold">{item.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
