const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const progress = document.getElementById('progress');
const clickArea = document.getElementById('click-handler');

playBtn.onclick = (e) => {
    e.stopPropagation();
    if (audio.paused) {
        audio.play().then(() => {
            playBtn.innerText = "II";
        }).catch(() => console.log("Playback blocked"));
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
};

audio.ontimeupdate = () => {
    const t = audio.currentTime;
    progress.style.width = `${(t / audio.duration) * 100}%`;
};

function createParticle(x, y) {
    const p = document.createElement('img');
    p.src = 'heart.jpg';
    p.className = 'particle';
    p.style.setProperty('--tx', (Math.random() - 0.5) * 450 + 'px');
    p.style.setProperty('--ty', (Math.random() - 0.5) * 450 + 'px');
    p.style.setProperty('--tr', Math.random() * 360 + 'deg');
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.width = '35px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1200);
}

clickArea.onclick = (e) => {
    for (let i = 0; i < 8; i++) {
        createParticle(e.clientX, e.clientY);
    }
};

// Initial burst on load
window.onload = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    for(let i=0; i<15; i++) {
        createParticle(centerX, centerY);
    }
};
