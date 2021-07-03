import { WINDOW_POS } from "./config.js";

// Selecting DOM Elements
const navBar = document.querySelector(".nav-items");
const lnkReserve = document.querySelector(".reserve-link");
const btnBackToTop = document.querySelector(".back-top");
const btnReserve = document.querySelector(".btn-reserve");
const btnCloseModal = document.querySelector(".btn--close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const completeReservation = document.querySelector(".btn--make-reservation");
const userEmail = document.querySelector("#user-email");
const userFirstName = document.querySelector("#first-name");
const userLastName = document.querySelector("#last-name");
const userTelNum = document.querySelector("#number");

// ///////////// Saving reservation to local storage //////////////
completeReservation.addEventListener("click", function () {
  const clientInfo = {
    firstName: userFirstName.value,
    lastName: userLastName.value,
    email: userEmail.value,
    phoneNumber: userTelNum.value,
  };

  localStorage.setItem("client", JSON.stringify(clientInfo));

  userFirstName.value = "";
  userLastName.value = "";
  userLastName.value = "";
  userEmail.value = "";
  userTelNum.value = "";
});

/////////// Reservation Modal Window //////////////
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnReserve.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////// Sticky Navigation //////////////

window.addEventListener("scroll", function () {
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

////////// Hide nav bar while user scrolling ///////////////

///////////// Impementing Smooth Scroll //////////////
navBar.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    navBar.classList.add("animate");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      navBar.classList.remove("animate");
    }, 3000);
  }

  if (e.target.parentElement.classList.contains("btn-logo")) {
    const id = e.target.parentElement.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////// Return to top //////////////
btnBackToTop.addEventListener("click", function (e) {
  e.preventDefault();

  const id = e.target.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

/////////// Ambience section Slides //////////////
const slider = function () {
  const slides = document.querySelectorAll(".slide");
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
