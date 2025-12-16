import React from "react";

const Turunan = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="mx-auto w-full max-w-4xl rounded-xl bg-white p-6 shadow-lg">
        {/* =======================
1. TURUNAN ALJABAR
======================== */}

        <h2 className="mb-4 text-2xl font-bold text-blue-700">
          1. Turunan Aljabar
        </h2>

        <div className="mb-6 rounded-lg border-l-4 border-blue-700 bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-blue-800">
            1.1 Pengertian
          </h3>
          <p className="mb-3">
            Turunan aljabar adalah salah satu konsep terpenting dalam kalkulus
            karena memberikan informasi mengenai bagaimana suatu fungsi berubah
            terhadap variabel bebasnya. Jika kita memiliki fungsi y = f(x), maka
            turunan f'(x) menggambarkan laju perubahan nilai y ketika x berubah
            dalam jumlah yang sangat kecil.
          </p>
          <p className="mb-3">
            Secara geometris, turunan adalah kemiringan garis singgung grafik
            fungsi. Jika grafik menaik, turunan positif; jika datar, turunan
            nol; jika menurun, turunan negatif.
          </p>
          <p>Secara limit: f'(x) = lim (h → 0) [ f(x+h) − f(x) ] / h.</p>
        </div>

        <div className="mb-6 rounded-lg border-l-4 border-blue-700 bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-blue-800">
            1.2 Aturan Dasar Turunan
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Turunan konstanta: d/dx (c) = 0</li>
            <li>Turunan pangkat: d/dx (xⁿ) = n xⁿ⁻¹</li>
            <li>Penjumlahan: (u ± v)' = u' ± v'</li>
            <li>Perkalian: (uv)' = u'v + uv'</li>
            <li>Pembagian: (u/v)' = (u'v − uv') / v²</li>
          </ul>
        </div>

        <div className="mb-6 rounded-lg border-l-4 border-blue-700 bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-blue-800">
            1.3 Contoh Dasar
          </h3>
          <p>
            <b>Soal:</b> f(x) = 3x³ − 5x + 7
          </p>
          <p>
            <b>Pembahasan:</b> f'(x) = 9x² − 5
          </p>
        </div>

        <div className="mb-6 rounded-lg border-l-4 border-blue-700 bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-blue-800">
            1.5 Aturan Rantai (Chain Rule)
          </h3>
          <p className="mb-2">Jika y = f(g(x)), maka y' = f'(g(x)) · g'(x)</p>
          <p>
            <b>Contoh:</b> y = (3x² + 1)⁵
          </p>
          <p>y' = 5(3x² + 1)⁴ · 6x</p>
        </div>

        {/* =======================
2. TURUNAN TRIGONOMETRI
======================== */}

        <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-700">
          2. Turunan Trigonometri
        </h2>

        <div className="mb-6 rounded-lg border-l-4 border-blue-700 bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-blue-800">
            2.1 Pengertian
          </h3>
          <p>
            Turunan fungsi trigonometri melibatkan sin, cos, tan, cot, sec, dan
            csc. Fungsi ini banyak digunakan pada gelombang, getaran, dan gerak
            melingkar.
          </p>
        </div>

        <div className="mb-6 rounded-lg border-l-4 border-blue-700 bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-blue-800">
            2.2 Aturan Dasar
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>(sin x)' = cos x</li>
            <li>(cos x)' = −sin x</li>
            <li>(tan x)' = sec² x</li>
            <li>(cot x)' = −csc² x</li>
            <li>(sec x)' = sec x tan x</li>
            <li>(csc x)' = −csc x cot x</li>
          </ul>
        </div>

        <div className="mb-6 rounded-lg border-l-4 border-blue-700 bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-blue-800">
            2.3 Contoh
          </h3>
          <p>f(x) = 4 sin x + 2 cos x</p>
          <p>f'(x) = 4 cos x − 2 sin x</p>
        </div>

        <div className="mb-6 rounded-lg border-l-4 border-blue-700 bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-blue-800">
            2.5 Aturan Rantai Trigonometri
          </h3>
          <p>
            <b>Contoh:</b> f(x) = cos(x³)
          </p>
          <p>f'(x) = −sin(x³) · 3x²</p>
        </div>
      </div>
    </div>
  );
};

export default Turunan;
