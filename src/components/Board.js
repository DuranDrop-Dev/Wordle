import { useContext } from 'react';
import { StateContext } from '../utils/StateContext';
import { updateUserStats } from '../utils/UserData';
import { getAuth } from 'firebase/auth';

// Board for a word-guessing game called Wordle.
const Board = ( email ) => {
    const CELL_PER_ROW = 5;
    const BOARD_ROWS = 6;
    const BOARD_CELLS = BOARD_ROWS * CELL_PER_ROW;

    const emailAuth = getAuth();
    const emailUser = emailAuth.currentUser;

    const {
        isStarted, setIsStarted, rowTurn, setRowTurn,
        wordle, setWordle, userGuess, setUserGuess,
        inputValues, setInputValues
    } = useContext(StateContext);

    const wordleDictionary = [
        'actor', 'adopt', 'admit', 'adult', 'after',
        'again', 'agent', 'alarm', 'alive', 'allow',
        'alone', 'alter', 'angel', 'anger', 'angle',
        'angry', 'apart', 'alpha', 'apple',
        'apply', 'arena', 'argue', 'array', 'aside',
        'asset', 'audio', 'audit', 'award', 'badly',
        'baker', 'bases', 'basic', 'beach', 'begin',
        'being', 'below', 'bench', 'billy', 'birth',
        'black',
        'blame', 'blind', 'blink', 'block', 'blood',
        'bored', 'bound', 'board', 'booth',
        'bound', 'brain', 'brand', 'bread', 'break',
        'brief', 'bring', 'broke', 'brown', 'build',
        'bully',
        'buyer', 'cable', 'calif', 'carry', 'catch',
        'cause', 'chain', 'chair', 'chart', 'chase',
        'cheap',
        'check', 'chest', 'chess', 'chief', 'child',
        'chill',
        'china', 'chloe', 'choir', 'chord', 'chose',
        'chose', 'civil', 'claim', 'clean', 'clear',
        'click', 'clock', 'close', 'cloud', 'coach',
        'coast',
        'could', 'count', 'court', 'cover', 'craft',
        'cream', 'crime', 'cross', 'crown', 'crust',
        'curve',
        'daily', 'dance', 'dated', 'dealt', 'death',
        'delay', 'depth', 'doubt', 'dozen', 'draft',
        'drain', 'drama', 'drawn', 'dream', 'dress',
        'drink',
        'drive', 'drove', 'eager', 'early', 'earth',
        'eight', 'elite', 'empty', 'enemy', 'enjoy',
        'enter', 'entry', 'equal', 'error', 'event',
        'every', 'exact', 'exist', 'extra', 'faith',
        'false', 'fault', 'fiber', 'field', 'fifth',
        'fifty', 'fight', 'final', 'first', 'fixed',
        'flame', 'flash', 'fleet', 'float', 'floor',
        'flour', 'flown', 'fluid', 'focus', 'foggy',
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
        'nurse', 'oasis', 'occur', 'ocean', 'offer',
        'often', 'older', 'olive', 'omega', 'opera',
        'order', 'other', 'ought', 'paint', 'panel',
        'paper', 'party', 'paste', 'patch', 'peace',
        'peter',
        'phase',
        'phone', 'photo', 'piece', 'pilot', 'pinky',
        'pitch',
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
        'spent', 'spoil', 'spoke', 'sport', 'staff',
        'stage',
        'stake', 'start', 'state', 'steam', 'steel',
        'stick', 'still', 'stock', 'stone', 'stood',
        'store', 'storm', 'story', 'strip', 'stuck',
        'study', 'stuff', 'style', 'sugar', 'suite',
        'super', 'sweet', 'table', 'taken', 'taste',
        'teach', 'teeth', 'terry', 'texas', 'thank',
        'theft', 'their', 'theme', 'there', 'these',
        'thick', 'thing', 'think', 'third', 'those',
        'three', 'threw', 'throw', 'tight', 'times',
        'tired', 'title', 'today', 'token', 'topic',
        'total',
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
        setInputValues(generateInputValues)

        randomizeWordle();

        setRowTurn(1);

        setIsStarted(true);

        setTimeout(() => {
            handleFirstCellFocus();
        }, 50);
    }

    const generateInputValues = () => {
        const newObject = {};
        for (let i = 1; i <= BOARD_CELLS; i++) {
            newObject[`cell-${i}`] = { value: '', green: false, yellow: false };
        }
        return newObject;
    }

    /**
    * Generates a random word from a list of common five-letter words and sets it as the value of the 'wordle' variable.
    *
    * @return {undefined} This function does not return anything.
    */
    const randomizeWordle = () => {
        const randomIndex = Math.floor(Math.random() * wordleDictionary.length);

        const randomWord = wordleDictionary[randomIndex];

        setWordle(randomWord);

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
        return wordleDictionary.includes(lowerCaseWord);
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
    const isLetterGreen = (row, cell) => {
        return inputValues[`cell-${(row - 1) * 5 + cell}`].green;
    }

    /**
    * Checks if a cell in a row matches a specific value.
    *
    * @param {number} row - The row number.
    * @param {number} cell - The cell number.
    * @return {type} The value of the matching cell.
    */
    const isLetterYellow = (row, cell) => {
        return inputValues[`cell-${(row - 1) * 5 + cell}`].yellow;
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
            setUserGuess(newArrayGuess);

            // Update the input values
            setInputValues((prevInputValues) => {
                const newInputValues = { ...prevInputValues };
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
    * Determines if a key is unwanted.
    *
    * @param {Event} event - The event object.
    * @param {string} keyValue - The value of the key.
    * @returns {boolean} - Returns true if the key is unwanted, otherwise false.
    */
    const isUnwantedKey = (event, keyValue) => {
        if (
            keyValue === 'CapsLock' ||
            keyValue === 'Shift' ||
            keyValue === 'Control' ||
            keyValue === 'Alt' ||
            keyValue === 'Tab' ||
            keyValue === 'Space' ||
            keyValue === 'ArrowLeft' ||
            keyValue === 'ArrowRight' ||
            keyValue === 'ArrowUp' ||
            keyValue === 'ArrowDown' ||
            keyValue === 'Insert' ||
            keyValue === 'Home' ||
            keyValue === 'Delete' ||
            keyValue === 'End' ||
            keyValue === 'PageUp' ||
            keyValue === 'PageDown' ||
            keyValue === 'NumLock' ||
            keyValue === 'Pause' ||
            keyValue === 'ScrollLock' ||
            keyValue === 'Meta' ||
            keyValue === 'AltGraph' ||
            keyValue === 'ContextMenu' ||
            keyValue === 'AltGraph' ||
            keyValue === 'Dead' ||
            keyValue === 'F1' ||
            keyValue === 'F2' ||
            keyValue === 'F3' ||
            keyValue === 'F4' ||
            keyValue === 'F5' ||
            keyValue === 'F6' ||
            keyValue === 'F7' ||
            keyValue === 'F8' ||
            keyValue === 'F9' ||
            keyValue === 'F10' ||
            keyValue === 'F11' ||
            keyValue === 'F12' ||
            keyValue === 'Escape' ||
            keyValue === '1' ||
            keyValue === '2' ||
            keyValue === '3' ||
            keyValue === '4' ||
            keyValue === '5' ||
            keyValue === '6' ||
            keyValue === '7' ||
            keyValue === '8' ||
            keyValue === '9' ||
            keyValue === '0' ||
            keyValue === '.' ||
            keyValue === ',' ||
            keyValue === ';' ||
            keyValue === ':' ||
            keyValue === '!' ||
            keyValue === '@' ||
            keyValue === '#' ||
            keyValue === '$' ||
            keyValue === '%' ||
            keyValue === '^' ||
            keyValue === '&' ||
            keyValue === '*' ||
            keyValue === '(' ||
            keyValue === ')' ||
            keyValue === '_' ||
            keyValue === '+' ||
            keyValue === '{' ||
            keyValue === '}' ||
            keyValue === '[' ||
            keyValue === ']' ||
            keyValue === '|' ||
            keyValue === '-' ||
            keyValue === '+' ||
            keyValue === '<' ||
            keyValue === '>' ||
            keyValue === '?' ||
            keyValue === '/' ||
            keyValue === '`' ||
            keyValue === '~' ||
            keyValue === '=' ||
            keyValue === "'" ||
            keyValue === '"' ||
            keyValue === "|" ||
            keyValue === "\\" ||
            keyValue === 'Clear'
        ) {
            event.preventDefault();
            return true;
        }
    }

    /**
    * Handles KeyDown Event write input to inputValues state.
    *
    * @param {Object} event - The input event object.
    * @param {number} row - The row location.
    * @param {number} cell - The cell location.
    */
    const handleKeyDown = (event, row, cell) => {
        // Get the key value
        const keyValue = event.key;

        // Prevent the default behavior of unwanted keys
        if (isUnwantedKey(event, keyValue)) {
            return;
        }

        // Custom backspace function
        if (backSpaceFunction(event, keyValue)) {
            return;
        }

        // Custom enter function
        if (enterFunction(event, keyValue)) {
            return;
        }

        // Update the user guess
        const newArrayGuess = [...userGuess];
        newArrayGuess[cell - 1] = keyValue.toLowerCase();
        setUserGuess(newArrayGuess);

        // Update the input values
        setInputValues((prevInputValues) => {
            const newInputValues = { ...prevInputValues };

            const key = `cell-${(row - 1) * 5 + cell}`;

            newInputValues[key].value = keyValue.toLowerCase();

            return newInputValues;
        });

        setTimeout(() => {
            handleNextCellFocus(event);
        }, 50);
    }

    const findYellowIndexes = (word, greenIndexes) => {
        // Create an array containing all indexes from 0 to word.length - 1
        const allIndexes = Array.from({ length: word.length }, (_, index) => index);

        // Use filter to find the missing indexes
        const missingIndexes = allIndexes.filter(index => !greenIndexes.includes(index));

        // Convert the missing indexes to an array of letters
        const indexesToLetters = missingIndexes.map(index => word[index]);

        // Loop through the missing letters to see if they match wordle
        const yellowIndexes = [];
        for (let i = 0; i < wordle.length; i++) {
            if (wordle.includes(indexesToLetters[i])) {
                yellowIndexes.push(missingIndexes[i]);
            }
        }

        return yellowIndexes;
    };

    const findGreenIndexes = () => {
        // Match userGuess with wordle indexes
        const greenIndexes = [];
        for (let i = 0; i < wordle.length; i++) {
            if (wordle[i] === userGuess[i]) {
                greenIndexes.push(i);
            }
        }

        return greenIndexes;
    }

    const userGameResult = async () => {
        const payload = {
            totalGames: 1,
            totalWins: (userGuess.join('').toLowerCase() === wordle.toLowerCase() ? 1 : 0),
            totalLosses: (userGuess.join('').toLowerCase() === wordle.toLowerCase() ? 0 : 1),
        }

        await updateUserStats(emailUser.email, payload);
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

        // Find the matching indexes
        const greenIndexes = findGreenIndexes();
        const yellowIndexes = findYellowIndexes(userGuess, greenIndexes);

        // Set green to true for all matching indexes and yellow to true for yellow indexes
        setInputValues((inputValues) => {
            const newInputValues = { ...inputValues };

            greenIndexes.forEach((index) => {
                if (rowTurn === 1) {
                    newInputValues[`cell-${index + 1}`].green = true;
                } else (
                    newInputValues[`cell-${(index + 1) + (CELL_PER_ROW * (rowTurn - 1))}`].green = true
                )
            });

            yellowIndexes.forEach((index) => {
                if (rowTurn === 1) {
                    newInputValues[`cell-${index + 1}`].yellow = true;
                } else (
                    newInputValues[`cell-${(index + 1) + (CELL_PER_ROW * (rowTurn - 1))}`].yellow = true
                )
            })

            return newInputValues;
        });

        // Check if User won
        if (greenIndexes.length === wordle.length) {
            // Alert winning message
            alert('You Win! The Wordle was: ' + wordle.toUpperCase());

            // Reset game state and update React state
            userGameResult();

            removeOldValues();

            generateInputValues();

            setRowTurn(1);

            setUserGuess([]);

            randomizeWordle();

            handleFirstCellFocus();

            return;
        } else {
            if (rowTurn < BOARD_ROWS) {
                setRowTurn(rowTurn + 1);

                handleNewRowFocus();

                setUserGuess([]);
            } else {
                // Alert losing message
                alert('You Lose! Try Again! The Wordle was: ' + wordle.toUpperCase());

                // Reset game state and update React state
                userGameResult();

                removeOldValues();

                setRowTurn(1);

                setUserGuess([]);

                randomizeWordle();

                handleFirstCellFocus();
            }
        }
    }

    return (
        <>
            {isStarted &&
                <div className="board">
                    {Array.from({ length: BOARD_ROWS }).map((_, rowIndex) => (
                        <div
                            className={isBoardSelected(rowIndex + 1) ? "board-row-selected" : "board-row"}
                            id={`row-${rowIndex + 1}`}
                            key={`row-${rowIndex + 1}`}
                        >
                            {Array.from({ length: CELL_PER_ROW }).map((_, cellIndex) => {
                                const cellKey = `cell-${rowIndex * 5 + cellIndex + 1}`;

                                return (
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className={
                                            isLetterGreen(rowIndex + 1, cellIndex + 1)
                                                ? "board-cell-green"
                                                : isLetterYellow(rowIndex + 1, cellIndex + 1)
                                                    ? "board-cell-yellow"
                                                    : "board-cell"
                                        }
                                        onKeyDown={(event) => handleKeyDown(event, rowIndex + 1, cellIndex + 1)}
                                        disabled={isRowDisabled(rowIndex + 1)}
                                        maxLength={1}
                                        id={cellKey}
                                        key={cellKey}
                                        value={inputValues[cellKey].value}
                                        onClick={(event) => event.target.select()}
                                    />
                                );
                            })}
                        </div>
                    ))}

                    {isStarted && <button className='submit' onClick={handleSubmit}>Submit</button>}
                </div>
            }
            {!isStarted &&
                <>
                    <p>5 letter word guessing game</p>
                    <button className='submit' onClick={handleStart}>Start</button>
                </>
            }
        </>
    );
}

export default Board;