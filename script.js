// ========================================
// MOBILE NAVIGATION
// ========================================

const menuButton = document.querySelector(".hamburger-icon");
const menuLinks = document.querySelector(".menu-links");

function closeMenu() {
    if (!menuButton || !menuLinks) return;
    menuButton.classList.remove("open");
    menuLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
}

if (menuButton && menuLinks) {
    menuButton.addEventListener("click", () => {
        const isOpen = menuLinks.classList.toggle("open");
        menuButton.classList.toggle("open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    menuLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        if (!event.target.closest(".mobile-nav")) closeMenu();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });
}


// ========================================
// ROTATING ROLE TEXT
// ========================================

const roleText = document.getElementById("role-text");
const roles = [
    "UI/UX Designer",
    "Web Designer",
    "Front-End Developer"
];

let roleIndex = 0;

if (roleText) {
    setInterval(() => {
        roleText.style.opacity = "0";
        roleText.style.transform = "translateY(8px)";

        setTimeout(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            roleText.textContent = roles[roleIndex];
            roleText.style.opacity = "1";
            roleText.style.transform = "translateY(0)";
        }, 300);
    }, 2800);
}


// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
    });

    revealItems.forEach(item => observer.observe(item));
} else {
    revealItems.forEach(item => item.classList.add("is-visible"));
}


// ========================================
// ACTIVE NAVIGATION
// ========================================

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a, .menu-links a");

function updateActiveNavigation() {
    let currentSection = "home";
    const marker = window.scrollY + window.innerHeight * 0.35;

    sections.forEach(section => {
        if (marker >= section.offsetTop) currentSection = section.id;
    });

    navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === "#" + currentSection;
        link.classList.toggle("active", isActive);
    });
}

window.addEventListener("scroll", updateActiveNavigation, { passive: true });
window.addEventListener("load", updateActiveNavigation);


// ========================================
// SCROLL PROGRESS BAR
// ========================================

const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
    if (!scrollProgress) return;

    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

    scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("load", updateScrollProgress);


// ========================================
// NAVIGATION BACKGROUND
// ========================================

const navigation = document.querySelectorAll(".desktop-nav, .mobile-nav");

function updateNavigationBackground() {
    navigation.forEach(nav => {
        if (window.scrollY > 40) {
            nav.style.boxShadow = "0 10px 35px rgba(0,0,0,.25)";
            nav.style.background = "rgba(16,11,28,.96)";
        } else {
            nav.style.boxShadow = "none";
            nav.style.background = "rgba(16,11,28,.87)";
        }
    });
}

window.addEventListener("scroll", updateNavigationBackground, { passive: true });


// ========================================
// HOME PHOTO 3D MOVEMENT
// ========================================

const heroVisual = document.querySelector(".hero-visual");
const heroBorder = document.querySelector(".hero-photo-border");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (heroVisual && heroBorder && finePointer) {
    heroVisual.addEventListener("mousemove", event => {
        const rect = heroVisual.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((mouseX - centerX) / centerX) * 7;
        const rotateX = ((centerY - mouseY) / centerY) * 7;
        const borderAngle = (mouseX / rect.width) * 360;

        heroBorder.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-3px)
        `;

        heroBorder.style.setProperty("--border-angle", `${borderAngle}deg`);
    });

    heroVisual.addEventListener("mouseleave", () => {
        heroBorder.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
        heroBorder.style.setProperty("--border-angle", "0deg");
    });
}


// ========================================
// SKILL CARD 3D TILT
// ========================================

if (finePointer) {
    document.querySelectorAll("[data-tilt]").forEach(card => {
        card.addEventListener("mousemove", event => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `
                perspective(850px)
                rotateX(${-y * 9}deg)
                rotateY(${x * 9}deg)
                translateY(-4px)
            `;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "perspective(850px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });
}


// ========================================
// FEATURED PROJECTS - COLLAPSIBLE ACCORDION
// ========================================

const projectCards = document.querySelectorAll(".project-card");

function closeProject(card) {
    const toggle = card.querySelector(".project-toggle");
    const content = card.querySelector(".project-content");
    const icon = card.querySelector(".project-toggle-icon");

    card.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    if (icon) icon.textContent = "+";
    if (content) content.style.maxHeight = "0px";
}

function openProject(card) {
    const toggle = card.querySelector(".project-toggle");
    const content = card.querySelector(".project-content");
    const icon = card.querySelector(".project-toggle-icon");

    card.classList.add("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    if (icon) icon.textContent = "−";
    if (content) content.style.maxHeight = `${content.scrollHeight}px`;
}

projectCards.forEach(card => {
    const toggle = card.querySelector(".project-toggle");
    const content = card.querySelector(".project-content");
    if (!toggle || !content) return;

    // Keep every project closed when the page first loads.
    closeProject(card);

    toggle.addEventListener("click", () => {
        const isCurrentlyOpen = card.classList.contains("is-open");

        // Close the other project before opening the selected one.
        projectCards.forEach(otherCard => closeProject(otherCard));

        if (!isCurrentlyOpen) openProject(card);
    });
});

// Recalculate the open panel height when the layout changes.
window.addEventListener("resize", () => {
    projectCards.forEach(card => {
        if (!card.classList.contains("is-open")) return;
        const content = card.querySelector(".project-content");
        if (content) content.style.maxHeight = `${content.scrollHeight}px`;
    });
});


// ========================================
// INITIALIZE
// ========================================

window.addEventListener("load", () => {
    updateActiveNavigation();
    updateScrollProgress();
    updateNavigationBackground();
});