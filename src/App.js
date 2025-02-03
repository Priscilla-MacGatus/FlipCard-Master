import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./Components/SingleCard";

const cardImages = [
  { src: "/images/queen1.jpg", matched: false },
  { src: "/images/queen2.jpg", matched: false },
  { src: "/images/queen3.jpg", matched: false },
  { src: "/images/queen4.jpg", matched: false },
  { src: "/images/queen5.jpg", matched: false },
  { src: "/images/queen6.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [FirstOption, setFirstOption] = useState(null);
  const [SecondOption, setSecondOption] = useState(null);

  //handles choice
  const handleChoice = (card) => {
    FirstOption ? setSecondOption(card) : setFirstOption(card);
  };

  //compared selected cards
  useEffect(() => {
    if (FirstOption && SecondOption) {
      if (FirstOption.src === SecondOption.src) {
        // If cards match, mark them as matched
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === FirstOption.src ? { ...card, matched: true } : card
          )
        );
        reset();
      } else {
        // If no match, flip them back after a short delay
        setTimeout(() => reset(), 1000);
      }
    }
  }, [FirstOption, SecondOption]);

  //resets and increase turns
  const reset = () => {
    setFirstOption(null);
    setSecondOption(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  //shuffles the careds
  const shuffle = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffled);
    setTurns(0);
    setFirstOption(null);
    setSecondOption(null);
  };

  return (
    <div className="App">
      <h1>Magic Card Match</h1>

      <button onClick={shuffle} className="newGameButton">
        New Game
      </button>

      <div className="card-container">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === FirstOption || card === SecondOption || card.matched
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;
