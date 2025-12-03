// Main Logic
const grid = document.getElementById('calendar-grid');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-day-title');
const modalBody = document.getElementById('modal-body');
const closeDayBtn = document.getElementById('close-day-modal-btn');
const toast = document.getElementById('toast');

// Info Modal Elements
const infoModal = document.getElementById('info-modal');
const infoBtn = document.getElementById('info-btn');
const closeInfoBtn = document.getElementById('close-info-btn');
const startBtn = document.getElementById('start-btn');

// Helper to get Portugal Time
function getPortugalDate() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Lisbon',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    
    const parts = formatter.formatToParts(now);
    const month = parseInt(parts.find(p => p.type === 'month').value);
    const day = parseInt(parts.find(p => p.type === 'day').value);
    const year = parseInt(parts.find(p => p.type === 'year').value);

    return { day, month, year };
}

// Helper to get Icon based on type
function getIconForType(type) {
    switch (type) {
        case 'audio': return '🎧';
        case 'puzzle': return '🧩';
        case 'chat': return '💬';
        case 'scratch': return '✨';
        case 'video': return '🎥';
        case 'spotify': return '🎵';
        case 'teaser': return '🕵️‍♀️';
        case 'gift': return '🎁';
        case 'polaroid': return '📸';
        case 'image': return '🖼️';
        case 'hold': return '💓';
        case 'shake': return '📳';
        case 'final': return '🎄';
        default: return '❤️';
    }
}

// Initialize Calendar
function initCalendar() {
    // Show Info Modal on first visit
    if (!localStorage.getItem('seenInfo')) {
        infoModal.classList.remove('hidden');
    }

    const openedDays = JSON.parse(localStorage.getItem('openedDays')) || [];
    const ptDate = getPortugalDate();

    // DEBUG: Uncomment to test specific date
    // const ptDate = { day: 25, month: 12, year: 2025 }; 

    adventData.forEach(item => {
        const box = document.createElement('div');
        box.classList.add('day-box');
        
        // Create content structure
        const dayNum = document.createElement('span');
        dayNum.className = 'day-number';
        dayNum.textContent = item.day;
        
        const icon = document.createElement('span');
        icon.className = 'day-icon';
        icon.textContent = getIconForType(item.type);
        
        box.appendChild(dayNum);
        box.appendChild(icon);
        
        box.dataset.day = item.day;

        const isDecember = ptDate.month === 12;
        const isPastYear = ptDate.year > 2025;
        
        let isLocked = true;

        // --- LOCKING LOGIC ---
        if (isPastYear) {
            isLocked = false;
        } else if (isDecember && ptDate.day >= item.day) {
            isLocked = false;
        }
        // ------------------------------------------------

        if (isLocked) {
            box.classList.add('locked');
            box.title = "Ainda não é dia! 🤫";
        } else {
            if (openedDays.includes(item.day)) {
                box.classList.add('opened');
            }
        }

        box.addEventListener('click', () => handleBoxClick(item, box, isLocked));
        grid.appendChild(box);
    });
}

