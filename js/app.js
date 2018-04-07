/*
* Create a list that holds all of your cards
*/
const allCards = ["diamond","diamond","paper-plane-o","paper-plane-o","anchor", "anchor","bolt","bolt","cube","cube","leaf","leaf","bicycle","bicycle","bomb","bomb"];

const deck = document.querySelector("#deck");
const restartBtn = document.querySelector("#restart");
const movesCounter = document.querySelector(".moves");
const scorePanel = document.querySelector(".stars");
const stars = scorePanel.querySelectorAll("li");
const timer = document.querySelector(".timer");
const congratsModal = document.querySelector(".congrats-modal");
const closeCongrats = document.querySelector(".close-modal");

let moves = 0;
let sec = 0;
let min = 0;
let interval;

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// ---- Creates a new deck of shuffled cards
function newDeck(){
  let cardsOnBoard = shuffle(allCards);
  //clears the deck, moves, stars and timer every time newDeck is called
  deck.innerHTML = " ";
  moves = 0;
  movesCounter.innerHTML = moves;
  for (star of stars) {
      star.style.visibility = 'visible';
  }
  resetTimer();

  for(cardIndex = 0; cardIndex < allCards.length; cardIndex++){
    let card = deck.appendChild(document.createElement('li'));
    card.classList.add('card');
    card.innerHTML += '<i class="fa fa-'+ allCards[cardIndex] +'"></i>';
  }
  // closeModal();
};

window.onload = newDeck();
//
// ---- Restart button ----
restartBtn.addEventListener("click", newDeck);

/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

let firstCard = "";
let secondCard = "";
let matchCards = []; // stores matched cards
let flippedCards = [];  // keeps track of how many cards were flipped
let previousTarget = null; //to avoid that the same card is clicked 2x

// evt.target.nodeName: verifies target is desired element ; flippedCards only allow two selections at a time
deck.addEventListener('click', function (evt) {
  if (evt.target.nodeName === 'LI' && flippedCards.length < 2) {
    timeCounter();
    firstCard = evt.target.children[0].classList[1];
    evt.target.classList.add("open", "show");
    flippedCards.push(firstCard);

    if(flippedCards.length === 2){
      moveCounter();
      if(flippedCards[0] === flippedCards[1]){
        matchCards.push(flippedCards[0], flippedCards[1])
        matched();
        previousTarget = evt.target;
      } else {
        unmatched();
      }
    }
  }
  congrats();
});
// ---- END of deck.addEventListener

// ----  when cards are a match ----
//
const matched = () => {
  flippedCards = [];
  let show = document.querySelectorAll('.show');

  show.forEach(card => {
    card.classList.add('match');
  });
};

// ---- when cards are an unmatch ----
//
const unmatched = () => {
  console.log("there's no match", flippedCards);
  firstCard = '';
  secondCard = '';
  flippedCards = [];
// ---- sets a delay to turn card back in the original position
  setTimeout(function(){
    const selectElem = document.querySelectorAll('.show')
    for (var i=0; i<selectElem.length; i++) {
      selectElem[i].classList.remove('show', 'open');
    }
  },500);
};

// ---- Moves Counter function
// & Stars Rating based on moves ----
function moveCounter(){
  moves++;
  movesCounter.innerHTML = moves;

  if (moves === 10) {
      scorePanel.lastElementChild.style.visibility = 'hidden';
  } else if (moves === 20) {
      scorePanel.lastElementChild.previousElementSibling.style.visibility = 'hidden';
  }
}

// ---- Time counter ----
//
function timeCounter(){
	timer.innerHTML = "Time "+ min + ":" + sec;
	sec++;
	if (sec === 60) {
		min++;
		sec = 0;
	}
}
// ---- Restart time counter ----
//
function resetTimer(){
	sec = 0;
  min = 0;
	clearInterval(interval);
	timer.innerHTML = "Time 0:0";
}

// Congratulations modal when all cards match, show all details
//
function congrats(){
    if (matchCards.length === 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // shows modal
        congratsModal.classList.add("show-modal");

        // declare star rating
        let starRating = document.querySelector(".stars").innerHTML;

        //display move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        // Play again
        closeModal();
    };
}

// ---- Close modal ----
//
function closeModal(){
    closeCongrats.addEventListener("click", function(evt){
        congratsModal.classList.remove("show-modal");
        newDeck();
        matchCards = [];
    });
}
