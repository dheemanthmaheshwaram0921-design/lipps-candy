const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const lyrics = document.querySelectorAll('.lyric-line');
const progress = document.getElementById('progress');
const clickArea = document.getElementById('click-handler');

window.onload = () => {
    update(0); 
    
    // Initial heart burst for Lipps Candy
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    for(let i=0; i<15; i++) {
        createParticle(centerX, centerY);
    }

    setTimeout(() => {
        document.getElementById('intro-screen').classList.add('hide-intro');
    }, 3500);
};

playBtn.onclick = (e) => {
    e.stopPropagation();
    if (audio.paused) {
        audio.play().then(() => {
            playBtn.innerText = "II";
        }).catch(err => console.log("Playback blocked"));
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
};

audio.ontimeupdate = () => {
    const t = audio.currentTime;
    progress.style.width = `${(t / audio.duration) * 100}%`;

    let activeIndex = -1;
    lyrics.forEach((line, index) => {
        const lineTime = parseFloat(line.getAttribute('data-time'));
        if (t >= lineTime) activeIndex = index;
    });

    if (activeIndex !== -1) update(activeIndex);
};

function update(index) {
    lyrics.forEach((line, i) => {
        const isActive = i === index;
        line.classList.toggle('active', isActive);
        if (isActive && !line.dataset.scrolled) {
            line.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

function createParticle(x, y) {
    const p = document.createElement('img');
    p.src = 'heart.jpg';
    p.className = 'particle';
    p.style.setProperty('--tx', (Math.random() - 0.5) * 400 + 'px');
    p.style.setProperty('--ty', (Math.random() - 0.5) * 400 + 'px');
    p.style.setProperty('--tr', Math.random() * 360 + 'deg');
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.width = '35px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
}

clickArea.onclick = (e) => {
    for (let i = 0; i < 6; i++) {
        createParticle(e.clientX, e.clientY);
    }
};
