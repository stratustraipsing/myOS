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

function fixBackground() {
    let backgroundNum = localStorage.getItem("backgroundNum") || "0";
        if(backgroundNum === '1') {
            document.body.style.backgroundImage = "url('https://i.pinimg.com/1200x/e9/8c/8c/e98c8c63094a1c5844ecbe73c6edb70d.jpg')";
        } else if (backgroundNum === '2') {
            document.body.style.backgroundImage = "url('https://i.pinimg.com/1200x/63/ca/07/63ca072d3d142b39db009cb425b12a6c.jpg')";
        } else if (backgroundNum === '3') {
            document.body.style.backgroundImage = "url('https://i.pinimg.com/1200x/72/03/c5/7203c5785dcdea25468d51d773aebe4a.jpg')";
        } else if (backgroundNum === '4') {
            document.body.style.backgroundImage = "url('https://i.pinimg.com/1200x/36/11/67/3611679954441711c5e273561dc4fb17.jpg')";
        } else if(backgroundNum === '5') {
            document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/e5/37/19/e5371924d75f5e5cee7484553c46bc39.gif')";
        }else {
            document.body.style.backgroundImage = "url('https://i.pinimg.com/736x/f3/43/d1/f343d156f83c5a90b3b44edc1617ea44.jpg')";
        }
}

fixBackground();

// WELCOME SIGN

const ropeSign = document.getElementById('rope-sign');
const clickToDelete = document.getElementById('click-to-delete');

const speechLeft = document.getElementById('speech-left');
const speechRight = document.getElementById('speech-right');

const speechLeftText = speechLeft.children[1];
const speechRightText = speechRight.children[1];

ropeSign.addEventListener('click', () => {
    ropeSign.classList.add('clicked');
    clickToDelete.style.display = 'none';
    setTimeout(() => {
        weatherWidget.style.zIndex = '901';
        document.querySelector('.welcome-wrapper').style.zIndex = '900';
        document.getElementById('fade-brightness').classList.add('on');
        setTimeout(() => {
            speechRightText.innerHTML = `<span id="yellow-hi">POOH:</span> Oh bother...that wasn't supposed to happen.  Can you perhaps search for a pair of scissors to cut the rope?  I would greatly appreciate the help.`;
            speechRight.classList.remove('hidden');
            lookHere(speechRight);
        }, 1000);
    }, 2700);
    gameMode = 1;
});

// MISC GAME THINGS
let gameMode = 0;

const cutZone = document.getElementById('cut-zone');

function checkCollided(element1, element2) {
    const pos1 = element1.getBoundingClientRect();
    const pos2 = element2.getBoundingClientRect();

    if(pos1.left < pos2.right && pos1.right > pos2.left && pos1.top < pos2.bottom && pos1.bottom > pos2.top) {
        return true;
    }
    return false;
}

function lookHere(element) {
    element.classList.add('look-here');
    setTimeout(() => {
        element.classList.remove('look-here');
    }, 800)
}

speechRightText.addEventListener('click', () => {
    if(gameMode === 8) {
        speechRightText.innerHTML = `Tigger was last seen dancing.`;
    }
})

const surprisePooh = document.getElementById('surprise-pooh');
surprisePooh.addEventListener('click', () => {
    surprisePooh.classList.add('hidden');
    TVPopup.classList.remove('hidden');
    TVPopup.classList.add('fit-to-screen-animate');
    setTimeout(() => {
        document.getElementById('pooh-1').classList.remove('hidden');
    }, 3000);
    setTimeout(() => {
        document.getElementById('pooh-1').classList.add('hidden');
        document.getElementById('pooh-2').classList.remove('hidden');
    }, 5000);
    setTimeout(() => {
        document.getElementById('pooh-2').classList.add('hidden');
        document.getElementById('pooh-3').classList.remove('hidden');
    }, 8500);
    setTimeout(() => {
        document.getElementById('pooh-3').classList.add('hidden');
        document.getElementById('pooh-4').classList.remove('hidden');
    }, 10500);
    setTimeout(() => {
        document.getElementById('pooh-4').classList.add('hidden');
        TVPopup.classList.add('min-the-TV-animate');
    }, 15000);
    setTimeout(() => {
        TVPopup.classList.add('hidden');
        TVPopup.classList.remove('min-the-TV-animate');
    }, 16500);
})

