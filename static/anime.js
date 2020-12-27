const db = firebase.database();
const currentAnime = anime;

const load = () => {
    db.ref(`/anime/${anime}/songs`).once('value', snap => {
        if (!snap.val()) return;
        const songs = Object.values(snap.val());
        const songsHTML = songs.reduce((html, song) => html + song.embedded, '');
        document.querySelector('.songs').innerHTML = songsHTML
    })
}

// adds song to database
const addSong = embedded => {
    db.ref(`/anime/${anime}/songs`).push({ embedded });
    console.log('song has been added!')
}

window.addEventListener('load', load);

document.querySelector('#add').addEventListener('click', e => {
    const embedded = document.querySelector('#spotify').value;
    addSong(embedded)
})