console.log('store.js loaded');
const STORE_PRODUCTS = {
  popcorn: {
    new: [
      { name: "[신메뉴] Big 컵냉면", img: "../images/store/Big컵냉면.png", price: "7,500원", desc: "시원함 BEST" },
      { name: "[신메뉴] 홈런 콜팝", img: "../images/store/홈런콜팝.png", price: "15,500원", desc: "스낵과 음료를 한 손으로!" },
      { name: "[신메뉴] 고추참치맛팝콘", img: "../images/store/고추참치맛팝콘.png", price: "6,500원", desc: "매콤달달한 감칠맛 폭발!" },
      { name: "[신메뉴] 만루홈런세트", img: "../images/store/만루홈런세트.png", price: "29,000원", desc: "짜릿하고 든든하게!" },
    ],
    combo: [
      { name: "방탄소년단 아미컵세트", img: "../images/store/방탄소년단아미컵세트.png", price: "15,900원", desc: "영롱한 아미밤이 콜드컵으로!" }
    ],
    popcorn: [
      { name: "시그니처팝콘", img: "../images/store/시그니처팝콘.png", price: "4,500원", desc: "팝콘 맛집 CGV의 시그니처 팝콘" }
    ],
    drink: [
      { name: "셀프 탄산(M)", img: "../images/store/셀프탄산.png", price: "3,500원", desc: "원하는 맛으로 시원하게!" },
      { name: "디카페인 콜드블루", img: "../images/store/디카페인콜드블루.png", price: "5,500원", desc: "디카페인으로 가볍게 한 잔" }
    ],
    snack: [
      { name: "칠리치즈나초", img: "../images/store/칠리치즈나초.png", price: "5,500원", desc: "나초1+칠리소스1+치즈소스1" }
    ],
    goods: [
      { name: "귀멸의 칼날 코스튬 뱃지 2탄", img: "../images/store/귀멸의칼날뱃지.png", price: "10,000원", desc: "캐릭터15종 중 1종 랜덤 증정!" }
    ],
  },
  cinepub: {
    new: [
      { name: "[신메뉴] 맥주&치킨콤보", img: "https://img.cgv.co.kr/GiftStore/Product/Pc/List/16842978119480.jpg", price: "13,000원", desc: "맥주와 치킨" }
    ],
    combo: [],
    popcorn: [],
    drink: [],
    snack: [],
    goods: [],
  },
  photoplay: {
    new: [
      { name: "[신메뉴] 포토티켓", img: "https://img.cgv.co.kr/GiftStore/Product/Pc/List/16812671225790.jpg", price: "3,000원", desc: "포토플레이 신규" }
    ],
    combo: [],
    popcorn: [],
    drink: [],
    snack: [],
    goods: [],
  }
};

let midCategory = 'popcorn', subCategory = 'new', sortType = 'recommend', cartCount = 0;

function renderStoreList() {
  const prodList = STORE_PRODUCTS[midCategory][subCategory] || [];
  const listBox = document.getElementById('store-list');
  listBox.innerHTML = "";
  prodList.forEach(prod => {
    listBox.innerHTML += `
      <div class="store-item">
        <img src="${prod.img}" alt="${prod.name}" />
        <h3>${prod.name}</h3>
        <p>${prod.desc}</p>
        <span>${prod.price}</span>
        <button class="add-btn">담기</button>
      </div>
    `;
  });

  document.querySelectorAll('.add-btn').forEach((btn, idx) => {
    btn.onclick = () => {
      const prodList = STORE_PRODUCTS[midCategory][subCategory] || [];
      const prod = prodList[idx];
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      // 같은 이름/지점 상품 있으면 qty만 +1, 없으면 새로 추가
      let exist = cart.find(item => item.name === prod.name);
      if (exist) {
        exist.qty += 1;
      } else {
        cart.push({
          name: prod.name,
          img: prod.img,
          price: parseInt(prod.price.replace(/[^0-9]/g,'')),
          desc: prod.desc,
          qty: 1
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      // 장바구니 창으로 이동
      if (window.loadPage) {
        window.loadPage('./html/cart.html'); // SPA 방식
      } else {
        window.location.href = "cart.html"; // 직접 실행용
      }
    };
  });
   
}

function storeInit() {
  renderStoreList();

  // 중분류(팝콘팩토리/씨네펍/포토플레이) 탭
  document.querySelectorAll('.mid-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.mid-btn').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      midCategory = btn.dataset.category;
      renderStoreList();
    };
  });

  // 소분류(신메뉴/콤보/팝콘...) 탭
  document.querySelectorAll('.sub-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.sub-btn').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      subCategory = btn.dataset.sub;
      renderStoreList();
    };
  });

  // 정렬 탭
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.sort-btn').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      sortType = btn.dataset.sort;
      renderStoreList();
    };
  });

  // 하단 픽업 버튼
  const orderBtn = document.getElementById('order-btn');
  if(orderBtn){
    orderBtn.onclick = () => {
      if(cartCount === 0) {
        alert('장바구니에 상품을 담아주세요!');
      } else {
        alert('픽업 주문이 접수되었습니다!');
        cartCount = 0;
        document.getElementById('cart-count').textContent = cartCount;
      }
    };
  }
}

// **여기가 진짜 핵심!!**
storeInit();