import { Route, Routes } from "react-router-dom";
import Gemini from "./pages/Gemini";
import Limit from "./pages/kelas/Limit";
import Turunan from "./pages/kelas/Turunan";
import Integral from "./pages/kelas/Integral";
import TanyaSoalPage from "./pages/TanyaSoalPage";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    // Hilangkan class background gelap di sini jika ada
    <div className="min-h-screen bg-white"> 
      <Routes>
        {/* Halaman Landing: Standalone, tidak terikat layout dashboard */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Halaman Tanya Soal */}
        <Route path="/tanya-soal" element={<TanyaSoalPage />} />

        {/* Halaman Belajar/Admin: Pastikan di dalam file ini ada layout Sidebar */}
        <Route path="/belajar" element={<AdminPage />} />

        {/* Rute Materi */}
        <Route path="/kelas/Limit" element={<Limit />} />
        <Route path="/kelas/Turunan" element={<Turunan />} />
        <Route path="/kelas/Integral" element={<Integral />} />
        <Route path="/gemini" element={<Gemini />} />
      </Routes>
    </div>
  );
}

export default App;