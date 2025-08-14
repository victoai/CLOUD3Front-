
document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.querySelector(".login_info button");
  const idInput = document.querySelectorAll(".login_info input")[0];
  const pwInput = document.querySelectorAll(".login_info input")[1];

  loginBtn.addEventListener("click", function () {
    if (!idInput.value.trim()) {
      alert("아이디를 입력하세요");
    } else if (!pwInput.value.trim()) {
      alert("비밀번호를 입력하세요");
    } else {
      if (confirm("환영합니다")) {
        window.location.href = "./myPage.html"; // 확인 누르면 이동
      }
    }
  });
});




/*header*/
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



