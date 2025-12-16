// src/Components/LimitCalculator.jsx

import React, { useState } from 'react';

const LimitCalculator = () => {
    const [functionInput, setFunctionInput] = useState('');
    const [limitValue, setLimitValue] = useState(''); // Nilai x yang dituju (c)
    const [variable, setVariable] = useState('x');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        const c = parseFloat(limitValue);

        // Validasi input limit
        if (isNaN(c) && limitValue.toLowerCase() !== 'inf') {
            setResult({
                limit: "Input limit tidak valid.",
                steps: ["Mohon masukkan nilai limit yang valid (angka atau 'inf')."],
                type: 'error'
            });
            setLoading(false);
            return;
        }

        // Simulasi perhitungan API/Logika Backend untuk LIMIT
        setTimeout(() => {
            let calculatedResult;
            const functionText = functionInput.toLowerCase();

            if (functionText.includes('x^2')) {
                // Contoh: lim (x->c) x^2. Hasil: c^2
                const res = c * c;
                calculatedResult = {
                    limit: res.toFixed(2),
                    steps: [
                        "Fungsi: f(x) = x²",
                        `Nilai yang dituju: ${variable} → ${limitValue}`,
                        "Substitusi Langsung: f(c) = c²",
                        `Hasil: ${c}² = ${res.toFixed(2)}`,
                    ],
                    type: 'success'
                };
            } else if (functionText.includes('sin')) {
                // Contoh: lim (x->0) sin(x). Hasil: 0
                const res = Math.sin(c);
                 calculatedResult = {
                    limit: res.toFixed(3),
                    steps: [
                        "Fungsi: f(x) = sin(x)",
                        `Nilai yang dituju: ${variable} → ${limitValue}`,
                        "Substitusi Langsung: sin(c)",
                        `Hasil: sin(${c}) ≈ ${res.toFixed(3)}`,
                    ],
                    type: 'success'
                };
            } else if (functionText.includes('(x^2-4)/(x-2)') && c === 2) {
                 // Contoh Limit 0/0 (Hole pada x=2): lim (x->2) (x^2-4)/(x-2) = lim (x->2) (x+2) = 4
                 calculatedResult = {
                    limit: "4",
                    steps: [
                        "Fungsi: f(x) = (x²-4)/(x-2)",
                        `Nilai yang dituju: ${variable} → 2`,
                        "Substitusi langsung menghasilkan bentuk tak tentu (0/0).",
                        "Faktorisasi: (x²-4)/(x-2) = ((x-2)(x+2))/(x-2) = x+2",
                        "Substitusi: 2 + 2 = 4",
                    ],
                    type: 'success'
                };
            }
             else {
                 calculatedResult = {
                    limit: "Error: Fungsi tidak dikenali atau terlalu kompleks.",
                    steps: ["Mohon masukkan fungsi limit yang valid (e.g., x^2, sin(x), (x^2-4)/(x-2))."],
                    type: 'error'
                };
            }
            setResult(calculatedResult);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="w-full p-6 bg-white rounded-xl"> {/* Diubah dari max-w-4xl agar rata kiri */}
            <h3 className="text-2xl font-bold text-indigo-800 mb-6">Kalkulator Limit Fungsi</h3>
            
            <form onSubmit={handleCalculate} className="space-y-6">
                
                {/* 1. Input Fungsi */}
                <div>
                    <label htmlFor="functionInput" className="block text-sm font-medium text-gray-700 mb-1">
                        Fungsi F({variable}):
                    </label>
                    <input
                        type="text"
                        id="functionInput"
                        value={functionInput}
                        onChange={(e) => setFunctionInput(e.target.value)}
                        placeholder="Contoh: (x^2 - 4) / (x - 2) atau 3x^2 + 2x"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
                    />
                </div>

                {/* 2. Input Nilai yang Dituju (c) */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <label htmlFor="limitValue" className="block text-sm font-medium text-gray-700 mb-1">
                            Nilai ${variable}$ mendekati ($c$):
                        </label>
                        <input
                            type="text"
                            id="limitValue"
                            value={limitValue}
                            onChange={(e) => setLimitValue(e.target.value)}
                            placeholder="Contoh: 2 atau 0 atau inf"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-center"
                        />
                    </div>
                    {/* Input Variabel (Opsional) - Ditempatkan di sini */}
                    <div className="col-span-1">
                        <label htmlFor="variable" className="block text-sm font-medium text-gray-700 mb-1">
                            Variabel Limit:
                        </label>
                        <input
                            type="text"
                            id="variable"
                            value={variable}
                            onChange={(e) => setVariable(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-center"
                        />
                    </div>
                </div>

                {/* Tombol Hitung */}
                <button
                    type="submit"
                    disabled={loading || !functionInput.trim()}
                    className={`w-full py-3 px-4 rounded-lg text-white font-bold transition duration-300 shadow-lg 
                        ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-[1.01]'}`
                    }
                >
                    {loading ? 'Menghitung...' : 'Hitung Limit Sekarang'}
                </button>
            </form>

            {/* Area Hasil */}
            {result && (
                <div className={`mt-8 p-6 border-2 rounded-xl shadow-inner ${result.type === 'error' ? 'border-red-400 bg-red-50' : 'border-indigo-200 bg-indigo-50'}`}>
                    <h4 className="text-xl font-bold text-indigo-700 mb-3 flex items-center">
                         <span className="text-2xl mr-2">{result.type === 'error' ? '❌' : '✅'}</span> Hasil Limit:
                    </h4>
                    
                    {/* Hasil Utama */}
                    <div className="text-3xl font-extrabold text-gray-900 bg-white p-4 rounded-lg shadow-md mb-4 overflow-x-auto">
                        <span className="text-lg font-normal text-gray-500 mr-2">
                            {`$ \\lim_{{${variable} \\to ${limitValue}}} $`}
                        </span> 
                        {functionInput} $\approx$ **{result.limit}**
                    </div>
                    

                    {/* Langkah-langkah */}
                    <h5 className="text-md font-semibold text-indigo-600 mb-2">Langkah-langkah Penyelesaian:</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {result.steps.map((step, index) => (
                            <li key={index} className="text-sm">{step}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LimitCalculator;