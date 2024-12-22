import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import '../board/board.css'
import '../button/button.css'
import '../retry/retry.css'

export default function App(){
  const [winner,setWinner] = useState('')
  const [retry, setRetry] = useState(false)
  const [score , setScore] = useState({X: 0 , O : 0})
  
  function onWin(winner){
    console.log("winner",winner)
    setWinner(winner);
  }

  function onRetry(){
    setRetry(true)
    if (winner === 'X'){
      setScore({...score, X: score[winner] + 1 })
    } else{
    setScore({...score, O: score[winner] + 1 })
  }
}


  return (
    <>
   <Board onWin = {onWin}></Board>
   {winner? <Retry winner = {winner}></Retry> : ''}
    </>
  )
}


export function Board({onWin}){
  const [status,setStatus] = useState('X')
  const [moves,setMoves] = useState({selected:[1,2,3,4,5,6,7,8], available:9})

  function onButtonClick(id){
    const newMove = [...moves.selected.slice(0,id), status, ...moves.selected.slice(id+1)]
    const value = (status === 'X'? 'O' : 'X')
    setStatus(value)
    setMoves({selected:newMove, available: moves.available-1})
    getWinner(newMove,moves.available-1)
  }

  function getWinner(moves, available){
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
      console.log("win",moves[a])
      onWin(moves[a]);
    }
  }
 console.log("a",available)
  if (!available){
     onWin('Draw')
  }
  return null;
  }


  
  function getAllButtons() {
    let buttons = []
    for (let i=0 ; i<9 ; i++) {
      buttons.push(<Button key={i} id={i} onClick={onButtonClick} currentPlayer={status}></Button>);
    }
    return (buttons);
  }

  return (
    <div className="board" >
      {getAllButtons()}
    </div>
  )
}

export function Button({id, onClick, currentPlayer}){
  const [status,setStatus]  = useState({clicked: false , value: ''})

  function onButtonClick() {
    console.log("cur",currentPlayer);
    if(!status.clicked){
      const value = (currentPlayer === 'X') ? 'X' : 'O' 
      setStatus({clicked: true , value})
      onClick(id)
    }
  }
  return(
    <>
    <button className={`button but${id} but${status.value}`} onClick={onButtonClick} disabled={status.clicked}>{status.value}</button>
    </>
  )
}

export function WinnerBanner({winner}){

  return (
    <div className= "win-banner">
      {winner === 'Draw'? 'Draw': `Player ${winner} won`}
    </div>
  )
}

export function Retry({winner}){

  return(
    <div className="retry">
      <WinnerBanner winner= {winner}></WinnerBanner>
      <button className="but-retry"><FontAwesomeIcon icon={faRedo}/></button>
    </div>
  )
}
