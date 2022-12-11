// gsap.registerPlugin(ScrollTrigger)

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




