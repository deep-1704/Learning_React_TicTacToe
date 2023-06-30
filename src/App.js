import { useState } from 'react';
import './App.css';

let CDS = [[null,null,null],[null,null,null],[null,null,null]]; 
let CP = 'X';
let top = 0;
let isOver = false;

function isGameOver(state) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      state[i][0] !== null &&
      state[i][0] === state[i][1] &&
      state[i][0] === state[i][2]
    ) {
      return CP;
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      state[0][j] !== null &&
      state[0][j] === state[1][j] &&
      state[0][j] === state[2][j]
    ) {
      return CP;
    }
  }

  // Check diagonals
  if (
    state[0][0] !== null &&
    state[0][0] === state[1][1] &&
    state[0][0] === state[2][2]
  ) {
    return CP;
  }

  if (
    state[0][2] !== null &&
    state[0][2] === state[1][1] &&
    state[0][2] === state[2][0]
  ) {
    return CP;
  }

  // Check if the game is a draw
  let isDraw = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (state[i][j] === null) {
        isDraw = false;
        break;
      }
    }
    if (!isDraw) {
      break;
    }
  }
  if (isDraw) {
    return "None";
  }

  // If no winner or draw, the game is not over
  return false;
}


let ShowTurn = () => {
  let prompt = "Next Player : ";
  if(isOver){
    prompt = "Winner : ";
  }
  return(
    <div className='title'>
      <strong>{prompt}{CP}</strong>
    </div>
  );
}

let StateBtn = ({StId}) => {
  let State = [[],[],[]];
  State[0] = CDS[0].map(val=>val);
  State[1] = CDS[1].map(val=>val);
  State[2] = CDS[2].map(val=>val);
  let currPlayer = CP;
  let gameState = isOver;
  function setState(){
    CDS[0] = State[0].map(val=>val);
    CDS[1] = State[1].map(val=>val);
    CDS[2] = State[2].map(val=>val);
    CP = currPlayer;
    top = StId;
    isOver = gameState;
  }
  return(
    <button onClick={setState}>State #{StId}</button>
  );
}

let stList = [<li key={0}><StateBtn StId={0} /></li>];

let Box = ({row,col}) =>{
  let r = row;
  let c = col;
  function handleClick(){
    if((CDS[r][c] === null) && (!isOver)){
      CDS[r][c] = CP;
      top ++;
      stList[top] = (<li key={top}><StateBtn StId={top} /></li>);

      if(isGameOver(CDS) !== false){
        CP = isGameOver(CDS);
        isOver = true;
      }
      else{
        CP = (CP == 'X')?'O':'X';
      }
    }
  }
  return(
    <div className='Square' onClick={handleClick}>{CDS[r][c]}</div>
  );
}
let StateBtnList = ({onClick}) => {
  let sl = [];
  for(let i = 0;i<=top;i++){
    sl.push(stList[i]);
  }
  return(
    <div onClick={onClick}>
      <ol>
        {sl}
      </ol>
    </div>
  );
}
let Board = () => {
  let [r1,setr1] = useState([<Box row={0} col={0}/>,<Box row={0} col={1}/>,<Box row={0} col={2}/>]);
  let [r2,setr2] = useState([<Box row={1} col={0}/>,<Box row={1} col={1}/>,<Box row={1} col={2}/>]);
  let [r3,setr3] = useState([<Box row={2} col={0}/>,<Box row={2} col={1}/>,<Box row={2} col={2}/>]);

  let [stList,setStList] = useState(<StateBtnList onClick={reloadBoxes}/>);
  let [st,setSt] = useState(<ShowTurn />);

  function reloadBoxes(){
    setr1([<Box row={0} col={0}/>,<Box row={0} col={1}/>,<Box row={0} col={2}/>]);
    setr2([<Box row={1} col={0}/>,<Box row={1} col={1}/>,<Box row={1} col={2}/>]);
    setr3([<Box row={2} col={0}/>,<Box row={2} col={1}/>,<Box row={2} col={2}/>]);
    setStList(<StateBtnList onClick={reloadBoxes}/>);
    setSt(<ShowTurn />);
  }
  return (
    <>
      <div className='Board' onClick={reloadBoxes}>
        {st}
        <div className='BoardRow'>
          {r1}
        </div>
        <div className='BoardRow'>
          {r2}
        </div>
        <div className='BoardRow'>
          {r3}
        </div>
      </div>
      <div>
        {stList}
      </div>
    </>
  );  
}

function App() {
  let [board,SetBoard] = useState(<Board />);
  return (
    <div className='Container'>
      {board}
    </div>
  );
}

export default App;