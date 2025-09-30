# ASC Playwright Test Automation Framework

[![Playwright Tests](https://github.com/PratyushJaishankar/ASC_Playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/PratyushJaishankar/ASC_Playwright/actions/workflows/playwright.yml)

A comprehensive end-to-end test automation framework built with Playwright, implementing the Page Object Model (POM) design pattern for testing e-commerce web applications.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Reports](#reports)
- [CI/CD Integration](#cicd-integration)
- [Contributing](#contributing)

## 🎯 About the Project

This project demonstrates a robust test automation framework using Playwright for end-to-end testing of the Rahul Shetty Academy e-commerce application. It showcases best practices in test automation including:

- Page Object Model (POM) design pattern
- Modular and reusable test components
- Comprehensive test coverage for user workflows
- Advanced Playwright features (assertions, waits, locators)
- Allure reporting integration
- GitHub Actions CI/CD pipeline

## ✨ Features

- **Page Object Model Implementation**: Clean separation of test logic and page interactions
- **Multiple Browser Support**: Tests run on Chromium, Firefox, and WebKit
- **Parallel Test Execution**: Faster test runs with configurable parallelism
- **Rich Assertions**: Soft and hard assertions for comprehensive validation
- **Wait Strategies**: Explicit waits for reliable test execution
- **Environment Configuration**: Support for different test environments via `.env`
- **Allure Reports**: Beautiful, interactive HTML reports
- **CI/CD Ready**: Automated test execution on GitHub Actions
- **GitHub Pages Deployment**: Automatic deployment of Allure reports

## 🛠 Tech Stack

- **[Playwright](https://playwright.dev/)** (v1.55.0) - Modern end-to-end testing framework
- **Node.js** (v18+) - JavaScript runtime
- **Allure Report** (v3.3.3) - Test reporting framework
- **dotenv** (v17.2.2) - Environment variable management
- **GitHub Actions** - CI/CD automation

## 📁 Project Structure

```
ASC_Playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD workflow configuration
├── tests/
│   └── module4/
│       ├── pages/                  # Page Object Models
│       │   ├── Registration.js     # Registration page POM
│       │   ├── loginPage.js        # Login page POM
│       │   ├── dashboardPage.js    # Dashboard page POM
│       │   ├── cartPage.js         # Cart page POM
│       │   └── checkoutPage.js     # Checkout page POM
│       └── specs/                  # Test specifications
│           ├── first_script.test.js    # Registration page verification
│           ├── second_script.test.js   # User registration test
│           ├── third_script.test.js    # Login and assertions test
│           └── fourth_script.test.js   # End-to-end order flow test
├── allure-results/                 # Allure test results (generated)
├── playwright-report/              # Playwright HTML reports (generated)
├── .env                           # Environment variables (not in git)
├── .gitignore                     # Git ignore rules
├── playwright.config.js           # Playwright configuration
├── package.json                   # Project dependencies
└── README.md                      # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/PratyushJaishankar/ASC_Playwright.git
   cd ASC_Playwright
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:

   ```env
   LOGIN_EMAIL=your_email@example.com
   LOGIN_PASSWORD=YourPassword123
   CARD_NUMBER=4542980900000005
   CVV=123
   NAME_ON_CARD=John Doe
   EXPIRY_YEAR=25
   ```

   > **Note**: Use valid test credentials for the Rahul Shetty Academy application.

## 🧪 Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in a specific directory

```bash
npx playwright test tests/module4/specs/
```

### Run a specific test file

```bash
npx playwright test tests/module4/specs/first_script.test.js
```

### Run tests in headed mode (see browser)

```bash
npx playwright test --headed
```

### Run tests on a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests in debug mode

```bash
npx playwright test --debug
```

### Run tests with specific workers (parallel execution)

```bash
npx playwright test --workers=4
```

## 📝 Test Scenarios

### 1. Registration Page Verification (`first_script.test.js`)
- Navigates to registration page
- Verifies presence of registration form elements
- Validates "Create Account" heading visibility

### 2. User Registration (`second_script.test.js`)
- Completes full user registration flow
- Generates unique email addresses
- Fills registration form with test data
- Verifies successful account creation

### 3. Login and Dashboard Validation (`third_script.test.js`)
- Logs in with credentials from `.env`
- Uses explicit waits for page elements
- Performs multiple assertions on dashboard elements
- Validates product listings and filters

### 4. End-to-End Order Flow (`fourth_script.test.js`)
- Complete e-commerce workflow:
  - User login
  - Product browsing with scroll and hover
  - Add product to cart
  - Proceed to checkout
  - Fill payment details
  - Select country
  - Place order
  - Verify order confirmation

## 📊 Reports

### Playwright HTML Report

After running tests, view the built-in Playwright report:

```bash
npx playwright show-report
```

### Allure Report

1. **Generate Allure report**

   ```bash
   npx allure generate allure-results --clean -o allure-report
   ```

2. **Open Allure report**

   ```bash
   npx allure open allure-report
   ```

3. **View online Allure report**

   [https://pratyushjaishankar.github.io/ASC_Playwright](https://pratyushjaishankar.github.io/ASC_Playwright)

## 🔄 CI/CD Integration

This project uses GitHub Actions for continuous integration:

- **Automated Test Execution**: Tests run on every push to `main` or `develop` branches
- **Multi-Browser Testing**: Tests execute across Chromium, Firefox, and WebKit
- **Report Generation**: Automatic generation of Playwright and Allure reports
- **GitHub Pages Deployment**: Allure reports are automatically deployed to GitHub Pages
- **Artifact Storage**: Test reports are stored as artifacts for 30 days

### Workflow Triggers

- Push to `main` or `develop` branches
- Pull requests to `main` branch

### View CI/CD Results

- **GitHub Actions**: Check the "Actions" tab in the repository
- **Live Allure Report**: [https://pratyushjaishankar.github.io/ASC_Playwright](https://pratyushjaishankar.github.io/ASC_Playwright)

## 🏗 Page Object Model Structure

Each page in the application has a corresponding Page Object class:

### Example: LoginPage

```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#userEmail');
    this.passwordInput = page.locator('#userPassword');
    this.loginButton = page.locator('#login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Benefits of POM

- **Maintainability**: Changes to UI only require updates in one place
- **Reusability**: Page objects can be reused across multiple tests
- **Readability**: Tests are more readable and describe user actions
- **Separation of Concerns**: Test logic is separate from page interactions

## 🔧 Configuration

### Playwright Configuration (`playwright.config.js`)

Key configurations:

- **Timeout**: 300 seconds (5 minutes) for long-running operations
- **Parallel Execution**: Enabled for faster test runs
- **Retries**: 2 retries on CI, 0 locally
- **Reporters**: HTML, List, and Allure
- **Browsers**: Chromium, Firefox, WebKit
- **Trace**: Captured on first retry for debugging

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

**Project Maintainer**: Pratyush Jaishankar

**Project Link**: [https://github.com/PratyushJaishankar/ASC_Playwright](https://github.com/PratyushJaishankar/ASC_Playwright)

## 📄 License

This project is created for educational and demonstration purposes.

---

**Happy Testing! 🎭**
