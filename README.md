# starter-node-ts

A Node.js TypeScript starter for native Windows 11 development with Git Bash, fnm and Visual Studio Code. No WSL required.

The project uses:

- Native ECMAScript modules
- Strict TypeScript type-checking
- Type-aware ESLint rules
- Prettier formatting
- Node’s built-in test runner
- `tsx` for development and TypeScript tests
- `tsc` for production builds

## From the JS starter to this one

This repository’s first commit is the `starter-node-js` repository’s HEAD, the same commit object. The second commit, "TS", is everything that turns that JavaScript project into this TypeScript one. The authoritative change list is therefore:

```bash
git diff HEAD~1 HEAD --stat
```

In words:

### 1. Packages

The JS starter already has ESLint, Prettier and their supporting packages (`eslint`, `@eslint/js`, `globals`, `eslint-config-prettier`, `prettier`). TypeScript adds four:

```bash
npm install -D typescript typescript-eslint @types/node tsx
```

| Package             | Role                                                                         |
| ------------------- | ---------------------------------------------------------------------------- |
| `typescript`        | The `tsc` compiler and type checker                                          |
| `tsx`               | Runs TypeScript directly during development and tests, without type-checking |
| `typescript-eslint` | Lets ESLint parse TypeScript and apply TypeScript-specific, type-aware rules |
| `@types/node`       | Type declarations for Node APIs such as `node:test`, `process` and `Buffer`  |

`tsx` transforms and runs TypeScript but does not type-check it. `tsc --noEmit` does the type-checking, as `npm run typecheck`.

### 2. Two new files: `tsconfig.json` and `tsconfig.build.json`

- `tsconfig.json` checks both application and test code and emits nothing. `strict` turns on the core strict family; `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` add checks that `strict` does not cover; `NodeNext` models Node’s real ESM/CommonJS behaviour and matches `"type": "module"`.
- `tsconfig.build.json` extends it, compiles only `src/` into `dist/` with source maps, and keeps tests out of the production build.

### 3. `eslint.config.js`

Two treatments in one flat config. `.js` files, such as `eslint.config.js` itself, get ordinary JavaScript linting. `.ts` files get TypeScript parsing plus typescript-eslint’s recommended and type-checked rules. `projectService: true` gives typescript-eslint the same project type information that VS Code uses. Type-aware linting is slower than syntax-only linting and finds subtler errors.

### 4. Rename `.js` to `.ts` and add types

`src/greeting.js` becomes `src/greeting.ts` with a typed signature, `export function greeting(): string`. The same for `index` and the test. Imports keep the `.js` extension, `import { greeting } from "./greeting.js"`, because Node ESM needs the runtime extension and, under `NodeNext`, TypeScript resolves `./greeting.js` to `greeting.ts` during development. `tsx --test` runs the `.test.ts` files with Node’s built-in test runner.

### 5. VS Code

- `settings.json` gains two lines that point VS Code at the project-local TypeScript language service and prompt to use it.
- `launch.json` debugs `src/index.ts` directly through tsx. Production still runs `dist/index.js`.
- `tasks.json` gains `npm run build` as the default build task.
- No extra extension. VS Code ships TypeScript language support, the project-local `typescript` package supplies the compiler and language-service version, the ESLint extension shows typescript-eslint findings, and the Prettier extension formats `.ts`.

### 6. Scripts in `package.json`

| Command        | JS                                                 | TS                                                                                       |
| -------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `lint`         | `eslint .`                                         | same                                                                                     |
| `lint:fix`     | `eslint . --fix`                                   | same                                                                                     |
| `format:check` | `prettier --check .`                               | same                                                                                     |
| `format`       | `prettier --write .`                               | same                                                                                     |
| `typecheck`    | -                                                  | `tsc --noEmit`                                                                           |
| `check`        | `npm run lint && npm run format:check && npm test` | `npm run lint && npm run format:check && npm run typecheck && npm test && npm run build` |
| `clean`        | -                                                  | removes `dist/`                                                                          |
| `build`        | -                                                  | `npm run clean && tsc -p tsconfig.build.json`                                            |
| `start`        | `node src/index.js`                                | `node --enable-source-maps dist/index.js`                                                |
| `dev`          | `node --watch src/index.js`                        | `tsx watch src/index.ts`                                                                 |
| `test`         | `node --test`                                      | `tsx --test`                                                                             |
| `test:watch`   | -                                                  | `tsx --test --watch`                                                                     |

