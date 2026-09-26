import type { FeedCard, Topic } from "@/lib/types";

/** Conteúdo curado do CosmosGrok — bilíngue, com corpo suficiente para modo foco. */
export const topics: Topic[] = [
  {
    slug: "buracos-negros",
    category: "space",
    minutes: 4,
    title: { pt: "Buracos negros: onde o espaço quebra o contrato", en: "Black holes: where space breaks the contract" },
    excerpt: {
      pt: "Não é um aspirador cósmico. É um ponto onde a gravidade vence todas as outras forças — e a informação some de vista.",
      en: "It's not a cosmic vacuum. It's a point where gravity beats every other force — and information goes out of sight.",
    },
    body: {
      pt: [
        "Um buraco negro não é um buraco e não é negro por acaso: é massa espremida a tal ponto que nenhum escape é possível. A velocidade de fuga excede a da luz, e nada — nem um bom motivo — atravessa essa fronteira chamada horizonte de eventos.",
        "A maioria nasce do colapso de estrelas massivas. Quando o combustível acaba, a pressão que segurava a estrela de pé também acaba, e a gravidade vence de goleada. Estrelas bem maiores que o Sol viram buracos negros de poucas massas solares; galáxias inteiras carregam gigantes de milhões ou bilhões de massas solares nos seus centros.",
        "Perto do horizonte, o tempo passa mais devagar para quem observa de longe. Se você deixasse um amigo orbitar a beirada, veria o envelhecimento dele desacelerar enquanto o seu segue normal. Não é efeito de relógio mal-feito: é o tecido do espaço-tempo sendo esticado.",
        "O que acontece com a informação que cai dentro é um dos maiores enigmas da física. A mecânica quântica diz que a informação nunca se perde; a relatividade geral diz que, para o observador externo, tudo desaparece para sempre. Resolver isso significa reconciliar as duas melhores teorias que já tivemos.",
        "E sim, já fotografamos a sombra de um: a primeira imagem de 2019 mostrou o disco de gás ao redor do buraco negro de M87. O que você vê é luz curvada por um objeto que, por definição, não emite nada.",
      ],
      en: [
        "A black hole isn't a hole, and it isn't black by accident: it's mass squeezed so hard that no escape is possible. Escape velocity exceeds the speed of light, and nothing — not even a good reason — crosses the boundary called the event horizon.",
        "Most are born from the collapse of massive stars. When the fuel runs out, the pressure holding the star up runs out too, and gravity wins in one shot. Stars a few times heavier than the Sun become black holes of a few solar masses; entire galaxies carry giants of millions or billions of solar masses at their centers.",
        "Near the horizon, time runs slower for a distant observer. If you left a friend orbiting the edge, you'd see their aging slow down while yours continues normally. It's not a faulty clock: it's the fabric of spacetime being stretched.",
        "What happens to the information that falls in is one of physics' biggest puzzles. Quantum mechanics says information is never lost; general relativity says that, to an outside observer, it disappears forever. Solving this means reconciling our two best theories ever.",
        "And yes, we've photographed one: the first image in 2019 showed the gas disk around the black hole in M87. What you see is light bent by an object that, by definition, emits nothing.",
      ],
    },
    related: ["entropia", "tempo", "viagem-no-tempo"],
    keywords: ["buraco negro", "black hole", "horizonte", "horizon", "relatividade", "relativity", "m87"],
  },
  {
    slug: "entropia",
    category: "science",
    minutes: 4,
    title: { pt: "Entropia: a razão pela qual o café esfria", en: "Entropy: why your coffee goes cold" },
    excerpt: {
      pt: "A segunda lei da termodinâmica explica desde o café da manhã até o fim do universo — sem usar uma única fórmula.",
      en: "The second law of thermodynamics explains everything from your morning coffee to the end of the universe — with zero formulas.",
    },
    body: {
      pt: [
        "Entropia é, na prática, uma medida de quantas maneiras as coisas podem estar embaralhadas. Um quarto arrumado tem poucas configurações possíveis; o mesmo quarto desfeito tem bilhões. A natureza simplesmente favorrece os arranjos mais prováveis.",
        "A segunda lei da termodinâmica diz que a entropia total de um sistema fechado tende a aumentar. Traduzindo: o calor espalha, os gases se misturam, o gelo derrete. Nada disso é proibido ao contrário — só é absurdamente improvável que aconteça espontaneamente.",
        "É por isso que existe tempo com direção. As leis fundamentais da física funcionam igual para trás e para frente, mas a entropia cria uma seta: o ovo quebra e não remonta. O passado é o lado com menos entropia; o futuro, com mais.",
        "Estrelas, vida e cérebros existem porque o universo não está em equilíbrio. Organizações complexas são formas elegantes de dissipar energia — nós somos, em parte, máquinas bem organizadas para acelerar a produção de calor.",
        "Um dia, supõe-se, tudo estará em equilíbrio térmico: nada de diferença de temperatura, nada de estrutura, nada de ninguém. É o chamado calor da morte. Não se preocupe: estamos muito, muito longe disso.",
      ],
      en: [
        "Entropy is, in practice, a measure of how many ways things can be shuffled. A tidy room has few possible configurations; the same room undone has billions. Nature simply favors the most probable arrangements.",
        "The second law of thermodynamics says the total entropy of a closed system tends to increase. Translated: heat spreads, gases mix, ice melts. None of this is forbidden in reverse — it's just absurdly unlikely to happen spontaneously.",
        "That's why time has a direction. The fundamental laws of physics work the same backwards and forwards, but entropy creates an arrow: the egg breaks and doesn't reassemble. The past is the low-entropy side; the future, the high-entropy one.",
        "Stars, life and brains exist because the universe is not in equilibrium. Complex organizations are elegant ways to dissipate energy — we are, in part, well-organized machines for speeding up heat production.",
        "One day, presumably, everything will reach thermal equilibrium: no temperature differences, no structure, no one. It's called heat death. Don't worry: we are very, very far from that.",
      ],
    },
    related: ["tempo", "buracos-negros", "origem-da-vida"],
    keywords: ["entropia", "entropy", "termodinâmica", "thermodynamics", "segunda lei", "calor", "heat"],
  },
  {
    slug: "tempo",
    category: "science",
    minutes: 4,
    title: { pt: "O tempo passa ou só acontece muita coisa?", en: "Does time pass, or is a lot just happening?" },
    excerpt: {
      pt: "Nenhuma equação do universo exige que o tempo avance. Então por que você está sempre atrasado?",
      en: "Nothing in the equations of the universe requires time to move forward. So why are you always late?",
    },
    body: {
      pt: [
        "Nas leis da física, o tempo pode correr para frente ou para trás sem problema. A gravidade, o eletromagnetismo, a mecânica quântica: todas funcionam com o sinal do tempo invertido. E mesmo assim, na sua vida, o café só esfria e nunca esquenta sozinho.",
        "A suspeita principal é a mesma de sempre: entropia. O futuro é o lado com mais desordem, e a nossa percepção de fluxo vem de constatar que as coisas mudam de um estado específico para estados muito mais prováveis.",
        "Há quem defenda que nada 'passa' de verdade — o universo seria uma blocos quatro dimensões, um espaguete completo do Big Bang ao fim, e o nosso 'agora' seria só a fatia que estamos sentindo. Estranho? Sim. Incoerente? Não.",
        "Na relatividade, o tempo ainda é pessoal: quem viaja rápido ou perto de massa envelhece menos que quem fica em casa. Não existe um relógio universal correndo em cima do cosmos — existe uma rede de relógios, cada um com seu próprio ritmo.",
        "Se isso te assusta um pouco, ótimo. Física boa costuma começar com uma sensação estranha e terminar com uma pergunta melhor.",
      ],
      en: [
        "In the laws of physics, time may run forward or backward without issue. Gravity, electromagnetism, quantum mechanics: all work with the sign of time flipped. And yet in your life, coffee only cools down and never heats up on its own.",
        "The main suspect is the usual one: entropy. The future is the disordered side, and our sense of flow comes from noticing things move from a specific state to far more probable ones.",
        "Some argue nothing really 'passes' at all — the universe would be a four-dimensional block, a complete spaghetti from Big Bang to end, and our 'now' would just be the slice we're feeling. Strange? Yes. Incoherent? No.",
        "In relativity, time is still personal: whoever travels fast or near mass ages less than whoever stays home. There is no universal clock ticking above the cosmos — there's a network of clocks, each with its own pace.",
        "If that scares you a little, good. Great physics usually starts with a strange feeling and ends with a better question.",
      ],
    },
    related: ["entropia", "viagem-no-tempo", "livre-arbitrio"],
    keywords: ["tempo", "time", "relógio", "clock", "passado", "futuro", "arrow of time"],
  },
  {
    slug: "viagem-no-tempo",
    category: "space",
    minutes: 3,
    title: { pt: "Viagem no tempo: permitida, com letras miúdas", en: "Time travel: allowed, with fine print" },
    excerpt: {
      pt: "A física não proíbe voltar no tempo. Ela só torna o processo absurdamente inconveniente.",
      en: "Physics doesn't forbid going back in time. It just makes the process absurdly inconvenient.",
    },
    body: {
      pt: [
        "Viajar para o futuro é trivialmente possível: basta se mover muito rápido ou se aproximar de uma massa enorme. O relógio de bordo adianta menos que o da Terra. Astronautas vivem isso em doses homeopáticas a cada órbita.",
        "Voltar é o problema. A relatividade permite chamados 'curvas temporais fechadas' em certas soluções — mas elas exigem matéria com energia negativa ou rotação de galáxias inteiras, coisas que provavelmente não existem na prática.",
        "Mesmo se existissem, a causalidade vira um nó. Se você volta e impede o seu nascimento, quem viajou? O consenso informal entre físicos é que, se o futuro puder ser alterado, ele simplesmente se reorganiza para impedir a contradição — a hipótese de autoconsistência.",
        "Há também a questão térmica: voltar significa entrar num universo com menos entropia, ou seja, ordem demais. Você não estaria apenas no passado — estaria em um estado que o nosso universo atual dificilmente aceita.",
        "Resumo: dá para ir amanhã. Ontem é outra conversa.",
      ],
      en: [
        "Traveling to the future is trivially possible: just move very fast or get close to a huge mass. Your onboard clock advances less than Earth's. Astronauts experience this in homeopathic doses every orbit.",
        "Going back is the problem. Relativity allows so-called 'closed timelike curves' in certain solutions — but they require negative energy matter or the rotation of entire galaxies, things that probably don't exist in practice.",
        "Even if they did, causality becomes a knot. If you go back and prevent your own birth, who traveled? The informal consensus among physicists is that, if the future can be altered, it simply reorganizes to prevent the contradiction — the self-consistency hypothesis.",
        "There's also the thermal issue: going back means entering a universe with less entropy, i.e., too much order. You wouldn't just be in the past — you'd be in a state our current universe would hardly accept.",
        "Summary: you can go to tomorrow. Yesterday is another conversation.",
      ],
    },
    related: ["tempo", "buracos-negros", "simulacao"],
    keywords: ["viagem no tempo", "time travel", "passado", "causalidade", "curva temporal"],
  },
  {
    slug: "como-llms-pensam",
    category: "ai",
    minutes: 5,
    title: { pt: "Como um LLM 'pensa' (e onde ele trapaceia)", en: "How an LLM 'thinks' (and where it cheats)" },
    excerpt: {
      pt: "Nada de mágica: é estatística, camadas e muito texto. Entenda o que a IA faz — e o que ela só parece fazer.",
      en: "No magic: it's statistics, layers and a lot of text. Understand what AI does — and what it only seems to do.",
    },
    body: {
      pt: [
        "Um modelo de linguagem aprende a prever a próxima palavra. Só isso. O pulo do gato é que, para prever bem a próxima palavra em qualquer contexto, ele precisa comprimir dentro dos pesos um modelo grosseiro de mundo: gramática, fatas, estilos, causas.",
        "O treino é ingênuo e brutal: bilhões de textos, pesos ajustados para errar menos, repetição até a conta de luz chegar. Não há base de dados de verdades — há padrões estatísticos que, muitas vezes, coincidem com a verdade porque a verdade é previsível.",
        "Quando você pede raciocínio, o modelo não consulta um oráculo: ele gera passo a passo e usa o próprio texto parcial como memória. Por isso cadeias longas de raciocínio ajudam — e por isso ele pode improvisar com confiança quando os dados acabam.",
        "Alucinar não é bug de personalidade: é o modo padrão de operação. O modelo otimiza plausibilidade, não verificabilidade. Sem ferramenta de busca, sem código executando, sem fonte, ele vai preencher o vazio com o mais provável.",
        "A consequência prática: use IA para estruturar, explicar, comparar e acelerar — e mantenha você no comando da verificação. A parte chata é a sua; a parte rápida é a dele.",
      ],
      en: [
        "A language model learns to predict the next word. That's it. The trick is that, to predict well in any context, it must compress into its weights a rough model of the world: grammar, facts, styles, causes.",
        "Training is naive and brutal: billions of texts, weights adjusted to err less, repetition until the electricity bill arrives. There is no database of truths — there are statistical patterns that often coincide with truth because truth is predictable.",
        "When you ask for reasoning, the model doesn't consult an oracle: it generates step by step and uses its own partial text as memory. That's why long chains of reasoning help — and why it can improvise with confidence when the data runs out.",
        "Hallucination isn't a personality bug: it's the default operating mode. The model optimizes plausibility, not verifiability. Without search tools, without code running, without sources, it fills the void with the most probable thing.",
        "The practical consequence: use AI to structure, explain, compare and speed up — and keep yourself in charge of verification. The boring part is yours; the fast part is its.",
      ],
    },
    related: ["consciencia", "simulacao", "ia-e-trabalho"],
    keywords: ["ia", "ai", "llm", "gpt", "modelo", "model", "transformer", "alucinação", "treino"],
  },
  {
    slug: "ia-e-trabalho",
    category: "ai",
    minutes: 4,
    title: { pt: "IA vai substituir quem? (resposta incompleta e honesta)", en: "Will AI replace whom? (an incomplete, honest answer)" },
    excerpt: {
      pt: "Não é sobre empregos inteiros sumindo: é sobre tarefas mudando de dono — mais rápido do que as instituições conseguem reagir.",
      en: "It's not about whole jobs vanishing: it's about tasks changing owners — faster than institutions can react.",
    },
    body: {
      pt: [
        "Históricos de tecnologia mostram o mesmo padrão: máquinas não destroem categorias inteiras de trabalho, elas redefinem o conteúdo de cada uma. O perigo real não é o desemprego puro, é a obsolescência da sua descrição de cargo enquanto você ainda está empregado.",
        "O que a IA faz de melhor é trabalho cognitivo padronizado: resumir, redigir rascunhos, classificar, traduzir, gerar código comum. O que continua difícil é julgamento sob incerteza, responsabilidade legal e trabalho físico em ambientes não estruturados.",
        "Existe um efeito de empoderamento desigual: quem já era bom fica absurdamente mais produtivo; quem está começando pode perder o degrau de entrada que existia. Isso é um problema sério de formação, não de fada tecnológica.",
        "A pergunta mais útil não é 'meu emprego some?', e sim 'qual parte do meu trabalho é repetível o suficiente para ser automatizada?'. Essa parte vai. O resto — gosto, contexto, ética, relacionamento — fica mais valioso, não menos.",
        "Curiosidade, aqui, é vantagem competitiva: quem entende as ferramentas escolhe o que delegar. Quem não entende, tem as decisões tomadas por quem entende.",
      ],
      en: [
        "Technology histories show the same pattern: machines don't destroy whole job categories, they redefine what each one contains. The real danger isn't pure unemployment, it's your job description becoming obsolete while you're still employed.",
        "What AI does best is standardized cognitive work: summarize, draft, classify, translate, write common code. What remains hard is judgment under uncertainty, legal responsibility and physical work in unstructured environments.",
        "There's a unequal empowerment effect: whoever was already good becomes absurdly more productive; whoever is starting may lose the entry rung that used to exist. That's a serious training problem, not a tech fairy tale.",
        "The more useful question isn't 'does my job disappear?', but 'which part of my work is repeatable enough to be automated?'. That part goes. The rest — taste, context, ethics, relationships — becomes more valuable, not less.",
        "Curiosity, here, is a competitive advantage: those who understand the tools choose what to delegate. Those who don't have decisions made by those who do.",
      ],
    },
    related: ["como-llms-pensam", "efeito-dunning-kruger"],
    keywords: ["emprego", "jobs", "trabalho", "work", "substituir", "replace", "futuro do trabalho"],
  },
  {
    slug: "problema-dificil-consciencia",
    category: "philosophy",
    minutes: 5,
    title: { pt: "O problema difícil: por que você sente algo", en: "The hard problem: why you feel anything at all" },
    excerpt: {
      pt: "Ciência explica funções brilhantemente. O que ela não explica é por que existe uma experiência por trás delas.",
      en: "Science explains functions brilliantly. What it doesn't explain is why there's an experience behind them.",
    },
    body: {
      pt: [
        "Você pode descrever toda a física do cérebro: neurônios disparando, neurotransmissores, redes sincronizando. Ainda assim, falta a parte mais óbvia — por que isso tudo vem acompanhado de uma experiência? Vermelho, dor, a sensação de ouvir uma música.",
        "Esse é o problema difícil da consciência. Problemas fáceis (relativos) incluem como o cérebro processa estímulos, memória e atenção. O difícil é o salto de 'processamento' para 'sentir'. Nenhuma teoria conhecida faz esse salto sem assumir algo extra.",
        "Há propostas sérias: que consciência é informação integrada (IIT), que vem de processos repetitivos no córtex (GNW), que é uma propriedade básica da matéria como massa ou carga (panpsiquismo). Todas são coerentes. Nenhuma é consenso.",
        "O ceticismo metodológico também está na mesa: talvez 'explicar a consciência' seja como uma форме de vida tentar entender a própria forma. A pergunta pode ser boa demais para a nossa arquitetura cognitiva.",
        "Enquanto isso, uma certeza prática: tudo o que você já amou, sofreu ou entendeu aconteceu dentro desse fenômeno estranho. Não subestime só porque não cabe numa equação.",
      ],
      en: [
        "You can describe all the physics of the brain: neurons firing, neurotransmitters, networks synchronizing. Still missing the most obvious part — why does all this come with an experience? Red, pain, the feeling of hearing a song.",
        "That's the hard problem of consciousness. 'Easier' (relatively) problems include how the brain processes stimuli, memory and attention. The hard one is the leap from 'processing' to 'feeling'. No known theory makes that leap without assuming something extra.",
        "There are serious proposals: consciousness as integrated information (IIT), emerging from repetitive cortical processes (GNW), or a basic property of matter like mass or charge (panpsychism). All are coherent. None is consensus.",
        "Methodological skepticism is also on the table: maybe 'explaining consciousness' is like a life form trying to understand its own shape. The question may be too good for our cognitive architecture.",
        "Meanwhile, one practical certainty: everything you've ever loved, suffered or understood happened inside this strange phenomenon. Don't underestimate it just because it doesn't fit in an equation.",
      ],
    },
    related: ["livre-arbitrio", "simulacao", "como-llms-pensam"],
    keywords: ["consciência", "conscience", "consciencia", "consciousness", "mente", "mind", "qualia", "hard problem"],
  },
  {
    slug: "livre-arbitrio",
    category: "philosophy",
    minutes: 4,
    title: { pt: "Livre-arbítrio: existe ou é marketing?", en: "Free will: does it exist or is it marketing?" },
    excerpt: {
      pt: "Talvez a pergunta esteja mal feita. E talvez isso importe mais do que a resposta.",
      en: "Maybe the question is badly formed. And maybe that matters more than the answer.",
    },
    body: {
      pt: [
        "O argumento contra é velho e sério: todo evento tem causa, seu cérebro é um evento físico, logo suas decisões também. Nesse filme, a sensação de escolher é o narrador, não o diretor.",
        "O argumento a favor é igualmente velho e sério: ninguém consegue viver como se não escolhesse. Você deliberou até ler esta frase. Negar a escolha na prática é impossível — o ceticismo só funciona no papel.",
        "Uma saída elegante é separar 'livre de causa' de 'livre de coerção'. Suas decisões têm causas, sim — mas se ninguém te obrigou, se vieram dos seus valores e raciocínios, chamamos isso de liberdade e é o que a lei e a moralidade precisam.",
        "Outra saída: livre-arbítrio pode não ser um item no mundo, e sim uma descrição de sistemas complexos suficientes para se contradizer, mudar de ideia e resistir a previsões. Não é misterioso; é complicado.",
        "Se a resposta ainda te incomoda, ótimo: incomodo intelectual é sinal de que a pergunta não era boba.",
      ],
      en: [
        "The argument against is old and serious: every event has a cause, your brain is a physical event, so your decisions are too. In that movie, the feeling of choosing is the narrator, not the director.",
        "The argument for is equally old and serious: nobody can live as if they don't choose. You deliberated until you read this sentence. Denying choice in practice is impossible — skepticism only works on paper.",
        "An elegant way out is separating 'free of cause' from 'free of coercion'. Your decisions do have causes — but if nobody forced you, if they came from your values and reasoning, we call that freedom, and it's what law and morality need.",
        "Another way out: free will may not be an item in the world, but a description of complex systems complex enough to contradict themselves, change their minds and resist predictions. It's not mysterious; it's complicated.",
        "If the answer still bothers you, good: intellectual discomfort is a sign the question wasn't silly.",
      ],
    },
    related: ["problema-dificil-consciencia", "tempo", "simulacao"],
    keywords: ["livre arbítrio", "free will", "escolha", "determinismo", "determinism"],
  },
  {
    slug: "origem-da-vida",
    category: "science",
    minutes: 4,
    title: { pt: "Como a vida começou (e por que ainda não fechamos o processo)", en: "How life began (and why the case isn't closed)" },
    excerpt: {
      pt: "Temos quase tudo montado: energia, água, moléculas e tempo. Falta o vídeo do momento em que a química virou biologia.",
      en: "We have almost everything assembled: energy, water, molecules and time. Missing: the video of the moment chemistry turned into biology.",
    },
    body: {
      pt: [
        "A Terra primitiva tinha energia de sobra: raios, vulcões, luz ultravioleta e hidrotermal. A química orgânica forma sozinha nessas condições — aminoácidos e bases de nucleotídeos aparecem até em meteoritos.",
        "O pulo difícil é a informação. Vida precisa de moléculas que guardam instruções e que se copiam com erro suficiente para evoluir. RNA é o candidato favorito: guarda informação e também reage quimicamente, meio enzima meio arquivo.",
        "Há um detalhe elegante: a vida não precisa de um começo perfeito, precisa de um começo que se sustente. Sistemas que se replicam roubam energia e matéria dos ambientes, e a seleção natural faz o resto sem nenhum planejamento.",
        "Alguns pesquisadores defendem que a vida não começou na Terra, mas chegou de fora em cometas — a panspermia. Mesmo se for verdade, apenas empurra a pergunta uma casa para trás.",
        "O que temos é uma linha do tempo sólida: química antes de biologia, vida simples antes de células com núcleo, e cérebros capazes de perguntar sobre o próprio começo. A espécie que faz essa pergunta é prova de que o processo funcionou.",
      ],
      en: [
        "The early Earth had energy to spare: lightning, volcanoes, ultraviolet light and hydrothermal vents. Organic chemistry forms on its own under these conditions — amino acids and nucleotide bases even show up in meteorites.",
        "The hard leap is information. Life needs molecules that store instructions and that copy themselves with enough error to evolve. RNA is the favorite candidate: it stores information and also reacts chemically, half enzyme half archive.",
        "There's an elegant detail: life doesn't need a perfect start, it needs a start that sustains itself. Systems that replicate steal energy and matter from their environments, and natural selection does the rest with no planning at all.",
        "Some researchers argue life didn't start on Earth but arrived from outside on comets — panspermia. Even if true, it only pushes the question one house back.",
        "What we have is a solid timeline: chemistry before biology, simple life before nucleated cells, and brains capable of asking about their own beginning. The species that asks the question is proof the process worked.",
      ],
    },
    related: ["entropia", "exoplanetas", "problema-dificil-consciencia"],
    keywords: ["vida", "life", "origem", "origin", "rna", "abiogênese", "panspermia"],
  },
  {
    slug: "exoplanetas",
    category: "space",
    minutes: 3,
    title: { pt: "Exoplanetas: o mapa que descobrimos sem sair de casa", en: "Exoplanets: the map we found without leaving home" },
    excerpt: {
      pt: "Mais de 5 mil mundos confirmados — e quase nenhum parece com o Solar. Estatisticamente, a Terra é comum; estar aqui, não.",
      en: "Over 5,000 confirmed worlds — and almost none look like our Solar System. Statistically, Earth is common; being here, not so much.",
    },
    body: {
      pt: [
        "Não vemos planetas direto: vemos o efeito deles. Quando um planeta passa na frente da sua estrela, o brilho cai um pouquinho. Essa 'microlente' de luz bastou para revelar milhares de mundos.",
        "O que descobrimos é desconfortável para o nosso ego: o Sistema Solar é irregular. Não existem Júpiteres gigantes em órbitas fechadas aqui, mas existem em muitos outros lugares — e isso muda como os sistemas se formam.",
        "Existem planetas na zona habitável, onde água pode ficar líquida. Existe vulcanismo, atmosfera, potencial. Ainda não temos uma assinatura inequívoca de vida — e é justamente essa humildade que torna a busca séria.",
        "A próxima geração de telescópios fará espectroscopia de atmosfera: se algum dia acharmos oxigênio em excesso e metano junto, alguém vai ter que explicar por que a química está fora de equilíbrio por lá.",
        "Enquanto isso, cada noite limpa continua sendo uma consulta gratuita a um banco de dados de 10 bilhões de anos.",
      ],
      en: [
        "We don't see planets directly: we see their effect. When a planet passes in front of its star, brightness dips a little. That 'microlensing' of light was enough to reveal thousands of worlds.",
        "What we found is uncomfortable for our ego: the Solar System is irregular. There are no giant Jupiters on tight orbits here, but there are in many other places — and that changes how systems form.",
        "There are planets in the habitable zone, where water can stay liquid. There's volcanism, atmosphere, potential. We still have no unequivocal signature of life — and that humility is exactly what makes the search serious.",
        "The next generation of telescopes will do atmospheric spectroscopy: if we ever find excess oxygen together with methane, someone will have to explain why the chemistry is out of balance over there.",
        "Meanwhile, every clear night remains a free consultation with a 10-billion-year-old database.",
      ],
    },
    related: ["buracos-negros", "origem-da-vida", "simulacao"],
    keywords: ["exoplaneta", "exoplanet", "planeta", "planet", "telescópio", "kepler", "zona habitável"],
  },
  {
    slug: "simulacao",
    category: "philosophy",
    minutes: 4,
    title: { pt: "Estamos numa simulação? (a aposta seria estranha)", en: "Are we in a simulation? (the bet would be strange)" },
    excerpt: {
      pt: "O argumento é fascinante e fraco ao mesmo tempo — o que torna ele ótimo para treinar pensamento crítico.",
      en: "The argument is fascinating and weak at the same time — which makes it great for training critical thinking.",
    },
    body: {
      pt: [
        "A versão mais famosa diz: civilizações avançadas rodariam simulações ancestrais por curiosidade; se rodarem muitas, os simulados superam em número os reais; logo, provavelmente estamos entre os simulados. É um silogismo elegante.",
        "O furo está nas premissas, não na lógica. Simular um universo inteiro pode ser fisicamente impossível — inclusive porque um universo simulado precisaria conter as próprias regras de computação que o geram.",
        "Também há o problema da regressão: quem simula a simulação? Se a resposta é 'outra simulação', a cadeia precisa começar em algum lugar — e aí voltamos ao mesmo tipo de pergunta que existia antes do argumento.",
        "Filosoficamente, a hipótese é difícil de distinguir de alternativas que não mudam nada na prática. Se nada observável difere, 'simulação' vira uma etiqueta metafísica, não uma descoberta científica.",
        "Seu valor real é outro: treinar o músculo de perguntar 'que evidência mudaria minha mente?'. Perguntas boas às vezes valem mais que respostas.",
      ],
      en: [
        "The most famous version says: advanced civilizations would run ancestral simulations out of curiosity; if they run many, the simulated outnumber the real ones; therefore we're probably among the simulated. It's an elegant syllogism.",
        "The flaw is in the premises, not the logic. Simulating an entire universe may be physically impossible — including because a simulated universe would need to contain the very computation rules that generate it.",
        "There's also the regression problem: who simulates the simulation? If the answer is 'another simulation', the chain must start somewhere — and we're back to the same kind of question that existed before the argument.",
        "Philosophically, the hypothesis is hard to distinguish from alternatives that change nothing in practice. If nothing observable differs, 'simulation' becomes a metaphysical label, not a scientific discovery.",
        "Its real value is different: training the muscle of asking 'what evidence would change my mind?'. Good questions are sometimes worth more than answers.",
      ],
    },
    related: ["como-llms-pensam", "livre-arbitrio", "problema-dificil-consciencia"],
    keywords: ["simulação", "simulation", "matrix", "hipótese", "bostrom"],
  },
  {
    slug: "efeito-dunning-kruger",
    category: "mind",
    minutes: 4,
    title: { pt: "Efeito Dunning-Kruger: o mapa da própria ignorância", en: "Dunning-Kruger: the map of your own ignorance" },
    excerpt: {
      pt: "Quem sabe pouco superestima o que sabe; quem sabe muito subestima. E os dois casos têm a mesma cura.",
      en: "Those who know little overestimate what they know; those who know a lot underestimate. Both cases have the same cure.",
    },
    body: {
      pt: [
        "O achado básico: para avaliar se você acerta, você precisa da mesma competência usada para acertar. Sem ela, o erro passa despercebido — e a confiança sobe justamente onde deveria descer.",
        "Isso não é uma lei da natureza sobre burros e gênios. É um viés de autoavaliação que aparece em qualquer domínio novo: idiomas, finanças, programação, esporte. E a curva melhora com prática e feedback real.",
        "A saída não é humildade decorativa. É medir: escreva sua previsão, compare com o resultado, anote a diferença. Sem registro, a memória reescreve a história a seu favor — ela é uma excelente advogada defensora.",
        "Curiosidade é o antídoto estrutural. Quem está genuinamente interessado pergunta mais, recebe mais correção e acumula calibração. Quem quer só parecer informado evita perguntas 'básicas' e perpetua o erro.",
        "Sinal prático: se um assunto parece óbvio demais, provavelmente você ainda não chegou perto o suficiente para ver a complicação.",
      ],
      en: [
        "The basic finding: to evaluate whether you're right, you need the same competence used to be right. Without it, the error goes unnoticed — and confidence rises exactly where it should fall.",
        "This isn't a law of nature about fools and geniuses. It's a self-assessment bias that shows up in any new domain: languages, finance, programming, sports. And the curve improves with practice and real feedback.",
        "The way out isn't decorative humility. It's measurement: write your prediction, compare with the result, note the difference. Without records, memory rewrites history in your favor — it's an excellent defense lawyer.",
        "Curiosity is the structural antidote. Someone genuinely interested asks more, receives more correction and accumulates calibration. Someone who only wants to sound informed avoids 'basic' questions and perpetuates the error.",
        "Practical sign: if a subject seems too obvious, you probably haven't gotten close enough yet to see the complication.",
      ],
    },
    related: ["ia-e-trabalho", "como-llms-pensam", "livre-arbitrio"],
    keywords: ["dunning", "kruger", "viés", "bias", "autoconhecimento", "confiança", "ignorância"],
  },
];

