// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

/**
 * THEMES (all bright, no black):
 * brightA: white + sea blue
 * drama: rich violet + crimson (still bright, premium)
 * brightB: pink + soft orange accent
 */
const THEMES = {
  brightA: {
    bg1: "#fbfdff",
    bg2: "#eef8ff",
    ink: "#0b1020",
    muted: "rgba(11,16,32,.62)",
    accent: "#1a84ff",
    accent2: "#00c2ff",
    line: "rgba(11,16,32,.10)",
    topbar: "rgba(251,253,255,.55)",
    topbarBorder: "rgba(11,16,32,.08)",
    wash: `
      radial-gradient(1100px 720px at 18% 14%, rgba(0,194,255,.28), transparent 58%),
      radial-gradient(900px 620px at 86% 26%, rgba(26,132,255,.20), transparent 60%),
      linear-gradient(180deg, #fbfdff, #eef8ff)
    `
  },

  drama: {
    // violet + crimson, still luminous
    bg1: "#fff9ff",
    bg2: "#fff1f6",
    ink: "#1a0b1e",
    muted: "rgba(26,11,30,.62)",
    accent: "#7c3cff",  // violet
    accent2: "#ff2e5f", // crimson
    line: "rgba(26,11,30,.12)",
    topbar: "rgba(255,249,255,.50)",
    topbarBorder: "rgba(26,11,30,.10)",
    wash: `
      radial-gradient(1000px 680px at 20% 18%, rgba(124,60,255,.26), transparent 60%),
      radial-gradient(900px 620px at 85% 30%, rgba(255,46,95,.22), transparent 60%),
      radial-gradient(700px 520px at 55% 70%, rgba(255,46,95,.10), transparent 60%),
      linear-gradient(180deg, #fff9ff, #fff1f6)
    `
  },

  brightB: {
    // pink + small draft of orange
    bg1: "#fff7fb",
    bg2: "#fff6ee",
    ink: "#1b1020",
    muted: "rgba(27,16,32,.60)",
    accent: "#ff3ea5",  // pink
    accent2: "#ff8a3d", // orange
    line: "rgba(27,16,32,.12)",
    topbar: "rgba(255,247,251,.55)",
    topbarBorder: "rgba(27,16,32,.10)",
    wash: `
      radial-gradient(1050px 700px at 20% 18%, rgba(255,62,165,.24), transparent 60%),
      radial-gradient(920px 640px at 86% 28%, rgba(255,138,61,.18), transparent 62%),
      radial-gradient(700px 520px at 50% 70%, rgba(255,138,61,.08), transparent 60%),
      linear-gradient(180deg, #fff7fb, #fff6ee)
    `
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

  washEl.style.background = t.wash;

  topbar.style.background = t.topbar;
  topbar.style.borderBottomColor = t.topbarBorder;
}

// Scroll-based theme switching
const themedSections = document.querySelectorAll("[data-theme]");
const themeObserver = new IntersectionObserver((entries) => {
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
