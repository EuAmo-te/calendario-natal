const adventData = [
    {
        day: 1,
        type: "audio",
        title: "Bem-vinda, meu amor! 🎧",
        content: "audio_day1", 
        text: "Ouve a minha voz... ❤️"
    },
    {
        day: 2,
        type: "teaser",
        title: "Pista #1 🕵️‍♀️",
        content: "A primeira surpresa não é digital...",
        subtext: "Dica: Prepara-te para o dia 6. As primeiras petalas estão a chegar."
    },
    {
        day: 3,
        type: "scratch",
        title: "Raspadinha do Amor ✨",
        secret: "Um chocolate quente ou um jantar ! 🍫🍝",
        overlayColor: "#CAC1FE"
    },
    {
        day: 4,
        type: "chat",
        title: "Mensagem Recebida 💬",
        messages: [
            { sender: "me", text: "Olá minha princesa! 👋" },
            { sender: "me", text: "Sabias que..." },
            { sender: "me", text: "O teu sorriso ilumina os meus dias? ☀️" },
            { sender: "me", text: "Eu amo-te! ❤️" }
        ]
    },
    {
        day: 5,
        type: "envelope",
        title: "Uma Carta para Ti 💌",
        image: "image1", 
        text: "Abre para veres uma surpresa...",
        messageInside: "Obrigado por todos os momentos que partilhamos, obrigado por tudo meu amor. Eu amo-te! ❤️"
    },
    {
        day: 6,
        type: "gift",
        title: "Presente Real 🎁",
        text: "Tenho uma rosa para ti 🌹. Mas ela precisa de água e do teu sorriso. Temos de nos ver hoje para eu ta dar! Se não, ela morre..."
    },
    {
        day: 7,
        type: "memory",
        title: "Memory do Amor 🧠",
        text: "Encontra os pares para ganhar um beijinho! 😘"
    },
    {
        day: 8,
        type: "hold",
        title: "Sente o meu coração 💓",
        text: "Mantém o botão pressionado...",
        secret: "O meu coração só bate por ti 💓"
    },
    {
        day: 9,
        type: "teaser",
        title: "Pista #2 🕵️‍♀️",
        content: "O próximo presente é doce como tu...",
        subtext: "Dica: Aguarda pelo dia 13 !"
    },
    {
        day: 10,
        type: "scratch",
        title: "Raspadinha Surpresa 🍀",
        text: "Raspa para descobrir o teu prémio!",
        secret: "Tens direito a uma massagem o tempo que quiseres ! 💆‍♀️",
        overlayColor: "#FFB7B2"
    },
    {
        day: 11,
        type: "reasons",
        title: "Por que te amo? ❤️",
        text: "Clica no coração para descobrir...",
        reasons: [
            "O teu sorriso ilumina meus dias",
            "A tua voz acalma-me sempre",
            "Os teus olhos brilhantes",
            "O teu sorriso radiante",
            "O teu abraço é minha casa",
            "És o meu tudo",
            "Obrigado por seres tu",
            "Eu amo tudo em ti ❤️"
        ]
    },
    {
        day: 12,
        type: "coupon",
        title: "Golden Ticket 🎫",
        text: "Este ticket é único e especial...",
        ticketText: "Podes pedir o que quiseres quando quiseres !"
    },
    {
        day: 13,
        type: "gift",
        title: "Presente Físico 🎁",
        text: "Hoje tenho algo para dar-te e algo fisico !! Onde estás ? Preciso de um abraço e de te entregar isto !"
    },
    {
        day: 14,
        type: "audio",
        title: "Minha para sempre ❤️",
        content: "audio14", 
        text: "Shhh... ouve com atenção."
    },
    {
        day: 15,
        type: "challenge",
        title: "Desafio Relâmpago ⚡",
        text: "Tira uma selfie AGORA com o teu melhor sorriso e manda-me! (eu juro que isso não é algo mais para mim que para ti) 📸"
    },
    {
        day: 16,
        type: "teaser",
        title: "Pista #3 🕵️‍♀️",
        content: "Ultima rosa antes do Natal...",
        subtext: "Dica: Dia 20, a penúltima rosa está a caminho, e eu para aproveitar um momento com o amor da minha vida ❤️"
    },
    {
        day: 17,
        type: "stars",
        title: "Pede um desejo 🌠",
        text: "Olha para as estrelas a cair... O meu desejo já se realizou: és tu."
    },
    {
        day: 18,
        type: "chat",
        title: "Conversa de hoje 💭",
        messages: [
            { sender: "me", text: "Toc toc..." },
            { sender: "me", text: "Quem é?" },
            { sender: "me", text: "O amor da tua vida!" },
            { sender: "me", text: "A trazer-te beijinhos! 😘" }
        ]
    },
    {
        day: 19,
        type: "scratch",
        title: "Sorte ou Amor? 🍀",
        secret: "Um beijo de paixão  ! ",
        overlayColor: "#FFB7B2"
    },
    {
        day: 20,
        type: "gift",
        title: "Nós dois e uma rosa ❤️",
        text: "Não preciso de luxo, só de ti. E a ultima rosa e para ti."
    },
    {
        day: 21,
        type: "image",
        title: "O nosso amor e uma arte 🎨",
        image: "image2",
        text: "Todos os dias contigo são momentos especiais."
    },
    {
        day: 22,
        type: "tap",
        title: "3 Toques Mágicos ✨",
        text: "Toca 3 vezes no coração para abrir.",
        secret: "Eu amo-te eu amo-te eu amo-te ! ❤️"
    },
    {
        day: 23,
        type: "text",
        title: "Minha princesa 👑",
        text: "Falta pouco para o Natal. Mas tu és o meu presente todos os dias."
    },
    {
        day: 24,
        type: "poem",
        title: "Para Sempre ❤️",
        text: "Lê com o coração...",
        poem: "Neste Natal, o meu presente és tu.\nCada dia contigo é uma página de ouro.\nO meu amor por ti não tem fim.\n\n(apenas exemplo)"
    },
    {
        day: 25,
        type: "final",
        title: "FELIZ NATAL! ❤️🎁",
        image: "final_gift",
        text: "O ramo está completo. O meu coração é teu. Olha para o QR Code...",
        qr: "qrcode_final"
    }
];
