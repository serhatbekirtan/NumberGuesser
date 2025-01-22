# Number Guesser Game - User Flow

## Initial Flow

```
[Load Game]
      ↓
[Display Username Form]
      ↓
[Enter Username]
      ↓
[Submit Username]
      ↓
[Generate Random Number]
      ↓
[Display Game UI]
      ↓
[Start Timer]
      ↓
[Wait for User Input]
```

## Guess Flow

```
[User Enters Number]
      ↓
[Submit Guess]
      ↓
[Validate Input]
      ↓
[Compare with Target]
      ↓
[Display Feedback]
      ↓
[Update Previous Guesses]
      ↓
[Increment Attempt Counter]
```

## Win Flow

```
[Correct Guess]
      ↓
[Stop Timer]
      ↓
[Calculate Final Time]
      ↓
[Show Win Message]
      ↓
[Display Attempt Count]
      ↓
[Display Time Taken]
      ↓
[Update Ranking Table]
      ↓
[Disable Input]
      ↓
[Show Replay Button]
```

## Replay Flow

```
[Click Replay]
      ↓
[Reset Game State]
      ↓
[Clear UI]
      ↓
[Generate New Number]
      ↓
[Reset Timer]
      ↓
[Enable Input]
      ↓
[Focus Input Field]
      ↓
[Increment Play Again Counter]
```

## User Actions

1. Initial Load
   - View username form
   - Enter username
   - Submit username
   - View game instructions
   - See empty input field
   - View ranking table
   - Focus on input

2. Making Guess
   - Enter number
   - Submit guess
   - View feedback
   - See previous guesses
   - Check attempt count
   - View current ranking

3. Winning Game
   - See congratulations
   - View final attempt count
   - See completion time
   - View updated ranking
   - Choose to replay

4. Replaying
   - Click replay button
   - Start fresh game
   - Previous game cleared
   - Timer reset
   - Rankings preserved
