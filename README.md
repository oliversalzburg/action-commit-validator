# Commit Validator Action

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

<!-- AUTO-DOC-INPUT:START - Do not remove or modify this section -->

| INPUT                                                                                                 | TYPE   | REQUIRED | DEFAULT                 | DESCRIPTION                                                                                                                          |
| ----------------------------------------------------------------------------------------------------- | ------ | -------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| <a name="input_accept_breaking_changes"></a>[accept_breaking_changes](#input_accept_breaking_changes) | string | false    | `"true"`                | Is the breaking change indicator <br>(`!`) allowed?                                                                                  |
| <a name="input_accept_emoji"></a>[accept_emoji](#input_accept_emoji)                                  | string | false    | `"true"`                | Are emoji allowed?                                                                                                                   |
| <a name="input_accepted_scopes"></a>[accepted_scopes](#input_accepted_scopes)                         | string | false    |                         | Only accept these scopes. Provide <br>as multi-line string, each type <br>on it's own line. By <br>default, all scopes are accepted. |
| <a name="input_accepted_types"></a>[accepted_types](#input_accepted_types)                            | string | false    | `"feat"`<br>`"fix"`<br> | Only accept these type prefixes. <br>Provide as multi-line string, each <br>type on it's own line.                                   |
| <a name="input_repo_token"></a>[repo_token](#input_repo_token)                                        | string | true     |                         | Needs `secrets.GITHUB_TOKEN` to talk to <br>the API.                                                                                 |
| <a name="input_require_conventional"></a>[require_conventional](#input_require_conventional)          | string | false    | `"true"`                | Require all commits to follow <br>the Conventional Commits specification                                                             |
| <a name="input_require_scope"></a>[require_scope](#input_require_scope)                               | string | false    | `"false"`               | Require all commits to specify <br>a scope.                                                                                          |

<!-- AUTO-DOC-INPUT:END -->

## Release Process

```shell
npm version patch --message "chore: Version bump %s"
```
