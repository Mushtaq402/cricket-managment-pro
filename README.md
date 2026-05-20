# 🏏 Cricket Management Pro

A fully-featured, offline-capable cricket tournament and live scoring application built with vanilla JavaScript, HTML5, and CSS3.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Production%20Ready-brightgreen)

## ✨ Features

### Live Scoring System
- ⚡ Real-time ball-by-ball scoring
- 🔄 Automatic crease rotation on odd runs
- 📊 Strike rate calculation for each batsman
- 🎯 Wicket recording with dismissal types
- ↩️ Undo functionality for score corrections
- 📈 Current over display with ball bubbles

### Player Management
- 📸 Player registration with photo upload
- 🖼️ Automatic photo compression (200x200px)
- 👥 Team-grouped player directory
- 🔍 Search and filter functionality
- 🏆 Career milestones tracking (30+, 50+, 70+, 100 runs)
- 📋 Detailed player profiles with statistics

### Tournament Management
- 🎪 Create and manage tournaments
- 🏅 Add teams and schedule matches
- 📊 Points table with standings
- 🥇 Leaderboard with Orange Cap (batting) and Purple Cap (bowling)
- 👥 Team roster management

### Statistics & Analytics
- 📈 Batting strike rate: (Runs/Balls) × 100
- 🎯 Bowling economy rate calculation
- 📊 Career milestones badges
- 📅 Match-by-match performance log
- 🎬 ICC-style bowling stats visualization

### Live Streaming
- 📺 YouTube URL embed support
- 🎥 RTMP stream support
- 🔴 Simulated broadcast feed with pulsing "LIVE" indicator
- 📱 Responsive video container (16:9 aspect ratio)

### Match History & Replay
- 💾 Save all match details
- 📋 Detailed scorecard with batting and bowling stats
- 📉 Fall of wickets log
- 💬 Over-by-over commentary
- 🏁 Match result display

### Extras Handling (Fixed)
- ⚠️ Wide balls - NOT counted as legal balls
- ⚠️ No Ball - NOT counted as legal balls
- ⚠️ Bye - NOT counted as legal balls
- ⚠️ Leg Bye - NOT counted as legal balls
- 🎯 Each extra type has configurable runs (1-4)

### UI/UX
- 🎨 Modern glass morphism design
- 🌙 Dark theme with purple/red accents
- ✨ Smooth animations and transitions
- 📱 Fully responsive layout (desktop, tablet, mobile)
- 🎯 Interactive elements with hover effects
- 🔄 Real-time score updates

## 🚀 Quick Start

### Option 1: Direct Open (Easiest)
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start using immediately!

