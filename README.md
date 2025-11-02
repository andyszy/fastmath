# Multiplication Master

A fast math practice app designed to help build multiplication fluency (2x2 through 12x12) using spaced repetition, gamification, and reward tracking.

## Features

### Play Tab
- **5-Minute Sessions**: Timed practice sessions (timer hidden to reduce stress)
- **Category Selection**: Choose which multiplication tables to practice (Easy, Medium, Hard)
- **Spaced Repetition**: The app intelligently selects problems based on which tables need the most practice
- **Streak Counter**: Track consecutive correct answers for motivation
- **Immediate Feedback**: Know right away if your answer is correct
- **Keyboard-Friendly**: Auto-focus on answer input, press Enter to submit

### Progress Tab
- **Mastery Tracking**: See your mastery score (0-100) for each multiplication table (2's through 12's)
- **Sliding Window Scoring**: Based on last 10 answers (10 points each)
- **Trophy System**: Earn a permanent trophy when you reach 100/100 mastery
- **Reward Tracking**: Earn $0.50 (Easy), $1.00 (Medium), or $2.00 (Hard) per mastered category
- **Speed Stats**: View average response time for correct answers
- **Difficulty Levels**: Easy (2's, 3's, 4's, 5's, 10's), Medium (6's-9's), Hard (11's-12's)

### Parent Mode
- **Password Protected**: Secure parent mode to manually award trophies
- **Trophy Management**: Award or remove trophies for any category

### Data Persistence
- All progress is saved to your browser's local storage
- Your progress persists between sessions
- Trophies, once earned, are permanent

## How to Use

1. Open `index.html` in any modern web browser
2. Click "Start Session" on the Play tab to begin a 5-minute practice session
3. Solve multiplication problems as they appear
4. Press Enter or click "Check Answer" to submit your answer
5. Check your progress on the Progress tab to see which tables you've mastered

## How Spaced Repetition Works

The app uses a weighted random selection algorithm:
- Tables with lower mastery scores appear more frequently
- Once you reach 100/100 on a table, it will still appear occasionally to maintain fluency
- The more you practice, the smarter the app gets at focusing on your weak areas

## Trophy Requirements

To earn a trophy for a multiplication table:
- Achieve 100% mastery (100/100)
- Complete at least 20 problems for that table

Once earned, trophies are permanent and cannot be lost!

## Perfect For

- Students working on multiplication fluency
- Anyone who wants to improve their mental math speed
- Practice sessions that fit into short time blocks
- Tracking long-term progress and mastery

## Technical Details

- Built with React 18
- Styled with Tailwind CSS
- No server required - runs entirely in the browser
- Uses localStorage for data persistence

## Browser Compatibility

Works with any modern browser that supports:
- ES6+ JavaScript
- LocalStorage API
- React 18

Tested on:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Deploy to Vercel (Recommended)

This app is designed to be deployed on Vercel:

1. Fork or clone this repository
2. Install Vercel CLI: `npm install -g vercel`
3. Deploy: `vercel --prod`
4. Set the `PARENT_PASSCODE` environment variable in your Vercel project settings for Parent Mode

The build script will automatically inject the passcode during deployment.

### Run Locally

For local development or testing:

1. Clone this repository
2. Open `index.html` directly in your web browser
3. Note: Parent Mode will default to passcode `0000` when running locally (no environment variable set)

### Environment Variables

- `PARENT_PASSCODE`: Set this in Vercel to configure the Parent Mode passcode (defaults to `0000` if not set)

## License

Free to use and modify for personal and educational purposes.
