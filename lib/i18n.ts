// The copy of the landing page and the terms, in English and in Brazilian
// Portuguese. The docs are in English only for now. / is English and /pt-br/
// is Portuguese; the Worker (worker/index.ts) sends a first visit from a
// Portuguese-speaking country to /pt-br/, and a choice in the language switch
// (the cookie `lang`) wins over the country.

export type Locale = 'en' | 'pt-br';

export const locales: Locale[] = ['en', 'pt-br'];

// The home page of each locale.
export const home: Record<Locale, string> = { en: '/', 'pt-br': '/pt-br/' };

// The terms page of each locale.
export const terms: Record<Locale, string> = { en: '/terms/', 'pt-br': '/pt-br/terms/' };

// The blog index of each locale; a post is <blog>/<slug>/.
export const blogHome: Record<Locale, string> = { en: '/blog/', 'pt-br': '/pt-br/blog/' };

// The value of the lang attribute and of Open Graph locale.
export const htmlLang: Record<Locale, string> = { en: 'en', 'pt-br': 'pt-BR' };

export const ogLocale: Record<Locale, string> = { en: 'en_US', 'pt-br': 'pt_BR' };

type InboxCopy = {
  all: string;
  unread: string;
  folders: string;
  folder: Record<'concepts' | 'sdks' | 'guides' | 'product', string>;
  posts: (n: number) => string;
  allRead: string;
  to: string;
  search: string;
  searchHint: string;
  noResults: (q: string) => string;
  move: string;
  open: string;
  close: string;
  copyLink: string;
  copied: string;
  fullScreen: string;
  exitFullScreen: string;
  reply: string;
  replyText: string;
  start: string;
  toLight: string;
  toDark: string;
};

type Row = { eyebrow: string; title: string; text: string };

type Copy = {
  meta: { title: string; description: string };
  nav: { docs: string; api: string; sdks: string; pricing: string; signIn: string; home: string; openMenu: string; closeMenu: string };
  hero: {
    badge: string;
    pill: string;
    titleA: string;
    titleB: string;
    text: string;
    start: string;
    quickstart: string;
    note: string;
    stats: { value: string; label: string }[];
  };
  why: {
    eyebrow: string;
    title: string;
    text: string;
    rows: [Row, Row, Row, Row];
    relay: { title: string; note: string; hops: string[] };
    ours: { title: string; note: string; hops: string[] };
    checks: { left: string; right: string }[];
    journey: { status: string; text: string }[];
    retries: { left: string; right: string }[];
  };
  send: { eyebrow: string; title: string; text: string; link: string; response: string };
  runtimes: { eyebrow: string; title: string; text: string; items: { name: string; how: string; text: string }[]; note: string };
  pricing: {
    title: string;
    free: { name: string; price: string; note: string; items: string[]; cta: string };
    pack: { name: string; price: string; note: string; items: string[]; cta: string };
  };
  cta: { eyebrow: string; title: string; text: string; key: string; quickstart: string };
  footer: { about: string; product: string; docs: string; sdks: string; links: Record<string, string> };
  language: { label: string; other: string; short: string };
  blog: { nav: string; eyebrow: string; title: string; headline: string; description: string; read: string; back: string; by: string; inbox: InboxCopy };
  terms: { title: string; description: string; questions: string; sections: { title: string; text: string }[] };
};

