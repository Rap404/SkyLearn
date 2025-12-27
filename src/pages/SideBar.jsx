import React from "react";

const mainNavItems = [
  { 
    name: "Home", 
    view: "HOME", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    name: "Turunan", 
    view: "TURUNAN", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  { 
    name: "Limit", 
    view: "LIMIT", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    )
  },
  { 
    name: "Integral", 
    view: "INTEGRAL", 
    icon: (
      <span className="text-lg font-serif italic font-bold">∫</span>
    )
  },
  { 
    name: "Gemini", 
    view: "GEMINI", 
    icon: (
      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
      </svg>
    )
  },
];

const SideBar = ({ currentView, onNavigate, isOpen, toggleSidebar }) => {
  const isActive = (itemView) => currentView === itemView;

  return (
    <>
      {/* 1. OVERLAY MOBILE: Menggunakan warna slate gelap transparan agar senada */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60] md:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* 2. SIDEBAR UTAMA: Menggunakan bg-slate-900 senada dengan Navbar */}
      <aside
        className={`fixed top-0 left-0 z-[70] w-64 h-screen bg-slate-900 text-white transition-transform duration-300 ease-in-out border-r border-slate-800
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 shadow-2xl md:shadow-none`}
      >
        {/* Header / Logo Area: Menghilangkan bg-indigo-700, diganti slate agar clean seperti Navbar */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800 bg-slate-900">
          <span className="text-2xl font-black tracking-tighter">
            Sky<span className="text-blue-500">Learn</span>
          </span>
          {/* Tombol Close Mobile */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-1 rounded-md hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigasi Area */}
        <nav className="mt-6 px-3">
          <p className="px-4 text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mb-4">
            Materi Kalkulus
          </p>

          <ul className="space-y-1.5">
            {mainNavItems.map((item) => {
              const active = isActive(item.view);
              return (
                <li key={item.view}>
                  <button
                    onClick={() => onNavigate(item.view)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                      ${active 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                      }`}
                  >
                    {/* Ikon Box: Diubah dari bg-neutral ke bg-slate untuk non-aktif */}
                    <span className={`mr-3 flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold transition-colors
                      ${active ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-500 group-hover:bg-slate-700"}`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;