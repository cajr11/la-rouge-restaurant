import { WINDOW_POS } from "./config.js";

// Selecting DOM Elements
const navBar = document.querySelector(".nav-items");
const btnReserve = document.querySelector(".btn-reserve");
const lnkReserve = document.querySelector(".reserve-link");
const aboutUS = document.querySelector(".about-us");

/////////// Sticky Navigation //////////////

window.addEventListener("scroll", function () {
  console.log(window.scrollY);
  if (this.window.scrollY > WINDOW_POS) {
    navBar.classList.add("sticky");
    btnReserve.classList.add("colored-border");
    lnkReserve.classList.add("colored");
  } else {
    navBar.classList.remove("sticky");
    btnReserve.classList.remove("colored-border");
    lnkReserve.classList.remove("colored");
  }
});

/////////////Impementing Smooth Scrol//////////////
navBar.addEventListener("click", function () {});

/////////// Ambience section Slides //////////////
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const btnLeft = document.querySelector(".btn-left");
  const btnRight = document.querySelector(".btn-right");
  const dotContainer = document.querySelector(".dots");
  let currSlide = 0;
  const maxSlide = slides.length - 1;

  // Implementing the dots for each slide
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // function that handles change in slide position
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currSlide === maxSlide) {
      currSlide = 0;
    } else {
      currSlide++;
    }

    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlide;
    } else {
      currSlide--;
    }

    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  init();

  ///////////// Event Handlers //////////////
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
