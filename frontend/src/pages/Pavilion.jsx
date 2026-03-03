import React, { useState } from "react";

const Pavilion = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "ViratFan_18",
      time: "2m ago",
      content:
        "That cover drive in the 3rd over was pure class! Is he the best technician we've ever seen?",
      likes: 142,
      isLiked: false,
      replies: [
        {
          id: 101,
          user: "StatsGuru",
          content: "Technically perfect. His head position was rock solid.",
          time: "1m ago",
        },
      ],
    },
    {
      id: 2,
      user: "CricketAnalyst",
      time: "15m ago",
      content:
        "Statistical deep dive: Why the Adelaide pitch favors spinners on Day 4. Let's discuss in the thread.",
      likes: 89,
      isLiked: false,
      replies: [],
    },
  ]);

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      }),
    );
  };

  const openReplyModal = (post) => {
    setReplyTo(post);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!newContent.trim()) return;

    if (replyTo) {
      setPosts(
        posts.map((post) => {
          if (post.id === replyTo.id) {
            return {
              ...post,
              replies: [
                ...post.replies,
                {
                  id: Date.now(),
                  user: "Guest User",
                  content: newContent,
                  time: "Just now",
                },
              ],
            };
          }
          return post;
        }),
      );
    } else {
      const newPost = {
        id: Date.now(),
        user: "Guest User",
        time: "Just now",
        content: newContent,
        likes: 0,
        isLiked: false,
        replies: [],
      };
      setPosts([newPost, ...posts]);
    }

    setNewContent("");
    setReplyTo(null);
    setIsModalOpen(false);
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-4xl mx-auto animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            The Pavilion
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Community Hub • 12.4k fans live
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setReplyTo(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          + Start Discussion
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-default"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">
              {replyTo ? `Replying to @${replyTo.user}` : "New Discussion"}
            </h3>
            {replyTo && (
              <p className="text-slate-500 text-xs mb-4 line-clamp-1 italic">
                "{replyTo.content}"
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <textarea
                autoFocus
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  replyTo
                    ? "Write your reply... (Cmd + Enter)"
                    : "What's the hot take? (Cmd + Enter)"
                }
                className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none mb-6"
              />
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-slate-400 font-bold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newContent.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-2 rounded-xl disabled:opacity-50"
                >
                  {replyTo ? "Reply" : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="space-y-4">
            <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 hover:border-blue-500/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-blue-400 font-bold">
                    {post.user.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      @{post.user}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase">
                      {post.time}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed mb-6">
                {post.content}
              </p>

              <div className="flex items-center gap-6 border-t border-white/5 pt-4">
                <button
                  type="button"
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 text-xs font-bold transition-colors ${post.isLiked ? "text-red-500" : "text-slate-400 hover:text-red-500"}`}
                >
                  <span>{post.isLiked ? "❤️" : "🤍"}</span> {post.likes}
                </button>
                <button
                  type="button"
                  onClick={() => openReplyModal(post)}
                  className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <span>💬</span> {post.replies.length} Replies
                </button>
              </div>
            </div>

            {post.replies.length > 0 && (
              <div className="ml-8 space-y-3 border-l-2 border-white/5 pl-6">
                {post.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="bg-white/5 p-4 rounded-xl border border-white/5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-blue-400">
                        @{reply.user}
                      </span>
                      <span className="text-[10px] text-slate-600 font-bold uppercase">
                        {reply.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {reply.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pavilion;
