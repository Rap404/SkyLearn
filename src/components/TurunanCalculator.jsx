// src/Components/TurunanCalculator.jsx (Diambil dari logika sebelumnya)

import React, { useState } from 'react';

const TurunanCalculator = () => {
    const [functionInput, setFunctionInput] = useState('');
    const [variable, setVariable] = useState('x');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        // Simulasi perhitungan API/Logika Backend
        setTimeout(() => {
            let calculatedResult;
            if (functionInput.includes('x^2')) {
                calculatedResult = {
                    derivative: `2${variable}`,
                    steps: [
                        "Fungsi awal: f(x) = x²",
                        "Terapkan Aturan Pangkat: d/dx (xⁿ) = n*xⁿ⁻¹",
                        "Hasil: 2x¹ atau 2x",
                    ]
                };
            } else if (functionInput.includes('sin')) {
                 calculatedResult = {
                    derivative: `cos(${variable})`,
                    steps: [
                        "Fungsi awal: f(x) = sin(x)",
                        "Terapkan Aturan Turunan Trigonometri",
                        "Hasil: cos(x)",
                    ]
                };
            } else {
                 calculatedResult = {
                    derivative: "Error: Fungsi tidak dikenali atau terlalu kompleks.",
                    steps: ["Mohon masukkan fungsi turunan yang valid (e.g., x^2, sin(x))."]
                };
            }
            setResult(calculatedResult);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="max-w-4xl p-6 bg-white rounded-xl">
            <h3 className="text-2xl font-bold text-indigo-800 mb-6">Kalkulator Turunan Fungsi</h3>
            
            <form onSubmit={handleCalculate} className="space-y-6">
                
                {/* 1. Input Fungsi */}
                <div>
                    <label htmlFor="functionInput" className="block text-sm font-medium text-gray-700 mb-1">
                        Fungsi F(x):
                    </label>
                    <input
                        type="text"
                        id="functionInput"
                        value={functionInput}
                        onChange={(e) => setFunctionInput(e.target.value)}
                        placeholder="Contoh: 3x^2 + 2x - 5 atau sin(x)"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
                    />
                </div>

                {/* 2. Input Variabel (Opsional) */}
                <div>
                    <label htmlFor="variable" className="block text-sm font-medium text-gray-700 mb-1">
                        Variabel Turunan (d/d...):
                    </label>
                    <input
                        type="text"
                        id="variable"
                        value={variable}
                        onChange={(e) => setVariable(e.target.value)}
                        className="w-20 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-center"
                    />
                </div>

                {/* Tombol Hitung */}
                <button
                    type="submit"
                    disabled={loading || !functionInput.trim()}
                    className={`w-full py-3 px-4 rounded-lg text-white font-bold transition duration-300 shadow-lg 
                        ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-[1.01]'}`
                    }
                >
                    {loading ? 'Menghitung...' : 'Hitung Turunan Sekarang'}
                </button>
            </form>

            {/* Area Hasil */}
            {result && (
                <div className="mt-8 p-6 border-2 border-indigo-200 bg-indigo-50 rounded-xl shadow-inner">
                    <h4 className="text-xl font-bold text-indigo-700 mb-3 flex items-center">
                        <span className="text-2xl mr-2">✅</span> Hasil Turunan:
                    </h4>
                    
                    {/* Hasil Utama */}
                    <div className="text-3xl font-extrabold text-gray-900 bg-white p-4 rounded-lg shadow-md mb-4">
                        d/d{variable} [{functionInput}] = {result.derivative}
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

export default TurunanCalculator;