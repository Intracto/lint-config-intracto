#!/usr/bin/env node
const destPath = process.env.PWD
const fs = require('fs')
const chalk = require('chalk')

const copyFile = (from, to, message, resolve, reject) => {
  fs.copyFile(require.resolve(from), `${destPath}${to}`, err => {
    if (err) {
      reject()
      throw err
    }

    console.log(message)
    resolve()
  })
}

const installFile = (from, to, message) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(`${destPath}${to}`)) {
      /* eslint-disable */
      const readline = require('readline')
      /* eslint-enable */
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      rl.question(
        `${chalk.bold(to)} file already exists, do you want to override it? ${chalk.yellow('(yes/no)')} `,
        answer => {
          rl.close()
          if (['y', 'yes'].includes(answer)) {
            copyFile(from, to, `${chalk.green('✓')} ${chalk.bold(to)} overridden.`, resolve, reject)
          } else {
            resolve()
          }
        }
      )
    } else {
      copyFile(from, to, message, resolve, reject)
    }
  })
}

const installESLintFile = async (to, message) => {
  return new Promise((resolve, reject) => {
    /* eslint-disable */
    const readline = require('readline')
    /* eslint-enable */
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.question(
      `What type of codebase are you using: TypeScript or Javascript? ${chalk.yellow('(ts/js)')} `,
      answer => {
        rl.close()
        if (['TS', 'ts'].includes(answer)) {
          resolve(installFile('./../templates/.eslintrc-ts.json', to, message))
        } else if (['JS', 'js'].includes(answer)) {
          resolve(installFile('./../templates/.eslintrc-js.json', to, message))
        }

        resolve()
      }
    )
  })
}

const addScriptsToPackageJson = async message => {
  return new Promise((resolve, reject) => {
    fs.copyFile(`${destPath}/package.json`, `${destPath}/package.json.bak`, err => {
      if (err) {
        reject()
        throw err
      }

      console.log(`${chalk.green('✓')} ${chalk.bold('package.json')} backed up to ${chalk.bold('package.json.bak')}.`)
    })

    fs.readFile(`${destPath}/package.json`, 'utf8', (errRead, data) => {
      if (errRead) {
        reject()
        throw errRead
      }

      const json = JSON.parse(data)

      if (typeof json.scripts === 'undefined') {
        json.scripts = {}
      }

      json.scripts['eslint:lint'] = "eslint 'src/**/*.{js,ts}'"
      json.scripts['eslint:fix'] = "eslint --fix 'src/**/*.{js,ts}'"
      json.scripts['stylelint:lint'] = "stylelint 'src/**/*.{scss,css}'"
      json.scripts['stylelint:fix'] = "stylelint --fix 'src/**/*.{scss,css}'"
      json.scripts['prettier:lint'] = "prettier --check 'src/**/*.{js,scss,css,ts}'"
      json.scripts['prettier:fix'] = "prettier --write 'src/**/*.{js,scss,css,ts}'"

      /*if (typeof json.husky === "undefined") {
      json.husky = {};
    }

    if (typeof json.husky.hooks === "undefined") {
      json.husky.hooks = {};
    }

    json.husky.hooks["pre-commit"] = "yarn prettier:lint";*/

      fs.writeFile(`${destPath}/package.json`, JSON.stringify(json, null, 2), errWrite => {
        if (errWrite) {
          reject()
          throw errWrite
        }
        console.log(message)
        resolve()
      })
    })
  })
}

const outputCommandsToRun = () => {
  console.log(``)
  console.log(`${chalk.yellow('!')} Please run this command to finish the installation:`)
  console.log(
    `install-peerdeps --dev "@intracto/eslint-config-intracto" && install-peerdeps --dev "@intracto/stylelint-config-intracto" && yarn add --dev prettier`
  )
  console.log(``)
  console.log(`If needed, install "install-peerdeps" first:`)
  console.log(`yarn global add install-peerdeps`)
  console.log(``)
}

const install = async () => {
  // Copy all listing files
  await installFile(
    './../templates/.editorconfig',
    '/.editorconfig',
    `${chalk.green('✓')} ${chalk.bold('.editorconfig')} file created.`
  )
  await installFile('./../templates/.nvmrc', '/.nvmrc', `${chalk.green('✓')} ${chalk.bold('.nvmrc')} file created.`)
  await installFile(
    './../templates/.prettierrc.json',
    '/.prettierrc.json',
    `${chalk.green('✓')} ${chalk.bold('.prettierrc.json')} file created.`
  )
  await installFile(
    './../templates/.stylelintrc.json',
    '/.stylelintrc.json',
    `${chalk.green('✓')} ${chalk.bold('.stylelintrc.json')} file created.`
  )
  await installESLintFile('/.eslintrc.json', `${chalk.green('✓')} ${chalk.bold('.eslintrc.json')} file created.`)

  // Add linting scripts to original package.json
  await addScriptsToPackageJson(`${chalk.green('✓')} ${chalk.bold('package.json')} updated with linting scripts.`)

  // Output install commands to finish
  outputCommandsToRun()
}

const installTSConfig = async () => {
  await installFile(
    './../templates/.tsconfig.json',
    '/.tsconfig.json',
    `${chalk.green('✓')} ${chalk.bold('.tsconfig.json')} file created.`
  )
}
const installVSCodeSettings = async () => {
  const dir = `${destPath}/.vscode`
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  await installFile(
    './../templates/.vscode-settings.json',
    '/.vscode/settings.json',
    `${chalk.green('✓')} ${chalk.bold('.vscode/settings.json')} file created.`
  )
}

if (process.argv.includes('install')) {
  install()
} else if (process.argv.includes('install-tsconfig')) {
  installTSConfig()
} else if (process.argv.includes('install-vscode-settings')) {
  installVSCodeSettings()
}
