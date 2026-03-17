# Contributing to Codasapp

Thank you for your interest in contributing to Codasapp! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Setup

1. **Fork the repository**
   ```bash
   # Fork the repository on GitHub, then clone your fork
   git clone https://github.com/your-username/codasapp.git
   cd codasapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

## 📝 Development Guidelines

### Code Style

We use ESLint and Prettier for code formatting. Please ensure your code follows our style guidelines:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### TypeScript

- All new code should be written in TypeScript
- Use proper type definitions
- Avoid using `any` type when possible
- Export types for public APIs

### Component Structure

```tsx
import React from 'react';
import { useBuilder } from '../context/BuilderContext';
import type { ComponentData } from '../types/component';

interface YourComponentProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

export const YourComponent: React.FC<YourComponentProps> = ({
  id,
  className,
  children
}) => {
  const { updateComponent } = useBuilder();

  // Component logic here

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default YourComponent;
```

### Testing

We encourage writing tests for new features:

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🐛 Bug Reports

When creating a bug report, please include:

1. **Clear title** describing the issue
2. **Environment information**:
   - OS and version
   - Node.js version
   - Browser and version (if applicable)
3. **Steps to reproduce**
4. **Expected behavior**
5. **Actual behavior**
6. **Screenshots** (if applicable)
7. **Additional context**

### Bug Report Template

```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g. Windows 10, macOS 12.0]
- Node.js: [e.g. 18.0.0]
- Browser: [e.g. Chrome 100.0]

## Additional Context
Any other relevant information
```

## ✨ Feature Requests

When requesting a new feature:

1. **Check existing issues** to avoid duplicates
2. **Use clear title** describing the feature
3. **Describe the use case** and why it's needed
4. **Propose a solution** (if you have one)
5. **Consider alternatives** you've thought about

### Feature Request Template

```markdown
## Feature Description
Clear and concise description of the feature

## Use Case
Describe the use case and why this feature would be useful

## Proposed Solution
How you envision this feature working

## Alternatives Considered
Other approaches you've thought about

## Additional Context
Any other relevant information
```

## 📝 Pull Requests

### Before Submitting

1. **Test your changes** thoroughly
2. **Update documentation** if needed
3. **Add tests** for new functionality
4. **Ensure all tests pass**
5. **Update CHANGELOG.md** if applicable

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests for the feature
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

### Submitting a Pull Request

1. **Update your branch** with latest changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create pull request** with:
   - Clear title
   - Detailed description
   - Link to related issues
   - Screenshots (if UI changes)

3. **Wait for review** and respond to feedback

## 🏗️ Architecture Overview

### Key Directories

```
src/
├── components/          # React components
├── context/            # React contexts
├── hooks/              # Custom hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── styles/             # CSS and styling files
└── assets/             # Static assets
```

### Core Concepts

- **BuilderContext**: Main state management for the builder
- **ComponentData**: Data structure for components
- **StateStyles**: Style states (base, hover, active, focus)
- **Drag & Drop**: Using @dnd-kit library

## 🎨 UI/UX Guidelines

### Design Principles

- **Consistency**: Follow existing design patterns
- **Accessibility**: Ensure WCAG compliance
- **Responsive**: Mobile-first approach
- **Performance**: Optimize for smooth interactions

### Styling

- Use Tailwind CSS classes
- Follow the existing color scheme
- Maintain consistent spacing and typography
- Test on different screen sizes

## 📚 Documentation

- **README.md**: Project overview and quick start
- **API docs**: Component props and hooks
- **Examples**: Usage examples and tutorials
- **CHANGELOG.md**: Version history and changes

## 🤝 Community

### Ways to Contribute

- **Code**: New features, bug fixes, improvements
- **Documentation**: Improve existing docs, add examples
- **Testing**: Write tests, report bugs
- **Design**: UI/UX improvements, icons, graphics
- **Community**: Help others, share knowledge

### Communication

- **GitHub Issues**: Bug reports, feature requests
- **GitHub Discussions**: General questions, ideas
- **Discord**: Real-time chat and collaboration

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors are recognized in:
- **README.md**: Core contributors list
- **CHANGELOG.md**: Feature attributions
- **Release notes**: Specific contributions

## 📞 Get Help

If you need help:

1. **Check documentation** first
2. **Search existing issues**
3. **Ask in GitHub Discussions**
4. **Join our Discord community**
5. **Contact maintainers** at support@codasapp.com

---

Thank you for contributing to Codasapp! 🎉
