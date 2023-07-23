[![Netlify Status](https://api.netlify.com/api/v1/badges/e562c8cf-ce0e-4c81-9c5a-386168deeeea/deploy-status)](https://app.netlify.com/sites/pay-calculator-au/deploys)

# Dev Env

```shell
node -v
# v18.16.1 (LTS)

yarn -v
# 3.6.1

npm -v
# 9.5.1
```

# Installation

```shell
mkdir pay_calculator
cd pay_calculator
yarn create vite
```

# Development

```shell
yarn dev
```

# APP URL

[Paycalculator AU](https://pay-calculator-au.netlify.app/)

# Update packages

```shell
yarn outdated
# yarn update will not update the major versions, only minor and patch (major.minor.patch)
yarn update
```

```
@testing-library/react        13.4.0  13.4.0  14.0.0
```

To update the above package use the following command:

```shell
yarn add @testing-library/react@14.0.0
```

# Dependabot

[Configuration options for the dependabot.yml file](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file)

# Git commands

## Push the local changes

```shell
git add .
git commit -m "commit message"
git push
```

## If there are changes in the remote branch, pull first

```shell
git pull
git add .
git commit -m "commit message"
git push
```

## Merge conflict

Fix the merge conflict and push the changes

# Migration

Migrate from [CRA](https://create-react-app.dev/) to [Vite](https://vitejs.dev/)

```shell
yarn create vite
```

Had to add the `.yarnrc.yml`

```yml
nodeLinker: "node-modules"
```

```shell
yarn
yarn run dev
```

Also, update the package.json

```json
	"packageManager": "yarn@3.6.1",
```
