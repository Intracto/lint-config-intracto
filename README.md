# lint-config-intracto

## Introduction

This repository contains sample linting configs for .scss, .js and .ts files. Currently they are all based on recommended configs.

## How to use

### Installing (automatic)

To install this repo, run:

```bash
yarn add https://github.com/ioulian/lint-config
```

When the dependency has been installed, run:

```bash
yarn lint-config install
```

This will install all linting configs for you and update `package.json` with scripts. You can lint and fix your code with them.

## TODO

- Document how to add .tsconfig.json if TS is used
- Make base config and make specific configs for vue.js, react.js...
- Add possibility to extend existing eslint.json
- Check what rules we need to update
- Update `.editorconfig` for `.php` files and more
- Add precommit hooks to fix/lint files.
- publish to npm
- give ownership to Intracto
