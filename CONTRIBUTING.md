# Contributing to Cricket Management Pro

Thank you for your interest in contributing to Cricket Management Pro! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**
* **Include your browser and OS version**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the JavaScript/CSS styleguides
* Include appropriate test cases
* End all files with a newline
* Avoid platform-dependent code

## Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/Cricket-Management-Pro.git
   cd Cricket-Management-Pro
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Edit the relevant files
   - Test your changes in a browser
   - Ensure localStorage works correctly

4. **Commit your changes**
   ```bash
   git commit -m "Add your commit message"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Submit the PR

## Styleguides

### JavaScript Style Guide

* Use ES6+ syntax
* Use meaningful variable names
* Add comments for complex logic
* Use const/let instead of var
* Use arrow functions where appropriate
* Keep functions focused and small
* Use template literals for strings

Example:
```javascript
// Good
const calculateStrikeRate = (runs, balls) => {
  return balls > 0 ? ((runs / balls) * 100).toFixed(2) : 0;
};

// Avoid
var calculateStrikeRate = function(runs, balls) {
  if (balls > 0) {
    return ((runs / balls) * 100).toFixed(2);
  } else {
    return 0;
  }
};
```

### CSS Style Guide

* Use CSS variables for colors and sizes
* Use meaningful class names
* Keep selectors simple
* Use flexbox/grid for layouts
* Mobile-first responsive design
* Group related styles together

Example:
```css
/* Good */
.player-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: 16px;
  transition: var(--transition);
}

.player-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Avoid */
.playerCard {
  background: #1a1f2e;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
}
```

### HTML Style Guide

* Use semantic HTML elements
* Use meaningful class names
* Keep markup clean and organized
* Use data attributes for JavaScript hooks
* Include alt text for images
* Use proper heading hierarchy

Example:
```html
<!-- Good -->
<div class="player-card" data-player-id="123">
  <img src="photo.jpg" alt="Player Name" class="player-photo">
  <h3 class="player-name">Player Name</h3>
  <p class="player-role">Batsman</p>
</div>

<!-- Avoid -->
<div class="card">
  <img src="photo.jpg">
  <h3>Player Name</h3>
  <p>Batsman</p>
</div>
```

## Testing

Before submitting a PR, please test:

1. **Functionality**
   - Player registration works
   - Photo upload and compression works
   - Live scoring works correctly
   - Crease rotation is correct
   - Extras not counted as legal balls
   - Statistics calculated correctly
   - localStorage persistence works

2. **UI/UX**
   - Layout is responsive
   - Animations are smooth
   - Buttons are clickable
   - Forms are usable
   - Mobile layout works

3. **Browser Compatibility**
   - Chrome/Edge
   - Firefox
   - Safari
   - Mobile browsers

## Code Review Process

1. At least one maintainer will review your PR
2. Changes may be requested
3. Once approved, your PR will be merged
4. Your contribution will be credited

## Community

* Be respectful and inclusive
* Follow the Code of Conduct
* Help other contributors
* Share knowledge and experience
* Celebrate contributions

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

* Using welcoming and inclusive language
* Being respectful of differing opinions, viewpoints, and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior include:

* The use of sexualized language or imagery
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information without explicit permission
* Other conduct which could reasonably be considered inappropriate

## Questions?

Feel free to open an issue or contact the maintainers.

## Recognition

Contributors will be recognized in:
* The README.md file
* Release notes
* GitHub contributors page

Thank you for contributing to Cricket Management Pro! 🏏

---

**Happy Contributing!**
