const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const lyrics = document.querySelectorAll('.lyric-line');
const progress = document.getElementById('progress');

// First line active immediately
window.onload = () => { update(0); };

playBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "II";
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
};

audio.ontimeupdate = () => {
    const t = audio.currentTime;
    progress.style.width = `${(t / audio.duration) * 100}%`;

    let currentIndex = 0;
    lyrics.forEach((line, index) => {
        if (t >= parseFloat(line.getAttribute('data-time'))) {
            currentIndex = index;
        }
    });
    update(currentIndex);
};

function update(index) {
    lyrics.forEach((line, i) => {
        line.classList.toggle('active', i === index);
        if (i === index) {
            line.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

document.onclick = (e) => {
    for (let i = 0; i < 4; i++) {
        const p = document.createElement('img');
        p.src = 'heart.jpg';
        p.className = 'particle';
        p.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        p.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
        p.style.setProperty('--tr', Math.random() * 360 + 'deg');
        p.style.left = e.clientX + 'px';
        p.style.top = e.clientY + 'px';
        p.style.width = '25px';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1000);
    }
};
