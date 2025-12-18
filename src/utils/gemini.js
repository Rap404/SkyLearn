import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ VITE_GEMINI_API_KEY tidak ditemukan di environment");
}

let ai = null;

function initializeAI() {
  if (!ai && apiKey) {
    ai = new GoogleGenAI(apiKey);
  }
  return ai;
}

export async function askGemini(prompt) {
  const aiInstance = initializeAI();
  
  if (!aiInstance) {
    throw new Error("API key tidak tersedia. Periksa file .env");
  }

  try {
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt
    });

    return response.text();
  } catch (err) {
    console.error("Error calling Gemini API:", err);
    throw new Error("Gagal memanggil Gemini API. Periksa API key dan koneksi.");
  }
}
