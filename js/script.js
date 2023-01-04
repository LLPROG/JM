gsap.registerPlugin(ScrollTrigger)

// let container = document.getElementById("container")

// gsap.to(container, {
//     x: () => -(container.scrollWidth - document.documentElement.clientWidth) + "px",
//     ease: 'none',
//     scrollTrigger: {
//         trigger: container,
//         invalidateOnRefresh: true,
//         duration: 0.1,
//         pin: true,
//         scrub: 1,
//         snap: 0.5,
//         end: () => "+=" + container.offsetWidth
//     }
// })

// player
// .firefox
var isFF = true;
var addRule = (function (style) {
    var sheet = document.head.appendChild(style).sheet;
    return function (selector, css) {
        if (isFF) {
            if (sheet.cssRules.length > 0) {
                sheet.deleteRule(0);
            }

            try {
                sheet.insertRule(selector + "{" + css + "}", 0);
            } catch (ex) {
                isFF = false;
            }
        }
    };
})(document.createElement("style"));


const music_list = [
    {
        img: '',
        name: '',
        artist: '',
        music: '../audio/clessidra-intro.mp3'
    },
    {
        img: '',
        name: '',
        artist: '',
        music: '../audio/clessidra-intro.mp3'
    },
    {
        img: '',
        name: '',
        artist: '',
        music: '../audio/clessidra-intro.mp3'
    }
];


let now_playing = document.querySelector('.now-playing');
let playpause_btn = document.querySelector('.playpause-track');
let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let curr_track = document.createElement('audio');
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;


loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    // now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', reset);
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    curr_track.currentTime = 0
    pauseTrack()
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa-solid fa-pause" title="random"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa-solid fa-play" title="random"></i>';
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
    console.log(seek_slider.value);
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// navbar

const header = document.getElementsByTagName('header');
const hamb = document.querySelector('.hamb');
const menu = document.querySelector('.menu');
const about = document.querySelector('.about');
const hambCanvM = document.querySelector('.hamb .m');
const hambCanvT = document.querySelector('.hamb .t');
const hambCanvB = document.querySelector('.hamb .b');
const hambCanvX = document.querySelector('.hamb .m .x');
const hambCanvY = document.querySelector('.hamb .m .y');

gsap.to(header, {
    duration: 1,
    ease: "steps(12)",
    backgroundColor: 'rgba(255, 157, 0, 0.57)',
    backdropFilter: 'blur(5px)',
    scrollTrigger: {
        trigger: header,
        start: "bottom top", // when the bottom of the trigger hits the top of the viewport
        scrub: '2'
    }
});

// click event menu navbar
hamb.addEventListener('click', () => {
    menu.classList.toggle('show');
    document.body.classList.toggle('blur');
    hamb.classList.toggle('anim');
});


// disco


