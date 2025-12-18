import React, { useState } from "react";
import FunctionPlot from "../FunctionPlot";
import { evaluate } from "mathjs";

const KalkulatorLimit = () => {
  const [fungsi, setFungsi] = useState("");
  const [menuju, setMenuju] = useState("");
  const [hasil, setHasil] = useState(null);
  const [steps, setSteps] = useState([]);

  const normalisasiFungsi = (f) => {
    return (
      f
        .replace(/\s+/g, "")
        // 3x → 3*x
        .replace(/(\d)x/g, "$1*x")
        // )x → )*x
        .replace(/\)\s*x/g, ")*x")
        // x( → x*(
        .replace(/x\s*\(/g, "x*(")
        // )( → )*(
        .replace(/\)\s*\(/g, ")*(")
        // xsin(x) → x*sin(x)
        .replace(/x(?=[a-zA-Z])/g, "x*")
    );
  };

  const hitungEkspresi = (expr, xValue) => {
    try {
      return evaluate(expr, { x: xValue });
    } catch (err) {
      return NaN;
    }
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

  // PERBAIKAN 1: Parse kuadrat yang lebih robust
  const parseKuadrat = (str) => {
    const s = str.replace(/\s+/g, "");

    let a = 0,
      b = 0,
      c = 0;

    // Parse x^2 term
    const x2Match = s.match(/([+-]?\d*)x\^2/);
    if (x2Match) {
      const coef = x2Match[1];
      if (coef === "" || coef === "+") a = 1;
      else if (coef === "-") a = -1;
      else a = parseInt(coef);
    }

    // Parse x term (PERBAIKAN: tangani kasus -x, +x, x tanpa koefisien)
    const withoutX2 = s.replace(/[+-]?\d*x\^2/, "");
    const xMatch = withoutX2.match(/([+-]?\d*)x(?!\^)/);
    if (xMatch) {
      const coef = xMatch[1];
      if (coef === "" || coef === "+") b = 1;
      else if (coef === "-") b = -1;
      else b = parseInt(coef);
    }

    // Parse constant term
    const withoutX = s.replace(/[+-]?\d*x\^?\d*/g, "");
    if (withoutX) {
      const constants = withoutX.match(/[+-]?\d+/g);
      if (constants) {
        c = constants.reduce((sum, val) => sum + parseInt(val), 0);
      }
    }

    if (a === 0) return null;
    return { a, b, c };
  };

  // PERBAIKAN 2: Faktorisasi kuadrat dengan algoritma yang benar
  const faktorisasiKuadrat = (str) => {
    const parsed = parseKuadrat(str);
    if (!parsed) return null;

    const { a, b, c } = parsed;

    // (px + q)(rx + s) = prx² + (ps + qr)x + qs
    // Syarat: pr = a, qs = c, ps + qr = b

    // Cari semua pembagi positif dan negatif dari a
    const getPembagi = (n) => {
      const pembagi = [];
      const absN = Math.abs(n);
      for (let i = 1; i <= absN; i++) {
        if (absN % i === 0) {
          pembagi.push(i);
          pembagi.push(-i);
        }
      }
      return pembagi;
    };

    const pembagA = a === 0 ? [0] : getPembagi(a);
    const maxC = Math.max(Math.abs(c), 1);
    const pembagC = [];
    for (let i = -maxC; i <= maxC; i++) {
      pembagC.push(i);
    }

    // Coba semua kombinasi p, q, r, s
    for (let p of pembagA) {
      if (p === 0) continue;
      const r = a / p;

      for (let q of pembagC) {
        // Hitung s dari syarat qs = c
        let s;
        if (c === 0) {
          s = 0;
        } else if (q === 0) {
          continue; // Skip jika q = 0 tapi c ≠ 0
        } else if (c % q !== 0) {
          continue; // Skip jika c tidak habis dibagi q
        } else {
          s = c / q;
        }

        // Validasi: ps + qr harus = b
        if (p * s + q * r === b) {
          return [
            { koefX: p, konstanta: q },
            { koefX: r, konstanta: s },
          ];
        }
      }
    }

    return null;
  };

  // PERBAIKAN 3: Format faktor dengan benar
  const formatFaktor = (koefX, konstanta) => {
    let result = "";

    if (koefX === 1) result = "x";
    else if (koefX === -1) result = "-x";
    else result = `${koefX}*x`;

    if (konstanta > 0) result += `+${konstanta}`;
    else if (konstanta < 0) result += konstanta;

    return result;
  };

  // PERBAIKAN 4: Cek apakah dua faktor ekuivalen
  const isFaktorEkuivalen = (f1, f2, x0) => {
    const expr1 = formatFaktor(f1.koefX, f1.konstanta);
    const expr2 = formatFaktor(f2.koefX, f2.konstanta);

    const val1 = hitungEkspresi(normalisasiFungsi(expr1), x0);
    const val2 = hitungEkspresi(normalisasiFungsi(expr2), x0);

    // Jika keduanya bernilai 0 di x0, kemungkinan besar sama
    return Math.abs(val1) < 0.0001 && Math.abs(val2) < 0.0001;
  };

  const cariFaktorSama = (fNum, fDen) => {
    for (const fn of fNum) {
      for (const fd of fDen) {
        if (fn.koefX === fd.koefX && fn.konstanta === fd.konstanta) {
          return fn;
        }
      }
    }
    return null;
  };

  const hitungLimit = () => {
    const langkah = [];

    const x0 = parseFloat(menuju);

    if (Number.isNaN(x0)) {
      setHasil("Nilai x tidak valid");
      return;
    }

    langkah.push(`1️⃣ Diketahui fungsi f(x) = ${fungsi}`);
    langkah.push(`Limit akan dihitung saat x → ${x0}`);

    // STEP 2: Substitusi langsung
    langkah.push(`2️⃣ Coba substitusi langsung x = ${x0}`);

    const expr = normalisasiFungsi(fungsi);
    const nilai = hitungEkspresi(expr, x0);
    try {
      if (isNaN(nilai) || !isFinite(nilai)) {
        langkah.push(
          "Substitusi langsung menghasilkan bentuk tak tentu (0/0 atau ∞)."
        );
      } else {
        langkah.push("Substitusi langsung berhasil.");
        langkah.push(`f(${x0}) = ${nilai}`);
        setHasil(nilai);
        setSteps(langkah);
        return;
      }
    } catch {
      langkah.push("Substitusi langsung tidak dapat dilakukan.");
    }

    // STEP 3: Limit Trigonometri Khusus
    if (x0 === 0) {
      if (/sin\(x\)\s*\/\s*x/.test(fungsi)) {
        langkah.push("3️⃣ Gunakan limit trigonometri khusus:");
        langkah.push(" lim x→0 (sin x / x) = 1");
        setHasil(1);
        setSteps(langkah);
        return;
      }

      if (/tan\(x\)\s*\/\s*x/.test(fungsi)) {
        langkah.push("3️⃣ Gunakan limit trigonometri khusus:");
        langkah.push(" lim x→0 (tan x / x) = 1");
        setHasil(1);
        setSteps(langkah);
        return;
      }

      if (/\(1\s*-\s*cos\(x\)\)\s*\/\s*x\^2/.test(fungsi)) {
        langkah.push("3️⃣ Gunakan identitas trigonometri:");
        langkah.push(" lim x→0 (1 − cos x) / x² = 1/2");
        setHasil(0.5);
        setSteps(langkah);
        return;
      }
    }

    // langkah.push("Bentuk 0/0 terdeteksi, lanjut faktorisasi");

    // STEP 4: parsing pecahan
    const pecahan = fungsi.replace(/\s+/g, "").split("/");

    if (pecahan.length !== 2) {
      setHasil("Format fungsi tidak dikenali");
      setSteps(langkah);
      return;
    }

    const pembilang = pecahan[0].replace(/^\(|\)$/g, "");
    const penyebut = pecahan[1].replace(/^\(|\)$/g, "");

    const numVal = evaluate(normalisasiFungsi(pembilang), { x: x0 });
    const denVal = evaluate(normalisasiFungsi(penyebut), { x: x0 });

    if (!(numVal === 0 && denVal === 0)) {
      setHasil("Limit tidak berbentuk 0/0");
      setSteps(langkah);
      return;
    }

    langkah.push("3️⃣ Bentuk 0/0 terdeteksi, lanjut faktorisasi");

    // ===== FAKTORISASI LINEAR =====
    const fNum = faktorisasiLinear(pembilang) || faktorisasiKuadrat(pembilang);
    const fDen = faktorisasiLinear(penyebut) || faktorisasiKuadrat(penyebut);

    console.log("fNum:", fNum, "fDen:", fDen);
    if (fNum && fDen) {
      const faktorSama = cariFaktorSama(fNum, fDen);

      if (faktorSama) {
        langkah.push(`4️⃣ Faktorisasi pembilang: (${fNum.join(")(")})`);
        langkah.push(`5️⃣ Faktorisasi penyebut: (${fDen.join(")(")})`);
        langkah.push(`6️⃣ Coret faktor sama (${faktorSama})`);
        const sisaNum = fNum.filter(
          (f) =>
            !(
              f.koefX === faktorSama.koefX &&
              f.konstanta === faktorSama.konstanta
            )
        );

        const sisaDen = fDen.filter(
          (f) =>
            !(
              f.koefX === faktorSama.koefX &&
              f.konstanta === faktorSama.konstanta
            )
        );

        const numStr =
          sisaNum.map((f) => formatFaktor(f.koefX, f.konstanta)).join("*") ||
          "1";
        const denStr =
          sisaDen.map((f) => formatFaktor(f.koefX, f.konstanta)).join("*") ||
          "1";

        const exprBaru = `(${numStr})/(${denStr})`;

        const hasilAkhir = evaluate(normalisasiFungsi(exprBaru), { x: x0 });

        langkah.push(`7️⃣ Substitusi x = ${x0}`);
        langkah.push(`Hasil limit = ${hasilAkhir}`);

        setHasil(hasilAkhir);
        setSteps(langkah);
        return;
      }
    }

    setHasil("Belum bisa dihitung otomatis");
    setSteps(langkah);
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-100 p-5">
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
        {fungsi && (
          <FunctionPlot fungsi={normalisasiFungsi(fungsi)} label="f(x)" />
        )}
      </div>
    </div>
  );
};

export default KalkulatorLimit;
