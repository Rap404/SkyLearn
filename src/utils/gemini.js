export async function askGemini(prompt) {
  const res = await fetch("/api/ask-gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) throw new Error("Gagal memanggil AI");
  const data = await res.json();
  return data.result;
}
