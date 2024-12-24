import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import '../board/board.css'
import '../button/button.css'
import '../retry/retry.css'
import { AiMove } from './utils';

export default function App() {
  const [winner, setWinner] = useState('')
  const [retry, setRetry] = useState(false)
  const [score, setScore] = useState({ X: 0, O: 0 })


  function onWin(winner) {
    setWinner(winner);
  }

  function onRetry() {
    setRetry(true)
    setWinner('')
    if (winner === 'X') {
      setScore({ ...score, X: score[winner] + 1 })
    } else if (winner === 'O') {
      setScore({ ...score, O: score[winner] + 1 })
    }
  }

  function afterRetry() {
    setRetry(false)
  }


  return (
    <>
      <Score score={score} />
      <Board onWin={onWin} retry={retry} afterRetry={afterRetry}></Board>
      {winner ? <Retry winner={winner} onRetry={onRetry}></Retry> : ''}
    </>
  )
}


export function Board({ onWin, retry, afterRetry }) {
  const [status, setStatus] = useState('X')
  const [moves, setMoves] = useState({ selected: [1, 2, 3, 4, 5, 6, 7, 8], available: 9 })
  const buttonss = [...Array(9)]
  const buttonRefs = useRef(buttonss);

  useEffect(() => {
    if (retry) {
      setMoves({ selected: [1, 2, 3, 4, 5, 6, 7, 8], available: 9 });
      afterRetry();
    }
  }, [retry, afterRetry])

  console.log("refss", buttonRefs)

  function onButtonClick(id) {
    const newMove = [...moves.selected.slice(0, id), status, ...moves.selected.slice(id + 1)]
    const value = (status === 'X' ? 'O' : 'X')
    setStatus(value)
    setMoves({ selected: newMove, available: moves.available - 1 })
    getWinner(newMove, moves.available - 1)
    console.log(AiMove(newMove, moves.available - 1));
  }

  function getWinner(moves, available) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
        onWin(moves[a]);
      }
    }
    if (!available) {
      onWin('Draw')
    }
    return null;
  }




  function getAllButtons() {
    return ([...Array(9)].map((_, i) => (
      <Button key={i} id={i} onClick={onButtonClick} currentPlayer={status} retry={retry} ref={buttonRefs} ></Button>
    )));
  }

  return (
    <div className="board" >
      {getAllButtons()}
    </div>
  )
}

export function Button({ id, onClick, currentPlayer, retry, ref }) {
  const [status, setStatus] = useState({ clicked: false, value: '' })
  console.log('reff', ref);

  useEffect(() => {
    if (retry) {
      setStatus({ clicked: false, value: '' });
    }
  }, [retry])

  function onButtonClick() {
    if (!status.clicked) {
      const value = (currentPlayer === 'X') ? 'X' : 'O'
      setStatus({ clicked: true, value })
      onClick(id)
    }
  }
  return (
    <>
      <button className={`button but${id} but${status.value}`} onClick={onButtonClick} disabled={status.clicked} ref={(el) => (ref.current[id] = el)} >{status.value}</button>
    </>
  )
}

export function WinnerBanner({ winner }) {

  return (
    <div className="win-banner">
      {winner === 'Draw' ? 'Draw' : `Player ${winner} won`}
    </div>
  )
}

export function Retry({ winner, onRetry }) {

  return (
    <div className="retry">
      <WinnerBanner winner={winner}></WinnerBanner>
      <button className="but-retry" onClick={onRetry}><FontAwesomeIcon icon={faRedo} /></button>
    </div>
  )
}

export function Score({ score }) {
  return (
    <div className="score">
      <h2>Score</h2>
      <div>
        <p>{`X: ${score.X}`}</p>
        <p>{`O: ${score.O}`}</p>
      </div>
    </div>
  )
}