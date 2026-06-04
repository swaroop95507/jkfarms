const header = document.querySelector("#site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const backToTop = document.querySelector("#back-to-top");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxVideo = lightbox.querySelector("video");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const inquiryForm = document.querySelector("#inquiry-form");
const whatsappBase = "https://wa.me/918297961433";
const navLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
const animatedItems = [
  ...document.querySelectorAll(".quick-highlights .highlight-card"),
  ...document.querySelectorAll(".split-section > *"),
  ...document.querySelectorAll(".section-heading"),
  ...document.querySelectorAll(".facility-card"),
  ...document.querySelectorAll(".destination-grid article"),
  ...document.querySelectorAll(".event-grid article"),
  ...document.querySelectorAll(".gallery-item"),
  ...document.querySelectorAll(".package-card"),
  ...document.querySelectorAll(".faq-item"),
  ...document.querySelectorAll(".contact-grid a"),
  inquiryForm
].filter(Boolean);

function updateHeader() {
  const hasScrolled = window.scrollY > 24;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

  document.documentElement.style.setProperty("--scroll-progress", Math.min(1, Math.max(0, progress)).toFixed(4));
  header.classList.toggle("scrolled", hasScrolled);
  backToTop.classList.toggle("visible", window.scrollY > 520);
}

function closeMenu() {
  navMenu.classList.remove("open");
  header.classList.remove("menu-active");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}

menuToggle.addEventListener("click", () => {
  if (lightbox.classList.contains("active")) return;
  const isOpen = navMenu.classList.toggle("open");
  header.classList.toggle("menu-active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

animatedItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--reveal-delay", `${Math.min(index % 8, 5) * 55}ms`);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in-view");
    revealObserver.unobserve(entry.target);
  });
}, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

animatedItems.forEach((item) => revealObserver.observe(item));

const sections = [...document.querySelectorAll("main section[id]")];
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-38% 0px -54% 0px", threshold: 0.01 });

sections.forEach((section) => navObserver.observe(section));

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");

function updateHeroMotion() {
  if (!hero || !heroContent || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const offset = Math.min(window.scrollY, window.innerHeight);
  hero.style.backgroundPosition = `center calc(62% + ${offset * 0.035}px)`;
  heroContent.style.transform = `translateY(${offset * 0.05}px)`;
}

window.addEventListener("scroll", updateHeroMotion, { passive: true });
updateHeroMotion();

document.querySelectorAll(".destination-grid article").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--pointer-x", `${x.toFixed(1)}%`);
    card.style.setProperty("--pointer-y", `${y.toFixed(1)}%`);
  });
});

document.querySelectorAll(".btn, .nav-cta, .floating-whatsapp").forEach((item) => {
  item.classList.add("magnetic");
  item.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = item.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
    item.style.transform = `translate(${x}px, ${y}px)`;
  });
  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

document.querySelectorAll(".gallery-item").forEach((button) => {
  button.addEventListener("click", () => {
    closeMenu();
    const image = button.querySelector("img");
    const thumbVideo = button.querySelector(".gallery-thumb-video");
    const mediaType = button.dataset.type || "image";
    const caption = button.dataset.caption || image?.alt || "JK Farms gallery media";

    lightbox.classList.toggle("media-video", mediaType === "video");
    lightboxCaption.textContent = caption;

    if (mediaType === "video") {
      lightboxImage.src = "";
      lightboxImage.alt = "";
      lightboxVideo.src = button.dataset.src;
      lightboxVideo.poster = thumbVideo?.poster || image?.src || "";
      lightboxVideo.load();
    } else {
      lightboxVideo.pause();
      lightboxVideo.removeAttribute("src");
      lightboxVideo.removeAttribute("poster");
      lightboxVideo.load();
      lightboxImage.src = button.dataset.src;
      lightboxImage.alt = image?.alt || caption;
    }

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  });
});

document.querySelectorAll(".gallery-thumb-video").forEach((video) => {
  video.addEventListener("loadedmetadata", () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0.4) return;
    video.currentTime = Math.min(0.5, video.duration * 0.18);
  }, { once: true });

  const tile = video.closest(".gallery-item");
  tile.addEventListener("pointerenter", () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.muted = true;
    video.play().catch(() => {});
  });

  tile.addEventListener("pointerleave", () => {
    video.pause();
    if (Number.isFinite(video.duration) && video.duration > 0.4) {
      video.currentTime = Math.min(0.5, video.duration * 0.18);
    }
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.classList.remove("media-video");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxVideo.pause();
  lightboxVideo.removeAttribute("src");
  lightboxVideo.removeAttribute("poster");
  lightboxVideo.load();
  lightboxCaption.textContent = "";
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  closeLightbox();
});

lightboxClose.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  event.stopPropagation();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target.classList.contains("lightbox-caption")) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeLightbox();
  }
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isActive = item.classList.toggle("active");
    button.setAttribute("aria-expanded", String(isActive));
    if (isActive) {
      document.querySelectorAll(".faq-item.active").forEach((activeItem) => {
        if (activeItem === item) return;
        activeItem.classList.remove("active");
        activeItem.querySelector("button").setAttribute("aria-expanded", "false");
      });
    }
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(inquiryForm);
  const message = [
    "Hi JK Farms,",
    "",
    "I would like to check availability.",
    "",
    `Name: ${formData.get("name") || ""}`,
    `Phone: ${formData.get("phone") || ""}`,
    `Event Type: ${formData.get("eventType") || ""}`,
    `Event Date: ${formData.get("eventDate") || ""}`,
    `Guest Count: ${formData.get("guestCount") || ""}`,
    `Message: ${formData.get("message") || ""}`
  ].join("\n");

  const url = `${whatsappBase}?text=${encodeURIComponent(message)}`;
  const bookingWindow = window.open("", "_blank");

  if (bookingWindow) {
    bookingWindow.opener = null;
    bookingWindow.location.href = url;
  } else {
    window.location.href = url;
  }
});
