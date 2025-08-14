
    const CART_NOTICE = `<b>[이용안내]</b><br>
      • 극장별 재고 소진 시 구매가 취소될 수 있습니다.<br>
      • 제품 가격은 권장소비자가격으로 매장마다 차이가 있을 수 있습니다.<br>
      • 제품의 판매여부는 매장별로 상이할 수 있습니다.<br>
      • 상기 이미지는 실제 제품과 다소 차이가 있을 수 있습니다.<br><br>
      <b>옵션선택</b><br>
      <span class="detail-pickup-info">해당 상품은 바로 픽업만 가능한 상품입니다.</span><br>
      <span style="color:#888; font-size:0.96em;">
        • 나중에 픽업을 원하시면 다른 상품을 선택해 주세요.<br>
        • 지금 주문하고 상품 준비 후 바로 픽업 가능해요.
      </span>`;

    function renderCart() {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      let listBox = document.getElementById('cart-list');
      let emptyBox = document.getElementById('cart-empty');
      let total = 0;
      listBox.innerHTML = '';
      if(cart.length === 0){
        emptyBox.style.display = '';
        document.getElementById('cart-total').textContent = "총 0원";
        return;
      } else {
        emptyBox.style.display = 'none';
      }
      cart.forEach((item, idx) => {
        let sum = item.price * item.qty;
        total += sum;
        listBox.innerHTML += `
          <div class="cart-detail">
            <div class="detail-top">
              <div class="detail-img"><img src="${item.img}" alt="${item.name}"></div>
              <div class="detail-right">
                <div class="detail-prod-name">${item.name}</div>
                <div class="detail-desc">${item.desc || ''}</div>
                <div class="detail-price">${item.price.toLocaleString()}원</div>
                <div class="detail-notice">${CART_NOTICE}</div>
                <div class="detail-qty-box">
                  <button class="qty-btn" onclick="changeQty(${idx}, -1)">-</button>
                  <input type="text" class="qty-input" value="${item.qty}" readonly>
                  <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
                </div>
                <div class="detail-bottom-row">
                  <span class="prod-sum">합계: ${(sum).toLocaleString()}원</span>
                  <button class="prod-del-btn" onclick="removeItem(${idx})">🗑 삭제</button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      document.getElementById('cart-total').textContent = "총 " + total.toLocaleString() + "원";
    }
    function changeQty(idx, diff) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart[idx].qty += diff;
      if(cart[idx].qty < 1) cart[idx].qty = 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
    function removeItem(idx) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.splice(idx, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
    function clearCart() {
      localStorage.removeItem('cart');
      renderCart();
    }
    function checkout() {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if(cart.length === 0) {
        alert('장바구니가 비어있어요!');
        return;
      }
      if (window.loadPage) {
        window.loadPage('./html/pay.html');
      } else {
        window.location.href = "pay.html";
      }
    }
    
    renderCart();