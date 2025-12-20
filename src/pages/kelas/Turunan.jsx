import React from "react";
import MateriTurunan from "../../components/materi/MateriTurunan";
import KalkulatorTurunan from "../../components/kalkulator/KalkulatorTurunan";

const Turunan = () => {
  return (
    <div className="min-h-screen overflow-y-auto bg-gray-100 p-5">
      <MateriTurunan />
      <KalkulatorTurunan />
    </div>
  );
};

export default Turunan;
