   // --- 주문 상품 출력 (localStorage의 cart 활용) ---
    function renderOrderProducts() {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      let prodList = document.getElementById('prod-list');
      let sum = 0;
      let html = "";
      cart.forEach(item => {
        let option = item.option || "1개";
        html += `
          <div class="prod-card">
            <img src="${item.img}" class="prod-img" alt="${item.name}" />
            <div class="prod-info">
              <div class="prod-name">${item.name}</div>
              <div class="prod-desc">${item.desc || ''}</div>
              <div class="prod-option">옵션: ${option}</div>
              <div class="prod-price">${item.price.toLocaleString()}원 × ${item.qty} = <b>${(item.price*item.qty).toLocaleString()}원</b></div>
            </div>
          </div>
        `;
        sum += item.price * item.qty;
      });
      prodList.innerHTML = html || "<div style='color:#aaa; text-align:center;'>주문 상품이 없습니다.</div>";
      // 결제 금액 표시
      document.getElementById('sum-prod').textContent = sum.toLocaleString()+"원";
      document.getElementById('sum-total').textContent = sum.toLocaleString()+"원";
      // 적립 포인트 예시 계산 (1.5%)
      document.getElementById('point1').textContent = Math.floor(sum * 0.015).toLocaleString() + "원";
    }
    renderOrderProducts();

    document.getElementById('order-form').onsubmit = function(e) {
      e.preventDefault();
      document.getElementById('pay-modal').style.display = 'flex';
      setTimeout(() => {
        localStorage.removeItem('cart');
        if (window.loadPage) {
          window.loadPage('../html/store.html');
        } else {
          window.location.href = "store.html";
        }
      }, 5000);
    };
    storeInit();
    renderCart();