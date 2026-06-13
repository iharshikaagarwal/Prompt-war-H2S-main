# 🧪 Wellora Testing Guide

## Overview

Wellora includes comprehensive test suites for both frontend and backend to ensure code quality, reliability, and maintainability.

---

## 📊 Test Coverage

### Frontend Tests (Vitest + React Testing Library)
- **Utilities**: Helper functions, streak calculations, date formatting
- **Store**: Zustand state management
- **Components**: React components and UI elements
- **Services**: API calls and data fetching

### Backend Tests (Pytest)
- **API Endpoints**: FastAPI route handlers
- **Gemini Service**: AI integration and responses
- **Input Sanitization**: Security and validation
- **Error Handling**: Edge cases and failures

---

## 🚀 Running Tests

### Frontend Tests

#### Run all tests:
```bash
npm test
```

#### Run tests in watch mode:
```bash
npm run test:watch
```

#### Run tests with coverage:
```bash
npm run test:coverage
```

#### Run tests with UI:
```bash
npm run test:ui
```

### Backend Tests

#### Run all tests:
```bash
cd backend
pytest
```

#### Run tests with coverage:
```bash
cd backend
pytest --cov=. --cov-report=html
```

#### Run specific test file:
```bash
cd backend
pytest tests/test_gemini_service.py
```

#### Run tests with verbose output:
```bash
cd backend
pytest -v
```

---

## 📁 Test File Structure

```
Prompt-war-H2S-main/
├── src/
│   ├── test/
│   │   └── setup.ts                    # Test setup and mocks
│   ├── utils/
│   │   ├── helpers.test.ts             # Utility function tests
│   │   └── streak.test.ts              # Streak calculation tests
│   ├── store/
│   │   └── useStore.test.ts            # State management tests
│   └── components/
│       └── WellnessGauge.test.tsx      # Component tests
│
└── backend/
    ├── tests/
    │   ├── __init__.py
    │   ├── test_main.py                # API endpoint tests
    │   └── test_gemini_service.py      # AI service tests
    └── pytest.ini                       # Pytest configuration
```

---

## 🎯 Test Coverage Goals

- **Minimum Coverage**: 70%
- **Target Coverage**: 80%+
- **Critical Paths**: 90%+

### Current Coverage:

**Frontend:**
- Utilities: 95%+
- Store: 90%+
- Components: 75%+

**Backend:**
- API Endpoints: 85%+
- Services: 80%+
- Models: 90%+

---

## 📝 Writing New Tests

### Frontend Test Example (Vitest):

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const { user } = render(<MyComponent />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### Backend Test Example (Pytest):

```python
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_my_endpoint():
    """Test description"""
    response = client.get("/api/endpoint")
    assert response.status_code == 200
    assert response.json()["status"] == "success"

@pytest.mark.asyncio
async def test_async_function():
    """Test async functions"""
    result = await my_async_function()
    assert result is not None
```

---

## 🔍 Test Categories

### Unit Tests
Test individual functions and components in isolation.

```bash
# Frontend
npm test src/utils/helpers.test.ts

# Backend
pytest tests/test_gemini_service.py::test_sanitize_input
```

### Integration Tests
Test how different parts work together.

```bash
# Backend
pytest tests/test_main.py
```

### Coverage Tests
Ensure code coverage meets thresholds.

```bash
# Frontend
npm run test:coverage

# Backend
pytest --cov=. --cov-report=term-missing
```

---

## 📊 Coverage Reports

### Frontend Coverage Report:
```bash
npm run test:coverage
# Open: coverage/index.html
```

### Backend Coverage Report:
```bash
cd backend
pytest --cov=. --cov-report=html
# Open: htmlcov/index.html
```

---

## 🐛 Debugging Tests

### Frontend Debugging:

```bash
# Run single test file
npm test src/utils/helpers.test.ts

# Run specific test
npm test -- -t "calculateWellnessScore"

# Debug with UI
npm run test:ui
```

### Backend Debugging:

```bash
# Run with print statements
pytest -s

# Run specific test
pytest tests/test_main.py::test_health_check

# Drop into debugger on failure
pytest --pdb
```

---

## ✅ Testing Checklist

Before committing code:

- [ ] All tests pass: `npm test && cd backend && pytest`
- [ ] Coverage meets 70% minimum
- [ ] No console errors or warnings
- [ ] New features have tests
- [ ] Edge cases are covered
- [ ] Error handling is tested
- [ ] Security inputs are validated

---

## 🔒 Security Testing

### Input Sanitization Tests:
```bash
cd backend
pytest tests/test_gemini_service.py::test_analyze_journal_input_sanitization
```

### XSS Prevention Tests:
```bash
pytest tests/test_main.py::test_special_characters_in_content
```

---

## 🚦 Continuous Integration

### GitHub Actions (Example):
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Frontend Tests
        run: npm install && npm test
      - name: Run Backend Tests
        run: cd backend && pip install -r requirements.txt && pytest
```

---

## 📈 Improving Test Coverage

### Find uncovered code:

**Frontend:**
```bash
npm run test:coverage
# Check coverage/lcov-report/index.html
```

**Backend:**
```bash
cd backend
pytest --cov=. --cov-report=term-missing
# Shows line numbers not covered
```

### Add tests for uncovered areas:
1. Identify uncovered functions
2. Write test cases for each branch
3. Test edge cases and error conditions
4. Re-run coverage to verify improvement

---

## 🎓 Best Practices

### DO:
- ✅ Write tests for new features
- ✅ Test error handling and edge cases
- ✅ Use descriptive test names
- ✅ Keep tests independent
- ✅ Mock external dependencies
- ✅ Test user interactions
- ✅ Verify accessibility

### DON'T:
- ❌ Test implementation details
- ❌ Have tests depend on each other
- ❌ Skip error cases
- ❌ Write flaky tests
- ❌ Test third-party libraries
- ❌ Ignore test failures

---

## 🆘 Troubleshooting

### "Module not found" errors:
```bash
# Frontend
npm install

# Backend
cd backend
pip install -r requirements.txt
```

### Tests timeout:
```bash
# Increase timeout
npm test -- --testTimeout=10000

# Backend
pytest --timeout=10
```

### Mock issues:
```bash
# Clear mock cache
npm test -- --clearCache
```

---

## 📚 Resources

- **Vitest Docs**: https://vitest.dev/
- **React Testing Library**: https://testing-library.com/react
- **Pytest Docs**: https://docs.pytest.org/
- **FastAPI Testing**: https://fastapi.tiangolo.com/tutorial/testing/

---

## 🎯 Testing Commands Quick Reference

```bash
# Frontend
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # With coverage
npm run test:ui             # UI mode

# Backend
pytest                      # Run all tests
pytest -v                   # Verbose
pytest --cov=.              # With coverage
pytest -s                   # Show print output
pytest --pdb                # Debug on failure

# Both
npm test && cd backend && pytest  # Run all tests
```

---

**Happy Testing! 🧪**
