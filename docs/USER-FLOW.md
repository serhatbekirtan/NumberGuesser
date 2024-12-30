# Number Guesser Game - User Flow

## Game Start Flow

```
[Start Game]
      ↓
[Generate Random Number]
      ↓
[Display Initial UI]
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
[Show Win Message]
      ↓
[Display Attempt Count]
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
[Enable Input]
      ↓
[Focus Input Field]
```

## User Actions

1. Initial Load

   - View game instructions
   - See empty input field
   - Focus on input

2. Making Guess

   - Enter number
   - Submit guess
   - View feedback
   - See previous guesses
   - Check attempt count

3. Winning Game

   - See congratulations
   - View final attempt count
   - Choose to replay

4. Replaying
   - Click replay button
   - Start fresh game
   - Previous game cleared
