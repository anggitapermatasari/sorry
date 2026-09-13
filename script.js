const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let W;
let H;

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

resize();

window.addEventListener("resize", resize);


// ============================
// PENGATURAN
// ============================

const tulisan = [
    "I LOVE YOU",
    "LOVE YOU",
    "I LOVE YOU",
    "LOPP YUU",
    "I LOVE YOU",
    "LOVE YOU"
];

let particles = [];


// ============================
// MEMBUAT TITIK PADA HATI
// ============================

function heart(t) {

    const scale = Math.min(W, H) / 32;

    const x =
        16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return {
        x: W / 2 + x * scale,
        y: H / 2 - y * scale
    };
}


// ============================
// PARTICLE TEKS
// ============================

class TextParticle {

    constructor(x, y, text) {

        this.x = x;
        this.y = y;

        this.targetX = x;
        this.targetY = y;

        this.text = text;

        this.size =
            Math.random() * 7 + 8;

        this.speed =
            Math.random() * 0.04 + 0.02;

        this.angle =
            Math.random() * Math.PI * 2;

        this.offset =
            Math.random() * 100;

        this.alpha =
            Math.random() * 0.5 + 0.5;
    }

    update(time) {

        // Gerakan perlahan
        this.x +=
            (this.targetX - this.x) * 0.04;

        this.y +=
            (this.targetY - this.y) * 0.04;

        this.x +=
            Math.sin(time * this.speed + this.offset) * 0.3;

        this.y +=
            Math.cos(time * this.speed + this.offset) * 0.3;
    }

    draw() {

        ctx.save();

        ctx.font =
            `bold ${this.size}px monospace`;

        ctx.fillStyle =
            `rgba(255, ${70 + Math.random() * 100}, 20, ${this.alpha})`;

        ctx.shadowBlur = 8;

        ctx.shadowColor = "#ff4500";

        ctx.fillText(
            this.text,
            this.x,
            this.y
        );

        ctx.restore();
    }
}


// ============================
// BUAT HATI
// ============================

function createHeart() {

    particles = [];

    const jumlah = 230;

    for (let i = 0; i < jumlah; i++) {

        const t =
            (Math.PI * 2 / jumlah) * i;

        const p = heart(t);

        // beberapa teks di sekitar garis hati
        for (let j = 0; j < 2; j++) {

            const offsetX =
                (Math.random() - 0.5) * 12;

            const offsetY =
                (Math.random() - 0.5) * 12;

            const particle =
                new TextParticle(
                    W / 2,
                    H / 2,
                    tulisan[
                        Math.floor(
                            Math.random() *
                            tulisan.length
                        )
                    ]
                );

            particle.targetX =
                p.x + offsetX;

            particle.targetY =
                p.y + offsetY;

            particle.size =
                Math.random() * 5 + 7;

            particles.push(particle);
        }
    }

    // Isi bagian dalam hati
    for (let i = 0; i < 300; i++) {

        const t =
            Math.random() * Math.PI * 2;

        const r =
            Math.random() * 0.85;

        const p =
            heart(t);

        const centerX = W / 2;
        const centerY = H / 2;

        const x =
            centerX +
            (p.x - centerX) * r;

        const y =
            centerY +
            (p.y - centerY) * r;

        const particle =
            new TextParticle(
                centerX,
                centerY,
                tulisan[
                    Math.floor(
                        Math.random() *
                        tulisan.length
                    )
                ]
            );

        particle.targetX = x;
        particle.targetY = y;

        particle.size =
            Math.random() * 4 + 6;

        particles.push(particle);
    }
}


// ============================
// BINTANG / PARTIKEL KECIL
// ============================

let stars = [];

for (let i = 0; i < 150; i++) {

    stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.5,
        alpha: Math.random()
    });
}


// ============================
// ANIMASI
// ============================

let startTime = Date.now();

function animate() {

    const time =
        (Date.now() - startTime) / 1000;

    ctx.fillStyle =
        "rgba(5, 5, 9, 0.25)";

    ctx.fillRect(
        0,
        0,
        W,
        H
    );


    // ------------------------
    // BINTANG
    // ------------------------

    stars.forEach(star => {

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${star.alpha})`;

        ctx.fill();
    });


    // ------------------------
    // PARTICLE HATI
    // ------------------------

    particles.forEach(particle => {

        particle.update(time);

        particle.draw();

    });


    requestAnimationFrame(animate);
}


// ============================
// MULAI
// ============================

setTimeout(() => {

    createHeart();

}, 800);

animate();