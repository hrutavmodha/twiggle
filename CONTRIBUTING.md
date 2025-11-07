# Contributing to TwiggleJS

Thank you for considering contributing! 🎉  
Your contributions help improve the framework and make it safer and more developer-friendly.

---

## Table of Contents

1. Code of Conduct
2. How to Contribute
3. Setting Up the Project
4. Branching and Pull Requests
5. Reporting Issues
6. Coding Guidelines
7. Testing
8. Documentation
9. Security Considerations
10. License

---

## Code of Conduct

All contributors are expected to follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/).  
Be respectful, collaborative, and inclusive.

---

## How to Contribute

You can contribute by:

- Reporting bugs
- Fixing bugs
- Implementing new features
- Improving documentation
- Adding or improving tests

---

## Setting Up the Project

Clone the repo:

```
git clone https://github.com/hrutavmodha/twiggle.git
cd twiggle
```

Install dependencies:

```
npm install
```

Run dev server:

```
npm run start
```

Build for production:

```
npm run build
```

---

## Branching and Pull Requests

- Branch from main:

```
git checkout main
git pull
git checkout -b feature/my-new-feature
```

- Use descriptive branch names like:
    - `feature/<feature-name>`
    - `bugfix/<short-description>`
    - `docs/<doc-update>`

- Commit small, self-contained changes:

```
git commit -m "Add <short description of changes>"
```

- Push branch and open a PR:

```
git push origin feature/my-new-feature
```

PRs should include:

- Problem solved
- Solution explanation
- Screenshots/examples if applicable

---

## Reporting Issues

- Use GitHub Issues (avoid public security issues).
- Include:
    - Framework version
    - Browser / environment
    - Steps to reproduce
    - Expected vs actual behavior
    - Minimal reproducible example if possible

- Use labels appropriately (`bug`, `enhancement`, `question`).

---

## Coding Guidelines

- **Language**: TypeScript + JSX
- **Syntax**: Follow Prettier / ESLint rules

- Naming conventions:
    - Functions: camelCase
    - Classes: PascalCase
    - Variables: camelCase and it should carry semantic meaning
---

## Testing

- Add tests for new features or fixes in `/tests`.
- Run tests:

```
npm run test
```

- Ensure all tests pass before submitting a PR.

---

## Documentation

- Update docs for any public API change
- Keep Markdown formatting clean
- Include examples/screenshots when needed

---

## Security Considerations

- Never commit secrets (API keys, tokens)
- Follow guidelines in SECURITY.md
- Report vulnerabilities privately

---

## License

By contributing, you agree your contributions are licensed under the same license as the project (`MIT` or as specified in package.json).

---

**Thank you for contributing!**
