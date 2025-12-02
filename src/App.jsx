import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import TanyaSoalPage from "./pages/TanyaSoalPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tanya-soal" element={<TanyaSoalPage />} />
      </Routes>
    </>
  );
}

export default App;
