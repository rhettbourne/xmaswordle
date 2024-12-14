// List of 5-letter words (add more words if you like)
const wordList = [
    "santa", "claus", "snowy", "bells", "merry", "frost", "candy", "jolly", "holly", "trees", "stock", "glove", "sugar", "pines", "brisk", "elves", "sleds", "gifts", "mirth", "peace"
];


// Select a random word from the list
const wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];

const maxAttempts = 6;
let attempts = 0;

const gridContainer = document.getElementById('grid-container');
const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const message = document.getElementById('message');

// Generate the grid for guesses
const generateGrid = () => {
    for (let i = 0; i < maxAttempts; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            gridContainer.appendChild(cell);
        }
    }
};

// Check the player's guess
const checkGuess = (guess) => {
    if (guess.length !== 5) {
        message.textContent = "Your guess must be 5 letters!";
        return;
    }

    attempts++;
    const guessArray = guess.split('');
    const wordArray = wordToGuess.split('');
    let result = [];

    // Compare the guess with the word
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === wordArray[i]) {
            result.push('correct');
        } else if (wordArray.includes(guessArray[i])) {
            result.push('present');
        } else {
            result.push('absent');
        }
    }

    // Display the guess and feedback in the grid
    const gridCells = gridContainer.children;
    const rowStartIndex = (attempts - 1) * 5;
    for (let i = 0; i < 5; i++) {
        const cell = gridCells[rowStartIndex + i];
        cell.textContent = guessArray[i];
        cell.style.backgroundColor = result[i] === 'correct' ? 'green' : result[i] === 'present' ? 'yellow' : 'gray';
    }

    // Check for win or game over
    if (guess === wordToGuess) {
        message.textContent = "You guessed it!";
        submitBtn.disabled = true;
    } else if (attempts === maxAttempts) {
        message.textContent = `Game over! The word was ${wordToGuess}.`;
        submitBtn.disabled = true;
    } else {
        message.textContent = `Attempt ${attempts} of ${maxAttempts}`;
    }

    // Clear the input field for the next guess
    guessInput.value = '';
};

// Handle the guess submission
submitBtn.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    checkGuess(guess);
});

// Generate the game grid
generateGrid();