### Option 2: Local Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Then visit: http://localhost:8000
```

## 📖 Usage Guide

### Register Players
1. Click **"Players Directory"** in the sidebar
2. Click **"Add Player"** button
3. Fill in player details and upload photo
4. Click **"Register Player"**

### Start Live Scoring
1. Click **"Live Scorer"** in sidebar
2. Enter team names and select players
3. Click **"Start Match"**
4. Score balls using the runs selector
5. Record extras and wickets as needed

### Create Tournament
1. Click **"Tournaments"** in sidebar
2. Click **"Create Tournament"**
3. Enter tournament details
4. Add teams and schedule matches

### View Statistics
1. Go to **"Players Directory"**
2. Click on any player card
3. View career statistics and milestones

## 💾 Data Storage

- **Offline Capable:** All data stored in browser's localStorage
- **No Server Required:** Works completely offline
- **Data Persistence:** Survives browser refresh and restart
- **Storage Limit:** ~5MB per domain (typical browser limit)
- **Photo Storage:** Automatic compression to 200x200px

## 🎮 Scoring Controls

### Runs Buttons
- **0-6:** Regular runs scored
- **4:** Boundary (4 runs)
- **6:** Six (6 runs)
- **W:** Wicket

### Extras (Not counted as legal balls)
- **Wide:** Bowler's fault, +1 to +4 runs
- **No Ball:** Bowler's fault, +1 to +4 runs
- **Bye:** Batter doesn't hit, +1 to +4 runs
- **Leg Bye:** Batter hits with body, +1 to +4 runs

### Other Controls
- **Undo:** Revert last action
- **Force End Innings:** End current innings
- **Change Striker:** Select different batsman

## 📊 Statistics Explained

### Batting Stats
- **Runs:** Total runs scored
- **Balls:** Deliveries faced
- **Strike Rate (SR):** (Runs/Balls) × 100
- **4s:** Boundaries hit
- **6s:** Sixes hit

### Bowling Stats
- **Wickets:** Players dismissed
- **Overs:** Overs bowled
- **Runs:** Runs conceded
- **Economy:** Runs per over
- **Average:** Runs per wicket

### Career Milestones
- **30+:** Scored 30 or more runs
- **50+:** Scored 50 or more runs
- **70+:** Scored 70 or more runs
- **100+:** Scored 100 or more runs

## 🛠️ Technical Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage:** Browser localStorage
- **Icons:** Lucide Icons CDN
- **Compression:** HTML5 Canvas API
- **No Dependencies:** Fully self-contained

## 🌐 Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers

## 📁 File Structure

```
Cricket-Management-Pro/
├── index.html                      # Main application
├── cricket_management_pro.css      # Styling
├── cricket_management_pro.js       # Logic
├── README.md                       # This file
├── LICENSE                         # MIT License
└── CONTRIBUTING.md                 # Contribution guidelines
```

## 📝 File Sizes

| File | Size |
|------|------|
| index.html | 45 KB |
| cricket_management_pro.css | 25 KB |
| cricket_management_pro.js | 34 KB |
| **Total** | **~104 KB** |

## ⚡ Performance

- ✅ Fast initial load time
- ✅ Real-time score updates
- ✅ Smooth animations
- ✅ Responsive UI
- ✅ Efficient localStorage usage

## 🔐 Security & Privacy

- ✅ No external tracking
- ✅ No data sent to servers
- ✅ Fully offline capable
- ✅ User controls all data
- ✅ No sensitive data exposed

## 🐛 Troubleshooting

### Photos Not Showing
- Check browser storage limit (usually 5MB)
- Try uploading smaller images
- Clear old match data if storage full

### Data Not Saving
- Check if localStorage is enabled in browser
- Try refreshing page
- Check browser console for errors (F12)

### Scoring Issues
- Use Undo button to correct mistakes
- Ensure at least 2 batsmen are added
- Check that striker/non-striker are different players

## 📱 Mobile Usage

The app works on mobile with:
- Landscape mode recommended for better view
- Touch-friendly buttons for scoring
- Swipe to navigate between sections
- Photos upload from camera or gallery

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created with ❤️ for cricket enthusiasts

## 🙏 Acknowledgments

- Lucide Icons for beautiful icons
- Cricket community for inspiration
- All contributors and users

## 📞 Support

For issues, questions, or suggestions:
1. Check the browser console (F12) for errors
2. Review the code comments
3. Open an issue on GitHub
4. Check existing issues for solutions

## 🎯 Roadmap

### Future Enhancements
- [ ] Export match data to CSV/PDF
- [ ] Multi-language support
- [ ] Cloud sync with backend
- [ ] Advanced analytics dashboard
- [ ] Player comparison tools
- [ ] Tournament bracket visualization
- [ ] Mobile app version
- [ ] Real-time notifications

## 📊 Project Stats

- **Version:** 1.0.0
- **Release Date:** May 20, 2026
- **Status:** Production Ready ✅
- **Lines of Code:** 2000+
- **Features:** 30+
- **Browser Support:** 4+

## 🎉 Getting Started

1. **Download:** Clone or download this repository
2. **Open:** Open `index.html` in your browser
3. **Register:** Add players with photos
4. **Score:** Start scoring matches
5. **Analyze:** View player statistics

That's it! Enjoy Cricket Management Pro! 🏏

---

**Made with ❤️ for cricket lovers**

For more information, visit the [GitHub repository](https://github.com/yourusername/Cricket-Management-Pro)
