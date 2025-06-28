import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./Components/SingleCard";
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
    setGameStarted(true);
    shuffle();
    setClicks(0);
    flipSound.play();
  };

  //handles choice
  const handleChoice = (card) => {
    if (!gameStarted) return; // Prevent clicks before game starts
    flipSound.play();
    setClicks((prevClicks) => prevClicks + 1);
    FirstOption ? setSecondOption(card) : setFirstOption(card);
  };

  useEffect(() => {
    if (FirstOption && SecondOption) {
      if (FirstOption.src === SecondOption.src) {
        matchSound.play();
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === FirstOption.src ? { ...card, matched: true } : card
          )
        );
        reset();
      } else {
        setTimeout(() => reset(), 1000);
      }
    }
  }, [FirstOption, SecondOption]);
  const reset = () => {
    setFirstOption(null);
    setSecondOption(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

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
      <img className="App-logo" src="/images/logo.png" alt="logo" />
      <h1 className="title"> Flip Card Master</h1>
      <p className="author">Created By Priscilla Mac-Gatus</p>
      <button onClick={startGame} className="newGameButton">
        Start New Game
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
      <p className="totalclicks">Total Clicks: {clicks}</p>
    </div>
  );
}

export default App;
