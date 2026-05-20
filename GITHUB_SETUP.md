# GitHub Setup Guide

This guide will help you set up and publish Cricket Management Pro on GitHub.

## Prerequisites

- GitHub account (create at https://github.com)
- Git installed on your computer
- This Cricket Management Pro folder

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Fill in the repository details:
   - **Repository name:** `Cricket-Management-Pro`
   - **Description:** "A fully-featured, offline-capable cricket tournament and live scoring application"
   - **Public/Private:** Public (for open source)
   - **Initialize with:** None (we'll push existing files)
3. Click "Create repository"

## Step 2: Initialize Git Locally

Open command prompt/terminal in the Cricket-Management-Pro folder:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Cricket Management Pro v1.0.0"

# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/Cricket-Management-Pro.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Configure GitHub Repository

### Add Topics
1. Go to your repository settings
2. Add topics: `cricket`, `scoring`, `tournament`, `sports`, `web-app`, `offline`

### Add Description
- Short description: "Cricket tournament and live scoring application"
- Website: (optional) your website URL

### Enable Features
- ✅ Discussions (for community)
- ✅ Issues (for bug reports)
- ✅ Projects (for roadmap)
- ✅ Wiki (for documentation)

## Step 4: Create GitHub Pages (Optional)

To host the app on GitHub Pages:

1. Go to Settings → Pages
2. Select "Deploy from a branch"
3. Select "main" branch and "/" (root) folder
4. Click Save
5. Your app will be available at: `https://YOUR_USERNAME.github.io/Cricket-Management-Pro/`

## Step 5: Add Badges to README

Update your README.md with badges:

```markdown
![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/Cricket-Management-Pro)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/Cricket-Management-Pro)
![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/Cricket-Management-Pro)
![GitHub license](https://img.shields.io/github/license/YOUR_USERNAME/Cricket-Management-Pro)
```

## Step 6: Create Release

1. Go to Releases
2. Click "Create a new release"
3. Fill in:
   - **Tag version:** v1.0.0
   - **Release title:** Cricket Management Pro v1.0.0
   - **Description:** Copy from CHANGELOG.md
4. Click "Publish release"

## Step 7: Set Up Issues Template

Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - Browser: [e.g. Chrome, Firefox]
 - OS: [e.g. Windows, Mac]
 - Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

## Step 8: Set Up Pull Request Template

Create `.github/pull_request_template.md`:

```markdown
## Description
Please include a summary of the changes and related context.

## Type of change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)

## How has this been tested?
Please describe the tests that you ran to verify your changes.

## Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested in multiple browsers
```

## Step 9: Promote Your Project

### Share on Social Media
- Twitter: "Just published Cricket Management Pro on GitHub! 🏏 A fully-featured cricket scoring app. Check it out! #cricket #opensource"
- LinkedIn: Share with your network
- Reddit: Post to r/cricket, r/webdev, r/opensource

### Submit to Awesome Lists
- Add to awesome-cricket list
- Add to awesome-sports list
- Add to awesome-web-apps list

### Documentation Sites
- Add to Product Hunt
- Add to Hacker News
- Add to Dev.to

## Step 10: Maintain Your Project

### Regular Updates
- Respond to issues promptly
- Review pull requests
- Update documentation
- Release new versions

### Community Management
- Welcome contributors
- Provide clear feedback
- Celebrate contributions
- Keep discussions respectful

## Useful GitHub Commands

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/Cricket-Management-Pro.git

# Create new branch
git checkout -b feature/new-feature

# Commit changes
git commit -m "Add new feature"

# Push changes
git push origin feature/new-feature

# Pull latest changes
git pull origin main

# View commit history
git log --oneline

# View status
git status
```

## GitHub Best Practices

1. **Keep README Updated**
   - Clear instructions
   - Feature list
   - Screenshots
   - Installation guide

2. **Use Issues Effectively**
   - Clear titles
   - Detailed descriptions
   - Labels for organization
   - Link related issues

3. **Code Review**
   - Review PRs promptly
   - Provide constructive feedback
   - Approve and merge
   - Close related issues

4. **Documentation**
   - Keep docs up-to-date
   - Add examples
   - Include troubleshooting
   - Link to resources

5. **Version Control**
   - Use semantic versioning
   - Create releases
   - Tag versions
   - Update changelog

## Troubleshooting

### Authentication Issues
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub: Settings → SSH and GPG keys
```

### Push Rejected
```bash
# Pull latest changes first
git pull origin main

# Then push again
git push origin main
```

### Merge Conflicts
```bash
# View conflicts
git status

# Resolve conflicts in editor

# Add resolved files
git add .

# Complete merge
git commit -m "Resolve merge conflicts"
```

## Resources

- [GitHub Docs](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Open Source Guide](https://opensource.guide)

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Push code to GitHub
3. ✅ Configure repository settings
4. ✅ Enable GitHub Pages
5. ✅ Create release
6. ✅ Promote project
7. ✅ Manage community
8. ✅ Keep project updated

---

**Happy Publishing!** 🚀

For questions or issues, refer to GitHub documentation or open an issue in your repository.
