import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Gemini from "./pages/Gemini";
import BasicLayout from "./layouts/BasicLayout";
import KelasPage from "./pages/KelasPage";
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
        <Route element={<BasicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tanya-soal" element={<TanyaSoalPage />} />
          <Route path="/kelas" element={<KelasPage />} />
          <Route path="/kelas/Limit" element={<Limit />} />
          <Route path="/kelas/Turunan" element={<Turunan />} />
          <Route path="/kelas/Integral" element={<Integral />} />
        </Route>
        {/* <Route path="/kelas" element={<BilanganReal />} /> */}
        <Route path="/gemini" element={<Gemini />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/tanya-soal" element={<TanyaSoalPage />} />
      </Routes>
    </>
  );
}

export default App;
