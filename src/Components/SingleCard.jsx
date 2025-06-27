import "./SingleCard.css";

function SingleCard({ card, handleChoice, flipped }) {
  function handleCardClick() {
    if (!flipped && !card.matched) {
      handleChoice(card);
    }
  }
  return (
    <div className="card" onClick={handleCardClick}>
      <div className={flipped ? "flipped" : ""}>
        <img className="card-front" src={card.src} alt="card front" />
        <img
          className="card-back"
          src="/images/covercard.jpg"
          alt="card back"
        />
      </div>
    </div>
  );
}

export default SingleCard;
