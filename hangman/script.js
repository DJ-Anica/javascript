const HANGMANPICS = [
    `
    +---+
    |   |
        |
        |
        |
        |
  =========`,
    `
    +---+
    |   |
    O   |
        |
        |
        |
  =========`,
    `
    +---+
    |   |
    O   |
    |   |
        |
        |
  =========`,
    `
    +---+
    |   |
    O   |
   /|   |
        |
        |
  =========`,
    `
    +---+
    |   |
    O   |
   /|\\  |
        |
        |
  =========`,
    `
    +---+
    |   |
    O   |
   /|\\  |
   /    |
        |
  =========`,
  `
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
        |
  =========`
];

const categories = {
    "1": ["apple", "mango", "grapes", "orange", "pineapple", "watermelon", "guava",
        "banana", "strawberry", "cherry", "papaya", "lemon", "peach", "coconut"],
    "2": ["dolphin", "tiger", "lion", "elephant", "giraffe", "dog", "cat", "horse",
        "cow", "pig", "sheep", "goat"],
    "3": ["soccer", "basketball", "tennis", "cricket", "volleyball", "badminton",
        "swimming", "golf", "hockey", "rugby", "baseball", "football", "boxing",
        "skating", "cycling", "fencing"]
};

let word = "";
let word_display = [];
let guessed_letters = [];
let incorrect_guesses = 0;
const max_incorrect_guesses = 6;
let remaining_attempts = max_incorrect_guesses;

function chooseCategory() {
    return prompt("Choose a category to guess a word from:\n1. Fruits\n2. Animals\n3. Sports");
}

function chooseWord(categoryChoice) {
    const category = categories[categoryChoice];
    return category[Math.floor(Math.random() * category.length)];
}

function displayWord() {
    const wordDisplay = document.getElementById("word-display-text");
    wordDisplay.textContent = word_display.join(" ");
}

function updateHangmanImage() {
    const hangmanImage = document.getElementById("hangman-image");
    hangmanImage.innerHTML = HANGMANPICS[incorrect_guesses];
}

function showEndMessage(message) {
    const messageText = document.getElementById("message-text");
    messageText.textContent = message;
    const messageDiv = document.getElementById("message");
    messageDiv.style.display = "block";
}

function resetGame() {
    word = "";
    word_display = [];
    guessed_letters = [];
    incorrect_guesses = 0;
    remaining_attempts = max_incorrect_guesses;
    document.getElementById("guess-input-field").value = "";
    document.getElementById("message").style.display = "none";
    startGame();
}

function startGame() {
    const categoryChoice = chooseCategory();
    if (categoryChoice === null) {
        return; // Cancelled
    }
    word = chooseWord(categoryChoice);
    word_display = Array(word.length).fill("_");
    guessed_letters = [];
    incorrect_guesses = 0;

    displayWord();
    updateHangmanImage();
    updateRemainingAttempts();
}

function guessLetter() {
    const guessInputField = document.getElementById("guess-input-field");
    const guess = guessInputField.value.toLowerCase().trim();

    if (!guess.match(/^[a-z]$/)) {
        alert("Enter only a single letter");
        return;
    }

    if (guessed_letters.includes(guess)) {
        alert("You have already guessed that letter");
        return;
    }

    guessed_letters.push(guess);

    if (!word.includes(guess)) {
        incorrect_guesses++;
        decrementRemainingAttempts();
    } else {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                word_display[i] = guess;
            }
        }
    }

    displayWord();
    updateHangmanImage();

    if (incorrect_guesses >= max_incorrect_guesses) {
        showEndMessage(`💔 You lost! The word was "${word}". 😭`);
    }

    if (!word_display.includes("_")) {
        showEndMessage("🥳 Congratulations, You won! 🎉");
    }

    guessInputField.value = "";
}

function decrementRemainingAttempts() {
    remaining_attempts--;
    updateRemainingAttempts();
}

function updateRemainingAttempts() {
    const attemptsCount = document.getElementById("attempts-count");
    attemptsCount.textContent = remaining_attempts;
}

// Function to handle Enter key press
function handleKeyPress(event) {
    if (event.keyCode === 13) {
        guessLetter();
    }
}

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", startGame);
