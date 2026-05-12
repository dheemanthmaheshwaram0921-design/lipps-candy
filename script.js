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