const en: Copy = {
  meta: {
    title: '1billion: transactional e-mail on its own servers',
    description:
      'Transactional e-mail on our own servers. Send login codes and receipts with one API call, and follow each mail to delivery. Free forever: 100 mails a day.',
  },
  nav: {
    docs: 'Docs',
    api: 'API',
    sdks: 'SDKs',
    pricing: 'Pricing',
    signIn: 'Sign in',
    home: '1billion home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    badge: 'New',
    pill: 'SDKs for Ruby, Node.js and Go are out',
    titleA: 'The mail your users wait for.',
    titleB: 'In the inbox.',
    text: 'Login codes, receipts and reset links with one API call. We run the sending servers, sign each domain with DKIM, and you follow every mail from accepted to delivered.',
    start: 'Start free',
    quickstart: 'Read the quickstart',
    note: 'Free forever: 100,000 credits every day, enough for 100 mails. No card needed.',
    stats: [
      { value: '100k', label: 'free credits every day' },
      { value: '50', label: 'recipients per send' },
      { value: '30', label: 'days of history' },
    ],
  },
  why: {
    eyebrow: 'Why 1billion',
    title: 'Why 1billion?',
    text: 'Transactional mail is the mail a person waits for. It must arrive, fast, and you must know when it did not.',
    rows: [
      {
        eyebrow: 'Our own MTA',
        title: 'Your domain, our servers, no middleman',
        text: 'Some e-mail APIs hand your mail to another provider. We run the sending servers ourselves, and each domain signs with its own DKIM key, stored encrypted. You know who touched each mail: us.',
      },
      {
        eyebrow: 'Checks before the send',
        title: 'A bad address costs nothing',
        text: 'Before the API accepts a mail, it checks each recipient for free: the syntax, a domain that receives mail, no disposable inbox, no role address. The first one that fails gets a 422 with the reason, and nothing is sent or charged.',
      },
      {
        eyebrow: 'Follow every mail',
        title: 'One message for each recipient',
        text: 'A send to three people makes three messages, each with its status, its tries and the last answer of the remote server. Read it in the console or with one call, and let a signed webhook tell your app.',
      },
      {
        eyebrow: 'Safe retries',
        title: 'A retried job never sends twice',
        text: 'Send an Idempotency-Key, and the same key in 30 days returns the first answer. The SDKs try again only on a 503 or a network error, with the same key, so a timeout never turns into two login codes.',
      },
    ],
    relay: { title: 'A relay', note: 'your mail goes through a third party', hops: ['Your app', 'E-mail API', 'Another MTA', 'Inbox'] },
    ours: { title: '1billion', note: 'our MTA signs with your DKIM', hops: ['Your app', '1billion MTA', 'Inbox'] },
    checks: [
      { left: 'jane@gmail.com', right: 'deliverable · 0.9' },
      { left: 'jane@gmial.com', right: 'risky · did you mean gmail.com?' },
      { left: 'contact@acme.com', right: '422 · role address' },
      { left: 'x@mailinator.com', right: '422 · disposable inbox' },
    ],
    journey: [
      { status: 'accepted', text: 'the API answers 202 at once' },
      { status: 'queued', text: 'high priority goes first' },
      { status: 'sending', text: 'signed with DKIM, sent over SMTP' },
      { status: 'sent', text: 'the remote server took it · webhook delivered' },
    ],
    retries: [
      { left: 'POST /send  key=login-482913', right: '202 · accepted' },
      { left: 'timeout, try again  same key', right: '200 · the first answer' },
      { left: '503  service busy', right: 'retried, 3 tries in all' },
      { left: '422  bad recipient', right: 'not retried' },
    ],
  },
  send: {
    eyebrow: 'One API call',
    title: 'Send from your stack',
    text: 'The same login code, from Rails, Node.js, Go or cURL. High priority, so it goes before the other mail of your workspace.',
    link: 'See the SDKs',
    response: 'Response',
  },
  runtimes: {
    eyebrow: 'Runs where your code runs',
    title: 'From a Rails app to a Lambda',
    text: 'The SDKs need only the standard library of their language, and the API is plain HTTP and JSON.',
    items: [
      { name: 'Ruby and Rails', how: 'gem 1billion', text: 'A delivery method for ActionMailer, or the client in any Ruby 3.1+ app.' },
      { name: 'Node.js, Next.js, Bun', how: '@clowk/1billion', text: 'Node.js 22 or newer and Bun: a route, a server action, a job.' },
      { name: 'Go', how: 'github.com/clowk-in/1billion-go', text: 'One package, the standard library only. Go 1.24 or newer.' },
      { name: 'AWS Lambda', how: 'Node.js 22+ or Go', text: 'The same SDKs. Give the function a timeout longer than the retries, and an Idempotency-Key from the event.' },
      { name: 'Any language', how: 'HTTP + JSON', text: 'Rust, Python, PHP, Elixir: one POST /send with your API key. No SDK needed.' },
      { name: 'From a front end', how: 'through a function', text: 'React, Solid or a PWA on Cloudflare Pages: call your own function or route, and it calls 1billion. Your API key stays on the server.' },
    ],
    note: 'The SDK guides have the details for each runtime.',
  },
  pricing: {
    title: 'Start free. Pay only when you grow.',
    free: {
      name: 'Free forever',
      price: '$0',
      note: '100,000 credits every day, for good. They come back at midnight, and no card is needed.',
      items: ['100 mails a day, every day', 'Your first domain, with DKIM', 'Every API, webhook and SDK', 'Each message kept for 30 days'],
      cta: 'Start free',
    },
    pack: {
      name: '1 billion credits',
      price: 'R$ 59.99',
      note: 'One payment, in Brazilian reais. For the apps that send more than 100 mails a day.',
      items: ['Paid once, no monthly fee', 'The credits never expire', '5 mails a second', 'Buy as many packs as you need'],
      cta: 'Buy credits',
    },
  },
  cta: {
    eyebrow: 'Free forever',
    title: '100,000 credits. Every day. Free.',
    text: 'That is 100 mails a day, every day, with no trial that ends and no card. Make an account, add your domain, and send your first mail in five minutes.',
    key: 'Start free',
    quickstart: 'Read the quickstart',
  },
  footer: {
    about: 'Transactional e-mail on its own sending servers. A Clowk product.',
    product: 'Product',
    docs: 'Docs',
    sdks: 'SDKs',
    links: {
      quickstart: 'Quickstart',
      api: 'API reference',
      webhooks: 'Webhooks',
      domains: 'Domains and DNS',
      ruby: 'Ruby and Rails',
      js: 'Node.js and Bun',
      go: 'Go',
      console: 'Console',
      pricing: 'Pricing',
      terms: 'Terms',
    },
  },
  language: { label: 'Language', other: 'Português', short: 'EN' },
  blog: {
    nav: 'Blog',
    eyebrow: 'The 1billion blog',
    title: 'Blog',
    headline: 'Notes from the people who run the mail servers',
    description: 'Transactional e-mail, deliverability, and how we run our own mail servers, from the team behind 1billion.',
    read: 'Read the post',
    back: 'All posts',
    by: 'by',
    inbox: {
      all: 'Inbox',
      unread: 'Unread',
      folders: 'Folders',
      folder: { concepts: 'Concepts', sdks: 'SDKs', guides: 'Guides', product: 'Product' },
      posts: n => `${n} ${n === 1 ? 'post' : 'posts'}`,
      allRead: 'All caught up. No unread posts.',
      to: 'To: you',
      search: 'Search posts',
      searchHint: 'Search posts: msa, webhook, go, idempotency…',
      noResults: q => `No post has “${q}”. Try msa, webhook or rails.`,
      move: 'move',
      open: 'open',
      close: 'close',
      copyLink: 'Copy link',
      copied: 'Copied',
      fullScreen: 'Full screen',
      exitFullScreen: 'Exit full screen',
      reply: 'Re:',
      replyText: 'The first 100 mails of each day are free, every day. No card. Log in and send your first mail in a few minutes.',
      start: 'Start sending free',
      toLight: 'Switch to the light theme',
      toDark: 'Switch to the dark theme',
    },
  },
  terms: {
    title: 'Terms',
    description: 'The terms for the 1billion website, the service, and the SDKs.',
    questions: 'Questions: open an issue on',
    sections: [
      {
        title: 'The service',
        text: '1billion sends transactional e-mail for the apps of your workspace: login codes, receipts, password resets, alerts, and other mail that a person expects. The console and the API are at app.1billion.clowk.in and api.1billion.clowk.in.',
      },
      {
        title: 'Acceptable use',
        text: 'Send only mail that the recipient asked for or expects. No spam, no bought or rented lists, no phishing, no malware. The servers and their IP addresses are shared, so the sends of a workspace pause when its reputation falls, and a person reviews it. A workspace that breaks these rules is closed.',
      },
      {
        title: 'Your data',
        text: 'You own the mail you send and the addresses of your recipients. We keep each message for 30 days, so you can see what happened to it, and then we delete it. API keys are stored as a hash, and DKIM private keys are stored encrypted.',
      },
      {
        title: 'The SDKs',
        text: 'The Ruby, Go, and JavaScript SDKs are open source under the MIT License. The license file in each repository is the full and only license of that code.',
      },
      {
        title: 'This website',
        text: 'This website has the landing page and the documentation. It sets one cookie only when you pick a language, to keep your choice. It does not collect personal data. The search in the docs runs in your browser.',
      },
      {
        title: 'Names and marks',
        text: '1billion and Clowk are names of Clowk products. Do not use them in a way that suggests that Clowk made or approves a product that it did not make.',
      },
      { title: 'Changes', text: 'These terms can change. The current version is always on this page.' },
    ],
  },
};

