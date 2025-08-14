// ================================
// 🎬 메인 영화/광고/콘서트 데이터
// ================================
let movie_list = [
  {
    type: "ad",
    title: "CGV 관람권 쿠폰 받자!",
    subTitle: "결제내역 확인하고",
    description: "CGV 관람권 받기",
    buttonText: "자세히 보기",
    image: "main_ad.webp"
  },
  {
    type: "movie",
    rank: 1,
    title: "극장판 귀멸의 칼날: 무한성편",
    grade: "15",
    reservationRate: "29.2%",
    releaseDate: "2025.08.22",
    buttonText: "예매하기",
    image: "귀멸의 칼날.jpg"
  },
  {
    type: "movie",
    rank: 2,
    title: "좀비딸",
    grade: "12",
    score: "92%",
    reservationRate: "18.9%",
    totalAudience: "222.3만",
    buttonText: "예매하기",
    image: "좀비딸.jpg"
  },
  {
    type: "ad",
    title: "죽은 자를 부르는 강령숲",
    subTitle: "울여름 함께하지 않을래?",
    releaseDate: "2025.08.06",
    buttonText: "자세히 보기",
    image: "강령.webp"
  },
  {
    type: "movie",
    rank: 3,
    title: "F1 더 무비",
    grade: "12",
    score: "99%",
    reservationRate: "11.6%",
    totalAudience: "322만",
    buttonText: "예매하기",
    image: "F1.jpg"
  },
  {
    type: "concert",
    title: "요루시카 라이브 2024 [전생]",
    ICECON: true,
    grade: "전체관람가",
    date: "2025.09.10",
    venue: "올림픽 체조경기장",
    buttonText: "예매하기",
    image: "요루시카.jpg"
  },
  {
    type: "concert",
    title: "[씨네뮤지엄] 오르세 미술관",
    ICECON: true,
    grade: "전체관람가",
    date: "2025.09.01",
    venue: "CGV 아트하우스",
    buttonText: "상세보기",
    image: "오르세.jpg"
  },
  {
    type: "concert",
    title: "[씨네뮤지엄] 나는 이렇게 기억되고 싶다, 렘브란트",
    ICECON: true,
    grade: "15",
    date: "2025.09.01",
    venue: "CGV ICECON관",
    buttonText: "상세보기",
    image: "렘브란트.jpg"
  },
  {
    type: "concert",
    title: "뮤지컬 라파치니의 정원",
    ICECON: true,
    grade: "12",
    date: "2025.09.01",
    venue: "CGV 뮤지컬관",
    buttonText: "상세보기",
    image: "라파치니.jpg"
  }
];

let currentSlide = 0;
const cardsPerView = 1;

// ================================
// 📁 섹션 및 탭 DOM 요소 참조
// ================================
const tabs = document.querySelectorAll('.home_menu_li');
const movieSection = document.querySelector('.movie_sub');
const eventSection = document.querySelector('.event');
const activitySection = document.querySelector('.activity');

// ================================
// 🖱️ 탭 클릭 이벤트 (메뉴 전환)
// ================================
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // 모든 섹션 숨김
    movieSection.style.display = 'none';
    eventSection.style.display = 'none';
    activitySection.style.display = 'none';

    // 선택된 섹션만 표시
    if (index === 0) movieSection.style.display = 'block';
    if (index === 1) eventSection.style.display = 'block';
    if (index === 2) activitySection.style.display = 'block';
  });
});

// 초기 상태: 영화 섹션만 표시
movieSection.style.display = 'block';
eventSection.style.display = 'none';
activitySection.style.display = 'none';

// ================================
// 🎞️ 영화 필터 탭 클릭 이벤트
// ================================
const movie_sub_first_menu_front_li = document.querySelectorAll('.movie_sub_first_menu_front_li');

movie_sub_first_menu_front_li.forEach((element, index) => {
  element.addEventListener('click', () => {
    movie_sub_first_menu_front_li.forEach(t => t.classList.remove('active'));
    element.classList.add('active');

    // 필터링 로직
    let filtered = movie_list;

    if (index === 1) {
      filtered = movie_list.filter(movie => movie.type === "movie");
    } else if (index === 2) {
      filtered = movie_list.filter(movie => movie.ICECON === true);
    }

    mainMovieChart(filtered);
  });
});

// ================================
// 🎥 메인 영화 카드 렌더링 함수
// ================================
function mainMovieChart(filtered) {
  currentSlide = 0;
  const movieGridMain = document.querySelector('.movie_grid_main');

  movieGridMain.innerHTML = `
    <div class="next_grid_prev">&#10094;</div>
    <div class="movie_slider"></div>
    <div class="movie_grid_next">&#10095;</div>
  `;

  const movieSlider = movieGridMain.querySelector('.movie_slider');

  filtered.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie_card';

    // 유형에 따라 템플릿 분기
    if (movie.type === "movie") {
      card.innerHTML = `
        <img src="./images/home/${movie.image}" alt="${movie.title}">
        <p><strong>${movie.rank}. ${movie.title}</strong></p>
        <p>예매율: ${movie.reservationRate}</p>
        <p>관람등급: ${movie.grade}</p>
        <button>${movie.buttonText}</button>
      `;
    } else if (movie.type === "ad") {
      card.innerHTML = `
        <img src="./images/home/${movie.image}" alt="${movie.title}">
        <p><strong>${movie.title}</strong></p>
        <p>${movie.subTitle ?? ""}</p>
        <p>${movie.description ?? ""}</p>
        <button>${movie.buttonText}</button>
      `;
    } else if (movie.type === "concert") {
      card.innerHTML = `
        <img src="./images/home/${movie.image}" alt="${movie.title}">
        <p><strong>${movie.title}</strong></p>
        <p>날짜: ${movie.date}</p>
        <p>장소: ${movie.venue}</p>
        <button>${movie.buttonText}</button>
      `;
    }

    movieSlider.appendChild(card);
  });

  // 슬라이드 버튼 이벤트
  const prevBtn = movieGridMain.querySelector('.next_grid_prev');
  const nextBtn = movieGridMain.querySelector('.movie_grid_next');

  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider(movieSlider);
    }
  });

  nextBtn.addEventListener('click', () => {
    const maxSlide = movie_list.length - 3;
    if (currentSlide < maxSlide) {
      currentSlide++;
      updateSlider(movieSlider);
    }
  });

  updateSlider(movieSlider);
}

