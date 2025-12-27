import React, { useState } from "react";
import { derivative, simplify } from "mathjs";
import FunctionPlot from "../FunctionPlot";

const KalkulatorTurunan = () => {
  const [fungsi, setFungsi] = useState("x^3 + 2x^2");
  const [hasil, setHasil] = useState(null);
  const [steps, setSteps] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

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
    setIsCalculating(true);
    const langkah = [];

    if (!fungsi) {
      setHasil("Fungsi tidak boleh kosong");
      setIsCalculating(false);
      return;
    }

    langkah.push(`Analisis fungsi awal f(x) = ${fungsi}`);

    const expr = normalisasiFungsi(fungsi);
    langkah.push(`Identifikasi ekspresi matematika: ${expr}`);

    try {
      langkah.push("Menerapkan aturan diferensiasi simbolik...");

      const turunan = derivative(expr, "x");
      const disederhanakan = simplify(turunan);

      langkah.push(`Hasil diferensiasi: ${turunan.toString()}`);
      langkah.push(`Menyederhanakan bentuk aljabar...`);

      setHasil(disederhanakan.toString());
      setSteps(langkah);
    } catch (err) {
      setHasil("Kesalahan: Format fungsi tidak didukung");
      setSteps(langkah);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] p-6 md:p-12 font-sans text-slate-900">
      <div className="mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-100">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Derivative<span className="text-emerald-600">Lab</span></h1>
              <p className="text-slate-500 text-sm font-medium">Kalkulator Diferensial & Analisis Gradien</p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Mathematical Analysis Tool v2.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Control Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Persamaan f(x)</label>
                  <div className="relative">
                    <input
                      value={fungsi}
                      onChange={(e) => setFungsi(e.target.value)}
                      placeholder="x^2 + 5x"
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl p-5 font-mono text-emerald-700 focus:border-emerald-500 focus:bg-white outline-none transition-all shadow-inner"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 text-emerald-900">
                       f(x)
                    </div>
                  </div>
                </div>

                <button
                  onClick={hitungTurunan}
                  disabled={isCalculating}
                  className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 hover:shadow-2xl hover:shadow-emerald-200 active:scale-[0.97] transition-all disabled:opacity-50"
                >
                  {isCalculating ? "MEMPROSES..." : "HITUNG TURUNAN"}
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-slate-900 rounded-[2rem] p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="text-emerald-400 font-bold text-sm mb-2">Aturan Penulisan:</h4>
                <ul className="text-[11px] text-slate-400 space-y-2 font-medium">
                  <li className="flex gap-2"><span>•</span> <code>x^n</code> untuk eksponen</li>
                  <li className="flex gap-2"><span>•</span> <code>sin(x)</code>, <code>cos(x)</code>, <code>log(x)</code></li>
                  <li className="flex gap-2"><span>•</span> Gunakan tanda kurung untuk prioritas</li>
                </ul>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                 <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 10-2 0v1a1 1 0 102 0zM13 16v-1a1 1 0 10-2 0v1a1 1 0 102 0zM14.586 11H12V4L6 14h3v6l6-9z" /></svg>
              </div>
            </div>
          </div>

          {/* Right Column: Visualization & Result */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Main Result Card */}
            {hasil && (
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-100 border border-emerald-50 animate-in fade-in zoom-in-95 duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Turunan Pertama f'(x)</p>
                    <h2 className="text-4xl font-black text-emerald-600 font-mono tracking-tight">{hasil}</h2>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-emerald-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-3 8h3m-3 4h3m-6-4h.01M9 17h.01" /></svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-50">
                   <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
                         <span className="w-4 h-[2px] bg-slate-200"></span> Prosedur
                      </h3>
                      <div className="space-y-3">
                        {steps.map((s, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
                            <p className="text-xs font-semibold text-slate-500 leading-relaxed">{s}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                   <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100/50">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-800 mb-3 text-center">Analisis Grafis</p>
                      <div className="h-32 flex items-center justify-center">
                        <p className="text-[11px] text-emerald-700/70 text-center italic font-medium">
                          Garis singgung pada f(x) memiliki kemiringan yang didefinisikan oleh f'(x)
                        </p>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* Graphs Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Grafik Asli f(x)</span>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                </div>
                <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                  <FunctionPlot fungsi={normalisasiFungsi(fungsi)} range={[-3, 3]} label="f(x)" />
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Grafik Turunan f'(x)</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
                <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                  {hasil ? (
                    <FunctionPlot fungsi={hasil} range={[-3, 3]} label="f'(x)" />
                  ) : (
                    <div className="h-[250px] flex items-center justify-center text-slate-300 text-xs italic">
                      Grafik turunan akan muncul setelah kalkulasi
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>x
      </div>
    </div>
  );
};

export default KalkulatorTurunan;