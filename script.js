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