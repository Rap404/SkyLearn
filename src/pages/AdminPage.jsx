import React, { useState } from "react";
import SideBar from "./SideBar";
import Navbar from "../components/Navbar";
import Limit from "./kelas/Limit";
import Turunan from "./kelas/Turunan";
import Integral from "./kelas/Integral";
import Gemini from "./Gemini";

const AdminPage = () => {
  const [currentAdminView, setCurrentAdminView] = useState("HOME");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleAdminNavigate = (view) => {
    setCurrentAdminView(view);
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    // 1. Hapus overflow-x-hidden jika tidak perlu, atau pastikan bg sesuai dengan Navbar jika ingin terlihat menyatu
    <div className="flex min-h-screen bg-white"> 
      
      <SideBar
        currentView={currentAdminView}
        onNavigate={handleAdminNavigate}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* 2. Tambahkan bg-slate-900 di sini jika ingin area di belakang navbar (saat scroll) tidak terlihat putih */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64 transition-all duration-300 bg-gray-50">
        
        {/* Navbar berada di paling atas flex container */}
        <Navbar 
          toggleSidebar={toggleSidebar} 
          currentView={currentAdminView} 
          onNavigate={handleAdminNavigate}
        />

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            {/* 3. Header Title: Gunakan margin top yang pas agar tidak terlalu mepet Navbar */}
            <header className="mb-6 pt-2">
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 capitalize tracking-tight">
                {currentAdminView.toLowerCase()}
              </h1>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
              {currentAdminView === "HOME" && (
                <div className="p-6 md:p-10">
                  {/* Welcome Section */}
                  <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                    <div className="text-left max-w-xl">
                      <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
                        Selamat Datang kembali di Dashboard <span className="text-blue-600">SkyLearn</span>
                      </h2>
                      <p className="text-slate-500 text-lg leading-relaxed">
                        Kelola materi kalkulus Anda dan manfaatkan kecerdasan buatan untuk membantu proses pembelajaran hari ini.
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div className="w-48 h-48 bg-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                        <svg className="w-24 h-24 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats/Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: 'Limit', desc: 'Analisis nilai pendekatan fungsi.', icon: 'M13 7l5 5m0 0l-5 5m5-5H6', color: 'bg-indigo-50 text-indigo-600', view: 'LIMIT' },
                      { title: 'Turunan', desc: 'Hitung laju perubahan nilai.', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'bg-amber-50 text-amber-600', view: 'TURUNAN' },
                      { title: 'Integral', desc: 'Akumulasi luas dan volume.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10', color: 'bg-emerald-50 text-emerald-600', view: 'INTEGRAL' },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAdminNavigate(item.view)}
                        className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1"
                      >
                        <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                        <p className="text-slate-500 text-sm">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {currentAdminView === "TURUNAN" && <Turunan />}
              {currentAdminView === "LIMIT" && <Limit />}
              {currentAdminView === "INTEGRAL" && <Integral />}
              {currentAdminView === "GEMINI" && <Gemini />}
            </div>
            <footer className="py-16 text-center px-6 text-slate-500">
            <div className="max-w-7xl mx-auto">
              <p className="text-sm font-medium">
                © {new Date().getFullYear()} SkyLearn Project. <br className="sm:hidden" />
                Dibuat dengan dedikasi oleh <span className="text-slate-900 font-bold">Kelompok 1</span>
              </p>
            </div>
          </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;