# Multiplication Master

A fast math practice app designed to help build multiplication fluency (1x1 through 12x12) using spaced repetition and gamification.

## Features

### Play Tab
- **5-Minute Sessions**: Timed practice sessions to maintain focus and engagement
- **Spaced Repetition**: The app intelligently selects problems based on which multiplication tables need the most practice
- **Streak Counter**: Track consecutive correct answers for motivation
- **Immediate Feedback**: Know right away if your answer is correct

### Progress Tab
- **Mastery Tracking**: See your mastery score (0-100) for each multiplication table (1's through 12's)
- **Trophy System**: Earn a permanent trophy when you reach 100/100 mastery on any table
- **Stats**: View correct/total attempts for each table

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

Simply open `index.html` in a web browser. For iPad deployment:
- Upload the file to a web server, or
- Use a service like GitHub Pages, Netlify, or Vercel for hosting, or
- Open the file directly from Files app (if supported by browser)

## License

Free to use and modify for personal and educational purposes.
