import './SingleCard.css'

export default function SingleCard( { card, handleChoice, flipped, disabled } ) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="front of a card" />
        <img className="back" src="img/cards-cover.png" onClick={handleClick} alt="cover of a card" />
      </div>
    </div>
  )
}