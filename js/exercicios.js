// ════════════════════════════════════════════════════════════
// EXERCÍCIOS GUIADOS — plano B quando a IA está fora do ar
// Cada exercício segue o método da forja: explica a ideia, faz uma
// pergunta, deixa uma lacuna e, a cada nova mensagem do aluno, dá a
// próxima pista. A solução completa nunca é entregue.
//   keys:     palavras que identificam o pedido
//   acerto:   reconhece uma tentativa certa do aluno
//   pistas:   [{ text, code?, lang? }] — a primeira é a explicação inicial
//   parabens: mensagem quando o aluno acerta (com um desafio extra)
// ════════════════════════════════════════════════════════════
const exercicios = [
  {
    keys: ["inverter", "inverta", "invertida", "inverte", "ao contrário", "ao contrario", "de trás pra frente", "de tras pra frente", "reverso"],
    acerto: /range\(\s*len\(\s*\w+\s*\)\s*-\s*1\s*,\s*-1\s*,\s*-1\s*\)|\[\s*::\s*-1\s*\]|reversed\(/,
    pistas: [
      {
        text: "Bora forjar juntos! Cada letra tem uma posição. Se `\"abc\"` tem as posições 0, 1 e 2, **em que ordem você lê para formar `\"cba\"`?** Complete:",
        code: `texto = "abc"\ninvertido = ""\nfor i in range(____):\n    invertido += texto[i]\nprint(invertido)`,
        lang: "python",
      },
      {
        text: "Boa tentativa! Pista 2: você quer que o `i` vá **2, 1, 0**. O `range` aceita três números: `range(início, fim, passo)`. O fim não entra na contagem. Que passo faz contar para trás?",
        code: `for i in range(2, ____, ____):\n    print(i)   # deve mostrar 2, 1, 0`,
        lang: "python",
      },
      {
        text: "Quase lá! Pista 3: para começar da **última** posição, use `len(texto) - 1`. Para incluir a posição 0, o fim precisa ser **-1**. Agora junte as peças no seu código e me conta o que apareceu!",
        code: `for i in range(len(texto) - 1, ____, -1):\n    invertido += texto[i]`,
        lang: "python",
      },
      {
        text: "Última pista: a lacuna é o número que fica **uma posição antes do 0**. Testa com `\"forja\"`: se aparecer `\"ajrof\"`, a peça está pronta! 🔥",
      },
    ],
    parabens: "⚒️ **Forjado!** O `range` andou da última letra até a primeira e você foi montando a palavra ao contrário. Desafio extra: use isso para descobrir se uma palavra é **palíndromo** (igual dos dois lados, como `\"arara\"`).",
  },
  {
    keys: ["par ou ímpar", "par ou impar", "é par", "e par", "número par", "numero par", "ímpar", "impar"],
    acerto: /%\s*2\s*==\s*0|%\s*2\s*!=\s*0|%\s*2\s*==\s*1/,
    pistas: [
      {
        text: "Bora pensar como matemático! Um número é **par** quando dá para dividir por 2 sem sobrar nada. **Que operação mostra o que sobra de uma divisão?** Em Python ela é o símbolo `%`. Complete:",
        code: `numero = int(input("Digite um número: "))\nif numero ____ 2 == ____:\n    print("Par")\nelse:\n    print("Ímpar")`,
        lang: "python",
      },
      {
        text: "Pista 2: testa no papel: `7 % 2` dá 1 (sobra 1) e `8 % 2` dá 0 (não sobra nada). Qual desses resultados significa **par**?",
      },
      {
        text: "Pista 3: a primeira lacuna é o operador de resto e a segunda é o resto que um número par deixa. Roda com 4 e com 7 e me conta o que aparece!",
      },
    ],
    parabens: "⚒️ **Perfeito!** O `%` devolve o resto da divisão, e resto 0 quer dizer que cabe certinho. Desafio extra: mostre todos os números pares de 1 a 20 usando um `for`.",
  },
  {
    keys: ["tabuada"],
    acerto: /range\(\s*1\s*,\s*11\s*\)/,
    pistas: [
      {
        text: "A tabuada é a mesma conta repetida: **número × 1, número × 2, ... até × 10**. Quando algo se repete, pensamos em um laço. **Quais valores o contador precisa assumir?** Complete:",
        code: `numero = int(input("Tabuada de qual número? "))\nfor i in range(____, ____):\n    print(numero, "x", i, "=", ____)`,
        lang: "python",
      },
      {
        text: "Pista 2: o `range(a, b)` começa em `a` e **para antes** de `b`. Para ir de 1 até 10, qual deve ser o `b`?",
      },
      {
        text: "Pista 3: a última lacuna é a própria conta: o número vezes o contador (em Python o \"vezes\" é `*`). Roda com 7 e confere com a tabuada que você conhece!",
      },
    ],
    parabens: "⚒️ **Forjado!** O `for` repetiu a conta 10 vezes sem você escrever 10 linhas. Desafio extra: mostre as tabuadas do 1 ao 5, uma embaixo da outra (dica: um `for` dentro de outro).",
  },
  {
    keys: ["maior número", "maior numero", "maior de três", "maior de tres", "maior valor", "maior entre", "maior de dois"],
    acerto: /if\s+\w+\s*>\s*maior|maior\s*=\s*\w+\s*$/m,
    pistas: [
      {
        text: "Pense em uma fila de pessoas: para achar a mais alta, você guarda a primeira como \"a maior até agora\" e compara com as próximas. **O que você faz quando aparece alguém mais alto?** Complete:",
        code: `numeros = [7, 3, 12, 5]\nmaior = numeros[0]\nfor n in numeros:\n    if n ____ maior:\n        maior = ____\nprint("O maior é", maior)`,
        lang: "python",
      },
      {
        text: "Pista 2: a comparação precisa responder \"o `n` é **maior que** o `maior` guardado?\". Qual símbolo faz essa pergunta?",
      },
      {
        text: "Pista 3: quando a resposta é sim, o `n` vira o novo campeão. O que vai depois do `maior =`? Testa com a lista e me conta se deu 12!",
      },
    ],
    parabens: "⚒️ **Isso aí!** Guardar o \"campeão até agora\" é um padrão que aparece em muito lugar. Desafio extra: ache também o **menor** número na mesma passada pela lista.",
  },
  {
    keys: ["somar de 1", "soma de 1", "soma dos números", "soma dos numeros", "somatório", "somatorio", "somar até", "somar ate", "soma até", "soma ate"],
    acerto: /total\s*\+=\s*\w+|soma\s*\+=\s*\w+|total\s*=\s*total\s*\+/,
    pistas: [
      {
        text: "Somar de 1 até N é como encher um cofrinho: começa vazio e a cada volta você coloca mais uma moeda. **O cofrinho começa com quanto?** Complete:",
        code: `n = int(input("Somar até: "))\ntotal = ____\nfor i in range(1, ____):\n    total ____ i\nprint(total)`,
        lang: "python",
      },
      {
        text: "Pista 2: o `range` para **antes** do último número. Para incluir o próprio N, o fim do range precisa ser um a mais. Como você escreve isso?",
      },
      {
        text: "Pista 3: para \"colocar no cofrinho\" use o operador que soma e guarda ao mesmo tempo: `+=`. Testa com 10: o resultado certo é 55!",
      },
    ],
    parabens: "⚒️ **Forjado!** Esse é o padrão do **acumulador**. Desafio extra: some só os números pares de 1 até N.",
  },
  {
    keys: ["vogais", "vogal"],
    acerto: /in\s+["']aeiou|in\s+"aeiouAEIOU"|in\s+vogais/,
    pistas: [
      {
        text: "Contar vogais é passar letra por letra e perguntar: **\"essa letra é uma vogal?\"**. Se for, soma 1 no contador. **Como você testaria se uma letra está dentro de `\"aeiou\"`?** Complete:",
        code: `frase = input("Frase: ").lower()\ncontador = 0\nfor letra in frase:\n    if letra ____ "aeiou":\n        contador += 1\nprint("Vogais:", contador)`,
        lang: "python",
      },
      {
        text: "Pista 2: em Python, para perguntar se algo está **dentro** de outra coisa, usamos uma palavrinha de duas letras em inglês. Qual é?",
      },
      {
        text: "Pista 3: é a mesma palavra do `for letra ____ frase`. Testa com \"ByteForge\": deve dar 3!",
      },
    ],
    parabens: "⚒️ **Boa!** O `.lower()` garante que \"A\" e \"a\" contem igual. Desafio extra: conte também as consoantes (cuidado com espaços e números).",
  },
  {
    keys: ["palíndromo", "palindromo", "palíndroma", "palindroma"],
    acerto: /==\s*\w+\[\s*::\s*-1\s*\]|\[\s*::\s*-1\s*\]\s*==/,
    pistas: [
      {
        text: "Palíndromo é a palavra que se lê igual dos dois lados, como \"arara\". Então a pergunta é: **a palavra é igual a ela mesma invertida?** Primeiro: como você inverteria a palavra?",
        code: `palavra = input("Palavra: ").lower()\ninvertida = ____\nif palavra ____ invertida:\n    print("É palíndromo!")\nelse:\n    print("Não é.")`,
        lang: "python",
      },
      {
        text: "Pista 2: o Python tem um \"fatiamento\" que anda de trás para frente: `texto[::passo]`. Qual passo faz andar para trás?",
      },
      {
        text: "Pista 3: com `palavra[::-1]` você tem a invertida. Agora, qual operador compara se duas coisas são **iguais**? (Cuidado: não é o `=`.)",
      },
    ],
    parabens: "⚒️ **Forjado!** Comparar com a versão invertida é o jeito mais direto. Desafio extra: faça funcionar com frases, como \"A sacada da casa\" (dica: tire os espaços).",
  },
  {
    keys: ["média", "media das notas", "média das notas", "calcular media", "calcular a media", "notas do aluno"],
    acerto: /\/\s*(len\(|3|2|4)|sum\(/,
    pistas: [
      {
        text: "Média é juntar tudo e dividir igualmente. **Quais são os dois passos que você faz no papel para calcular a média de 3 notas?** Complete:",
        code: `n1 = float(input("Nota 1: "))\nn2 = float(input("Nota 2: "))\nn3 = float(input("Nota 3: "))\nmedia = (____) / ____\nprint("Média:", media)`,
        lang: "python",
      },
      {
        text: "Pista 2: primeiro soma as três notas, depois divide pela **quantidade** de notas. Por que os parênteses são importantes aqui?",
      },
      {
        text: "Pista 3: sem parênteses o Python divide antes de somar! Testa com 7, 8 e 9: deve dar 8.0. Desafio: mostre \"Aprovado\" se a média for 7 ou mais.",
      },
    ],
    parabens: "⚒️ **Boa!** E você usou `float` para aceitar notas quebradas como 7.5. Desafio extra: aceite quantas notas o usuário quiser, usando uma lista.",
  },
  {
    keys: ["fatorial"],
    acerto: /resultado\s*\*=\s*\w+|fat\s*\*=\s*\w+|\*\s*fatorial\(/,
    pistas: [
      {
        text: "Fatorial de 5 é 5 × 4 × 3 × 2 × 1 = 120. É parecido com uma soma acumulada, só que **multiplicando**. **Com que número o acumulador precisa começar?** (Dica: não pode ser 0. Por quê?)",
        code: `n = int(input("Número: "))\nresultado = ____\nfor i in range(1, ____):\n    resultado ____ i\nprint(resultado)`,
        lang: "python",
      },
      {
        text: "Pista 2: qualquer número multiplicado por 0 vira 0. Qual número **não muda** nada quando você multiplica?",
      },
      {
        text: "Pista 3: o range precisa incluir o próprio `n` (lembra que ele para antes do fim) e o operador para \"multiplicar e guardar\" é `*=`. Testa com 5!",
      },
    ],
    parabens: "⚒️ **Forjado!** Desafio extra (nível ferreiro-mestre): escreva o fatorial como uma **função recursiva**, que chama a si mesma.",
  },
  {
    keys: ["fizzbuzz", "fizz buzz"],
    acerto: /%\s*15|%\s*3\s*==\s*0\s+and\s+\w+\s*%\s*5/,
    pistas: [
      {
        text: "FizzBuzz: de 1 a 100, múltiplos de 3 viram \"Fizz\", de 5 viram \"Buzz\" e de ambos viram \"FizzBuzz\". O segredo está na **ordem das perguntas**. **Qual caso você precisa testar primeiro e por quê?**",
        code: `for i in range(1, 101):\n    if ____:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif ____:\n        print("Buzz")\n    else:\n        print(i)`,
        lang: "python",
      },
      {
        text: "Pista 2: se você perguntar \"é múltiplo de 3?\" primeiro, o 15 vira só \"Fizz\" e nunca chega no \"FizzBuzz\". Como saber se um número é múltiplo de 3 **e** de 5 ao mesmo tempo?",
      },
      {
        text: "Pista 3: você pode usar `and` juntando os dois testes de resto, ou lembrar que múltiplo de 3 e de 5 é múltiplo de ____. Roda e confere o 15!",
      },
    ],
    parabens: "⚒️ **FizzBuzz forjado!** Esse exercício cai em entrevista de emprego, sabia? Desafio extra: troque por \"Forja\" os múltiplos de 7.",
  },
];