const disco = [
    {
        img: 'img/memory.jpg',
        title: 'Memory',
        year: '2018',
        content: 'Memory perché ho scoperchiato l"hard disk dei ricordi e delle esperienze, ma non con nostalgia, è come un pass per fare entrare l"ascoltatore nel nostro mondo. Quando scrivevo i testi avevo come obbiettivo quello di aprirmi come non ho mai fatto in passato e di raccontare alcune esperienze che mi hanno reso l"uomo che sono adesso. è un lavoro profondo che ha l"intenzione di dire “noi siamo questo, abbiamo fatto questo, queste sono le cose che per noi sono importanti, amiamo la nostra città e vogliamo fare qualcosa di significativo”.',
        tracks: [
            'Clessidra',
            'Retrogame(Zisa 3:00)',
            'O.L.G.A',
            'Tempi D"oro',
            'La Pioggia, Gli Applausi',
            'Memory Interlude',
            'Passione',
            'Storie',
            'Fan',
            'L"amore Causa',
            '24h',
            'Slot1',
            'Fammi il Prezzo(Bonus)'
        ]
    },
    {
        img: 'img/illusione.png',
        title: 'Fantastica Illusione',
        year: '2014',
        content: '"Fantastica Illusione" è il racconto, sofferto, del vivere con la sensazione costante di sentirti migliore ogni volta che sei vis a vis con gli altri. Completo, onesto, consapevole, con la necessità di spostarsi ai lati della fiera e affermare un"altra fierezza, diversa.',
        tracks: [
            'Fantastica Illusione',
            'Beat & Flow',
            'Impazzisco / Killer Negli Speakers',
            'Io No',
            'Fuori Piove',
            'Tutte Le Volte',
            'Boom',
            'L"Ultimo Liricista',
            'Dreams',
            'Angelo In Terra',
            'Chi Sei Per Giudicarmi',
            '73 / Indoor',
            'Qualcuno Qua',
            'Killer Negli Speakers(Bonus Track)'
        ]
    },
    {
        img: 'img/memory.jpg',
        title: 'Memory',
        year: '2018',
        content: 'Memory perché ho scoperchiato l"hard disk dei ricordi e delle esperienze, ma non con nostalgia, è come un pass per fare entrare l"ascoltatore nel nostro mondo. Quando scrivevo i testi avevo come obbiettivo quello di aprirmi come non ho mai fatto in passato e di raccontare alcune esperienze che mi hanno reso l"uomo che sono adesso. è un lavoro profondo che ha l"intenzione di dire “noi siamo questo, abbiamo fatto questo, queste sono le cose che per noi sono importanti, amiamo la nostra città e vogliamo fare qualcosa di significativo”.',
        tracks: [
            'Clessidra',
            'Retrogame(Zisa 3:00)',
            'O.L.G.A',
            'Tempi D"oro',
            'La Pioggia, Gli Applausi',
            'Memory Interlude',
            'Passione',
            'Storie',
            'Fan',
            'L"amore Causa',
            '24h',
            'Slot1',
            'Fammi il Prezzo(Bonus)'
        ]
    },
    {
        img: 'img/illusione.png',
        title: 'Fantastica Illusione',
        year: '2014',
        content: '"Fantastica Illusione" è il racconto, sofferto, del vivere con la sensazione costante di sentirti migliore ogni volta che sei vis a vis con gli altri. Completo, onesto, consapevole, con la necessità di spostarsi ai lati della fiera e affermare un"altra fierezza, diversa.',
        tracks: [
            'Fantastica Illusione',
            'Beat & Flow',
            'Impazzisco / Killer Negli Speakers',
            'Io No',
            'Fuori Piove',
            'Tutte Le Volte',
            'Boom',
            'L"Ultimo Liricista',
            'Dreams',
            'Angelo In Terra',
            'Chi Sei Per Giudicarmi',
            '73 / Indoor',
            'Qualcuno Qua',
            'Killer Negli Speakers(Bonus Track)'
        ]
    }
];


const inputRadio = document.querySelectorAll('.canva input');
const cards = document.querySelectorAll('.my-card');


cards.forEach((card, index) => {
    card.innerHTML =
        `<h2 class="title-album">${disco[index].title}</h2>
        <span class="year">${disco[index].year}</span>
        <img src="${disco[index].img}" alt="cover">
        <div class="buttons"><button id="listen" class="my-btn">ASCOLTA</button>
        <button id="share" class="my-btn">CONDIVIDI</button>
        <button id="info" class="my-btn">INFO</button></div>
        <article class="article">
        <img src="img/quot.png" alt="virgolette top" class="top">
        <p class="content">${disco[index].content}</p>
        <img src="img/quot.png" alt="virgolette top" class="bottom">
        </article>
        <h3>BRANI</h3>
        <ol class="list-track">
        ${disco[index].tracks.map((a) => { return "<li>" + a + "</li>" }).join(" ")}
        </ol>`;

})

let show = false;
let btnsInfo = document.querySelectorAll('#info');
btnsInfo.forEach(function (el) {
    el.addEventListener('click', () => {
        if (show == false) {
            $('.article').addClass('show')
            show = true
        } else {
            $('.article').removeClass('show')
            show = false
        }
    })
})


inputRadio.forEach(function (el, i) {
    el.addEventListener('click', () => {

        $('.disco .slider').css({ left: '-' + i + '00%' });
        console.log(i)
    })
});

// gallery

let btnMoreGallery = document.getElementById('more-gallery');
let flex = document.querySelector('.flex');
let iconRotate = document.querySelector('.icon-rotate');
let bool = false
btnMoreGallery.addEventListener('click', () => {
    if (bool == false) {
        flex.classList.add('show');
        iconRotate.classList.remove('fa-chevron-down');
        iconRotate.classList.add('fa-chevron-up');
        bool = true
    } else {
        flex.classList.remove('show');
        iconRotate.classList.remove('fa-chevron-up');
        iconRotate.classList.add('fa-chevron-down');
        bool = false
    }

})










