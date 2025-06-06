const API_URL = 'https://6842a702e1347494c31d796b.mockapi.io/films';

const filmList = document.getElementById('film-list');
const addFilmForm = document.getElementById('add-film-form');

function deleteFilm(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    })
        .then(() => fetchFilms())
        .catch(() => {});
}

function createFilmItem(film) {
    const li = document.createElement('li');

    const info = document.createElement('span');
    info.textContent = `${film.title} (${film.year}) — ${film.genre}`;

    const delButton = document.createElement('button');
    delButton.textContent = 'Видалити';
    delButton.addEventListener('click', () => {
        deleteFilm(film.id);
    });

    li.appendChild(info);
    li.appendChild(delButton);

    return li;
}

function fetchFilms() {
    fetch(API_URL)
        .then((response) => response.json())
        .then((films) => {
            filmList.innerHTML = '';
            films.forEach((film) => {
                const li = createFilmItem(film);
                filmList.appendChild(li);
            });
        })
        .catch(() => {});
}

function addFilm(title, year, genre) {
    const newFilm = { title, year, genre };

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFilm),
    })
        .then((response) => response.json())
        .then((film) => {
            filmList.appendChild(createFilmItem(film));
        })
        .catch(() => {});
}

addFilmForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value.trim();
    const year = document.getElementById('year').value.trim();
    const genre = document.getElementById('genre').value.trim();

    if (title && year && genre) {
        addFilm(title, year, genre);
        addFilmForm.reset();
    }
});

fetchFilms();
