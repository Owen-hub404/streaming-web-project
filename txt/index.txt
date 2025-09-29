// // Prima
// const apiKey = "6ccb1147";

// // Dopo
// const apiKey = "f966c2fc";

// // terza
// const apiKey = "390901e0";

// // quarta
// const apiKey = "e81ba885";



const OMDB_API_KEY = "390901e0"; 
const YOUTUBE_API_KEY = "AIzaSyCWu6EsATgARl_rexVhUPwwQwPK6P_IpSo"; 



document.addEventListener("DOMContentLoaded", () => {
    sfoglia();
    search();
    initScroll();

    creaVideoInPrimoPiano();   
    caricaFilm();    
    caricaSerieTV(); 
});

function getCategoriesContainer() {
    let container = document.querySelector('.categories');
    if (!container) {
        container = document.createElement('div');
        container.className = 'categories';
        document.querySelector('main').appendChild(container);
    }
    return container;
}


//Funzione per creare dinamicamente il preview-container con allinterno il video
function creaVideoInPrimoPiano() {
    const main = document.querySelector("main");
    const previewContainer = document.createElement("div");
    previewContainer.id = "preview-container";

    const video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const source = document.createElement("source");
    source.src = "../video/interstellar.mp4";
    source.type = "video/mp4";
    video.appendChild(source);

    const overlay = document.createElement("div");
    overlay.id = "preview-overlay";

    const details = document.createElement("div");
    details.id = "preview-details";

    const title = document.createElement("h3");
    title.id = "preview-title";
    title.textContent = "Interstellar";

    const btnPlay = document.createElement("button");
    btnPlay.className = "btn-play";
    btnPlay.innerHTML = '<i class="fas fa-play"></i> Guarda';

    btnPlay.addEventListener('click', (e) => {
        e.stopPropagation();
        const trailerUrl = "https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1";

        let trailerModal = document.querySelector('.trailer-modal');
        if (!trailerModal) {
            trailerModal = document.createElement('div');
            trailerModal.className = 'trailer-modal';
            Object.assign(trailerModal.style, {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '2000'
            });
            document.body.appendChild(trailerModal);
        }

        trailerModal.innerHTML = `
            <div style="position: relative; width: 80%; max-width: 900px;">
                <iframe width="100%" height="500" src="${trailerUrl}" 
                    title="Trailer" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                <button class="btn btn-danger" style="position: absolute; top: 10px; right: 10px;">Chiudi</button>
            </div>
        `;

        trailerModal.style.display = 'flex';

        trailerModal.querySelector('button').addEventListener('click', () => {
            trailerModal.style.display = 'none';
            trailerModal.querySelector('iframe').src = ""; 
        });
    });


    const btnInfo = document.createElement("button");
    btnInfo.className = "btn-info";
    btnInfo.innerHTML = '<i class="fas fa-info"></i> Info';

    btnInfo.addEventListener('click', (e) => {
        e.stopPropagation();

        const film = {
            Title: "Interstellar",
            Year: "2014",
            Genre: "Adventure, Drama, Sci-Fi",
            Director: "Christopher Nolan",
            Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
            Plot: "Un gruppo di esploratori viaggia attraverso un wormhole nello spazio per garantire la sopravvivenza dell'umanità.",
            Poster: "../img/interstellar-poster.jpg",
            imdbRating: "8.6"
        };
        createModal(film);
    });



    const btnVolume = document.createElement("button");
    btnVolume.className = "btn-volumemute";
    btnVolume.innerHTML = '<i class="fas fa-volume-mute mr-auto"></i>';

    btnVolume.addEventListener('click', () => {
        const icon = btnVolume.querySelector('i');
        if (icon.classList.contains('fa-volume-up')) {
            video.muted = true;
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
        } else {
            video.muted = false;
            icon.classList.remove('fa-volume-mute');
            icon.classList.add('fa-volume-up');
        }
    });

    details.append(title, btnPlay, btnInfo, btnVolume);
    overlay.append(details);
    previewContainer.append(video, overlay);
    main.prepend(previewContainer);


}

//Apparizione del pulsante in basso a destra che ti riporta ad inizio pagina
function initScroll() {
    const button = document.createElement("button");
    Object.assign(button.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "none",
        zIndex: "1000"
    });
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(button);

    window.addEventListener("scroll", () => {
        const nav = document.getElementById("navbar");
        if (window.scrollY > 100) {
            nav.classList.add("scrolled");
            nav.classList.remove("transparent");
        } else {
            nav.classList.add("transparent");
            nav.classList.remove("scrolled");
        }
        button.style.display = window.scrollY > 500 ? "block" : "none";
    });

    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

