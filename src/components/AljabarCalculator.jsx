// src/Components/AljabarCalculator.jsx (Kalkulator Pemecah Persamaan Kuadrat)

import React, { useState } from 'react';

const AljabarCalculator = () => {
    const [aInput, setAInput] = useState('1');
    const [bInput, setBInput] = useState('-3');
    const [cInput, setCInput] = useState('2');
    const [variable, setVariable] = useState('x');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        const a = parseFloat(aInput);
        const b = parseFloat(bInput);
        const c = parseFloat(cInput);

        // Validasi input
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            setResult({
                solution: "Input koefisien (a, b, c) harus berupa angka.",
                steps: [],
                type: 'error'
            });
            setLoading(false);
            return;
        }

        // Koefisien 'a' tidak boleh nol untuk Persamaan Kuadrat
        if (a === 0) {
            setResult({
                solution: "Koefisien 'a' tidak boleh nol (bukan persamaan kuadrat).",
                steps: ["Jika a=0, ini menjadi persamaan linear."],
                type: 'error'
            });
            setLoading(false);
            return;
        }

        setTimeout(() => {
            let calculatedResult;
            const D = (b * b) - (4 * a * c);
            const equation = `${a}${variable}² + ${b}${variable} + ${c} = 0`;
            const steps = [
                `Persamaan: ${equation}`,
                `Rumus Diskriminan: D = b² - 4ac`,
                `Hitung D: (${b})² - 4(${a})(${c}) = ${D.toFixed(2)}`,
            ];

            if (D > 0) {
                // Dua akar real yang berbeda
                const sqrtD = Math.sqrt(D);
                const x1 = (-b + sqrtD) / (2 * a);
                const x2 = (-b - sqrtD) / (2 * a);

                steps.push(`D > 0, memiliki dua akar real berbeda.`);
                steps.push(`Rumus ABC: ${variable} = (-b ± √D) / 2a`);
                steps.push(`Substitusi: (-(${b}) ± √${D.toFixed(2)}) / 2(${a})`);
                
                calculatedResult = {
                    solution: `${variable}₁ ≈ ${x1.toFixed(4)}, ${variable}₂ ≈ ${x2.toFixed(4)}`,
                    steps: steps,
                    type: 'success'
                };
            } else if (D === 0) {
                // Satu akar real kembar
                const x = -b / (2 * a);
                steps.push(`D = 0, memiliki satu akar real kembar.`);
                steps.push(`Rumus: ${variable} = -b / 2a`);

                calculatedResult = {
                    solution: `${variable} = ${x.toFixed(4)}`,
                    steps: steps,
                    type: 'success'
                };
            } else {
                const sqrtNegD = Math.sqrt(-D);
                const realPart = (-b / (2 * a)).toFixed(4);
                const imagPart = (sqrtNegD / (2 * a)).toFixed(4);

                steps.push(`D < 0, memiliki dua akar kompleks konjugat.`);
                
                calculatedResult = {
                    solution: `${variable}₁,₂ = ${realPart} ± ${imagPart}i`,
                    steps: steps,
                    type: 'success'
                };
            }

            setResult(calculatedResult);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="w-full p-6 bg-white rounded-xl"> {/* max-w-4xl diubah ke w-full */}
            <h3 className="text-2xl font-bold text-indigo-800 mb-6">Kalkulator Penyelesaian Persamaan Kuadrat</h3>
            <p className="text-gray-600 mb-6">
                Masukkan koefisien $a$, $b$, dan $c$ dari persamaan kuadrat bentuk umum: $a{variable}^2 + b{variable} + c = 0$.
            </p>
            
            <form onSubmit={handleCalculate} className="space-y-6">
                
                {/* Input Koefisien a, b, c */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="aInput" className="block text-sm font-medium text-gray-700 mb-1">
                            Koefisien $a$:
                        </label>
                        <input
                            type="number"
                            step="any"
                            id="aInput"
                            value={aInput}
                            onChange={(e) => setAInput(e.target.value)}
                            placeholder="Contoh: 1"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-center"
                        />
                    </div>
                    <div>
                         <label htmlFor="bInput" className="block text-sm font-medium text-gray-700 mb-1">
                            Koefisien $b$:
                        </label>
                        <input
                            type="number"
                            step="any"
                            id="bInput"
                            value={bInput}
                            onChange={(e) => setBInput(e.target.value)}
                            placeholder="Contoh: -3"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-center"
                        />
                    </div>
                    <div>
                         <label htmlFor="cInput" className="block text-sm font-medium text-gray-700 mb-1">
                            Konstanta $c$:
                        </label>
                        <input
                            type="number"
                            step="any"
                            id="cInput"
                            value={cInput}
                            onChange={(e) => setCInput(e.target.value)}
                            placeholder="Contoh: 2"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-center"
                        />
                    </div>
                </div>

                {/* Input Variabel (Pilihan) */}
                <div className="max-w-xs">
                     <label htmlFor="variable" className="block text-sm font-medium text-gray-700 mb-1">
                        Variabel (Contoh: $x$ atau $y$):
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
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg text-white font-bold transition duration-300 shadow-lg 
                        ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-[1.01]'}`
                    }
                >
                    {loading ? 'Menghitung...' : 'Selesaikan Persamaan Sekarang'}
                </button>
            </form>

            {/* Area Hasil */}
            {result && (
                <div className={`mt-8 p-6 border-2 rounded-xl shadow-inner ${result.type === 'error' ? 'border-red-400 bg-red-50' : 'border-indigo-200 bg-indigo-50'}`}>
                    <h4 className="text-xl font-bold text-indigo-700 mb-3 flex items-center">
                         <span className="text-2xl mr-2">{result.type === 'error' ? '❌' : '✅'}</span> Solusi Persamaan:
                    </h4>
                    
                    {/* Hasil Utama */}
                    <div className="text-3xl font-extrabold text-gray-900 bg-white p-4 rounded-lg shadow-md mb-4 overflow-x-auto">
                        Akar-akar: **{result.solution}**
                    </div>
                    

                    [Image of quadratic equation graph showing roots]


                    {/* Langkah-langkah */}
                    <h5 className="text-md font-semibold text-indigo-600 mb-2">Langkah-langkah Penyelesaian (Menggunakan Rumus ABC):</h5>
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

export default AljabarCalculator;