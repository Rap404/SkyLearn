import { Route, Routes } from "react-router-dom";
import TanyaSoalPage from "./pages/TanyaSoalPage";
import LandingPage from "./Pages/LandingPage";
import AdminPage from "./Pages/AdminPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/tanya-soal" element={<TanyaSoalPage />} />
      </Routes>
    </>
  );
}

export default App;
