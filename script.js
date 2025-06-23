const faqItems = document.querySelectorAll(".faq-item");
const themeToggleButton = document.getElementById("theme-toggle");
const body = document.body;
const mainNav = document.querySelector(".main-nav");
const scrollThreshold = 50;

const handleNavScroll = () => {
  if (window.scrollY > scrollThreshold) {
    mainNav.classList.add("scrolled-nav");
  } else {
    mainNav.classList.remove("scrolled-nav");
  }
};

window.addEventListener("scroll", handleNavScroll);
handleNavScroll();

const toggleTheme = () => {
  let currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(newTheme);
  localStorage.setItem("novaTaskTheme", newTheme);
};

const applyTheme = (theme) => {
  if (theme === "dark") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
};

themeToggleButton.addEventListener("click", toggleTheme);

const savedTheme = localStorage.getItem("novaTaskTheme");

if (savedTheme) {
  applyTheme(savedTheme);
}

faqItems.forEach((item) => {
  const questionButton = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  const icon = item.querySelector(".faq-icon");

  if (!questionButton || !answer || !icon) return;

  questionButton.addEventListener("click", () => {
    faqItems.forEach((other) => {
      if (other !== item && other.classList.contains("active")) {
        other.classList.remove("active");
        const a = other.querySelector(".faq-answer");
        const i = other.querySelector(".faq-icon");
        if (a) a.style.maxHeight = null;
        if (i) {
          i.classList.remove("fa-minus");
          i.classList.add("fa-plus");
        }
      }
    });

    const isActive = item.classList.toggle("active");
    answer.style.maxHeight = isActive ? answer.scrollHeight + "px" : null;
    icon.classList.toggle("fa-plus", !isActive);
    icon.classList.toggle("fa-minus", isActive);
  });
});

// Slider
const slides = document.querySelectorAll(".slide");
const sliderNav = document.querySelector(".slider-nav");
const slider = document.querySelector(".slider");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentSlide = 0;
let slideCount = slides.length;
let intervalId = null;

slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("nav-dot");

  if (index === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    goToSlide(index);
  });

  sliderNav.appendChild(dot);
});

const dots = document.querySelectorAll(".nav-dot");

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function goToSlide(index) {
  currentSlide = (index + slideCount) % slideCount;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  resetAnimation(slides[currentSlide]);
  updateDots();
}

function resetAnimation(slide) {
  const content = slide.querySelector(".slide-content");
  if (content) {
    const clone = content.cloneNode(true);
    content.parentNode.replaceChild(clone, content);
  }
}

function startAutoAdvance() {
  if (!intervalId) {
    intervalId = setInterval(handleNextSlide, 5000);
  }
}

function stopAutoAdvance() {
  clearInterval(intervalId);
  intervalId = null;
}

startAutoAdvance();

slider.addEventListener("mouseenter", stopAutoAdvance);
slider.addEventListener("mouseleave", startAutoAdvance);

function handleNextSlide() {
  stopAutoAdvance();
  goToSlide(currentSlide + 1);
  startAutoAdvance();
}

function handlePrevSlide() {
  stopAutoAdvance();
  goToSlide(currentSlide - 1);
  startAutoAdvance();
}

prevBtn.addEventListener("click", handlePrevSlide);
nextBtn.addEventListener("click", handleNextSlide);