export const topicsBySlug: Record<string, Topic> = Object.fromEntries(
  topics.map((t) => [t.slug, t]),
);

export const feedCards: FeedCard[] = topics.map((t) => ({
  id: t.slug,
  slug: t.slug,
  category: t.category,
  title: t.title,
  excerpt: t.excerpt,
}));

export const categories = ["space", "science", "ai", "philosophy", "mind"] as const;

/** Perguntas rotativas do dia (7 por idioma). */
export const dailyQuestions: Record<"pt" | "en", string[]> = {
  pt: [
    "Se o universo tem idade, o que existia 'antes' — e 'antes' sequer faz sentido?",
    "Por que lembrar dói e esquecer alivia, se ambos são mecanismos de sobrevivência?",
    "Se uma IA convencer você de algo, quem teve a ideia?",
    "O que faria você mudar de opinião sobre a sua maior certeza?",
    "Se o tempo é flexível, existe 'agora' universal?",
    "É possível medir o quanto você entendeu algo sem testar na prática?",
    "Por que a vida insiste em se organizar num universo que tende ao desordenado?",
  ],
  en: [
    "If the universe has an age, what existed 'before' — and does 'before' even make sense?",
    "Why does remembering hurt and forgetting relieve, if both are survival mechanisms?",
    "If an AI convinces you of something, who had the idea?",
    "What would make you change your mind about your biggest certainty?",
    "If time is flexible, is there a universal 'now'?",
    "Is it possible to measure how well you understood something without testing it in practice?",
    "Why does life insist on organizing itself in a universe that tends toward disorder?",
  ],
};

