const wordDisplay = document.querySelector(".word-display");  
const guessesText = document.querySelector(".guesses-text b");  
const keyboardDiv = document.querySelector(".keyboard");  
const hangmanImage = document.querySelector(".hangman-box img"); 
const gameModal = document.querySelector(".game-modal"); 
const playAgainbtn = document.querySelector(".play-again");  
const audii = document.getElementById("aud");
let currentWord ,correctLetters, wrongGuessCount; 
const maxGuesses = 6; 


const resetGame = () => {
  correctLetters =[]; 
  wrongGuessCount =0; 
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`; 
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`; 
  wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join(""); 
  keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false); 
  gameModal.classList.remove("show");
} 


const getRandomword = ()=>{ 
  //selecting a random word and hint from the wordlist
  const {word , hint} = wordList[Math.floor(Math.random()*wordList.length)];  
  currentWord = word;
  console.log(word); 
  document.querySelector(".hint-text b").innerHTML = hint; 
  resetGame();
}  
const gameOver = (isVictory) =>{ 
  //After 600ms of game complete.. showing modal with relevant details
  setTimeout(()=>{ 
    const modalText = isVictory ? `you found the word:` :`The correct word was:`; 
    gameModal.querySelector("audio").src = `${isVictory ? `./succ.mp3`:`./game.mp3`}`;
    gameModal.querySelector("img").src = `images/${isVictory ? `victory` : `lost`}.gif`; 
    gameModal.querySelector("h4").innerText = `${isVictory ? `Congrats!` : `Game over!`}`; 
    gameModal.querySelector("p").innerHTML = `${modalText}<b>${currentWord}</b>`;
    gameModal.classList.add("show"); 
    audii.play();
  },300)
} 
const initGame = (button , clickedLetter) => { 
  // checking if clickedLetter is exist on the currentWord
  if(currentWord.includes(clickedLetter)){ 
    // showing all the correct letters on the word display
    [...currentWord].forEach((letter , index) => {
      if(letter === clickedLetter){ 
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText= letter; 
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    })
  }else { 
    //if clicked letter doesn't exist then update the wrongGuessCount and hangman image
    wrongGuessCount++; 
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  } 
  button.disabled =true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`; 
  if(wrongGuessCount === maxGuesses) return gameOver(false); 
  if(correctLetters.length === currentWord.length) return gameOver(true);
}
//Creating keyboard buttons and adding event listeners
for(let i=97; i <=122; i++){ 
  const button = document.createElement("button"); 
  button.innerText = String.fromCharCode(i); 
  keyboardDiv.appendChild(button); 
  button.addEventListener("click",e => initGame(e.target , String.fromCharCode(i)));
} 
getRandomword(); 
playAgainbtn.addEventListener("click",getRandomword);