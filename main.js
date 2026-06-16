/* ── Nav hamburger ── */
const ham = document.getElementById("nav-ham");
const drawer = document.getElementById("nav-drawer");
ham.addEventListener("click", () => {
  const open = drawer.classList.toggle("open");
  ham.classList.toggle("open", open);
  ham.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
});
function closeDrawer() {
  drawer.classList.remove("open");
  ham.classList.remove("open");
  ham.setAttribute("aria-expanded", false);
  document.body.style.overflow = "";
}
window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeDrawer();
});

/* ── Workflow tabs ── */
document.querySelectorAll(".workflow-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const id = tab.dataset.panel;
    document
      .querySelectorAll(".workflow-tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".workflow-panel")
      .forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("wp-" + id).classList.add("active");
    document.getElementById("wp-" + id + "-ui").classList.add("active");
    document
      .querySelectorAll("#wp-" + id + " .reveal, #wp-" + id + "-ui .reveal")
      .forEach((el) => {
        el.classList.remove("on");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => el.classList.add("on"))
        );
      });
  });
});

/* ── Scroll reveal ── */
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 }
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

/* ── Hero progress bar animate ── */
setTimeout(() => {
  const bar = document.getElementById("hero-prog");
  if (bar) bar.style.width = "33%";
}, 700);