const tigger = document.getElementById('tigger');

document.getElementById('out-of-place').addEventListener('play', () => {
    tigger.classList.remove("hidden");
});

//move right speech rightwards + view on desktop
//commit changes + check netlify
//send out! family, friends, and then

//hide pooh somehwere special and trigger a bunch of related happy gifs; + offer a hint for this somewhere

tigger.addEventListener('click', () => {
    tigger.classList.add("hidden");
    //tell user hunny acquired
    if(gameMode === 8) {
        speechLeftText.innerHTML = `...`;
        speechRightText.innerHTML = `<span id="yellow-hi">POOH:</span> What wonderful friends I have!  It's a funny old thing, but the best days are always the ones with friends in them.  Do come back and visit anytime.`
        lookHere(speechRight);
        setTimeout(() => {
            speechLeftText.innerHTML = `[visit tree stump to end interactive walkthrough]`;
        }, 4000);
        gameMode = 9;
    }
});

if(localStorage.getItem("welcomeBool") === "false") {
    ropeSign.style.display = 'none';
    clickToDelete.style.display = 'none';
}

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

const scissors = document.getElementById('scissors');
let isCityScissors = false;

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

    if(isCityScissors) {
        scissors.style.zIndex = '900';
        scissors.classList.remove('hidden');
        speechRightText.innerHTML = `<span id="yellow-hi">POOH:</span> Look, they're right under there!  Try dragging anything that's in the way.`;
        lookHere(speechRight);
        cutZone.classList.remove('hidden');
        gameMode = 2;
    }
}

