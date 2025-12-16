import React, { useState } from "react";

const mainNavItems = [
    { name: "Turunan", view: "TURUNAN",},
    { name: "Aljabar", view: "ALJABAR",},
    { name: "Trigonometri", view: "TRIGONOMETRI",},
    { name: "Limit", view: "LIMIT",},
    { name: "Integral – Luas Daerah", view: "INTEGRAL_LUAS_DAERAH", },
];

const dashboardItem = { name: "Dashboard", view: "ADMIN_DASHBOARD",};


const SideBar = ({ currentView, onNavigate, isOpen, toggleSidebar }) => {
    const mobileClasses = isOpen ? 'translate-x-0' : '-translate-x-full';
    const isActive = (itemView) => currentView === itemView;

    const NavItem = ({ item }) => {
        const active = isActive(item.view);
        
        const baseClasses = "px-4 py-3 text-sm font-semibold cursor-pointer flex items-center transition duration-200 ease-in-out";
        const activeClasses = active 
            ? 'bg-indigo-700 text-white border-l-4 border-indigo-300'
            : 'hover:bg-gray-800 text-gray-300';
            
        return (
             <li 
                onClick={() => onNavigate(item.view)}
                className={`${baseClasses} ${activeClasses}`}
            >
                {/* Ikon dengan margin kanan dan font size yang konsisten */}
                <span className="text-xl mr-3">{item.icon}</span> 
                <span>{item.name}</span>
            </li>
        );
    }
        
    return (
        <>
            {/* OVERLAY MOBILE */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" 
                    onClick={toggleSidebar} 
                />
            )}

            {/* SIDEBAR UTAMA */}
            <div 
                className={`w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out 
                    md:translate-x-0 
                    ${mobileClasses}`
                }
            > 
                
                {/* Header/Logo Area*/}
                <div className="p-4 text-3xl font-extrabold text-white bg-indigo-800 flex justify-between items-center h-16 shadow-lg">
                    <span className="tracking-wider flex items-center">
                        <span className="text-indigo-300">Sky</span><span className="text-white">Learn</span>
                    </span>
                    <button onClick={toggleSidebar} className="text-indigo-300 md:hidden p-1 rounded hover:bg-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigasi Area*/}
                <nav className="mt-2 overflow-y-auto h-[calc(100vh-64px)] pb-4">
                    
                    {/* Bagian 1: DASHBOARD */}
                    <ul className="mb-4">
                        <NavItem item={dashboardItem} />
                    </ul>
                    
                    {/* Divider dan Label Kategori */}
                    <div className="mx-4 my-4 h-px bg-gray-700/50"></div>
                    <p className="text-xs font-semibold uppercase text-indigo-400 mx-4 mb-2 tracking-widest">Materi Kalkulus</p>

                    {/* Bagian 2: MENU MATERI */}
                    <ul>
                        {mainNavItems.map((item, index) => (
                            <NavItem key={index} item={item} />
                        ))}
                    </ul>

                </nav>
            </div>
        </>
    );
}
export default SideBar;