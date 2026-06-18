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

/* ── Smooth scroll for anchor links (offset for sticky nav) ── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = 56;
      const top =
        target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

/* ── Fix FAQ link in mobile drawer ── */
document
  .querySelectorAll('.nav-drawer-links a[href="#faq"]')
  .forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

/* ── FAQ accordion toggle ── */
document.querySelectorAll(".faq-item-hd").forEach((hd) => {
  hd.addEventListener("click", () => {
    const item = hd.closest(".faq-item");
    const wasOpen = item.classList.contains("open");
    // close all
    document.querySelectorAll(".faq-item.open").forEach((i) => {
      i.classList.remove("open");
      i.querySelector(".faq-item-hd").setAttribute("aria-expanded", "false");
    });
    // toggle clicked
    if (!wasOpen) {
      item.classList.add("open");
      hd.setAttribute("aria-expanded", "true");
    }
  });
  // keyboard support
  hd.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      hd.click();
    }
  });
});

/* ── Demo Video: autoplay on scroll ── */
// const demoVideo = document.getElementById("demo-video");

// if (demoVideo) {
//   const videoObserver = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           demoVideo.play().catch(() => {});
//         } else {
//           demoVideo.pause();
//         }
//       });
//     },
//     { threshold: 0.4 }
//   );

//   videoObserver.observe(demoVideo);
// }

/* ── Hero video autoplay ── */
const heroVideo = document.getElementById("hero-video");
if (heroVideo) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroVideo.play().catch(() => {});
        } else {
          heroVideo.pause();
        }
      });
    },
    { threshold: 0.4 }
  );

  videoObserver.observe(heroVideo);
}

/* ── Dark Mode Toggle ── */
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme from localStorage or default to light
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* ── Fix: nav drawer link listeners for FAQ ── */
document
  .querySelectorAll(".nav-drawer-links a[href=\"#faq\"]")
  .forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
