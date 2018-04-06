/*
* Create a list that holds all of your cards
*/
const allCards = ["diamond","diamond","paper-plane-o","paper-plane-o","anchor", "anchor","bolt","bolt","cube","cube","leaf","leaf","bicycle","bicycle","bomb","bomb"];

const deck = document.querySelector("#deck");
const restartBtn = document.querySelector("#restart");

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
  deck.innerHTML = " ";  //clears the deck every time newDeck is called

  for(cardIndex = 0; cardIndex < allCards.length; cardIndex++){
    let card = deck.appendChild(document.createElement('li'));
    card.classList.add('card');
    card.innerHTML += '<i class="fa fa-'+ allCards[cardIndex] +'"></i>';
  }
}

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
    firstCard = evt.target.children[0].classList[1];
    evt.target.classList.add("open", "show");
    flippedCards.push(firstCard);

    if(flippedCards.length === 2){
      if(flippedCards[0] === flippedCards[1]){
        matchCards.push(flippedCards[0], flippedCards[1])
        matched();
      } else {
        unmatched();
      }
    }
  }
  previousTarget = evt.target;
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
