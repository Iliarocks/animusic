const db = firebase.database();

// get anime list from database and runs loadGenre function
const load = () => {
    db.ref('/anime').once('value', snap => {
        const genres = ['shonen', 'isekai'];
        const anime = Object.values(snap.val()).sort((a, b) => b.likes - a.likes);
        genres.forEach(genre => loadGenre(genre, anime.filter(show => show.genre == genre).slice(0, 11)));
    })
}

// adds list of anime in cetain genre to html
const loadGenre = (genre, anime) => {
    const animeHTML = anime.reduce((html, show) => {
        return html + `<li><a href="/anime/${show.en_name}">${show.en_name} | ${show.jap_name}</a></li>`
    }, '')
    document.querySelector('.anime').innerHTML += `<h1>${genre}</h1><ul>${animeHTML}</ul>`
}

// adds anime to database
const addAnime = (en, jap, genre) => {
    db.ref(`/anime/${en}`).set({
        en_name: en,
        jap_name: jap,
        genre: genre,
        likes: 0
    })
    console.log(`${en} has been added!`)
}

window.addEventListener('load', load);

document.querySelector('#add').addEventListener('click', e => {
    const en = document.querySelector('#en').value.toLowerCase();
    const jap = document.querySelector('#jap').value.toLowerCase();
    const genre = document.querySelector('#genres').value;
    addAnime(en, jap, genre);
})