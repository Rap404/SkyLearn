import React, { useState } from "react";
import FunctionPlot from "../../components/FunctionPlot";
import { evaluate, simplify } from "mathjs";
import MateriLimit from "../../components/materi/MateriLimit";
import KalkulatorLimit from "../../components/kalkulator/KalkulatorLimit";

const Limit = () => {
  return (
    <div className="min-h-screen overflow-y-auto bg-gray-100 p-5">
      <MateriLimit />
      <KalkulatorLimit />
    </div>
  );
};

export default Limit;
