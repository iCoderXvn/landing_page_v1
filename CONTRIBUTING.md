# Contribution Guidelines

Thank you for your interest in contributing to the iCoderX Landing Page! This document provides guidelines and instructions for contributing to this project.

## 🤝 How to Contribute

### Reporting Issues

Before submitting an issue, please:

1. Check existing issues to avoid duplicates
2. Use the issue template if available
3. Provide clear, detailed information
4. Include steps to reproduce bugs
5. Add screenshots for UI issues

### Submitting Changes

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/icoderx-landing.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the code style guidelines
   - Add tests if applicable
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature description"
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Submit a Pull Request**
   - Use the PR template
   - Link related issues
   - Provide clear description

## 📝 Code Style

### TypeScript/React

- Use TypeScript for all new code
- Follow React best practices
- Use functional components with hooks
- Prefer named exports

```typescript
// Good ✅
export const MyComponent = () => {
  return <div>Content</div>
}

// Avoid ❌
export default function MyComponent() {
  return <div>Content</div>
}
```

### Tailwind CSS

- Use Tailwind utility classes
- Group related classes
- Use component-level CSS for complex styles

```tsx
// Good ✅
<div className="flex items-center justify-center space-x-4 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">

// Avoid ❌
<div className="flex items-center justify-center space-x-4 p-6" style={{background: 'linear-gradient(to right, #3b82f6, #9333ea)', borderRadius: '0.5rem'}}>
```

### Commit Messages

Use conventional commits:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/modifications
- `chore:` Build process or auxiliary tool changes

## 🧪 Testing

Before submitting:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build

# Performance test
npm run build-analyze
```

## 📋 Pull Request Template

When submitting a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested locally
- [ ] Types checked
- [ ] Linting passed
- [ ] Build successful

## Screenshots (if applicable)
Add screenshots for UI changes

## Additional Notes
Any additional information
```

## 🏆 Recognition

Contributors will be:
- Added to the contributors list
- Mentioned in release notes
- Credited in the README

Thank you for contributing! 🙏
