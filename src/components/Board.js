import { useState } from 'react';

// Board for a word-guessing game called Wordle.
const Board = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [rowTurn, setRowTurn] = useState(0);
    const [wordle, setWordle] = useState([]);
    const [matchingIndexes, setMatchingIndexes] = useState([]);

    const initialGuess = ['', '', '', '', ''];
    const [userGuess, setUserGuess] = useState([...initialGuess]);

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
        "cell-26": { value: '', match: false },
        "cell-27": { value: '', match: false },
        "cell-28": { value: '', match: false },
        "cell-29": { value: '', match: false },
        "cell-30": { value: '', match: false },
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
        'buyer', 'cable', 'calif', 'carry', 'catch',
        'cause', 'chain', 'chair', 'chart', 'cheap',
        'check', 'chest', 'chief', 'child', 'chill',
        'china',
        'chose', 'civil', 'claim', 'clean', 'clear',
        'click', 'clock', 'close', 'coach', 'coast',
        'could', 'count', 'court', 'cover', 'craft',
        'cream', 'crime', 'cross', 'crown', 'curve',
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
        'reset',
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

        console.log(randomWord);
    }

    /**
     * Check if word is in dictionary.
     *
     * @return {boolean} - true if word is in dictionary, false otherwise
     */
    const isWordInDictionary = () => {
        // Check if word is in dictionary
        return commonFiveLetterWords.includes(userGuess.join(''));
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
        return inputValues[`cell-${(row - 1) * 5 + cell}`].match;
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

        if (currentCellNumber % 5 === 0 || currentCellId === 25) {
            event.target.focus();
            event.target.select();
        } else {
            nextCellId.focus();
            nextCellId.select();
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

        const cellLocation = cell;

        const newArrayGuess = [...userGuess];

        newArrayGuess[cellLocation - 1] = keyValue;

        setUserGuess(newArrayGuess);

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
            alert("Word is not in Worldle's dictionary. Spell check and try again.");
            return;
        }

        // Check if user's word matches the wordle
        const updatedMatchingIndexes = [...matchingIndexes];

        // Match userGuess with wordle indexes
        for (let i = 0; i < wordle.length; i++) {
            if (wordle[i] === userGuess[i]) {
                updatedMatchingIndexes.push(i);
            }
        }

        setMatchingIndexes(updatedMatchingIndexes);

        // Set match to true for all matching indexes
        setInputValues((inputValues) => {
            const newInputValues = { ...inputValues };

            const rows = 6

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
            } else {
                // Alert losing message
                alert('You Lose! Try Again!');

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
                                className={isCellMatching(rowIndex + 1, cellIndex + 1) ? "board-cell-matching" : "board-cell"}
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

export default Board