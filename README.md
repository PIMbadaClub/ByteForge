# ⚒️ ByteForge

> **IA como ferramenta, não como substituição do pensamento lógico.**

O ByteForge é um chatbot para quem está começando a programar. Em vez de entregar o código pronto, ele **ensina a chegar na resposta**: explica a ideia, faz uma pergunta, deixa uma lacuna para o aluno completar e, se ele travar, dá a próxima pista.

🔗 **Teste online:** [byteforgechat.vercel.app](https://byteforgechat.vercel.app)

Projeto da UNIP (Análise e Desenvolvimento de Sistemas) apresentado na Jornada de Tecnologia 2026.

---

## 🤔 Por que um chatbot que não dá a resposta?

Com o GPS sempre ligado, você chega ao destino, mas nunca aprende o caminho. Com o código pronto da IA, o programa funciona, mas você não aprende a programar.

| IA como substituição | IA como ferramenta (ByteForge) |
|---|---|
| Entrega o código pronto | Explica o conceito por trás |
| Você copia e cola | Faz perguntas e dá pistas |
| Roda, mas você não aprende | Quem escreve a solução é você |

É a diferença entre alguém fazer a sua lição de casa e um professor que senta do seu lado e te ajuda a entender.

**Base:**
- Paulo Freire (1996): *"Ensinar não é transferir conhecimento."*
- Prather et al. (2024): quem só copia o código da IA pode achar que aprendeu, sem ter aprendido.
- Harvard CS50 (Liu et al., 2024): o curso já usa uma IA que guia o aluno sem entregar a resposta pronta.

---

## 🔨 Na prática: o método da forja

**Forjar** é moldar aos poucos, como o ferreiro faz com o metal. Por isso o mascote é um ferreiro que forja código.

> **Aluno:** Me passa o código pra inverter uma palavra em Python?
>
> **ByteForge:** Bora forjar juntos! Cada letra tem uma posição. Se `"abc"` tem as posições 0, 1 e 2, em que ordem você lê para formar `"cba"`? Complete:
> ```python
> for i in range(____):
>     invertido += texto[i]
> ```
> Travou? Me conta o que tentou que eu te dou a próxima pista.

1. **Explica a ideia.**
2. **Faz uma pergunta.**
3. **Deixa uma lacuna** para o aluno completar.
4. **Travou? Dá a próxima pista**: as pistas vão das mais leves às mais diretas.

No fim, quem resolveu foi o aluno.

---

## ⚙️ Como funciona por dentro

```
Você pergunta  →  Site (index.html)  →  Intermediário (api/groq.js)  →  IA (Groq)
                                         protege a chave da API
```

- **Site:** HTML, CSS e JavaScript puro, sem framework. Mostra o chat, os blocos de código com cores e o mascote animado.
- **Intermediário:** uma função serverless na Vercel recebe a pergunta, acrescenta a chave da API (que nunca vai para o navegador) e chama a IA.
- **Regra da casa:** uma instrução escrita por nós ([`api/groq.js`](api/groq.js)) manda a IA ensinar, e não entregar a resposta pronta. O site envia as últimas mensagens da conversa, então a IA lembra do que já foi dito e consegue dar a *próxima* pista.
- **Plano B:** sem internet ou com a IA fora do ar, o ByteForge usa respostas próprias guardadas no site:
  - [`js/exercicios.js`](js/exercicios.js): exercícios clássicos guiados por pistas (inverter palavra, par ou ímpar, tabuada, maior número, soma, vogais, palíndromo, média, fatorial, FizzBuzz);
  - [`js/brain.js`](js/brain.js): mais de 100 explicações de conceitos, cada uma com um exemplo e uma pergunta ou mini-desafio no fim.

### Estrutura

```
index.html          página do chat e o SVG do mascote
css/style.css       visual (tema forja) e layout responsivo
js/script.js        chat, formatação das respostas, rolagem e mascote
js/ai.js            fala com a IA, guarda o histórico e cai no plano B
js/exercicios.js    exercícios guiados por pistas (offline)
js/brain.js         banco de explicações (offline)
api/groq.js         função da Vercel: regra da casa (instrução do tutor) e chamada à Groq
groq-proxy.js       mesmo intermediário, para rodar no seu computador
```

O modelo padrão é o `openai/gpt-oss-20b` da Groq. Para usar outro (por exemplo um Llama), defina a variável de ambiente `GROQ_MODEL`.

---

## 🛠️ Como executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/PIMbadaClub/ByteForge.git
   cd ByteForge
   ```
2. Crie uma chave gratuita em [console.groq.com](https://console.groq.com) e suba o intermediário na porta 3000 (Node 20.19 ou mais novo):
   ```bash
   GROQ_API_KEY=sua_chave node groq-proxy.js
   ```
   No PowerShell: `$env:GROQ_API_KEY="sua_chave"; node groq-proxy.js`
3. Sirva a pasta com qualquer servidor estático (ex.: extensão *Live Server* do VS Code, ou `npx serve .`) e abra no navegador.

Sem o passo 2, o site funciona só com o plano B (respostas locais).

### Publicar na Vercel

Importe o repositório na Vercel e cadastre a variável de ambiente `GROQ_API_KEY` (e, se quiser, `GROQ_MODEL`). A pasta `api/` vira a função serverless automaticamente.

---

## 🚀 Próximos passos

- Testar com turmas que estão começando.
- Ajustar as dicas em níveis, das mais leves às mais diretas.

---

## 🤝 Equipe

Gabriel Liesemberg Massari · Ramon Guimarães de Oliveira · João Pedro Caetano · Jean Flávio de Campos

*A IA não deve pensar por você. Ela deve te ensinar a pensar.* Mantenha a forja acesa! 🔥
