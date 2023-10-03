// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react'

// Data
import { wordsList } from "./data/words"

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPicketCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    //escolher um categoria aleatória
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    console.log(category)

    //escolher um palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    console.log(word)

    return { word, category }

  }

  // Start
  const startGame = () => {
    //escolher valor e escolher category
    const { word, category } = pickWordAndCategory()

    //criando um array de letras
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    console.log(word, category)
    console.log(wordLetters)

    //preencher status
    setPickedWord(word)
    setPicketCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }

  // Verificação de letras digitadas
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  // Reiniciar o jogo
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" &&
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      }
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
