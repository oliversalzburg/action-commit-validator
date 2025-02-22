# Commit Validator Action

[![Pre-Release](https://github.com/oliversalzburg/action-commit-validator/actions/workflows/pre-release.yml/badge.svg)](https://github.com/oliversalzburg/action-commit-validator/actions/workflows/pre-release.yml)

Validate commit messages against [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) expectations.

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
          accept-breaking-changes: false
          accept-emoji: false
          accepted-scopes: |
            api
            build
            deps
            deps-dev
          accepted-types: |
            chore
            ci
            docs
            feat
            fix
            refactor
            test
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

<!-- AUTO-DOC-INPUT:START - Do not remove or modify this section -->

| INPUT                                                                                                 | TYPE   | REQUIRED | DEFAULT                 | DESCRIPTION                                                                                                                          |
| ----------------------------------------------------------------------------------------------------- | ------ | -------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| <a name="input_accept-breaking-changes"></a>[accept-breaking-changes](#input_accept-breaking-changes) | string | false    | `"true"`                | Is the breaking change indicator <br>(`!`) allowed?                                                                                  |
| <a name="input_accept-emoji"></a>[accept-emoji](#input_accept-emoji)                                  | string | false    | `"true"`                | Are emoji allowed?                                                                                                                   |
| <a name="input_accepted-scopes"></a>[accepted-scopes](#input_accepted-scopes)                         | string | false    |                         | Only accept these scopes. Provide <br>as multi-line string, each type <br>on it's own line. By <br>default, all scopes are accepted. |
| <a name="input_accepted-types"></a>[accepted-types](#input_accepted-types)                            | string | false    | `"feat"`<br>`"fix"`<br> | Only accept these type prefixes. <br>Provide as multi-line string, each <br>type on it's own line.                                   |
| <a name="input_repo-token"></a>[repo-token](#input_repo-token)                                        | string | true     |                         | Needs `secrets.GITHUB_TOKEN` to talk to <br>the API.                                                                                 |
| <a name="input_require-conventional"></a>[require-conventional](#input_require-conventional)          | string | false    | `"true"`                | Require all commits to follow <br>the Conventional Commits specification                                                             |
| <a name="input_require-scope"></a>[require-scope](#input_require-scope)                               | string | false    | `"false"`               | Require all commits to specify <br>a scope.                                                                                          |

<!-- AUTO-DOC-INPUT:END -->

## Release Process

```shell
npm version patch --message "chore: Version bump %s"
```
