# lint-config-intracto

## Introduction

This repository contains sample linting configs for .scss, .js and .ts files for use in Intracto Projects.
These configs for ESLint and StyleLint are used:

- [eslint-config-intracto](https://www.npmjs.com/package/@intracto/eslint-config-intracto)
- [stylelint-config-intracto](https://www.npmjs.com/package/@intracto/stylelint-config-intracto)

## How to use

### Installing

To install this repo, run:

```bash
yarn add "@intracto/lint-config-intracto" --dev --exact
```

When the dependency has been installed, run:

```bash
yarn lint-config install
```

**Note:** Make sure you'll follow the steps during the installation, at some point you'll need to choose the between JS or TS codebase.

At the end of the installation, you'll need to run some commands to finish the installation, do not forget to run them (they will be prompted).

This will install all linting configs for you and update `package.json` with scripts. You can lint and fix your code with them.

### Installing Lint-Staged

To make sure every commited file is following code standards, you can install [lint-staged](https://github.com/okonet/lint-staged). Follow the installation instructions there and update the `package.json` file with this configuration:

```json
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,ts}": [
      "yarn eslint:fix",
      "git add"
    ],
    "src/**/*.{css,scss}": [
      "stylelint:fix",
      "git add"
    ]
  }
```

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
  "editor.formatOnSave": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

or you can also run this command that will create `.vscode/settings.json` file (You should commit this file, this way everybody on the team will use the same settings):

```bash
yarn lint-config install-vscode-settings
```

## PHPStorm config

For PHPStorm you don't need to install extensions for ESLint and StyleLint, however you'll need to activate them:

- Preferences > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint: **Automatic ESLint configuration**
- Preferences > Languages & Frameworks > Style Sheets > Stylelint: **Enable**

You'll need to install Prettier Plugin and activate it.

Now you'll see any code style errors

## TODO

- Make base config and make specific configs for vue.js, react.js...
- Check what rules we need to update
- Update `.editorconfig` for `.php` files and more
