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

// Update the workflow image when theme changes
function updateWorkflowImage() {
  const workflowImg = document.getElementById('workflow-image');
  if (body.classList.contains('dark-mode')) {
    workflowImg.src = 'assets/workflow-dark.svg';
  } else {
    workflowImg.src = 'assets/workflow-light.svg';
  }
}

themeToggleButton.addEventListener('click', updateWorkflowImage);

if (savedTheme === 'dark') {
  updateWorkflowImage();
}

// Features
let allValues = document.querySelectorAll(".value");

// Start the forEach loop for displaying the values
allValues.forEach((singleValue) => {
  let startValue = 0;
  let endValue = parseInt(singleValue.getAttribute("data-value"));
  let duration = Math.floor(2000 / endValue);

  // Counter for increaing the values & display
  let counter = setInterval(function () {
    startValue += 1;
    singleValue.textContent = startValue;
    // Clearing the interval
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // Back to top button
const backToTopButton = document.querySelector('.icon-top');
const footer = document.querySelector('.footer');

window.addEventListener('scroll', () => {
  // Show button after scrolling past first screen height
  if (window.scrollY > window.innerHeight) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
  
  // Additional check to hide when near footer
  const footerTop = footer.getBoundingClientRect().top;
  if (footerTop < window.innerHeight * 0.8) {
    backToTopButton.style.opacity = '0';
    backToTopButton.style.pointerEvents = 'none';
  } else {
    backToTopButton.style.opacity = '1';
    backToTopButton.style.pointerEvents = 'auto';
  }
});