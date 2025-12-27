import React, { useState, useEffect, useRef } from "react";
import { askGemini } from "../utils/gemini";
import ReactMarkdown from "react-markdown"; // Rekomendasi: npm install react-markdown

const Gemini = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const responseRef = useRef(null);

  useEffect(() => {
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  const handleAsk = async () => {
    if (!prompt.trim()) {
      setError("Silakan tuliskan pertanyaan atau soal matematika Anda.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const result = await askGemini(prompt);
      setResponse(result);
    } catch (err) {
      setError(err.message || "Gagal terhubung dengan sistem AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[600px] bg-gray-50/50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Header Section */}
        <div className="mb-8 flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900 md:text-3xl uppercase">
              SkyLearn <span className="text-blue-600">AI Assistant</span>
            </h1>
            <p className="text-sm text-gray-500 italic">Tanyakan konsep, bantuan pengerjaan soal, atau penjelasan teori.</p>
          </div>
        </div>

        {/* Input Card */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-200/50">
          <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-400">
            Pesan atau Pertanyaan
          </label>
          <textarea
            className="w-full resize-none rounded-2xl border-none bg-gray-50 p-5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
            rows="4"
            placeholder="Contoh: Jelaskan langkah pengerjaan turunan dari f(x) = sin(x^2)..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="mt-4 flex items-center justify-between">
            <p className="text-[10px] text-gray-400 font-medium">Power by Gemini 1.5 Flash</p>
            <button
              onClick={handleAsk}
              disabled={loading}
              className={`flex items-center gap-2 rounded-xl px-8 py-3 font-bold text-white transition-all shadow-md
                ${loading 
                  ? "bg-gray-300 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/20 active:scale-95"}`}
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Memikirkan Jawaban...
                </>
              ) : (
                <>
                  <span>Kirim Pertanyaan</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700 animate-in fade-in slide-in-from-top-2">
            <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Response State */}
        {response && (
          <div 
            ref={responseRef}
            className="mt-8 rounded-3xl border border-blue-100 bg-white p-8 shadow-xl shadow-blue-500/5 animate-in fade-in zoom-in-95 duration-500"
          >
            <div className="mb-6 flex items-center gap-2 border-b border-gray-50 pb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </span>
              <h3 className="font-bold text-gray-800 uppercase tracking-tight">Jawaban AI</h3>
            </div>
            
            {/* Menggunakan Markdown agar rumus dan format teks terlihat bagus */}
            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed prose-headings:text-gray-900 prose-strong:text-blue-700 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:rounded">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end">
               <button 
                  onClick={() => {navigator.clipboard.writeText(response)}}
                  className="text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1"
               >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                  Salin Jawaban
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gemini;