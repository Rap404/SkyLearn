import React, { useState } from "react";
import { askGemini } from "../utils/gemini";

const Gemini = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!prompt.trim()) {
      setError("Prompt tidak boleh kosong.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const result = await askGemini(prompt);
      setResponse(result);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat memanggil Gemini.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tanya Gemini</h1>

      <textarea
        className="w-full p-2 border rounded"
        rows="3"
        placeholder="Tulis prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Menunggu..." : "Kirim ke Gemini"}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded text-sm text-red-700">
          <strong>Error:</strong>
          <p>{error}</p>
        </div>
      )}

      {response && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <strong>Jawaban:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Gemini;
