import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./Components/SingleCard";

// Add this at the top of your App.js file
const flipSound = new Audio("/Sounds/flip.wav");
const matchSound = new Audio("/Sounds/match.wav");
const winSound = new Audio("/Sounds/win.wav");

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
  const [clicks, setClicks] = useState(0);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true); // Mark game as started
    shuffle(); // Shuffle the cards
    setClicks(0); // Reset clicks at the start
    flipSound.play(); // Play sound on game start
  };

  //handles choice
  const handleChoice = (card) => {
    if (!gameStarted) return; // Prevent clicks before game starts
    flipSound.play();
    setClicks((prevClicks) => prevClicks + 1);
    FirstOption ? setSecondOption(card) : setFirstOption(card);
  };

  //compared selected cards
  useEffect(() => {
    if (FirstOption && SecondOption) {
      if (FirstOption.src === SecondOption.src) {
        matchSound.play();
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

  //shuffles the cards
  const shuffle = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffled);
    setTurns(0);
    setFirstOption(null);
    setSecondOption(null);
    setClicks(0);
  };

  const checkWin = () => {
    if (cards.every((card) => card.matched)) {
      winSound.play();
    }
  };

  useEffect(() => {
    checkWin();
  }, [cards]);

  return (
    <div className="App">
      <h1> Match Master</h1>

      <button onClick={startGame} className="newGameButton">
        Restart
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

      <p>Total Clicks: {clicks}</p>
    </div>
  );
}

export default App;
