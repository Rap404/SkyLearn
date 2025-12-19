import React, { useState } from "react";
import { create, all } from "mathjs";
import FunctionPlot from "../FunctionPlot";

const math = create(all);

export default function KalkulatorIntegral() {
  const [funcF, setFuncF] = useState("x^2");
  const [funcG, setFuncG] = useState("0");
  const [limA, setLimA] = useState("0");
  const [limB, setLimB] = useState("2");
  const [type, setType] = useState("area");
  const [result, setResult] = useState(null);

  const varName = type === "volumeY" ? "y" : "x";

  const normalisasiFungsi = (f) => {
    return (
      f
        .replace(/\s+/g, "")
        // 3x → 3*x
        .replace(/(\d)x/g, "$1*x")
        // )x → )*x
        .replace(/\)\s*x/g, ")*x")
        // x( → x*(
        .replace(/x\s*\(/g, "x*(")
        // )( → )*(
        .replace(/\)\s*\(/g, ")*(")
        // xsin(x) → x*sin(x)
        .replace(/x(?=[a-zA-Z])/g, "x*")
    );
  };

  const hitung = () => {
    try {
      const a = math.evaluate(limA);
      const b = math.evaluate(limB);
      const fExpr = math.parse(funcF).compile();
      const gExpr = math.parse(funcG.trim() === "" ? "0" : funcG).compile();

      const evalFunc = (val) => {
        const scope = { [varName]: val };
        const yF = fExpr.evaluate(scope);
        const yG = gExpr.evaluate(scope);
        return type === "area"
          ? Math.abs(yF - yG)
          : Math.abs(yF ** 2 - yG ** 2);
      };

      const n = 1000;
      const h = (b - a) / n;
      let sum = evalFunc(a) + evalFunc(b);

      for (let i = 1; i < n; i++) {
        sum += (i % 2 === 0 ? 2 : 4) * evalFunc(a + i * h);
      }

      const integral = (h / 3) * sum;

      if (type === "area") {
        setResult({
          main: `${integral.toFixed(4)} satuan luas`,
          sub: "",
          steps: [
            "Rumus Luas",
            `L = ∫ |f(${varName}) - g(${varName})| d${varName}`,

            "Substitusi Fungsi",
            `∫ dari ${limA} ke ${limB} |(${funcF}) - (${funcG})| d${varName}`,

            "Penyelesaian",
            "Lakukan integrasi pada fungsi tersebut dan masukkan batasnya",

            "Kesimpulan",
            `Luas daerah = ${integral.toFixed(4)} satuan luas`,
          ],
        });
      } else {
        setResult({
          main: `${integral.toFixed(4)} π satuan volume`,
          sub: `≈ ${(integral * Math.PI).toFixed(4)}`,
          steps: [
            `V = π ∫ [f(${varName})² - g(${varName})²] d${varName}`,
            `∫ dari ${limA} ke ${limB} [(${funcF})² - (${funcG})²] d${varName}`,
            `Hasil = ${integral.toFixed(4)}π`,
          ],
        });
      }
    } catch (e) {
      alert("Format fungsi salah. Gunakan x^2, sqrt(x), dll.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Kalkulator Integral & Volume
        </h2>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6 text-sm">
          <p>• Gunakan x^2, sqrt(x), sin(x)</p>
          <p>• Gunakan * untuk perkalian</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-semibold">Persamaan f({varName})</label>
            <input
              className="w-full p-3 border rounded-lg"
              value={funcF}
              onChange={(e) => setFuncF(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Persamaan g({varName})</label>
            <input
              className="w-full p-3 border rounded-lg"
              value={funcG}
              onChange={(e) => setFuncG(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              className="p-3 border rounded-lg"
              placeholder="Batas bawah"
              value={limA}
              onChange={(e) => setLimA(e.target.value)}
            />
            <input
              className="p-3 border rounded-lg"
              placeholder="Batas atas"
              value={limB}
              onChange={(e) => setLimB(e.target.value)}
            />
          </div>

          <select
            className="w-full p-3 border rounded-lg"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="area">Luas Daerah</option>
            <option value="volumeX">Volume Putar Sumbu X</option>
            <option value="volumeY">Volume Putar Sumbu Y</option>
          </select>

          <button
            onClick={hitung}
            className="w-full py-4 bg-green-500 text-white text-xl font-bold rounded-lg hover:bg-green-600"
          >
            HITUNG
          </button>
        </div>

        {result && (
          <div className="mt-8 space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="text-2xl font-bold text-green-600">
                {result.main}
              </div>
              {result.sub && (
                <div className="text-gray-600 text-sm">{result.sub}</div>
              )}
            </div>

            <div className="bg-gray-50 border rounded p-4">
              <strong>Langkah Penyelesaian:</strong>
              <ul className="list-decimal ml-5 mt-2 space-y-1">
                {result.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {funcF && <FunctionPlot fungsi={normalisasiFungsi(funcF)} label="f(x)" />}
    </div>
  );
}