/** Fatos rotativos do dia. */
export const dailyFacts: Record<"pt" | "en", { text: string; slug?: string }[]> = {
  pt: [
    {
      text: "Você está mais próximo de estrelas do que do outro lado da Terra: a maior parte da matéria visível está em galáxias distantes.",
      slug: "exoplanetas",
    },
    {
      text: "Um dia em Marte dura cerca de 24h39 — então, tecnicamente, seu relógio é alienígena.",
      slug: "exoplanetas",
    },
    {
      text: "A entropia do universo só aumenta; por isso existe 'antes' e 'depois'.",
      slug: "entropia",
    },
    {
      text: "A primeira imagem de um buraco negro levou 5 petabytes de dados para ser montada — cabe em um HD de 5 TB.",
      slug: "buracos-negros",
    },
    {
      text: "Seu cérebro consome cerca de 20% da energia do corpo com ~2% do peso.",
      slug: "problema-dificil-consciencia",
    },
    {
      text: "Um LLM não consulta a internet quando responde: ele recria padrões aprendidos no treino.",
      slug: "como-llms-pensam",
    },
    {
      text: "A luz do Sol leva ~8 minutos para chegar aqui — você sempre olha para o passado do Sol.",
      slug: "tempo",
    },
  ],
  en: [
    {
      text: "You're closer to stars than to the other side of Earth: most visible matter lives in distant galaxies.",
      slug: "exoplanetas",
    },
    {
      text: "A day on Mars lasts about 24h39 — so technically, your clock is alien.",
      slug: "exoplanetas",
    },
    {
      text: "The entropy of the universe only increases; that's why there's a 'before' and an 'after'.",
      slug: "entropia",
    },
    {
      text: "The first black hole image took 5 petabytes of data to assemble — it fits on a 5 TB drive.",
      slug: "buracos-negros",
    },
    {
      text: "Your brain uses about 20% of the body's energy with ~2% of its weight.",
      slug: "problema-dificil-consciencia",
    },
    {
      text: "An LLM doesn't browse the internet when answering: it re-creates patterns learned in training.",
      slug: "como-llms-pensam",
    },
    {
      text: "Sunlight takes ~8 minutes to get here — you always look at the Sun's past.",
      slug: "tempo",
    },
  ],
};

export const categoryLabel: Record<string, "explore.filter.space" | "explore.filter.science" | "explore.filter.ai" | "explore.filter.philosophy" | "explore.filter.mind"> = {
  space: "explore.filter.space",
  science: "explore.filter.science",
  ai: "explore.filter.ai",
  philosophy: "explore.filter.philosophy",
  mind: "explore.filter.mind",
};
