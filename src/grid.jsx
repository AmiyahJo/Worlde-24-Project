import React from 'react';


const getFeedback = (guess, wordToGuess) => {
  //If the guess or the wordToGuess is not defined or their lengths don't match, return nothing.
 if (!guess || !wordToGuess || guess.length !== wordToGuess.length) {
   return [];
 }
  
 const feedback = []; //stores the feedback for each letter in the guess
  
 const wordArray = wordToGuess.split(''); //converts the wordToGuess to an array

  //Loops through each letter in the guess
 for (let i = 0; i < guess.length; i++) {
   if (guess[i] === wordArray[i]) {
     //If the letter is in the correct position, it's correct
     feedback.push('correct');
     wordArray[i] = null; //This is a mark to know that the letter has been used
   } else if (wordArray.includes(guess[i])) {
     //If the letter is in the word but not in the right position, it's present
     feedback.push('present');
     wordArray[wordArray.indexOf(guess[i])] = null;
   } else {
     feedback.push('absent');
   }
 }
 return feedback;
};


const Grid = ({ guesses, wordToGuess, currentGuess, gameOver }) => {
 return (
   <div className="grid">
     
     {guesses.map((guess, index) => (
      <div key={index} className="row">
        {/*Map through each letter in the guess */}
         {guess.split('').map((letter, i) => {
        // Split the guess into an array of letters
           const feedback = getFeedback(guess, wordToGuess);
        // Get the feedback for the current letter
           return (
              <span key={i} className={`tile ${feedback[i]}`}> {letter} </span>
           );
         })}
</div>
     ))}
     {/*If the game isn't over, display the current guess on the grid  */}
     {!gameOver && (
<div className="row">
         {currentGuess.split('').map((letter, index) => (
          // Splits the current guess into an array of letters
            <span key={index} className="tile">
              {letter}
            </span>
         ))}
      </div>
     )}
  </div>
 );
};
export default Grid;