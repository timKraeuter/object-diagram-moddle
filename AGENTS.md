# AGENTS.md - Coding Agent Guidelines for object-diagram-moddle

## Project Overview

This is a JavaScript (ES Modules) library that provides a moddle (meta-model) wrapper
for Object Diagram XML files. It can parse (`fromXML`) and serialize (`toXML`) object
diagram models. Built on top of the bpmn.io ecosystem (`moddle`, `moddle-xml`, `min-dash`).

No TypeScript -- pure JavaScript with JSDoc annotations. Node >= 18 required.

## Repository Structure

```
lib/                          # Source code
  index.js                    # Entry point, re-exports from simple.js
  simple.js                   # Factory combining all JSON descriptors
  object-diagram-moddle.js    # Core ODModdle class (fromXML/toXML)
resources/                    # Moddle descriptor JSON schemas
  od.json                     # Object Diagram model types
  odDi.json                   # Diagram interchange types
  dc.json                     # Diagram commons (Point, Bounds, Font)
  bioc.json                   # Color extensions for shapes/edges
test/
  spec/                       # Unit and integration tests
    object-diagram-moddle.js  # Type parsing, creation, property access tests
    xml/read.js               # XML import tests
    xml/edit.js               # Edit-then-serialize tests
    xml/roundtrip.js          # Read -> write -> compare tests
  integration/distro.cjs      # CJS distribution integration test
  fixtures/                   # XML test fixtures
  helper.js                   # Test helpers (createModdle, readFile)
  expect.js                   # Chai expect with custom matchers
  xml-helper.js               # XML test helpers (fromFile, toXML)
  matchers.js                 # Custom chai matcher: jsonEqual
dist/                         # Built output (ESM + CJS bundles, generated)
```

## Build, Lint, and Test Commands

```bash
# Install dependencies
npm ci

# Run everything (lint + test, used by CI)
npm run all

# Lint
npm run lint
npm run fixLint          # Auto-fix lint issues

# Run all tests
npm test

# Run a single test file
npx mocha --reporter=spec test/spec/xml/read.js

# Run a single test by name (grep)
npx mocha --reporter=spec --recursive --grep "objects and links"

# Run tests in watch mode
npm run dev

# Build (Rollup bundling to dist/)
npm run build

# Test built distribution
npm run test:build
```

### CI

GitHub Actions runs on ubuntu-latest with Node 22. Pipeline: `npm ci` then `npm run all`
(which runs lint then tests sequentially). Always ensure `npm run all` passes.

## Code Style Guidelines

### Module System and Imports

- **ES Modules only** (`"type": "module"` in package.json). All source and test files
  use `import`/`export` (except `test/integration/distro.cjs` which tests CJS compat).
- JSON imports use the `with { type: 'json' }` import attribute syntax:
  ```js
  import ODDescriptors from '../resources/od.json' with { type: 'json' };
  ```
- Import ordering: external packages first, then local modules, then JSON resources.
- Destructured imports are formatted one-per-line when multiple items are imported:
  ```js
  import {
    assign
  } from 'min-dash';
  ```
- Always include `.js` extension in relative imports:
  ```js
  import ODModdle from './object-diagram-moddle.js';
  ```

### Formatting

- **Indentation:** 2 spaces (no tabs).
- **Semicolons:** Always used.
- **Quotes:** Single quotes for strings.
- **Trailing commas:** Used in multi-line objects/arrays.
- **Spacing in arrays:** Space after `[` and before `]` in inline array literals: `[ 'a', 'b' ]`.
- **Line length:** No strict limit, but keep lines reasonable.
- **No Prettier** -- formatting is enforced by ESLint only.
- **Blank lines:** Use blank lines to separate logical sections within functions/blocks.

### Linting

- ESLint v9 with flat config (`eslint.config.js`).
- Base config: `eslint-plugin-bpmn-io` recommended rules.
- Mocha-specific rules applied to `test/**/*.js` and `test/**/*.cjs`.
- Babel parser used for import attributes syntax support.
- `dist/` directory is ignored by ESLint.

### Types and Documentation

- No TypeScript. Use JSDoc for public API documentation.
- JSDoc `@typedef` for complex return types (e.g., `ParseResult`, `ParseError`).
- JSDoc `@param` and `@returns` on public methods.
- Use `@class` and `@extends` annotations for constructor functions.

### Naming Conventions

- **Files:** kebab-case for source files (`object-diagram-moddle.js`), camelCase for
  simple names (`simple.js`, `helper.js`).
- **Variables/functions:** camelCase (`createModdle`, `rootElement`, `readFile`).
- **Constructor functions:** PascalCase (`ODModdle`).
- **JSON descriptor imports:** PascalCase (`ODDescriptors`, `BiocPackage`).
- **Constants:** camelCase for object constants (`packages`), not SCREAMING_CASE.
- **Test describe blocks:** Use the module/feature name as the string.

### Inheritance Pattern

This codebase uses **prototypal inheritance** (not ES classes):
```js
export default function ODModdle(packages, options) {
  Moddle.call(this, packages, options);
}
ODModdle.prototype = Object.create(Moddle.prototype);
ODModdle.prototype.fromXML = function(xmlStr, typeName, options) { ... };
```
Follow this pattern when extending moddle types. Do not convert to `class` syntax.

### Error Handling

- `fromXML` returns a Promise that resolves with `{ rootElement, references, warnings, elementsById }`.
- `toXML` returns a Promise that resolves with `{ xml }` or rejects with an Error.
- Wrap synchronous errors in Promises (see `toXML` implementation with try/catch inside
  `new Promise`).

### Test Conventions

- **Test runner:** Mocha with BDD-style `describe`/`it` blocks.
- **Assertions:** Chai `expect` with a custom `jsonEqual` matcher for deep object comparison.
- **Async tests:** Use `async function` with `await` for XML parsing/serialization.
- **Comment markers:** Use `// given`, `// when`, `// then` to structure test cases
  (Arrange/Act/Assert). Use `// assume` for precondition checks.
- **Fixture files:** Place XML fixtures in `test/fixtures/`. Read with `readFile()` from
  `test/helper.js`.
- **Helper pattern:** Each test file creates a local `moddle` instance via `createModdle()`
  at the top of the `describe` block and defines local helper functions for common operations.
- **Cross-platform:** Normalize line endings with `.replace(/\r\n/g, '\n')` when comparing
  XML strings.

### Dependencies

- **Runtime:** `min-dash`, `moddle`, `moddle-xml` -- these are externalized in the Rollup
  bundle. Only `bpmn-in-color-moddle` is bundled (resolved by Rollup).
- **Dev only:** Mocha, Chai, ESLint, Rollup, Babel (for ESLint parser), npm-run-all2.
- Keep dependencies minimal. This is a focused library.

### Build System

- **Rollup** bundles `lib/index.js` into both ESM (`dist/index.js`) and CJS (`dist/index.cjs`)
  with source maps.
- The `prepare` script runs `build` automatically before `npm publish`.
- `dist/` is gitignored -- never commit built files.
- Published package includes only `dist/` and `resources/` directories.
