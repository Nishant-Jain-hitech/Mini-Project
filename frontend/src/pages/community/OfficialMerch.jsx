import React from "react";

const OfficialMerch = () => {
  const products = [
    {
      id: 1,
      name: "Classic 'Pavilion' Hoodie",
      price: "$55",
      tag: "Best Seller",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "CricSocial Oversized Tee",
      price: "$32",
      tag: "New Drop",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Limited Edition Team Cap",
      price: "$25",
      tag: "Limited",
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] p-6 md:p-16 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter">
            Official Merch
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            Wear your passion. Premium gear for the ultimate fan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="group relative bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                />
                <span className="absolute top-4 left-4 bg-blue-600 text-[10px] font-black uppercase px-3 py-1 rounded-full text-white">
                  {item.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-1">
                  {item.name}
                </h3>
                <p className="text-blue-400 font-black mb-6">{item.price}</p>
                <button
                  type="button"
                  className="w-full py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 hover:text-white transition-all active:scale-95"
                >
                  Add to Kit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficialMerch;
