import React from 'react';
import './scoreDisplay.css';

export default function ScoreDisplay(props: { score: number; max: number }) {
  const whole = Math.floor(props.score);
  const fraction = props.score - whole;

  return (
    <>
      <span className='score-display'>
        <h3>{whole}</h3>
        {fraction > 0 && <p>.{fraction.toFixed(2).toString().slice(2)}</p>}
        <h4 className='max'>{props.max}</h4>
      </span>
    </>
  );
}