function showToast() {
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

function handleBoxClick(item, box, isLocked) {
    if (isLocked) {
        box.classList.add('shake');
        showToast(); // Show the "não não não" message
        setTimeout(() => box.classList.remove('shake'), 500);
        return;
    }

    // Open Modal
    modalTitle.textContent = item.title || `Dia ${item.day}`;
    modalBody.innerHTML = ''; // Clear previous content
    
    // Reset and set modal size based on content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.className = 'modal-content'; // Reset
    if (item.type === 'puzzle' || item.type === 'image' || item.type === 'polaroid') {
        modalContent.classList.add('modal-large');
    }
    
    // Render specific content type
    renderContent(item, modalBody);

    modal.classList.remove('hidden');

    if (!box.classList.contains('opened')) {
        box.classList.add('opened');
        saveOpenedDay(item.day);
    }
}

function saveOpenedDay(day) {
    const openedDays = JSON.parse(localStorage.getItem('openedDays')) || [];
    if (!openedDays.includes(day)) {
        openedDays.push(day);
        localStorage.setItem('openedDays', JSON.stringify(openedDays));
    }
}

// --- Content Renderers ---

function renderContent(item, container) {
    // Common text if available
    if (item.text) {
        const p = document.createElement('p');
        p.textContent = item.text;
        p.style.marginBottom = '15px';
        container.appendChild(p);
    }

    switch (item.type) {
        case 'audio':
            renderAudio(item, container);
            break;
        case 'chat':
            renderChat(item, container);
            break;
        case 'scratch':
            renderScratch(item, container);
            break;
        case 'envelope':
            renderEnvelope(item, container);
            break;
        case 'memory':
            renderMemory(item, container);
            break;
        case 'reasons':
            renderReasons(item, container);
            break;
        case 'coupon':
            renderCoupon(item, container);
            break;
        case 'poem':
            renderPoem(item, container);
            break;
        case 'puzzle':
            renderPuzzle(item, container);
            break;
        case 'polaroid':
        case 'image':
        case 'sticker':
        case 'final':
            renderImage(item, container);
            break;
        case 'video':
            renderVideo(item, container);
            break;
        case 'hold':
            renderHold(item, container);
            break;
        case 'shake':
        case 'tap':
            renderShake(item, container);
            break;
        case 'spotify':
            renderSpotify(item, container);
            break;
        case 'teaser':
            renderTeaser(item, container);
            break;
        case 'challenge':
        case 'stars':
            // Just text/animation handled by CSS or simple text
            if(item.type === 'stars') renderStars(container);
            break;
        default:
            // Default text is already added
            break;
    }
    
    // Special case for final QR
    if (item.qr) {
        const qrImg = document.createElement('img');
        qrImg.src = item.qr;
        qrImg.style.width = '150px';
        qrImg.style.marginTop = '20px';
        container.appendChild(qrImg);
    }
}

function renderAudio(item, container) {
    const div = document.createElement('div');
    div.className = 'audio-player-container';
    
    // Auto-detect path if not full path provided
    let audioSrc = item.content;
    if (!audioSrc.includes('/')) {
        // Assume it's just the filename or ID, try to construct path
        // If item.content is "audio1", make it "audios/audio1.mp3"
        audioSrc = `audios/${item.content}.mp3`;
    }
    
    const audio = document.createElement('audio');
    audio.controls = true; // Shows Play, Pause, Volume, Progress bar
    audio.src = audioSrc;
    audio.style.width = '100%';
    audio.style.borderRadius = '30px';
    
    div.appendChild(audio);
    container.appendChild(div);
}

function renderChat(item, container) {
    const chatBox = document.createElement('div');
    chatBox.className = 'chat-container';
    container.appendChild(chatBox);

    let delay = 500;
    item.messages.forEach(msg => {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${msg.sender === 'me' ? 'me' : 'them'}`;
            bubble.textContent = msg.text;
            chatBox.appendChild(bubble);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, delay);
        delay += 1500;
    });
}

function renderScratch(item, container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'scratch-container';
    
    const secretDiv = document.createElement('div');
    secretDiv.className = 'scratch-secret';
    secretDiv.textContent = item.secret;
    
    const canvas = document.createElement('canvas');
    canvas.className = 'scratch-canvas';
    canvas.width = 250;
    canvas.height = 150;
    
    wrapper.appendChild(secretDiv);
    wrapper.appendChild(canvas);
    container.appendChild(wrapper);

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = item.overlayColor || '#ccc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text "Raspa aqui"
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText("Raspa aqui! ✨", 70, 80);

    let isDrawing = false;

    function scratch(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
    }

    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        let clientX = e.clientX;
        let clientY = e.clientY;
        
        if(e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    canvas.addEventListener('mousedown', (e) => { isDrawing = true; const pos = getPos(e); scratch(pos.x, pos.y); });
    canvas.addEventListener('mousemove', (e) => { if (isDrawing) { const pos = getPos(e); scratch(pos.x, pos.y); } });
    canvas.addEventListener('mouseup', () => isDrawing = false);
    
    // Touch support
    canvas.addEventListener('touchstart', (e) => { isDrawing = true; const pos = getPos(e); scratch(pos.x, pos.y); e.preventDefault(); });
    canvas.addEventListener('touchmove', (e) => { if (isDrawing) { const pos = getPos(e); scratch(pos.x, pos.y); e.preventDefault(); } });
    canvas.addEventListener('touchend', () => isDrawing = false);
}

function renderPuzzle(item, container) {
    const puzzleBox = document.createElement('div');
    puzzleBox.className = 'puzzle-container';
    
    // Auto-detect path
    let imgSrc = item.image;
    // If no path (slash), assume it's in images/
    if (!imgSrc.includes('/')) {
        imgSrc = `images/${imgSrc}`;
    }
    // If no extension (dot), assume .jpg
    if (!imgSrc.includes('.')) {
        imgSrc += '.jpg';
    }
    
    // 3x3 Sliding Puzzle Logic
    const size = 3;
    const totalTiles = size * size;
    let tiles = []; // Array of tile objects
    
    // Initialize Tiles (0 to 8)
    for (let i = 0; i < totalTiles; i++) {
        tiles.push({
            correctIndex: i,
            isEmpty: i === totalTiles - 1 // Last one is empty
        });
    }

    let emptyPos = totalTiles - 1; // Start with empty at bottom-right

    // Create Game Container
    const gameArea = document.createElement('div');
    gameArea.className = 'puzzle-game';
    
    function updateView() {
        gameArea.innerHTML = '';
        tiles.forEach((tile, index) => {
            const div = document.createElement('div');
            div.className = 'puzzle-piece';
            
            if (tile.isEmpty) {
                div.className += ' empty';
            } else {
                div.style.backgroundImage = `url('${imgSrc}')`;
                // Calculate background position based on correctIndex
                const row = Math.floor(tile.correctIndex / size);
                const col = tile.correctIndex % size;
                div.style.backgroundPosition = `${col * 50}% ${row * 50}%`; 
            }
            
            div.onclick = () => handleMove(index);
            gameArea.appendChild(div);
        });
    }

    function handleMove(index) {
        // Check adjacency
        const row = Math.floor(index / size);
        const col = index % size;
        const emptyRow = Math.floor(emptyPos / size);
        const emptyCol = emptyPos % size;
        
        const isAdjacent = (Math.abs(row - emptyRow) + Math.abs(col - emptyCol)) === 1;
        
        if (isAdjacent) {
            // Swap in array
            [tiles[index], tiles[emptyPos]] = [tiles[emptyPos], tiles[index]];
            emptyPos = index; // Update empty position
            updateView();
            checkWin();
        }
    }

    function checkWin() {
        const isWin = tiles.every((tile, index) => tile.correctIndex === index);
        if (isWin) {
            setTimeout(() => {
                gameArea.innerHTML = '';
                const fullImg = document.createElement('img');
                fullImg.src = imgSrc;
                fullImg.style.width = '100%';
                fullImg.style.height = '100%';
                fullImg.style.objectFit = 'cover';
                fullImg.style.borderRadius = '10px';
                gameArea.appendChild(fullImg);
                
                // Confetti or message
                const msg = document.createElement('div');
                msg.textContent = "Parabéns! ❤️";
                msg.style.textAlign = "center";
                msg.style.fontSize = "1.5rem";
                msg.style.marginTop = "10px";
                msg.style.color = "#CAC1FE";
                container.appendChild(msg);
            }, 300);
        }
    }

    function shuffle() {
        // Simulate 100 random valid moves to ensure solvability
        for(let i=0; i<150; i++) {
            const neighbors = [];
            const row = Math.floor(emptyPos / size);
            const col = emptyPos % size;
            
            if(row > 0) neighbors.push(emptyPos - size); // Up
            if(row < size-1) neighbors.push(emptyPos + size); // Down
            if(col > 0) neighbors.push(emptyPos - 1); // Left
            if(col < size-1) neighbors.push(emptyPos + 1); // Right
            
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            
            // Swap
            [tiles[randomNeighbor], tiles[emptyPos]] = [tiles[emptyPos], tiles[randomNeighbor]];
            emptyPos = randomNeighbor;
        }
        updateView();
    }

    shuffle();
    container.appendChild(gameArea);
}

function renderImage(item, container) {
    const frame = document.createElement('div');
    frame.className = 'polaroid-frame';
    
    const img = document.createElement('img');
    
    // Auto-detect path
    let imgSrc = item.image;
    // If no path (slash), assume it's in images/
    if (!imgSrc.includes('/')) {
        imgSrc = `images/${imgSrc}`;
    }
    // If no extension (dot), assume .jpg
    if (!imgSrc.includes('.')) {
        imgSrc += '.jpg';
    }
    
    img.src = imgSrc;
    img.className = 'polaroid-img';
    
    frame.appendChild(img);
    
    if (item.caption) {
        const cap = document.createElement('div');
        cap.className = 'polaroid-caption';
        cap.textContent = item.caption;
        frame.appendChild(cap);
    }
    
    if (item.text) {
        const txt = document.createElement('p');
        txt.textContent = item.text;
        txt.style.marginTop = '15px';
        frame.appendChild(txt);
    }
    
    container.appendChild(frame);
}

function renderVideo(item, container) {
    const div = document.createElement('div');
    div.className = 'video-container';
    
    const vid = document.createElement('video');
    
    // Auto-detect path
    let vidSrc = item.video;
    if (!vidSrc.includes('/') && !vidSrc.includes('.')) {
        vidSrc = `videos/${item.video}.mp4`;
    }
    
    vid.src = vidSrc;
    vid.controls = true;
    vid.playsInline = true; // Important for mobile
    
    div.appendChild(vid);
    container.appendChild(div);
}

function renderEnvelope(item, container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'envelope-wrapper';
    
    const envelope = document.createElement('div');
    envelope.className = 'envelope';
    
    const flap = document.createElement('div');
    flap.className = 'envelope-flap';
    
    const pocket = document.createElement('div');
    pocket.className = 'envelope-pocket';
    
    const content = document.createElement('div');
    content.className = 'envelope-content';
    
    // Create Flip Card Structure
    const inner = document.createElement('div');
    inner.className = 'envelope-card-inner';
    
    const front = document.createElement('div');
    front.className = 'envelope-card-front';
    
    const back = document.createElement('div');
    back.className = 'envelope-card-back';
    
    // Image logic
    let imgSrc = item.image;
    if (!imgSrc.includes('/')) imgSrc = `images/${imgSrc}`;
    if (!imgSrc.includes('.')) imgSrc += '.jpg';
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.className = 'envelope-img';
    
    front.appendChild(img);
    
    // Message on Back
    if (item.messageInside) {
        const msg = document.createElement('p');
        msg.textContent = item.messageInside;
        back.appendChild(msg);
    } else {
        // Default message if none provided
        back.textContent = "❤️";
        back.style.fontSize = "3rem";
    }
    
    inner.appendChild(front);
    inner.appendChild(back);
    content.appendChild(inner);
    
    envelope.appendChild(content);
    envelope.appendChild(pocket);
    envelope.appendChild(flap);
    wrapper.appendChild(envelope);
    
    // Interaction
    let isOpen = false;
    wrapper.onclick = () => {
        if (!isOpen) {
            wrapper.classList.add('open');
            isOpen = true;
            // Update hint
            const hint = container.querySelector('.envelope-hint');
            if(hint) hint.textContent = "(Toca na foto para virar)";
        }
    };
    
    // Flip on click (only if open)
    content.onclick = (e) => {
        if (isOpen) {
            e.stopPropagation(); // Don't trigger wrapper click
            content.classList.toggle('flipped');
        }
    };
    
    container.appendChild(wrapper);
    
    // Instruction hint
    const hint = document.createElement('p');
    hint.className = 'envelope-hint';
    hint.textContent = "(Toca na carta para abrir)";
    hint.style.fontSize = "0.8rem";
    hint.style.opacity = "0.7";
    hint.style.marginTop = "10px";
    container.appendChild(hint);

    // HACK: Allow the photo to pop OUT of the modal box
    const modalContent = container.closest('.modal-content');
    if (modalContent) {
        modalContent.style.overflow = 'visible';
    }
}

function renderMemory(item, container) {
    const game = document.createElement('div');
    game.className = 'memory-game';
    
    // 18 pairs for 6x6 grid
    const icons = [
        '❤️', '🌹', '🎁', '💌', '💍', '🧸',
        '🍫', '🎵', '✨', '🌙', '☀️', '🌸',
        '🌺', '🌻', '🐶', '🐱', '🦄', '🌈'
    ];
    // Duplicate and shuffle
    let cards = [...icons, ...icons];
    cards.sort(() => 0.5 - Math.random());
    
    let flipped = [];
    let matched = [];
    
    cards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.icon = icon;
        card.dataset.index = index;
        
        const front = document.createElement('div');
        front.className = 'front';
        front.textContent = '?';
        
        const back = document.createElement('div');
        back.className = 'back';
        back.textContent = icon;
        
        card.appendChild(front);
        card.appendChild(back);
        
        card.onclick = () => {
            if (flipped.length < 2 && !flipped.includes(card) && !matched.includes(card)) {
                card.classList.add('flipped');
                flipped.push(card);
                
                if (flipped.length === 2) {
                    setTimeout(checkMatch, 800);
                }
            }
        };
        
        game.appendChild(card);
    });
    
    function checkMatch() {
        const [c1, c2] = flipped;
        if (c1.dataset.icon === c2.dataset.icon) {
            matched.push(c1, c2);
            c1.classList.add('matched');
            c2.classList.add('matched');
            if (matched.length === cards.length) {
                setTimeout(showKissReward, 500);
            }
        } else {
            c1.classList.remove('flipped');
            c2.classList.remove('flipped');
        }
        flipped = [];
    }
    
    container.appendChild(game);
}

function renderReasons(item, container) {
    const btn = document.createElement('button');
    btn.className = 'heart-btn';
    btn.textContent = '❤️';
    
    const display = document.createElement('div');
    display.className = 'reason-display';
    display.textContent = "Clica no coração...";
    
    let index = 0;
    btn.onclick = () => {
        // Pop animation
        btn.style.transform = 'scale(0.8)';
        setTimeout(() => btn.style.transform = 'scale(1)', 100);
        
        // Change text
        display.style.opacity = 0;
        setTimeout(() => {
            display.textContent = item.reasons[index];
            display.style.opacity = 1;
            index = (index + 1) % item.reasons.length;
        }, 200);
        
        // Confetti
        createConfetti(btn);
    };
    
    container.appendChild(display);
    container.appendChild(btn);
}

function createConfetti(element) {
    for(let i=0; i<10; i++) {
        const conf = document.createElement('div');
        conf.className = 'mini-confetti';
        conf.style.left = element.offsetLeft + element.offsetWidth/2 + 'px';
        conf.style.top = element.offsetTop + element.offsetHeight/2 + 'px';
        conf.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 70%)`;
        conf.style.transform = `translate(${Math.random()*100 - 50}px, ${Math.random()*100 - 50}px)`;
        element.parentElement.appendChild(conf);
        setTimeout(() => conf.remove(), 1000);
    }
}

function renderCoupon(item, container) {
    const ticket = document.createElement('div');
    ticket.className = 'golden-ticket';
    
    const inner = document.createElement('div');
    inner.className = 'ticket-inner';
    
    const title = document.createElement('h3');
    title.textContent = "TICKET DOURADO";
    
    const text = document.createElement('p');
    text.textContent = item.ticketText;
    text.className = 'ticket-text';
    
    const sub = document.createElement('small');
    sub.textContent = "Válido para sempre ❤️ (mas utilização unica 😉)";
    
    inner.appendChild(title);
    inner.appendChild(text);
    inner.appendChild(sub);
    ticket.appendChild(inner);
    
    container.appendChild(ticket);
}

function renderPoem(item, container) {
    const paper = document.createElement('div');
    paper.className = 'parchment-paper';
    
    const text = document.createElement('div');
    text.className = 'poem-text';
    text.innerHTML = item.poem.replace(/\n/g, '<br>');
    
    paper.appendChild(text);
    container.appendChild(paper);
}

function renderHold(item, container) {
    const btn = document.createElement('div');
    btn.className = 'hold-btn';
    btn.textContent = 'PRESS';
    
    let timer;
    
    const start = (e) => {
        e.preventDefault();
        btn.classList.add('holding');
        timer = setTimeout(() => {
            btn.textContent = '❤️';
            btn.classList.remove('holding');
            
            // Trigger Rose Bloom Effect
            const overlay = document.getElementById('rose-overlay');
            overlay.innerHTML = ''; // Clear
            
            // Call the function from flower.js (we will create this)
            if (typeof createFlowerContent === 'function') {
                createFlowerContent(overlay);
            }

            // Add Close Button (Cross)
            const closeBtn = document.createElement('div');
            closeBtn.innerHTML = '✖';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '20px';
            closeBtn.style.zIndex = '10000';
            closeBtn.style.color = 'white';
            closeBtn.style.fontSize = '2rem';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.opacity = '0.8';
            
            closeBtn.onclick = (e) => {
                e.stopPropagation(); // Prevent overlay click
                overlay.classList.remove('active');
                setTimeout(() => overlay.innerHTML = '', 1000);
            };
            
            overlay.appendChild(closeBtn);

            overlay.classList.add('active');
            
            // Optional: Close on click (removed to force using the cross if desired, or keep it)
            // overlay.onclick = () => { ... };

        }, 2000);
    };
    
    const end = (e) => {
        e.preventDefault();
        clearTimeout(timer);
        btn.classList.remove('holding');
    };
    
    btn.addEventListener('mousedown', start);
    btn.addEventListener('mouseup', end);
    btn.addEventListener('mouseleave', end);
    
    btn.addEventListener('touchstart', start);
    btn.addEventListener('touchend', end);
    
    container.appendChild(btn);
}

function renderShake(item, container) {
    const icon = document.createElement('div');
    icon.className = 'shake-target shake-anim';
    icon.textContent = '❤️';
    
    const hint = document.createElement('p');
    hint.textContent = "(Toca 3 vezes!)";
    hint.style.fontSize = '0.8rem';
    
    let taps = 0;
    icon.onclick = () => {
        taps++;
        if (taps >= 3) {
            taps = 0;
            
            // Trigger Heart Explosion
            const overlay = document.getElementById('heart-overlay');
            overlay.innerHTML = '';
            
            const bigHeart = document.createElement('div');
            bigHeart.className = 'big-heart';
            bigHeart.textContent = '❤️';
            overlay.appendChild(bigHeart);
            
            const text = document.createElement('div');
            text.className = 'love-text';
            text.textContent = 'EU AMO-TE MEU AMOR!';
            overlay.appendChild(text);
            
            // Particles
            for(let i=0; i<20; i++) {
                const p = document.createElement('div');
                p.className = 'heart-particle';
                const angle = Math.random() * Math.PI * 2;
                const dist = 100 + Math.random() * 200;
                const tx = Math.cos(angle) * dist + 'px';
                const ty = Math.sin(angle) * dist + 'px';
                p.style.setProperty('--tx', tx);
                p.style.setProperty('--ty', ty);
                p.style.animation = `particleFly 1s ease-out forwards`;
                overlay.appendChild(p);
            }
            
            overlay.classList.add('active');
            
            setTimeout(() => {
                overlay.classList.remove('active');
            }, 4000);
        }
    };
    
    container.appendChild(icon);
    container.appendChild(hint);
}

function renderSpotify(item, container) {
    const link = document.createElement('a');
    link.href = item.link;
    link.target = '_blank';
    link.className = 'custom-audio-btn';
    link.innerHTML = '🎵 Abrir Spotify';
    link.style.background = '#1DB954';
    container.appendChild(link);
}

function renderTeaser(item, container) {
    const box = document.createElement('div');
    box.className = 'teaser-box';
    
    const icon = document.createElement('span');
    icon.className = 'teaser-icon';
    icon.textContent = '🎁';
    
    const text = document.createElement('p');
    text.textContent = item.content;
    text.style.fontWeight = 'bold';
    
    const sub = document.createElement('p');
    sub.textContent = item.subtext;
    sub.style.fontSize = '0.9rem';
    sub.style.marginTop = '10px';
    sub.style.color = '#666';
    
    box.appendChild(icon);
    box.appendChild(text);
    box.appendChild(sub);
    container.appendChild(box);
}

function renderStars(container) {
    const stars = document.createElement('div');
    stars.className = 'stars-container';
    stars.innerHTML = '✨🌠✨';
    container.appendChild(stars);

    // Trigger Full Screen Effect
    const overlay = document.getElementById('starry-night-overlay');
    overlay.innerHTML = ''; // Clear previous stars

    // Create stars
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random colors
        const rand = Math.random();
        if (rand > 0.8) star.classList.add('blue');
        else if (rand > 0.9) star.classList.add('yellow');
        else if (rand > 0.95) star.classList.add('pink');

        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        overlay.appendChild(star);
    }

    // Create shooting stars
    for (let i = 0; i < 8; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.top = Math.random() * 60 + '%';
        shootingStar.style.left = Math.random() * 100 + '%';
        shootingStar.style.animationDelay = Math.random() * 4 + 's';
        overlay.appendChild(shootingStar);
    }

    overlay.classList.add('active');

    // Remove effect after 5 seconds
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 5000); 
}

