import React, { useState } from "react";
import FunctionPlot from "../FunctionPlot";
import { evaluate, derivative } from "mathjs";
// import { evaluate } from "mathjs";

const KalkulatorLimit = () => {
  const [fungsi, setFungsi] = useState("");
  const [menuju, setMenuju] = useState("");
  const [hasil, setHasil] = useState(null);
  const [steps, setSteps] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  // --- Logika Matematika (Tetap Sama) ---
  const normalisasiFungsi = (f) => {
    return f.replace(/\s+/g, "").replace(/(\d)x/g, "$1*x").replace(/\)\s*x/g, ")*x").replace(/x\s*\(/g, "x*(").replace(/\)\s*\(/g, ")*(").replace(/x(?=[a-zA-Z])/g, "x*");
  };

  const hitungEkspresi = (expr, xValue) => {
    try { return evaluate(expr, { x: xValue }); } catch (err) { return NaN; }
  };

  const faktorisasiLinear = (str) => {
    const s = str.replace(/\s+/g, "");
    const match = s.match(/^([+-]?\d*)x([+-]\d+)$/);
    if (!match) return null;
    let koefX = match[1];
    let konstanta = parseInt(match[2]);
    if (koefX === "" || koefX === "+") koefX = 1;
    else if (koefX === "-") koefX = -1;
    else koefX = parseInt(koefX);
    return [{ koefX, konstanta }];
  };

  const parseKuadrat = (str) => {
    const s = str.replace(/\s+/g, "");
    let a = 0, b = 0, c = 0;
    const x2Match = s.match(/([+-]?\d*)x\^2/);
    if (x2Match) {
      const coef = x2Match[1];
      if (coef === "" || coef === "+") a = 1;
      else if (coef === "-") a = -1;
      else a = parseInt(coef);
    }
    const withoutX2 = s.replace(/[+-]?\d*x\^2/, "");
    const xMatch = withoutX2.match(/([+-]?\d*)x(?!\^)/);
    if (xMatch) {
      const coef = xMatch[1];
      if (coef === "" || coef === "+") b = 1;
      else if (coef === "-") b = -1;
      else b = parseInt(coef);
    }
    const withoutX = s.replace(/[+-]?\d*x\^?\d*/g, "");
    if (withoutX) {
      const constants = withoutX.match(/[+-]?\d+/g);
      if (constants) c = constants.reduce((sum, val) => sum + parseInt(val), 0);
    }
    return a === 0 ? null : { a, b, c };
  };

  const faktorisasiKuadrat = (str) => {
    const parsed = parseKuadrat(str);
    if (!parsed) return null;
    const { a, b, c } = parsed;
    const getPembagi = (n) => {
      const p = []; const absN = Math.abs(n);
      for (let i = 1; i <= absN; i++) { if (absN % i === 0) { p.push(i); p.push(-i); } }
      return p;
    };
    const pembagA = a === 0 ? [0] : getPembagi(a);
    const maxC = Math.max(Math.abs(c), 1);
    const pembagC = [];
    for (let i = -maxC; i <= maxC; i++) pembagC.push(i);
    for (let p of pembagA) {
      if (p === 0) continue;
      const r = a / p;
      for (let q of pembagC) {
        let s;
        if (c === 0) s = 0;
        else if (q === 0) continue;
        else if (c % q !== 0) continue;
        else s = c / q;
        if (p * s + q * r === b) return [{ koefX: p, konstanta: q }, { koefX: r, konstanta: s }];
      }
    }
    return null;
  };

  const formatFaktor = (f) => {
    let res = f.koefX === 1 ? "x" : f.koefX === -1 ? "-x" : `${f.koefX}x`;
    if (f.konstanta > 0) res += `+${f.konstanta}`;
    else if (f.konstanta < 0) res += f.konstanta;
    return res;
  };

  const cariFaktorSama = (fNum, fDen) => {
    for (const fn of fNum) {
      for (const fd of fDen) {
        if (fn.koefX === fd.koefX && fn.konstanta === fd.konstanta) return fn;
      }
    }
    return null;
  };

  const hitungLimit = () => {
    setIsCalculating(true);
    const langkah = [];
    const x0 = parseFloat(menuju);

    if (Number.isNaN(x0)) {
      setHasil("Nilai x tidak valid");
      setIsCalculating(false);
      return;
    }

    langkah.push(`Analisis fungsi: f(x) = (${fungsi})`);
    langkah.push(`Mencari limit untuk x mendekati ${x0}`);

    const expr = normalisasiFungsi(fungsi);
    
    try {
      // 1. Coba Substitusi Langsung
      const nilaiLangsung = hitungEkspresi(expr, x0);
      
      if (!isNaN(nilaiLangsung) && isFinite(nilaiLangsung)) {
        langkah.push("Substitusi langsung menghasilkan nilai definit.");
        setHasil(nilaiLangsung);
        setSteps(langkah);
        setIsCalculating(false);
        return;
      }

      langkah.push("Substitusi langsung menghasilkan 0/0 (Bentuk Tak Tentu).");

      // 2. Analisis Pecahan untuk Faktorisasi
      const pecahan = fungsi.replace(/\s+/g, "").split("/");
      if (pecahan.length === 2) {
        const pembilang = pecahan[0].replace(/^\(|\)$/g, "");
        const penyebut = pecahan[1].replace(/^\(|\)$/g, "");

        // Gunakan metode aljabar (Faktorisasi)
        const fNum = faktorisasiLinear(pembilang) || faktorisasiKuadrat(pembilang);
        const fDen = faktorisasiLinear(penyebut) || faktorisasiKuadrat(penyebut);

        if (fNum && fDen) {
          const faktorSama = cariFaktorSama(fNum, fDen);
          if (faktorSama) {
            langkah.push(`Faktorisasi Pembilang: (${fNum.map(formatFaktor).join(")(")})`);
            langkah.push(`Faktorisasi Penyebut: (${fDen.map(formatFaktor).join(")(")})`);
            langkah.push(`Coret faktor yang sama: (${formatFaktor(faktorSama)})`);
            
            const sNum = fNum.filter(f => f !== faktorSama);
            const sDen = fDen.filter(f => f !== faktorSama);
            const sisaFungsi = `(${sNum.map(f => formatFaktor(f)).join("*") || "1"})/(${sDen.map(f => formatFaktor(f)).join("*") || "1"})`;
            
            const hasilFaktorisasi = evaluate(normalisasiFungsi(sisaFungsi), { x: x0 });
            langkah.push(`Substitusi ke sisa fungsi: f(${x0}) = ${hasilFaktorisasi}`);
            setHasil(hasilFaktorisasi);
            setSteps(langkah);
            setIsCalculating(false);
            return;
          }
        }

        // 3. Jika Faktorisasi Gagal, Gunakan Aturan L'Hôpital (Paling Ampuh)
        langkah.push("Menggunakan Aturan L'Hôpital (Turunan pembilang & penyebut)...");
        
        const turunanAtas = derivative(normalisasiFungsi(pembilang), 'x');
        const turunanBawah = derivative(normalisasiFungsi(penyebut), 'x');
        
        langkah.push(`Turunan atas: ${turunanAtas.toString()}`);
        langkah.push(`Turunan bawah: ${turunanBawah.toString()}`);
        
        const exprLHopital = `(${turunanAtas.toString()}) / (${turunanBawah.toString()})`;
        const hasilLHopital = evaluate(exprLHopital, { x: x0 });

        if (!isNaN(hasilLHopital) && isFinite(hasilLHopital)) {
          setHasil(hasilLHopital);
          setSteps(langkah);
          setIsCalculating(false);
          return;
        }
      }
    } catch (err) {
      langkah.push("Error dalam kalkulasi simbolik.");
    }

    setHasil("Tidak Terdefinisi");
    setSteps(langkah);
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12 font-sans text-slate-900">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Limit<span className="text-blue-600">Solver</span></h1>
            <p className="text-slate-500 text-sm font-medium">Kalkulator Limit Aljabar Step-by-Step</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Panel Kiri: Input */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Fungsi f(x)</label>
                  <input
                    value={fungsi}
                    onChange={(e) => setFungsi(e.target.value)}
                    placeholder="(x^2-4)/(x-2)"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-mono text-blue-600 focus:border-blue-500 focus:bg-white outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Nilai x Mendekati (c)</label>
                  <input
                    value={menuju}
                    onChange={(e) => setMenuju(e.target.value)}
                    placeholder="2"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-mono focus:border-blue-500 focus:bg-white outline-none transition-all"
                  />
                </div>

                <button
                  onClick={hitungLimit}
                  disabled={isCalculating}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isCalculating ? "MENGHITUNG..." : "HITUNG LIMIT"}
                </button>
              </div>
            </div>

            {/* Hasil Card */}
            {hasil !== null && (
              <div className="bg-blue-600 rounded-3xl p-5 text-white shadow-lg shadow-blue-100 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mb-1">
                      Hasil Akhir
                    </p>
                    <h2 className="text-3xl font-black font-mono leading-none tracking-tight">
                      {hasil}
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panel Kanan: Visual & Steps */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visualisasi Grafik */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200 min-h-[400px]">
              <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Visualisasi f(x)</h3>
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                {fungsi ? (
                  <FunctionPlot fungsi={normalisasiFungsi(fungsi)} label="f(x)" />
                ) : (
                  <div className="h-64 flex items-center justify-center text-slate-300 font-medium italic">
                    Masukkan fungsi untuk melihat grafik
                  </div>
                )}
              </div>
            </div>

            {/* Langkah Penyelesaian */}
            {steps.length > 0 && (
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 animate-in fade-in duration-700">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                   <span className="w-8 h-[2px] bg-blue-600"></span>
                   Langkah Analisis
                </h3>
                <div className="space-y-6">
                  {steps.map((s, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <div className="pt-2 text-slate-600 font-semibold leading-relaxed">
                        {s}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KalkulatorLimit;