const searchButtonEvent = () => {
    const searchText = document.getElementById('searchText').value;
    searchSong(searchText);
}

const searchSong = searchText => {
    fetch(`https://api.lyrics.ovh/suggest/:${searchText}`)
        .then(res => res.json())
        .then(data => displaySong(data.data))
}

const displaySong = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML =' ';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';

        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
    })
}

//using async await 
const getLyrics = async (artist, title) =>{
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await res.json();
    displayLyrics(data.lyrics)

    //USING THEN 
    
    // fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    // .then(res => res.json())
    // .then(data => displayLyrics(data.lyrics))
}

const displayLyrics = lyrics =>{
    const displayLyricsArea = document.getElementById('lyrics-display-area')
    displayLyricsArea.innerText = lyrics;
}