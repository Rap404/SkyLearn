import React, { useState } from "react";
import { derivative, simplify } from "mathjs";
import FunctionPlot from "../FunctionPlot";

const KalkulatorTurunan = () => {
  const [fungsi, setFungsi] = useState("");
  const [hasil, setHasil] = useState(null);
  const [steps, setSteps] = useState([]);

  const normalisasiFungsi = (f) => {
    return f
      .replace(/\s+/g, "")
      .replace(/(\d)x/g, "$1*x")
      .replace(/\)\s*x/g, ")*x")
      .replace(/x\s*\(/g, "x*(")
      .replace(/\)\s*\(/g, ")*(")
      .replace(/x(?=[a-zA-Z])/g, "x*");
  };

  const hitungTurunan = () => {
    const langkah = [];

    if (!fungsi) {
      setHasil("Fungsi tidak boleh kosong");
      return;
    }

    langkah.push(`1️⃣ Diketahui fungsi f(x) = ${fungsi}`);

    const expr = normalisasiFungsi(fungsi);
    langkah.push(`2️⃣ Normalisasi fungsi: ${expr}`);

    try {
      langkah.push("3️⃣ Terapkan aturan turunan");

      const turunan = derivative(expr, "x");
      const disederhanakan = simplify(turunan);

      langkah.push(`4️⃣ Turunan simbolik: ${turunan.toString()}`);
      langkah.push(`5️⃣ Disederhanakan: ${disederhanakan.toString()}`);

      setHasil(disederhanakan.toString());
      setSteps(langkah);
    } catch (err) {
      setHasil("Tidak dapat menurunkan fungsi");
      setSteps(langkah);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-blue-600">
          Kalkulator Turunan (Step by Step)
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium">Fungsi f(x)</label>
          <input
            value={fungsi}
            onChange={(e) => setFungsi(e.target.value)}
            placeholder="contoh: x^2 + 3x"
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        <button
          onClick={hitungTurunan}
          className="mb-6 w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Hitung Turunan
        </button>

        {hasil && (
          <div className="mb-4 rounded-md bg-green-100 p-3">
            <b>Hasil Turunan:</b> {hasil}
          </div>
        )}

        {steps.length > 0 && (
          <div className="rounded-md bg-gray-50 p-4">
            <h2 className="mb-2 font-semibold">Langkah Penyelesaian:</h2>
            <ul className="list-decimal pl-5 space-y-1 text-sm">
              {steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        <FunctionPlot fungsi={fungsi} range={[-3, 3]} label="f(x)" />

        {hasil && <FunctionPlot fungsi={hasil} range={[-3, 3]} label="f'(x)" />}
      </div>
    </div>
  );
};

export default KalkulatorTurunan;
