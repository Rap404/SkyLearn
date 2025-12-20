import React from "react";
import MateriIntegral from "../../components/materi/MateriIntegral";
import KalkulatorIntegral from "../../components/kalkulator/KalkulatorIntegral";

const Integral = () => {
  return (
    <div className="min-h-screen overflow-y-auto bg-gray-100 p-5">
      <MateriIntegral />
      <KalkulatorIntegral />
    </div>
  );
};

export default Integral;