The distinction:

- `npm run dev` runs TypeScript directly through tsx.
- `npm run typecheck` checks types without creating output.
- `npm run build` compiles `src/*.ts` into `dist/*.js`.
- `npm start` runs the compiled JavaScript.

### 7. Unchanged

`.editorconfig`, `.prettierrc.json`, `.prettierignore`, `.gitattributes` and `.gitignore` need no change. They already cover `.ts` files and ignore `dist/`.

## Project structure

```text
starter-node-ts/
├── .editorconfig                  <---------------- editor-agnostic basics: UTF-8, LF, 2-space indent, final newline; CRLF for .bat/.cmd/.ps1
├── .gitattributes                 <---------------- git stores text as LF on every OS; .bat/.cmd stay CRLF
├── .gitignore                     <---------------- keeps node_modules, dist, coverage, logs and .env out of git
├── .nvmrc                         <---------------- "24.20.0": the Node version `fnm use` selects and `fnm install` fetches
├── .prettierignore                <---------------- what Prettier skips: node_modules, dist, coverage, package-lock.json
├── .prettierrc.json               <---------------- Prettier settings: 100 columns, 2 spaces, semicolons, double quotes, LF
├── .vscode/
│   ├── extensions.json            <---------------- recommended extensions: ESLint, Prettier, EditorConfig; no TypeScript extension needed
│   ├── launch.json                <---------------- two debug configs: src/index.ts through tsx with source maps, and npm test
│   ├── settings.json              <---------------- Prettier formats on save, ESLint fixes on save, workspace TypeScript language service
│   └── tasks.json                 <---------------- Terminal > Run Task: npm run build (default build task), npm run check (default test task)
├── README-js.md                   <---------------- the JS starter's README, kept for side-by-side reading; identical to starter-node-js/README.md
├── README.md                      <---------------- this file
├── eslint.config.js               <---------------- ESLint flat config: JS rules for .js files, typescript-eslint type-aware rules for .ts files
├── package.json                   <---------------- name, scripts, dev-dependency ranges, Node engine range, "type": "module"
├── package-lock.json              <---------------- exact resolved dependency tree; committed; written by npm, never by hand
├── src/
│   ├── greeting.ts                <---------------- greeting(): the example application logic, typed
│   └── index.ts                   <---------------- entry point, prints the greeting; compiled to dist/index.js for `npm start`
├── test/
│   └── greeting.test.ts           <---------------- node:test example, run through tsx by `npm test`
├── tsconfig.json                  <---------------- type-checking config for src/ and test/: strict, NodeNext, no emit
├── tsconfig.build.json            <---------------- extends tsconfig.json; compiles src/ only into dist/ with source maps
│
├── node_modules/                  <---------------- generated by npm ci, ignored: installed packages and their .bin shims
├── dist/                          <---------------- generated by npm run build, ignored: compiled JavaScript and source maps
└── coverage/                      <---------------- generated only if you add coverage, ignored; empty today
```

## Start a new project from this template

1. Clone it.
2. Rename the project. Every occurrence to change:

   ```bash
   grep -rn --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist -e node-project-ts -e "Node Project TS" .
   ```

   Edit `package.json`, the greeting and its test by hand. `package-lock.json` names the project twice;
   step 3 rewrites both to match.

3. Install the Node version from `.nvmrc`, select it, and refresh the dev tools to the newest versions
   the ranges in `package.json` allow:

   ```bash
   fnm install && fnm use && npm update
   ```

4. Check everything runs:

   ```bash
   npm run check && npm start
   ```

## What "template repository" means

- A GitHub setting, not a git concept: Settings → General → **Template repository**. Any repo can be
  switched to a template, or back, at any time. Projects already generated from it are unaffected.
- **Use this template** copies the files of the default branch verbatim into a new repo with a single
  root commit. No history, no parent commit, no git link back to the template.
- Not copied: issues, pull requests, wiki, releases, settings, branch protection, Actions secrets,
  collaborators, topics, and the template flag itself.
- Nothing inside any file is substituted. That is why step 2 above renames `node-project-ts` by hand.
- GitHub shows "generated from ..." on the new repo. It is a label only; deleting or un-templating
  the source does not touch generated projects.

## Prerequisites

Install:

