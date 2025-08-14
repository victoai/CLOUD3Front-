🎤 발표자료: CGV 클론 웹페이지 개발 발표
1. 🧩 프로젝트 개요
    목표: CGV 웹사이트를 클론하여 실제 영화 사이트처럼 구성해보는 연습 프로젝트

    기술 스택

        HTML / CSS / JavaScript (Vanilla JS)

        반응형 레이아웃 일부 구현

        슬라이더 및 탭 전환 효과 구현

2. 🧱 전체 구조

project-root/
├── css/
│   └── home.css        👉 홈 페이지 전용 스타일
│
├── html/
│   ├── home.html       👉 홈 콘텐츠 페이지 (핵심 화면)
│   ├── location.html   👉 위치 페이지
│   └── BACK/           👉 백업용 폴더
│
├── images/
│   ├── home/           👉 홈 페이지용 이미지
│   └── index/          👉 사이드바/광고 등  메인프레임 레이아웃 이미지 
│   
│
├── js/
│   └──  home.js         👉 홈 페이지 동작 담당 JS (핵심 기능)
│   
│
└── index.html          👉 웹사이트의 메인 틀 (전체 레이아웃)

🧭 발표 내용 정리
1. ✅ index.html의 화면 전환 방식 (AJAX 방식)
    핵심 개념:
    좌측 사이드바 메뉴 클릭 시 전체 페이지를 새로고침하지 않고,
    <section id="content"> 안에 다른 HTML 파일을 동적으로 불러오는 구조
    fetch()를 통해 HTML을 가져오고, 그 안의 <link>와 <script>도 직접 삽입

    이 구조의 장점:
    ✔️ 전체 페이지 새로고침 없이 부드러운 UX
    ✔️ 페이지 로딩 속도 개선
    ✔️ HTML/CSS/JS 분리 관리 가능 → 유지보수 용이
    ✔️ 프론트엔드 프레임워크처럼 작동하는 구조를 직접 구현

```javascript
    async function loadPage(url) {
        const content = document.getElementById('content');
        content.innerHTML = '<div class="skeleton">불러오는 중...</div>';

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('페이지 불러오기 실패');

            const html = await response.text();
            content.innerHTML = html;

            // CSS 처리
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const links = tempDiv.querySelectorAll('link[rel="stylesheet"]');
            links.forEach(link => {
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = link.href;
                document.head.appendChild(newLink);
            });

            // JS 처리
            const scripts = tempDiv.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) newScript.src = script.src;
                else newScript.textContent = script.textContent;
                document.body.appendChild(newScript);
            });

        } catch (error) {
            content.innerHTML = `<p style="color:red;">오류: ${error.message}</p>`;
        }
    }
```
2. ✅ 홈 페이지 탭 전환 기능 (home.js)
    핵심 개념:
    상단 메뉴(영화 / 이벤트 / 액티비티) 클릭 시,
    각 섹션을 보여주고 나머지는 display: none 처리
    .active 클래스로 UI 상태도 함께 전환

    발표 포인트:
    ✔️ 탭 전환 로직을 직접 구현해봄
    ✔️ 하나의 HTML 페이지 안에서 콘텐츠가 동적으로 바뀜

```javascript
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    movieSection.style.display = 'none';
    eventSection.style.display = 'none';
    activitySection.style.display = 'none';

    if (index === 0) movieSection.style.display = 'block';
    if (index === 1) eventSection.style.display = 'block';
    if (index === 2) activitySection.style.display = 'block';
  });
});
```
3. ✅ 슬라이더 구현 (무비차트 / ICECON)
    핵심 개념:
        movie_list 배열 데이터를 이용해 DOM에 카드 요소를 렌더링
        좌우 버튼 클릭 시 translateX로 슬라이드 효과 구현
```javascript
function updateSlider(slider) {
  const slideWidth = 220;
  slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}
```
        ICECON === true 조건 필터링도 포함됨
```javascript        
const iceconMovies = movie_list.filter(movie => movie.ICECON === true);
```
        발표 포인트:
        ✔️ JSON 구조로 데이터 설계 및 활용
        ✔️ 영화 / 광고 / 콘서트 데이터 타입에 따라 분기 렌더링 하여 레이아웃 제어
        ✔️ CSS 슬라이드와 JS 변수 조합 (currentSlide)
        ->슬라이드 기능은 JavaScript의 currentSlide라는 변수를 사용해 현재 위치를 계산하고,
            그 값을 CSS transform: translateX(...)에 넣어서 카드를 가로로 이동시키는 방식으로 구현


🧠 마무리 요약
이번 프로젝트를 통해 정적인 웹페이지가 아닌,
사용자 인터랙션에 따라 콘텐츠가 동적으로 바뀌는 구조를 직접 구현해보면서,
SPA의 기본 개념, 슬라이더 동작, 그리고 코드 분리와 재사용성까지 체험할 수 있었습니다.