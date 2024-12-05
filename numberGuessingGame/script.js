let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");
const resetButton = document.getElementById("reset");

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", resetGame);

function checkGuess() {
    const guess = parseInt(guessInput.value);
    attempts++;

    if (guess === randomNumber) {
        feedback.textContent = "Congratulations! You guessed the right number!";
        feedback.style.color = "green";
        resetButton.style.display = "block";
        submitButton.disabled = true;
    } else if (guess < randomNumber) {
        feedback.textContent = "Too low! Try again.";
        feedback.style.color = "red";
    } else {
        feedback.textContent = "Too high! Try again.";
        feedback.style.color = "red";
    }

    attemptsDisplay.textContent = attempts;
    guessInput.value = "";
    guessInput.focus();
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    feedback.textContent = "";
    guessInput.value = "";
    guessInput.focus();
    resetButton.style.display = "none";
    submitButton.disabled = false;
}
