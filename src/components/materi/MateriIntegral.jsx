import React from "react";

const MateriIntegral = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {/* 1. Integral */}
        <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-4">
          1. Integral
        </h2>

        <div className="mt-5 p-4 bg-blue-50 border-l-4 border-blue-900 rounded-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            1.1 Pengertian Integral
          </h3>
          <p className="text-justify">
            Integral merupakan kebalikan dari turunan. Integral digunakan untuk
            menentukan fungsi asal dari suatu fungsi turunan serta untuk
            menghitung luas daerah dan volume benda putar. Dalam kalkulus,
            integral dibedakan menjadi integral tak tentu dan integral tentu.
          </p>
        </div>

        <div className="mt-5 p-4 bg-blue-50 border-l-4 border-blue-900 rounded-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            1.2 Integral Tak Tentu
          </h3>
          <p className="text-justify">
            Integral tak tentu adalah proses mencari fungsi asal tanpa batas
            tertentu. Bentuk umumnya adalah:
          </p>
          <p className="font-semibold my-2">∫ f(x) dx = F(x) + C</p>
          <p>dengan C adalah konstanta integrasi.</p>
        </div>

        <div className="mt-5 p-4 bg-blue-50 border-l-4 border-blue-900 rounded-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            1.3 Integral Tentu
          </h3>
          <p className="text-justify">
            Integral tentu digunakan untuk menghitung nilai numerik dari suatu
            fungsi dalam interval tertentu.
          </p>
          <p className="font-semibold my-2">∫ₐᵇ f(x) dx = F(b) − F(a)</p>
        </div>

        {/* 2. Luas Daerah */}
        <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mt-10 mb-4">
          2. Menghitung Luas Daerah dengan Integral
        </h2>

        <div className="mt-5 p-4 bg-blue-50 border-l-4 border-blue-900 rounded-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            2.1 Konsep Luas Daerah
          </h3>
          <p className="text-justify">
            Luas daerah dapat dihitung menggunakan integral tentu dari suatu
            fungsi terhadap sumbu-x pada interval tertentu.
          </p>
          <p className="font-semibold my-2">L = ∫ₐᵇ f(x) dx</p>
        </div>

        <div className="mt-5 p-4 bg-blue-50 border-l-4 border-blue-900 rounded-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            2.2 Contoh Soal Luas Daerah
          </h3>
          <p>
            <strong>Soal:</strong> Hitunglah luas daerah yang dibatasi oleh
            kurva y = x², sumbu-x, dan garis x = 0 sampai x = 2.
          </p>
          <p className="mt-2">
            <strong>Pembahasan:</strong>
          </p>
          <p>L = ∫₀² x² dx</p>
          <p>L = [ x³ / 3 ]₀²</p>
          <p>L = 8 / 3</p>
          <p className="font-semibold mt-2">
            Jawaban: Luas daerah adalah 8/3 satuan luas.
          </p>
        </div>

        {/* 3. Volume Benda Putar */}
        <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mt-10 mb-4">
          3. Volume Benda Putar
        </h2>

        <div className="mt-5 p-4 bg-blue-50 border-l-4 border-blue-900 rounded-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            3.1 Konsep Volume Benda Putar
          </h3>
          <p className="text-justify">
            Volume benda putar diperoleh dengan memutar suatu daerah di bawah
            kurva terhadap sumbu tertentu, biasanya sumbu-x atau sumbu-y.
          </p>
        </div>

        <div className="mt-5 p-4 bg-blue-50 border-l-4 border-blue-900 rounded-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            3.2 Rumus Volume Metode Cakram
          </h3>
          <p className="font-semibold">V = π ∫ₐᵇ [f(x)]² dx</p>
        </div>

        <div className="mt-5 p-4 bg-blue-50 border-l-4 border-blue-900 rounded-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            3.3 Contoh Soal Volume Benda Putar
          </h3>
          <p>
            <strong>Soal:</strong> Tentukan volume benda putar jika y = x²
            diputar terhadap sumbu-x dari x = 0 sampai x = 1.
          </p>
          <p className="mt-2">V = π ∫₀¹ x⁴ dx</p>
          <p>V = π [ x⁵ / 5 ]₀¹</p>
          <p>V = π / 5</p>
          <p className="font-semibold mt-2">
            Jawaban: Volume benda putar adalah π/5 satuan volume.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MateriIntegral;
