import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import KelasPage from "./Pages/KelasPage";
import TanyaPage from "./Pages/TanyaPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/kelas" element={<KelasPage />} />
        <Route path="/Tanya-soal" element={<TanyaPage />} />
      </Routes>
    </>
  );
}

export default App;
