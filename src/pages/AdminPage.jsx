import React, { useState } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Limit from "./kelas/Limit";
import Turunan from "./kelas/Turunan";
import Integral from "./kelas/Integral";

const Card = ({ Stat, Label, Color }) => {
  const colorClasses = {
    indigo: "border-indigo-500",
    green: "border-green-500",
    yellow: "border-yellow-500",
    red: "border-red-500",
  };

  return (
    <div
      className={`bg-white p-5 rounded-lg shadow-md transition duration-300 hover:shadow-lg border-t-4 ${colorClasses[Color]}`}
    >
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
        {Label}
      </p>
      <p className="text-4xl font-extrabold text-gray-900 mt-2">{Stat}</p>
    </div>
  );
};

const AdminPage = () => {
  const [currentAdminView, setCurrentAdminView] = useState("ADMIN_DASHBOARD");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleAdminNavigate = (newView) => {
    setCurrentAdminView(newView);
    setIsSidebarOpen(false);
  };

  const renderAdminContent = () => {
    const getTitle = (view) =>
      view
        .replace("_", " ")
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const getDescription = (view) => {
      switch (view) {
        case "ADMIN_DASHBOARD":
          return "Ringkasan aktivitas dan metrik kinerja utama sistem SkyLearn.";
        case "TURUNAN":
          return "Kalkulator dan materi untuk perhitungan Turunan (Derivatif).";
        // case "ALJABAR":
        //   return "Alat bantu dan panduan untuk masalah Aljabar kompleks.";
        // case "TRIGONOMETRI":
        //   return "Penjelasan mendalam dan kalkulator untuk fungsi Trigonometri.";
        case "LIMIT":
          return "Visualisasi dan pemecahan masalah Limit fungsi.";
        case "INTEGRAL":
          return "Kalkulator Integral untuk menghitung Luas Daerah di bawah kurva.";
        default:
          return `Halaman untuk materi ${getTitle(currentAdminView)} di sini.`;
      }
    };

    return (
      <>
        {/* Header Konten Dinamis */}
        <header className="mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {getTitle(currentAdminView)}
          </h1>
          <p className="text-gray-500 mt-1">
            {getDescription(currentAdminView)}
          </p>
        </header>
        <div className="bg-white p-8 rounded-xl shadow-lg w-full">
          {(() => {
            switch (currentAdminView) {
              case "ADMIN_DASHBOARD":
                return (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <Card
                        Stat="1,245"
                        Label="Total Pengguna"
                        Color="indigo"
                      />
                      <Card Stat="58" Label="Konten Aktif" Color="green" />
                      <Card Stat="12" Label="Perlu Review" Color="yellow" />
                      <Card Stat="3" Label="Error Log" Color="red" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 p-6 h-96 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                        Visualisasi Kinerja dan Statistik Penggunaan
                      </div>
                      <div className="p-6 h-96 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                        Notifikasi dan Log Aktivitas Terbaru
                      </div>
                    </div>
                  </>
                );

              case "TURUNAN":
                return <Turunan />;

              // case "ALJABAR":
              //     return <AljabarCalculator />;

              // case "TRIGONOMETRI":
              //     return <TrigonoCalculator />;

              case "LIMIT":
                return <Limit />;

              case "INTEGRAL":
                return <Integral />;
              default:
                return (
                  <p className="text-gray-600">
                    Pilih menu dari Sidebar untuk memulai.
                  </p>
                );
            }
          })()}
        </div>
      </>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* 1. SIDEBAR */}
      <SideBar
        currentView={currentAdminView}
        onNavigate={handleAdminNavigate}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col h-screen ml-0 md:ml-64">
        {/* 3. NAVBAR */}
        <NavBar
          toggleSidebar={toggleSidebar}
          currentView={currentAdminView}
          currentTopic={currentAdminView}
        />

        {/* 4. CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {renderAdminContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
