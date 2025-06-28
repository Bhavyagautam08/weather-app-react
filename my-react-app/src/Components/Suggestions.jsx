import Mood from '../assets/moodDescriptions.json';
import React from 'react'
import  { useEffect, useState } from 'react';


const Suggestions = ({weatherType , trigger}) => {
  const [suggestion, setSuggestion] = useState('');

    useEffect(() => {
  const list = Mood[weatherType] || ["Enjoy the weather!"];
  const random = list[Math.floor(Math.random() * list.length)];
  setSuggestion(random);
}, [trigger , weatherType]);

  return (

    <div className='color'>
      <h3>Suggestions for this weather : </h3>
          <p>{suggestion}</p>
    </div>
  )
}

export default Suggestions