searchBtn.addEventListener("click", async () => {
    const city = searchBox.value;

    if(gameMode === 1 && city.toLowerCase() === "scissors") {
        isCityScissors = true;
    }

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

searchBox.addEventListener("keydown", (event) => {
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
    openPopup(notesPopup);
    if(gameMode === 3) {
        speechRightText.innerHTML = `<span id="yellow-hi">POOH:</span> It looks like Owl has some recommendations for you, how kind!  Will you look around his library a bit?`;
        lookHere(speechRight);
        gameMode = 4;
    }
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

function closeAllBut() {
    allPopups.forEach(popup => {
        if(popup && popup.id !== 'terminal-popup') {
            popup.classList.add('hidden');
            if (popup && popup.id === 'notes-popup') {
                clearInterval(suggestionInterval);
            }
        }
    });
}

// Goal 'Done' -> TV POPUP

const doneButton = document.getElementById('done-button-goal');
const TVPopup = document.getElementById('TV-popup');
const rabbitCartGIF = document.getElementById('rabbit-cart-gif');
const niceJob = document.getElementById('nice-job');

doneButton.addEventListener('click', () => {
    TVPopup.classList.remove('hidden');
    TVPopup.classList.add('fit-to-screen-animate');
    setTimeout(() => {
        rabbitCartGIF.classList.remove('hidden');
        niceJob.classList.remove('hidden');
        setTimeout(() => {
            niceJob.classList.add('hidden');
        }, 2000);
    }, 3500);
    setTimeout(() => {
        rabbitCartGIF.classList.add('hidden');
        TVPopup.classList.add('min-the-TV-animate');
    }, 5700);
    setTimeout(() => {
        TVPopup.classList.add('hidden');
        TVPopup.classList.remove('min-the-TV-animate');
    }, 8500);
    if(gameMode === 5) {
        speechLeftText.innerHTML = `...`;
        speechRightText.innerHTML = `...`;
        setTimeout(() => {
            speechLeftText.innerHTML = `<span id="orange-hi">RABBIT:</span> Another task off the list, exactly as scheduled! But what's that dreadful buzzing sound I hear...help me find it, will you?`;
            lookHere(speechLeft);
            gameMode = 6;
        }, 8000);
    }
});

//GOALS LOCAL STORAGE

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
        if(gameMode === 4 && button.dataset.tab === 'tab3') {
            speechLeft.classList.remove('hidden');
            speechLeftText.innerHTML = `<span id="orange-hi">RABBIT:</span> A visitor, is it?  Splendid timing.  Come along now, chop chop, let's get you organized for the day ahead at my carrot patch.`;
            lookHere(speechLeft);
            speechRightText.innerHTML = `...`;
            setTimeout(() => {
                speechRightText.innerHTML = `<span id="yellow-hi">POOH:</span> Oh, that's Rabbit.  If you don't care for planning right now, just come relax on over at our sitting-stump.`;
                lookHere(speechRight);
            }, 4000);
            gameMode = 5;
        }
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

//PIGLET'S MOOD SUPPORT

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
        if(gameMode === 7 && mood === 'Frustrated') {
            speechLeftText.innerHTML = `<span id="pink-hi">PIGLET:</span> Let-let's find Pooh some hunny elsewhere.  If we can find tigger, he's sure to have some.`;
            lookHere(speechLeft);
            setTimeout(() => {
                speechRight.style.cursor = "grab";
                speechRightText.innerHTML = `[click here if you need a hint]`;
                lookHere(speechRight);
            }, 4000);
            gameMode = 8;
        }
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
                if(gameMode === 6) {
                    speechLeftText.innerHTML = `...`;
                    speechRightText.innerHTML = `<span id="yellow-hi">POOH:</span> My hunny!`;
                    lookHere(speechRight);
                    setTimeout(() => {
                        speechLeftText.innerHTML = `<span id="pink-hi">PIGLET:</span> Oh d-dear...what happened?  Would you tell me how Pooh is feeling? Perhaps we could find a little sunshine for him?`;
                        lookHere(speechLeft);
                    }, 2000)
                    gameMode = 7;
                }
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

//TERMINAL

const terminalInput = document.getElementById('command');
const userName = document.getElementById('user-name');
const terminalOutput = document.getElementById('terminal-output');
const terminalBox = document.getElementById('terminal-box');
const welcomeSpan = document.getElementById('welcome-span');
let user = localStorage.getItem("user") || "user";

welcomeSpan.innerHTML = `Welcome ${user}!<br>Type 'help' to view available commands.`
userName.innerHTML = `${user}@Hundred-Acre-Wood ~ %`;

terminalInput.addEventListener('keydown', (event) => {

    if(event.key === "Enter") {
        const command = terminalInput.value;
        terminalInput.value = "";
        terminalOutput.innerHTML += `${user}@Hundred-Acre-Wood ~ % ${command}`;

        if(command === "help") {
            terminalOutput.innerHTML += `<div><br> help ----> show list of available commands <br> check ----> run a system check <br> explore [0-5] ----> <br> clear ----> clear terminal history <br> relax ----> remove (or restore) welcome sign on future entry <br> bye ----> close all apps <br> user [name] ----> set user name</div>`;
        } else if(command === "check") {
            terminalOutput.innerHTML += `<div><br> Running system check... <br> Owl's Library......OK <br> Music Player......OK <br> Rabbit's Goal Tracker......OK <br> Piglet's Mood Tracker......OK <br> Hunny Pot Timer......OK <br> System check complete.</div>`
        } else if(command === "explore") {
            terminalOutput.innerHTML += `<div><br>explore 0 or 1 or 2 or 3 or 4</div>`;
        } else if(command.startsWith("explore ")) {
            let posNum = command.substring(8);
            if(posNum === '0' || posNum === '1' || posNum === '2' || posNum === '3' || posNum === '4' || posNum === '5') {
                localStorage.setItem("backgroundNum", posNum);
                terminalOutput.innerHTML += `<div><br>Successful change.</div>`;
                fixBackground();
                if(posNum === '5') {
                    setTimeout(() => {
                        speechRightText.innerHTML = `<span id="yellow-hi">POOH:</span> Psst...You should search for me in the terminal.`;
                        speechRight.classList.remove('hidden');
                    }, 2000);
                    setTimeout(() => {
                        speechRight.classList.add('hidden');
                    }, 4000);
                }
            } else {
                terminalOutput.innerHTML += `<div><br>Number out of bounds. Please choose 0, 1, 2, 3, 4, or 5.</div>`;
            }
        } else if(command === "clear") {
            terminalOutput.innerHTML = "";
        } else if(command === "relax") {
            if(localStorage.getItem("welcomeBool") === "false") {
                localStorage.setItem("welcomeBool", "true");
                terminalOutput.innerHTML += `<div><br> Welcome sign will appear on future entry.</div>`;
            } else {
                ropeSign.style.display = 'none';
                localStorage.setItem("welcomeBool", "false");
                terminalOutput.innerHTML += `<div><br> Welcome sign will no longer appear on entry.  Please refresh to end the interactive walkthrough.</div>`;
            }
        } else if(command === "bye") {
            terminalOutput.innerHTML += "<div><br>All apps other than the terminal successfully closed.</div>";
            closeAllBut();
        } else if(command.startsWith("user ")) {
            user = command.substring(5).trim();
            if(user === "") {
                terminalOutput.innerHTML += `<div><br>Please enter a username</div>`;
            } else {
                terminalOutput.innerHTML += `<div><br>Username updated to ${user}.</div>`;
                localStorage.setItem("user", user);
                userName.innerHTML = `${user}@Hundred-Acre-Wood ~ %`;
            }
        } else if(command.toLowerCase() === "pooh" ) {
            surprisePooh.classList.remove('hidden');
            terminalOutput.innerHTML += `<div><br> Is that you, pooh?</div>`;
        }
        else {
            terminalOutput.innerHTML += `<div><br>Command not recognized.</div>`;
        }
        terminalOutput.innerHTML += `<br>`;
        terminalBox.scrollTop = terminalBox.scrollHeight;
    }
});

//DRAGGING FUNCTIONALITY

function makeDraggable(element, handle = element) {
    let startX = 0;
    let startY = 0;
    let newX = 0;
    let newY = 0;

    handle.addEventListener('mousedown', (event) => {

        startX = event.clientX;
        startY = event.clientY;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    });

    function mouseMove(event) {
        newX = startX - event.clientX;
        newY = startY - event.clientY;

        startX = event.clientX;
        startY = event.clientY;

        element.style.top = (element.offsetTop - newY) + 'px';
        element.style.left = (element.offsetLeft - newX) + 'px';

        if(element === scissors && checkCollided(scissors, cutZone)) {
            ropeSign.classList.add('cut');
            cutZone.classList.add('hidden');
            setTimeout(() => {
                ropeSign.classList.add('hidden');
                scissors.classList.add('hidden');
                document.getElementById('fade-brightness').classList.remove('on');
                weatherWidget.style.zIndex = "0";
                speechRightText.innerHTML = `<span id="yellow-hi">POOH:</span> Oh, wonderful!  You've done it. Wait a moment... I hear Owl in his library. Let's go and see what he's up to!`;
                lookHere(speechRight);
            }, 1000)
            gameMode = 3;
    }
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

makeDraggable(scissors, scissors);

const updateDateTime = () => {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    document.getElementById('date').textContent = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }) + ', ' + now.getFullYear();
};

updateDateTime();
setInterval(updateDateTime, 1000);