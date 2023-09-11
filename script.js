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
    playNextVideo();
    showTextAnimations();
    startNoiseAnimation();

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
    "videos/video3.mp4",
    // ... add more video paths as needed
];
let currentVideoIndex = 0;

function startNoiseAnimation() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.opacity = '0.1';

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '2';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');

    function drawNoise() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const value = Math.random() * 255;
            imageData.data[i] = value;     // Red
            imageData.data[i + 1] = value; // Green
            imageData.data[i + 2] = value; // Blue
            imageData.data[i + 3] = 255;   // Alpha (fully opaque)
        }
        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(drawNoise);
    }

    drawNoise();
}
function applyRandomMotionBlur(videoElement) {
    setInterval(() => {
        // Apply the motionBlur animation
        videoElement.style.animation = 'motionBlur 2s';
        
        // Remove the animation after it's done to reset it
        setTimeout(() => {
            videoElement.style.animation = '';
        }, 2000);  // The duration of the animation

    }, Math.random() * 4000 + 1000);  // Random interval between 2 to 7 seconds
}


function playNextVideo() {
    if (currentVideoIndex >= videoQueue.length) return;

    //shuffle queue
    videoQueue.sort(() => Math.random() - 0.5);

    if(videoQueue[currentVideoIndex] == "videos/video.mp4"){
        playAudio();
    }


    const video = document.createElement("video");
    applyRandomMotionBlur(video);
    video.style.zIndex = "-1"; // Ensure the video is below the scanlines and noise effects
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
    displayRandomMessageOverVideo(video);

}

const audioPath = "audio.mp3"; // Replace with your audio path
const audio = new Audio(audioPath);


function playAudio() {
    audio.play();
}

const messages = [
    "Push harder than yesterday if you want a different tomorrow",
    "Your body can stand almost anything It’s your mind that you have to convince",
    "Don’t wish for a good body, work for it",
    "Train hard or go home",
    "Sore today, strong tomorrow",
    "Your only limit is you",
    "The pain you feel today will be the strength you feel tomorrow",
    "Fitness is not about being better than someone else, it's about being better than you used to be",
    "The body achieves what the mind believes",
    "The hardest lift is lifting your butt off the couch",
    "Sweat is just fat crying",
    "If you still look good at the end of your workout, you didn’t train hard enough",
    "Success starts with self-discipline",
    "Wake up with determination Go to bed with satisfaction",
    "You don’t get what you wish for You get what you work for",
    "Pain is temporary Quitting lasts forever",
    "The only bad workout is the one that didn’t happen",
    "When you feel like quitting, think about why you started",
    "Work hard in silence Let success be your noise",
    "No pain, no gain Shut up and train!",
    "Every rep counts",
    "Dream big, hustle hard",
    "Stay strong, stay positive",
    "Hustle for that muscle",
    "It never gets easier, you just get stronger",
    "Lift heavy, feel amazing",
    "Make yourself proud",
    "Sweat, smile, repeat",
    "Find your fire",
    "Be your own competition",
    "Stay dedicated, it’s not going to happen overnight",
    "Rise and grind!",
    "Make sweat your best accessory",
    "The only bad workout is the one you didn’t do",
    "Less talk, more action",
    "Challenge yourself every day",
    "Do it for the after selfie",
    "Conquer yourself, conquer the world",
    "Don’t stop until you’re proud",
    "Break barriers, not just a sweat",
    "Strive for progress, not perfection",
    "Your future self will thank you",
    "Fall in love with taking care of your body",
    "Don't limit your challenges, challenge your limits",
    "Commit, endure, conquer"
];


function displayRandomMessageOverVideo(videoElement) {
    const message = messages[Math.floor(Math.random() * messages.length)];

    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'absolute';
    messageDiv.style.top = Math.random() * (videoElement.offsetHeight - 50) + 'px'; // Random vertical position
    messageDiv.style.fontSize = '20px';
    messageDiv.style.color = 'white';
    messageDiv.style.zIndex = '1';

    const leftToRight = Math.random() > 0.5;
    if (leftToRight) {
        messageDiv.style.left = '-300px';
        messageDiv.style.animation = 'moveLeftToRight 5s linear forwards';
    } else {
        messageDiv.style.right = '-300px';
        messageDiv.style.animation = 'moveRightToLeft 5s linear forwards';
    }

    videoElement.parentNode.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// CSS animations for the messages
const style = document.createElement('style');
style.innerHTML = `
    @keyframes moveLeftToRight {
        to {
            transform: translateX(${window.innerWidth + 300}px);
        }
    }
    @keyframes moveRightToLeft {
        to {
            transform: translateX(-${window.innerWidth + 300}px);
        }
    }
`;
document.head.appendChild(style);

// Display a random message every few seconds
setInterval(() => {
    const video = document.querySelector('video');
    displayRandomMessageOverVideo(video);
    displayRandomMessageOverVideo(video);
    displayRandomMessageOverVideo(video);
    displayRandomMessageOverVideo(video);

}, Math.random() * 5000 + 2000);

