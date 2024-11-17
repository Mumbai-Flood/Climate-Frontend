# Contributing to Climate Frontend

Thank you for your interest in contributing to the Climate Frontend project! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

## 🤝 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## 🚀 Getting Started

1. **Fork the Repository**
   - Click the "Fork" button on GitHub
   - This creates your own copy of the repository

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/Climate-Frontend.git
   cd Climate-Frontend
   ```

3. **Set Up Development Environment**
   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm start
   ```

## 💻 Development Process

1. **Create a Branch**
   ```bash
   # Create and switch to a new branch
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make Changes**
   - Write clean, documented code
   - Follow our [Style Guidelines](#style-guidelines)
   - Add tests for new features

3. **Test Your Changes**
   ```bash
   # Run tests
   npm test

   # Run linter
   npm run lint

   # Check formatting
   npm run format
   ```

4. **Commit Your Changes**
   ```bash
   # Stage changes
   git add .

   # Commit with a descriptive message
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve issue #123"
   ```

## 📥 Pull Request Process

1. **Update Your Fork**
   ```bash
   # Add upstream remote
   git remote add upstream https://github.com/Mumbai-Flood/Climate-Frontend.git

   # Fetch and merge changes
   git fetch upstream
   git merge upstream/main
   ```

2. **Push Changes**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**
   - Go to GitHub and create a new PR
   - Use the PR template
   - Link related issues
   - Add detailed description

4. **Code Review**
   - Address review comments
   - Make requested changes
   - Keep PR updated with main branch

## 🎨 Style Guidelines

### React Components
- Use functional components with hooks
- Follow component file structure:
  ```jsx
  // imports
  import React from 'react';
  
  // component
  function ComponentName({ prop1, prop2 }) {
    // hooks
    // handlers
    // render
    return (
      <div>
        {/* JSX */}
      </div>
    );
  }
  
  // exports
  export default ComponentName;
  ```

### Tailwind CSS
- Use utility classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use color variables

### JavaScript
- Use ES6+ features
- Write clear, self-documenting code
- Add JSDoc comments for complex functions
- Follow naming conventions:
  - Components: PascalCase
  - Functions: camelCase
  - Constants: UPPER_SNAKE_CASE

## 👥 Community

- **Questions?** Open a [GitHub Discussion](https://github.com/Mumbai-Flood/Climate-Frontend/discussions)
- **Found a bug?** [Open an issue](https://github.com/Mumbai-Flood/Climate-Frontend/issues)
- **Need help?** Email us at [deepaksilaych@iitb.ac.in](mailto:deepaksilaych@iitb.ac.in)

## ✨ Recognition

Contributors will be recognized in:
- README.md
- GitHub contributors page
- Release notes

Thank you for contributing to Climate Frontend! 🙏

---
*Remember: The best way to contribute is to lead by example and help others learn.*
