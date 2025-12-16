// src/Components/TrigonoCalculator.jsx (Disajikan untuk Kalkulator Nilai Fungsi Trigonometri)

import React, { useState } from 'react';

const TrigonoCalculator = () => {
    // Menggunakan angleInput untuk nilai sudut
    const [functionInput, setFunctionInput] = useState('sin'); // Default ke sin
    const [angleInput, setAngleInput] = useState('30'); // Nilai Sudut (misal 30, 45, 90)
    const [isDegree, setIsDegree] = useState(true); // Satuan Sudut: Derajat (true) atau Radian (false)
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        const angle = parseFloat(angleInput);
        let angleInRad = angle;
        
        // Konversi jika input dalam Derajat
        if (isDegree) {
            angleInRad = angle * (Math.PI / 180);
        }

        // Validasi
        if (isNaN(angle)) {
            setResult({
                value: "Input sudut tidak valid.",
                steps: ["Masukkan nilai numerik yang benar untuk sudut."],
                type: 'error'
            });
            setLoading(false);
            return;
        }

        setTimeout(() => {
            let calculatedResult;
            let finalValue;
            let steps = [
                `Fungsi: ${functionInput}(${angle} ${isDegree ? '°' : 'rad'})`,
                `Sudut dalam radian: ${angleInRad.toFixed(4)} rad`
            ];

            switch (functionInput.toLowerCase()) {
                case 'sin':
                    finalValue = Math.sin(angleInRad);
                    steps.push("Menggunakan rumus sin(θ).");
                    break;
                case 'cos':
                    finalValue = Math.cos(angleInRad);
                    steps.push("Menggunakan rumus cos(θ).");
                    break;
                case 'tan':
                    finalValue = Math.tan(angleInRad);
                    steps.push("Menggunakan rumus tan(θ).");
                    // Tambahkan pengecekan untuk asimtot (misalnya 90 derajat atau pi/2)
                    if (isDegree && (angle % 90 === 0 && angle / 90 % 2 !== 0)) {
                        finalValue = Infinity; // Menandakan tak terhingga
                        steps[steps.length - 1] = "Tan(90°), hasilnya Tak Terhingga (Asimtot).";
                    }
                    break;
                default:
                    finalValue = NaN;
                    steps = ["Fungsi trigonometri tidak didukung (gunakan sin, cos, atau tan)."];
                    break;
            }

            if (!isFinite(finalValue) || isNaN(finalValue)) {
                 calculatedResult = {
                    value: "Tak Terdefinisi / Tak Terhingga",
                    steps: steps,
                    type: 'error'
                 };
            } else {
                 calculatedResult = {
                    value: finalValue.toFixed(4),
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
            <h3 className="text-2xl font-bold text-indigo-800 mb-6">Kalkulator Nilai Fungsi Trigonometri</h3>
            
            <form onSubmit={handleCalculate} className="space-y-6">
                
                {/* 1. Pilih Fungsi Trigonometri */}
                <div>
                    <label htmlFor="functionInput" className="block text-sm font-medium text-gray-700 mb-1">
                        Pilih Fungsi:
                    </label>
                    <select
                        id="functionInput"
                        value={functionInput}
                        onChange={(e) => setFunctionInput(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
                    >
                        <option value="sin">Sinus (sin)</option>
                        <option value="cos">Kosinus (cos)</option>
                        <option value="tan">Tangen (tan)</option>
                    </select>
                </div>

                {/* 2. Input Sudut dan Satuan */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                         <label htmlFor="angleInput" className="block text-sm font-medium text-gray-700 mb-1">
                            Besar Sudut (θ):
                        </label>
                        <input
                            type="number"
                            step="any"
                            id="angleInput"
                            value={angleInput}
                            onChange={(e) => setAngleInput(e.target.value)}
                            placeholder="Contoh: 30 atau 0.523 (radian)"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-center"
                        />
                    </div>
                    <div>
                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                            Satuan:
                        </label>
                        <select
                            id="unit"
                            value={isDegree}
                            onChange={(e) => setIsDegree(e.target.value === 'true')}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
                        >
                            <option value={true}>Derajat (°)</option>
                            <option value={false}>Radian</option>
                        </select>
                    </div>
                </div>

                {/* Tombol Hitung */}
                <button
                    type="submit"
                    disabled={loading || !angleInput.trim()}
                    className={`w-full py-3 px-4 rounded-lg text-white font-bold transition duration-300 shadow-lg 
                        ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-[1.01]'}`
                    }
                >
                    {loading ? 'Menghitung...' : `Hitung ${functionInput.toUpperCase()} Sekarang`}
                </button>
            </form>

            {/* Area Hasil */}
            {result && (
                <div className={`mt-8 p-6 border-2 rounded-xl shadow-inner ${result.type === 'error' ? 'border-red-400 bg-red-50' : 'border-indigo-200 bg-indigo-50'}`}>
                    <h4 className="text-xl font-bold text-indigo-700 mb-3 flex items-center">
                         <span className="text-2xl mr-2">{result.type === 'error' ? '❌' : '✅'}</span> Hasil Nilai Trigonometri:
                    </h4>
                    
                    {/* Hasil Utama */}
                    <div className="text-3xl font-extrabold text-gray-900 bg-white p-4 rounded-lg shadow-md mb-4">
                        {functionInput}({angleInput}{isDegree ? '°' : ' rad'}) $\approx$ **{result.value}**
                    </div>
                    

                    [Image of Unit Circle showing Sine Cosine Tangent]


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

export default TrigonoCalculator;