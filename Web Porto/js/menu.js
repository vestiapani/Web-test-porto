// js/menu.js
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");

  if (!hamburger || !menu) {
    console.warn("Hamburger atau menu tidak ditemukan di DOM.");
    return;
  }

  // icon (Font Awesome) di dalam tombol hamburger
  const icon = hamburger.querySelector("i");

  // buka / tutup menu + ganti ikon
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");

    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    }
  });

  // tutup menu otomatis saat klik salah satu link + reset ikon
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  });
});
