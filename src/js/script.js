class Game {
  constructor() {
    this.targetNumber = this.generateNumber();
    this.attempts = 0;
    this.previousGuesses = [];
    this.gameOver = false;
    this.setupEventListeners();
  }

  generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  setupEventListeners() {
    const form = document.getElementById("guess-form");
    const replayBtn = document.getElementById("replay-btn");

    form.addEventListener("submit", (e) => this.handleGuess(e));
    replayBtn.addEventListener("click", () => this.resetGame());
  }

  handleGuess(event) {
    event.preventDefault();

    if (this.gameOver) return;

    const input = document.getElementById("guess-input");
    const guess = parseInt(input.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      this.showMessage(
        "Please enter a valid number between 1 and 100",
        "error"
      );
      return;
    }

    this.attempts++;
    this.previousGuesses.push(guess);
    this.updateUI(guess);
    input.value = "";
    input.focus();
  }

  updateUI(guess) {
    this.updateAttempts();
    this.updatePreviousGuesses();
    this.provideFeedback(guess);
  }

  provideFeedback(guess) {
    let message;
    let messageClass;

    if (guess === this.targetNumber) {
      message = `Congratulations! You've found the number in ${this.attempts} attempts!`;
      messageClass = "success";
      this.handleWin();
    } else if (guess < this.targetNumber) {
      message = "Higher!";
      messageClass = "error";
    } else {
      message = "Lower!";
      messageClass = "error";
    }

    this.showMessage(message, messageClass);
  }

  showMessage(message, className) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.className = `message ${className}`;
  }

  updateAttempts() {
    document.getElementById("attempts").textContent = this.attempts;
  }

  updatePreviousGuesses() {
    const guessesList = document.querySelector(".guesses-list");
    guessesList.innerHTML = this.previousGuesses
      .map((guess) => `<span class="guess-item">${guess}</span>`)
      .join("");
  }

  handleWin() {
    this.gameOver = true;
    document.getElementById("guess-input").disabled = true;
    document.getElementById("replay-btn").style.display = "inline-block";
  }

  resetGame() {
    this.targetNumber = this.generateNumber();
    this.attempts = 0;
    this.previousGuesses = [];
    this.gameOver = false;

    // Reset UI
    document.getElementById("guess-input").disabled = false;
    document.getElementById("replay-btn").style.display = "none";
    document.getElementById("message").textContent = "";
    this.updateAttempts();
    this.updatePreviousGuesses();

    // Focus input
    document.getElementById("guess-input").focus();
  }
}

// Start the game when the page loads
window.addEventListener("load", () => {
  new Game();
});
