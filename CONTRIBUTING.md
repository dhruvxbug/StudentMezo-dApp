# Contributing to StudentMezo DApp

Thank you for considering contributing to StudentMezo! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, wallet, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the proposed functionality
- **Explain why this enhancement would be useful**
- **List any alternative solutions** you've considered

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the code style** of the project
3. **Add tests** if you've added code that should be tested
4. **Ensure the test suite passes**
5. **Update documentation** as needed
6. **Write a clear commit message**

## Development Process

### Setting Up Development Environment

1. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/StudentMezo-dApp.git
cd StudentMezo-dApp
```

2. Install dependencies:
```bash
npm install
cd contracts && npm install
cd ../frontend && npm install
```

3. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

### Smart Contract Development

1. Write your contract in `contracts/contracts/`
2. Add tests in `contracts/test/`
3. Run tests:
```bash
cd contracts
npx hardhat test
```

4. Check coverage:
```bash
npx hardhat coverage
```

### Frontend Development

1. Add/modify components in `frontend/src/`
2. Follow React best practices
3. Test your changes locally:
```bash
cd frontend
npm run dev
```

4. Check for linting errors:
```bash
npm run lint
```

## Coding Standards

### Smart Contracts

- Use Solidity 0.8.20+
- Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Add NatSpec comments for public functions
- Include security considerations
- Use OpenZeppelin contracts where possible

**Example:**
```solidity
/**
 * @notice Deposits collateral and mints MUSD
 * @dev Requires student to be verified
 */
function depositCollateralAndMintMUSD() external payable onlyVerifiedStudent {
    // Implementation
}
```

### Frontend (React)

- Use functional components with hooks
- Follow React naming conventions
- Keep components small and focused
- Use meaningful variable names
- Add PropTypes or TypeScript types

**Example:**
```javascript
function StudentCard({ student, onSelect }) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Component logic
  
  return (
    // JSX
  );
}
```

### General

- Write clear, self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful commit messages

## Commit Message Guidelines

Format: `<type>: <subject>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat: Add loan repayment scheduling
fix: Correct interest rate calculation
docs: Update deployment guide
test: Add tests for NFT minting
```

## Testing

### Smart Contracts

All new features must include tests:

```javascript
describe("NewFeature", function () {
  it("Should do something correctly", async function () {
    // Test implementation
  });
});
```

Run tests:
```bash
cd contracts
npx hardhat test
```

### Frontend

While optional for MVP, tests are encouraged:

```javascript
import { render, screen } from '@testing-library/react';

test('renders student dashboard', () => {
  render(<StudentDashboard />);
  expect(screen.getByText(/Student Dashboard/i)).toBeInTheDocument();
});
```

## Documentation

Update documentation when:
- Adding new features
- Changing existing functionality
- Modifying contract interfaces
- Updating deployment process

Documentation locations:
- Main README.md
- contracts/README.md
- frontend/README.md
- DEPLOYMENT.md
- Code comments

## Review Process

1. **Submit PR** with clear description
2. **Automated checks** must pass
3. **Code review** by maintainers
4. **Address feedback** if requested
5. **Approval and merge** by maintainer

## Areas to Contribute

### High Priority
- [ ] Mezo SDK integration for real Bitcoin deposits
- [ ] Oracle integration for BTC/USD pricing
- [ ] Advanced reputation algorithm
- [ ] Loan marketplace features
- [ ] Security audit findings

### Medium Priority
- [ ] UI/UX improvements
- [ ] Mobile responsiveness
- [ ] Dark mode
- [ ] Internationalization (i18n)
- [ ] Advanced analytics dashboard

### Low Priority
- [ ] Additional NFT designs
- [ ] Leaderboard rankings
- [ ] Email notifications
- [ ] Social sharing features
- [ ] Community forums

## Getting Help

- **Discord**: [Link to Discord]
- **Telegram**: [Link to Telegram]
- **GitHub Issues**: For bugs and feature requests
- **Documentation**: Check README and other docs

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Eligible for future governance tokens (if implemented)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to StudentMezo! 🎓
