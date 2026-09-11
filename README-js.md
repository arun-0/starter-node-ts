# starter-node-js

A professional Node.js starter project (for just JS, NO TS) using:

- Native ECMAScript modules
- Node’s built-in test runner
- ESLint for code-quality checks
- Prettier for formatting
- fnm for selecting the Node.js version
- VS Code project settings for a consistent development experience

The project targets native Windows 11 development with Git Bash—no WSL is required.

## Start a new project from this template

1. Clone it.
2. Rename the project. Every occurrence to change:

   ```bash
   grep -rn --exclude-dir=.git --exclude-dir=node_modules -e node-project-js -e "Node Project JS" .
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
- Nothing inside any file is substituted. That is why step 2 above renames `node-project-js` by hand.
- GitHub shows "generated from ..." on the new repo. It is a label only; deleting or un-templating
  the source does not touch generated projects.

## Prerequisites

Install these applications before working on the project:

- [Git for Windows](https://git-scm.com/download/win), including Git Bash
- [fnm](https://github.com/Schniz/fnm), the Fast Node Manager
- [Visual Studio Code](https://code.visualstudio.com/)
- EditorConfig, ESLint, Prettier plugins (VS Code does not need plugins for JS/TS)

The required Node.js version is recorded in:

```text
.nvmrc
```

The project currently uses:

```text
24.20.0
```

## First-time setup

After cloning the repository, open Git Bash in the project directory and run:

```bash
fnm install
fnm use
npm ci
npm run check
```

What these commands do:

- `fnm install` reads `.nvmrc` and installs the required Node.js version if necessary.
- `fnm use` selects that version for the current terminal session.
- `npm ci` installs the exact dependency tree recorded in `package-lock.json`.
- `npm run check` runs linting, formatting validation and tests.

You can confirm the selected versions with:

```bash
node --version
npm --version
```

## Opening the project in VS Code

Select the project’s Node version before opening VS Code:

```bash
fnm use
code .
```

Opening VS Code from this terminal helps VS Code tasks, debugging configurations and integrated terminals inherit the selected Node.js environment.

When prompted, install the extensions recommended by:

```text
.vscode/extensions.json
```

The recommended extensions are:

- ESLint [by Microsoft "dbaeumer.vscode-eslint"] - Liner
- Prettier [by Prettier "esbenp.prettier-vscode"] - Code formatter
- EditorConfig [by EditorConfig "editorconfig.editorconfig"]

## Running the application

Run normally:

```bash
npm start
```

Run in watch mode during development:

```bash
npm run dev
```

Watch mode restarts the application when relevant source files change.

## Development workflow

For normal ongoing development:

```bash
fnm use
npm run dev
```

Before committing changes:

```bash
npm run check
```

If linting or formatting problems are reported, apply automatic fixes:

```bash
npm run lint:fix
npm run format
npm run check
```

Prettier runs after ESLint’s automatic fixes so that formatting is finalized consistently.

## Available npm scripts

| Command                | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `npm start`            | Runs the application normally                   |
| `npm run dev`          | Runs the application using Node’s watch mode    |
| `npm test`             | Runs tests using Node’s built-in test runner    |
| `npm run lint`         | Reports ESLint problems without modifying files |
| `npm run lint:fix`     | Applies ESLint’s automatically fixable changes  |
| `npm run format`       | Formats supported files using Prettier          |
| `npm run format:check` | Checks formatting without modifying files       |
| `npm run check`        | Runs linting, formatting validation and tests   |

The `check` script executes:

```text
lint → format:check → test
```

It does not intentionally rewrite source files.

## Project structure

```text
starter-node-js/
├── .editorconfig                  <---------------- editor-agnostic basics: UTF-8, LF, 2-space indent, final newline; CRLF for .bat/.cmd
├── .gitattributes                 <---------------- git stores text as LF on every OS; .bat/.cmd stay CRLF
├── .gitignore                     <---------------- keeps node_modules, dist, coverage, logs and .env out of git
├── .nvmrc                         <---------------- "24.20.0": the Node version `fnm use` selects and `fnm install` fetches
├── .prettierignore                <---------------- what Prettier skips: node_modules, dist, coverage, package-lock.json
├── .prettierrc.json               <---------------- Prettier settings: 100 columns, 2 spaces, semicolons, double quotes, LF
├── .vscode/
│   ├── extensions.json            <---------------- recommended extensions: ESLint, Prettier, EditorConfig
│   ├── launch.json                <---------------- two debug configs: npm run dev, npm test
│   ├── settings.json              <---------------- Prettier formats on save, ESLint fixes on save, for JS/TS/JSON/Markdown
│   └── tasks.json                 <---------------- Terminal > Run Task: npm run check, the default test task
├── README.md                      <---------------- this file
├── eslint.config.js               <---------------- ESLint flat config: recommended rules, ESM, Node globals, Prettier conflicts off
├── package.json                   <---------------- name, scripts, dev-dependency ranges, Node engine range, "type": "module"
├── package-lock.json              <---------------- exact resolved dependency tree; committed; written by npm, never by hand
├── src/
│   ├── greeting.js                <---------------- greeting(): the example application logic
│   └── index.js                   <---------------- entry point, prints the greeting; `npm start` runs it
├── test/
│   └── greeting.test.js           <---------------- node:test example; `npm test` runs it
│
├── node_modules/                  <---------------- generated by npm ci, ignored: installed packages and their .bin shims
└── coverage/  dist/               <---------------- generated only if you add coverage or a build step, ignored; empty today
```

## Development tools

The project uses five development packages:

| Package                  | Purpose                                                               |
| ------------------------ | --------------------------------------------------------------------- |
| `eslint`                 | Linting engine that identifies likely mistakes and questionable code  |
| `@eslint/js`             | Official recommended JavaScript rules for ESLint                      |
| `globals`                | Definitions of global names available in environments such as Node.js |
| `eslint-config-prettier` | Disables ESLint rules that conflict with Prettier                     |
| `prettier`               | Syntax-aware code formatter                                           |

These are development dependencies rather than deployed application dependencies.

They are installed under:

```text
node_modules/
```

Packages that provide commands create local command shims under:

```text
node_modules/.bin/
```

When an npm script runs, npm temporarily adds `node_modules/.bin` to `PATH`. Consequently:

```bash
npm run lint
```

can invoke the project-local ESLint command without requiring a global ESLint installation.

## ESLint configuration

The project uses ESLint’s modern flat configuration system:

```text
eslint.config.js
```

The configuration:

- Enables the official recommended JavaScript rules from `@eslint/js`.
- Analyzes project `.js` files as ECMAScript modules.
- Defines standard Node.js globals through `globals.nodeBuiltin`.
- Ignores generated `coverage/` and `dist/` content.
- Loads `eslint-config-prettier/flat` last so it can disable rules that conflict with Prettier.

ESLint already ignores `node_modules/` and `.git/`, so a separate `.eslintignore` file is not required.

## ECMAScript modules

The following entry in `package.json` tells Node.js to treat `.js` files as ECMAScript modules:

```json
"type": "module"
```

This enables syntax such as:

```js
import { greeting } from "./greeting.js";

