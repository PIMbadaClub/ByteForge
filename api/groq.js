import { askGroq } from "./_tutor.mjs";

export default async function handler(req, res) {
  // Configuração de CORS para permitir as requisições
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      throw new Error("Chave GROQ_API_KEY não configurada no Vercel.");
    }

    // No Vercel, o req.body já é parseado para objeto JSON automaticamente
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { text, truncated } = await askGroq(GROQ_API_KEY, body);

    // Devolve no formato que o ai.js espera: um array com 'generated_text'
    return res.status(200).json([{ generated_text: text, truncated }]);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
