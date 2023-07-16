# Installation

```shell
mkdir pay_calculator
cd pay_calculator
npm create react-app . --template typescript
```

# Development

```shell
npm start
```

# APP URL

[Paycalculator AU](https://pay-calculator-au.netlify.app/)

# Update packages

```shell
npm outdated
# npm update will not update the major versions, only minor and patch (major.minor.patch)
npm update
```

```
@testing-library/react        13.4.0  13.4.0  14.0.0
```

To update the above package use the following command:

```shell
npm install @testing-library/react@14.0.0
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