//Funzione per ragruppare tutti i links nella pagina dentro un btn "sfoglia"
function sfoglia() {
    const sfogliaBtn = document.getElementById("sfogliaBtn");
    const navLinks = document.getElementById("nav_links");

    sfogliaBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navLinks.classList.toggle("show");
    });

    window.addEventListener("click", () => navLinks.classList.remove("show"));
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) navLinks.classList.remove('show');
    });
}


function search() {
    const searchIcon = document.getElementById("search-icon");
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "search-input";
    searchInput.placeholder = "Cerca film o serie...";
    Object.assign(searchInput.style, {
        display: "none",
        marginLeft: "10px",
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        outline: "none"
    });

    const searchContainer = document.getElementById("search-container");
    searchContainer.appendChild(searchInput);

    searchIcon.addEventListener("click", () => {
        if (searchInput.style.display === "none") {
            searchInput.style.display = "block";
            searchInput.focus();
        } else {
            searchInput.style.display = "none";
            searchInput.value = "";
        }
    });

    window.addEventListener("click", (e) => {
        if (!searchContainer.contains(e.target) && e.target !== searchIcon) {
            searchInput.style.display = "none";
            searchInput.value = "";
        }
    });

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) cercaFilm(query);
        }
    });
}

function creaCarousel(titolo, films, container, isSearch = false) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';

    const h3 = document.createElement('h3');
    h3.textContent = titolo;
    if (isSearch) h3.style.margin = "100px 0 20px";

    const carousel = document.createElement('div');
    carousel.className = 'carousel';

    if (isSearch) {
        Object.assign(carousel.style, {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            padding: "10px"
        });
        categoryDiv.append(h3, carousel);
    } else {
        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-wrapper';

        const leftBtn = document.createElement('button');
        leftBtn.className = 'arrow left';
        leftBtn.textContent = '‹';

        const rightBtn = document.createElement('button');
        rightBtn.className = 'arrow right';
        rightBtn.textContent = '›';

        wrapper.append(leftBtn, carousel, rightBtn);
        categoryDiv.append(h3, wrapper);

        leftBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -carousel.clientWidth * 0.8, behavior: 'smooth' });
        });
        rightBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: carousel.clientWidth * 0.8, behavior: 'smooth' });
        });
    }

    films.forEach((film, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = "film-container";
        if (isSearch) imgContainer.classList.add('search-result');

        const overlay = document.createElement('div');
        overlay.className = 'film-overlay';
        if (isSearch) overlay.style.opacity = 0;

        const title = document.createElement('h4');
        title.textContent = film.Title || 'Titolo Sconosciuto';

        const buttons = document.createElement('div');
        buttons.className = 'film-buttons';

        const playBtn = document.createElement('button');
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.title = 'Guarda trailer';

        const infoBtn = document.createElement('button');
        infoBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
        infoBtn.title = 'Info';

        playBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const query = `${film.Title} trailer`;
            const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                if (data.items && data.items.length > 0) {
                    const videoId = data.items[0].id.videoId;
                    const trailerUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                    openTrailerModal(trailerUrl);
                } else {
                    alert("Trailer non trovato su YouTube.");
                }
            } catch {
                alert("Impossibile caricare il trailer.");
            }
        });

        infoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            caricaDettagliFilm(film.imdbID);
        });

        const img = document.createElement('img');
        img.src = `${film.Poster !== 'N/A' ? film.Poster : '../img/image-not-found.png'}`;

        img.className = 'film';
        img.onerror = () => img.src = '../img/image-not-found.png';

        if (index === 0) imgContainer.classList.add('first');
        if (index === films.length - 1) imgContainer.classList.add('last');

        if (isSearch) {
        if (index === 0) imgContainer.classList.remove('first');
        if (index === films.length - 1) imgContainer.classList.remove('last');
    }

        buttons.append(playBtn, infoBtn);
        overlay.append(title, buttons);
        imgContainer.appendChild(img);
        imgContainer.appendChild(overlay);
        carousel.appendChild(imgContainer);
    });

    container.appendChild(categoryDiv);
}

