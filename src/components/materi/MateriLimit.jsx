import React from "react";

export default function MateriLimit() {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* LIMIT ALJABAR */}
        <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-800 pb-2 mb-4">
          1. Limit Aljabar
        </h2>

        <div className="space-y-5">
          <section className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              1.1 Pengertian Limit Aljabar
            </h3>
            <p className="text-justify">
              Limit aljabar adalah nilai yang didekati oleh suatu fungsi aljabar
              ketika variabel bebasnya mendekati suatu nilai tertentu. Konsep
              limit digunakan untuk memahami perilaku fungsi di sekitar suatu
              titik, baik fungsi tersebut terdefinisi maupun tidak pada titik
              tersebut.
            </p>
          </section>

          <section className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              1.2 Notasi dan Konsep Dasar
            </h3>
            <p>Notasi limit dituliskan sebagai:</p>
            <p className="font-bold my-2">lim x → a f(x)</p>
            <p>
              Artinya, nilai fungsi f(x) mendekati suatu bilangan tertentu
              ketika x mendekati a.
            </p>
          </section>

          <section className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              1.3 Sifat-sifat Limit Aljabar
            </h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>lim (f(x) + g(x)) = lim f(x) + lim g(x)</li>
              <li>lim (f(x) − g(x)) = lim f(x) − lim g(x)</li>
              <li>lim (f(x) · g(x)) = lim f(x) · lim g(x)</li>
              <li>
                lim (f(x) / g(x)) = lim f(x) / lim g(x), selama penyebut ≠ 0
              </li>
              <li>lim c = c, dengan c adalah konstanta</li>
            </ul>
          </section>

          <section className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              1.4 Contoh Soal Limit Aljabar
            </h3>
            <p className="font-semibold">Soal:</p>
            <p>lim x → 3 (2x + 5)</p>
            <p className="font-semibold mt-2">Pembahasan:</p>
            <p>lim x → 3 (2x + 5) = 2(3) + 5 = 11</p>
            <p className="font-semibold mt-1">Jawaban: 11</p>
          </section>

          <section className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              1.5 Contoh Soal Bentuk Tak Tentu
            </h3>
            <p className="font-semibold">Soal:</p>
            <p>lim x → 2 (x² − 4) / (x − 2)</p>
            <p className="font-semibold mt-2">Pembahasan:</p>
            <p>x² − 4 = (x − 2)(x + 2)</p>
            <p>(x − 2)(x + 2)/(x − 2) = x + 2</p>
            <p>lim x → 2 (x + 2) = 4</p>
            <p className="font-semibold mt-1">Jawaban: 4</p>
          </section>
        </div>

        {/* LIMIT TRIGONOMETRI */}
        <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-800 pb-2 mt-10 mb-4">
          2. Limit Trigonometri
        </h2>

        <div className="space-y-5">
          <section className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              2.1 Pengertian Limit Trigonometri
            </h3>
            <p className="text-justify">
              Limit trigonometri adalah limit yang melibatkan fungsi-fungsi
              trigonometri seperti sinus, cosinus, dan tangen. Penentuan limit
              trigonometri sering menggunakan identitas dasar trigonometri.
            </p>
          </section>

          <section className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              2.2 Limit Trigonometri Dasar
            </h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>lim x → 0 (sin x / x) = 1</li>
              <li>lim x → 0 (tan x / x) = 1</li>
              <li>lim x → 0 (1 − cos x) / x = 0</li>
            </ul>
          </section>

          <section className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              2.3 Contoh Soal Limit Trigonometri
            </h3>
            <p className="font-semibold">Soal:</p>
            <p>lim x → 0 (sin x / x)</p>
            <p className="font-semibold mt-2">Pembahasan:</p>
            <p>lim x → 0 (sin x / x) = 1</p>
            <p className="font-semibold mt-1">Jawaban: 1</p>
          </section>

          <section className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              2.4 Contoh Soal Limit Trigonometri Lanjutan
            </h3>
            <p className="font-semibold">Soal:</p>
            <p>lim x → 0 (3 sin x / x)</p>
            <p className="font-semibold mt-2">Pembahasan:</p>
            <p>3 × lim x → 0 (sin x / x) = 3 × 1 = 3</p>
            <p className="font-semibold mt-1">Jawaban: 3</p>
          </section>
        </div>
      </div>
    </div>
  );
}
