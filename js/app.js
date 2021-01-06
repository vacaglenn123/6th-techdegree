const keys = document.getElementById('qwerty');
const guess = document.getElementById('phrase');
const startGame = document.querySelector('.btn__reset');
const keyrow = document.querySelector('#qwerty');
let missed = 0;
const tries = document.querySelectorAll('.tries img');
let button = document.querySelectorAll('ul BUTTON');
let addPhrase = document.createElement('li');
 let phraseUL = document.querySelector(`#phrase ul`);

// Hides intro overlay.
startGame.addEventListener('click', () => {
reset();
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 
document.getElementById('overlay').style.display = 'none';
});

// phrases that the player has to go guess through.
let phrases = [
'brad pitt',
'george clooney',
'chris hemsworth',
'david beckham',
'ryan gosling',
];

//creating a function to randomize the phrases
const getRandomPhraseAsArray = arr => {
let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)].split('');
return randomPhrase;
};

//for loop that will loop through each character, appending it to the li element.
const addPhraseToDisplay = arr => {
for (let i = 0; i < arr.length; i++){
	let addPhrase = document.createElement('li');
	addPhrase.textContent = arr[i];
	let phraseUL = document.querySelector(`#phrase ul`);
	phraseUL.appendChild(addPhrase);
   if (addPhrase.textContent === ' '){
      addPhrase.className = 'space';
} else{
       addPhrase.className = 'letter';
     }
   }
};

const checkLetter = button => {
let letters = document.querySelectorAll('li');
let match = null;
for (let i = 0; i < letters.length; i++) {
  if(letters[i].textContent === button.textContent){
    letters[i].className += ' show';
    match += letters[i].textContent;
  }
 }
 return match;
};


const checkWin = () => {
let letter = document.getElementsByClassName('letter');
let show = document.getElementsByClassName('show');

if(letter.length <= show.length){
  let result = document.getElementById('overlay');
  let title = document.querySelector('.title');
  result.className = 'win';
  title.textContent = 'You must be handsome!';
  result.style.display = 'flex';
} 

else if (missed >= 5) {
  let result = document.getElementById('overlay');
  let title = document.querySelector('.title');
   result.className = 'lose';
   title.textContent = `You know.. Only ugly people get this wrong`;
   result.style.display = 'flex';
   }
  };


keyrow.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        e.target.disabled = true;
        e.target.style.backgroundColor = 'lightgreen';
        let letterFound = checkLetter(e.target);
    if (!letterFound){
       e.target.style.backgroundColor = 'red';
        missed++;
        tries[missed -1].src = 'images/lostHeart.png';
      console.log(missed);
      }
     }
     checkWin();
  });


const reset = () => {
missed = 0;
let hearts = document.querySelectorAll('.tries img');
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].src = 'images/liveHeart.png';
  }
keyrow.innerHTML = `
             <div id="qwerty" class="section">
        <div class="keyrow">
          <button>q</button><button>w</button><button>e</button><button>r</button><button>t</button><button>y</button><button>u</button><button>i</button><button>o</button><button>p</button>
        </div>
        <div class="keyrow">
          <button>a</button><button>s</button><button>d</button><button>f</button><button>g</button><button>h</button><button>j</button><button>k</button><button>l</button>
        </div>
        <div class="keyrow">
          <button>z</button><button>x</button><button>c</button><button>v</button><button>b</button><button>n</button><button>m</button>
        </div>
      </div>
`;
document.querySelector('#phrase ul').innerHTML = '';
};
