document.addEventListener("DOMContentLoaded", () => {
    // 1. Animații la Scroll (IntersectionObserver)
    const selector = ".guide-card, .info-box, .feature-card, .faq-item, .hero-content, .community-card";
    const scrollElements = document.querySelectorAll(selector);

    if (scrollElements.length > 0) {
        scrollElements.forEach((el) => el.classList.add("animate-on-scroll"));

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        scrollElements.forEach((el) => observer.observe(el));
    }

    // 2. Apelăm funcțiile la încărcarea paginii
    fetchServerStatus();
    initTypewriter();
});

// Resetare scroll la începutul paginii
if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

// Funcție pentru copierea IP-ului în Clipboard
function copyIP() {
    const serverIP = "TerraviaMC.org";

    navigator.clipboard.writeText(serverIP).then(() => {
        const heroBtn = document.getElementById("hero-copy-btn");
        if (!heroBtn) return;

        const ipText = heroBtn.querySelector(".ip-text");
        if (!ipText) return;

        const originalText = ipText.innerText;

        ipText.innerText = "COPIED TO CLIPBOARD!";
        heroBtn.style.borderColor = "#34d399";
        heroBtn.style.color = "#34d399";

        setTimeout(() => {
            ipText.innerText = originalText;
            heroBtn.style.borderColor = "rgba(56, 189, 248, 0.3)";
            heroBtn.style.color = "#38bdf8";
        }, 2500);
    }).catch(err => {
        console.error("Failed to copy IP:", err);
    });
}

// Verificare Status Server (MCSrvStat API v3 + Timeout 5 sec)
async function fetchServerStatus() {
    const statusElement = document.getElementById("player-count");
    const badgeElement = document.getElementById("status-badge");
    if (!statusElement || !badgeElement) return;

    const serverIP = "TerraviaMC.org";

    badgeElement.className = "status-badge checking";
    statusElement.innerText = "Checking status..";

    // Setăm un timeout de 5 secunde
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(`https://api.mcsrvstat.us/3/${serverIP}`, {
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await response.json();

        if (data.online) {
            badgeElement.className = "status-badge online";
            statusElement.innerText = `${data.players.online} Players Online`;
        } else {
            badgeElement.className = "status-badge offline";
            statusElement.innerText = "Network Offline";
        }
    } catch (error) {
        badgeElement.className = "status-badge offline";
        statusElement.innerText = "Network Offline";
    }
}

// Efectul de tastare (Typewriter)
function initTypewriter() {
    const phrases = [
        "TerraviaMC",
        "Earth Towny",
        "A New Empire",
        "Geopolitics"
    ];

    const typewriterElement = document.getElementById("typewriter");
    if (!typewriterElement) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typewriterElement.textContent = currentPhrase.substring(0, charIndex);

        let typeSpeed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
}
