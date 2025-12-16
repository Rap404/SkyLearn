import React, { useState } from "react";

const Limit = () => {
  const [fungsi, setFungsi] = useState("");
  const [menuju, setMenuju] = useState("");
  const [hasil, setHasil] = useState(null);
  const [steps, setSteps] = useState([]);

  const hitungLimit = () => {
    const langkah = [];

    // STEP 1
    langkah.push("1️⃣ Diketahui fungsi f(x) = " + fungsi);
    langkah.push(" Limit akan dihitung saat x → " + menuju);

    // STEP 2: Substitusi langsung
    langkah.push("2️⃣ Coba substitusi langsung nilai x = " + menuju);

    try {
      const ekspresi = fungsi.replace(/x/g, `(${menuju})`);
      const nilai = eval(ekspresi);

      if (isNaN(nilai) || !isFinite(nilai)) {
        langkah.push(
          " Substitusi langsung menghasilkan bentuk tak tentu (0/0 atau ∞)."
        );
      } else {
        langkah.push(" Substitusi langsung berhasil.");
        langkah.push(` f(${menuju}) = ${nilai}`);
        setHasil(nilai);
        setSteps(langkah);
        return;
      }
    } catch {
      langkah.push(" Substitusi langsung tidak dapat dilakukan.");
    }

    // STEP 3: Limit trigonometri dasar
    if (fungsi.includes("sin") && fungsi.includes("/ x")) {
      langkah.push("3️⃣ Gunakan limit trigonometri dasar:");
      langkah.push(" lim x→0 (sin x / x) = 1");
      setHasil(1);
    } else if (fungsi.includes("1 - cos") && fungsi.includes("/ x")) {
      langkah.push("3️⃣ Gunakan identitas trigonometri:");
      langkah.push(" lim x→0 (1 - cos x) / x² = 1/2");
      setHasil(0.5);
    } else {
      langkah.push(
        "3️⃣ Metode lanjutan diperlukan (faktorisasi / rasionalisasi)."
      );
      setHasil("Tidak dapat dihitung otomatis");
    }

    setSteps(langkah);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-blue-600">
          Kalkulator Limit (Step by Step)
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium">Fungsi f(x)</label>
          <input
            value={fungsi}
            onChange={(e) => setFungsi(e.target.value)}
            placeholder="contoh: sin(x)/x"
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">x →</label>
          <input
            value={menuju}
            onChange={(e) => setMenuju(e.target.value)}
            placeholder="contoh: 0"
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        <button
          onClick={hitungLimit}
          className="mb-6 w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Hitung Limit
        </button>

        {hasil !== null && (
          <div className="rounded-md bg-green-100 p-3 mb-4">
            <b>Hasil Limit:</b> {hasil}
          </div>
        )}

        {steps.length > 0 && (
          <div className="rounded-md bg-gray-50 p-4">
            <h2 className="mb-2 font-semibold">Langkah Penyelesaian:</h2>
            <ul className="list-decimal pl-5 space-y-1 text-sm">
              {steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Limit;
