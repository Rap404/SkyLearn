import React from "react";

const MateriTurunan = () => {
  // 1. Komponen Section untuk konsistensi layout
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

  // 2. Komponen FormulaBox untuk menonjolkan rumus
  const FormulaBox = ({ formula, subTitle }) => (
    <div className="my-4 rounded-xl border border-blue-50 bg-blue-50/30 p-5">
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
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">Materi Turunan</h1>
          <p className="text-gray-500 text-lg">Konsep dasar, aturan kalkulus, hingga fungsi kompleks.</p>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-blue-600"></div>
        </div>

        {/* SECTION 1: DASAR */}
        <Section title="1. Pengertian & Aturan Dasar">
          <p className="mb-4 leading-relaxed">
            Turunan fungsi $f(x)$ didefinisikan sebagai laju perubahan sesaat nilai fungsi tersebut. Secara geometri, turunan di suatu titik adalah gradien garis singgung kurva di titik tersebut.
          </p>
          <FormulaBox subTitle="Definisi Limit" formula="f'(x) = lim (h → 0) [f(x+h) - f(x)] / h" />
          
          <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50/50">
              <p className="text-sm font-bold text-gray-400 mb-2 uppercase">Aturan Pangkat</p>
              <code className="text-blue-600 font-bold">d/dx (xⁿ) = n·xⁿ⁻¹</code>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50/50">
              <p className="text-sm font-bold text-gray-400 mb-2 uppercase">Aturan Konstanta</p>
              <code className="text-blue-600 font-bold">d/dx (c) = 0</code>
            </div>
          </div>
        </Section>

        {/* SECTION 2: OPERASI TURUNAN */}
        <Section title="2. Aturan Operasi (uv & u/v)">
          <p className="mb-4 text-sm italic text-gray-500">Gunakan aturan ini jika fungsi berupa perkalian atau pembagian dua variabel.</p>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-gray-700">Aturan Perkalian (Product Rule)</span>
              <code className="text-lg font-bold text-blue-600">(u · v)' = u'v + uv'</code>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-gray-700">Aturan Pembagian (Quotient Rule)</span>
              <code className="text-lg font-bold text-blue-600">(u / v)' = (u'v - uv') / v²</code>
            </div>
          </div>
        </Section>

        {/* SECTION 3: ATURAN RANTAI (MATERI YANG HILANG) */}
        <Section title="3. Aturan Rantai (Chain Rule)">
          <p className="mb-4">
            Aturan ini digunakan untuk mencari turunan dari <strong>fungsi komposisi</strong> atau "fungsi di dalam fungsi".
          </p>
          <FormulaBox subTitle="Komposisi Fungsi" formula="dy/dx = (dy/du) · (du/dx)" />
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <p className="text-sm text-amber-800">
              <strong>Tips:</strong> Turunkan bagian luar dulu, biarkan bagian dalam tetap, lalu kalikan dengan turunan bagian dalam.
            </p>
          </div>
        </Section>

        {/* SECTION 4: TRIGONOMETRI */}
        <div className="mt-16 mb-8">
          <h2 className="text-3xl font-black text-gray-900">4. Turunan Trigonometri</h2>
          <div className="mt-2 h-1 w-20 rounded-full bg-blue-600"></div>
        </div>

        <Section title="Tabel Turunan Fungsi Trigonometri">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              { f: "sin x", d: "cos x" },
              { f: "cos x", d: "-sin x" },
              { f: "tan x", d: "sec² x" },
              { f: "cot x", d: "-csc² x" },
              { f: "sec x", d: "sec x tan x" },
              { f: "csc x", d: "-csc x cot x" },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                <p className="text-[10px] font-bold text-gray-400">f(x) = {item.f}</p>
                <p className="mt-1 font-mono font-bold text-blue-600 group-hover:text-white">
                  f'(x) = {item.d}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* SECTION 5: CONTOH KASUS KOMPLEKS */}
        <Section title="5. Contoh Implementasi Langkah-Demi-Langkah">
          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-lg">
            <div className="bg-blue-600 px-6 py-3">
              <span className="text-xs font-black uppercase tracking-widest text-white">Soal Tantangan</span>
            </div>
            <div className="p-6">
              <p className="text-lg font-medium text-gray-700 italic mb-4">Tentukan turunan dari $f(x) = \sin(4x^2 + 5)$</p>
              
              <div className="space-y-4 rounded-xl border-l-4 border-green-500 bg-green-50/50 p-5">
                <div className="flex items-start">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white mr-3 mt-1">1</span>
                  <p className="text-sm text-gray-700">Identifikasi fungsi luar: $\sin(u)$ dimana $u = 4x^2 + 5$</p>
                </div>
                <div className="flex items-start">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white mr-3 mt-1">2</span>
                  <p className="text-sm text-gray-700">Turunan luar ($\cos(u)$) dikali turunan dalam ($8x$)</p>
                </div>
                <div className="pt-2 border-t border-green-200">
                  <p className="font-mono text-xl font-bold text-gray-900">
                    f'(x) = \cos(4x^2 + 5) · 8x
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold text-blue-600">
                    f'(x) = 8x \cos(4x^2 + 5)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default MateriTurunan;