///header js//////////////////

const searchEL = document.querySelector(".search");
const searchInputEL = searchEL.querySelector("input");

searchEL.addEventListener("click", function () {
  searchInputEL.focus();
});

searchInputEL.addEventListener("focus", function () {
  searchEL.classList.add("focused");
  searchInputEL.setAttribute("placeholder", "통합검색");
});

searchInputEL.addEventListener("blur", function () {
  searchEL.classList.remove("focused");
  searchInputEL.setAttribute("placeholder", "");
});



//////////검색창에 검색어 없을때
document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.querySelector(".sub-menu .search");
  if (!searchBox) return;

  const searchInput = searchBox.querySelector("input");
  const searchButton = searchBox.querySelector("span img");

  let isFocusedOnce = false;

  function checkSearch() {
    if (!isFocusedOnce) {
      isFocusedOnce = true;
      searchInput.focus();
      return;
    }
    if (!searchInput.value.trim()) {
      alert("검색어를 입력하세요");
    }
  }

  searchInput.addEventListener("focus", function () {
    isFocusedOnce = true;
  });

  searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkSearch();
    }
  });

  searchButton.addEventListener("click", function (e) {
    e.preventDefault();
    checkSearch();
  });
});









/////////////main js/////////////
// promoToggle
function promoToggle() {
  const promo = document.getElementById("promoBox");
  promo.classList.toggle("open");

  const btn = document.querySelector(".notice-right-btn");
  btn.classList.toggle("open");
}

// 이미지 배열
const images = ["starbucks-image/00.jpg", "starbucks-image/01.jpg"];

const sliderTrack = document.querySelector(".slider-track");
const btnLeft = document.querySelector(".slider-button-left");
console.log("btn-left", btnLeft);
const btnRight = document.querySelector(".slider-button-right");
console.log("btn-right", btnRight);

// 현재 중앙 인덱스
let currentIndex = 0;

function renderSlider() {
  sliderTrack.innerHTML = "";

  // prev, current, next 이미지 인덱스 순환
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  // prev
  const imgPrev = document.createElement("img");
  imgPrev.src = images[prevIndex];
  imgPrev.classList.add("prev");
  sliderTrack.appendChild(imgPrev);

  // current
  const imgCurrent = document.createElement("img");
  imgCurrent.src = images[currentIndex];
  imgCurrent.classList.add("current");
  sliderTrack.appendChild(imgCurrent);

  // next
  const imgNext = document.createElement("img");
  imgNext.src = images[nextIndex];
  imgNext.classList.add("next");
  sliderTrack.appendChild(imgNext);
}

// 버튼 클릭 이벤트
btnLeft.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  renderSlider();
});
btnRight.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  renderSlider();
});

renderSlider();



//scroll Animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = [
    //main1
    document.querySelector(".visual00-slogan"),
    document.querySelector(".visual-01"),
    document.querySelector(".visual-02"),
    document.querySelector(".visual-03"),
    document.querySelector(".visual-04"),
    document.querySelector(".visual-link"),
    //main4
    document.querySelector(".bean-image"),
    document.querySelector(".bean-content"),
    //main5
    document.querySelector(".reserve-image"),
    //main6
    document.querySelector(".fav-title-img"),
    document.querySelector(".fav-text-img"),
    document.querySelector(".fav-link"),
    //main7
    document.querySelector(".magazine-image"),
    //main8
    document.querySelector(".store-images"),
    document.querySelector(".store-content-images"),
    document.querySelector(".store-content a"),
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((el) => {
    if (el) {
      observer.observe(el);
    }
  });
});
