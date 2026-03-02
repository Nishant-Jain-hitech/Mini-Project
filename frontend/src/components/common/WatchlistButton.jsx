import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, updateWatchlist } from '../../redux/slices/authSlice';
import { toggleWatchlistAPI } from '../../api/api'; // You'll need to add this to api.js
import toast from 'react-hot-toast';

const WatchlistButton = ({ contentId }) => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const isInWatchlist = user?.watchlist?.includes(contentId);

  const handleToggle = async (e) => {
    e.preventDefault();
    try {
      const response = await toggleWatchlistAPI(contentId);
      dispatch(updateWatchlist(response.watchlist));
      toast.success(response.action === 'added' ? "Added to Watchlist" : "Removed from Watchlist");
    } catch (err) {
      toast.error("Failed to update watchlist");
    }
  };

  return (
    <button 
      onClick={handleToggle}
      className={`p-2 rounded-full transition-all ${
        isInWatchlist ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
      }`}
    >
      {isInWatchlist ? '✅' : '➕'}
    </button>
  );
};

export default WatchlistButton;