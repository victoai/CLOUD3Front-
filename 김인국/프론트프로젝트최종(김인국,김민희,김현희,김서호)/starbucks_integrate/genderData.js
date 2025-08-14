// 메인 컨텐츠4 - 성별 데이터
export const genderData = {
  male: {
    // 카테고리 subtitle 데이터
    categorySubtitles: {
      drinks: ["에스프레소", "프라푸치노", "블렌디드"],
      foods: ["브레드", "케이크", "샌드위치&샐러드"],
      beans: ["스타벅스 원두", "리저브 원두", "스타벅스 비아"],
    },
    drinks: [
      {
        name: "아이스 카페 아메리카노",
        image: "./images/drink1.jpg",
        rank2: "아이스 카페 라떼",
        rank3: "카페 아메리카노",
      },
      {
        name: "자몽 망고 코코 프라푸치노",
        image: "./images/drink2.jpg",
        rank2: "P 자바칩 프라푸치노",
        rank3: "카페 브륄레 프라푸치노",
      },
      {
        name: "망고 바나나 프라푸치노",
        image: "./images/drink3.jpg",
        rank2: "딸기 딜라이트 요거트 블렌디드",
        rank3: "피치 요거트 블렌디드",
      },
    ],
    foods: [
      {
        name: "우리 단팥 크림 소라빵",
        image: "./images/bread1.jpg",
        rank2: "바게트 소금빵",
        rank3: "탕종 블루베리 베이글",
      },
      {
        name: "멜론쿠헨",
        image: "./images/bread2.jpg",
        rank2: "생크림 카스텔라 ",
        rank3: "진한 가나슈9 레이어 케이크",
      },
      {
        name: "렌위치 Y 샌드위치",
        image: "./images/bread3.jpg",
        rank2: "멜팅 치즈 베이컨 토스트",
        rank3: "에그 클럽 샌드위치",
      },
    ],
    beans: [
      {
        name: "디카페인 하우스 블렌드 250",
        image: "./images/coffee1.jpg",
        rank2: "보야지 블렌드 250",
        rank3: "에스프레소 로스트 250",
      },
      {
        name: "콜롬비아 나리노",
        image: "./images/coffee2.jpg",
        rank2: "하우스 블렌드 250",
        rank3: "커마 250",
      },
      {
        name: "비아 이탈리아 로스트 12개입",
        image: "./images/coffee3.jpg",
        rank2: "비아 아이스 커피 5개입",
        rank3: "비아 말차 아이스 5개입",
      },
    ],
  },
  female: {
    // 카테고리 subtitle 데이터 추가
    categorySubtitles: {
      drinks: ["에스프레소", "블렌디드", "콜드브루"],
      foods: ["브레드", "케이크", "샌드위치"],
      beans: ["스타벅스 원두", "스타벅스 비아", "스타벅스 리저브"],
    },
    drinks: [
      {
        name: "아이스 카페 아메리카노",
        image: "./images/drink1.jpg",
        rank2: "아이스 카페 라떼",
        rank3: "마카다미아 아이스 라뗴",
      },
      {
        name: "제주 말차 자바칩 프라푸치노",
        image: "./images/drink4.jpg",
        rank2: "자몽 망고 코코 프라푸치노",
        rank3: "카페 브륄레 프라푸치노",
      },
      {
        name: "피치 요거트 블렌디드",
        image: "./images/drink5.jpg",
        rank2: "딸기 딜라이트 요거트 블렌디드",
        rank3: "제주 말차 요거트 블렌디드",
      },
    ],
    foods: [
      {
        name: "바게트 소금빵",
        image: "./images/bread4.jpg",
        rank2: "우리 단팥 크림 소라빵",
        rank3: "탕종 블루베리 베이글",
      },
      {
        name: "멜론쿠헨",
        image: "./images/bread2.jpg",
        rank2: "생크림 카스텔라",
        rank3: "블루베리 마블 치즈 케이크",
      },
      {
        name: "렌위치 Y 샌드위치",
        image: "./images/bread3.jpg",
        rank2: "멜팅 치즈 베이컨 토스트",
        rank3: "햄 루꼴라 페스토 샌드위치",
      },
    ],
    beans: [
      {
        name: "에스프레소 로스트 250",
        image: "./images/coffee4.jpg",
        rank2: "카페 베로나 250",
        rank3: "별다방 블렌드 250",
      },
      {
        name: "파푸아 뉴 기니아 모안티 P250",
        image: "./images/coffee5.jpg",
        rank2: "콜롬비아 나리노 250",
        rank3: "커마 250",
      },
      {
        name: "비아 아이스커피 5개입",
        image: "./images/coffee1.jpg",
        rank2: "비아 말차 5개입",
        rank3: "비아 호지차 5개입",
      },
    ],
  },
};



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