- [Git for Windows](https://git-scm.com/download/win), including Git Bash
- [fnm](https://github.com/Schniz/fnm)
- [Visual Studio Code](https://code.visualstudio.com/)

The required Node.js version is recorded in `.nvmrc`.

## First-time setup

After cloning the repository, open Git Bash in the project directory and run:

```bash
fnm install
fnm use
npm ci
npm run check
```

The commands perform the following work:

- `fnm install` installs the Node version recorded in `.nvmrc` if necessary.
- `fnm use` selects that version for the current terminal.
- `npm ci` installs the exact dependency tree recorded in `package-lock.json`.
- `npm run check` runs linting, formatting validation, type-checking, tests and the production build.

Confirm the active versions with:

```bash
node --version
npm --version
npx tsc --version
```

## Open in VS Code

Select the project’s Node version before launching VS Code:

```bash
fnm use
code .
```

When prompted, install the workspace’s recommended extensions.

Open a TypeScript file and accept the prompt to use the workspace TypeScript version. We can also select it manually:

```text
Ctrl+Shift+P
→ TypeScript: Select TypeScript Version
→ Use Workspace Version
```

This keeps VS Code’s type analysis aligned with the TypeScript compiler installed in the project.

## Development

Run the application directly from TypeScript in watch mode:

```bash
npm run dev
```

`tsx` restarts the application when an imported source file changes.

Run the tests in watch mode:

```bash
npm run test:watch
```

Before committing changes:

```bash
npm run check
```

## Production build

Compile the application:

```bash
npm run build
```

The compiled JavaScript and source maps are written to:

```text
dist/
```

Run the compiled application:

```bash
npm start
```

The production command executes JavaScript from `dist/`; it does not execute the TypeScript source directly.

## Available commands

| Command                | Purpose                                                   |
| ---------------------- | --------------------------------------------------------- |
| `npm run clean`        | Removes generated `dist/` output                          |
| `npm run build`        | Cleans and compiles production source code                |
| `npm start`            | Runs the compiled application                             |
| `npm run dev`          | Runs TypeScript directly in watch mode                    |
| `npm test`             | Runs TypeScript tests once                                |
| `npm run test:watch`   | Runs tests continuously                                   |
| `npm run typecheck`    | Checks application and test types without emitting files  |
| `npm run lint`         | Reports ESLint problems without modifying files           |
| `npm run lint:fix`     | Applies automatically fixable ESLint changes              |
| `npm run format`       | Formats supported files using Prettier                    |
| `npm run format:check` | Checks formatting without modifying files                 |
| `npm run check`        | Runs all repository validation and builds the application |

The complete validation order is:

```text
lint → format:check → typecheck → test → build
```

## Fixing reported problems

Apply safe ESLint fixes and formatting:

```bash
npm run lint:fix
npm run format
npm run check
```

The final `check` confirms that the corrected project passes every validation stage.

## TypeScript configuration

The project has two TypeScript configuration files.

### `tsconfig.json`

This is the main development and type-checking configuration. It includes both:

```text
src/
test/
```

It enables strict checks but does not emit JavaScript.

### `tsconfig.build.json`

This extends `tsconfig.json` and compiles only:

```text
src/
```

Production output is written to:

```text
dist/
```

Tests are deliberately excluded from the production build.

## ECMAScript modules

`package.json` contains:

```json
"type": "module"
```

TypeScript uses Node’s module model:

```json
"module": "NodeNext",
"moduleResolution": "NodeNext"
```

Relative imports in TypeScript source use the eventual JavaScript extension:

```ts
import { greeting } from "./greeting.js";
```

Although the source file is `greeting.ts`, the production runtime file is `greeting.js`. TypeScript’s `NodeNext` resolution understands this substitution.

## Type-checking, linting and formatting

These are separate operations:

- TypeScript checks whether values and APIs are used consistently with their declared types.
- ESLint detects suspicious code patterns and applies type-aware lint rules.
- Prettier controls code layout and formatting.
- Node’s test runner executes behavioral tests.

They complement one another; none replaces all the others.

The `tsx` development runner transforms TypeScript for execution but does not perform type-checking. Use:

```bash
npm run typecheck
```

or:

```bash
npm run check
```

to verify types.

## Development packages

| Package                  | Role                                              |
| ------------------------ | ------------------------------------------------- |
| `typescript`             | Compiler and type checker                         |
| `typescript-eslint`      | TypeScript parsing and ESLint rules               |
| `@types/node`            | Type declarations for Node.js APIs                |
| `tsx`                    | Direct TypeScript development and test runner     |
| `eslint`                 | Linting engine                                    |
| `@eslint/js`             | Official JavaScript ESLint rules                  |
| `globals`                | Node global-variable definitions for ESLint       |
| `eslint-config-prettier` | Disables ESLint rules that conflict with Prettier |
| `prettier`               | Code formatter                                    |

All are project-local development dependencies.

Prettier is exact-pinned because formatting can change between releases. `package-lock.json` records the exact resolved version of every direct and transitive dependency.

## ESLint typed linting

`eslint.config.js` uses ESLint’s flat configuration system and typescript-eslint’s type-aware recommended rules.

The project service reads the nearest `tsconfig.json` for each TypeScript file. This aligns ESLint’s type information with TypeScript and VS Code.

Generated `dist/` and `coverage/` content is ignored. ESLint already ignores `node_modules/` and `.git/`, so the project does not require `.eslintignore`.

## VS Code support

VS Code includes its TypeScript language service, providing:

- IntelliSense
- Type errors in the editor
- Symbol navigation
- Rename and other refactoring operations
- Import suggestions
- Node debugging with source maps

The workspace recommends:

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- EditorConfig (`editorconfig.editorconfig`)

No additional stable TypeScript extension is required.

## Line endings

Ordinary project text files use LF line endings.

Windows `.bat` and `.cmd` command scripts retain CRLF. The policy is defined by `.gitattributes` and complemented by `.editorconfig`.

## Inspecting dependencies

List direct dependencies:

```bash
npm ls --depth=0
```

List the complete dependency tree:

```bash
npm ls --all
```

Explain why a package is installed:

```bash
npm explain typescript-eslint
```

## Recreating the toolchain

This section is for rebuilding the project configuration from scratch. After an ordinary clone, use `npm ci` instead.

Install TypeScript, ESLint and their supporting packages:

```bash
npm install -D eslint @eslint/js globals eslint-config-prettier typescript typescript-eslint @types/node tsx
```

Install and exact-pin Prettier:

```bash
npm install -D -E prettier
```

## Version policy

- `package-lock.json` pins exact versions of everything and is committed. `npm ci` installs exactly
  those, on every OS, and fails if the lock and `package.json` disagree.
- The allowed ranges live in `package.json`: `^` for TypeScript, typescript-eslint, tsx, `@types/node`
  and the ESLint family, so minors and patches may move, and an exact pin for Prettier, because
  formatting output changes between releases.
- `npm update` moves the lock within the ranges and never past them. It does not edit `package.json`.
- To take a new major, widen the range in `package.json` on purpose, run `npm install`, run
  `npm run check`, commit both files.

## Cleanups

See what is lying around before cleaning. Lists every untracked file, ignored or not, but collapses
any folder that is entirely untracked to its path, at whatever depth. Add `--exclude-standard` to
drop the ignored ones and see only what git would commit.

```bash
git ls-files --others --directory
```

Remove only the build output:

```bash
npm run clean
```

Full cleanup, back to the state of a fresh clone:

```bash
rm -rf node_modules dist coverage && npm cache verify
```

- `node_modules` is the whole environment. `npm ci` recreates it from the lock.
- `dist` is recreated by `npm run build`, which `npm run check` includes.
- `npm cache verify` checks npm's global download cache and garbage-collects unused entries. Safe.
- `npm cache clean --force` is the bigger hammer: it wipes that cache for every project on the
  machine, and the next install anywhere re-downloads. Only when disk space matters.

## Full build

From a fresh clone or after a full cleanup. Every step exits non-zero on failure, so the chain stops
at the first problem:

```bash
fnm install \
  && fnm use \
  && npm ci \
  && npm ls --depth=0 \
  && npm run check \
  && npm start
```

What each step proves:

- `fnm install` and `fnm use`: the Node version in `.nvmrc` is present and selected for this shell.
- `npm ci`: a clean `node_modules` built exactly from `package-lock.json`.
- `npm ls --depth=0`: the installed tree is complete and consistent with the lock.
- `npm run check`: lint, format check, type check, tests and the production build, in that order.
- `npm start`: the compiled application in `dist/` runs.
