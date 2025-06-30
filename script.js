const themeToggleButton = document.getElementById("theme-toggle");
const body = document.body;
const mainNav = document.querySelector(".main-nav");
const scrollThreshold = 50;

// Nav Scroll
const handleNavScroll = () => {
  if (window.scrollY > scrollThreshold) {
    mainNav.classList.add("scrolled-nav");
  } else {
    mainNav.classList.remove("scrolled-nav");
  }
};

window.addEventListener("scroll", handleNavScroll);
handleNavScroll();

//Theme
const toggleTheme = () => {
  let currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(newTheme);
  localStorage.setItem("embsysTheme", newTheme);
};

const applyTheme = (theme) => {
  if (theme === "dark") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
};

themeToggleButton.addEventListener("click", toggleTheme);

const savedTheme = localStorage.getItem("embsysTheme");

if (savedTheme) {
  applyTheme(savedTheme);
}


//Animate Text
const txts = document.querySelector(".head").children,
      txtsLen = txts.length;
let index=0;
const textInTimer = 1500,
      textOutTimer = 1300;

function animateText() {
  for(let i=0; i<txtsLen; i++) {
    txts[i].classList.remove("text-in", "text-out");
  }
  txts[index].classList.add("text-in");
  
  setTimeout(function() {
    txts[index].classList.add("text-out");
  }, textOutTimer);

  setTimeout(function() {
    if(index == txtsLen-1) {
    index=0;
    }
    else{
      index++;
    }
    animateText();
  }, textInTimer);

} 

window.onload = animateText;