import React from "react";
import { useNavigate } from 'react-router-dom';

// Data Anggota Kelompok (5 Orang)
const teamMembers = [
  {
    name: "Nama Anggota 1",
    role: "Manajer Proyek",
    description: "Bertanggung jawab atas koordinasi tim dan jadwal pengerjaan.",
  },
  {
    name: "Nama Anggota 2",
    role: "Pengembang Frontend",
    description: "Fokus pada antarmuka pengguna, tata letak, dan responsivitas.",
  },
  {
    name: "Nama Anggota 3",
    role: "Pengembang Backend",
    description: "Mengurus logika server, API, dan pengelolaan data kalkulator.",
  },
  {
    name: "Nama Anggota 4",
    role: "Spesialis Konten",
    description: "Menyusun materi matematika, rumus, dan deskripsi fitur.",
  },
  {
    name: "Nama Anggota 5",
    role: "Penguji & QA",
    description: "Memastikan kualitas, mengidentifikasi bug, dan menguji fungsionalitas.",
  },
];

const LandingPage = () => {
    const navigate = useNavigate();

    const handleStartLearning = () => {
        navigate('/admin');
    };
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      <header className="py-24 px-4 sm:px-6 lg:px-8 bg-white shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-indigo-700 leading-tight">
            Selamat Datang di SkyLearn
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Gerbang Anda menuju pengalaman belajar interaktif dan mendalam.
          </p>
            <button
            onClick={handleStartLearning}
            className="mt-10 inline-block px-10 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            Mulai Belajar Sekarang
          </button>
        </div>
      </header>

      {/* SECTION 2: Fitur Utama */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-700">Fitur Unggulan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kartu Fitur 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Kalkulator Cepat</h3>
              <p className="text-gray-600">Alat bantu untuk memecahkan Derivatif, Integral, dan limit secara akurat.</p>
            </div>
            {/* Kartu Fitur 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Pelajaran Terstruktur</h3>
              <p className="text-gray-600">Materi yang disusun langkah demi langkah, mudah dipahami oleh pelajar.</p>
            </div>
            {/* Kartu Fitur 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Akses Kapan Saja</h3>
              <p className="text-gray-600">Platform web yang responsif, optimal di desktop dan perangkat mobile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Informasi Kelompok (Team Section) */}
      <section className="bg-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">Mengenal Tim Kami</h2>
          <p className="text-lg text-indigo-600 mb-12">
            SkyLearn adalah hasil kolaborasi 5 individu dengan peran spesifik.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-center">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-xl transition duration-300 hover:shadow-2xl"
              >
                {/* Placeholder untuk Foto Profil */}
                <div className="w-20 h-20 bg-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-indigo-700 text-xl font-bold">A{index + 1}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm font-semibold text-indigo-600 mt-1 mb-2">{member.role}</p>
                <p className="text-xs text-gray-500 italic">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-100 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} SkyLearn. All rights reserved. Kelompok 1.
      </footer>

    </div>
  );
}

export default LandingPage;