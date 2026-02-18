// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal (premium, subtle)
const revealEls = document.querySelectorAll("[data-reveal]");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.18 });

revealEls.forEach(el => io.observe(el));

// Parallax (lightweight; respects reduced motion)
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"))
  .map(el => ({ el, speed: parseFloat(el.dataset.parallax || "0.1") }));

function onScroll(){
  if (prefersReduced) return;

  const vh = window.innerHeight;
  const scrollY = window.scrollY;

  for (const item of parallaxEls){
    const rect = item.el.getBoundingClientRect();
    const mid = rect.top + rect.height / 2;

    // -1..1 around viewport center
    const t = (mid - vh / 2) / (vh / 2);
    const offset = t * 22 * item.speed; // subtle movement

    item.el.style.transform = `translate3d(0, ${offset}px, 0)`;
  }
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();
