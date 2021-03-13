const Mainimage = document.getElementById('main-img');
const Title = document.getElementById('title')
const Artist = document.getElementById('artist')
const smallimg = document.getElementById('smallimg')


 

const music = document.querySelector('audio');
const prograssContainer = document.getElementById('prograss-container');
const prograss = document.getElementById('prograss');
const Duration = document.querySelector('.duration-warper')

const CurrentTimeEl = document.getElementById('curent-time')
const durationEl = document.getElementById('duration')
const playcontainer = document.getElementById('play-container')
const background = document.querySelector('.background')
 

 

const prevBtn = document.getElementById('prev');
const PLayBtn = document.getElementById('play');
const NextBtn = document.getElementById('next');

const body = document.getElementById('body');
const Back = document.querySelector('.back');
const heart = document.querySelector('.fa-heart');  
const repeatbtn = document.querySelector('.fa-redo-alt');  





//-----------------------------------------------------------------------------------


//music list

let songs = [
    
    {
        name: 'hussin2',
        displayName : 'مهم جداً',
        artist: 'حسين الجسمي',
        background: '#3b3856',
        img : "hussin2",
    },
    

    {
        name: 'Sherine',
        displayName : 'حبنه جنة',
        artist: 'شيرين عبدالوهاب',
        background : '#cd972a',
    },


    {
        name: 'rahma',
        displayName : 'وعد مني',
        artist: 'رحمه رياض',
        background: '#fc6e5a',
         
    },

    {
        name: 'Majid',
        displayName : 'عطشان ',
        artist: 'ماجد المهندس',
        background : '#80858a',
    },

    {
        name: 'yara',
        displayName : 'ما بعرف',
        artist: 'يارا',
        background : '#a80016',
    },

    {
        name: 'kadm',
        displayName : 'أحبيني بلا عقد',
        artist: 'كاظم الساهر',
        background: 'rgb(49 44 44)',
    },

  
    {
        name: 'faia',
        displayName : 'يا قاتلي',
        artist: 'فايا يونان',
        background: '#2d3696',
    },

    {
        name: 'mohammadsalim',
        displayName : ' اعوف الدنيا',
        artist: 'محمد السالم ',
        background : '#04072c',
    },
    
    {
        name: 'aseel',
        displayName : 'سر الحياة',
        artist: 'أصيل هميم',
        background : '#fa373a',
    },
    {
        name: 'ashaq',
        displayName : 'عشق',
        artist: 'فيصل عبدالكريم',
        background : '#363030',
    },


    
    {
        name: 'Amar',
        displayName : '  مدرسة الحب',
        artist: 'عمار الكوفي   ',
        background : '#3e4755',
    },

    {
        name: 'Marwan',
        displayName : 'كل القصايد',
        artist: 'مروان خوري ',
        background : '#3e4755',
    },
   

    {
        name: 'mohammad',
        displayName : ' أسجل روحي',
        artist: 'محمد عبدالجبار',
        background : '#330909',
    },

    {
        name: 'adham',
        displayName : ' هو الحُب ',
        artist: 'أدهم نابلسي',
        background : '#a6191f',
    },

    {
        name: 'alisaber',
        displayName : 'معقوله ',
        artist: 'علي صابر',
        background : '#433d3c',
    },
    
     
]






//check if playing or not

 let isPlaying = false;
// play 
function playSong() {
    isPlaying = true;
    PLayBtn.classList.replace('fa-play',  "fa-pause");
    music.play();
}

// pause
function pauseSong() {
    isPlaying = false;
    PLayBtn.classList.replace('fa-pause', 'fa-play');
    music.pause();
}
 
//play or pause eventlitner

PLayBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
 



//update song

function loadSong(song) {
    Title.textContent = song.displayName;
    Artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    Mainimage.src = `img/${song.name}.jpg`;
     /*  prograss.style.background = song.background;  
      Duration.style.color = song.background; */  
   
    PLayBtn.style.color = song.background;
    prevBtn.style.color = song.background;
    NextBtn.style.color = song.background;    
}



//current song
let SongIndex = 0;

// on load select the firstsong

loadSong(songs[SongIndex]);



////prev function  
function prevSong() {
    SongIndex--;
    if (SongIndex < 0) {
        SongIndex = songs.length -1;
    }
    loadSong(songs[SongIndex]);
    playSong();

    heart.classList.remove("active");
}

//// next function  
function nextSong() {
    SongIndex++;
    if (SongIndex > songs.length - 1) {
        SongIndex = 0;
    }
    loadSong(songs[SongIndex]);
    playSong();

    heart.classList.remove("active");
}


function repeat() {
    music.loop = !music.loop;
    if (music.loop) {
      repeatbtn.classList.add('repeat')
    } else {
        repeatbtn.classList.remove('repeat');
    }
}

function setVolume() {
    var volume = document.getElementById('volume');
    music.volume = volume.value;
}


//update song time

function UpdatePrograss(e) {
    if (isPlaying) {
        //duration is the time of th song // current time is the begning of the song
        const { duration, currentTime } = e.srcElement;
        
        //update prograss bar width

        let prograssPercent = (currentTime / duration) * 100;
        prograss.style.width = `${prograssPercent}%`;


        //Calculate display duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSecond = Math.floor(duration % 60);
        if (durationSecond < 10) {
            durationSecond = `0${durationSecond}`;
        }

    // delay switching duration element to avoid NaN - NOT A NUMBER
        if (durationSecond) {
            durationEl.textContent = `${durationMinutes} : ${durationSecond}`;
        }
        // display currenttime
        const CurrentMinutes = Math.floor(currentTime / 60);
        let CurrentSecond = Math.floor(currentTime % 60);
        if (CurrentSecond < 10) {
            CurrentSecond = `0${CurrentSecond}`;
        }
          
        CurrentTimeEl.textContent = `${CurrentMinutes} : ${CurrentSecond}`;

    }
}


// set prograss bar

function SetprograssBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;

    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}


function heartActive() {
    heart.classList.toggle("active");
}



//  addEventListener

repeatbtn.addEventListener("click" , repeat)
heart.addEventListener('click', heartActive);
prevBtn.addEventListener('click', prevSong);
NextBtn.addEventListener('click', nextSong);
music.addEventListener("timeupdate", UpdatePrograss)
music.addEventListener('ended' , nextSong)
prograssContainer.addEventListener('click', SetprograssBar)
 
