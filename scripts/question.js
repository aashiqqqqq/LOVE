var isAdded = false;

const maxHeight = document.querySelector(".main").clientHeight;
const maxWidth = document.querySelector(".main").clientWidth;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * ((max - 120) - min + 20) + min)
}

let clickCount = 0;

document.querySelector("#no").addEventListener("click", () => {
  clickCount++;
  if (clickCount >= 20) {
    document.querySelector(".gif").src = "https://media.tenor.com/jsQumF2np4kAAAAC/bear-shocked.gif";
    document.querySelector("h3").innerHTML = "HOW THE FUCK, but anyways, now marry me";
  } else {
    moveButton();
  }
})

document.querySelector("#yes").addEventListener("click", () => {
  document.querySelector(".gif").src = "https://media.tenor.com/KFkmX5T_5LEAAAAC/love-you-brown-bear.gif";
  document.querySelector("h3").innerHTML = "Yayyy!";
})

const noBtn = document.querySelector("#no");
let isMoved = false;

function moveButton() {
  if (!isMoved) {
    const newX = getRandomNumber(-maxWidth/2 + 60, maxWidth/2 - 60);
    const newY = getRandomNumber(-maxHeight/2 + 60, maxHeight/2 - 60);
    
    noBtn.style.transition = "transform 0.3s ease-out";
    noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
    
    isMoved = true;
    
    setTimeout(() => {
      isMoved = false;
    }, 500);
  }
}

// For desktop
noBtn.addEventListener("mouseover", moveButton);

// Reset transition after it completes to allow instant movement on next interaction
noBtn.addEventListener("transitionend", () => {
  noBtn.style.transition = "none";
});