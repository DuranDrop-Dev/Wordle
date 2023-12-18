import Board from './components/Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Wordle</h1>
        <Board />
        <i>*I am not the creator of this game.
          This is for educational purposes only.
          This game is my interpertation of Wordle written in REACT.
        </i>
        <i>Source at Github:</i>
        <a
          href="https://github.com/DuranDrop-Dev/Wordle"
          target="_blank"
          rel="noopener noreferrer">Github</a>
      </header>
    </div>
  );
}

export default App;
