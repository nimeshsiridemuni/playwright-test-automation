# QA Automation Portfolio Project

## Overview

This project is a full-stack Vanilla JavaScript application built specifically to demonstrate professional QA automation capabilities using Playwright.

The application intentionally includes authentication, API integration, DOM interactions, and state handling so that comprehensive UI and API test coverage can be written.

---

# Tech Stack

Frontend:
- HTML5
- CSS3
- Vanilla JavaScript (no frameworks)

Backend:
- Node.js
- Express.js
- HTTP Basic Authentication

Testing:
- Playwright (JavaScript)
- dotenv (environment variable management)

CI/CD:
- GitHub Actions

---

# Authentication

The application is protected using HTTP Basic Authentication.

Credentials:

Username: Admin  
Password: password

Authentication is enforced via Express middleware and must be supplied when:
- Accessing the UI
- Calling protected API endpoints
- Running automated tests

Playwright uses `httpCredentials` configured via environment variables stored in `.env`.

---

# Why This App Was Designed This Way

This application was intentionally structured to allow writing meaningful automation scenarios, including:

1. Authentication handling
2. Protected API calls
3. DOM rendering validation
4. Dynamic UI updates (cart counter)
5. API + UI integration validation
6. Positive and negative test cases
7. State validation after user actions

The goal was not to build a complex product, but to create a controlled system that demonstrates test design thinking.

---

# Application Features

- Secure API using Basic Auth
- Product listing fetched from backend
- Add-to-cart functionality
- Dynamic cart counter updates
- Clean, test-friendly UI
- Data-testid attributes for stable selectors

---

# Test Coverage Strategy

## UI Tests (E2E)

Located in: `tests/e2e/`

Covers:
- Successful authentication
- Page load verification
- Product rendering validation
- Add to cart interaction
- Cart counter update validation
- Negative auth scenarios

## API Tests

Located in: `tests/api/`

Covers:
- 200 response validation
- Unauthorized access validation (401)
- Basic auth header validation
- Response structure validation

---

# Environment Configuration

Create a `.env` file in the project root:

BASIC_AUTH_USER=Admin  
BASIC_AUTH_PASS=password

Playwright loads these values using dotenv.

---

# Installation Guide

## 1. Clone Repository

```
git clone <your-repo-url>
cd playwright-test-automation
```

## 2. Install Server Dependencies

```
cd server
npm install
```

## 3. Install Test Dependencies

From project root:

```
npm install
npx playwright install
```

---

# Running the Application

## Start Backend Server

```
cd server
npm run dev
```

Server runs at:

http://localhost:4000

## Serve Frontend

From client folder:

```
npx serve .
```

Frontend runs at:

http://localhost:3000

---

# Running Tests

From root directory:

```
npx playwright test
```

To generate HTML report:

```
npx playwright test --reporter=html
npx playwright show-report
```

---

# What This Project Demonstrates

- Secure authentication testing
- API + UI integration validation
- Environment-based configuration
- Cross-browser execution
- Automation-friendly DOM design
- Structured test separation (E2E vs API)
- Realistic QA portfolio architecture

---

# Future Improvements

Potential extensions:

- Role-based access control
- Database integration
- Docker containerization
- Test tagging (smoke/regression)
- Page Object Model implementation
- Visual regression testing
- CI secrets configuration

---

# Purpose

This repository is intended to showcase my initial QA Automation skills. I will add more and more improved versions of frameworks using Playwright.

- Test design
- Secure authentication handling
- Automation architecture
- Maintainable test structure
- Professional documentation

It is intentionally framework-free on the frontend to demonstrate automation skills without relying on UI abstractions.

---



