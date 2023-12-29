import { useState } from 'react';

// Board for a word-guessing game called Wordle.
const Board = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [rowTurn, setRowTurn] = useState(0);
    const [wordle, setWordle] = useState([]);
    const [matchingIndexes, setMatchingIndexes] = useState([]);
    const [hasCharacter, setHasCharacter] = useState([]);

    const initialGuess = ['', '', '', '', ''];
    const [userGuess, setUserGuess] = useState([...initialGuess]);

    const initialValues = {
        "cell-1": { value: '', green: false, yellow: false },
        "cell-2": { value: '', green: false, yellow: false },
        "cell-3": { value: '', green: false, yellow: false },
        "cell-4": { value: '', green: false, yellow: false },
        "cell-5": { value: '', green: false, yellow: false },
        "cell-6": { value: '', green: false, yellow: false },
        "cell-7": { value: '', green: false, yellow: false },
        "cell-8": { value: '', green: false, yellow: false },
        "cell-9": { value: '', green: false, yellow: false },
        "cell-10": { value: '', green: false, yellow: false },
        "cell-11": { value: '', green: false, yellow: false },
        "cell-12": { value: '', green: false, yellow: false },
        "cell-13": { value: '', green: false, yellow: false },
        "cell-14": { value: '', green: false, yellow: false },
        "cell-15": { value: '', green: false, yellow: false },
        "cell-16": { value: '', green: false, yellow: false },
        "cell-17": { value: '', green: false, yellow: false },
        "cell-18": { value: '', green: false, yellow: false },
        "cell-19": { value: '', green: false, yellow: false },
        "cell-20": { value: '', green: false, yellow: false },
        "cell-21": { value: '', green: false, yellow: false },
        "cell-22": { value: '', green: false, yellow: false },
        "cell-23": { value: '', green: false, yellow: false },
        "cell-24": { value: '', green: false, yellow: false },
        "cell-25": { value: '', green: false, yellow: false },
        "cell-26": { value: '', green: false, yellow: false },
        "cell-27": { value: '', green: false, yellow: false },
        "cell-28": { value: '', green: false, yellow: false },
        "cell-29": { value: '', green: false, yellow: false },
        "cell-30": { value: '', green: false, yellow: false },
    };
    const [inputValues, setInputValues] = useState({ ...initialValues });

    const commonFiveLetterWords = [
        'actor', 'adopt', 'admit', 'adult', 'after',
        'again', 'agent', 'alarm', 'alive', 'allow',
        'alone', 'alter', 'angel', 'apart', 'apple',
        'apply', 'arena', 'argue', 'array', 'aside',
        'asset', 'audio', 'audit', 'award', 'badly',
        'baker', 'bases', 'basic', 'beach', 'begin',
        'being', 'bench', 'billy', 'birth', 'black',
        'blame', 'blind', 'blood', 'board', 'booth',
        'bound', 'brain', 'brand', 'bread', 'break',
        'brief', 'bring', 'broke', 'brown', 'build',
        'bully',
        'buyer', 'cable', 'calif', 'carry', 'catch',
        'cause', 'chain', 'chair', 'chart', 'cheap',
        'check', 'chest', 'chief', 'child', 'chill',
        'china',
        'chose', 'civil', 'claim', 'clean', 'clear',
        'click', 'clock', 'close', 'coach', 'coast',
        'could', 'count', 'court', 'cover', 'craft',
        'cream', 'crime', 'cross', 'crown', 'crust', 
        'curve',
        'daily', 'dance', 'dated', 'dealt', 'death',
        'delay', 'depth', 'doubt', 'dozen', 'draft',
        'drama', 'drawn', 'dream', 'dress', 'drink',
        'drive', 'drove', 'eager', 'early', 'earth',
        'eight', 'elite', 'empty', 'enemy', 'enjoy',
        'enter', 'entry', 'equal', 'error', 'event',
        'every', 'exact', 'exist', 'extra', 'faith',
        'false', 'fault', 'fiber', 'field', 'fifth',
        'fifty', 'fight', 'final', 'first', 'fixed',
        'flash', 'fleet', 'floor', 'fluid', 'focus',
        'force', 'forth', 'forum', 'found', 'frame',
        'frank', 'fraud', 'fresh', 'front', 'fruit',
        'fudge', 'fully', 'funny', 'given', 'glass',
        'glory', 'going', 'grain', 'grief', 'grove',
        'grace', 'grade', 'grand', 'grant', 'grass',
        'great', 'green', 'gross', 'group', 'grown',
        'guard', 'guess', 'guide', 'happy', 'harry',
        'heart', 'heavy', 'hence', 'henry', 'horse',
        'hotel', 'house', 'human', 'ideal', 'image',
        'index', 'inner', 'input', 'issue', 'japan',
        'jimmy', 'joint', 'jones', 'judge', 'known',
        'label', 'large', 'laser', 'later', 'laugh',
        'layer', 'learn', 'least', 'leave', 'legal',
        'level', 'lewis', 'light', 'limit', 'links',
        'lives', 'local', 'logic', 'loose', 'lower',
        'lucky', 'lunch', 'lying', 'magic', 'major',
        'maker', 'march', 'maria', 'marry', 'match',
        'maybe',
        'mayor', 'meant', 'media', 'metal', 'might',
        'minor', 'minus', 'mixed', 'model', 'money',
        'month', 'moral', 'motor', 'mount', 'mouse',
        'mouth', 'movie', 'music', 'needs', 'never',
        'night', 'noise', 'north', 'noted', 'novel',
        'nurse', 'occur', 'ocean', 'offer', 'often',
        'order', 'other', 'ought', 'paint', 'panel',
        'paper', 'party', 'paste', 'peace', 'peter',
        'phase',
        'phone', 'photo', 'piece', 'pilot', 'pitch',
        'place', 'plain', 'plane', 'plant', 'plate',
        'point', 'pound', 'power', 'press', 'price',
        'pride', 'prime', 'print', 'prior', 'prize',
        'proof', 'proud', 'prove', 'queen', 'quick',
        'quiet', 'quite', 'radio', 'raise', 'range',
        'rapid', 'ratio', 'reach', 'ready', 'refer',
        'relay', 'reset',
        'right', 'rival', 'river', 'robin', 'roger',
        'roman', 'rough', 'round', 'route', 'royal',
        'rural', 'scale', 'scene', 'score', 'sense',
        'serve', 'seven', 'shall', 'shape', 'share',
        'sharp', 'sheet', 'shelf', 'shell', 'shift',
        'shirt', 'shock', 'shoot', 'short', 'shown',
        'sight', 'since', 'sixth', 'sized', 'skill',
        'slide', 'small', 'smart', 'smith', 'smoke',
        'solid', 'solve', 'sorry', 'sound', 'south',
        'space', 'spare', 'speak', 'speed', 'spend',
        'spent', 'spoke', 'sport', 'staff', 'stage',
        'stake', 'start', 'state', 'steam', 'steel',
        'stick', 'still', 'stock', 'stone', 'stood',
        'store', 'storm', 'story', 'strip', 'stuck',
        'study', 'stuff', 'style', 'sugar', 'suite',
        'super', 'sweet', 'table', 'taken', 'taste',
        'teach', 'teeth', 'terry', 'texas', 'thank',
        'theft', 'their', 'theme', 'there', 'these',
        'thick', 'thing', 'think', 'third', 'those',
        'three', 'threw', 'throw', 'tight', 'times',
        'tired', 'title', 'today', 'topic', 'total',
        'touch', 'tower', 'track', 'trade', 'train',
        'trend', 'trial', 'tried', 'tries', 'truck',
        'truly', 'trust', 'truth', 'twice', 'under',
        'undue', 'union', 'unity', 'until', 'upper',
        'upset', 'urban', 'usage', 'usual', 'valid',
        'value', 'video', 'virus', 'visit', 'vital',
        'voice', 'waste', 'watch', 'water', 'wheel',
        'where', 'which', 'while', 'white', 'whole',
        'whose', 'woman', 'women', 'world', 'worry',
        'worse', 'worst', 'worth', 'would', 'wound',
        'write', 'wrong'
    ];

    /**
    * Handles the start of the process.
    *
    * @return {void} No return value.
    */
    const handleStart = () => {
        // Start the game
        randomizeWordle();

        setRowTurn(1);

        setIsStarted(true);

        handleFirstCellFocus();
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

        setHasCharacter(randomWord);

        console.log(randomWord);
    }

    /**
     * Check if word is in dictionary.
     *
     * @return {boolean} - true if word is in dictionary, false otherwise
     */
    const isWordInDictionary = () => {
        // Convert user guess to lowercase
        const lowerCaseWord = userGuess.join('').toLowerCase();

        // Check if word is in dictionary
        return commonFiveLetterWords.includes(lowerCaseWord);
    };

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
    * Handles the focus on the first cell in a new row.
    *
    * @return {void} No return value.
    */
    const handleNewRowFocus = async () => {
        const cellName = await document.getElementById(`cell-${rowTurn * 5 + 1}`);

        cellName.select();
        cellName.focus();
    }

    /**
    * Selects the first cell and focuses on it after a delay of 200 milliseconds.
    *
    * @param {none} none
    * @return {none} none
    */
    const handleFirstCellFocus = async () => {
        // Select the first cell and focus on it
        const firstCell = await document.getElementById("cell-1");

        firstCell.select();
        firstCell.focus();
    }

    /**
    * Checks if a cell in a row matches a specific value.
    *
    * @param {number} row - The row number.
    * @param {number} cell - The cell number.
    * @return {type} The value of the matching cell.
    */
    const isCellMatching = (row, cell) => {
        return inputValues[`cell-${(row - 1) * 5 + cell}`].green;
    }

    // FIX ME * FIX ME * FIX ME
    const isUserGuessLetterInWordle = (row, cell) => {
        const yellowLetters = [];
        // Check if user guess letter is in wordle
        for (let i = 0; i < wordle.length; i++) {
            if (wordle.indexOf(userGuess[i]) !== -1) {
                yellowLetters.push(userGuess[i]);
            }
        }

        // console.log(yellowLetters);
        // return inputValues[`cell-${(row - 1) * 5 + cell}`].yellow;
    }

    /**
    * Removes old values from inputValues and sets them to an empty string.
    *
    * @return {void} 
    */
    const removeOldValues = () => {
        // Manually clear input values
        const clearedInputValues = Object.keys(inputValues).reduce((acc, key) => {
            acc[key] = { value: '', match: false };
            return acc;
        }, {});

        setInputValues(clearedInputValues);
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
    * Handles next cell focus.
    *
    * @param {Event} event - The key up event.
    */
    const handleNextCellFocus = (event) => {
        const currentCellId = event.target.id;

        const cellPrefix = "cell-";

        const currentCellNumber = (currentCellId.match(/\d+/g) || []).join('');

        const nextCellNumber = parseInt(currentCellNumber) + 1;

        const nextCellId = document.getElementById(`${cellPrefix}${nextCellNumber.toString()}`);

        if (currentCellNumber % 5 === 0 || currentCellId === 30) {
            event.target.focus();
            event.target.select();
        } else {
            nextCellId.focus();
            nextCellId.select();
        }
    }

    /**
    * Prevents the default behavior of the backspace key and updates the user guess and input values.
    *
    * @param {object} event - The event object.
    * @param {string} keyValue - The key value.
    * @return {boolean} Returns true.
    */
    const backSpaceFunction = (event, keyValue) => {
        if (keyValue === 'Backspace') {
            // Prevent the default behavior of the backspace key
            event.preventDefault();

            // Get the current cell
            const currentCellId = event.target.id;
            const currentCellNumber = parseInt(currentCellId.split('-')[1]);

            // Update the user guess
            const newArrayGuess = [...userGuess];
            newArrayGuess.pop();
            newArrayGuess[currentCellNumber - 1] = '';
            setUserGuess(newArrayGuess);

            // Update the input values
            setInputValues((inputValues) => {
                const newInputValues = { ...inputValues };
                newInputValues[currentCellId] = { value: '', green: false, yellow: false };
                return newInputValues;
            })

            // Check if it's the first cell, no need to go back
            if (currentCellNumber > 1) {
                const previousCellId = `cell-${currentCellNumber - 1}`;
                const previousCell = document.getElementById(previousCellId);

                // Check if the previousCell is not null before focusing and selecting
                if (previousCell) {
                    previousCell.focus();
                    previousCell.select();
                }
            }

            return true;
        }
    }

    /**
    * Prevents the default behavior of the enter key and call handleSubmit function.
    *
    * @param {object} event - The event object.
    * @param {string} keyValue - The key value.
    * @return {boolean} Returns true.
    */
    const enterFunction = (event, keyValue) => {
        if (keyValue === 'Enter') {
            // Prevent the default behavior of the enter key
            event.preventDefault();

            // Submit the user's guess
            handleSubmit();

            // Return true to escape input change function
            return true;
        }
    }

    /**
    * Handles the input change event.
    *
    * @param {Object} event - The input change event object.
    * @param {number} cell - The cell location.
    */
    const handleInputChange = (event, cell) => {
        const keyValue = event.key;

        const newArrayGuess = [...userGuess];

        // Custom backspace function
        if (backSpaceFunction(event, keyValue)) {
            return;
        }

        // Custom enter function
        if (enterFunction(event, keyValue)) {
            return;
        }

        newArrayGuess[cell - 1] = keyValue.toLowerCase();

        setUserGuess(newArrayGuess);

        console.log(newArrayGuess);

        setTimeout(() => {
            handleNextCellFocus(event);
        }, 50);
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
        // Check if user's word is 5 characters
        if (userGuess.join('').length !== 5) {
            alert('Word must be 5 characters.');
            return;
        }

        // Check if word is in dictionary
        if (!isWordInDictionary()) {
            alert("Word is not in Worldle's dictionary. Spell check or try another word.");
            return;
        }

        // Check if cell should turn yellow
        // isUserGuessLetterInWordle();

        // Check if user's word matches the wordle
        const updatedMatchingIndexes = [...matchingIndexes];

        // Match userGuess with wordle indexes
        for (let i = 0; i < wordle.length; i++) {
            if (wordle[i] === userGuess[i]) {
                updatedMatchingIndexes.push(i);
            }
        }

        setMatchingIndexes(updatedMatchingIndexes);

        // Set green to true for all matching indexes
        setInputValues((inputValues) => {
            const newInputValues = { ...inputValues };

            const cells = 5

            updatedMatchingIndexes.forEach((index) => {
                if (rowTurn === 1) {
                    newInputValues[`cell-${index + 1}`].green = true;
                } else (
                    newInputValues[`cell-${(index + 1) + (cells * (rowTurn - 1))}`].green = true
                )
            });

            return newInputValues;
        });

        // Check if User won
        if (updatedMatchingIndexes.length === wordle.length) {
            alert('You Win!');

            // Reset game state and update React state
            removeOldValues();

            setRowTurn(1);

            setUserGuess([...initialGuess]);

            setMatchingIndexes([]);

            randomizeWordle();

            handleFirstCellFocus();

            return;
        } else {
            if (rowTurn < 6) {
                // next row
                setRowTurn(rowTurn + 1);

                handleNewRowFocus();

                setMatchingIndexes([]);

                setUserGuess([...initialGuess]);
            } else {
                // Alert losing message
                alert('You Lose! Try Again! The Wordle was: ' + wordle.toUpperCase());

                // Reset game state and update React state
                removeOldValues();

                setRowTurn(1);

                setUserGuess([...initialGuess]);

                setMatchingIndexes([]);

                randomizeWordle();

                handleFirstCellFocus();
            }
        }
    }

    return (
        <div className="board">
            {Array.from({ length: 6 }).map((_, rowIndex) => (
                <div
                    className={isBoardSelected(rowIndex + 1) ? "board-row-selected" : "board-row"}
                    id={`row-${rowIndex + 1}`}
                    key={`row-${rowIndex + 1}`}
                >
                    {Array.from({ length: 5 }).map((_, cellIndex) => {
                        const cellKey = `cell-${rowIndex * 5 + cellIndex + 1}`;

                        return (
                            <input
                                type="text"
                                autoComplete="off"
                                className={
                                    isCellMatching(rowIndex + 1, cellIndex + 1)
                                        ? "board-cell-green"
                                        : isUserGuessLetterInWordle(rowIndex + 1, cellIndex + 1)
                                            ? "board-cell-yellow"
                                            : "board-cell"
                                }
                                onKeyDown={(event) => handleInputChange(event, cellIndex + 1)}
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

export default Board;