const pt: Copy = {
  meta: {
    title: '1billion: e-mail transacional em servidores próprios',
    description:
      'E-mail transacional em servidores próprios. Envie códigos de login e recibos com uma chamada de API e acompanhe cada envio. Grátis para sempre: 100 por dia.',
  },
  nav: {
    docs: 'Docs',
    api: 'API',
    sdks: 'SDKs',
    pricing: 'Preços',
    signIn: 'Entrar',
    home: 'Início do 1billion',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
  },
  hero: {
    badge: 'Novo',
    pill: 'Saíram os SDKs para Ruby, Node.js e Go',
    titleA: 'O e-mail que seu usuário espera.',
    titleB: 'Na caixa de entrada.',
    text: 'Códigos de login, recibos e links de senha com uma chamada de API. Nós rodamos os servidores de envio, assinamos cada domínio com DKIM, e você acompanha cada e-mail de aceito a entregue.',
    start: 'Comece grátis',
    quickstart: 'Ver o guia rápido',
    note: 'Grátis para sempre: 100.000 créditos todo dia, o bastante para 100 e-mails. Sem cartão.',
    stats: [
      { value: '100 mil', label: 'créditos grátis todo dia' },
      { value: '50', label: 'destinatários por envio' },
      { value: '30', label: 'dias de histórico' },
    ],
  },
  why: {
    eyebrow: 'Por que o 1billion',
    title: 'Por que o 1billion?',
    text: 'E-mail transacional é o e-mail que a pessoa espera. Ele precisa chegar, rápido, e você precisa saber quando não chegou.',
    rows: [
      {
        eyebrow: 'MTA próprio',
        title: 'Seu domínio, nossos servidores, sem intermediário',
        text: 'Algumas APIs de e-mail repassam o seu e-mail para outro provedor. Nós rodamos os servidores de envio, e cada domínio assina com a sua própria chave DKIM, guardada criptografada. Você sabe quem tocou em cada e-mail: nós.',
      },
      {
        eyebrow: 'Checagens antes do envio',
        title: 'Endereço ruim não custa nada',
        text: 'Antes de aceitar um e-mail, a API checa cada destinatário de graça: a sintaxe, um domínio que recebe e-mail, nenhuma caixa descartável, nenhum endereço de função. O primeiro que falha recebe 422 com o motivo, e nada é enviado nem cobrado.',
      },
      {
        eyebrow: 'Acompanhe cada e-mail',
        title: 'Uma mensagem para cada destinatário',
        text: 'Um envio para três pessoas gera três mensagens, cada uma com o seu status, as suas tentativas e a última resposta do servidor remoto. Veja no console ou com uma chamada, e deixe um webhook assinado avisar o seu app.',
      },
      {
        eyebrow: 'Retentativas seguras',
        title: 'Um job repetido nunca envia duas vezes',
        text: 'Mande uma Idempotency-Key, e a mesma chave em 30 dias devolve a primeira resposta. Os SDKs só tentam de novo num 503 ou num erro de rede, com a mesma chave, então um timeout nunca vira dois códigos de login.',
      },
    ],
    relay: { title: 'Um relay', note: 'seu e-mail passa por um terceiro', hops: ['Seu app', 'API de e-mail', 'Outro MTA', 'Caixa de entrada'] },
    ours: { title: '1billion', note: 'nosso MTA assina com o seu DKIM', hops: ['Seu app', 'MTA do 1billion', 'Caixa de entrada'] },
    checks: [
      { left: 'jane@gmail.com', right: 'entregável · 0.9' },
      { left: 'jane@gmial.com', right: 'arriscado · quis dizer gmail.com?' },
      { left: 'contato@acme.com', right: '422 · endereço de função' },
      { left: 'x@mailinator.com', right: '422 · caixa descartável' },
    ],
    journey: [
      { status: 'accepted', text: 'a API responde 202 na hora' },
      { status: 'queued', text: 'a prioridade alta vai primeiro' },
      { status: 'sending', text: 'assinado com DKIM, enviado por SMTP' },
      { status: 'sent', text: 'o servidor remoto aceitou · webhook delivered' },
    ],
    retries: [
      { left: 'POST /send  key=login-482913', right: '202 · aceito' },
      { left: 'timeout, de novo  mesma chave', right: '200 · a primeira resposta' },
      { left: '503  serviço ocupado', right: 'repetido, 3 tentativas ao todo' },
      { left: '422  destinatário ruim', right: 'não é repetido' },
    ],
  },
  send: {
    eyebrow: 'Uma chamada de API',
    title: 'Envie da sua stack',
    text: 'O mesmo código de login, em Rails, Node.js, Go ou cURL. Prioridade alta, para ir antes dos outros e-mails do seu workspace.',
    link: 'Ver os SDKs',
    response: 'Resposta',
  },
  runtimes: {
    eyebrow: 'Roda onde o seu código roda',
    title: 'De um app Rails a uma Lambda',
    text: 'Os SDKs precisam só da biblioteca padrão da linguagem, e a API é HTTP e JSON simples.',
    items: [
      { name: 'Ruby e Rails', how: 'gem 1billion', text: 'Um delivery method para o ActionMailer, ou o client em qualquer app Ruby 3.1+.' },
      { name: 'Node.js, Next.js, Bun', how: '@clowk/1billion', text: 'Node.js 22 ou mais novo e Bun: uma rota, uma server action, um job.' },
      { name: 'Go', how: 'github.com/clowk-in/1billion-go', text: 'Um pacote, só a biblioteca padrão. Go 1.24 ou mais novo.' },
      { name: 'AWS Lambda', how: 'Node.js 22+ ou Go', text: 'Os mesmos SDKs. Dê à função um timeout maior que as retentativas, e uma Idempotency-Key vinda do evento.' },
      { name: 'Qualquer linguagem', how: 'HTTP + JSON', text: 'Rust, Python, PHP, Elixir: um POST /send com a sua chave de API. Sem SDK.' },
      { name: 'De um front-end', how: 'por uma função', text: 'React, Solid ou uma PWA no Cloudflare Pages: chame a sua função ou rota, e ela chama o 1billion. A chave de API fica no servidor.' },
    ],
    note: 'Os guias dos SDKs têm os detalhes de cada runtime.',
  },
  pricing: {
    title: 'Comece grátis. Pague só quando crescer.',
    free: {
      name: 'Grátis para sempre',
      price: 'R$ 0',
      note: '100.000 créditos todo dia, para sempre. Eles voltam à meia-noite, e não precisa de cartão.',
      items: ['100 e-mails por dia, todo dia', 'Seu primeiro domínio, com DKIM', 'Toda a API, webhooks e SDKs', 'Cada mensagem guardada por 30 dias'],
      cta: 'Comece grátis',
    },
    pack: {
      name: '1 bilhão de créditos',
      price: 'R$ 59,99',
      note: 'Pagamento único. Para os apps que enviam mais de 100 e-mails por dia.',
      items: ['Pago uma vez, sem mensalidade', 'Os créditos não vencem', '5 e-mails por segundo', 'Compre quantos pacotes precisar'],
      cta: 'Comprar créditos',
    },
  },
  cta: {
    eyebrow: 'Grátis para sempre',
    title: '100 mil créditos. Todo dia. Grátis.',
    text: 'São 100 e-mails por dia, todo dia, sem um teste que acaba e sem cartão. Crie uma conta, adicione o seu domínio, e envie o primeiro e-mail em cinco minutos.',
    key: 'Comece grátis',
    quickstart: 'Ver o guia rápido',
  },
  footer: {
    about: 'E-mail transacional em servidores de envio próprios. Um produto Clowk.',
    product: 'Produto',
    docs: 'Docs',
    sdks: 'SDKs',
    links: {
      quickstart: 'Guia rápido',
      api: 'Referência da API',
      webhooks: 'Webhooks',
      domains: 'Domínios e DNS',
      ruby: 'Ruby e Rails',
      js: 'Node.js e Bun',
      go: 'Go',
      console: 'Console',
      pricing: 'Preços',
      terms: 'Termos',
    },
  },
  language: { label: 'Idioma', other: 'English', short: 'PT' },
  blog: {
    nav: 'Blog',
    eyebrow: 'O blog do 1billion',
    title: 'Blog',
    // A non-breaking hyphen (U+2011): the line never breaks inside e-mail.
    headline: 'Notas de quem roda os servidores de e‑mail',
    description: 'E-mail transacional, entregabilidade, e como rodamos os nossos servidores de e-mail, pelo time do 1billion.',
    read: 'Ler o post',
    back: 'Todos os posts',
    by: 'por',
    inbox: {
      all: 'Caixa de entrada',
      unread: 'Não lidos',
      folders: 'Pastas',
      folder: { concepts: 'Conceitos', sdks: 'SDKs', guides: 'Guias', product: 'Produto' },
      posts: n => `${n} ${n === 1 ? 'post' : 'posts'}`,
      allRead: 'Tudo lido. Nenhum post novo.',
      to: 'Para: você',
      search: 'Buscar posts',
      searchHint: 'Buscar posts: msa, webhook, go, idempotência…',
      noResults: q => `Nenhum post tem “${q}”. Tente msa, webhook ou rails.`,
      move: 'mover',
      open: 'abrir',
      close: 'fechar',
      copyLink: 'Copiar link',
      copied: 'Copiado',
      fullScreen: 'Tela cheia',
      exitFullScreen: 'Sair da tela cheia',
      reply: 'Re:',
      replyText: 'Os primeiros 100 e-mails de cada dia são grátis, todo dia. Sem cartão. Entre e envie o seu primeiro e-mail em poucos minutos.',
      start: 'Comece a enviar grátis',
      toLight: 'Mudar para o tema claro',
      toDark: 'Mudar para o tema escuro',
    },
  },
  terms: {
    title: 'Termos',
    description: 'Os termos do site do 1billion, do serviço e dos SDKs.',
    questions: 'Dúvidas: abra uma issue no',
    sections: [
      {
        title: 'O serviço',
        text: 'O 1billion envia e-mail transacional para os apps do seu workspace: códigos de login, recibos, redefinição de senha, alertas e outros e-mails que a pessoa espera. O console e a API ficam em app.1billion.clowk.in e api.1billion.clowk.in.',
      },
      {
        title: 'Uso aceitável',
        text: 'Envie só e-mails que o destinatário pediu ou espera. Sem spam, sem listas compradas ou alugadas, sem phishing, sem malware. Os servidores e os seus IPs são compartilhados, então os envios de um workspace pausam quando a reputação dele cai, e uma pessoa revisa o caso. Um workspace que quebra essas regras é fechado.',
      },
      {
        title: 'Seus dados',
        text: 'Você é dono dos e-mails que envia e dos endereços dos seus destinatários. Guardamos cada mensagem por 30 dias, para você ver o que aconteceu com ela, e depois apagamos. As chaves de API são guardadas como hash, e as chaves privadas DKIM são guardadas criptografadas.',
      },
      {
        title: 'Os SDKs',
        text: 'Os SDKs de Ruby, Go e JavaScript são open source sob a licença MIT. O arquivo de licença de cada repositório é a licença completa e única daquele código.',
      },
      {
        title: 'Este site',
        text: 'Este site tem a landing page e a documentação. Ele grava um cookie só quando você escolhe um idioma, para lembrar a escolha. Ele não coleta dados pessoais. A busca dos docs roda no seu navegador.',
      },
      {
        title: 'Nomes e marcas',
        text: '1billion e Clowk são nomes de produtos da Clowk. Não use esses nomes de um jeito que sugira que a Clowk fez ou aprova um produto que ela não fez.',
      },
      { title: 'Mudanças', text: 'Estes termos podem mudar. A versão atual está sempre nesta página.' },
    ],
  },
};

export const copy: Record<Locale, Copy> = { en, 'pt-br': pt };
