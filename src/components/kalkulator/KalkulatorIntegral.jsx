import React, { useState } from "react";

import { create, all } from "mathjs";

const math = create(all);
const KalkulatorIntegral = () => {
  const [funcF, setFuncF] = useState("x^2");
  const [funcG, setFuncG] = useState("0");
  const [limA, setLimA] = useState("0");
  const [limB, setLimB] = useState("2");
  const [type, setType] = useState("area");
  const [result, setResult] = useState(null);

  const getLabels = () => {
    if (type === "volumeY") {
      return {
        labelF: "Persamaan f(y):",
        labelG: "Persamaan g(y) (Batas Dalam/Sumbu Y):",
        noteF: '*Gunakan variabel "y". Contoh: sqrt(y)',
        labelA: "Batas Bawah y1:",
        labelB: "Batas Atas y2:",
        varName: "y",
      };
    }
    return {
      labelF: "Persamaan f(x):",
      labelG: "Persamaan g(x) (Batas Bawah/Sumbu X):",
      noteF: '*Gunakan variabel "x". Contoh: x^2',
      labelA: "Batas Bawah x1:",
      labelB: "Batas Atas x2:",
      varName: "x",
    };
  };

  const hitung = () => {
    try {
      const a = math.evaluate(limA);
      const b = math.evaluate(limB);
      const varName = getLabels().varName;

      const fExpr = math.parse(funcF).compile();
      const gExpr = math.parse(funcG).compile();

      // Integran Fungsi
      const integrand = (val) => {
        let scope = {};
        scope[varName] = val;
        const yF = fExpr.evaluate(scope);
        const yG = gExpr.evaluate(scope);

        if (type === "area") {
          return Math.abs(yF - yG);
        } else {
          return Math.abs(Math.pow(yF, 2) - Math.pow(yG, 2));
        }
      };

      // Simpson's Rule 1/3
      const n = 2000;
      const h = (b - a) / n;
      let sum = integrand(a) + integrand(b);
      for (let i = 1; i < n; i++) {
        sum += (i % 2 === 0 ? 2 : 4) * integrand(a + i * h);
      }
      const numericRes = (h / 3) * sum;

      let finalDisplay = "";
      let steps = "";
      const decimalVal = (numericRes * Math.PI).toFixed(4);

      if (type === "area") {
        finalDisplay = numericRes.toFixed(4) + " Satuan Luas";
        steps = [
          {
            title: "1. Rumus Luas",
            content: `Menggunakan integral tentu: L = ∫ |f(x) - g(x)| dx dari ${a} ke ${b}.`,
          },
          {
            title: "2. Evaluasi",
            content:
              "Menghitung selisih fungsi atas dan bawah pada rentang tersebut.",
          },
        ];
      } else {
        const sumbu = type === "volumeX" ? "X" : "Y";
        finalDisplay = numericRes.toFixed(4) + " π Satuan Volume";
        steps = [
          {
            title: `1. Rumus Volume (Sumbu ${sumbu})`,
            content: `Menggunakan metode cakram/cincin terhadap sumbu ${sumbu}: V = π ∫ |f(${varName})² - g(${varName})²| d${varName}`,
          },
          {
            title: "2. Persiapan Fungsi",
            content: `Kuadratkan fungsi luar: (${funcF})²\nKuadratkan fungsi dalam: (${funcG})²`,
          },
          {
            title: "3. Integrasi",
            content: `Melakukan integrasi numerik pada selisih kuadrat tersebut dari ${a} sampai ${b}.`,
          },
          {
            title: "4. Hasil",
            content: `Nilai integral adalah ${numericRes.toFixed(
              4
            )}. Setelah dikalikan dengan π, volume total adalah ${decimalVal}.`,
          },
        ];
      }

      setResult({
        finalDisplay,
        decimalVal:
          type !== "area"
            ? `Atau setara dengan ≈ ${decimalVal} satuan kubik`
            : "",
        steps,
      });
    } catch (err) {
      alert("Terjadi kesalahan! Pastikan format fungsi benar.");
      console.error(err);
    }
  };

  const labels = getLabels();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Kalkulator Integral Luas Daerah & Volume Benda Putar
        </h2>

        <div className="space-y-5">
          {/* Function F */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              {labels.labelF}
            </label>
            <input
              type="text"
              value={funcF}
              onChange={(e) => setFuncF(e.target.value)}
              placeholder="Contoh: x^2"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">{labels.noteF}</p>
          </div>

          {/* Function G */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              {labels.labelG}
            </label>
            <input
              type="text"
              value={funcG}
              onChange={(e) => setFuncG(e.target.value)}
              placeholder="Kosongkan jika batasnya adalah sumbu"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Limits */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                {labels.labelA}
              </label>
              <input
                type="text"
                value={limA}
                onChange={(e) => setLimA(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                {labels.labelB}
              </label>
              <input
                type="text"
                value={limB}
                onChange={(e) => setLimB(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Tipe Perhitungan & Sumbu Putar:
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="area">Luas Daerah (Kurva x)</option>
              <option value="volumeX">Volume Benda Putar (Sumbu X)</option>
              <option value="volumeY">Volume Benda Putar (Sumbu Y)</option>
            </select>
          </div>

          {/* Button */}
          <button
            onClick={hitung}
            className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-lg transition-colors"
          >
            Hitung Langkah Demi Langkah
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6">
            <div className="bg-green-50 p-6 rounded-xl border-l-6 border-green-500">
              <strong className="text-gray-700">HASIL AKHIR:</strong>
              <div className="text-3xl text-green-600 font-bold mt-2">
                {result.finalDisplay}
              </div>
              {result.decimalVal && (
                <div className="text-sm text-gray-600 mt-2">
                  {result.decimalVal}
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <strong className="text-gray-800 text-lg">
                LANGKAH PENYELESAIAN:
              </strong>
              <div className="mt-4 space-y-4">
                {result.steps.map((step, index) => (
                  <div key={index}>
                    <div className="font-bold text-blue-700 pb-2 border-b border-gray-200">
                      {step.title}
                    </div>
                    <div className="mt-2 text-gray-700 whitespace-pre-line">
                      {step.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KalkulatorIntegral;
