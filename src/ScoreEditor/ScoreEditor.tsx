import React from 'react';
import { ScoreCard } from '../ScoreCard';
import './scoreEditor.css';

const targetFaceColors = [
  '#fff',
  '#fff',
  '#fff',
  '#000',
  '#000',
  '#13bdcb',
  '#13bdcb',
  '#f26b45',
  '#f26b45',
  '#f8e002',
  '#f8e002',
];
const targetFaceTextColors = [
  '#000',
  '#000',
  '#000',
  '#fff',
  '#fff',
  '#fff',
  '#fff',
  '#fff',
  '#fff',
  '#000',
  '#000',
];

export default function ScoreEditor(props: {
  scorecard: ScoreCard;
  setScorecard: (scorecard: ScoreCard) => void;
}) {
  // React.useEffect(() => {
  //   if (!tableRef.current) return;

  //   const onPaste = async () => {
  //     if (document.activeElement !== tableRef.current) return;
  //     const csv = await navigator.clipboard.readText();
  //     try {
  //       const scorecard = ScoreCard.fromCSV(csv);
  //       scorecard.name = props.scorecard.name;
  //       scorecard.handicap = props.scorecard.handicap;
  //       scorecard.nationality = props.scorecard.nationality;
  //       props.setScorecard(scorecard);
  //     } catch (e) {
  //       console.error(e);
  //       window.alert('Invalid CSV, check console for more info');
  //     }
  //   };

  //   window.addEventListener('paste', onPaste);

  //   return () => {
  //     window.removeEventListener('paste', onPaste);
  //   };
  // }, [props, props.setScorecard]);

  const arrowsPerEnd = props.scorecard.arrowsPerEnd;

  return (
    <div className='score-editor'>
      <p
        className='handicap'
        onClick={() => {
          const handicap = prompt('Enter handicap');
          if (handicap) {
            props.scorecard.handicap = parseFloat(handicap.replace(',', '.'));
            props.setScorecard(props.scorecard);
          }
        }}>
        Handicap: {props.scorecard.handicap.toFixed(4)}
      </p>
      <table>
        <thead>
          <td>#</td>
          {[...Array(arrowsPerEnd)].map((_, index) => (
            <td>{index + 1}</td>
          ))}
          <td>Total</td>
        </thead>
        <tbody>
          {props.scorecard.rounds.map((round, index) => {
            const arrows = round.arrows;

            if (!arrows.length) return <></>;

            const total = arrows.reduce((a, b) => {
              return a + b;
            }, 0);

            return (
              <tr>
                <td>{index + 1}</td>
                {[
                  ...arrows,
                  ...Array(arrowsPerEnd - arrows.length).map(() => 0),
                ].map((arrow, i) => (
                  <td
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const newValue = parseInt(
                        prompt('Enter new value') || '',
                      );
                      if (isNaN(newValue)) return;

                      const newArrows = [...arrows];
                      newArrows[i] = Math.min(10, Math.max(0, newValue));
                      round.arrows = newArrows;
                      props.setScorecard(props.scorecard);
                    }}>
                    <span>{arrow}</span>
                  </td>
                ))}
                <td>{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='arrow-scores'>
        {[...Array(11)].map((_, index) => {
          return (
            <span
              onClick={() => {
                const score = index;
                if (props.scorecard.rounds.length === 0)
                  props.scorecard.addRound();
                let round =
                  props.scorecard.rounds[props.scorecard.rounds.length - 1];
                if (round.arrows.length >= props.scorecard.arrowsPerEnd)
                  props.scorecard.addRound();
                round =
                  props.scorecard.rounds[props.scorecard.rounds.length - 1];

                round.arrows.push(score);
                props.setScorecard(props.scorecard);
              }}
              style={{
                backgroundColor: targetFaceColors[index],
                color: targetFaceTextColors[index],
              }}>
              <p>{index === 0 ? 'M' : index}</p>
            </span>
          );
        })}
      </div>
    </div>
  );
}
