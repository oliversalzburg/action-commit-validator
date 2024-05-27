# Commit Validator Action

Validate commit messages against semantic commit expectations.

## Usage

Call the action from a workflow.

```yml
name: Pull Request

on:
  pull_request:

jobs:
  qa:
    runs-on: ubuntu-22.04
    permissions:
      contents: read

    steps:
      - uses: actions/checkout@v4
      - uses: oliversalzburg/action-commit-validator@v0.0.4
        with:
          accept_breaking_changes: false
          accept_emoji: false
          accepted_scopes: |
            api
            build
            deps
            deps-dev
          accepted_types: |
            chore
            ci
            docs
            feat
            fix
            refactor
            test
          repo_token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

## Release Process

```shell
npm version patch
```
