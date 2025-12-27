import React, { useState, useEffect, useRef } from "react";

const Navbar = ({ toggleSidebar, currentView, onNavigate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (view) => {
    onNavigate(view);
    setIsDropdownOpen(false);
  };

  return (
    // Menggunakan bg-slate-900 (hampir hitam) dengan transparansi
    <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 text-white w-full">
      
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 md:hidden transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="hidden md:flex items-center text-sm font-medium text-slate-400">
          <span className="hover:text-blue-400 transition-colors cursor-pointer font-bold tracking-tight text-lg text-white" onClick={() => onNavigate('HOME')}>
            SkyLearn
          </span>
          <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-blue-400 capitalize font-semibold bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            {currentView?.toLowerCase()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden sm:flex items-center gap-4">
          <button 
            onClick={() => onNavigate('HOME')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Home
          </button>
        </div>

        {/* Dropdown Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 pl-3 py-1 pr-1 bg-slate-800 border border-slate-700 rounded-full hover:border-blue-500 transition-all shadow-lg"
          >
            <span className="text-xs font-bold text-slate-200 hidden md:block px-1 uppercase tracking-wider">Materi</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-indigo-500/20 shadow-lg">
              SL
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-2 border-b border-slate-700 mb-1">
                <p className="text-[10px] uppercase font-bold text-slate-500">Pilih Materi</p>
              </div>
              
              <button 
                onClick={() => handleMenuClick('LIMIT')}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${currentView === 'LIMIT' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
              >
                Materi Limit
              </button>
              
              <button 
                onClick={() => handleMenuClick('TURUNAN')}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${currentView === 'TURUNAN' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
              >
                Materi Turunan
              </button>
              
              <button 
                onClick={() => handleMenuClick('INTEGRAL')}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${currentView === 'INTEGRAL' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
              >
                Materi Integral
              </button>

              <div className="h-px bg-slate-700 my-1 mx-2"></div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;  