// 슬라이더 위치 업데이트
function updateSlider(slider) {
  const slideWidth = 220;
  slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// ================================
// 🍦 ICECON 콘서트 카드 슬라이더
// ================================
const iceconMovies = movie_list.filter(movie => movie.ICECON === true);
const slider = document.querySelector('.ICECON_movie_slider');
const prevBtn = document.querySelector('.ICECON_movie_grid_prev');
const nextBtn = document.querySelector('.ICECON_movie_grid_next');

const cardWidth = 220;
let currentIndex = 0;

// ICECON 카드 렌더링
function renderICECONCards() {
  slider.innerHTML = iceconMovies.map(movie => `
    <div class="ICECON_movie_card">
      <img src="./images/home/${movie.image}" alt="${movie.title} 포스터" />
      <p><strong>${movie.title}</strong></p>
      <p>날짜: ${movie.date}</p>
      <p>장소: ${movie.venue}</p>
      <p>관람등급: ${movie.grade}</p>
      <button>${movie.buttonText}</button>
    </div>
  `).join('');
}

// ICECON 슬라이더 위치 업데이트
function updateICECONSlider() {
  const maxIndex = iceconMovies.length - 3;
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  slider.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
}

// 슬라이드 버튼
prevBtn.addEventListener('click', () => {
  currentIndex--;
  updateICECONSlider();
});

nextBtn.addEventListener('click', () => {
  currentIndex++;
  updateICECONSlider();
});

// ================================
// 🎉 이벤트 슬라이더
// ================================
const cgv_event_list = [
  { event_no: 1, event_name: "광복 80주년 캠페인 <처음 듣는 광복> 단독 개봉", file_name: "event_ad1.jpg" },
  { event_no: 2, event_name: "6일사이즈 - 개봉주차 현장 득점 이벤트", file_name: "event_ad2.jpg" },
  { event_no: 3, event_name: "백스테이지 CGV 단독 개봉주 무대인사", file_name: "event_ad3.jpg" },
  { event_no: 4, event_name: "6일사이즈 - 포토존 인증 이벤트", file_name: "event_ad4.jpg" },
  { event_no: 5, event_name: "백스테이지 단독 개봉 및 현장 이벤트 안내", file_name: "event_ad5.jpg" },
  { event_no: 6, event_name: "6일사이즈 - 개봉 기념 무대인사", file_name: "event_ad6.jpg" }
];

let eventIndex = 0;

// 이벤트 카드 렌더링 (슬라이더용)
function renderEventCards() {
  const slider = document.querySelector('.event_slider');
  slider.innerHTML = '';

  cgv_event_list.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event_card';
    card.innerHTML = `
      <img src="./images/home/${event.file_name}" alt="${event.event_name}" />
    `;
    slider.appendChild(card);
  });

  updateEventSlider();
}

// 슬라이더 이동 처리
function updateEventSlider() {
  const slider = document.querySelector('.event_slider');
  const cardCount = cgv_event_list.length;
  const visibleCount = 3;
  const maxIndex = Math.ceil(cardCount / visibleCount) - 1;

  if (eventIndex < 0) eventIndex = 0;
  if (eventIndex > maxIndex) eventIndex = maxIndex;

  const moveX = -(eventIndex * 100);
  slider.style.transform = `translateX(${moveX}%)`;
}

// 슬라이더 버튼 이벤트
document.querySelector('.event_arrow_left').addEventListener('click', () => {
  eventIndex--;
  updateEventSlider();
});

document.querySelector('.event_arrow_right').addEventListener('click', () => {
  eventIndex++;
  updateEventSlider();
});

// 이벤트 리스트 카드 렌더링 (그리드용)
function renderEventCards_list() {
  const eventGrid = document.querySelector('.event_grid_list');
  eventGrid.innerHTML = '';

  cgv_event_list.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event_card_list';
    card.innerHTML = `
      <img src="./images/home/${event.file_name}" alt="${event.event_name}" />
      <div class="event_card_title_list">${event.event_name}</div>
    `;
    eventGrid.appendChild(card);
  });
}

const script = document.createElement('script');
  script.src = "https://widget.tagembed.com/embed.min.js";
  script.type = "text/javascript";
  script.onload = () => {
    console.log("✅ TagEmbed 스크립트 로드됨");
    if (window.TagEmbed && typeof window.TagEmbed.init === "function") {
      window.TagEmbed.init();
    } else {
      console.error("❌ TagEmbed.init() 호출 실패 - 객체 없음");
    }
  };
  document.head.appendChild(script);

// ================================
// 🟢 초기 렌더링 실행
// ================================
renderEventCards();
renderEventCards_list();
renderICECONCards();
updateICECONSlider();
mainMovieChart(movie_list);
