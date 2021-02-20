'use strict';
//Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //getElementById is a little bit faster than querySelector
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;
//Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

init();

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
      //'toggle' adds when the class isn't there, and remove it when it is there.
    }
  }
});

//Holding dice functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else switchPlayer();
  }
});

//Resetting the game
btnNew.addEventListener('click', init);

/*
//nine JavaScript topics
1) high-level
Every program that runs on our computer needs some hardware resources, such as memory and the CPU to do its work.
There are low-level languages(fast and optimized) like C, and high-level languages(easy) like JavaScript and python. 
We have to manually manage the resources with low-level languages, like asking the computer for memory to create a new variable.
But we don't have to do that with high-level languages, because they have so-called abstractions that take all of that work away from us.

2) garbage collected
Garbage-collection is basically an algorithm inside the JavaScript engine.
It automatically removes old, unused objects from the computer memory, in order not to clog it up with unnecessary stuff.
It's a cleaning guy who cleans our memory from time to time so that we don't have to do it manually in our code.

3) Interpreted or just-in-time compiled
Computer's processor only understands zeros and ones.
So if we write a program, translating to machine code is necessary. And we call it 'compiling' or 'interpreting'.
In JavaScript, compiling happens inside the JavaScript engine.

4) multi-paradigm
In programming, a paradigm will ultimately direct the coding style and technique in a project.
Three popular paradigms are procedural, object-oriented, and functional programming.
Procedural programming is basically just organizing the code in a very linear way, with some functions in between.
Many languages are only procedural, or only object-oriented, or only functional.
But JavaScript does all of it, so it's really flexible and versatile.

5) Prototype-based object-oriented
Almost everything in JavaScript is an object, except for primitive values such as numbers, strings, etc.
For example, arrays are object. We create arrays from an array blueprint, which is like a template. And this is called the prototype.
This prototype contains all the array methods and the arrays that we create in our code then inherit the methods from the blueprint
so that we can use them on the arrays.

6) First-class functions
First-class functions are functions that are treated just as regular variables.
We can pass first-class functions into other functions, and we can even return first-class functions from functions.
For example, in "overlay.addEventListener('click', closeModal);", closeModal is a first-class function.

7) Dynamic
In JavaScript, we don't assign data types to variables. And the type of variables can easily be changed as we reassign variables.
The types only became known when the JavaScript engine executes our code.
This is basically what dynamically-typed means.
If we assign data types, we can prevent bugs from happening.
And because JavaScript doesn't assign that, people say that it should be a strongly-typed language as well.

8) Single-threaded and Non-blocking event loop
Concurrency model means 'how the JavaScript engine handles multiple tasks happening at the same time'.
Because JavaScript itself runs in one single-thread, so we need a way of handling multiple things happening at the same time.
By using event loop, we can take long-running tasks, execute them in the background,
and then puts them back in the main thread once they are finished.
And this is, JavaScript's non-blocking event loop concurrency model with a single thread.
*/
