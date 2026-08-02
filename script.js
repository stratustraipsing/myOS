const libraryButton = document.getElementById('library-button');
const notesPopup = document.getElementById('notes-popup');
const closeButton = document.querySelectorAll('.close-button');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const saveButtons = document.querySelectorAll('.save-button');
const textareas = document.querySelectorAll('textarea');
const datetime = document.getElementById('datetime');
const musicButton = document.getElementById('music-button');
const musicPopup = document.getElementById('music-popup');
const goalsButton = document.getElementById('goals-button');
const goalsPopup = document.getElementById('goals-popup');
const moodPopup = document.getElementById('mood-popup');
const moodButton = document.getElementById('mood-button');
const timerPopup = document.getElementById('timer-popup');
const timerButton = document.getElementById('timer-button');
const terminalPopup = document.getElementById('terminal-popup');
const terminalButton = document.getElementById('terminal-button');


// WELCOME SIGN

const welcomeImage = document.getElementById('welcome-image');
const clickToDelete = document.getElementById('click-to-delete');

welcomeImage.addEventListener('click', () => {
    welcomeImage.classList.add('clicked');
    clickToDelete.style.display = 'none';

    setTimeout(() => {
        welcomeImage.style.display = 'none';
    }, 800);
});

//BATTERY

const batteryFill = document.getElementById('battery-fill');
const batteryPercent = document.getElementById('battery-percent');
const lightning = document.getElementById('lightning');
const batteryWidget = document.getElementById('battery-widget');
const eeyore = document.getElementById('eeyore');

if("getBattery" in navigator) {
    navigator.getBattery().then((battery) => {
        updateBattery = () => {
            var level = Math.floor(battery.level * 100);
            batteryPercent.innerHTML = `${level}%`;
            batteryFill.style.width = `${level}%`;
            if(level <= 20) {
                eeyore.classList.remove('hidden');
            } else {
                eeyore.classList.add('hidden');
            }
            if(battery.charging) {
                lightning.classList.remove('hidden');
            } else {
                lightning.classList.add('hidden');
            }
        }
        updateBattery();

        battery.addEventListener('levelchange', () => {
            updateBattery();
        });

        battery.addEventListener('chargingchange', () => {
            updateBattery();
        });
    });
} else {
    batteryWidget.style.display = "none";
}

//WEATHER

const apiKey = "60120b4f20c9e5abd2674ec56eb3a5d5";

const searchBox = document.querySelector('#search-city input');
const searchBtn = document.getElementById('search-button')
const locationOptions = document.getElementById('location-options');
const weatherWidget = document.getElementById('weather-widget');

var currentLat;
var currentLon;

