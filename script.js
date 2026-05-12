const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const lyrics = document.querySelectorAll('.lyric-line');
const progress = document.getElementById('progress');
const art = document.getElementById('rotating-art');

// Fullscreen + Play Toggle
playBtn.onclick = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    }

    if (audio.paused) {
        audio.play();
        playBtn.innerText = "II";
        art.classList.add('playing');
    } else {
        audio.pause();
        playBtn.innerText = "▶";
        art.classList.remove('playing');
    }
};

// Syncing Logic
audio.ontimeupdate = () => {
    const t = audio.currentTime;
    
    // Update Progress Bar
    const percent = (t / audio.duration) * 100;
    progress.style.width = `${percent}%`;

    // Sync Lyrics
    lyrics.forEach((line, index) => {
        const lineTime = parseFloat(line.getAttribute('data-time'));
        const nextLineTime = lyrics[index + 1] ? parseFloat(lyrics[index + 1].getAttribute('data-time')) : 999;

        if (t >= lineTime && t < nextLineTime) {
            if (!line.classList.contains('active')) {
                lyrics.forEach(l => l.classList.remove('active'));
                line.classList.add('active');
                line.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
};

// Particle Burst Effect
document.onclick = (e) => {
    // Create 5 hearts per click for a "burst" feel
    for (let i = 0; i < 5; i++) {
        createParticle(e.clientX, e.clientY);
    }
};

function createParticle(x, y) {
    const p = document.createElement('img');
    p.src = 'heart.jpg';
    p.className = 'particle';
    
    // Random direction and rotation
    const tx = (Math.random() - 0.5) * 300 + 'px';
    const ty = (Math.random() - 0.5) * 300 + 'px';
    const tr = Math.random() * 360 + 'deg';
    
    p.style.setProperty('--tx', tx);
    p.style.setProperty('--ty', ty);
    p.style.setProperty('--tr', tr);
    
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.width = '30px';
    
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1200);
}
