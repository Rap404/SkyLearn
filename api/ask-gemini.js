import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    console.log("ENV KEY:", process.env.GEMINI_API_KEY);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(req.body.prompt);

    return res.status(200).json({
      result: result.response.text(),
    });

  } catch (err) {
    console.error("🔥 GEMINI ERROR FULL:", err);
    return res.status(500).json({
      error: err.message || "Gemini error",
    });
  }
}