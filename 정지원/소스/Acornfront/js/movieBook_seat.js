const maxTotal = 8;
const totalCountDisplay = document.getElementById('totalCount');
const audienceGroups = document.querySelectorAll('.audience-group');

const selections = {
    adult: 0,
    teen: 0,
    special: 0,
    elder: 0,
};

function updateTotal() {
    const sum = Object.values(selections).reduce((a, b) => a + b, 0);
    totalCountDisplay.textContent = sum;

    // 최대 8명 넘지 않도록 버튼 disabled 처리
    audienceGroups.forEach(group => {
        const type = group.dataset.type;
        const buttons = group.querySelectorAll('button');
        buttons.forEach(btn => {
            const val = Number(btn.textContent);
            btn.disabled = (sum - selections[type] + val) > maxTotal;
            if (btn.disabled) {
                btn.style.cursor = 'not-allowed';
                btn.style.opacity = '0.4';
            } else {
                btn.style.cursor = 'pointer';
                btn.style.opacity = '1';
            }
        });
    });
}

function handleButtonClick(event) {
    if (!event.target.matches('button')) return;

    const btn = event.target;
    const group = btn.closest('.audience-group');
    const type = group.dataset.type;
    const val = Number(btn.textContent);

    // 이미 선택된 버튼 클릭 시 선택 해제
    if (btn.classList.contains('selected')) {
        btn.classList.remove('selected');
        selections[type] = 0;
    } else {
        // 해당 그룹 버튼들 선택 해제
        group.querySelectorAll('button.selected').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selections[type] = val;
    }

    updateTotal();
}

audienceGroups.forEach(group => {
    group.querySelector('.number-buttons').addEventListener('click', handleButtonClick);
});

// 초기 상태 업데이트
updateTotal();

const seatsMainBtn = document.getElementById('seats-mainBtn');
const modal = document.getElementById('seatSelectionModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const confirmSeatsBtn = document.getElementById('confirmSeatsBtn');
const seatGrid = modal.querySelector('.seat-grid');
const totalCountEl = document.getElementById('totalCount');

let maxSeats = 0;  // 최대 선택할 수 있는 좌석 수
let selectedSeats = new Set();

function openSeatModal() {
    modal.classList.add('show');
}

function closeSeatModal() {
    modal.classList.remove('show');
    clearSeatSelection();
}

function clearSeatSelection() {
    selectedSeats.clear();
    confirmSeatsBtn.disabled = true;
    confirmSeatsBtn.classList.remove('enabled');
    Array.from(seatGrid.children).forEach(btn => {
        btn.classList.remove('selected');
        btn.disabled = false;
        btn.classList.remove('disabled');
    });
}

function updateConfirmBtn() {
    if (selectedSeats.size > 0) {
        confirmSeatsBtn.disabled = false;
        confirmSeatsBtn.classList.add('enabled');
    } else {
        confirmSeatsBtn.disabled = true;
        confirmSeatsBtn.classList.remove('enabled');
    }
}

const seatLayout = [
    [null, null, 1, 1, null, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1, 1],
    [1, 1, 1, 1, null, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1, 1],
    [1, 1, 1, 1, null, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1, 1],
    [1, 1, 1, 1, null, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1, 1],
    [1, 1, 1, 1, null, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1, 1],
    [1, 1, 1, 1, null, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1, 1],
    [null, null, null, null, null, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1, 1],
    [null, null, null, null, null, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1, 1],
    [null, null, null, null, null, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1, 1],
    [1, 1, 1, 1, null, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1, 1],
    [1, 1, 1, 1, null, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1, 1],
    [1, 1, 1, 1, null, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1, 1],
    [1, 1, 1, 1, null, 1, 1, null, null, null, 1, 1, null, 1, 1, 1, 1],
];

function createSeatsByLayout(seatLayout) {
    seatGrid.innerHTML = '';
    selectedSeats.clear();
    const rowNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < seatLayout.length; i++) {
        let seatNumInRow = 1; // <--- 각 행 마다 실제 좌석 번호 카운터
        for (let j = 0; j < seatLayout[i].length; j++) {
            if (seatLayout[i][j]) {
                const seatNum = rowNames[i] + seatNumInRow; // "A1", "A2" 등
                seatNumInRow++; // 좌석일 때만 +1
                const seatBtn = document.createElement('button');
                seatBtn.type = 'button';
                seatBtn.textContent = seatNum;
                seatBtn.className = 'seat-btn';
                seatBtn.addEventListener('click', () => {
                    if (seatBtn.disabled) return;
                    if (selectedSeats.has(seatNum)) {
                        selectedSeats.delete(seatNum);
                        seatBtn.classList.remove('selected');
                    } else {
                        if (selectedSeats.size < maxSeats) {
                            selectedSeats.add(seatNum);
                            seatBtn.classList.add('selected');
                        } else {
                            alert(`최대 ${maxSeats}명까지 좌석 선택이 가능합니다.`);
                        }
                    }
                    updateConfirmBtn();
                });
                seatGrid.appendChild(seatBtn);
            } else {
                const nullDiv = document.createElement('div');
                nullDiv.className = 'seat-null';
                seatGrid.appendChild(nullDiv);
            }
        }
    }
}



seatsMainBtn.addEventListener('click', () => {
    const totalSelected = Number(totalCountEl.textContent) || 0;
    if (totalSelected === 0) {
        alert('관람 인원을 선택해주세요.');
        return;
    }
    maxSeats = totalSelected;
    // 기존 createSeats(totalSeats) → 변경!
    createSeatsByLayout(seatLayout);
    openSeatModal();
});

// 닫기 버튼 이벤트
closeModalBtn.addEventListener('click', () => {
    closeSeatModal();
});

confirmSeatsBtn.addEventListener('click', () => {
    if (selectedSeats.size === 0) {
        alert('선택된 좌석이 없습니다.');
        return;
    }
    alert(`선택된 좌석: ${[...selectedSeats].sort((a, b) => a - b).join(', ')}`);
    closeSeatModal();
});