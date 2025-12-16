// src/Pages/NavBar.jsx (FINAL VISUAL REFINEMENT)

import React from "react";

const NavBar = ({ toggleSidebar, currentView, currentTopic }) => {
    
    const getCleanTitle = (topic) => {
        if (!topic) return "DASHBOARD";
        return topic.replace('ADMIN_', '').replace('_', ' ').toUpperCase();
    };

    return (
        <div className="w-full h-16 bg-white shadow-md border-b border-gray-100 flex items-center justify-between px-6 z-10 sticky top-0"> 
            
            {/* KIRI: Tombol Toggle (Burger) & Judul Halaman */}
            <div className="flex items-center space-x-4">
                
                {/* Tombol Toggle (Hanya terlihat di mobile) */}
                <button 
                    onClick={toggleSidebar} 
                    className="text-gray-800 md:hidden p-2 rounded-full hover:bg-gray-100 transition duration-150"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                
                {/* Judul Halaman yang Sedang Aktif */}
                <div className="text-sm font-semibold text-gray-700 tracking-wider">
                    {getCleanTitle(currentTopic)}
                </div>
            </div>

            {/* KANAN: User Profile & Notifikasi */}
            <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                    A
                </div>
            </div>
        </div>
    );
}
export default NavBar;