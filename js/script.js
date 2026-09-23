<<<<<<< HEAD
// Animations while Initial loading
document.addEventListener('DOMContentLoaded', () => {
    // Select elements to animate across all pages
    const selector = '.guide-card, .info-box, .feature-card, .faq-item, .hero-content, .community-card';
    const scrollElements = document.querySelectorAll(selector);

    // Add initial hidden state
    scrollElements.forEach(el => el.classList.add('animate-on-scroll'));

    // Observe elements as they enter the viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stays visible once revealed
            }
        });
    }, {
        threshold: 0.15
    });

    scrollElements.forEach(el => observer.observe(el));
});

// Force page to start at top on refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Copy IP to Clipboard
function copyIP() {
    const serverIP = "TerraviaMC.org";
    navigator.clipboard.writeText(serverIP).then(() => {
        const heroBtn = document.getElementById("hero-copy-btn");
        if (!heroBtn) return;
        
        const ipText = heroBtn.querySelector(".ip-text");
        const originalText = ipText.innerText;
        
        ipText.innerText = "COPIED TO CLIPBOARD!";
        heroBtn.style.borderColor = "#34d399";
        heroBtn.style.color = "#34d399";

        setTimeout(() => {
            ipText.innerText = originalText;
            heroBtn.style.borderColor = "rgba(56, 189, 248, 0.3)";
            heroBtn.style.color = "#38bdf8";
        }, 2500);
    });
}

// Fetch Minecraft Server Status
// Fetch Minecraft Server Status
async function fetchServerStatus() {
    const statusElement = document.getElementById("player-count");
    const badgeElement = document.getElementById("status-badge");
    if (!statusElement || !badgeElement) return;

    const serverIP = "TerraviaMC.org";

    // Set checking state initially (Yellow)
    badgeElement.className = "status-badge checking";
    statusElement.innerText = "Checking status..";

    // Create a 5-second timeout timer
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 5000)
    );

    try {
        // Race the API fetch against the 5-second timer
        const response = await Promise.race([
            fetch(`https://api.mcsrvstat.us/2/${serverIP}`),
            timeout
        ]);

        const data = await response.json();

        if (data.online) {
            // Server Online (Green)
            badgeElement.className = "status-badge online";
            statusElement.innerText = `${data.players.online} Players Online`;
        } else {
            // Server Offline (Red)
            badgeElement.className = "status-badge offline";
            statusElement.innerText = "Network Offline";
        }
    } catch (error) {
        // Triggers if API fails OR if 5 seconds pass with no response (Red)
        badgeElement.className = "status-badge offline";
        statusElement.innerText = "Network Offline";
    }
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", fetchServerStatus);

document.addEventListener("DOMContentLoaded", () => {
    const textToType = "TerraviaMC";
    const typewriterElement = document.getElementById("typewriter");
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    if (!typewriterElement) return;

    let currentLength = 0;

    function scrambleStep() {
        if (currentLength <= textToType.length) {
            let revealed = textToType.substring(0, currentLength);
            let glitchCount = 0;

            const glitchInterval = setInterval(() => {
                let randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
                
                if (currentLength < textToType.length) {
                    typewriterElement.textContent = revealed + randomChar;
                } else {
                    typewriterElement.textContent = revealed;
                }

                glitchCount++;
                if (glitchCount >= 4) {
                    clearInterval(glitchInterval);
                    currentLength++;
                    if (currentLength <= textToType.length) {
                        setTimeout(scrambleStep, 80);
                    }
                }
            }, 30);
        }
    }

    scrambleStep();
});

document.addEventListener("DOMContentLoaded", () => {
    const phrases = ["TerraviaMC", "Earth Towny", "A New Empire", "Geopolitics"];
    const typewriterElement = document.getElementById("typewriter");
    if (!typewriterElement) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at full text
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
=======
// Animations while Initial loading
document.addEventListener('DOMContentLoaded', () => {
    // Select elements to animate across all pages
    const selector = '.guide-card, .info-box, .feature-card, .faq-item, .hero-content, .community-card';
    const scrollElements = document.querySelectorAll(selector);

    // Add initial hidden state
    scrollElements.forEach(el => el.classList.add('animate-on-scroll'));

    // Observe elements as they enter the viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stays visible once revealed
            }
        });
    }, {
        threshold: 0.15
    });

    scrollElements.forEach(el => observer.observe(el));
});

// Force page to start at top on refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Copy IP to Clipboard
function copyIP() {
    const serverIP = "TerraviaMC.org";
    navigator.clipboard.writeText(serverIP).then(() => {
        const heroBtn = document.getElementById("hero-copy-btn");
        if (!heroBtn) return;
        
        const ipText = heroBtn.querySelector(".ip-text");
        const originalText = ipText.innerText;
        
        ipText.innerText = "COPIED TO CLIPBOARD!";
        heroBtn.style.borderColor = "#34d399";
        heroBtn.style.color = "#34d399";

        setTimeout(() => {
            ipText.innerText = originalText;
            heroBtn.style.borderColor = "rgba(56, 189, 248, 0.3)";
            heroBtn.style.color = "#38bdf8";
        }, 2500);
    });
}

// Fetch Minecraft Server Status
// Fetch Minecraft Server Status
async function fetchServerStatus() {
    const statusElement = document.getElementById("player-count");
    const badgeElement = document.getElementById("status-badge");
    if (!statusElement || !badgeElement) return;

    const serverIP = "TerraviaMC.org";

    // Set checking state initially (Yellow)
    badgeElement.className = "status-badge checking";
    statusElement.innerText = "Checking status..";

    // Create a 5-second timeout timer
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 5000)
    );

    try {
        // Race the API fetch against the 5-second timer
        const response = await Promise.race([
            fetch(`https://api.mcsrvstat.us/2/${serverIP}`),
            timeout
        ]);

        const data = await response.json();

        if (data.online) {
            // Server Online (Green)
            badgeElement.className = "status-badge online";
            statusElement.innerText = `${data.players.online} Players Online`;
        } else {
            // Server Offline (Red)
            badgeElement.className = "status-badge offline";
            statusElement.innerText = "Network Offline";
        }
    } catch (error) {
        // Triggers if API fails OR if 5 seconds pass with no response (Red)
        badgeElement.className = "status-badge offline";
        statusElement.innerText = "Network Offline";
    }
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", fetchServerStatus);

document.addEventListener("DOMContentLoaded", () => {
    const textToType = "TerraviaMC";
    const typewriterElement = document.getElementById("typewriter");
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    if (!typewriterElement) return;

    let currentLength = 0;

    function scrambleStep() {
        if (currentLength <= textToType.length) {
            let revealed = textToType.substring(0, currentLength);
            let glitchCount = 0;

            const glitchInterval = setInterval(() => {
                let randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
                
                if (currentLength < textToType.length) {
                    typewriterElement.textContent = revealed + randomChar;
                } else {
                    typewriterElement.textContent = revealed;
                }

                glitchCount++;
                if (glitchCount >= 4) {
                    clearInterval(glitchInterval);
                    currentLength++;
                    if (currentLength <= textToType.length) {
                        setTimeout(scrambleStep, 80);
                    }
                }
            }, 30);
        }
    }

    scrambleStep();
});

document.addEventListener("DOMContentLoaded", () => {
    const phrases = ["TerraviaMC", "Earth Towny", "A New Empire", "Geopolitics"];
    const typewriterElement = document.getElementById("typewriter");
    if (!typewriterElement) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at full text
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
>>>>>>> aaddc5a2b2d0db98740406874e715cf468a61231
});