function mostraMessaggio(testo, container) {
    const msg = document.createElement('p');
    msg.style.color = 'white';
    msg.style.padding = '50px';
    msg.style.fontStyle = 'bold';
    msg.style.fontSize = '30px';
    msg.style.marginTop = '100px';
    msg.textContent = testo;
    container.appendChild(msg);
}

function fetchMultiPage(apiUrl, query) {
    const promises = [1, 2].map(page =>
        fetch(`${apiUrl}${encodeURIComponent(query)}&page=${page}`)
            .then(res => res.json())
            .then(data => data.Response === "True" ? data.Search : [])
            .catch(() => [])
    );
    return Promise.all(promises).then(results => results.flat());
}

function caricaFilm() {
    const api = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=`;
    const generi = ['Action','Adventure','Comedy','Drama','Horror','Thriller','Romance','Fantasy','Mystery'];
    const container = getCategoriesContainer();
    generi.forEach(genere => {
        fetchMultiPage(api, genere).then(films => {
            if (films.length) creaCarousel(genere, films, container);
        });
    });
}

function caricaSerieTV() {
    const api = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&type=series&s=`;
    const generi = ['Action','Adventure','Comedy','Drama','Horror','Thriller','Romance','Fantasy','Mystery'];
    const container = getCategoriesContainer();
    generi.forEach(genere => {
        fetchMultiPage(api, genere).then(films => {
            if (films.length) creaCarousel(genere, films, container);
        });
    });
}

function cercaFilm(query) {
    const previewContainer = document.getElementById("preview-container");
    if (previewContainer) previewContainer.remove();

    const api = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=`;
    const container = getCategoriesContainer();
    container.innerHTML = '';
    fetchMultiPage(api, query).then(films => {
        if (films.length) {
            creaCarousel(`Risultati per "${query}"`, films, container, true);
        } else {
            mostraMessaggio(`Nessun risultato trovato per "${query}"`, container);
        }
    });
}

function createModal(film) {
    let modal = document.querySelector('.modal');
    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.className = 'modal modal--open'; 
    document.body.appendChild(modal);

    modal.innerHTML = `
        <div class="modal-dialog d-flex m-auto">
            <div class="modal-content m-auto">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold fs-1">${film.Title || "Titolo non disponibile"} (${film.Year || "N/A"})</h5>
                </div>
                <div class="modal-body p-0">
                    <div class="container-fluid">
                        <div class="row my-3">
                            <div class="col-12 my-4" >
                                <img src="${film.Poster !== 'N/A' ? film.Poster : 'img/image-not-found.png'}" 
                                    class="modal-img img-fluid" alt="${film.Title}" />
                            </div>
                            <div class="col">
                                <p><strong>Genere:</strong> ${film.Genre || "N/A"}</p>
                                <p><strong>Regista:</strong> ${film.Director || "N/A"}</p>
                                <p><strong>Attori:</strong> ${film.Actors || "N/A"}</p>
                                <p><strong>Trama:</strong> ${film.Plot || "N/A"}</p>
                                <p><strong>IMDb:</strong> ${film.imdbRating || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary modal-close">Chiudi</button>
                </div>
            </div>
        </div>
    `;

    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.add('modal-closing'); 
        setTimeout(() => modal.remove(), 300); 
    });

}

function caricaDettagliFilm(imdbID) {
    const apiKey = `${OMDB_API_KEY}`;
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True") createModal(data);
        })
        .catch(() => console.error("Errore caricamento dettagli film:", imdbID));
}

function openTrailerModal(trailerUrl) {
    //Prende un URL del trailer come parametro (trailerUrl) e lo usa nell’iframe
    let trailerModal = document.querySelector('.trailer-modal');
    if (!trailerModal) {
        trailerModal = document.createElement('div');
        trailerModal.className = 'trailer-modal';
        Object.assign(trailerModal.style, {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '2000'
        });
        document.body.appendChild(trailerModal);
    }

    trailerModal.innerHTML = `
        <div style="position: relative; width: 80%; max-width: 900px;">
            <iframe width="100%" height="500" src="${trailerUrl}" 
                title="Trailer" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <button class="btn btn-danger" style="position: absolute; top: 10px; right: 10px;">Chiudi</button>
        </div>
    `;

    trailerModal.style.display = 'flex';

    trailerModal.querySelector('button').addEventListener('click', () => {
        trailerModal.style.display = 'none';
        trailerModal.querySelector('iframe').src = ""; 
    });
}