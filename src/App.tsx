import React from 'react';
import Card from './Card/Card';
import './index.css';
import { ScoreCard } from './ScoreCard';

const plusIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
    <path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z' />
  </svg>
);

export const trashIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
    <path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
  </svg>
);

export const resetIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
    <path d='M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z' />
  </svg>
);

function App() {
  const [cards, setCards] = React.useState<ScoreCard[]>([
    new ScoreCard(3),
    new ScoreCard(3),
  ]);

  return (
    <>
      <div className='toolbar'>
        <span
          className='tool'
          onClick={() => {
            const newCards = [...cards];
            newCards.push(new ScoreCard(3));
            setCards(newCards);
          }}>
          {plusIcon}
        </span>
        <span
          className='tool'
          onClick={() => {
            setCards([new ScoreCard(3), new ScoreCard(3)]);
          }}>
          {resetIcon}
        </span>
      </div>
      <div className='container'>
        {cards.map((c, index) => (
          <Card
            key={index}
            index={index}
            c={c}
            updateScorecard={(s) => {
              const newCards = [...cards];
              newCards[index] = s;
              setCards(newCards);
            }}
            updateScorecards={setCards}
          />
        ))}
      </div>
    </>
  );
}

export default App;
