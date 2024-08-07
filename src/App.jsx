import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './grid';
import Keyboard from './keyboard';

const wordsWithDefinitions = [
 { word: 'ALOOF', definition: 'reserved, distant.' },
 { word: 'CANNY', definition: 'shrewd, careful.' },
 { word: 'DETER', definition: 'to discourage, prevent from doing.' }, 
 { word: 'FLOUT', definition: 'to disregard or disobey openly.' },
 { word: 'INANE', definition: 'silly and meaningless.' },
];

const App = () => {

 const [wordToGuess, setWordToGuess] = useState('');
 const [definition, setDefinition] = useState('');
 const [guesses, setGuesses] = useState([]); //stores the guesses made by the user
 const [currentGuess, setCurrentGuess] = useState(''); //stores the current guess
 const [showHint, setShowHint] = useState(false); //stores whether the hint is shown or not
 const [gameOver, setGameOver] = useState(false); //stores whether the game is over or not

  //sets the currentGuess to the wordToGuess when it changes
  useEffect(() => {
   const randomWordObject = wordsWithDefinitions[Math.floor(Math.random() * wordsWithDefinitions.length)];
    
   setWordToGuess(randomWordObject.word);
   setDefinition(randomWordObject.definition);
    
   console.log("Word to guess: ", randomWordObject.word);
   console.log("Definition: ", randomWordObject.definition);
 }, []);

  //Keyboard stuff 
 const handleKeyPress = (key) => { 
   if (gameOver) {
     return; //Should ignore the keyboard if the game is over
   } if (key === 'Enter') {
     
     if (currentGuess.length === wordToGuess.length) {
       const newGuesses = [...guesses, currentGuess];
       setGuesses(newGuesses); //adds the current guess to the list of guesses 
       
       if (currentGuess === wordToGuess) {
         setGameOver(true);
         alert(`Congratulations! You guessed the word: ${wordToGuess}!`);
       } else if (newGuesses.length >= 6) {
         setGameOver(true);
         alert(`Game Over! The word was ${wordToGuess}.`);
       }
       setCurrentGuess(''); //Resets the current guess
     }
   } else if (key === 'Backspace') {
     setCurrentGuess(currentGuess.slice(0, -1));
   } else if (key.length === 1 && currentGuess.length < wordToGuess.length) {
     setCurrentGuess(currentGuess + key); //adds the key to the current guess
   }
 };
  
 const handleHint = () => {
   setShowHint(true);
   console.log("Hint button clicked");
 };
  
 return (
<div className="app">
<h1>Wordle SAT</h1>
  
<Grid guesses={guesses} wordToGuess={wordToGuess} currentGuess={currentGuess} gameOver={gameOver} />
     {/* 'Render'> show my keyboard obly if the game isn't over */}
     {!gameOver && <Keyboard onKeyPress={handleKeyPress} />}  

       {/*Show the hint button only if you
          1. made 3 guesses
          2. Hint button hasn't been shown
          3. The game isn't over */}
     {guesses.length >= 3 && !showHint && !gameOver && (
        <button onClick={handleHint}>Hint</button>
     )}
  
  {/*Shows the hint button only if showHint is true  */}
     {showHint && (
        <p className="hint">Hint: {definition}</p>
     )}
  
  {/*Show the message below ONLY if the game is over  */}
     {gameOver && (
<p>Game Over! The word was {wordToGuess}.</p>
     )}
</div>
 );
};
export default App;