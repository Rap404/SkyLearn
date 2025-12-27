import React from "react";

const MateriLimit = () => {
  // 1. Komponen Section untuk konsistensi layout (Sama dengan Turunan)
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

  // 2. Komponen FormulaBox untuk menonjolkan rumus (Sama dengan Turunan)
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
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">Materi Limit</h1>
          <p className="text-gray-500 text-lg">Memahami konsep pendekatan nilai dan kontinuitas fungsi.</p>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-blue-600"></div>
        </div>

        {/* SECTION 1: PENGERTIAN */}
        <Section title="1. Pengertian Dasar">
          <p className="mb-4 leading-relaxed">
            Limit aljabar adalah nilai yang didekati oleh suatu fungsi ketika variabelnya mendekati suatu titik tertentu. Limit menjelaskan perilaku fungsi di sekitar titik tersebut, meskipun fungsi mungkin tidak terdefinisi di titik itu sendiri.
          </p>
          
          <FormulaBox subTitle="Notasi Limit" formula="lim (x → a) f(x) = L" />
          <p className="mt-4 text-sm italic border-l-4 border-blue-200 pl-4 text-gray-500">
            Artinya, jika x mendekati a (tapi tidak sama dengan a), maka f(x) mendekati nilai L.
          </p>
        </Section>

        {/* SECTION 2: SIFAT-SIFAT */}
        <Section title="2. Sifat-Sifat Limit">
          <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50/50">
              <p className="text-sm font-bold text-gray-400 mb-2 uppercase">Penjumlahan / Pengurangan</p>
              <code className="text-blue-600 font-bold text-sm">lim [f(x) ± g(x)] = lim f(x) ± lim g(x)</code>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50/50">
              <p className="text-sm font-bold text-gray-400 mb-2 uppercase">Perkalian</p>
              <code className="text-blue-600 font-bold text-sm">lim [f(x) · g(x)] = lim f(x) · lim g(x)</code>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50/50">
              <p className="text-sm font-bold text-gray-400 mb-2 uppercase">Pembagian</p>
              <code className="text-blue-600 font-bold text-sm">lim [f(x) / g(x)] = lim f(x) / lim g(x)</code>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50/50">
              <p className="text-sm font-bold text-gray-400 mb-2 uppercase">Konstanta</p>
              <code className="text-blue-600 font-bold text-sm">lim [k · f(x)] = k · lim f(x)</code>
            </div>
          </div>
        </Section>

        {/* SECTION 3: TEKNIK PENYELESAIAN */}
        <Section title="3. Teknik Penyelesaian Dasar">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">1. Substitusi:</span>
              <span className="text-gray-600">Langkah pertama, masukkan langsung nilai x. Jika hasilnya angka real, itulah jawabannya.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">2. Faktorisasi:</span>
              <span className="text-gray-600">Jika substitusi menghasilkan $0/0$, faktorkan pembilang/penyebut untuk menghilangkan pembuat nol.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">3. Kali Sekawan:</span>
              <span className="text-gray-600">Digunakan khusus untuk fungsi yang memiliki akar agar bentuk tak tentu hilang.</span>
            </li>
          </ul>
        </Section>

        {/* SECTION 4: TRIGONOMETRI */}
        <div className="mt-16 mb-8">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">4. Limit Trigonometri</h2>
          <div className="mt-2 h-1 w-20 rounded-full bg-blue-600"></div>
        </div>

        <Section title="Rumus Identitas Utama">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormulaBox subTitle="Dasar Sinus" formula="lim (x → 0) [sin x / x] = 1" />
            <FormulaBox subTitle="Dasar Tangen" formula="lim (x → 0) [tan x / x] = 1" />
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-4 rounded-r-lg">
            <p className="text-sm text-amber-800 italic">
              <strong>Catatan:</strong> Rumus ini juga berlaku terbalik, misalnya $x / \sin x = 1$ dan untuk variabel dengan koefisien $ax / \sin bx = a/b$.
            </p>
          </div>
        </Section>

       {/* SECTION 5: CONTOH SOAL */}
        <Section title="5. Implementasi Langkah-Demi-Langkah">
          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-lg">
            <div className="bg-blue-600 px-6 py-3">
              <span className="text-xs font-black uppercase tracking-widest text-white">Contoh Faktorisasi</span>
            </div>
            <div className="p-6">
              <p className="text-lg font-medium text-gray-700 italic mb-4">
                {"Tentukan: lim (x → 2) (x² - 4) / (x - 2)"}
              </p>
              
              <div className="space-y-4 rounded-xl border-l-4 border-green-500 bg-green-50/50 p-5">
                <div className="flex items-start">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white mr-3 mt-1">1</span>
                  <p className="text-sm text-gray-700">
                    {"Substitusi langsung menghasilkan 0/0 (Bentuk Tak Tentu)."}
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white mr-3 mt-1">2</span>
                  <p className="text-sm text-gray-700">
                    {"Faktorkan pembilang: (x-2)(x+2)"}
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white mr-3 mt-1">3</span>
                  <p className="text-sm text-gray-700">
                    {"Coret faktor (x-2) yang menyebabkan nol."}
                  </p>
                </div>
                <div className="pt-2 border-t border-green-200">
                  <p className="font-mono text-xl font-bold text-gray-900">
                    {"lim (x + 2) = 2 + 2"}
                  </p>
                  <p className="mt-1 font-mono text-2xl font-black text-blue-600">
                    {"= 4"}
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

export default MateriLimit;