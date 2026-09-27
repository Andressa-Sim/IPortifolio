(function () {
  "use strict";

  const header = document.querySelector("#header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector("#navmenu");
  const navIcon = navToggle?.querySelector("i");
  const navLinks = document.querySelectorAll("#navmenu a");
  const scrollTop = document.querySelector("#scroll-top");
  const preloader = document.querySelector("#preloader");

  function setMenu(open) {
    if (!navToggle || !navMenu) return;

    navMenu.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    navIcon?.classList.toggle("bi-list", !open);
    navIcon?.classList.toggle("bi-x", open);
  }

  navToggle?.addEventListener("click", () => {
    setMenu(!navMenu.classList.contains("open"));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 991) setMenu(false);
  });

  function updatePageState() {
    const currentPosition = window.scrollY + (header?.offsetHeight || 0) + 120;

    navLinks.forEach((link) => {
      const section = document.querySelector(link.hash);
      if (!section) return;

      const isCurrent =
        currentPosition >= section.offsetTop &&
        currentPosition < section.offsetTop + section.offsetHeight;
      link.classList.toggle("active", isCurrent);
    });

    scrollTop?.classList.toggle("active", window.scrollY > 350);
  }

  window.addEventListener("scroll", updatePageState, { passive: true });
  window.addEventListener("load", updatePageState);

  scrollTop?.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function finishLoading() {
    if (!preloader) return;
    preloader.classList.add("loaded");
    window.setTimeout(() => preloader.remove(), 320);
  }

  window.addEventListener("load", finishLoading);

  if (document.readyState === "complete") {
    finishLoading();
  }

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }
})();
