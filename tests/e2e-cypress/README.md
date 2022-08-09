# Cypress e2e tests

> **THIS WORK IS CURRENTLY EXPERIMENTAL**
>
> **SEE [FEF-583](https://gousto.atlassian.net/browse/FEF-583)**

This test suite is an experiment to attempt to achieve better stability, ease of debugging, performance, and extensibility.

## Commands

_Note: the following commands should be run from the root of this repo_

**Run tests (headfully)**

```bash
yarn workspace e2e-cypress cypress:open
```

**Run tests (headlessly)**

```bash
yarn workspace e2e-cypress test
```

**Lint test suite**

```bash
yarn workspace e2e-cypress lint
```

**Type-check test suite**

```bash
yarn workspace e2e-cypress type-check
```

## Tests

- `signupWithCard.spec` - tests new user signup journey from homepage, finishing in checkout **with card payment**

## Technical Decisions

- Test runner: [Cypress 10](https://www.cypress.io/)
- Testing utilities: [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/) for easy user-centric testing
- Design pattern: [Page Object Model](https://www.toolsqa.com/cypress/page-object-pattern-in-cypress/)
- Typescript
