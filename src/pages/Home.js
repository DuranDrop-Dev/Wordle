import Board from "../components/Board";
import Navigation from "../components/Navigation/Navigation";

const Home = () => {
    return (
        <>
            <Navigation />
            <h1>Wordle</h1>
            <Board />
            <i>*I am not the creator of this game.
                This is for educational purposes only.
                This game is my interpretation of Wordle written in REACT.
            </i>
            <i>Source at Github:</i>
            <a
                href="https://github.com/DuranDrop-Dev/Wordle"
                target="_blank"
                rel="noopener noreferrer">Github
            </a>
        </>
    );
}

export default Home;