# lint-config-intracto

## Introduction

This repository contains sample linting configs for .scss, .js and .ts files for use in Intracto Projects.
These configs for ESLint and StyleLint are used:

- [eslint-config-intracto](https://www.npmjs.com/package/@yulian.alexeyev/eslint-config-intracto)
- [stylelint-config-intracto](https://www.npmjs.com/package/@yulian.alexeyev/stylelint-config-intracto)

## How to use

### Installing

To install this repo, run:

```bash
yarn add "@yulian.alexeyev/lint-config-intracto" --dev --exact
```

When the dependency has been installed, run:

```bash
yarn lint-config install
```

At the end of the installation, you'll need to run some commands to finish the installation, do not forget to run them (they will be prompted).

This will install all linting configs for you and update `package.json` with scripts. You can lint and fix your code with them.

### Installing TSConfig

If you are using TypeScript, you'll need `.tsconfig.json`. You can easily install it with this command:

```bash
yarn lint-config install-tsconfig
```

## VSCode config

VSCode can automatically lint and fix your files. You'll need those extensions:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [StyleLint](https://github.com/thibaudcolas/vscode-stylelint)

And use these settings in VSCode:

```json
{
  "eslint.autoFixOnSave": false,
  "editor.formatOnSave": true
}
```

or you can also run this command that will create `.vscode/settings.json` file (You should commit this file, this way everybody on the team will use the same settings):

```bash
yarn lint-config install-vscode-settings
```

## TODO

- Make base config and make specific configs for vue.js, react.js...
- Check what rules we need to update
- Update `.editorconfig` for `.php` files and more
- Add precommit hooks to fix/lint files.
- give ownership to Intracto
