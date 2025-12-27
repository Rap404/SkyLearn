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
    return f
      .replace(/\s+/g, "")
      .replace(/(\d)x/g, "$1*x")
      .replace(/\)\s*x/g, ")*x")
      .replace(/x\s*\(/g, "x*(")
      .replace(/\)\s*\(/g, ")*(")
      .replace(/x(?=[a-zA-Z])/g, "x*");
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
            "Rumus Luas: L = ∫ |f(x) - g(x)| dx",
            `Substitusi: ∫ dari ${limA} ke ${limB} |(${funcF}) - (${funcG})| d${varName}`,
            "Penyelesaian: Integrasi numerik Simpson 1/3 diterapkan.",
            `Hasil Akhir: ${integral.toFixed(4)} satuan luas`,
          ],
        });
      } else {
        setResult({
          main: `${integral.toFixed(4)}π satuan volume`,
          sub: `≈ ${(integral * Math.PI).toFixed(4)}`,
          steps: [
            "Rumus Volume: V = π ∫ [f(x)² - g(x)²] dx",
            `Substitusi: π ∫ dari ${limA} ke ${limB} [(${funcF})² - (${funcG})²] d${varName}`,
            `Hasil: ${integral.toFixed(4)}π`,
          ],
        });
      }
    } catch (e) {
      alert("Format fungsi salah. Periksa kembali penulisan Anda.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-10 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">Calculus Tool</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Kalkulator <span className="text-indigo-600 italic">Integral</span>
          </h1>
          <p className="text-slate-500 mt-2">Hitung luas daerah dan volume benda putar dengan presisi tinggi.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <div className="space-y-5">
                {/* Input Fungsi F */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Persamaan f({varName})</label>
                  <div className="relative group">
                    <input
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-mono text-indigo-600 outline-none focus:border-indigo-500 transition-all"
                      value={funcF}
                      onChange={(e) => setFuncF(e.target.value)}
                      placeholder="Contoh: x^2"
                    />
                  </div>
                </div>

                {/* Input Fungsi G */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Persamaan g({varName})</label>
                  <input
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-mono text-indigo-600 outline-none focus:border-indigo-500 transition-all"
                    value={funcG}
                    onChange={(e) => setFuncG(e.target.value)}
                    placeholder="Contoh: 0"
                  />
                </div>

                {/* Batas */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Batas Bawah</label>
                    <input
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-mono outline-none focus:border-indigo-500 transition-all"
                      value={limA}
                      onChange={(e) => setLimA(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Batas Atas</label>
                    <input
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-mono outline-none focus:border-indigo-500 transition-all"
                      value={limB}
                      onChange={(e) => setLimB(e.target.value)}
                    />
                  </div>
                </div>

                {/* Tipe Kalkulasi */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Mode Kalkulasi</label>
                  <select
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="area">Luas Daerah</option>
                    <option value="volumeX">Volume Putar Sumbu X</option>
                    <option value="volumeY">Volume Putar Sumbu Y</option>
                  </select>
                </div>

                <button
                  onClick={hitung}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  HITUNG SEKARANG
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </button>
              </div>
            </div>

            {/* Hint Box */}
            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
              <h4 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                Tips Penulisan
              </h4>
              <ul className="text-xs text-indigo-700 space-y-1 opacity-80">
                <li>• Gunakan <strong>^</strong> untuk pangkat: <code>x^2</code></li>
                <li>• Fungsi spesial: <code>sin(x)</code>, <code>sqrt(x)</code>, <code>exp(x)</code></li>
                <li>• Pastikan kurung tutup-buka sesuai.</li>
              </ul>
            </div>
          </div>

          {/* Result & Visualization Panel */}
          <div className="lg:col-span-7 space-y-6">
            {/* Area Grafik */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-2 min-h-[400px]">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest px-2">Preview Grafik</span>
                <span className="bg-slate-100 text-[10px] font-bold py-1 px-3 rounded-full text-slate-500">Live Visual</span>
              </div>
              <div className="relative overflow-hidden rounded-2xl">
                 {funcF && <FunctionPlot fungsi={normalisasiFungsi(funcF)} label="f(x)" />}
              </div>
            </div>

            {/* Hasil Kalkulasi */}
            {result && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                  <div className="bg-indigo-600 p-8 text-white">
                    <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-1">Hasil Akhir</p>
                    <div className="text-4xl font-black">
                      {result.main}
                    </div>
                    {result.sub && (
                      <div className="text-indigo-200 mt-1 font-mono">{result.sub}</div>
                    )}
                  </div>

                  <div className="p-8">
                    <h5 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-6 h-px bg-slate-200"></span>
                      Langkah Analisis
                    </h5>
                    <div className="space-y-4">
                      {result.steps.map((s, i) => (
                        <div key={i} className="flex gap-4 group">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            {i + 1}
                          </div>
                          <div className="pt-1 text-slate-600 font-medium border-b border-slate-50 w-full pb-3 leading-relaxed">
                            {s}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}