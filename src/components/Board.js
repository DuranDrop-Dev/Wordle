import { useState } from 'react';

/**
 * A React component that represents a game board for a word-guessing game called Wordle.
 *
 * @return {JSX.Element} The rendered game board.
 */
const Board = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [rowTurn, setRowTurn] = useState(0);
    const [wordle, setWordle] = useState([]);
    const [matchingIndexes, setMatchingIndexes] = useState([]);

    const initialGuess = ['', '', '', '', ''];
    const initialValues = {
        "cell-1": { value: '', match: false },
        "cell-2": { value: '', match: false },
        "cell-3": { value: '', match: false },
        "cell-4": { value: '', match: false },
        "cell-5": { value: '', match: false },
        "cell-6": { value: '', match: false },
        "cell-7": { value: '', match: false },
        "cell-8": { value: '', match: false },
        "cell-9": { value: '', match: false },
        "cell-10": { value: '', match: false },
        "cell-11": { value: '', match: false },
        "cell-12": { value: '', match: false },
        "cell-13": { value: '', match: false },
        "cell-14": { value: '', match: false },
        "cell-15": { value: '', match: false },
        "cell-16": { value: '', match: false },
        "cell-17": { value: '', match: false },
        "cell-18": { value: '', match: false },
        "cell-19": { value: '', match: false },
        "cell-20": { value: '', match: false },
        "cell-21": { value: '', match: false },
        "cell-22": { value: '', match: false },
        "cell-23": { value: '', match: false },
        "cell-24": { value: '', match: false },
        "cell-25": { value: '', match: false },
    };

    const commonFiveLetterWords = [
        'apple', 'happy', 'music', 'table', 'bread',
        'house', 'smart', 'chair', 'peace', 'beach',
        'earth', 'cloud', 'smile', 'grape', 'ocean',
        'sunny', 'piano', 'queen', 'night', 'grass',
        'toast', 'river', 'honey', 'fence', 'flute',
        'amber', 'train', 'light', 'fairy', 'blend',
        'fresh', 'lemon', 'lunar', 'laser', 'quiet',
        'spark', 'magic', 'frost', 'power', 'lunar',
        'dance', 'cloud', 'swirl', 'lucky', 'drift',
        'flock', 'heart', 'puppy', 'dream', 'peace',
        'wheat', 'flame', 'happy', 'beard', 'spear',
        'maple', 'lunar', 'grain', 'sugar', 'chord',
        'charm', 'happy', 'globe', 'green', 'spoon',
        'music', 'brush', 'sweet', 'sugar', 'flour',
        'grain', 'field', 'chase', 'brave', 'stone',
        'plant', 'light', 'dream', 'grace', 'sweep',
        'smile', 'green', 'dream', 'peace', 'shine',
        'skirt', 'frost', 'toast', 'angel', 'frost',
        'chill', 'bliss', 'shine', 'apple', 'bread'
    ];

    const [userGuess, setUserGuess] = useState([...initialGuess]);
    const [inputValues, setInputValues] = useState({ ...initialValues });

    /**
     * Handles the start of the process.
     *
     * @return {void} No return value.
     */
    const handleStart = () => {
        randomizeWordle();
        setRowTurn(1);
        setIsStarted(true);
    }

    /**
     * Determines if a row is disabled.
     *
     * @param {any} row - The row to check.
     * @return {boolean} Returns true if the row is disabled, false otherwise.
     */
    const isRowDisabled = (row) => {
        return row !== rowTurn;
    };

    /**
     * Determines if a board is selected.
     *
     * @param {number} row - The row number of the board.
     * @return {boolean} - Returns true if the given row is the selected row, otherwise false.
     */
    const isBoardSelected = (row) => {
        return row === rowTurn;
    }

    /**
     * Handles the input change event.
     *
     * @param {Object} event - The input change event object.
     * @param {number} cell - The cell location.
     */
    const handleInputChange = (event, cell) => {
        const keyValue = event.key;
        const cellLocation = cell;

        const newArrayGuess = [...userGuess];
        newArrayGuess[cellLocation - 1] = keyValue;
        setUserGuess(newArrayGuess);
    }

    /**
     * Handles the submission.
     * Checks if the user's guess is valid and alerts if it is not.
     * Updates the matchingIndexes state if the user's guess matches the wordle.
     * Alerts the user if they have won the game and resets the game state.
     * Increments the rowTurn state if the user has not won the game.
     *
     * @return {void}
     */
    const handleSubmit = () => {
        if (userGuess.join('').length !== 5) {
            alert('Word must be 5 characters.');
            return;
        }

        const updatedMatchingIndexes = [...matchingIndexes];

        // Match userGuess with wordle
        for (let i = 0; i < wordle.length; i++) {
            if (wordle[i] === userGuess[i]) {
                updatedMatchingIndexes.push(i);
            }
        }

        setMatchingIndexes(updatedMatchingIndexes);

        // Set match to true for all matching indexes
        setInputValues((inputValues) => {
            const newInputValues = { ...inputValues };
            const rows = 5
            updatedMatchingIndexes.forEach((index) => {
                if (rowTurn === 1) {
                    newInputValues[`cell-${index + 1}`].match = true;
                } else (
                    newInputValues[`cell-${(index + 1) + (rows * (rowTurn - 1))}`].match = true
                )
            });
            return newInputValues;
        });

        // Check if User won
        if (updatedMatchingIndexes.length === wordle.length) {
            alert('You Win!');
            setRowTurn(1);

            // Manually clear input values
            const clearedInputValues = Object.keys(inputValues).reduce((acc, key) => {
                acc[key] = { value: '', match: false };
                return acc;
            }, {});

            // Reset game state and update React state
            setInputValues(clearedInputValues);
            setUserGuess([...initialGuess]);
            setMatchingIndexes([]);
            randomizeWordle();

            return;
        } else {
            if (rowTurn < 5) {
                setRowTurn(rowTurn + 1);
            } else {
                setRowTurn(1);
                randomizeWordle();
            }
            setUserGuess([...initialGuess]);
            setMatchingIndexes([]);
        }
    }

    /**
     * Generates a random word from a list of common five-letter words and sets it as the value of the 'wordle' variable.
     *
     * @return {undefined} This function does not return anything.
     */
    const randomizeWordle = () => {
        const randomIndex = Math.floor(Math.random() * commonFiveLetterWords.length);
        const randomWord = commonFiveLetterWords[randomIndex];

        setWordle(randomWord);
        console.log(randomWord);
    }

    /**
     * Sets input values on change event.
     *
     * @param {object} event - The change event object.
     * @param {number} row - The row number.
     * @param {number} cell - The cell number.
     */
    const setInputValuesOnChange = (event, row, cell) => {
        const value = event.target.value;
        setInputValues((prevInputValues) => {
            const newInputValues = { ...prevInputValues };
            const key = `cell-${(row - 1) * 5 + cell}`;
            newInputValues[key] = {
                value: value,
                match: false,
            };
            return newInputValues;
        });
    };

    /**
     * Checks if a cell in a row matches a specific value.
     *
     * @param {number} row - The row number.
     * @param {number} cell - The cell number.
     * @return {type} The value of the matching cell.
     */
    const isCellMatching = (row, cell) => {
        return inputValues[`cell-${(row - 1) * 5 + cell}`].match;
    }

    return (
        <div className="board">
            {Array.from({ length: 5 }).map((_, rowIndex) => (
                <div className={isBoardSelected(rowIndex + 1) ? "board-row-selected" : "board-row"} id={`row-${rowIndex + 1}`} key={`row-${rowIndex + 1}`}>
                    {Array.from({ length: 5 }).map((_, cellIndex) => {
                        const cellKey = `cell-${rowIndex * 5 + cellIndex + 1}`;

                        return (
                            <input
                                type="text"
                                autoComplete="off"
                                className={isCellMatching(rowIndex + 1, cellIndex + 1) ? "board-cell-matching" : "board-cell"}
                                onKeyDown={(event) => handleInputChange(event, cellIndex + 1)}
                                onKeyUp={(event) => event.target.select()}
                                disabled={isRowDisabled(rowIndex + 1)}
                                maxLength={1}
                                id={cellKey}
                                key={cellKey}
                                value={inputValues[cellKey].value}
                                onClick={(event) => event.target.select()}
                                onChange={(event) => setInputValuesOnChange(event, rowIndex + 1, cellIndex + 1)}
                            />
                        );
                    })}
                </div>
            ))}
            {!isStarted && <button className='submit' onClick={handleStart}>Start</button>}
            {isStarted && <button className='submit' onClick={handleSubmit}>Submit</button>}
        </div>
    );
}

export default Board