function showKissReward() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'kiss-overlay active';
    
    const content = document.createElement('div');
    content.style.textAlign = 'center';
    content.style.zIndex = '10';
    
    const icon = document.createElement('div');
    icon.className = 'kiss-icon';
    icon.textContent = '😘';
    
    const text = document.createElement('div');
    text.className = 'kiss-text';
    text.textContent = 'Ganhaste um beijinho!';
    
    content.appendChild(icon);
    content.appendChild(text);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    // Add floating kisses
    for(let i=0; i<30; i++) {
        setTimeout(() => {
            const k = document.createElement('div');
            k.className = 'floating-kiss';
            k.textContent = ['😘', '💋', '❤️'][Math.floor(Math.random()*3)];
            k.style.left = Math.random() * 100 + 'vw';
            k.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
            k.style.animationDuration = (Math.random() * 2 + 2) + 's';
            overlay.appendChild(k);
        }, i * 150);
    }
    
    // Close on click
    overlay.onclick = () => {
        overlay.style.opacity = 0;
        setTimeout(() => overlay.remove(), 500);
    };
}

// Close Modal Logic
closeDayBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    // Stop audio/video if playing
    const audios = modalBody.querySelectorAll('audio');
    audios.forEach(a => a.pause());
    const videos = modalBody.querySelectorAll('video');
    videos.forEach(v => v.pause());
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        const audios = modalBody.querySelectorAll('audio');
        audios.forEach(a => a.pause());
        const videos = modalBody.querySelectorAll('video');
        videos.forEach(v => v.pause());
    }
});

// Info Modal Logic
function closeInfo() {
    infoModal.classList.add('hidden');
    localStorage.setItem('seenInfo', 'true');
}

infoBtn.addEventListener('click', () => {
    infoModal.classList.remove('hidden');
});

closeInfoBtn.addEventListener('click', closeInfo);
startBtn.addEventListener('click', closeInfo);

infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) {
        closeInfo();
    }
});

// Start
initCalendar();
