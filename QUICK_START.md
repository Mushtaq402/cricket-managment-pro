# Cricket Management Pro - Quick Start Guide

## Getting Started

### 1. Opening the Application
- Open `index.html` in your web browser
- The application will load with the Dashboard view
- All data is stored locally in your browser

### 2. Main Navigation
Use the sidebar to navigate between sections:
- **Dashboard** - Overview and quick stats
- **Tournaments** - Create and manage tournaments
- **Live Scorer** - Score matches in real-time
- **Players Directory** - Manage player profiles
- **Match History** - Review past matches

---

## Creating a Tournament

### Step 1: Open Tournament Creation
1. Click on **Tournaments** in the sidebar
2. Click the **"Create Tournament"** button (blue button with + icon)

### Step 2: Fill Tournament Details
- **Tournament Name**: Enter the tournament name (e.g., "Summer League 2024")
- **Venue**: Enter the location (e.g., "Kotla Ground")
- **Overs Per Innings**: Select from 4, 6, 8, 12, or 20 overs
- Click **"Create Tournament"** button

### Step 3: Add Teams
1. Click on the tournament card to view details
2. Click **"Add Team"** button
3. Enter team name and click **"Save Team"**
4. Repeat for all teams

### Step 4: Schedule Matches
1. In tournament details, click **"Schedule Match"**
2. Select Team A and Team B
3. Click **"Schedule Fixture"**

---

## Managing Players

### Adding a New Player

1. Click **Players Directory** in the sidebar
2. Click **"Add Player"** button (blue button with + icon)
3. Fill in player details:
   - **Player Name**: Full name
   - **Photo**: Click to upload player photo
   - **Playing Role**: Select role (Batsman, Bowler, All-Rounder, Wicketkeeper-Batsman)
   - **Batting Style**: Right-Hand or Left-Hand Bat
   - **Bowling Style**: Select bowling type or "None"
   - **Biography**: Add player notes
4. Click **"Register Player"**

### Viewing Player Profile

1. Click on any player card in the Players Directory
2. View player statistics:
   - Batting records (Matches, Runs, Average, Strike Rate)
   - Bowling records (Wickets, Economy, Average)
   - Milestones and achievements
   - Recent performances
3. Filter statistics by tournament using the dropdown

---

## Live Scoring

### Starting a Match

1. Click **Live Scorer** in the sidebar
2. Select **Match Type**:
   - **Casual Match**: For friendly matches
   - **Tournament Match**: For tournament matches
3. Enter team names or select from tournament
4. Select toss winner and elected action
5. Select overs per innings
6. Add players for both teams
7. Click **"Start Match"**

### Scoring During Match

#### Recording Runs
- Click run buttons (0, 1, 2, 3, 4, 5, 6) to score
- **4** and **6** are highlighted in red
- **W** button records a wicket

#### Recording Extras
- **Wide**: Add wide runs
- **No Ball**: Add no-ball runs
- **Byes**: Add bye runs
- **Leg Byes**: Add leg-bye runs

#### Recording Wickets
1. Click **"W"** button
2. Select batsman who got out
3. Select dismissal type (Bowled, Caught, LBW, Run Out, etc.)
4. If applicable, select fielder
5. Click **"Confirm Wicket"**

#### Viewing Match Details
- **Crease Details**: Current batsmen and their stats
- **Batting**: Full batting scorecard
- **Bowling**: Bowler statistics
- **Fall of Wickets**: Dismissal details
- **Overs List**: Completed overs summary

### Live Stream Integration

1. Enter YouTube or RTMP URL in the stream input
2. Click **"Load Stream"** to embed video
3. Click **"Simulated Feed"** for demo broadcast

### 3D Field Visualization

1. Click **"3D Field"** button in Live Scorer
2. Interact with the field:
   - **Rotate Left/Right**: Rotate the field view
   - **Zoom In/Out**: Adjust zoom level
3. View fielding positions and field layout
4. Close modal to return to scoring

---

## Viewing Match History

### Accessing Match History
1. Click **Match History** in the sidebar
2. View all completed matches as cards
3. Click on any match to view detailed scorecard

### Match Details
- Team names and final scores
- Match result
- Batting and bowling statistics
- Fall of wickets
- Over-by-over breakdown

---

## Dashboard Overview

The Dashboard shows:
- **Active Tournaments**: Number of ongoing tournaments
- **Total Players**: Total registered players
- **Matches Scored**: Total matches recorded
- **Live/Active Match**: Current match status
- **Recent Matches**: Latest match summaries

---

## Tips & Tricks

### 1. Player Photos
- Upload clear, square photos for best results
- Photos are automatically compressed
- Supported formats: JPG, PNG, GIF

### 2. Tournament Management
- Add all teams before scheduling matches
- Schedule matches to track tournament progress
- View standings to see team rankings

### 3. Live Scoring
- Use keyboard shortcuts for faster scoring
- Undo button to correct mistakes
- Save match to view later in history

### 4. Player Profiles
- Filter statistics by tournament
- View recent performances
- Track player milestones (50s, 100s, etc.)

### 5. 3D Field
- Rotate to see different field angles
- Zoom to focus on specific areas
- Use for training and analysis

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Score 0 runs | Click "0" button |
| Score 1 run | Click "1" button |
| Score 2 runs | Click "2" button |
| Score 3 runs | Click "3" button |
| Score 4 runs | Click "4" button |
| Score 6 runs | Click "6" button |
| Record wicket | Click "W" button |
| Undo action | Click "Undo" button |

---

## Data Storage

- All data is stored in your browser's local storage
- Data persists between sessions
- Clear browser cache to reset data
- No internet connection required after loading

---

## Troubleshooting

### 3D Field Not Showing
- Ensure Three.js library is loaded
- Check browser console for errors
- Try refreshing the page

### Modals Not Opening
- Check browser console for JavaScript errors
- Ensure JavaScript is enabled
- Try clearing browser cache

### Data Not Saving
- Check browser storage quota
- Ensure local storage is enabled
- Try using a different browser

### Performance Issues
- Disable animations in browser settings
- Close other browser tabs
- Try using a modern browser

---

## Browser Requirements

- **Minimum**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Recommended**: Latest version of any modern browser
- **Mobile**: iOS Safari 12+, Chrome Android 60+

---

## Support & Feedback

For issues or suggestions:
1. Check the IMPROVEMENTS.md file for feature details
2. Review this Quick Start guide
3. Check browser console for error messages
4. Ensure all files are in the same directory

---

## File Structure

```
Cricket-Management-Pro/
├── index.html                    # Main HTML file
├── cricket_management_pro.css    # Stylesheet
├── cricket_management_pro.js     # JavaScript
├── IMPROVEMENTS.md               # Improvements documentation
├── QUICK_START.md               # This file
└── README.md                     # Original README
```

---

## Next Steps

1. ✅ Open the application
2. ✅ Create a tournament
3. ✅ Add teams and players
4. ✅ Start a match
5. ✅ Score some runs
6. ✅ View the 3D field
7. ✅ Check player profiles
8. ✅ Review match history

---

**Happy Scoring! 🏏**

For more details, see IMPROVEMENTS.md
