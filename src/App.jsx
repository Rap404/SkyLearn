import { Route, Routes } from "react-router-dom";
import Gemini from "./pages/Gemini";
import Limit from "./pages/kelas/Limit";
import Turunan from "./pages/kelas/Turunan";
import Integral from "./pages/kelas/Integral";
import TanyaSoalPage from "./pages/TanyaSoalPage";
import LandingPage from "./Pages/LandingPage";
import AdminPage from "./Pages/AdminPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tanya-soal" element={<TanyaSoalPage />} />
        <Route path="/kelas/Limit" element={<Limit />} />
        <Route path="/kelas/Turunan" element={<Turunan />} />
        <Route path="/kelas/Integral" element={<Integral />} />
        <Route path="/gemini" element={<Gemini />} />
        <Route path="/belajar" element={<AdminPage />} />
        <Route path="/tanya-soal" element={<TanyaSoalPage />} />
      </Routes>
    </>
  );
}

export default App;
