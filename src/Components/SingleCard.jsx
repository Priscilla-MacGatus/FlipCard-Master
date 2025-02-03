import "./SingleCard.css";

function SingleCard({ card, handleChoice }) {
  function handleCardClick() {
    handleChoice(card);
  }
  return (
    <div className="card">
      <div>
        <img className="card-front" src={card.src} alt="card front" />
        <img
          className="back-front"
          src="/images/covercard.jpg"
          alt="card back"
          onClick={handleCardClick}
        />
      </div>
    </div>
  );
}

export default SingleCard;
