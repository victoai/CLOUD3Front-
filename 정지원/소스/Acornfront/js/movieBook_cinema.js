// 영화 목록
const movies = [
  {
    title: "극장판 귀멸의 칼날: 무한성편",
    poster: "./images/ticket/movieImg1.jpg",
    screenings: [
      { hall: "1관", type: "SCREENX", time: "09:50~12:35", seats: "178/178석" },
      { hall: "1관", type: "SCREENX", time: "12:55~15:40", seats: "178/178석" },
      { hall: "1관", type: "SCREENX", time: "16:00~18:45", seats: "178/178석" },
      { hall: "1관", type: "SCREENX", time: "19:05~21:50", seats: "178/178석" }

    ]
  },
  {
    title: "좀비딸",
    poster: "./images/ticket/movieImg2.jpg",
    screenings: [
      { hall: "3관", type: "2D", time: "09:50~12:35", seats: "50/100석" },
      { hall: "3관", type: "2D", time: "12:55~15:40", seats: "80/100석" },
      { hall: "3관", type: "2D", time: "16:00~18:45", seats: "90/100석" },
      { hall: "3관", type: "2D", time: "19:05~21:50", seats: "100/100석"}
    ]
  },
  {
    title: "F1 더 무비",
    poster: "./images/ticket/movieImg3.jpg",
    screenings: [
      { hall: "3관", type: "2D", time: "09:50~12:35", seats: "50/100석" },
      { hall: "3관", type: "2D", time: "12:55~15:40", seats: "80/100석" },
      { hall: "3관", type: "2D", time: "16:00~18:45", seats: "90/100석" },
      { hall: "3관", type: "2D", time: "19:05~21:50", seats: "100/100석"}
    ]
  },
  {
    title: "식스데이즈(6DAYS)",
    poster: "./images/ticket/movieImg4.jpg",
    screenings: [
      { hall: "3관", type: "2D", time: "13:00~15:00", seats: "50/100석" },
      { hall: "3관", type: "2D", time: "16:00~18:00", seats: "80/100석" },
      { hall: "3관", type: "2D", time: "21:30~23:50", seats: "80/100석" }
    ]
  }
];

// 영화 리스트 생성
function renderMovieList(movies) {
  const container = document.getElementById('movie-list');
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    const movieTitleDiv = document.createElement('div');
    movieTitleDiv.classList.add('movie-title');

    const posterImg = document.createElement('img');
    posterImg.src = movie.poster;
    posterImg.alt = movie.title;
    posterImg.classList.add('movie-poster');

    movieTitleDiv.appendChild(posterImg);
    movieTitleDiv.appendChild(document.createTextNode(movie.title));

    movieItem.appendChild(movieTitleDiv);

    if (movie.screenings.length > 0) {
      const firstScreening = movie.screenings[0];
      const hallSpan = document.createElement('span');
      hallSpan.classList.add('hall');
      hallSpan.textContent = firstScreening.hall + (firstScreening.type ? `[${firstScreening.type}]` : '');
      movieItem.appendChild(hallSpan);
    }

    const screeningDiv = document.createElement('div');
    screeningDiv.classList.add('screenings');

    movie.screenings.forEach(sc => {
      const screeningRow = document.createElement('div');
      screeningRow.classList.add('screening-row');

      screeningRow.addEventListener('click', () => {
        const url = `/desired-page?movie=${encodeURIComponent(movie.title)}&time=${encodeURIComponent(sc.time)}`;
        loadPage('./html/movieBook_seat.html');
      });

      const timeSpan = document.createElement('span');
      timeSpan.classList.add('time');
      timeSpan.textContent = sc.time;

      const br = document.createElement('br');

      const seatsSpan = document.createElement('span');
      seatsSpan.classList.add('seats');
      seatsSpan.textContent = sc.seats;

      screeningRow.appendChild(timeSpan);
      screeningRow.appendChild(br);
      screeningRow.appendChild(seatsSpan);

      screeningDiv.appendChild(screeningRow);
    });

    movieItem.appendChild(screeningDiv);

    container.appendChild(movieItem);
  });

}

renderMovieList(movies);