import React, { useState } from "react";

const materiList = [
  "Sistem Bilangan Real",
  "Aljabar",
  "Trigonometri",
  "Fungsi",
  "Limit",
  "Turunan",
  "Integral – Luas Daerah",
  "Integral – Volume Benda Putar",
];

const TanyaSoalPage = () => {
  const [materi, setMateri] = useState(materiList[0]);
  const [input, setInput] = useState("");
  const [hasil, setHasil] = useState("");

  const hitung = () => {
    switch (materi) {
      case "Sistem Bilangan Real":
        return hitungBilanganReal();
      case "Aljabar":
        return hitungAljabar();
      case "Trigonometri":
        return hitungTrigonometri();
      case "Fungsi":
        return hitungFungsi();
      case "Limit":
        return hitungLimit();
      case "Turunan":
        return hitungTurunan();
      case "Integral – Luas Daerah":
        return hitungIntegralLuas();
      case "Integral – Volume Benda Putar":
        return hitungVolumePutar();
      default:
        return "Materi belum didukung.";
    }
  };

  // ============================
  // FUNGSI HITUNG PER MATERI
  // ============================

  const hitungBilanganReal = () => {
    try {
      // contoh input: 2+3*4
      const result = eval(input);
      setHasil("Hasil: " + result);
    } catch {
      setHasil("Format bilangan tidak valid");
    }
  };

  const hitungAljabar = () => {
    // contoh sangat sederhana
    // kamu bisa tingkatkan pakai math.js
    setHasil("Belum ada evaluator aljabar, masukkan ekspresi sederhana.");
  };

  const hitungTrigonometri = () => {
    try {
      // contoh: sin(30)
      let eksp = input.toLowerCase();

      eksp = eksp
        .replace("sin", "Math.sin")
        .replace("cos", "Math.cos")
        .replace("tan", "Math.tan");

      const result = eval(eksp);
      setHasil("Hasil: " + result);
    } catch {
      setHasil("Format trigonometri tidak valid");
    }
  };

  const hitungFungsi = () => {
    setHasil(
      "Masukkan format f(x). Contoh: f(x)=x^2 → belum ada parser khusus."
    );
  };

  const hitungLimit = () => {
    setHasil("Limit belum diimplementasikan. Bisa pakai metode numerik.");
  };

  const hitungTurunan = () => {
    setHasil("Turunan belum dibuat. Bisa pakai metode difference quotient.");
  };

  const hitungIntegralLuas = () => {
    setHasil(
      "Integral luas daerah belum dibuat. Bisa pakai metode Riemann sum."
    );
  };

  const hitungVolumePutar = () => {
    setHasil("Volume benda putar belum dibuat. Rumus π ∫ (f(x))² dx.");
  };

  // ============================
  // RENDER UI
  // ============================

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kalkulator Matematika UTBK</h1>

      {/* PILIH MATERI */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Pilih Materi:</label>
        <select
          className="border rounded p-2 w-full"
          value={materi}
          onChange={(e) => setMateri(e.target.value)}
        >
          {materiList.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* INPUT SOAL */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Masukkan Soal / Ekspresi:
        </label>
        <textarea
          className="border rounded p-2 w-full h-24"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Contoh: sin(30), 2+3*4, f(x)=x^2"
        ></textarea>
      </div>

      {/* TOMBOL HITUNG */}
      <button
        onClick={hitung}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Hitung
      </button>

      {/* HASIL */}
      <div className="border rounded p-3 bg-gray-50">
        <h2 className="font-semibold mb-2">Hasil:</h2>
        <p>{hasil}</p>
      </div>
    </div>
  );
};

export default TanyaSoalPage;
