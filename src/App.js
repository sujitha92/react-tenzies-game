import './App.css';
import Die from "./Die";
import React from "react";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";

function App() {

  const[dice,setDice] = React.useState(allNewDice());
  const[tenzies,setTenzies] = React.useState(false);

    function isEqual(array) {
        var first = array[0].value;
        return array.every(element => {
            return element.value === first && element.isHeld;
        });
    }

      React.useEffect(()=> {
          setTenzies(isEqual(dice));
      },[dice]);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

  function rollDice(){
     if(!tenzies){
         setDice(oldDice=>(
             oldDice.map(die=>{
                 return die.isHeld?
                     die :
                     generateNewDie();
             })
         ))
     }else{
         setDice(allNewDice());
     }

  }

  function holdDice(id){

        setDice(oldDice=>(
            oldDice.map(die=>{
                return die.id===id?
                    {...die,isHeld:!die.isHeld} :
                    die
            })
        ))
  }

    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} id={die.id} handleClick={holdDice}/>
    ))
  return (
    <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzie</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <br/>
      <button className="dice-roll" onClick={rollDice}>{tenzies?"New Game": "Roll"}</button>
    </main>
  );
}

export default App;
