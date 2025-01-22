class Game {
  constructor() {
    this.username = '';
    this.targetNumber = this.generateNumber();
    this.attempts = 0;
    this.previousGuesses = [];
    this.gameOver = false;
    this.playAgainCount = 0;
    this.startTime = null;
    this.endTime = null;
    this.setupEventListeners();
  }

  generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  setupEventListeners() {
    const usernameForm = document.getElementById("username-form");
    const form = document.getElementById("guess-form");
    const replayBtn = document.getElementById("replay-btn");

    usernameForm.addEventListener("submit", (e) => this.handleUsernameSubmit(e));
    form.addEventListener("submit", (e) => this.handleGuess(e));
    replayBtn.addEventListener("click", () => this.resetGame());
  }

  handleUsernameSubmit(event) {
    event.preventDefault();
    const usernameInput = document.getElementById("username-input");
    this.username = usernameInput.value.trim();
    
    // Hide username section and show game section
    document.getElementById("username-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    
    // Start timing
    this.startTime = new Date();
    
    // Focus on guess input
    document.getElementById("guess-input").focus();
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

  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  }

  provideFeedback(guess) {
    let message;
    let messageClass;

    if (guess === this.targetNumber) {
      this.endTime = new Date();
      const timeTaken = Math.round((this.endTime - this.startTime) / 1000); // in seconds
      const formattedTime = this.formatTime(timeTaken);
      message = `Congratulations ${this.username}! You've found the number in ${this.attempts} attempts and ${formattedTime}!`;
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
    
    const timeTaken = Math.round((this.endTime - this.startTime) / 1000);
    
    // Here we'll prepare the data for database storage
    const gameData = {
      username: this.username,
      attempts: this.attempts,
      playAgainCount: this.playAgainCount,
      timeTaken: timeTaken
    };
    
    // We'll implement the database storage logic later
    console.log('Game data to be stored:', gameData);
    
    // For now, we'll just add the current score to the ranking table
    // This will be replaced with actual database data later
    this.addToRankingTable({
      username: this.username,
      attempts: this.attempts,
      timeTaken: timeTaken
    });
  }

  addToRankingTable(data) {
    const tableBody = document.getElementById("ranking-table-body");
    const newRow = document.createElement("tr");
    
    newRow.innerHTML = `
      <td>${data.username}</td>
      <td>${data.attempts}</td>
      <td>${this.formatTime(data.timeTaken)}</td>
    `;

    // For now, we'll just add the new score at the top
    // Later, we'll sort based on attempts and time
    if (tableBody.firstChild) {
      tableBody.insertBefore(newRow, tableBody.firstChild);
    } else {
      tableBody.appendChild(newRow);
    }

    // Keep only top 10 scores
    while (tableBody.children.length > 10) {
      tableBody.removeChild(tableBody.lastChild);
    }
  }

  resetGame() {
    this.targetNumber = this.generateNumber();
    this.attempts = 0;
    this.previousGuesses = [];
    this.gameOver = false;
    this.playAgainCount++;
    this.startTime = new Date();
    this.endTime = null;

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
