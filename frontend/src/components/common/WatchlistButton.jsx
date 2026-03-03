import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  updateWatchlist,
} from "../../redux/slices/authSlice";
import { toggleWatchlistAPI } from "../../api/api";
import toast from "react-hot-toast";

const WatchlistButton = ({ id, title, rating, category, image }) => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const isInWatchlist = user?.watchlist?.includes(id);

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const movieData = {
      id: String(id),
      title: String(title),
      rating: String(rating),
      category: String(category),
      image: String(image),
    };

    try {
      const response = await toggleWatchlistAPI(movieData);
      dispatch(updateWatchlist(response.watchlist));
      toast.success(
        response.action === "added"
          ? "Added to Watchlist"
          : "Removed from Watchlist",
      );
    } catch (err) {
      toast.error(err.message || "Failed to update watchlist");
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-lg transition-all border border-white/10 flex items-center justify-center ${
        isInWatchlist
          ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          : "bg-black/40 text-white/60 hover:bg-white/10"
      }`}
    >
      {isInWatchlist ? (
        <span className="text-xs font-bold flex items-center gap-1">
          ✓ Saved
        </span>
      ) : (
        <span className="text-xs font-bold flex items-center gap-1">
          + Watchlist
        </span>
      )}
    </button>
  );
};

export default WatchlistButton;
