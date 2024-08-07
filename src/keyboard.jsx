import React from 'react';

const Keyboard = ({ onKeyPress }) => {
   
 const keys = [
   'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
   'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
   'Z', 'X', 'C', 'V', 'B', 'N', 'M',
   'Backspace', 'Enter'
 ];
   
 const handleClick = (key) => {
   onKeyPress(key);
    // click the key
 };
   
 return (
<div className="keyboard">
     {keys.map((key, index) => (
   // Splits the current guess into an array of letters
<button key={index} onClick={() => handleClick(key)}> {key} </button>
     ))}
</div>
 );
};
export default Keyboard;