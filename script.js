const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const lyrics = document.querySelectorAll('.lyric-line');

playBtn.onclick = () => {
    audio.paused ? (audio.play(), playBtn.innerText = "Pause") : (audio.pause(), playBtn.innerText = "Play");
};

// Syncing "No One Noticed" - Adjust these timestamps to your song file!
audio.ontimeupdate = () => {
    const t = audio.currentTime;
    if (t > 0)  update(0);
    if (t > 5)  update(1);
    if (t > 10) update(2);
    if (t > 15) update(3);
    if (t > 20) update(4);
    if (t > 25) update(5);
};

function update(index) {
    lyrics.forEach((l, i) => l.classList.toggle('active', i === index));
}

document.onclick = (e) => {
    const img = document.createElement('img');
    img.src = 'heart.jpg';
    img.className = 'heart-pop';
    img.style.width = '40px';
    img.style.left = e.clientX - 20 + 'px';
    img.style.top = e.clientY - 20 + 'px';
    document.body.appendChild(img);
    setTimeout(() => img.remove(), 1000);
};
