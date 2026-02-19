function revealMessage() {
    document.getElementById("surprise").classList.remove("hidden");
}

function toggleMusic() {
    const music = document.getElementById("music");
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

function playSFX(s) {
    const sfx = document.getElementById(s);
    sfx.play();
}

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 3) + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

function createMoon() {
    const moon = document.createElement("div");
    moon.classList.add("moon");
    moon.innerHTML = "🌙";
    moon.style.left = Math.random() * 100 + "vw";
    moon.style.animationDuration = (Math.random() * 3 + 3) + "s";

    document.body.appendChild(moon);

    setTimeout(() => {
        moon.remove();
    }, 6000);
}

function createStar() {
    const moon = document.createElement("div");
    moon.classList.add("moon");
    moon.innerHTML = "⭐";
    moon.style.left = Math.random() * 100 + "vw";
    moon.style.animationDuration = (Math.random() * 3 + 3) + "s";

    document.body.appendChild(moon);

    setTimeout(() => {
        moon.remove();
    }, 6000);
}

setInterval(createHeart, 500);
setInterval(createMoon, 500);
setInterval(createStar, 500);
