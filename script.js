// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

/**
 * THEMES
 * brightA: airy, premium (sky + warm lemon)
 * dark: deep, cinematic (charcoal + violet/teal wash)
 * brightB: joyful, premium (soft coral + mint)
 */
const THEMES = {
  brightA: {
    bg1: "#f8fbff",
    bg2: "#eef6ff",
    ink: "#0b0e14",
    muted: "rgba(11,14,20,.65)",
    accent: "#1aa6ff",
    accent2: "#ffcf55",
    line: "rgba(11,14,20,.10)",
    topbar: "rgba(255,255,255,.35)",
    topbarBorder: "rgba(0,0,0,.06)",
    wash: "var(--washA)",
  },
  dark: {
    bg1: "#06070b",
    bg2: "#0b0f16",
    ink: "#f4f5fb",
    muted: "rgba(244,245,251,.70)",
    accent: "#7a5cff",
    accent2: "#00ffd0",
    line: "rgba(255,255,255,.12)",
    topbar: "rgba(6,7,11,.45)",
    topbarBorder: "rgba(255,255,255,.10)",
    wash: "var(--washDark)",
  },
  brightB: {
    bg1: "#fff8fb",
    bg2: "#f6fff8",
    ink: "#111018",
    muted: "rgba(17,16,24,.62)",
    accent: "#ff4da6",
    accent2: "#46f0b5",
    line: "rgba(17,16,24,.12)",
    topbar: "rgba(255,255,255,.35)",
    topbarBorder: "rgba(0,0,0,.06)",
    wash: "var(--washB)",
  }
};

const root = document.documentElement;
const washEl = document.querySelector(".wash");
const topbar = document.querySelector(".topbar");

function applyTheme(key){
  const t = THEMES[key] || THEMES.brightA;

  root.style.setProperty("--bg1", t.bg1);
  root.style.setProperty("--bg2", t.bg2);
  root.style.setProperty("--ink", t.ink);
  root.style.setProperty("--muted", t.muted);
  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--accent2", t.accent2);
  root.style.setProperty("--line", t.line);

  // wash background (can accept CSS var strings)
  washEl.style.background = t.wash;

  // topbar adapts for dark
  topbar.style.background = t.topbar;
  topbar.style.borderBottomColor = t.topbarBorder;

  // body color updates automatically via CSS vars
}

// Scroll-based theme switching
const themedSections = document.querySelectorAll("[data-theme]");
const themeObserver = new IntersectionObserver((entries) => {
  // pick the most visible section
  const visible = entries
    .filter(e => e.isIntersecting)
    .sort((a,b) => (b.intersectionRatio - a.intersectionRatio))[0];

  if (visible) applyTheme(visible.target.dataset.theme);
}, { threshold: [0.25, 0.35, 0.5, 0.65] });

themedSections.forEach(sec => themeObserver.observe(sec));
applyTheme("brightA");

// Reveal animations
const revealEls = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.18 });

revealEls.forEach(el => revealObserver.observe(el));

// Optional: micro tilt on main headshot (subtle premium)
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const tiltEl = document.querySelector("[data-tilt]");
if (tiltEl && !prefersReduced){
  tiltEl.addEventListener("mousemove", (e) => {
    const r = tiltEl.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltEl.style.transform = `rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg)`;
  });
  tiltEl.addEventListener("mouseleave", () => {
    tiltEl.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}