export function example() {
  return greeting();
}
```

The corresponding ESLint setting is:

```js
sourceType: "module",
```

The distinction is:

- `"type": "module"` controls how Node.js executes `.js` files.
- `sourceType: "module"` controls how ESLint analyzes those files.
- `globals.nodeBuiltin` tells ESLint which general Node.js global names are available.

Using `globals.nodeBuiltin` instead of `globals.node` also helps detect accidental use of CommonJS-specific names such as `require`, `module`, `__dirname` and `__filename`.

## Formatting and VS Code saves

For supported JavaScript, TypeScript, JSON and Markdown files, the workspace settings configure the Prettier extension as the formatter.

An explicit save, such as `Ctrl+S`, is configured to request:

- Automatically fixable ESLint changes for supported source files.
- Prettier formatting.
- Basic EditorConfig conventions such as line endings, indentation and final newlines.

EditorConfig provides basic file conventions. Prettier remains the full syntax-aware formatter.

The TypeScript-related VS Code settings prepare the editor for formatting future `.ts` and `.tsx` files. They do not, by themselves, enable TypeScript linting.

## Line endings

The repository uses LF line endings for ordinary text files.

Windows command scripts retain CRLF:

```text
*.bat
*.cmd
```

The policy is defined in `.gitattributes` and complemented by `.editorconfig`.

## Inspecting dependencies

List direct dependencies:

```bash
npm ls --depth=0
```

List the complete transitive dependency tree:

```bash
npm ls --all
```

Explain why a package is installed:

```bash
npm explain eslint
```

## Recreating the development toolchain

This section is only needed when rebuilding the project configuration from scratch. It is not required after cloning the repository; use `npm ci` in that situation.

Install ESLint and its supporting configuration packages:

```bash
npm install -D eslint @eslint/js globals eslint-config-prettier
```

Install and exact-pin Prettier:

```bash
npm install -D -E prettier
```

Prettier is intentionally exact-pinned because formatting output can change between releases. The other dependency ranges are combined with the committed `package-lock.json`, which records the exact resolved dependency tree.

## JavaScript-only scope

This project currently uses JavaScript, not TypeScript. Therefore it intentionally does not include:

```text
tsconfig.json
typescript-eslint
```

If TypeScript is introduced later, install and configure the necessary tooling:

```bash
npm install -D typescript typescript-eslint
```

The ESLint configuration must then also be extended to analyze TypeScript files.

## Version policy

- `package-lock.json` pins exact versions of everything and is committed. `npm ci` installs exactly
  those, on every OS, and fails if the lock and `package.json` disagree.
- The allowed ranges live in `package.json`: `^` for the ESLint family, so minors and patches may
  move, and an exact pin for Prettier, because formatting output changes between releases.
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

Full cleanup, back to the state of a fresh clone:

```bash
rm -rf node_modules coverage dist && npm cache verify
```

- `node_modules` is the whole environment. `npm ci` recreates it from the lock.
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
- `npm run check`: lint, format check and tests, in that order.
- `npm start`: the application runs.
