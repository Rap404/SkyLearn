import React from "react";
import { useNavigate } from "react-router-dom";

// Data Anggota Tim
const teamMembers = [
  { name: "Moh. Rafli Dwi Saputra", nim: "2507152" },
  { name: "Muhammad Ilham Ansori", nim: "2501320" },
  { name: "Nadia Putri Bahira", nim: "2501327" },
  { name: "Shofi Irafah", nim: "2501225" },
  { name: "Zabaniya Aziz Franayudha", nim: "2501473" },
];

// Ikon Topeng Anonymous yang Bersih
const MaskIcon = () => (
  <svg
    viewBox="0 0 512 512"
    className="w-12 h-12 md:w-14 md:h-14 text-white drop-shadow-md"
    fill="currentColor"
  >
    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 0-208-93.3-208-208S141.3 48 256 48s208 93.3 208 208-93.3 208-208 208z" />
    <path d="M256 128c-61.9 0-112 50.1-112 112 0 57.9 44.1 105.7 101 111.4l-11.8 47.1c-1.6 6.3 3.2 12.5 9.7 12.5h26.2c6.5 0 11.3-6.2 9.7-12.5l-11.8-47.1c56.9-5.7 101-53.5 101-111.4 0-61.9-50.1-112-112-112zm-48 104c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96 0c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24z" />
  </svg>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    /* Menambahkan bg-white secara eksplisit dan relative z-0 agar background blob tidak menimpa teks */
    <div className="relative min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <header className="relative pt-20 pb-28 md:pt-32 md:pb-48 border-b border-slate-100 bg-white">
        {/* Background Blobs: Menggunakan z-[-1] agar selalu di belakang konten */}
        <div className="absolute inset-0 z-[-1] opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] bg-blue-400 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-indigo-400 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-600/10 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>Platform Kalkulus Terlengkap</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tight mb-8">
            Kuasai Kalkulus <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Tanpa Batas
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-lg md:text-xl text-slate-500 leading-relaxed mb-12">
            SkyLearn menghadirkan cara baru belajar matematika melalui teknologi
            interaktif dan kecerdasan buatan.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/belajar")}
              className="px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-2xl hover:bg-blue-600 transition-all active:scale-95"
            >
              Mulai Belajar Sekarang
            </button>
            <a
              href="#features"
              className="px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-center"
            >
              Lihat Fitur Utama
            </a>
          </div>
        </div>
      </header>

      {/* --- SECTION 2: Fitur Utama --- */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Fitur Unggulan Kami
            </h2>
            <div className="w-16 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Kalkulator Cepat
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Alat bantu cerdas untuk memecahkan Derivatif, Integral, dan
                Limit secara akurat dengan langkah penyelesaian lengkap.
              </p>
            </div>

            <div className="group p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Pelajaran Terstruktur
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Kurikulum yang disusun langkah demi langkah, dirancang agar
                konsep matematika yang kompleks menjadi mudah dipahami.
              </p>
            </div>

            <div className="group p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                AI Assistant
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Dapatkan bantuan instan dari asisten AI kami untuk menjawab
                pertanyaan matematika sulit kapan saja dan di mana saja.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section
        id="team"
        className="py-24 md:py-32 bg-slate-900 px-6 relative overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Core Development Team
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Mahasiswa berdedikasi dari Kelompok 1 yang membangun ekosistem
              pembelajaran SkyLearn menjadi nyata.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 justify-items-center">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative w-full p-8 rounded-[32px] bg-slate-800/40 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/40 hover:-translate-y-4"
              >
                <div className="relative w-24 h-24 mx-auto mb-8 transition-transform duration-500 group-hover:scale-110">
                  <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl flex items-center justify-center text-white border border-white/10 group-hover:border-blue-400 transition-all">
                    <MaskIcon />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-blue-400 transition-colors">
                    {member.name}
                  </h3>
                  <div className="inline-block px-4 py-1.5 bg-white/5 rounded-full border border-white/10 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all">
                    <p className="text-[11px] font-bold text-slate-400 group-hover:text-blue-400 uppercase tracking-[0.2em]">
                      {member.nim}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-16 bg-white border-t border-slate-100 text-center px-6 text-slate-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl">
              S
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
              SkyLearn
            </span>
          </div>
          <p className="text-sm font-medium">
            © {new Date().getFullYear()} SkyLearn Project.{" "}
            <br className="sm:hidden" />
            Dibuat dengan dedikasi oleh{" "}
            <span className="text-slate-900 font-bold">Kelompok 3</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
