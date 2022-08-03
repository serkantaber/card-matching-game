import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/dumbledore.png", matched: false },
  { "src": "/img/harry.png", matched: false },
  { "src": "/img/hermione.png", matched: false },
  { "src": "/img/ron.png", matched: false },
  { "src": "/img/snape.png", matched: false },
  { "src": "/img/voldemort.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle cards and create set of 2x6 images
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  // handle values for clicked cards and store them
  const handleChoice = (card) => {
    if (choiceOne) {
      if (choiceOne.id !== card.id) {
        setChoiceTwo(card);
      }
    } else {
      setChoiceOne(card);
    }
  }

  // control if they are both clicked and evaluate if it's a match or not
  useEffect(() => {
    if (choiceOne !== null && choiceTwo !== null) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        // give player a second to evaluate
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset the turn and add one to the turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // initialize the array at the beginning
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Match the Cards!</h1>
      <button onClick={shuffleCards}>
        <img className="button" src="img/wand.svg" alt="" />
        <span>New Game</span>
      </button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
           />
        ))}
      </div>
      <p><strong>Turns:</strong> {turns}</p>
    </div>
  );
}

export default App;
