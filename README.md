# OrangeHRM Playwright Test Suite

An end-to-end test automation project built with [Playwright](https://playwright.dev/) (JavaScript) targeting the [OrangeHRM demo application](https://opensource-demo.orangehrmlive.com). It covers login flows, employee management (PIM module), and general navigation.

---

## What This Project Tests

- **Login Module** — valid/invalid credentials, empty form submission, forgot password flow (success, failure, cancel), navigation to official social pages
- **PIM Module** — adding employees (success and empty data), cancel flow, and several placeholder tests for future coverage (edit, delete, search by ID/name)
- **Navigation** — verifying that sidebar links (Admin, PIM, Leave, etc.) navigate to the correct pages post-login

---

## Architecture Overview

```
Playwright/
├── fixtures/
│   └── loginFixture.js       # Custom base fixture — handles login before tests that need it
│
├── pages/
│   ├── LoginPage.js          # Page Object for the login screen
│   └── PimPage.js            # Page Object for the PIM (employee management) module
│
├── test_data/
│   ├── loginTestData.json    # Valid, invalid, and empty login credential sets
│   ├── employeeTestData.json # Valid, invalid, and empty employee detail sets
│   └── homeTestData.json     # List of page names for navigation tests
│
├── tests/
│   ├── login.spec.js         # All login and navigation test cases
│   ├── pim.spec.js           # Employee management test cases
│   └── example.spec.js       # Default Playwright scaffold (not used in CI)
│
└── playwright.config.js      # Global config — browser, retries, reporter, headless mode
```

### Key Design Patterns

**Page Object Model (POM)**
Each screen is represented as a class (`LoginPage`, `PimPage`) that holds locators and reusable action methods. Tests instantiate these classes rather than writing raw selectors inline, making tests easier to read and maintain.

**Custom Fixtures**
`loginFixture.js` extends Playwright's base `test` object with a `loggedIn` fixture. Any test that declares `loggedIn` in its parameters gets a pre-authenticated browser session automatically — no repeated login code in each spec.

**Data-Driven Testing**
Test data lives in JSON files under `test_data/`. Invalid-credential scenarios and page-navigation checks loop over these arrays to generate separate test cases per entry, keeping test logic and data cleanly separated.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) v1.61+ | Browser automation and test runner |
| JavaScript (CommonJS) | Test language |
| Chromium | Target browser (Firefox/WebKit configs commented out) |
| HTML Reporter | Test result reports |
| Allure Playwright | Extended reporting (installed, not yet configured) |

---

## Running the Tests

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npx playwright test

# Run a specific spec
npx playwright test tests/login.spec.js

# Open the HTML report after a run
npx playwright show-report
```