async function checkWeather(lat, lon){
    const apiURLWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    const response = await fetch(apiURLWeather);
    var data = await response.json();

    locationOptions.innerHTML = "";

    document.getElementById("city").innerHTML = data.name;
    document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°F";

    const apiIcon = data.weather[0].icon;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${apiIcon}@2x.png`;

    const poohDescriptions = {
        Clear: "\"Beautiful, clear skies over the Hundred Acre Wood.\"",
        Clouds: "\"Looks like a very cozy, gray sort of day.\"",
        Rain: "\"A rainy day in the Wood.  Pooh might recommend something warm.\"",
        Drizzle: "\"A little drizzle floating through the trees.  Best bring an umbrella.\"",
        Thunderstorm: "\"There's a rumble in the sky!\"",
        Snow: "\"A splendid day for a snowy adventure.\"",
        Mist: "\"A soft mist has settled over the wood.  Everything feels rather mysterious.\""
    }

    document.getElementById('pooh-description').innerHTML = poohDescriptions[data.weather[0].main];
}

searchBtn.addEventListener("click", async () => {
    const city = searchBox.value;

    const apiURLGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    const response = await fetch(apiURLGeo);
    var data = await response.json();

    if (data.length === 0) {
        searchBox.classList.add("shake-for-error");

        setTimeout(() => {
            searchBox.classList.remove("shake-for-error");
        }, 200);
        return;
    }

    data.forEach((location) => {
        const option = document.createElement("button");

        option.innerHTML = `${location.name}, ${location.state || ""} ${location.country}`;

        locationOptions.appendChild(option);

        option.addEventListener("click", () => {
            currentLat = location.lat;
            currentLon = location.lon;

            checkWeather(currentLat, currentLon);

            locationOptions.innerHTML = "";
        });
    });
});

searchBox.addEventListener("keydown", () => {
    locationOptions.innerHTML = "";
    if(event.key === "Enter") {
        searchBtn.click();
    }
});

setInterval(() => {
    if(currentLat !== undefined && currentLon !== undefined) {
        checkWeather(currentLat, currentLon);
    }
}, 1800000);

// APPS/POPUPS
let highestZIndex = 20;

function bringToFront(element) {
    highestZIndex++;
    element.style.zIndex = highestZIndex;
}

const allPopups = document.querySelectorAll('.popup');

allPopups.forEach((popup) => {
    popup.addEventListener('mousedown', () => {
        bringToFront(popup);
    })
})

const popupOffset = {
    "notes-popup": 0,
    "music-popup": 40,
    "goals-popup": 80,
    "mood-popup": 120,
    "timer-popup": 160,
    "terminal-popup": 200
};

function openPopup(popup) {
    const offset = popupOffset[popup.id];

    popup.style.top = `${80 + offset}px`;
    popup.style.left = `${200 + offset}px`;

    popup.classList.remove('hidden');

    bringToFront(popup);
}

libraryButton.addEventListener('click', () => {
    cycleSuggestions();
    clearInterval(suggestionInterval);
    suggestionInterval = setInterval(cycleSuggestions, 15000);
    openPopup(notesPopup)
});

musicButton.addEventListener('click', () => {
    openPopup(musicPopup);
});

goalsButton.addEventListener('click', () => {
    openPopup(goalsPopup);
})

moodButton.addEventListener('click', () => {
    openPopup(moodPopup);
})

timerButton.addEventListener('click', () => {
    openPopup(timerPopup);
})

terminalButton.addEventListener('click', () => {
    openPopup(terminalPopup);
})


closeButton.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        popup.classList.add('hidden');
        if (popup && popup.id === 'notes-popup') {
            clearInterval(suggestionInterval);
        }
    });
});

//GIF

const surprisePooh = document.getElementById('surprise-pooh');
surprisePooh.addEventListener('click', function() {
    surprisePooh.classList.add('hidden');
});

// Goal 'Done' -> TV POPUP

const doneButton = document.getElementById('done-button-goal');
const TVPopup = document.getElementById('TV-popup');
const rabbitCartGIF = document.getElementById('rabbit-cart-gif');

doneButton.addEventListener('click', () => {
    TVPopup.classList.remove('hidden');
    TVPopup.classList.add('fit-to-screen-animate');
    setTimeout(() => {
        rabbitCartGIF.classList.remove('hidden');
    }, 3000);
    setTimeout(() => {
        rabbitCartGIF.classList.add('hidden');
        TVPopup.classList.add('min-the-TV-animate');
    }, 5600);
    setTimeout(() => {
        TVPopup.classList.add('hidden');
        TVPopup.classList.remove('min-the-TV-animate');
    }, 8500);
});

//GOALS LOCAL STORAGE
// when click on that id'd save button, both text area's input is in local storage

const saveButtonGoal = document.getElementById('save-button-goal');

saveButtonGoal.addEventListener('click', () => {
    const textarea1 = document.getElementById('goal1');
    const textarea2 = document.getElementById('goal2');
    localStorage.setItem('goal1', textarea1.value);
    localStorage.setItem('goal2', textarea2.value);
});

//NOTES TABS + LOCAL STORAGE

function showTab(tabId) {
    tabContents.forEach((content) => {
        content.style.display = 'none';
    });

    document.getElementById(tabId).style.display = 'block';
}

saveButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const noteId = button.dataset.note;
        const textarea = document.getElementById(noteId);
        localStorage.setItem(noteId, textarea.value);
    });
});

tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
        tabButtons.forEach((tab) => tab.classList.remove('active'));
        button.classList.add('active');
        showTab(button.dataset.tab);
    });
});

textareas.forEach((textarea) => {
    const savedValue = localStorage.getItem(textarea.id);
    if (savedValue !== null) {
        textarea.value = savedValue;
    }
});

const owlSuggestions = [
    "Book: Winnie-the-Pooh by A.A. Milne",
    "Quote: \"Keep your face always toward the sunshine, and shadows will fall behind you.\" (Walt Whitman)",
    "Show: The New Adventures of Winnie the Pooh",
    "Book: Princess Academy by Shannon Hale",
    "Quote: \"Love is patient, love is kind.\"(1 Corinthians 13:4-8)",
    "Show: Wishbone",
    "Book: Anne of Green Gables by L.M. Montgomery",
    "Quote: \"Piglet noticed that even though he had a Very Small Heart, it could hold a rather large amount of Gratitude.\"",
    "Movie: Indian In the Cupboard",
    "Quote: \"Talk to Me. For Me there is no sweeter prayer.\" (He and I, Gabrielle Bossis)"
];

const owlText = document.getElementById('owl-text');
let suggestionInterval;

let owlIndex = 0;

function cycleSuggestions() {
    owlText.textContent = owlSuggestions[owlIndex];
    owlIndex = (owlIndex + 1) % owlSuggestions.length;
}

showTab('tab1');

//PIGLET MOOD SUPPORT

const pigletSupport = {
    Happy: "Oh! I'm so glad! What a wonderful thing to have such lovely days.",  
    Sad: "Oh, dear... I'm sorry you're feeling sad. You don't have to feel better right away, why don't you sit down?",
    Excited: "Oh! That's wonderful! I'm excited for you, too! You should play a little music to celebrate.",
    Loving: "That's a very nice feeling to have. I think it's rather special when your heart feels so full.",
    Scared: "Oh, I understand... It's all right to be scared. You don't have to be brave all by yourself.",
    Embarassed: "Oh, don't worry! We've all had moments we'd rather forget. I certainly have... probably quite a few of them.", 
    Angry: "Oh dear... It sounds like something has really upset you. It's all right to be angry. Perhaps we can take a little time before deciding what to do.", 
    Tired: "It sounds as though you could use a little rest. You don't have to accomplish everything today, you know.",
    Silly: "Oh! Well, that's perfectly all right! Sometimes being a little silly is exactly what one needs.",
    Frustrated: "Oh, bother... I'm sorry. Things can be terribly frustrating when they don't go the way we'd hoped. It sounds like you're doing your best."
};

const moodButtons = document.querySelectorAll('#icon-grid button');
const pigletText = document.getElementById('piglet-text');

moodButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const mood = button.dataset.mood;
        pigletText.innerText = pigletSupport[mood];
    })
})

//TIMER

const setTimerButton = document.getElementById('set-timer-button');
const timerDisplay = document.getElementById('timer-display');
const pauseButton = document.getElementById('pause-button');

let totalSeconds = 0;
let timerInterval;
let doneInterval;

let isPaused = false;

setTimerButton.addEventListener('click', () => {

    const hr = document.getElementById('set-hr').value;
    const min = document.getElementById('set-min').value;
    const sec = document.getElementById('set-sec').value;

    if(hr > 99) {
        setTimerButton.classList.add('shake-for-error');
        setTimeout(() => {
            setTimerButton.classList.remove('shake-for-error');
        }, 200);
        return;
    }

    totalSeconds = hr*3600 + min*60 + sec*1;
    updateDisplayTime(totalSeconds);
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if(!isPaused) {
            totalSeconds--;
            updateDisplayTime(totalSeconds);
            if(totalSeconds <=0) {
                clearInterval(timerInterval);
                let times = 0;
                document.getElementById('buzzy-bees').classList.remove('hidden');
                const buzzing = new Audio('aesthetic/freesound_buzzing.mp3');
                buzzing.play();
                doneInterval = setInterval(() => {
                    timerDisplay.classList.toggle('hidden');
                    times++;
                    if(times >= 12) {
                        document.getElementById('buzzy-bees').classList.add('hidden');
                        clearInterval(doneInterval);
                    }
                }, 500);
            }
        }
    }, 1000);
})

pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
})

function updateDisplayTime(totalSeconds) {
    let hr = Math.floor(totalSeconds / 3600);
    let min = Math.floor((totalSeconds % 3600) / 60);
    let sec = totalSeconds % 60;
    timerDisplay.innerHTML = `${String(hr).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

//DRAGGING FUNCTIONALITY

function makeDraggable(element, handle = element) {
    let startX = 0;
    let startY = 0;
    let newX = 0;
    let newY = 0;

    handle.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    });

    function mouseMove(e) {
        newX = startX - e.clientX;
        newY = startY - e.clientY;

        startX = e.clientX;
        startY = e.clientY;

        element.style.top = (element.offsetTop - newY) + 'px';
        element.style.left = (element.offsetLeft - newX) + 'px';
    }

    function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }
}

makeDraggable(datetime);
makeDraggable(weatherWidget);
makeDraggable(batteryWidget);

makeDraggable(notesPopup, document.getElementById('notes-window-header'));
makeDraggable(musicPopup, document.getElementById('music-window-header'));
makeDraggable(goalsPopup, document.getElementById('goals-window-header'));
makeDraggable(moodPopup, document.getElementById('mood-window-header'));
makeDraggable(timerPopup, document.getElementById('timer-window-header'));
makeDraggable(terminalPopup, document.getElementById('terminal-window-header'));

const updateDateTime = () => {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    document.getElementById('date').textContent = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }) + ', ' + now.getFullYear();
};

updateDateTime();
setInterval(updateDateTime, 1000);