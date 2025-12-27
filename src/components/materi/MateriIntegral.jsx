import React from "react";

const MateriIntegral = () => {
  // 1. Komponen Section (Sama dengan materi sebelumnya)
  const Section = ({ title, children }) => (
    <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <h3 className="mb-4 flex items-center text-lg md:text-xl font-bold text-gray-800">
        <span className="mr-3 h-5 w-1.5 rounded-full bg-blue-600"></span>
        {title}
      </h3>
      <div className="text-gray-600">
        {children}
      </div>
    </div>
  );

  // 2. Komponen FormulaBox (Sama dengan materi sebelumnya)
  const FormulaBox = ({ formula, subTitle }) => (
    <div className="my-4 rounded-xl border border-blue-50 bg-blue-50/30 p-5 text-center">
      {subTitle && <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-blue-400">{subTitle}</p>}
      <p className="overflow-x-auto font-mono text-base font-bold text-blue-700 md:text-lg whitespace-nowrap">
        {formula}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="mx-auto w-full max-w-5xl p-6 md:p-12">
        
        {/* HEADER UTAMA */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">Materi Integral</h1>
          <p className="text-gray-500 text-lg">Memahami konsep anti-turunan, luas daerah, dan volume benda putar.</p>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-blue-600"></div>
        </div>

        {/* SECTION 1: PENGERTIAN */}
        <Section title="1. Pengertian Dasar">
          <p className="leading-relaxed text-justify mb-4">
            {"Integral adalah operasi kebalikan dari turunan (anti-turunan). Jika turunan mencari laju perubahan, maka integral mencari akumulasi total dari perubahan tersebut."}
          </p>
          

[Image of definite integral as area under curve]

          <FormulaBox subTitle="Bentuk Umum Tak Tentu" formula="∫ f(x) dx = F(x) + C" />
          <p className="mt-4 text-sm italic border-l-4 border-blue-200 pl-4 text-gray-500">
            {"Di mana F(x) adalah fungsi asal, f(x) adalah fungsi turunan, dan C adalah konstanta integrasi."}
          </p>
        </Section>

        {/* SECTION 2: ATURAN DASAR */}
        <Section title="2. Aturan Pangkat & Konstanta">
          <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50/50">
              <p className="text-sm font-bold text-gray-400 mb-2 uppercase">Aturan Pangkat</p>
              <code className="text-blue-600 font-bold text-sm">{"∫ xⁿ dx = [1/(n+1)] xⁿ⁺¹ + C"}</code>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50/50">
              <p className="text-sm font-bold text-gray-400 mb-2 uppercase">Aturan Konstanta</p>
              <code className="text-blue-600 font-bold text-sm">{"∫ k dx = kx + C"}</code>
            </div>
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-6 rounded-r-lg text-sm text-amber-800">
            <strong>Catatan:</strong> Aturan pangkat tidak berlaku jika n = -1. Untuk n = -1, hasilnya adalah <strong>ln|x| + C</strong>.
          </div>
        </Section>

        {/* SECTION 3: INTEGRAL TRIGONOMETRI */}
        <Section title="3. Integral Trigonometri">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              { f: "∫ sin x dx", d: "-cos x + C" },
              { f: "∫ cos x dx", d: "sin x + C" },
              { f: "∫ sec² x dx", d: "tan x + C" },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase">{item.f}</p>
                <p className="mt-1 font-mono font-bold text-blue-600">{item.d}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* SECTION 4: INTEGRAL TENTU & APLIKASI */}
        <div className="mt-16 mb-8">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">4. Aplikasi Integral</h2>
          <div className="mt-2 h-1 w-20 rounded-full bg-blue-600"></div>
        </div>

        <Section title="Luas Daerah & Volume Benda Putar">
          <p className="mb-4">Integral tentu digunakan untuk menghitung nilai pasti dalam batas interval [a, b].</p>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Rumus Volume (Metode Cakram)</span>
              <code className="text-lg font-bold text-blue-600">{"V = π ∫ [f(x)]² dx"}</code>
            </div>
          </div>
        </Section>

        {/* SECTION 5: CONTOH PEMBAHASAN */}
        <Section title="5. Implementasi Langkah-Demi-Langkah">
          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-lg">
            <div className="bg-blue-600 px-6 py-3">
              <span className="text-xs font-black uppercase tracking-widest text-white">Soal Integral Tentu</span>
            </div>
            <div className="p-6">
              <p className="text-lg font-medium text-gray-700 italic mb-4">{"Hitung luas daerah: ∫₀² (3x²) dx"}</p>
              
              <div className="space-y-4 rounded-xl border-l-4 border-green-500 bg-green-50/50 p-5">
                <div className="flex items-start">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white mr-3 mt-1">1</span>
                  <p className="text-sm text-gray-700">{"Cari anti-turunannya: 3 * (1/3)x³ = x³"}</p>
                </div>
                <div className="flex items-start">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white mr-3 mt-1">2</span>
                  <p className="text-sm text-gray-700">{"Masukkan batas atas (2): (2)³ = 8"}</p>
                </div>
                <div className="flex items-start">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white mr-3 mt-1">3</span>
                  <p className="text-sm text-gray-700">{"Masukkan batas bawah (0): (0)³ = 0"}</p>
                </div>
                <div className="pt-2 border-t border-green-200">
                  <p className="font-mono text-xl font-bold text-gray-900">{"Hasil: 8 - 0"}</p>
                  <p className="mt-1 font-mono text-2xl font-black text-blue-600">{"= 8 Satuan Luas"}</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default MateriIntegral;