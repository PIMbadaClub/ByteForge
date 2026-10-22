const brain = [
  {
    keys: [
      "oi",
      "olá",
      "ola",
      "hey",
      "hello",
      "bom dia",
      "boa tarde",
      "boa noite",
      "tudo",
    ],
    text: "Olá, dev! Eu sou o ByteForge, sua forja de aprendizado em programação. Aqui eu não entrego código pronto: explico a ideia, faço uma pergunta e deixo você martelar a solução, passo a passo. Se travar, eu dou a próxima pista.",
    pergunta: "Me conta: o que você está estudando agora ou qual exercício está tentando resolver? Escreve do seu jeito, que a gente começa por aí!",
  },
  {
    keys: ["quem", "você", "voce", "byteforge", "o que é", "o que voce"],
    text: "Sou o ByteForge, um assistente que **ensina** programação em vez de resolver por você. Meu método é simples: explico o conceito, faço uma pergunta, deixo uma lacuna para você completar e, se travar, dou uma pista. A ideia é usar a IA como ferramenta, sem substituir o seu raciocínio lógico.",
    pergunta: "Qual assunto ou exercício está te dando trabalho hoje? Me conta o que você já tentou que eu te guio a partir daí!",
  },
  {
    keys: ["javascript", " js ", "js,", "var ", "const ", "let "],
    text: "JavaScript é a linguagem que dá vida às páginas web, e hoje roda também no servidor com Node.js. Pense nas variáveis como caixas com etiqueta: `let` é uma caixa que você pode trocar o conteúdo, `const` é uma caixa lacrada. O código abaixo mostra variáveis, `if`, laço e função; é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para o laço contar de 0 a 9 → `for (let i = 0; i < ____; i++)`. E o que acontece se você tentar mudar o valor de `PI` depois? Testa no console e me diz o que apareceu.",
    code: `// Declaração de variáveis
var   nome  = "Dev";      // escopo global (evite)
let   idade = 20;         // mutável, escopo de bloco
const PI    = 3.14;       // imutável (constante)

// Condicional if / else
if (idade >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

// Laço for
for (let i = 0; i < 5; i++) {
    console.log("Número:", i);
}

// Função básica
function somar(a, b) {
    return a + b;
}
console.log(somar(3, 4)); // 7

// Arrow function (forma moderna)
const multiplicar = (a, b) => a * b;`,
    lang: "javascript",
  },
  {
    keys: ["python"],
    text: "Python é famoso por ser legível: o código parece quase uma frase em inglês. Em vez de chaves, ele usa a **indentação** (o recuo) para saber o que está dentro de um `if` ou de um laço, como os tópicos de uma lista. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para imprimir de 1 a 10 → `for i in range(____):`. O que acontece se você trocar o número? Me conta o que você tentou!",
    code: `# Variáveis (sem declaração de tipo)
nome  = "Dev"
idade = 20
pi    = 3.14

# Condicional if / elif / else
if idade >= 18:
    print("Maior de idade")
elif idade == 17:
    print("Quase lá!")
else:
    print("Menor de idade")

# Laço for
for i in range(5):
    print("Número:", i)

# Laço while
contador = 0
while contador < 3:
    print(contador)
    contador += 1

# Função básica
def somar(a, b):
    return a + b

print(somar(3, 4))  # 7`,
    lang: "python",
  },
  {
    keys: ["git", "commit", "branch", "merge", "rebase", "github"],
    text: "Git é como um álbum de fotos do seu projeto: cada `commit` é uma foto do código naquele momento, e você pode voltar a qualquer uma delas. O fluxo básico é: alterar arquivos, separar o que vai na foto (`git add`) e tirar a foto (`git commit`). Os comandos abaixo são um exemplo para ler e experimentar num projeto de teste.",
    pergunta: "Pensa comigo: depois de editar um arquivo, qual comando vem antes do `git commit -m \"mensagem\"`? Complete → `git ____ .`. Testa numa pasta de teste e me diz o que o `git status` mostrou.",
    code: ` # Configuração inicial (apenas na primeira vez)
git config --global user.name "Seu Nome"
git config --global user.email "Seu Email"

# Iniciar um repositório
git init

# Ver o estado atual do projeto
git status

# Registrar alterações (commit)
git add arquivo.js            # adicionar arquivo
git add .                     # adicionar tudo
git commit -m "mensagem"      # salvar com mensagem

# Enviar e receber do repositório remoto
git push origin main          # enviar
git pull origin main          # receber

# Branches (ramificações)
git branch                    # listar branches
git checkout -b nova-feature  # criar e mudar de branch
git merge nova-feature        # unir branch ao main

# Desfazer
git restore arquivo.js        # descarta alteração local
git log --oneline             # ver histórico de commits`,
    lang: "bash",
  },
  {
    keys: ["css", "estilo", "flexbox", "grid", "layout", "responsivo"],
    text: "CSS é a roupa da página: o HTML diz **o que** existe e o CSS diz **como** aparece. Todo elemento é uma caixa com conteúdo, `padding` (espaço de dentro), borda e `margin` (espaço de fora), e o Flexbox ajuda a alinhar essas caixas lado a lado. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para centralizar os itens na horizontal dentro de um flex → `justify-content: ____;`. Qual a diferença visual entre aumentar o `margin` e o `padding`? Testa e me conta!",
    code: `/* Seletores básicos */
h1          { color: blue; }          /* por tag    */
.destaque   { font-weight: bold; }    /* por classe */
#titulo     { font-size: 24px; }      /* por id     */

/* Box model — espaçamento */
.caixa {
    margin:  16px;           /* espaço externo */
    padding: 12px;           /* espaço interno */
    border:  1px solid #ccc;
    width:   300px;
}

/* Centralizar com Flexbox */
.centro {
    display:         flex;
    justify-content: center; /* eixo horizontal */
    align-items:     center; /* eixo vertical   */
}

/* Variáveis CSS */
:root {
    --cor-principal: #58a6ff;
    --espacamento:   16px;
}`,
    lang: "css",
  },
  {
    keys: ["api", "rest", "fetch", "axios", "http", "endpoint", "request"],
    text: "Uma API é como o garçom de um restaurante: você faz o pedido (requisição), ele leva até a cozinha (servidor) e traz o prato (resposta, geralmente em JSON). O `fetch` é a forma do JavaScript fazer esse pedido. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: por que existe o `.then(res => res.json())` antes de usar os dados? Desafio: complete para enviar dados → `method: \"____\"`. Me conta o que você acha!",
    code: `// GET — buscar dados
fetch("https://api.exemplo.com/usuarios")
    .then(res  => res.json())
    .then(dados => console.log(dados))
    .catch(erro => console.error("Erro:", erro));

// POST — enviar dados
fetch("https://api.exemplo.com/usuarios", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ nome: "Ana", idade: 25 })
})
    .then(res  => res.json())
    .then(novo => console.log("Criado:", novo));

// Com async/await (mais legível)
async function buscarUsuarios() {
    const res   = await fetch("https://api.exemplo.com/usuarios");
    const dados = await res.json();
    console.log(dados);
}`,
    lang: "javascript",
  },
  {
    keys: ["debug", "erro", "bug", "error", "problema", "fix", "console"],
    text: "Debugar é investigar como um detetive: em vez de chutar a causa do erro, você coleta pistas. O `console.log()` mostra o valor de uma variável naquele ponto, e o `try/catch` captura o erro para você ler a mensagem com calma. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: num código seu que deu erro, coloque um `console.log(____)` logo antes da linha que quebra, com a variável suspeita. O valor era o que você esperava? Testa e me diz o que apareceu.",
    code: `// Inspecionar valores
let x = 42;
console.log("x =", x);          // x = 42
console.log(typeof x);           // "number"

// Visualizar array ou objeto
const frutas = ["maçã", "banana", "uva"];
console.table(frutas);

// Capturar erros com try/catch
try {
    let resultado = JSON.parse("texto inválido");
} catch (erro) {
    console.error("Erro:", erro.message);
}

// Verificar tipo antes de usar
function dobrar(n) {
    if (typeof n !== "number") {
        console.warn("Esperado um número, recebeu:", typeof n);
        return;
    }
    return n * 2;
}`,
    lang: "javascript",
  },
  {
    keys: ["node", "nodejs", "node.js", "npm", "express", "servidor"],
    text: "Node.js permite rodar JavaScript fora do navegador, e o Express facilita criar um servidor web. Pense no servidor como um balcão de atendimento: cada **rota** é um guichê que responde a um tipo de pedido, como `GET /usuarios`. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para criar uma rota que responde \"pong\" → `app.get(\"/____\", (req, res) => res.send(\"pong\"))`. Depois abre no navegador e me diz o que apareceu!",
    code: `const express = require("express");
const app = express();

app.use(express.json());

// Middleware de log
app.use((req, _res, next) => {
    console.log(\`[\${req.method}] \${req.path}\`);
    next();
});

// Rotas
app.get("/api/users", async (req, res) => {
    const users = await db.findAll();
    res.json({ data: users });
});

app.post("/api/users", async (req, res) => {
    const user = await db.create(req.body);
    res.status(201).json(user);
});

app.listen(3000, () => console.log("Servidor em :3000"));`,
    lang: "javascript",
  },
  {
    keys: [
      "sql",
      "banco",
      "database",
      "mysql",
      "postgres",
      "sqlite",
      "query",
      "select",
      "insert",
    ],
    text: "SQL é a língua para conversar com bancos de dados, que funcionam como planilhas bem organizadas (tabelas com linhas e colunas). Os 4 comandos essenciais formam o CRUD: criar (`INSERT`), ler (`SELECT`), atualizar (`UPDATE`) e apagar (`DELETE`). O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para listar só os alunos com nota maior que 7 → `SELECT * FROM alunos WHERE ____;`. E o que aconteceria num `DELETE` sem `WHERE`? Me conta o que você acha!",
    code: `-- Criar tabela
CREATE TABLE alunos (
    id    INT PRIMARY KEY AUTO_INCREMENT,
    nome  VARCHAR(100) NOT NULL,
    nota  DECIMAL(4,2)
);

-- Inserir dados (Create)
INSERT INTO alunos (nome, nota)
VALUES ('Ana', 9.5), ('João', 7.0);

-- Consultar dados (Read)
SELECT * FROM alunos;
SELECT nome, nota FROM alunos WHERE nota >= 7;

-- Atualizar dados (Update)
UPDATE alunos SET nota = 8.0 WHERE nome = 'João';

-- Remover dados (Delete)
DELETE FROM alunos WHERE id = 1;`,
    lang: "sql",
  },
  {
    keys: ["typescript", "ts", "tipagem", "type", "interface", "generics"],
    text: "TypeScript é JavaScript com etiquetas de tipo: você avisa que uma variável guarda número, texto ou booleano, e o editor reclama antes de você rodar se algo não bater. É como um molde de ferreiro: só encaixa a peça do formato certo. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete a tipagem → `let cidade: ____ = \"Recife\";`. O que o editor diz se você fizer `idade = \"vinte\"`? Testa e me diz o que apareceu.",
    code: `// Tipos básicos
let nome:   string  = "Dev";
let idade:  number  = 20;
let ativo:  boolean = true;

// Array tipado
let notas: number[] = [9, 7, 8.5];

// Condicional com tipo
if (idade >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

// Interface — define a forma de um objeto
interface Usuario {
    nome:   string;
    idade:  number;
    email?: string; // ? = opcional
}

// Função com tipos definidos
function saudar(usuario: Usuario): string {
    return \`Olá, \${usuario.nome}!\`;
}

const dev: Usuario = { nome: "Ana", idade: 25 };
console.log(saudar(dev)); // "Olá, Ana!"`,
    lang: "typescript",
  },
  {
    keys: ["react", "componente", "usestate", "useeffect", "hooks", "jsx"],
    text: "No React, a tela é montada com **componentes**, peças reutilizáveis como blocos de Lego. O `useState` guarda informações que, quando mudam, fazem o componente se redesenhar, e o `useEffect` executa algo quando o componente aparece ou quando um valor muda. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: por que o `userId` aparece na lista de dependências do `useEffect`? Desafio: complete → `const [contador, setContador] = useState(____);`. Me conta o que você tentou!",
    code: `import { useState, useEffect, useCallback } from "react";

interface Props {
    userId: number;
}

function PerfilUsuario({ userId }: Props) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    const buscar = useCallback(async () => {
        setLoading(true);
        const data = await fetch(\`/api/users/\${userId}\`).then(r => r.json());
        setUsuario(data);
        setLoading(false);
    }, [userId]);

    useEffect(() => { buscar(); }, [buscar]);

    if (loading) return <p>Carregando...</p>;
    return <h1>{usuario.nome}</h1>;
}`,
    lang: "jsx",
  },
  {
    keys: ["async", "promise", "await", "assincrono", "assíncrono", "callback"],
    text: "Código assíncrono é como pedir uma pizza: você não fica parado na porta esperando, continua fazendo outras coisas até ela chegar. Uma `Promise` é a promessa de que o resultado vem depois, e o `async/await` deixa esse código com cara de passo a passo. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete → `const user = ____ buscarUsuario(id);`. O que você acha que acontece se esquecer essa palavra? Testa e me conta!",
    code: `// Promise encadeada
buscarUsuario(id)
    .then(user => buscarPosts(user.id))
    .then(posts => renderizar(posts))
    .catch(err => console.error(err));

// Async/Await (muito mais legível)
async function carregarPerfil(id) {
    const user  = await buscarUsuario(id);
    const posts = await buscarPosts(user.id);
    renderizar(posts);
}

// Paralelo — mais rápido quando independentes
const [user, config] = await Promise.all([
    buscarUsuario(id),
    buscarConfig()
]);

// Race — o primeiro que resolver vence
const resultado = await Promise.race([fetchA(), timeout(5000)]);`,
    lang: "javascript",
  },
  {
    keys: ["poo", "oop", "classe", "herança", "objeto", "orientado", "solid"],
    text: "Programação Orientada a Objetos organiza o código em **classes**, que são como a planta de uma casa, e **objetos**, que são as casas construídas a partir dela. Com herança (`extends`), uma classe aproveita o que a outra já tem, como um `Cachorro` que já é um `Animal`. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: crie uma classe `Gato` que herda de `Animal` → `class Gato ____ Animal { ... }` e sobrescreva `falar()`. O que aparece quando você chama `new Gato(\"Mimi\").falar()`? Me conta!",
    code: `class Animal {
    #nome; // campo privado (ES2022)

    constructor(nome) { this.#nome = nome; }

    get nome() { return this.#nome; }

    falar() { return \`\${this.#nome} faz um som.\`; }
}

class Cachorro extends Animal {
    #raca;

    constructor(nome, raca) {
        super(nome);
        this.#raca = raca;
    }

    falar() { return \`\${this.nome} late: Au au!\`; }

    toString() {
        return \`\${this.nome} (\${this.#raca})\`;
    }
}

const rex = new Cachorro("Rex", "Labrador");
console.log(rex.falar()); // Rex late: Au au!`,
    lang: "javascript",
  },
  {
    keys: ["array", "lista", "map", "filter", "reduce", "find"],
    text: "Um array é uma fila de gavetas numeradas, começando do zero. Os métodos `map`, `filter` e `reduce` são como estações de uma linha de produção: `map` transforma cada item, `filter` separa os que passam numa regra e `reduce` junta tudo num resultado só. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para pegar só quem ganha mais de 5000 → `devs.filter(d => d.salario ____ 5000)`. Quantos nomes sobraram? Testa e me diz o que apareceu.",
    code: `const devs = [
    { nome: "Ana",  nivel: "senior", salario: 12000 },
    { nome: "Bob",  nivel: "junior", salario: 4000  },
    { nome: "Carol",nivel: "mid",    salario: 7000  },
];

// Map — transformar
const nomes = devs.map(d => d.nome); // ["Ana","Bob","Carol"]

// Filter — filtrar
const seniors = devs.filter(d => d.nivel === "senior");

// Reduce — acumular
const totalSalarios = devs.reduce((acc, d) => acc + d.salario, 0);

// Find — primeiro match
const ana = devs.find(d => d.nome === "Ana");

// Sort — ordenar (não muta com spread)
const ordenados = [...devs].sort((a, b) => b.salario - a.salario);`,
    lang: "javascript",
  },
  {
    keys: ["docker", "container", "compose", "dockerfile", "imagem", "image"],
    text: "Docker é como uma marmita fechada: você coloca a aplicação junto com tudo que ela precisa (versão do Node, dependências), e ela roda igual em qualquer máquina. O `Dockerfile` é a receita, a imagem é a marmita pronta e o container é a marmita aberta, rodando. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: por que o `COPY package*.json` vem **antes** do `COPY . .`? Pense no que o Docker reaproveita entre um build e outro. Me conta seu palpite!",
    code: `# Dockerfile básico (Node.js)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]

# Comandos essenciais
docker build -t minha-app .        # criar imagem
docker run -p 3000:3000 minha-app  # rodar container
docker ps                          # listar containers ativos
docker stop <id>                   # parar container
docker images                      # listar imagens`,
    lang: "dockerfile",
  },
  {
    keys: ["regex", "expressão regular", "regexp", "pattern"],
    text: "Uma expressão regular (regex) é um molde de busca: em vez de procurar um texto exato, você descreve o **formato** do que quer, como \"algo + @ + domínio\". É ótima para validar e-mails, senhas ou extrair pedaços de um texto. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete a regex que aceita só números → `/^____+$/`. Teste com \"123\" e \"12a\" usando `.test()` e me diz o que apareceu.",
    code: `// Validar e-mail
const emailRgx = /^[\\w.+-]+@[\\w-]+\\.[a-z]{2,}$/i;
console.log(emailRgx.test("dev@email.com")); // true

// Validar senha forte (min 8, maiúscula, número)
const senhaRgx = /^(?=.*[A-Z])(?=.*\\d).{8,}$/;

// Extrair dados
const log = "ERROR 2024-01-15: arquivo não encontrado";
const [, nivel, data, msg] = log.match(/(\\w+) ([\\d-]+): (.+)/);

// Substituir
const slug = "Meu Título Incrível!"
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""); // "meu-titulo-incrivel"`,
    lang: "javascript",
  },
  {
    keys: ["vscode", "vs code", "editor", "atalho", "shortcut", "extensão"],
    text: "Atalhos do editor são as ferramentas que ficam ao alcance da mão do ferreiro: economizam tempo e mantêm você focado no raciocínio. Comece por poucos: `Ctrl+P` abre arquivo pelo nome, `Ctrl+Shift+P` abre a paleta de comandos, `Alt+↑/↓` move a linha e `Ctrl+D` seleciona a próxima ocorrência da palavra. Vale mais usar três atalhos todo dia do que decorar trinta.",
    pergunta: "Mini-desafio: escolha **um** atalho desta lista e use durante a próxima hora de estudo. Qual você escolheu e o que achou?",
  },
  {
    keys: [
      "carreira",
      "emprego",
      "vaga",
      "junior",
      "pleno",
      "senior",
      "salario",
      "mercado",
    ],
    text: "Carreira em programação se constrói como uma espada: camada por camada, com prática constante. O que mais pesa no começo é mostrar projetos reais no GitHub com um bom README, ler documentação (inglês técnico ajuda muito) e saber explicar o **porquê** das suas decisões. Entender o que você escreveu vale mais do que copiar soluções prontas.",
    pergunta: "Me conta: qual projeto pequeno você poderia construir este mês para colocar no portfólio? Pode ser simples, como uma lista de tarefas!",
  },
  {
    keys: [
      "recursão",
      "recursao",
      "recursiva",
      "recursivo",
      "fatorial",
      "fibonacci",
    ],
    text: "Recursão é quando uma função chama a si mesma para resolver uma versão menor do problema, como bonecas russas: você abre uma e encontra outra menor dentro, até chegar na última. Essa última é o **caso base**, e sem ele a função nunca para. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: faça na mão `fatorial(4)` seguindo as chamadas: 4 * fatorial(3) = ...? O que aconteceria se você apagasse a linha `if (n <= 1) return 1;`? Testa e me conta!",
    code: `// Fatorial
function fatorial(n) {
    if (n <= 1) return 1;           // caso base (obrigatório!)
    return n * fatorial(n - 1);     // chamada recursiva
}
// fatorial(5) → 5 * 4 * 3 * 2 * 1 = 120

// Fibonacci com memoização (muito mais rápido)
function fib(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

// Percorrer estrutura aninhada
function flat(arr) {
    return arr.reduce((acc, item) =>
        Array.isArray(item) ? [...acc, ...flat(item)] : [...acc, item]
    , []);
}`,
    lang: "javascript",
  },
  {
    keys: [
      "html",
      "semantico",
      "semântico",
      "tag",
      "elemento",
      "dom",
      "acessib",
    ],
    text: "HTML semântico é usar a tag que **diz o que o conteúdo é**: `<header>` para cabeçalho, `<nav>` para menu, `<main>` para o conteúdo principal. É como etiquetar as caixas de uma mudança: o navegador, o Google e os leitores de tela entendem melhor a página. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: qual tag você usaria para o rodapé da página? Complete → `<____>© 2026 Meu Site</____>`. Me conta o que você tentou!",
    code: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Descrição da página">
    <title>Título | Site</title>
</head>
<body>
    <header>
        <nav aria-label="Principal">
            <a href="/">Home</a>
        </nav>
    </header>
    <main>
        <article>
            <h1>Título do conteúdo</h1>
            <p>Parágrafo...</p>
        </article>
        <aside aria-label="Relacionados">...</aside>
    </main>
    <footer>...</footer>
</body>
</html>`,
    lang: "html",
  },

  // ── JavaScript avançado ──────────────────────────────────
  {
    keys: ["closure", "fechamento", "escopo", "scope"],
    text: "Closure é uma função que \"lembra\" das variáveis do lugar onde foi criada, mesmo depois que esse lugar já terminou de executar. É como uma mochila: a função leva consigo as variáveis de que precisa. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: crie dois contadores, `a = criarContador()` e `b = criarContador(10)`, e chame `a.incrementar()` duas vezes. Quanto vale `b.valor()`? Por quê? Testa e me diz o que apareceu.",
    code: `// Contador com closure — estado privado
function criarContador(inicio = 0) {
    let count = inicio; // variável capturada

    return {
        incrementar: () => ++count,
        decrementar: () => --count,
        valor:       () => count,
    };
}

const c = criarContador(10);
c.incrementar(); // 11
c.incrementar(); // 12
c.valor();       // 12

// Uso comum: factory de funções
const multiplicarPor = (n) => (x) => x * n;
const dobrar  = multiplicarPor(2);
const triplicar = multiplicarPor(3);
console.log(dobrar(5));    // 10
console.log(triplicar(5)); // 15`,
    lang: "javascript",
  },
  {
    keys: [
      "event loop",
      "call stack",
      "pilha",
      "fila",
      "microtask",
      "macrotask",
    ],
    text: "O JavaScript faz uma coisa de cada vez, como um cozinheiro só. O **event loop** é a regra que decide a ordem: primeiro termina o código normal (síncrono), depois as promessas (microtasks) e só então os timers como `setTimeout` (macrotasks). O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: antes de rodar, escreva a ordem que você acha que vai aparecer: ____, ____, ____, ____. Depois roda e compara. Acertou? Me conta!",
    code: `console.log("1");                      // sync

setTimeout(() => console.log("2"), 0); // macrotask

Promise.resolve()
    .then(() => console.log("3"));     // microtask

console.log("4");                      // sync

// Saída: 1 → 4 → 3 → 2`,
    lang: "javascript",
  },
  {
    keys: ["spread", "rest", "operador", "..."],
    text: "Os três pontinhos `...` têm dois papéis. No **spread**, eles espalham os itens de um array ou objeto, como despejar uma caixa sobre a mesa; no **rest**, eles juntam vários argumentos numa caixa só. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para juntar dois arrays → `const todos = [____a, ____b];`. E qual a diferença entre `const c = a` e `const c = [...a]` se você alterar `c`? Testa e me diz o que apareceu.",
    code: `// SPREAD — espalha elementos
const a = [1, 2, 3];
const b = [...a, 4, 5];         // [1,2,3,4,5]

const obj1 = { x: 1 };
const obj2 = { ...obj1, y: 2 }; // { x:1, y:2 }

// Clonar sem referência
const clone = [...a];
const cloneObj = { ...obj1 };

// REST — coleta os restantes
function soma(...nums) {
    return nums.reduce((acc, n) => acc + n, 0);
}
soma(1, 2, 3, 4); // 10

// Desestruturação com rest
const [primeiro, segundo, ...outros] = [1, 2, 3, 4, 5];
// outros = [3, 4, 5]`,
    lang: "javascript",
  },
  {
    keys: [
      "modulo",
      "módulo",
      "import",
      "export",
      "esm",
      "commonjs",
      "require",
    ],
    text: "Módulos são como gavetas organizadas: cada arquivo guarda uma parte do código e escolhe o que deixa sair com `export`, e outro arquivo pega com `import`. Assim o projeto não vira um arquivo gigante e bagunçado. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: qual a diferença entre `import Calc from` e `import { PI } from`? Desafio: complete → `____ function subtrair(a, b) { return a - b; }`. Me conta o que você tentou!",
    code: `// ── ESM (navegador e Node 12+) ──
// utils.js
export const PI = 3.14159;
export function somar(a, b) { return a + b; }
export default class Calc { /*...*/ }

// main.js
import Calc, { PI, somar } from "./utils.js";
import * as utils from "./utils.js"; // importar tudo

// ── CommonJS (Node.js legado) ──
// utils.js
module.exports = { PI: 3.14, somar: (a,b) => a+b };

// main.js
const { PI, somar } = require("./utils");

// Importação dinâmica (lazy load)
const modulo = await import("./pesado.js");`,
    lang: "javascript",
  },
  {
    keys: ["try catch", "try/catch", "erro", "exception", "throw", "finally"],
    text: "Tratar erros é como ter uma rede de segurança no trapézio: o `try` tenta o movimento arriscado, o `catch` segura se der errado e o `finally` roda sempre, aconteça o que acontecer. Assim o programa não cai inteiro por causa de um problema. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para lançar um erro quando a idade for negativa → `if (idade < 0) ____ new Error(\"Idade inválida\");`. O que o `catch` recebe? Testa e me conta!",
    code: `// Erro customizado
class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

// try/catch/finally
async function buscar(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new ApiError("Falhou", res.status);
        return await res.json();

    } catch (err) {
        if (err instanceof ApiError) {
            console.error(\`HTTP \${err.status}: \${err.message}\`);
        } else {
            console.error("Erro inesperado:", err);
        }
        throw err; // re-lançar se necessário

    } finally {
        console.log("Sempre executa (limpar recursos)");
    }
}`,
    lang: "javascript",
  },
  {
    keys: ["localstorage", "sessionstorage", "storage", "armazenamento local"],
    text: "O `localStorage` é uma gavetinha do navegador onde o site guarda informações que continuam lá mesmo depois de fechar a aba; o `sessionStorage` some ao fechar a aba. Detalhe importante: essa gaveta só guarda **texto**, por isso objetos passam por `JSON.stringify`. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: salve seu nome com `localStorage.setItem(\"nome\", ____)`, recarregue a página e leia de volta. E o que acontece se salvar um objeto sem `JSON.stringify`? Testa e me diz o que apareceu.",
    code: `// LocalStorage — persiste após fechar o browser
localStorage.setItem("token", "abc123");
const token = localStorage.getItem("token");
localStorage.removeItem("token");
localStorage.clear();

// SessionStorage — limpa ao fechar a aba
sessionStorage.setItem("temp", "valor");

// Salvar objetos (deve serializar)
const user = { id: 1, nome: "Ana" };
localStorage.setItem("user", JSON.stringify(user));
const saved = JSON.parse(localStorage.getItem("user"));

// Helper seguro
function getStorage(key, fallback = null) {
    try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : fallback;
    } catch {
        return fallback;
    }
}`,
    lang: "javascript",
  },
  {
    keys: ["dom", "document", "queryselector", "getelementbyid", "manipulacao"],
    text: "O DOM é a árvore que o navegador monta a partir do HTML, e o JavaScript pode mexer nos galhos dela: achar elementos, criar novos, mudar textos e classes. É como reorganizar os móveis de uma sala que já está montada. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para trocar o texto de um título → `document.querySelector(\"h1\").____ = \"Olá!\";`. Testa no console de qualquer página e me diz o que apareceu.",
    code: `// Selecionar
const btn  = document.querySelector("#meu-btn");
const itens = document.querySelectorAll(".item");

// Criar e inserir
const p = document.createElement("p");
p.textContent = "Novo parágrafo";
p.classList.add("destaque");
document.body.appendChild(p);

// Modificar atributos
btn.setAttribute("disabled", "");
btn.removeAttribute("disabled");
btn.dataset.id = "42"; // data-id="42"

// Remover
p.remove();

// Template clonável
const tpl = document.querySelector("#card-template");
const clone = tpl.content.cloneNode(true);
clone.querySelector("h2").textContent = "Título";
document.querySelector("#lista").appendChild(clone);`,
    lang: "javascript",
  },
  {
    keys: [
      "event",
      "evento",
      "addeventlistener",
      "click",
      "submit",
      "bubbling",
      "delegation",
    ],
    text: "Eventos são os avisos que a página dá quando algo acontece: um clique, uma tecla, um envio de formulário. O `addEventListener` é como deixar alguém de plantão esperando aquele aviso para executar uma função. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para reagir a um clique → `btn.addEventListener(\"____\", () => alert(\"Clicou!\"));`. O que o `e.target` mostra quando você clica? Testa e me conta!",
    code: `// Adicionar e remover listener
const handler = (e) => console.log(e.target);
btn.addEventListener("click", handler);
btn.removeEventListener("click", handler);

// Opções úteis
btn.addEventListener("click", fn, { once: true });   // dispara 1x
btn.addEventListener("scroll", fn, { passive: true }); // melhora performance

// Delegação — um listener para vários filhos
document.querySelector("#lista").addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    if (!item) return;
    item.classList.toggle("selecionado");
});

// Prevenir padrão / propagar
form.addEventListener("submit", (e) => {
    e.preventDefault();  // não recarrega
    e.stopPropagation(); // não sobe (bubbling)
});`,
    lang: "javascript",
  },
  {
    keys: [
      "json",
      "parse",
      "stringify",
      "serializar",
      "json.parse",
      "json.stringify",
    ],
    text: "JSON é um formato de texto para trocar dados entre sistemas, como uma carta com formulário padrão que todo mundo sabe ler. `JSON.stringify` transforma um objeto em texto para enviar ou salvar, e `JSON.parse` faz o caminho de volta. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para transformar o texto de volta em objeto → `const obj = JSON.____(texto);`. O que acontece se o texto tiver uma vírgula sobrando no final? Testa e me diz o que apareceu.",
    code: `const obj = { nome: "Ana", ativo: true, score: 9.5 };

// Objeto → string
const json = JSON.stringify(obj);
// '{"nome":"Ana","ativo":true,"score":9.5}'

// String → objeto
const parsed = JSON.parse(json);

// Pretty print (indentar)
console.log(JSON.stringify(obj, null, 2));

// Replacer — filtrar campos
JSON.stringify(obj, ["nome", "score"]); // só esses campos

// Reviver — transformar ao parsear
const data = JSON.parse(jsonStr, (key, val) => {
    if (key === "data") return new Date(val);
    return val;
});

// Clonar objeto (hack simples — não suporta funções/undefined)
const clone = JSON.parse(JSON.stringify(obj));`,
    lang: "javascript",
  },
  {
    keys: ["date", "data", "hora", "datetime", "new date", "datas"],
    text: "Uma data em JavaScript é um objeto `Date` que guarda um instante no tempo. Para mostrar no formato brasileiro, use `toLocaleDateString(\"pt-BR\")`, como pedir para um tradutor formatar o calendário para você. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: crie a data do seu aniversário → `new Date(2026, ____, 15)`. Cuidado: o mês começa em 0! Qual número é dezembro? Testa e me conta o que apareceu.",
    code: `const agora = new Date();

// Formatar
agora.toLocaleDateString("pt-BR");          // "28/04/2026"
agora.toLocaleTimeString("pt-BR");          // "14:30:00"
agora.toLocaleString("pt-BR");              // data + hora

// Intl.DateTimeFormat (moderno)
const fmt = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long", year: "numeric",
    month: "long",   day: "numeric"
});
fmt.format(agora); // "segunda-feira, 28 de abril de 2026"

// Aritmética com timestamps
const amanha = new Date(agora.getTime() + 86_400_000);

// Diferença em dias
const diff = Math.abs(d2 - d1) / (1000 * 60 * 60 * 24);

// ISO para APIs
agora.toISOString(); // "2026-04-28T17:30:00.000Z"`,
    lang: "javascript",
  },
  {
    keys: ["map", "set", "weakmap", "weakset", "coleção", "collection"],
    text: "`Map` é como um fichário em que a etiqueta (chave) pode ser de qualquer tipo, e `Set` é uma lista que não aceita repetidos, como uma lista de convidados sem nomes duplicados. São ótimos quando objetos e arrays comuns começam a ficar desajeitados. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: remova os repetidos de `[1, 2, 2, 3, 3, 3]` → `const unicos = [...new ____(nums)];`. Quantos itens sobraram? Testa e me diz!",
    code: `// Map — chave pode ser qualquer tipo
const mapa = new Map();
mapa.set("nome", "Ana");
mapa.set(42, "número como chave");
mapa.get("nome"); // "Ana"
mapa.has(42);     // true
mapa.size;        // 2

// Iterar
for (const [chave, valor] of mapa) {
    console.log(chave, valor);
}

// Set — valores únicos
const set = new Set([1, 2, 2, 3, 3]);
// Set {1, 2, 3} — duplicatas removidas!

set.add(4);
set.delete(2);
set.has(3); // true

// Remover duplicatas de array
const unico = [...new Set([1,1,2,3,3])]; // [1,2,3]`,
    lang: "javascript",
  },
  {
    keys: ["generator", "function*", "yield", "iterador", "iterator"],
    text: "Um generator é uma função que pode pausar no meio e continuar depois, como um livro com marcador de página. Cada `yield` entrega um valor e para ali; o próximo `.next()` continua de onde parou. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: chame `gen.next().value` três vezes seguidas. Quais valores aparecem: ____, ____, ____? Por que o `while (true)` não trava o programa? Me conta o que você acha!",
    code: `// Generator básico
function* contador(inicio = 0) {
    while (true) {
        yield inicio++;
    }
}

const gen = contador(1);
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3

// Range (como Python)
function* range(start, end, step = 1) {
    for (let i = start; i < end; i += step) {
        yield i;
    }
}
console.log([...range(0, 10, 2)]); // [0,2,4,6,8]

// Infinite scroll / paginação lazy
function* paginar(itens, por = 10) {
    for (let i = 0; i < itens.length; i += por) {
        yield itens.slice(i, i + por);
    }
}`,
    lang: "javascript",
  },
  {
    keys: [
      "object.keys",
      "object.values",
      "object.entries",
      "object.assign",
      "freeze",
      "seal",
    ],
    text: "Os métodos de `Object` são lentes para enxergar um objeto de jeitos diferentes: só as chaves (`keys`), só os valores (`values`) ou os pares chave-valor (`entries`). Com isso você consegue percorrer e transformar objetos como se fossem listas. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para contar quantas propriedades o `user` tem → `Object.____(user).length`. Testa e me diz o número que apareceu.",
    code: `const user = { id: 1, nome: "Ana", email: "ana@email.com" };

Object.keys(user);    // ["id", "nome", "email"]
Object.values(user);  // [1, "Ana", "ana@email.com"]
Object.entries(user); // [["id",1], ["nome","Ana"], ...]

// Transformar entries de volta em objeto
const upper = Object.fromEntries(
    Object.entries(user).map(([k, v]) => [k, String(v).toUpperCase()])
);

// Merge (último vence)
const config = Object.assign({}, defaults, overrides);

// Spread é mais limpo:
const merged = { ...defaults, ...overrides };

// Imutabilidade
const frozen = Object.freeze({ x: 1 }); // não permite alteração
Object.isFrozen(frozen); // true

// Verificar propriedade própria
"nome" in user;                    // true (inclui prototype)
Object.hasOwn(user, "nome");       // true (apenas própria)`,
    lang: "javascript",
  },
  {
    keys: [
      "string",
      "strings",
      "template",
      "métodos de string",
      "metodos de string",
      "slice",
      "split",
      "includes",
    ],
    text: "Uma string é um texto, e os métodos dela são como ferramentas de uma bancada: `trim` lixa os espaços das pontas, `toUpperCase` deixa tudo maiúsculo e `includes` procura um pedaço. Importante: eles não mudam o texto original, devolvem um novo. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para trocar \"Dev\" por \"Aluno\" → `str.____(\"Dev\", \"Aluno\")`. Depois imprima `str` de novo: ela mudou? Testa e me conta!",
    code: `const str = "  Olá, Desenvolvedor!  ";

str.trim();            // "Olá, Desenvolvedor!"
str.toLowerCase();     // "  olá, desenvolvedor!  "
str.toUpperCase();
str.includes("Dev");   // true
str.startsWith("  O"); // true
str.endsWith("!  ");   // true
str.indexOf("Dev");    // 7

// Substituir
str.replace("Olá", "Oi");         // primeira ocorrência
str.replaceAll("o", "0");          // todas
str.replace(/\s+/g, " ").trim();   // normalizar espaços

// Quebrar / juntar
"a,b,c".split(",");        // ["a","b","c"]
["a","b","c"].join(" - "); // "a - b - c"

// Fatiar
"abcdef".slice(1, 4);  // "bcd"
"abc".padStart(5, "0"); // "00abc"
"abc".repeat(3);        // "abcabcabc"`,
    lang: "javascript",
  },
  {
    keys: [
      "prototype",
      "cadeia de protótipo",
      "prototipo",
      "__proto__",
      "herança prototípica",
    ],
    text: "Em JavaScript, todo objeto tem um \"pai\" escondido chamado **protótipo**. Quando você pede algo que o objeto não tem, ele pergunta ao pai, depois ao avô, e assim por diante: é a cadeia de protótipos, e é assim que a herança funciona por baixo das classes. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: adicione um método novo → `Animal.prototype.____ = function() { return this.nome + \" dorme.\"; }`. O `gato` que já existia ganha esse método? Testa e me diz o que apareceu.",
    code: `// Toda função tem .prototype
function Animal(nome) { this.nome = nome; }
Animal.prototype.falar = function() {
    return \`\${this.nome} faz um som.\`;
};

const gato = new Animal("Gato");
gato.falar(); // "Gato faz um som."

// A chain: gato → Animal.prototype → Object.prototype → null
Object.getPrototypeOf(gato) === Animal.prototype; // true

// Classes ES6 são "syntax sugar" sobre prototypes
class Cachorro extends Animal {
    latir() { return "Au!"; }
}
// Cachorro.prototype.__proto__ === Animal.prototype

// Verificar herança
gato instanceof Animal;  // true
gato instanceof Object;  // true (tudo é Object em JS)

// Adicionar método a tipo nativo (evitar em produção!)
Array.prototype.ultimo = function() { return this[this.length - 1]; };`,
    lang: "javascript",
  },

  // ── CSS avançado ─────────────────────────────────────────
  {
    keys: [
      "animacao",
      "animação",
      "animation",
      "keyframe",
      "@keyframes",
      "transition",
    ],
    text: "`transition` é a passagem suave de um estado para outro, como uma porta que abre devagar quando alguém passa (precisa de um gatilho, como o `:hover`). `@keyframes` é uma coreografia completa que roda sozinha, quadro a quadro. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: mude a duração da transition para ficar bem lenta → `transition: background ____s ease;`. Que diferença você sentiu no hover? Me conta!",
    code: `/* Transition — do estado A ao B (precisa de trigger) */
.btn {
    background: #58a6ff;
    transition: background .25s ease, transform .2s ease;
}
.btn:hover {
    background: #79b8ff;
    transform: scale(1.05);
}

/* Animation — loop autônomo */
@keyframes pulsar {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: .5; transform: scale(.95); }
}

.loading {
    animation: pulsar 1.5s ease-in-out infinite;
}

/* Entrada de elemento */
@keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}

.card { animation: slide-up .3s ease-out both; }`,
    lang: "css",
  },
  {
    keys: ["media query", "responsivo", "mobile", "breakpoint", "@media"],
    text: "Media queries são regras de CSS que só valem a partir de certo tamanho de tela, como roupas que se ajustam ao corpo. No **mobile-first**, você escreve o estilo do celular primeiro e vai acrescentando ajustes para telas maiores. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para valer só em telas a partir de 1024px → `@media (min-width: ____px) { ... }`. Redimensione a janela e me diz em que ponto o layout mudou!",
    code: `/* Mobile-first (recomendado) */
.container { padding: 16px; }

/* Tablet */
@media (min-width: 768px) {
    .container { padding: 24px; max-width: 960px; }
    .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
    .container { max-width: 1280px; margin: 0 auto; }
    .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Preferência do usuário */
@media (prefers-color-scheme: dark) { /*...*/ }
@media (prefers-reduced-motion: reduce) {
    * { animation: none !important; }
}

/* Container queries (CSS moderno) */
@container (min-width: 400px) {
    .card { flex-direction: row; }
}`,
    lang: "css",
  },
  {
    keys: [
      "pseudo",
      "::before",
      "::after",
      ":hover",
      ":focus",
      ":nth-child",
      "seletor",
    ],
    text: "Pseudo-classes como `:hover` e `:focus` descrevem um **estado** do elemento (o mouse em cima, o campo selecionado). Pseudo-elementos como `::before` e `::after` criam partes \"virtuais\" antes ou depois do conteúdo, sem mexer no HTML. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para colocar uma estrela antes de cada título → `h2::before { content: \"____\"; }`. O que acontece se você apagar a linha do `content`? Testa e me conta!",
    code: `/* Pseudo-elementos — partes virtuais do elemento */
.btn::before {
    content: "→ ";
    color: #58a6ff;
}

/* Linha decorativa com ::after */
h2::after {
    content: "";
    display: block;
    width: 40px; height: 3px;
    background: #58a6ff;
    margin-top: 8px;
}

/* Pseudo-classes — estado ou posição */
li:first-child  { font-weight: bold; }
li:last-child   { border: none; }
li:nth-child(2n) { background: #f0f0f0; } /* pares */
li:not(.ativo)  { opacity: .5; }

input:focus-visible { outline: 2px solid #58a6ff; }
a:visited           { color: purple; }

/* :is() — agrupa seletores */
:is(h1, h2, h3) { line-height: 1.2; }`,
    lang: "css",
  },
  {
    keys: [
      "position",
      "relative",
      "absolute",
      "fixed",
      "sticky",
      "z-index",
      "posicionamento",
    ],
    text: "`position` decide como um elemento se posiciona. `relative` empurra o elemento sem tirá-lo do lugar dele, `absolute` o tira do fluxo e prende no pai mais próximo que seja `relative`, `fixed` gruda na tela e `sticky` gruda só quando você rola até ele. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: o que acontece com o `.badge` se você apagar o `position: relative` do `.pai`? Arrisque um palpite, testa e me diz o que apareceu.",
    code: `/* static (padrão) — fluxo normal, top/left não funcionam */

/* relative — move sem sair do fluxo; cria contexto p/ absolute */
.pai { position: relative; }

/* absolute — sai do fluxo; âncora no pai relative mais próximo */
.badge {
    position: absolute;
    top: -8px; right: -8px; /* canto superior direito do pai */
}

/* fixed — fixo na viewport (navbar, modal) */
.navbar { position: fixed; top: 0; left: 0; width: 100%; }

/* sticky — relative até rolar, então fica fixo */
.header-tabela {
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
}

/* z-index só funciona em position != static */
.overlay { position: fixed; z-index: 1000; }`,
    lang: "css",
  },
  {
    keys: [
      "specificidade",
      "especificidade",
      "cascade",
      "cascata",
      "!important",
      "css priority",
    ],
    text: "Quando duas regras de CSS brigam pelo mesmo elemento, vence a mais **específica**, como numa hierarquia: estilo inline vence ID, ID vence classe e classe vence tag. O `!important` passa por cima de tudo, por isso é melhor guardá-lo para emergências. Prefira classes, que são fáceis de sobrescrever. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: se um `<p class=\"texto\">` recebe `p { color: blue }` e `.texto { color: red }`, qual cor aparece: ____? E se a regra `p` vier depois no arquivo, muda algo? Testa e me conta!",
    code: `/* Especificidade: (0,0,1) */
p { color: blue; }

/* Especificidade: (0,1,0) — vence p */
.texto { color: red; }

/* Especificidade: (1,0,0) — vence .texto */
#titulo { color: green; }

/* !important — nuclear option */
p { color: purple !important; } /* evite se possível */

/* Dica: usar :where() zera a especificidade */
:where(.card) p { color: gray; } /* (0,0,0) */

/* :is() mantém a especificidade do seletor mais específico */
:is(#id, .classe) { } /* especificidade do #id = (1,0,0) */`,
    lang: "css",
  },
  {
    keys: [
      "variavel css",
      "variável css",
      "custom property",
      "css variable",
      "--cor",
      "var(",
    ],
    text: "Variáveis CSS são como a paleta de tintas de um pintor: você define a cor uma vez (`--cor-primaria`) e usa em vários lugares com `var()`. Para mudar o tema inteiro, basta trocar o valor num lugar só. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para usar a variável → `color: ____(--cor-primaria);`. Depois troque o valor no `:root` e veja quantos elementos mudaram juntos. Me conta o que apareceu!",
    code: `/* Definir no :root (escopo global) */
:root {
    --cor-primaria:  #58a6ff;
    --cor-fundo:     #0d1117;
    --fonte-base:    16px;
    --raio:          8px;
    --sombra: 0 4px 20px rgba(0,0,0,.3);
}

/* Usar */
.btn {
    background: var(--cor-primaria);
    border-radius: var(--raio);
    box-shadow: var(--sombra);
    font-size: var(--fonte-base);
}

/* Sobrescrever localmente */
.card { --raio: 16px; }

/* Valor padrão (fallback) */
color: var(--cor-texto, #ffffff);

/* Tema escuro com media query */
@media (prefers-color-scheme: dark) {
    :root { --cor-fundo: #000; --cor-texto: #fff; }
}`,
    lang: "css",
  },

  // ── Python avançado ──────────────────────────────────────
  {
    keys: ["decorador", "decorator", "@", "wrapper", "functools"],
    text: "Um decorator é uma \"embalagem\" para uma função: ele adiciona um comportamento antes ou depois (medir tempo, registrar log) sem você mexer no código da função original. É como colocar uma capa num livro: o conteúdo continua o mesmo. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: aplique o decorator numa função sua → `____medir_tempo` logo acima do `def`. O que aparece quando você chama a função? Testa e me diz!",
    code: `import time
from functools import wraps

# Decorator de tempo de execução
def medir_tempo(func):
    @wraps(func)  # preserva nome e docstring
    def wrapper(*args, **kwargs):
        inicio = time.perf_counter()
        resultado = func(*args, **kwargs)
        fim = time.perf_counter()
        print(f"{func.__name__} levou {fim-inicio:.4f}s")
        return resultado
    return wrapper

@medir_tempo
def processar(n):
    return sum(range(n))

processar(1_000_000) # processar levou 0.0312s

# Decorator de classe (property)
class Circulo:
    def __init__(self, raio): self._raio = raio

    @property
    def area(self): return 3.14 * self._raio ** 2

    @area.setter
    def area(self, val): self._raio = (val / 3.14) ** .5`,
    lang: "python",
  },
  {
    keys: [
      "venv",
      "virtualenv",
      "pip",
      "ambiente virtual",
      "requirements",
      "poetry",
    ],
    text: "Um ambiente virtual é uma caixa de ferramentas separada para cada projeto, para que as bibliotecas de um não briguem com as de outro. O `requirements.txt` é a lista de ferramentas da caixa, para que outra pessoa monte a mesma em segundos. Os comandos abaixo são um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para salvar as dependências do projeto → `pip freeze > ____`. Por que é melhor ativar o venv **antes** do `pip install`? Me conta o que você acha!",
    code: `# Criar ambiente virtual
python -m venv .venv

# Ativar
# Windows:
.venv\\Scripts\\activate
# Linux/Mac:
source .venv/bin/activate

# Instalar dependências
pip install requests fastapi uvicorn

# Salvar dependências
pip freeze > requirements.txt

# Restaurar em outro ambiente
pip install -r requirements.txt

# Gerenciador moderno: Poetry
poetry new meu-projeto
poetry add requests
poetry add --group dev pytest black

# pyproject.toml é o novo padrão (PEP 518)`,
    lang: "bash",
  },
  {
    keys: [
      "arquivo",
      "file",
      "open",
      "read",
      "write",
      "io",
      "leitura de arquivo",
    ],
    text: "Abrir um arquivo em Python é como pegar um livro da estante: você escolhe o modo (`\"r\"` ler, `\"w\"` escrever do zero, `\"a\"` acrescentar no fim). O `with` garante que o livro volte para a estante, ou seja, que o arquivo seja fechado mesmo se der erro. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para adicionar uma linha sem apagar o que já existe → `open(\"log.txt\", \"____\")`. O que acontece se você usar `\"w\"` no lugar? Testa e me conta!",
    code: `# Ler arquivo texto
with open("dados.txt", "r", encoding="utf-8") as f:
    conteudo = f.read()       # tudo de uma vez
    # ou linha por linha:
    for linha in f:
        print(linha.strip())

# Escrever
with open("saida.txt", "w", encoding="utf-8") as f:
    f.write("Olá mundo!\\n")

# Acrescentar (append)
with open("log.txt", "a") as f:
    f.write("nova linha\\n")

# JSON
import json
with open("config.json") as f:
    config = json.load(f)

with open("resultado.json", "w") as f:
    json.dump({"status": "ok"}, f, indent=2)

# pathlib (moderno)
from pathlib import Path
p = Path("dados") / "arquivo.csv"
texto = p.read_text(encoding="utf-8")`,
    lang: "python",
  },
  {
    keys: [
      "lambda",
      "função lambda",
      "map python",
      "filter python",
      "funcional python",
    ],
    text: "Uma `lambda` é uma função pequenininha, de uma linha só, sem nome, ótima para usar ali mesmo, como um bilhete rápido em vez de uma carta. Ela brilha junto com `map`, `filter` e `sorted`, quando você precisa de uma regra curta. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para ordenar as pessoas pelo nome → `sorted(pessoas, key=lambda p: p[\"____\"])`. Testa e me diz qual nome veio primeiro!",
    code: `# Lambda — função anônima de uma linha
dobrar = lambda x: x * 2
somar  = lambda a, b: a + b

# Uso com sorted
pessoas = [{"nome": "Ana", "idade": 25}, {"nome": "Bob", "idade": 30}]
ordenados = sorted(pessoas, key=lambda p: p["idade"])

# map — aplica função a cada elemento
nums = [1, 2, 3, 4]
dobrados = list(map(lambda x: x*2, nums)) # [2,4,6,8]

# filter — filtra elementos
pares = list(filter(lambda x: x%2==0, nums)) # [2,4]

# Prefira list comprehension (mais pythônico)
dobrados = [x*2 for x in nums]
pares    = [x for x in nums if x%2==0]

# reduce
from functools import reduce
produto = reduce(lambda acc, x: acc*x, nums) # 24`,
    lang: "python",
  },
  {
    keys: [
      "try except",
      "exception python",
      "erro python",
      "raise",
      "finally python",
    ],
    text: "Exceções em Python são os alarmes do programa. Com `try/except` você diz: \"tente isso e, se tocar tal alarme, faça aquilo\", tratando cada tipo de erro do jeito certo. O `finally` roda sempre, e o `raise` dispara um alarme de propósito. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: rode o código digitando `0` e depois `abc`. Qual `except` foi acionado em cada caso? Complete → `except ____:` para o caso da divisão. Me conta o que apareceu!",
    code: `# Capturar exceções específicas
try:
    resultado = int(input("Digite um número: "))
    print(10 / resultado)

except ValueError:
    print("Não é um número válido")
except ZeroDivisionError:
    print("Não pode dividir por zero")
except (TypeError, AttributeError) as e:
    print(f"Tipo errado: {e}")
except Exception as e:
    print(f"Erro inesperado: {e}")
    raise  # re-lança
else:
    print("Sem erros!")   # só executa se não houve exceção
finally:
    print("Sempre executa") # limpeza de recursos

# Exceção customizada
class SaldoInsuficienteError(Exception):
    def __init__(self, saldo, valor):
        super().__init__(f"Saldo {saldo} < {valor}")
        self.saldo = saldo`,
    lang: "python",
  },
  {
    keys: [
      "classe python",
      "class python",
      "init",
      "self",
      "herança python",
      "método",
    ],
    text: "Em Python, uma classe é a forma (o molde) e cada objeto é uma peça saída dela. O `self` é a própria peça falando de si mesma, e o `@dataclass` poupa você de escrever o `__init__` na mão para classes que só guardam dados. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: crie um produto → `p = Produto(\"Caneca\", ____)` e imprima `p`. O que o `@dataclass` gerou automaticamente para você? Testa e me diz!",
    code: `from dataclasses import dataclass, field
from typing import ClassVar

@dataclass
class Produto:
    nome:  str
    preco: float
    tags:  list = field(default_factory=list)
    _total_criados: ClassVar[int] = 0  # variável de classe

    def __post_init__(self):
        Produto._total_criados += 1
        if self.preco < 0:
            raise ValueError("Preço não pode ser negativo")

    @property
    def preco_com_iva(self) -> float:
        return self.preco * 1.23

    @classmethod
    def total(cls) -> int:
        return cls._total_criados

    def __repr__(self):
        return f"Produto({self.nome!r}, R\${self.preco:.2f})"

p = Produto("Notebook", 3500.0, ["tech"])
print(p.preco_com_iva) # 4305.0`,
    lang: "python",
  },

  // ── Git avançado ─────────────────────────────────────────
  {
    keys: ["git stash", "stash", "guardar alterações"],
    text: "O `git stash` é uma gaveta temporária: você guarda o trabalho pela metade, deixa a mesa limpa para resolver outra coisa (como trocar de branch) e depois pega tudo de volta. Os comandos abaixo são um exemplo para ler e experimentar num repositório de teste.",
    pergunta: "Desafio: altere um arquivo, rode `git stash` e depois `git status`. A alteração sumiu? Qual comando traz de volta → `git stash ____`? Me conta o que você tentou!",
    code: `# Salvar estado atual (modificações não commitadas)
git stash              # guarda tudo
git stash push -m "WIP: login form"  # com nome

# Listar stashes
git stash list
# stash@{0}: WIP: login form
# stash@{1}: WIP: refactor utils

# Aplicar
git stash pop          # aplica e remove o último
git stash apply stash@{1} # aplica sem remover

# Ver o que está no stash
git stash show -p stash@{0}

# Incluir arquivos novos (untracked)
git stash push --include-untracked

# Apagar
git stash drop stash@{0}
git stash clear  # limpa todos`,
    lang: "bash",
  },
  {
    keys: ["git reset", "git revert", "desfazer commit", "undo commit"],
    text: "Desfazer no Git tem dois estilos. O `revert` cria um novo commit que desfaz o anterior, como uma errata num jornal (seguro em código compartilhado); o `reset` volta o ponteiro no tempo, como arrancar páginas do caderno (cuidado, principalmente com `--hard`). Os comandos abaixo são um exemplo para ler e experimentar num repositório de teste.",
    pergunta: "Pergunta: se o commit errado já foi enviado com `git push` para a equipe, qual você usaria → `git ____ HEAD`? Por quê? Me conta seu raciocínio!",
    code: `# ── git revert (SEGURO — cria novo commit) ──
git revert HEAD        # desfaz último commit
git revert abc1234     # desfaz commit específico

# ── git reset (CUIDADO — reescreve história) ──

# --soft: desfaz commit, mantém mudanças staged
git reset --soft HEAD~1

# --mixed (padrão): desfaz commit e stage, mantém arquivos
git reset HEAD~1

# --hard: descarta tudo (perda de dados!)
git reset --hard HEAD~1

# Recuperar após reset --hard (dentro da janela de reflog)
git reflog            # encontra o hash
git reset --hard abc1234

# Desfazer apenas o stage de um arquivo
git restore --staged arquivo.js`,
    lang: "bash",
  },
  {
    keys: ["gitignore", ".gitignore", "ignorar arquivo", "ignore"],
    text: "O `.gitignore` é a lista de coisas que não entram na mala do Git: pastas que podem ser recriadas (`node_modules`), arquivos gerados e, principalmente, segredos como o `.env`. Cada linha é um padrão de nome de arquivo ou pasta. O exemplo abaixo é para ler e adaptar ao seu projeto.",
    pergunta: "Desafio: complete para ignorar todos os arquivos de log → `____.log`. Por que é perigoso versionar o `.env`? Testa com `git status` e me diz o que apareceu.",
    code: `# .gitignore — exemplos essenciais

# Dependências
node_modules/
vendor/
.venv/
__pycache__/
*.pyc

# Variáveis de ambiente (NUNCA versionar!)
.env
.env.local
.env.*.local

# Build e dist
dist/
build/
*.min.js
*.min.css

# Logs
*.log
npm-debug.log*

# IDEs
.vscode/settings.json
.idea/
*.swp

# SO
.DS_Store
Thumbs.db

# Verificar se arquivo está ignorado
git check-ignore -v arquivo.txt

# Parar de rastrear arquivo já commitado
git rm --cached segredo.txt
echo "segredo.txt" >> .gitignore`,
    lang: "bash",
  },
  {
    keys: [
      "conventional commit",
      "commit convencional",
      "commit padrão",
      "feat fix docs",
    ],
    text: "Conventional Commits é um padrão para escrever mensagens de commit, como etiquetas padronizadas num estoque: `tipo(escopo): descrição`. Os tipos mais comuns são `feat` (novidade), `fix` (correção) e `docs` (documentação), e isso deixa o histórico fácil de ler. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: você corrigiu um bug no botão de login. Complete a mensagem → `git commit -m \"____(login): corrige clique duplo no botão\"`. Me conta qual tipo você escolheu!",
    code: `# Exemplos corretos
git commit -m "feat(auth): add JWT refresh token"
git commit -m "fix(api): handle null response from payment gateway"
git commit -m "docs(readme): add docker setup instructions"
git commit -m "refactor!: migrate from REST to GraphQL"
# BREAKING CHANGE — o ! indica breaking

# Commit com corpo e rodapé
git commit -m "feat(billing): add Stripe integration

Integrates Stripe API for payment processing.
Includes webhook handler for async confirmations.

Closes #42
BREAKING CHANGE: removes legacy PayPal provider"`,
    lang: "bash",
  },

  // ── HTTP e Web ───────────────────────────────────────────
  {
    keys: [
      "http method",
      "métodos http",
      "get post put delete patch",
      "verbo http",
    ],
    text: "Os métodos HTTP são os verbos de um pedido: `GET` busca, `POST` cria, `PUT` substitui inteiro, `PATCH` atualiza só um pedaço e `DELETE` remove. É como numa biblioteca: consultar um livro, doar um novo, trocar por outro ou devolver. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: para mudar só o e-mail de um usuário, sem enviar os outros dados, qual verbo você usaria → `____ /api/users/1`? Me conta por que escolheu esse!",
    code: `// REST API — nomenclatura de rotas
GET    /api/users           // listar todos
GET    /api/users/:id       // buscar um
POST   /api/users           // criar
PUT    /api/users/:id       // substituir
PATCH  /api/users/:id       // atualizar parcial
DELETE /api/users/:id       // deletar

// PATCH body (só o que muda)
PATCH /api/users/1
{ "email": "novo@email.com" }

// vs PUT (envia o objeto inteiro)
PUT /api/users/1
{ "id": 1, "nome": "Ana", "email": "novo@email.com" }`,
    lang: "http",
  },
  {
    keys: [
      "status code",
      "status http",
      "404",
      "200",
      "201",
      "500",
      "401",
      "403",
    ],
    text: "O status code é o \"humor\" da resposta do servidor, resumido num número. A família diz tudo: **2xx** deu certo (200 OK, 201 Created), **3xx** redirecionou, **4xx** o erro foi do pedido (400, 401 sem login, 403 sem permissão, 404 não encontrado) e **5xx** o erro foi do servidor (500). Saber ler esse número poupa muito tempo de depuração.",
    pergunta: "Desafio: abra o DevTools (aba Network), acesse um endereço que não existe num site qualquer e veja o status. Qual número apareceu e de quem foi a \"culpa\": do pedido ou do servidor? Me conta!",
  },
  {
    keys: ["cors", "cross-origin", "origin", "access-control", "preflight"],
    text: "CORS é o porteiro do navegador: por segurança, uma página de um endereço não pode ler respostas de outro endereço, a menos que o servidor diga \"pode entrar\". Quem libera é sempre o **servidor**, enviando cabeçalhos que dizem quais origens são aceitas. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: se o seu front roda em `http://localhost:5173`, o que precisa entrar na lista `origin: [____]` do servidor? Me conta o que você tentou e qual erro apareceu no console!",
    code: `// O que é: browser bloqueia requisições entre origens
// diferentes por segurança. O servidor precisa autorizar.

// No Express (Node.js)
const cors = require("cors");

app.use(cors({
    origin: ["https://meusite.com", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // permite cookies cross-origin
}));

// Para rota específica
app.get("/api/publica", cors(), handler);

// Preflight (OPTIONS) — browser envia antes do POST/PUT
// O servidor deve responder com os headers Access-Control-*
app.options("*", cors()); // habilitar preflight global

// Headers que o servidor deve retornar:
// Access-Control-Allow-Origin: https://meusite.com
// Access-Control-Allow-Methods: GET, POST
// Access-Control-Allow-Headers: Content-Type`,
    lang: "javascript",
  },
  {
    keys: [
      "jwt",
      "token",
      "json web token",
      "autenticação",
      "authentication",
      "bearer",
    ],
    text: "Um JWT é como uma pulseira de show: o servidor entrega ao fazer login e, a cada pedido, você mostra a pulseira em vez de dizer a senha de novo. Ela é assinada com um segredo, então ninguém consegue falsificar, mas o conteúdo pode ser lido, por isso nada de dados sensíveis dentro. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para o token expirar em 1 hora → `{ expiresIn: \"____\" }`. Por que o `SECRET` vem do `process.env` e não escrito no código? Me conta seu raciocínio!",
    code: `// Estrutura: header.payload.signature (Base64)
// header:  { alg: "HS256", typ: "JWT" }
// payload: { sub: "userId", exp: timestamp, role: "admin" }

// Node.js — gerar e verificar
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

// Gerar token (no login)
const token = jwt.sign(
    { userId: 1, role: "admin" },
    SECRET,
    { expiresIn: "7d" }
);

// Verificar (middleware)
function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) return res.status(401).json({ error: "Token ausente" });

    try {
        const payload = jwt.verify(header.slice(7), SECRET);
        req.user = payload;
        next();
    } catch {
        res.status(401).json({ error: "Token inválido" });
    }
}`,
    lang: "javascript",
  },
  {
    keys: ["websocket", "ws", "socket.io", "tempo real", "realtime"],
    text: "HTTP comum é como mandar cartas: você pergunta e espera a resposta. WebSocket é como uma ligação telefônica: a linha fica aberta e os dois lados falam quando quiserem, ideal para chat e notificações em tempo real. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: no exemplo, por que os clientes ficam guardados num `Set`? Desafio: complete para avisar quando alguém sai → `ws.on(\"____\", () => clientes.delete(ws));`. Me conta o que você tentou!",
    code: `// Servidor com ws (Node.js)
const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 8080 });

const clientes = new Set();

wss.on("connection", (ws) => {
    clientes.add(ws);
    console.log("Cliente conectado");

    ws.on("message", (msg) => {
        // Broadcast para todos
        const texto = msg.toString();
        clientes.forEach(c => {
            if (c.readyState === ws.OPEN) c.send(texto);
        });
    });

    ws.on("close", () => clientes.delete(ws));
});

// Cliente (browser)
const socket = new WebSocket("ws://localhost:8080");
socket.onopen    = () => socket.send("Olá servidor!");
socket.onmessage = (e) => console.log("Recebido:", e.data);
socket.onclose   = () => console.log("Desconectado");`,
    lang: "javascript",
  },
  {
    keys: ["graphql", "query graphql", "mutation", "schema", "resolver"],
    text: "No REST, cada endereço devolve um pacote fechado; no GraphQL, você monta o próprio pedido, como num restaurante self-service, pedindo exatamente os campos que quer. O **schema** é o cardápio que diz o que pode ser pedido. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: escreva uma query que busque só o nome de um usuário → `{ usuario(id: 1) { ____ } }`. Qual a vantagem de não receber os outros campos? Me conta!",
    code: `# Schema (define os tipos)
type Query {
    usuario(id: ID!): Usuario
    usuarios: [Usuario!]!
}

type Mutation {
    criarUsuario(input: CriarUsuarioInput!): Usuario!
}

type Usuario {
    id:    ID!
    nome:  String!
    posts: [Post!]!
}

# Query (cliente define o que quer — sem over/under-fetching)
query {
    usuario(id: "1") {
        nome
        posts {
            titulo
        }
    }
}

# Vantagem vs REST:
# REST: GET /users/1 → retorna TUDO (over-fetching)
#       GET /users/1/posts → segunda request (under-fetching)
# GraphQL: uma query, só os campos pedidos`,
    lang: "graphql",
  },
  {
    keys: ["cookie", "session", "cookie vs localstorage", "sessão"],
    text: "Cookies, `localStorage` e `sessionStorage` são três lugares para guardar dados no navegador. O **cookie** é pequeno (cerca de 4KB) e vai junto em toda requisição ao servidor, por isso é usado em sessões de login; o **localStorage** guarda mais e fica até alguém apagar; o **sessionStorage** some ao fechar a aba. Um cookie marcado como `HttpOnly` não pode ser lido pelo JavaScript, o que protege contra roubo de sessão.",
    pergunta: "Pergunta: para guardar o tema escuro escolhido pelo usuário, qual dos três você usaria, e por quê? Me conta seu raciocínio!",
  },

  // ── Banco de Dados avançado ──────────────────────────────
  {
    keys: ["nosql", "mongodb", "documento", "document database", "mongoose"],
    text: "MongoDB guarda dados como **documentos**, parecidos com objetos JSON, em vez de linhas de tabela. O Mongoose cria um **schema**, que é como um formulário com regras (campo obrigatório, e-mail único), para os dados não entrarem bagunçados. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para buscar todos os usuários com mais de 18 anos → `Usuario.find({ idade: { ____: 18 } })`. O que acontece se você tentar salvar sem `nome`? Me conta!",
    code: `const mongoose = require("mongoose");

// Schema e Model
const usuarioSchema = new mongoose.Schema({
    nome:  { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    idade: { type: Number, min: 0, max: 150 },
    tags:  [String],
    criadoEm: { type: Date, default: Date.now }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

// CRUD
const novo = await Usuario.create({ nome: "Ana", email: "ana@email.com" });

const todos = await Usuario.find({ idade: { $gte: 18 } })
    .sort({ nome: 1 })
    .limit(10)
    .select("nome email -_id"); // apenas esses campos

await Usuario.findByIdAndUpdate(id, { $set: { nome: "Ana Lima" } });
await Usuario.findByIdAndDelete(id);`,
    lang: "javascript",
  },
  {
    keys: ["indice", "índice", "index sql", "index banco", "performance sql"],
    text: "Um índice no banco é como o índice remissivo de um livro: em vez de folhear página por página, você vai direto ao lugar certo. Ele acelera muito as buscas, mas tem um custo: cada `INSERT` ou `UPDATE` também precisa atualizar o índice. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: numa tabela de usuários em que você sempre busca pelo e-mail no login, qual coluna merece índice → `CREATE INDEX idx_x ON usuarios(____);`? Me conta por quê!",
    code: `-- Criar índice (acelera WHERE, JOIN, ORDER BY)
CREATE INDEX idx_email ON usuarios(email);

-- Índice composto (para queries que filtram ambos)
CREATE INDEX idx_nome_cidade ON usuarios(nome, cidade);

-- Índice único
CREATE UNIQUE INDEX idx_cpf ON pessoas(cpf);

-- Ver plano de execução (diagnosticar lentidão)
EXPLAIN ANALYZE
SELECT * FROM pedidos WHERE cliente_id = 42;

-- Quando usar índice:
-- ✅ Colunas em WHERE, JOIN ON, ORDER BY frequentes
-- ✅ Chaves estrangeiras
-- ❌ Tabelas pequenas (< 1000 linhas)
-- ❌ Colunas com poucos valores distintos (sexo: M/F)
-- ❌ Colunas que sofrem muitos UPDATEs (custo de manutenção)`,
    lang: "sql",
  },
  {
    keys: [
      "transação",
      "transaction",
      "acid",
      "commit sql",
      "rollback",
      "begin",
    ],
    text: "Uma transação é um pacote de comandos que acontece **por inteiro ou não acontece**. Pense numa transferência bancária: tirar de uma conta e colocar na outra precisam dar certo juntos; se algo falhar no meio, o `ROLLBACK` desfaz tudo. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: o que aconteceria com o dinheiro se o primeiro `UPDATE` funcionasse e o segundo falhasse, **sem** transação? Complete → se der erro, usamos ____. Me conta!",
    code: `-- Transferência bancária (exemplo clássico)
BEGIN;

UPDATE contas SET saldo = saldo - 500 WHERE id = 1;
UPDATE contas SET saldo = saldo + 500 WHERE id = 2;

-- Verificar se deu certo
-- se ok:
COMMIT;
-- se erro:
ROLLBACK;

-- No Node.js com pg (postgres)
const client = await pool.connect();
try {
    await client.query("BEGIN");
    await client.query("UPDATE contas SET saldo = saldo - 500 WHERE id = $1", [1]);
    await client.query("UPDATE contas SET saldo = saldo + 500 WHERE id = $1", [2]);
    await client.query("COMMIT");
} catch (err) {
    await client.query("ROLLBACK");
    throw err;
} finally {
    client.release();
}`,
    lang: "sql",
  },

  // ── DevOps e Ferramentas ─────────────────────────────────
  {
    keys: [
      "env",
      ".env",
      "variavel de ambiente",
      "dotenv",
      "process.env",
      "environment variable",
    ],
    text: "Variáveis de ambiente são configurações que ficam fora do código, como senhas e endereços de banco, guardadas num cofre separado (o arquivo `.env`). Assim o mesmo código roda no seu PC e no servidor com configurações diferentes, e os segredos não vão parar no GitHub. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: crie uma variável `NOME_APP` no `.env` e leia com `process.env.____`. O que aparece se ela não existir? Testa e me diz!",
    code: `# .env (NUNCA commitar no git!)
DATABASE_URL=postgres://user:senha@localhost:5432/db
JWT_SECRET=um-segredo-muito-longo-e-aleatorio
PORT=3000
NODE_ENV=development

# .gitignore deve ter:
# .env
# .env.local
# .env.*.local

# Node.js — carregar com dotenv
require("dotenv").config();

const porta = process.env.PORT ?? 3000;
const db    = process.env.DATABASE_URL;

if (!db) throw new Error("DATABASE_URL não configurada!");

# Boas práticas:
# - Tenha um .env.example com as chaves (sem valores reais)
# - Valide as vars na inicialização da app
# - Em produção, use o gerenciador do provedor (Vercel, Railway, AWS)`,
    lang: "bash",
  },
  {
    keys: [
      "github actions",
      "ci/cd",
      "pipeline",
      "workflow",
      "deploy automático",
    ],
    text: "GitHub Actions é um robô que trabalha para você: a cada `push` ou pull request, ele roda os passos que você definiu (instalar, testar, publicar). Se algo quebrar, você descobre na hora, e não depois que o problema chegou no usuário. O arquivo abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: lendo o bloco `on:`, em quais situações esse workflow roda? Desafio: adicione a branch `develop` ao `pull_request` → `branches: [main, ____]`. Me conta o que você tentou!",
    code: `# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test

      - name: Build
        run: npm run build`,
    lang: "yaml",
  },
  {
    keys: [
      "npm",
      "yarn",
      "pnpm",
      "package.json",
      "npm scripts",
      "gerenciador de pacotes",
    ],
    text: "Os scripts do `package.json` são atalhos com nome para comandos que você usa sempre, como botões de um painel: em vez de lembrar um comando enorme, você roda `npm run dev`. Assim todo mundo do projeto usa os mesmos comandos. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: crie um script chamado `ola` que imprime uma mensagem → `\"ola\": \"echo ____\"` e rode com `npm run ola`. Testa e me diz o que apareceu!",
    code: `{
  "scripts": {
    "dev":   "node --watch src/index.js",
    "start": "node src/index.js",
    "build": "tsc && vite build",
    "test":  "jest --coverage",
    "lint":  "eslint src --fix",
    "fmt":   "prettier --write src"
  }
}

# Executar
npm run dev
npm test          # atalho para "test"
npm start         # atalho para "start"

# Passando argumentos
npm test -- --watch

# npm vs yarn vs pnpm
# npm:  padrão, vem com Node.js
# yarn: mais rápido, workspaces maduro
# pnpm: mais eficiente em disco (symlinks), recomendado em monorepos

# Verificar versões desatualizadas
npm outdated
npx npm-check-updates -u`,
    lang: "json",
  },
  {
    keys: [
      "eslint",
      "prettier",
      "linter",
      "formatação",
      "lint",
      "eslintrc",
      "prettierrc",
    ],
    text: "ESLint é o revisor que aponta possíveis erros e maus hábitos no código; Prettier é o formatador que arruma espaços, aspas e quebras de linha. Juntos, são como um professor de redação e um diagramador trabalhando em equipe. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: na regra `\"prefer-const\": \"error\"`, o que o ESLint vai reclamar no código `let x = 5; console.log(x);`? Me conta o que você acha que deveria mudar!",
    code: `# Instalar
npm install -D eslint prettier eslint-config-prettier

# .eslintrc.json
{
  "extends": ["eslint:recommended", "prettier"],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off",
    "prefer-const": "error"
  },
  "env": { "browser": true, "node": true, "es2022": true }
}

# .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 4,
  "printWidth": 100,
  "trailingComma": "es5"
}

# package.json scripts
"lint":   "eslint src --fix",
"format": "prettier --write src",

# VS Code — formatar ao salvar
# settings.json: "editor.formatOnSave": true`,
    lang: "json",
  },
  {
    keys: [
      "jest",
      "teste",
      "testing",
      "unit test",
      "describe",
      "it(",
      "expect",
      "mock",
    ],
    text: "Um teste automatizado é um pequeno programa que confere se outro funciona, como um controle de qualidade na saída da forja. No Jest, `describe` agrupa os testes, `it` descreve um caso e `expect(...).toBe(...)` compara o resultado obtido com o esperado. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: escreva mais um caso → `expect(somar(0, 0)).toBe(____);`. Depois quebre a função de propósito e veja a mensagem do Jest. Me conta o que apareceu!",
    code: `// soma.js
export const somar = (a, b) => a + b;

// soma.test.js
import { somar } from "./soma";

describe("somar()", () => {
    it("soma dois números positivos", () => {
        expect(somar(2, 3)).toBe(5);
    });

    it("soma números negativos", () => {
        expect(somar(-1, -1)).toBe(-2);
    });

    it("retorna número quando segundo é 0", () => {
        expect(somar(5, 0)).toBe(5);
    });
});

// Mock de módulo
jest.mock("../api/usuarios");
import { buscarUsuario } from "../api/usuarios";
buscarUsuario.mockResolvedValue({ id: 1, nome: "Ana" });

// Testar assíncrono
it("busca usuário", async () => {
    const user = await buscarUsuario(1);
    expect(user).toHaveProperty("nome", "Ana");
});`,
    lang: "javascript",
  },
  {
    keys: [
      "linux",
      "terminal",
      "bash",
      "comando linux",
      "shell command",
      "cli",
    ],
    text: "O terminal é uma conversa direta com o computador, em texto. Os comandos básicos são como andar numa casa: `pwd` diz em que cômodo você está, `ls` mostra o que tem nele, `cd` muda de cômodo e `mkdir` cria um novo. O `rm -rf` apaga sem lixeira, então use com muito cuidado. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: crie uma pasta de treino e entre nela → `mkdir treino && ____ treino`. Depois rode `pwd`. Me conta o que apareceu!",
    code: `# Navegação
pwd           # diretório atual
ls -la        # listar com detalhes e ocultos
cd ~          # ir para home
cd -          # voltar ao diretório anterior

# Arquivos
cp -r src/ dest/      # copiar diretório
mv arquivo.txt novo/  # mover/renomear
rm -rf pasta/         # remover (cuidado!)
find . -name "*.js"   # buscar arquivos
grep -r "TODO" src/   # buscar texto recursivamente

# Permissões
chmod +x script.sh    # tornar executável
chmod 644 arquivo.txt # rw-r--r--

# Processos
ps aux | grep node    # listar processos
kill -9 PID           # forçar encerramento
htop                  # monitor interativo

# Rede
curl -X POST https://api.exemplo.com/data \\
     -H "Content-Type: application/json" \\
     -d '{"chave":"valor"}'
netstat -tlnp          # portas em uso`,
    lang: "bash",
  },
  {
    keys: ["ssh", "chave ssh", "ssh key", "servidor remoto", "sftp"],
    text: "SSH é um túnel seguro para controlar outro computador pelo terminal. Em vez de senha, o ideal é usar um par de chaves: a **pública** é o cadeado que você instala no servidor e a **privada** é a chave que só você guarda. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: qual das duas chaves você pode compartilhar sem medo, a pública ou a privada? Complete → o arquivo `~/.ssh/id_ed25519____` é o que vai para o servidor. Me conta!",
    code: `# Gerar par de chaves (faça uma vez)
ssh-keygen -t ed25519 -C "seu@email.com"
# Salva em: ~/.ssh/id_ed25519 (privada) e ~/.ssh/id_ed25519.pub

# Copiar chave pública para o servidor
ssh-copy-id usuario@servidor.com
# ou manualmente: cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys

# Conectar
ssh usuario@servidor.com
ssh -p 2222 usuario@servidor.com  # porta customizada

# ~/.ssh/config (aliases)
Host meu-server
    HostName 192.168.1.100
    User deploy
    Port 2222
    IdentityFile ~/.ssh/id_ed25519

ssh meu-server  # usa o alias

# SCP — copiar arquivos
scp arquivo.txt usuario@servidor.com:/home/usuario/
scp -r pasta/ usuario@servidor.com:/var/www/`,
    lang: "bash",
  },

  // ── Segurança ────────────────────────────────────────────
  {
    keys: [
      "xss",
      "cross-site scripting",
      "injection html",
      "sanitizar",
      "sanitize",
    ],
    text: "XSS acontece quando um site exibe um texto digitado pelo usuário como se fosse código, e esse \"texto\" é na verdade um script malicioso. É como deixar um estranho escrever direto no seu mural. A defesa principal é tratar entrada do usuário sempre como **texto**, nunca como HTML. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: qual propriedade é a segura para mostrar o nome digitado → `element.____ = nome;`? Por que o `innerHTML` é perigoso aqui? Me conta seu raciocínio!",
    code: `// VULNERÁVEL — nunca inserir input do usuário direto no DOM
element.innerHTML = req.query.nome; // ⚠️ PERIGO

// SEGURO — usar textContent ou escapar
element.textContent = req.query.nome; // só texto, sem HTML

// Escapar caracteres especiais (server-side)
function escape(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Biblioteca recomendada: DOMPurify (client) ou sanitize-html (server)
import DOMPurify from "dompurify";
const limpo = DOMPurify.sanitize(conteudoDoUsuario);

// Content Security Policy (header HTTP)
// Content-Security-Policy: default-src 'self'; script-src 'self'
// Bloqueia scripts de origens não autorizadas`,
    lang: "javascript",
  },
  {
    keys: [
      "sql injection",
      "injeção sql",
      "prepared statement",
      "parameterized query",
    ],
    text: "SQL Injection é quando alguém digita um pedaço de SQL num campo do formulário e, se você **concatena** esse texto na consulta, o banco executa o comando do atacante. A solução são as consultas parametrizadas: os valores vão separados, num envelope, e nunca viram código. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: se alguém digitar `' OR '1'='1` no campo de e-mail da primeira query (a concatenada), o que a consulta vira? Complete a versão segura → `WHERE email = ____`. Me conta!",
    code: `// VULNERÁVEL
const query = "SELECT * FROM users WHERE email = '" + email + "'";
// Atacante envia: ' OR '1'='1 → retorna todos os usuários!

// SEGURO — Prepared Statements (parâmetros separados)
// Node.js + pg (PostgreSQL)
const { rows } = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND senha = $2",
    [email, senhaHash]
);

// Node.js + MySQL/mysql2
const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
);

// ORM também é seguro (usa prepared statements internamente)
const user = await User.findOne({ where: { email } }); // Sequelize

// Princípio: NUNCA concatenar input do usuário em SQL.
// Sempre use parâmetros ou ORM.`,
    lang: "javascript",
  },
  {
    keys: ["hash", "bcrypt", "senha", "password", "criptografia", "crypto"],
    text: "Senha nunca se guarda como texto: guarda-se o **hash**, uma impressão digital da senha que não dá para desfazer. No login, você calcula o hash do que a pessoa digitou e compara com o salvo. O `bcrypt` ainda adiciona sal e é lento de propósito, para atrapalhar quem tenta adivinhar. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: se o hash não pode ser desfeito, como o sistema sabe que a senha está certa? Complete → `await bcrypt.____(senhaPlana, hashSalvo)`. Me conta seu raciocínio!",
    code: `// bcrypt — algoritmo recomendado para senhas
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 12; // custo computacional (8-14 é razoável)

// Ao cadastrar
async function salvarSenha(senhaPlana) {
    const hash = await bcrypt.hash(senhaPlana, SALT_ROUNDS);
    return hash; // salvar isso no banco
}

// Ao fazer login
async function verificarSenha(senhaPlana, hashSalvo) {
    const ok = await bcrypt.compare(senhaPlana, hashSalvo);
    return ok; // true = senha correta
}

// Nunca:
// ❌ MD5 ou SHA1 (rápidos demais → força bruta)
// ❌ Criptografia simétrica (reversível)
// ❌ Salvar senha em texto plano

// Para tokens/chaves (não senhas): use crypto.randomBytes
const token = require("crypto").randomBytes(32).toString("hex");`,
    lang: "javascript",
  },
  {
    keys: ["https", "ssl", "tls", "certificado", "http seguro"],
    text: "HTTPS é o HTTP dentro de um envelope lacrado: os dados viajam criptografados, então ninguém no meio do caminho (como num Wi-Fi público) consegue ler senhas ou tokens. Quem garante que o site é mesmo quem diz ser é o **certificado** TLS, que hoje dá para obter de graça com o Let's Encrypt. Navegadores marcam sites sem HTTPS como inseguros.",
    pergunta: "Mini-desafio: clique no cadeado da barra de endereço de um site que você usa e veja quem emitiu o certificado e até quando ele vale. O que você encontrou? Me conta!",
  },

  // ── Conceitos de programação ─────────────────────────────
  {
    keys: [
      "big o",
      "complexidade",
      "o(n)",
      "o(log n)",
      "algoritmo tempo",
      "performance algoritmo",
    ],
    text: "Big O mede como o tempo de um algoritmo cresce quando a entrada cresce. Achar uma palavra abrindo o dicionário direto na página é O(1); ler página por página é O(n); abrir no meio e ir dividindo é O(log n). O que importa é o crescimento, não os segundos exatos. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: dois `for` um dentro do outro, cada um percorrendo o array inteiro, têm complexidade O(____). Se o array dobrar de tamanho, o tempo aumenta quantas vezes? Me conta seu raciocínio!",
    code: `// O(1) — constante
function primeiroItem(arr) { return arr[0]; }

// O(n) — linear
function buscarLinear(arr, alvo) {
    for (const item of arr) {
        if (item === alvo) return item;
    }
    return null;
}

// O(log n) — logarítmica (divide e conquista)
function buscaBinaria(arr, alvo) {
    let esq = 0, dir = arr.length - 1;
    while (esq <= dir) {
        const meio = Math.floor((esq + dir) / 2);
        if (arr[meio] === alvo) return meio;
        if (arr[meio] < alvo) esq = meio + 1;
        else dir = meio - 1;
    }
    return -1;
}

// O(n²) — quadrática (evitar em dados grandes)
function bubblesort(arr) {
    for (let i = 0; i < arr.length; i++)
        for (let j = 0; j < arr.length - i - 1; j++)
            if (arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
}`,
    lang: "javascript",
  },
  {
    keys: [
      "estrutura de dados",
      "linked list",
      "pilha",
      "fila",
      "stack",
      "queue",
      "heap",
    ],
    text: "Estruturas de dados são formas de organizar informação. Uma **pilha** funciona como uma pilha de pratos: o último que entra é o primeiro que sai. Uma **fila** é como a fila do pão: o primeiro que chega é o primeiro atendido. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: numa pilha, você faz `push(1)`, `push(2)`, `push(3)` e depois `pop()`. Qual número sai: ____? E se fosse uma fila? Testa e me conta!",
    code: `// PILHA (Stack) — LIFO (Last In, First Out)
class Pilha {
    #itens = [];
    push(item) { this.#itens.push(item); }
    pop()      { return this.#itens.pop(); }
    peek()     { return this.#itens.at(-1); }
    vazia()    { return this.#itens.length === 0; }
}
// Uso: histórico de undo/redo, chamadas de função (call stack)

// FILA (Queue) — FIFO (First In, First Out)
class Fila {
    #itens = [];
    enqueue(item) { this.#itens.push(item); }
    dequeue()     { return this.#itens.shift(); }
    frente()      { return this.#itens[0]; }
}
// Uso: fila de impressão, processamento de jobs

// LISTA LIGADA (Linked List)
class No { constructor(val) { this.val = val; this.next = null; } }
class ListaLigada {
    head = null;
    inserir(val) {
        const no = new No(val);
        if (!this.head) { this.head = no; return; }
        let atual = this.head;
        while (atual.next) atual = atual.next;
        atual.next = no;
    }
}`,
    lang: "javascript",
  },
  {
    keys: [
      "solid",
      "princípio",
      "single responsibility",
      "open closed",
      "liskov",
      "interface segregation",
      "dependency inversion",
    ],
    text: "SOLID são cinco conselhos para o código crescer sem virar bagunça. O mais importante para começar é o **S** (responsabilidade única): cada classe deve ter um só trabalho, como numa oficina em que cada ferramenta faz uma coisa bem feita, em vez de um canivete que faz tudo mal. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: na primeira classe `Usuario` do exemplo, quantas responsabilidades diferentes ela tem: ____? Em quantas classes você a dividiria? Me conta!",
    code: `// S — Single Responsibility (ruim vs bom)
// ❌ Uma classe faz tudo
class Usuario {
    salvar() { /* lógica de banco */ }
    enviarEmail() { /* lógica de e-mail */ }
    formatar() { /* lógica de UI */ }
}

// ✅ Separar responsabilidades
class UsuarioRepo   { salvar(usuario) { /*db*/ } }
class EmailService  { enviar(para, msg) { /*smtp*/ } }
class UsuarioMapper { paraDTO(usuario) { /*format*/ } }

// D — Dependency Inversion
// ❌ depende de implementação concreta
class Pedido {
    constructor() { this.db = new MySQL(); } // acoplado!
}

// ✅ depende de abstração (injeção de dependência)
class Pedido {
    constructor(db) { this.db = db; } // qualquer banco!
}
const pedido = new Pedido(new MySQL());
const pedidoTest = new Pedido(new FakeDb());`,
    lang: "javascript",
  },
  {
    keys: [
      "design pattern",
      "padrão de projeto",
      "singleton",
      "factory",
      "observer",
      "strategy",
    ],
    text: "Design patterns são receitas testadas para problemas que aparecem sempre. O **Singleton** garante uma única instância (como um só diretor na escola), a **Factory** fabrica objetos sem você saber os detalhes e o **Observer** avisa vários interessados quando algo muda, como um canal com inscritos. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: chame `Config.getInstance()` duas vezes e compare com `===`. O resultado é ____? Por quê? Testa e me diz o que apareceu.",
    code: `// SINGLETON — uma única instância
class Config {
    static #instance;
    #dados = {};

    static getInstance() {
        if (!this.#instance) this.#instance = new Config();
        return this.#instance;
    }
    set(k, v) { this.#dados[k] = v; }
    get(k)    { return this.#dados[k]; }
}

// OBSERVER — publicar/subscrever eventos
class EventEmitter {
    #listeners = {};
    on(event, fn) {
        (this.#listeners[event] ??= []).push(fn);
    }
    emit(event, data) {
        this.#listeners[event]?.forEach(fn => fn(data));
    }
}

// FACTORY — criar objetos sem expor construtor
function criarAnimal(tipo) {
    const tipos = { cachorro: Cachorro, gato: Gato };
    const Classe = tipos[tipo];
    if (!Classe) throw new Error("Tipo inválido");
    return new Classe();
}`,
    lang: "javascript",
  },
  {
    keys: [
      "functional programming",
      "programação funcional",
      "imutabilidade",
      "pure function",
      "side effect",
    ],
    text: "Programação funcional prefere funções **puras**: com a mesma entrada, sempre a mesma saída, sem mexer em nada fora delas, como uma calculadora. Também evita alterar dados existentes (imutabilidade): em vez de riscar a lista original, você cria uma nova. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: por que `somarImpura` é impura? Chame `somarImpura(5)` duas vezes e veja o resultado. Desafio: reescreva a soma sem usar a variável `total` de fora → `const somarPura = (total, n) => ____;`. Me conta!",
    code: `// 1. Funções puras — mesmo input, mesmo output, sem efeitos colaterais
const somar = (a, b) => a + b; // pura
let total = 0;
const somarImpura = (n) => (total += n); // impura (efeito colateral)

// 2. Imutabilidade — não mutar, criar novos valores
const original = [1, 2, 3];
const novo = [...original, 4];         // não muta original
const semPrimeiro = original.slice(1); // não muta

// 3. Composição de funções
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const processar = pipe(
    x => x * 2,
    x => x + 1,
    x => x.toString()
);
processar(5); // "11"

// 4. Currying
const saudar = (saudacao) => (nome) => \`\${saudacao}, \${nome}!\`;
const olá = saudar("Olá");
olá("Ana"); // "Olá, Ana!"
olá("Bob"); // "Olá, Bob!"`,
    lang: "javascript",
  },
  {
    keys: [
      "microservico",
      "microsserviço",
      "microservice",
      "monolito",
      "arquitetura",
    ],
    text: "Um **monolito** é uma loja única em que tudo funciona sob o mesmo teto: simples de começar, testar e publicar. **Microsserviços** são várias lojinhas especializadas que conversam entre si: cada uma escala sozinha, mas a comunicação e a manutenção ficam bem mais complicadas. Para quem está começando, e para a maioria dos projetos, o monolito bem organizado é o ponto de partida certo.",
    pergunta: "Pergunta: pensando num sistema de pedidos de lanchonete, quais partes você separaria se um dia ele crescesse muito (ex.: pagamento, cardápio, ____)? Me conta seu raciocínio!",
  },
  {
    keys: ["mvc", "model view controller", "padrão mvc", "mvvm"],
    text: "MVC divide o sistema em três papéis, como num restaurante: o **Model** é a cozinha (dados e regras), a **View** é o prato apresentado (a tela) e o **Controller** é o garçom que recebe o pedido e leva entre um e outro. Cada parte cuida só do seu trabalho. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: no exemplo, a regra \"preço não pode ser negativo\" ficou em qual camada: ____? Por que faz sentido ela estar ali e não na View? Me conta!",
    code: `// MODEL — regras de negócio e dados
class ProdutoModel {
    async buscarTodos() {
        return await db.query("SELECT * FROM produtos");
    }
    async criar(dados) {
        // validação de negócio
        if (dados.preco < 0) throw new Error("Preço inválido");
        return await db.query("INSERT ...", [dados]);
    }
}

// CONTROLLER — recebe request, chama Model, responde
class ProdutoController {
    constructor(model) { this.model = model; }

    async listar(req, res) {
        const produtos = await this.model.buscarTodos();
        res.json(produtos);
    }

    async criar(req, res) {
        const produto = await this.model.criar(req.body);
        res.status(201).json(produto);
    }
}

// VIEW — em APIs REST, o JSON é a "view"
// Em apps web full-stack, seria o HTML/template

// ROUTER — conecta rotas aos controllers
router.get("/produtos", ctrl.listar.bind(ctrl));
router.post("/produtos", ctrl.criar.bind(ctrl));`,
    lang: "javascript",
  },
  {
    keys: [
      "tdd",
      "test driven",
      "desenvolvimento guiado",
      "red green refactor",
    ],
    text: "TDD é escrever o teste **antes** do código, como desenhar o molde antes de derramar o metal. O ciclo é: **Red** (o teste falha porque o código não existe), **Green** (escreve o mínimo para passar) e **Refactor** (melhora o código mantendo o teste verde). O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: escreva só o teste de uma função `ehPar(n)` → `expect(ehPar(4)).toBe(____);`. Ele vai falhar primeiro (Red). Agora, qual o mínimo de código para ficar verde? Me conta o que você tentou!",
    code: `// 1. RED — teste falha (calculadora não existe)
it("divide dois números", () => {
    expect(dividir(10, 2)).toBe(5);
    expect(dividir(9, 3)).toBe(3);
});

it("lança erro ao dividir por zero", () => {
    expect(() => dividir(5, 0)).toThrow("Divisão por zero");
});

// 2. GREEN — implementação mínima
function dividir(a, b) {
    if (b === 0) throw new Error("Divisão por zero");
    return a / b;
}

// 3. REFACTOR — melhorar sem quebrar
// (aqui já está simples, nada a refatorar)
// Em casos reais: extrair, renomear, otimizar`,
    lang: "javascript",
  },

  // ── Next.js / React ──────────────────────────────────────
  {
    keys: [
      "next",
      "next.js",
      "nextjs",
      "server component",
      "app router",
      "ssr",
      "ssg",
    ],
    text: "Next.js é o React com superpoderes de servidor: a página pode ser montada no servidor antes de chegar ao navegador, o que deixa tudo mais rápido e melhor para o Google. No App Router, cada pasta dentro de `app/` vira uma rota do site. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: se você criar o arquivo `app/sobre/page.jsx`, qual endereço passa a existir → `localhost:3000/____`? Testa e me diz o que apareceu!",
    code: `// app/page.tsx — Server Component (padrão no App Router)
// Roda no servidor — acessa banco, sem bundle extra
async function HomePage() {
    const posts = await fetch("https://api.exemplo.com/posts")
        .then(r => r.json());

    return (
        <main>
            {posts.map(p => <PostCard key={p.id} post={p} />)}
        </main>
    );
}

// "use client" — Client Component (interatividade)
"use client";
import { useState } from "react";

function Contador() {
    const [n, setN] = useState(0);
    return <button onClick={() => setN(n+1)}>{n}</button>;
}

// API Route — app/api/users/route.ts
export async function GET() {
    const users = await db.findAll();
    return Response.json(users);
}

export async function POST(req: Request) {
    const body = await req.json();
    const user = await db.create(body);
    return Response.json(user, { status: 201 });
}`,
    lang: "jsx",
  },
  {
    keys: ["tailwind", "tailwindcss", "utility class", "classe utilitária"],
    text: "Tailwind é um estojo de pequenos carimbos de estilo: em vez de escrever CSS num arquivo separado, você aplica classes prontas como `p-6` (padding) e `text-xl` (texto grande) direto no HTML. Cada classe faz uma coisa só. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: deixe o título vermelho e em negrito trocando as classes → `class=\"text-____-600 font-____\"`. Me conta o que você tentou!",
    code: `<!-- Sem Tailwind (CSS separado) -->
<div class="card">
  <h2 class="card-title">Título</h2>
</div>

<!-- Com Tailwind (classes utilitárias inline) -->
<div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
  <h2 class="text-xl font-semibold text-gray-800 mb-2">Título</h2>
  <p class="text-gray-500 text-sm leading-relaxed">Texto...</p>
  <button class="mt-4 bg-blue-500 hover:bg-blue-600 text-white
                  px-4 py-2 rounded-lg font-medium transition">
    Ação
  </button>
</div>

<!-- Responsivo e dark mode -->
<div class="text-sm md:text-base lg:text-lg
            dark:bg-gray-900 dark:text-white">

<!-- Agrupando com @apply (em CSS) -->
/* globals.css */
.btn-primary {
  @apply bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600;
}`,
    lang: "html",
  },

  // ── Node.js avançado ─────────────────────────────────────
  {
    keys: [
      "fs",
      "filesystem",
      "sistema de arquivo",
      "path",
      "readfile",
      "writefile",
    ],
    text: "O módulo `fs` dá ao Node a capacidade de mexer em arquivos: ler, escrever, acrescentar e criar pastas, como um arquivista. Já o módulo `path` monta caminhos de pasta do jeito certo em qualquer sistema operacional. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para acrescentar uma linha sem apagar o arquivo → `await fs.____(\"log.txt\", \"oi\\n\")`. Roda duas vezes e me diz o que ficou no arquivo!",
    code: `const fs   = require("fs/promises"); // versão async
const path = require("path");

// Ler arquivo
const conteudo = await fs.readFile("dados.txt", "utf8");

// Escrever
await fs.writeFile("saida.txt", "conteúdo aqui\\n");

// Acrescentar
await fs.appendFile("log.txt", new Date() + "\\n");

// Verificar se existe
try {
    await fs.access("arquivo.json");
    console.log("existe");
} catch {
    console.log("não existe");
}

// Listar diretório
const arquivos = await fs.readdir("src");

// Criar diretório (recursivo)
await fs.mkdir("pasta/sub/deep", { recursive: true });

// Path — unir caminhos de forma segura
const caminho = path.join(__dirname, "assets", "logo.png");
const ext = path.extname("arquivo.js"); // ".js"`,
    lang: "javascript",
  },
  {
    keys: [
      "stream",
      "streams",
      "pipeline",
      "readable",
      "writable",
      "dados grandes",
    ],
    text: "Streams processam dados aos poucos, como beber água de um canudo em vez de virar o balde inteiro. Isso permite ler um arquivo de vários gigas sem estourar a memória, pedaço por pedaço. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: por que ler um CSV de 5 GB com `fs.readFile` poderia travar o programa, mas com stream não? Me conta seu raciocínio!",
    code: `const fs       = require("fs");
const readline = require("readline");
const { pipeline } = require("stream/promises");
const zlib     = require("zlib");

// Ler arquivo grande linha por linha (sem carregar tudo em memória)
const rl = readline.createInterface({
    input: fs.createReadStream("enorme.csv"),
});

for await (const linha of rl) {
    console.log(linha); // processa uma linha por vez
}

// Compactar arquivo com pipeline (encadeia streams)
await pipeline(
    fs.createReadStream("entrada.txt"),
    zlib.createGzip(),
    fs.createWriteStream("saida.txt.gz")
);

// HTTP com stream (serve arquivo grande sem bufferizar)
app.get("/download", (req, res) => {
    res.setHeader("Content-Type", "application/octet-stream");
    fs.createReadStream("arquivo-grande.zip").pipe(res);
});`,
    lang: "javascript",
  },

  // ── Outros tópicos úteis ─────────────────────────────────
  {
    keys: ["vuejs", "vue", "vue.js", "composition api", "ref vue", "reactive"],
    text: "Vue é um framework para criar telas **reativas**: quando um dado muda, a tela se atualiza sozinha, como um placar eletrônico. O `ref` guarda um valor reativo, e no template você usa `{{ }}` para mostrar valores e `@click` para reagir a cliques. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: crie um botão que diminui a contagem → `<button @click=\"____\">-1</button>`, com a função correspondente. Testa e me diz o que apareceu!",
    code: `<!-- Componente com Composition API (Vue 3) -->
<template>
    <div>
        <p>Contagem: {{ count }}</p>
        <button @click="incrementar">+1</button>
        <ul>
            <li v-for="item in lista" :key="item.id">
                {{ item.nome }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const count = ref(0);
const lista = ref([]);

const dobro = computed(() => count.value * 2);

function incrementar() {
    count.value++;
}

onMounted(async () => {
    const res = await fetch("/api/itens");
    lista.value = await res.json();
});
<\/script>

<style scoped>
button { background: #42b883; color: white; }
<\/style>`,
    lang: "html",
  },
  {
    keys: [
      "pwa",
      "progressive web app",
      "service worker",
      "manifest",
      "offline",
    ],
    text: "Uma PWA é um site que se comporta como aplicativo: pode ser instalado na tela inicial e até funcionar sem internet. O `manifest.json` é a carteira de identidade do app (nome, ícone, cores) e o **service worker** é um assistente nos bastidores que guarda arquivos em cache. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: se a internet cair, de onde o service worker tira os arquivos para a página continuar abrindo? Complete → do ____. Me conta!",
    code: `// manifest.json — torna o site "instalável"
{
    "name": "Meu App",
    "short_name": "App",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#0d1117",
    "theme_color": "#58a6ff",
    "icons": [
        { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
        { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
    ]
}

// service-worker.js — cache para funcionar offline
const CACHE = "v1";
const ARQUIVOS = ["/", "/index.html", "/styles.css", "/app.js"];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(ARQUIVOS))
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(cached => cached ?? fetch(e.request))
    );
});`,
    lang: "javascript",
  },
  {
    keys: ["axios", "http client", "interceptor", "instancia axios"],
    text: "Axios é um cliente HTTP, como o `fetch`, mas com algumas facilidades: já converte JSON e permite criar uma \"instância\" com configurações padrão. Os **interceptors** são como um posto de pedágio por onde toda requisição passa, ótimo para adicionar o token automaticamente. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: qual a vantagem de colocar o token no interceptor em vez de repetir em cada chamada? Desafio: complete → `config.headers.Authorization = \"Bearer \" + ____;`. Me conta!",
    code: `import axios from "axios";

// Instância configurada
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10_000,
    headers: { "Content-Type": "application/json" },
});

// Interceptor de requisição (adicionar token automaticamente)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = \`Bearer \${token}\`;
    return config;
});

// Interceptor de resposta (tratar erros globalmente)
api.interceptors.response.use(
    (res) => res.data, // extrai data automaticamente
    (err) => {
        if (err.response?.status === 401) {
            logout(); // redirecionar para login
        }
        return Promise.reject(err);
    }
);

// Usar
const usuarios = await api.get("/users");
const novo = await api.post("/users", { nome: "Ana" });`,
    lang: "javascript",
  },
  {
    keys: ["orm", "sequelize", "prisma", "typeorm", "object relational"],
    text: "Um ORM é um tradutor entre o seu código e o banco de dados: você trabalha com objetos e funções, e ele escreve o SQL por você. No Prisma, o **schema** descreve as tabelas e o cliente gerado oferece funções como `findMany` e `create`. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete para buscar um usuário pelo e-mail → `prisma.usuario.findUnique({ where: { ____: \"ana@email.com\" } })`. Por que o `email` pode ser usado aqui? (Dica: olhe o `@unique`.) Me conta!",
    code: `// schema.prisma
model Usuario {
    id        Int      @id @default(autoincrement())
    nome      String
    email     String   @unique
    posts     Post[]
    criadoEm DateTime @default(now())
}

model Post {
    id       Int      @id @default(autoincrement())
    titulo   String
    autor    Usuario  @relation(fields: [autorId], references: [id])
    autorId  Int
}

// Uso no código (TypeScript automático!)
const prisma = new PrismaClient();

// Buscar com relação
const usuario = await prisma.usuario.findUnique({
    where: { email: "ana@email.com" },
    include: { posts: true },
});

// Criar com relação
await prisma.usuario.create({
    data: {
        nome: "Bob",
        email: "bob@email.com",
        posts: { create: { titulo: "Meu post" } },
    },
});`,
    lang: "javascript",
  },
  {
    keys: [
      "performance",
      "otimização",
      "lazy load",
      "debounce",
      "throttle",
      "memoization",
    ],
    text: "Performance no front é fazer menos trabalho à toa. O **debounce** espera a pessoa parar de digitar antes de agir, como um elevador que aguarda todos entrarem; o **throttle** limita quantas vezes algo roda por segundo; e o **lazy load** só carrega imagens quando elas aparecem na tela. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: num campo de busca, com `debounce(buscar, ____)`, quantos milissegundos você daria de espera? Digite rápido e conte quantas vezes `buscar` foi chamada. Me conta o que apareceu!",
    code: `// DEBOUNCE — espera o usuário parar de digitar
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
input.addEventListener("input", debounce(buscar, 300));

// THROTTLE — limita frequência (ex: scroll)
function throttle(fn, limit) {
    let esperando = false;
    return (...args) => {
        if (esperando) return;
        fn(...args);
        esperando = true;
        setTimeout(() => (esperando = false), limit);
    };
}
window.addEventListener("scroll", throttle(atualizar, 100));

// MEMOIZATION — cachear resultados de funções puras
function memoizar(fn) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const resultado = fn(...args);
        cache.set(key, resultado);
        return resultado;
    };
}
const fibMemo = memoizar(fib);`,
    lang: "javascript",
  },
  {
    keys: [
      "acessibilidade",
      "accessibility",
      "a11y",
      "aria",
      "wcag",
      "screen reader",
    ],
    text: "Acessibilidade é fazer o site funcionar para todo mundo, inclusive quem usa leitor de tela ou navega só pelo teclado. É como colocar rampa e corrimão num prédio: atributos como `alt` nas imagens e `aria-label` em botões de ícone dão nome ao que antes era só visual. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: complete a imagem para quem não pode vê-la → `<img src=\"gato.jpg\" alt=\"____\">`. Tente navegar numa página só com Tab: o que ficou difícil? Me conta!",
    code: `<!-- Atributos ARIA essenciais -->
<button aria-label="Fechar modal" onclick="fechar()">✕</button>

<!-- Região ao vivo para anúncios dinâmicos -->
<div aria-live="polite" aria-atomic="true">
    <!-- mensagens de status injetadas via JS -->
</div>

<!-- Imagens -->
<img src="logo.png" alt="Logo DevAssist — ByteForge">
<img src="decorativa.png" alt=""> <!-- alt vazio = decorativa -->

<!-- Formulário acessível -->
<label for="email">E-mail</label>
<input id="email" type="email"
       aria-required="true"
       aria-describedby="email-hint">
<span id="email-hint">Use seu e-mail corporativo</span>

<!-- Foco visível (nunca remover sem alternativa!) -->
/* CSS */
:focus-visible { outline: 2px solid #58a6ff; outline-offset: 2px; }

<!-- Tecla Tab deve funcionar em todos elementos interativos -->
<div role="button" tabindex="0" onkeypress="...">Clique</div>`,
    lang: "html",
  },
  {
    keys: ["web vitals", "lcp", "fid", "cls", "core web vitals", "lighthouse"],
    text: "Core Web Vitals são as notas que o Google dá para a experiência da sua página. **LCP** mede quanto tempo o maior conteúdo leva para aparecer (bom: até 2,5s), **INP** mede o quanto a página demora para reagir a um clique (bom: até 200ms; substituiu o antigo FID) e **CLS** mede quanto o layout \"pula\" enquanto carrega (bom: até 0,1). Imagens pesadas e elementos sem tamanho definido são vilões comuns.",
    pergunta: "Mini-desafio: rode o Lighthouse (DevTools > Lighthouse) numa página sua. Qual das três métricas teve a pior nota e o que você acha que causou isso? Me conta!",
  },
  {
    keys: [
      "api rest boas praticas",
      "rest api design",
      "versionamento api",
      "api versão",
    ],
    text: "Uma boa API REST é previsível, como as placas de uma estrada bem sinalizada. A ideia é usar **substantivos** nas rotas (`/users`) e deixar o verbo HTTP dizer a ação, versionar (`/v1`) para não quebrar quem já usa e paginar listas grandes. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: reescreva a rota ruim `POST /api/createUser` no padrão REST → `____ /api/v1/____`. Me conta o que você tentou!",
    code: `// ── Nomenclatura de rotas ──
// ✅ Substantivos no plural, hierárquico
GET    /api/v1/users
GET    /api/v1/users/:id
GET    /api/v1/users/:id/posts
POST   /api/v1/users/:id/posts

// ❌ Verbos nas rotas (errado)
GET /api/getUsers
POST /api/createUser

// ── Filtro, paginação e ordenação via query params ──
GET /api/v1/users?page=2&limit=20&sort=nome&order=asc
GET /api/v1/products?categoria=tech&preco_max=500

// ── Resposta padronizada ──
{
    "data":    [...],      // payload
    "meta":    { "total": 100, "page": 1, "pages": 5 },
    "message": "ok"
}

// Erro padronizado
{
    "error": {
        "code":    "VALIDATION_ERROR",
        "message": "Campo 'email' é obrigatório",
        "field":   "email"
    }
}`,
    lang: "javascript",
  },
  {
    keys: ["webpack", "vite", "bundler", "bundle", "tree shaking", "build"],
    text: "Um bundler pega os vários arquivos do projeto e empacota tudo para o navegador, como montar as malas para uma viagem. O Vite é rápido porque, durante o desenvolvimento, entrega os arquivos sob demanda, e só empacota de verdade no build final. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: crie um projeto com o primeiro comando, mude um texto no `App` e salve. Quanto tempo levou para aparecer na tela? E qual comando gera a versão final → `npm run ____`? Me conta!",
    code: `# Criar projeto com Vite
npm create vite@latest meu-app -- --template react-ts
cd meu-app && npm install && npm run dev

# vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: { "@": "/src" } // import de "@/components/..."
    },
    build: {
        target: "esnext",
        rollupOptions: {
            output: {
                // dividir vendor em chunk separado (melhor cache)
                manualChunks: { vendor: ["react", "react-dom"] }
            }
        }
    },
    server: {
        port: 3000,
        proxy: {
            "/api": "http://localhost:8080" // evita CORS no dev
        }
    }
});`,
    lang: "javascript",
  },
  {
    keys: ["monorepo", "turborepo", "nx", "workspaces", "repositório único"],
    text: "Um monorepo é um único repositório que guarda vários projetos relacionados, como um prédio com vários apartamentos que compartilham a mesma portaria. O front, o back e os componentes compartilhados ficam juntos, e uma mudança num pacote comum chega a todos de uma vez. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: na estrutura do exemplo, em qual pasta você colocaria uma função de formatar moeda usada pelo `web` e pela `api` → `packages/____`? Me conta seu raciocínio!",
    code: `# Estrutura de monorepo com npm workspaces
meu-monorepo/
├── apps/
│   ├── web/        # Next.js (frontend)
│   └── api/        # Express (backend)
├── packages/
│   ├── ui/         # componentes compartilhados
│   ├── utils/      # utilitários comuns
│   └── types/      # TypeScript types compartilhados
└── package.json    # root

# package.json (root)
{
    "workspaces": ["apps/*", "packages/*"],
    "scripts": {
        "dev":   "turbo dev",
        "build": "turbo build",
        "test":  "turbo test"
    }
}

# Instalar dep em workspace específico
npm install react --workspace=apps/web

# Referenciar pacote interno
# apps/web/package.json
{ "dependencies": { "@meu/ui": "*" } }`,
    lang: "json",
  },
  {
    keys: ["rate limiting", "rate limit", "throttling api", "ddos proteção"],
    text: "Rate limiting é o segurança na porta da balada: cada visitante só pode entrar um certo número de vezes num período. Isso protege a API de abusos, robôs e tentativas de adivinhar senha. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: deixe a rota de login mais rígida, com no máximo 5 tentativas a cada 15 minutos → `max: ____`. O que o cliente recebe quando passa do limite? Me conta!",
    code: `// express-rate-limit
const rateLimit = require("express-rate-limit");

// Limite global
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,                   // máx 100 req por IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Muitas requisições, tente novamente em 15 min" },
});

app.use("/api/", limiter);

// Limite mais estrito para login (prevenir brute force)
const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 5,
    skipSuccessfulRequests: true, // não conta req bem-sucedidas
});

app.post("/api/auth/login", loginLimiter, loginHandler);

// Redis-based para múltiplos servidores
const RedisStore = require("rate-limit-redis");
const limiterDistribuido = rateLimit({
    store: new RedisStore({ client: redisClient }),
    windowMs: 60_000, max: 50,
});`,
    lang: "javascript",
  },
  {
    keys: ["webhook", "webhooks", "callback url", "evento externo"],
    text: "Um webhook é o contrário de ficar perguntando \"já chegou?\": você deixa seu endereço com um sistema externo e ele **avisa você** quando algo acontece, como o entregador que toca a campainha. Por segurança, sempre confira a assinatura para ter certeza de quem mandou o aviso. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: por que o exemplo verifica a `stripe-signature` antes de confiar no evento? O que um atacante poderia fazer sem essa checagem? Me conta seu raciocínio!",
    code: `// Receber webhook do Stripe (pagamentos)
app.post("/webhooks/stripe",
    express.raw({ type: "application/json" }), // raw body para verificar assinatura
    (req, res) => {
        const sig = req.headers["stripe-signature"];

        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.body, sig, process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            return res.status(400).send(\`Assinatura inválida: \${err.message}\`);
        }

        switch (event.type) {
            case "payment_intent.succeeded":
                const { amount, currency } = event.data.object;
                await ativarPedido(event.data.object.metadata.pedidoId);
                break;
            case "payment_intent.payment_failed":
                await notificarFalha(event.data.object);
                break;
        }

        res.json({ received: true }); // responder rápido (< 30s)
    }
);`,
    lang: "javascript",
  },
  {
    keys: [
      "queue",
      "fila de mensagens",
      "rabbitmq",
      "kafka",
      "bull",
      "job queue",
    ],
    text: "Uma fila de mensagens é como a comanda de uma lanchonete: o caixa anota o pedido e já atende o próximo cliente, enquanto a cozinha (o **worker**) prepara no seu tempo. Assim tarefas demoradas, como enviar e-mails, não travam a resposta para o usuário. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Pergunta: se o envio de e-mail falhar, qual a vantagem de a tarefa estar numa fila em vez de ter sido feita direto na requisição? Complete → a fila pode ____ a tarefa. Me conta!",
    code: `// BullMQ — filas com Redis (Node.js)
const { Queue, Worker } = require("bullmq");
const { Redis } = require("ioredis");

const connection = new Redis();

// Produtor — adicionar jobs
const emailQueue = new Queue("emails", { connection });

await emailQueue.add("boas-vindas", {
    para:   "usuario@email.com",
    nome:   "Ana",
    modelo: "welcome",
}, {
    delay:    5000,  // aguardar 5s antes de processar
    attempts: 3,     // tentar até 3 vezes em caso de falha
    backoff:  { type: "exponential", delay: 2000 },
});

// Consumidor — processar jobs
const worker = new Worker("emails", async (job) => {
    console.log(\`Processando: \${job.name}\`, job.data);
    await enviarEmail(job.data);
}, { connection, concurrency: 5 });

worker.on("completed", (job) => console.log(\`Job \${job.id} concluído\`));
worker.on("failed",    (job, err) => console.error(err));`,
    lang: "javascript",
  },
  {
    keys: [
      "redux",
      "zustand",
      "estado global",
      "state management",
      "context api",
      "store",
    ],
    text: "Estado global é um quadro de avisos que qualquer componente do app pode ler e atualizar, sem precisar passar dados de pai para filho por vários níveis. O Zustand cria esse quadro com pouquíssimo código: você define os dados e as funções que os alteram. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: crie uma ação para esvaziar o carrinho → `limpar: () => set({ itens: ____, total: 0 })`. Por que usamos `[...s.itens, produto]` e não `push`? Me conta!",
    code: `import { create } from "zustand";

const useCarrinho = create((set) => ({
    itens: [],
    total: 0,

    adicionar: (produto) => set((s) => ({
        itens: [...s.itens, produto],
        total: s.total + produto.preco,
    })),

    remover: (id) => set((s) => {
        const itens = s.itens.filter(i => i.id !== id);
        return { itens, total: itens.reduce((acc, i) => acc + i.preco, 0) };
    }),

    limpar: () => set({ itens: [], total: 0 }),
}));

// Em qualquer componente — sem Provider!
function Carrinho() {
    const { itens, total, remover } = useCarrinho();
    return (
        <div>
            {itens.map(i => <ItemRow key={i.id} item={i} onRemover={remover} />)}
            <strong>Total: R$ {total.toFixed(2)}</strong>
        </div>
    );
}`,
    lang: "jsx",
  },
  {
    keys: [
      "merge sort",
      "quick sort",
      "ordenação",
      "sorting algorithm",
      "algoritmo de ordenação",
    ],
    text: "Merge Sort e Quick Sort usam a estratégia **dividir para conquistar**: quebrar o problema em pedaços menores, resolver cada um e juntar. No Merge Sort, é como ordenar um baralho dividindo em montinhos, ordenando cada um e intercalando as cartas. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: faça na mão o `mergeSort([5, 2, 8, 1])`: como fica a divisão em ____ e ____, e depois a junção? Confira rodando o código e me conta o que apareceu!",
    code: `// MERGE SORT — O(n log n) estável, divide e conquista
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid  = Math.floor(arr.length / 2);
    const esq  = mergeSort(arr.slice(0, mid));
    const dir  = mergeSort(arr.slice(mid));
    return merge(esq, dir);
}
function merge(a, b) {
    const res = []; let i = 0, j = 0;
    while (i < a.length && j < b.length)
        res.push(a[i] <= b[j] ? a[i++] : b[j++]);
    return [...res, ...a.slice(i), ...b.slice(j)];
}

// QUICK SORT — O(n log n) médio, O(n²) pior caso
function quickSort([pivot, ...rest]) {
    if (pivot === undefined) return [];
    const esq = rest.filter(x => x <= pivot);
    const dir = rest.filter(x => x >  pivot);
    return [...quickSort(esq), pivot, ...quickSort(dir)];
}

// Produção: Array.sort() nativo (TimSort otimizado)
arr.sort((a, b) => a - b);                        // números
arr.sort((a, b) => a.nome.localeCompare(b.nome)); // strings`,
    lang: "javascript",
  },
  {
    keys: [
      "clean code",
      "código limpo",
      "naming",
      "nomenclatura",
      "legibilidade",
      "boas práticas código",
    ],
    text: "Código limpo é código que outra pessoa (ou você daqui a seis meses) entende sem esforço. Nomes que dizem a intenção, funções pequenas que fazem uma coisa só e números com nome (constantes) valem mais do que comentários explicando código confuso. O código abaixo é um exemplo para ler e experimentar.",
    pergunta: "Desafio: renomeie esta função para algo que diga o que ela faz → `function ____(lista) { return lista.filter(u => u.ativo); }`. Me conta o nome que você escolheu!",
    code: `// ❌ Código obscuro
function calc(x, y, z) {
    return x < 0.15 ? y * z : y * z * 1.23;
}

// ✅ Código limpo e autoexplicativo
const TAXA_IMPOSTO   = 0.23;
const LIMITE_ISENCAO = 0.15;

function calcularPrecoFinal(precoBase, quantidade, frete) {
    const subtotal    = precoBase * quantidade;
    const comImposto  = subtotal > LIMITE_ISENCAO
        ? subtotal * (1 + TAXA_IMPOSTO)
        : subtotal;
    return comImposto + frete;
}

// ❌ Flag argument (antipadrão)
function renderizar(el, isAdmin) { if (isAdmin) {/*...*/} }

// ✅ Funções específicas e claras
function renderizarAdmin(el)   { /*...*/ }
function renderizarUsuario(el) { /*...*/ }`,
    lang: "javascript",
  },
];
