// Proxy local para desenvolvimento: faz o mesmo que a função da Vercel
// (api/groq.js), na porta 3000. Rode com:  GROQ_API_KEY=sua_chave node groq-proxy.js
const http = require("http");

const PORT = 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders());
    res.end();
    return;
  }

  if (req.method !== "POST" || req.url !== "/groq") {
    res.writeHead(404, {
      ...corsHeaders(),
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ error: "Endpoint não encontrado." }));
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      if (!GROQ_API_KEY) {
        throw new Error("Defina a variável de ambiente GROQ_API_KEY antes de rodar o proxy.");
      }

      // Mesma "regra da casa" da Vercel
      const { askGroq } = await import("./api/_tutor.mjs");
      const { text, truncated } = await askGroq(GROQ_API_KEY, JSON.parse(body));

      res.writeHead(200, {
        ...corsHeaders(),
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify([{ generated_text: text, truncated }]));
    } catch (error) {
      res.writeHead(500, {
        ...corsHeaders(),
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ error: error.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Proxy Groq rodando em http://localhost:${PORT}/groq`);
});
