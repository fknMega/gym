document.getElementById("demoButton").addEventListener("click", function () {
    //get element id "art" and change display to none
    document.getElementById("art").style.display = "none";

    //hide footer element not by id
    document.querySelector("footer").style.display = "none";


    //hide every element in main
    var main = document.querySelector("main")
    var children = main.children;
    for (var i = 0; i < children.length; i++) {
        children[i].style.display = "none";
    }
    playAudio();
    playNextVideo();
    showTextAnimations();

    document.addEventListener('mousemove', function(event) {
        showWeightOnMouseMove(event.clientX, event.clientY);
    });
    
   

});

//function to track mouse movement and show particles

function showWeightOnMouseMove(x, y) {
    const weightElement = document.createElement('div');
    weightElement.classList.add('text-animation', 'fade-in-out');
    let emojis = ['🏋️‍♀️', '🏋️‍♂️', '🏋️', '🔥', '🎧']
    let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    weightElement.textContent = randomEmoji;
    weightElement.style.scale = Math.random() * 2;
    weightElement.style.left = x + 'px';
    weightElement.style.top = y + 'px';
    document.body.appendChild(weightElement);

    setTimeout(() => {
        weightElement.remove();
    }, 1000);  // Remove the text after 3 seconds
}
function showTextAnimations() {
    const texts = [
        "ARE YOU READY?",
        "YOU BETTER BE",
        "LIGHT",
        "WEIGHT"
    ];

    texts.forEach((text, index) => {
        setTimeout(() => {
            const textElement = document.createElement('div');
            textElement.classList.add('text-animation');
            textElement.textContent = text;
            document.body.appendChild(textElement);
            textElement.classList.add('fade-in-out');

           

            setTimeout(() => {
                textElement.remove();
            }, 3000);  // Adjust the time based on animation duration
        }, index * 3000);  // Adjust the delay between texts
    });
}
document.getElementById("demoButton").addEventListener("mouseover", function (event) {
    const button = event.target;
    const buttonRect = button.getBoundingClientRect();
    const interval = setInterval(() => {
        createRandomNumber(buttonRect);
    }, 500);

    button.addEventListener("mouseout", () => {
        clearInterval(interval);
    }, { once: true });
}, false);

function createRandomNumber(buttonRect) {
    const numberElement = document.createElement('div');
    const randomNumber = Math.floor(Math.random() * 100);
    numberElement.textContent = '+ ' + randomNumber + 'kg';
    numberElement.classList.add('number');

    const randomX = Math.random() * (buttonRect.width + 100) - 50 + buttonRect.left;
    const randomY = Math.random() * (buttonRect.height + 100) - 50 + buttonRect.top;

    numberElement.style.left = `${randomX}px`;
    numberElement.style.top = `${randomY}px`;

    document.body.appendChild(numberElement);

    setTimeout(() => {
        numberElement.classList.add('fade-in');
    }, 0);

    setTimeout(() => {
        numberElement.classList.replace('fade-in', 'fade-out');
        setTimeout(() => {
            numberElement.remove();
        }, 1000);
    }, 1000);
}



const videoQueue = [
    "videos/video.mp4",
    "videos/video2.mp4",
    // ... add more video paths as needed
];
let currentVideoIndex = 0;



function playNextVideo() {
    if (currentVideoIndex >= videoQueue.length) return;

    //shuffle queue
    videoQueue.sort(() => Math.random() - 0.5);


    const video = document.createElement("video");
    video.src = videoQueue[currentVideoIndex];
    video.autoplay = true;
    video.style.width = "100%"; // Adjust as per your need
    video.style.height = "auto";

    video.addEventListener("ended", function () {
        video.remove();
        currentVideoIndex++;
        playNextVideo();
    });

    document.body.appendChild(video);
}

const audioPath = "audio.mp3"; // Replace with your audio path
const audio = new Audio(audioPath);


function playAudio() {
    audio.play();
}