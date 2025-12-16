import React, { useState } from 'react';

const IntegralLuasDaerahCalculator = () => { 
    // State baru untuk Batas Atas dan Batas Bawah
    const [functionInput, setFunctionInput] = useState('');
    const [lowerBound, setLowerBound] = useState('');
    const [upperBound, setUpperBound] = useState('');
    const [variable, setVariable] = useState('x');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        const a = parseFloat(lowerBound);
        const b = parseFloat(upperBound);

        // Validasi input batas
        if (isNaN(a) || isNaN(b) || b < a) {
            setResult({
                result: "Input batas tidak valid.",
                steps: ["Pastikan Batas Atas (b) dan Batas Bawah (a) adalah angka yang valid, dan b ≥ a."],
                type: 'error'
            });
            setLoading(false);
            return;
        }

        // Simulasi perhitungan API/Logika Backend (diubah menjadi Integral)
        setTimeout(() => {
            let calculatedResult;
            
            // Contoh Simulasi Integral Tentu Luas Daerah (f(x) = x) dari a ke b
            if (functionInput.includes('x')) { 
                // Integral dari x adalah (1/2)x^2
                // Hasil: [ (1/2)b^2 ] - [ (1/2)a^2 ]
                const area = 0.5 * (b * b) - 0.5 * (a * a);
                
                calculatedResult = {
                    result: `${area.toFixed(2)} satuan luas`, // Tampilkan 2 angka di belakang koma
                    steps: [
                        `Fungsi: f(x) = ${functionInput}`,
                        `Batas Integral: [${a} ke ${b}]`,
                        `Integral dari x: F(x) = (1/2)x²`,
                        `Hitung F(${b}) - F(${a})`,
                        `F(${b}) = ${0.5 * (b * b).toFixed(2)}`,
                        `F(${a}) = ${0.5 * (a * a).toFixed(2)}`,
                        `Hasil: ${area.toFixed(2)}`,
                    ],
                    type: 'success'
                };
            } else {
                calculatedResult = {
                    result: "Fungsi Integral tidak dikenali.",
                    steps: ["Mohon masukkan fungsi yang valid (e.g., x, x^2)."],
                    type: 'error'
                };
            }
            setResult(calculatedResult);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="w-full p-6 bg-white rounded-xl"> 
            <h3 className="text-2xl font-bold text-indigo-800 mb-6">Kalkulator Integral Luas Daerah</h3>
            
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
                        placeholder="Contoh: x^2 - 4 atau sin(x)"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
                    />
                </div>

                {/* 2. Input Batas Integral (a dan b) */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="lowerBound" className="block text-sm font-medium text-gray-700 mb-1">
                            Batas Bawah (a):
                        </label>
                        <input
                            type="number"
                            step="any"
                            id="lowerBound"
                            value={lowerBound}
                            onChange={(e) => setLowerBound(e.target.value)}
                            placeholder="0"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-center"
                        />
                    </div>
                    <div>
                        <label htmlFor="upperBound" className="block text-sm font-medium text-gray-700 mb-1">
                            Batas Atas (b):
                        </label>
                        <input
                            type="number"
                            step="any"
                            id="upperBound"
                            value={upperBound}
                            onChange={(e) => setUpperBound(e.target.value)}
                            placeholder="4"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-center"
                        />
                    </div>
                </div>

                {/* 3. Input Variabel (Opsional) - Disederhanakan */}
                <div>
                    <label htmlFor="variable" className="block text-sm font-medium text-gray-700 mb-1">
                        Variabel Integrasi (d...):
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
                    {loading ? 'Menghitung...' : 'Hitung Luas Daerah Sekarang'}
                </button>
            </form>

            {/* Area Hasil */}
            {result && (
                <div className={`mt-8 p-6 border-2 rounded-xl shadow-inner ${result.type === 'error' ? 'border-red-400 bg-red-50' : 'border-indigo-200 bg-indigo-50'}`}>
                    <h4 className="text-xl font-bold text-indigo-700 mb-3 flex items-center">
                        <span className="text-2xl mr-2">{result.type === 'error' ? '❌' : '✅'}</span> Hasil Luas Daerah:
                    </h4>
                    
                    {/* Hasil Utama */}
                    <div className="text-3xl font-extrabold text-gray-900 bg-white p-4 rounded-lg shadow-md mb-4 overflow-x-auto">
                        Area = {result.result}
                        {result.type !== 'error' && (
                            // Menampilkan notasi integral
                            <div className="text-sm font-normal text-gray-500 mt-2">
                                <span className="text-xl font-extrabold">{`\\int_{${lowerBound}}^{${upperBound}}`}</span> {functionInput} d{variable}
                            </div>
                        )}
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

export default IntegralLuasDaerahCalculator;