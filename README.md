# Slugify Github action

This action slugifies the commit ref (branch or tag name) similar to what Gitlab uses. It also sets a shortened commit SHA.

`Slugify` will get the branch name for `push` and `pull_request` events and then process it as follows:

* Lowercased
* Anything not matching [a-z0-9-] is replaced with a -
* Maximum length is 63 bytes
* First/Last Character is not a hyphen

## Usage

Define a workflow in `.github/workflows/continuous-integration.yml` (or add a job if you already have defined workflows).

:bulb: Read more about [Configuring a workflow](https://help.github.com/en/articles/configuring-a-workflow).

```yaml
on:
  pull_request:
  push:
    branches:
      - master
    tags:
      - "**"

name: "Continuous Integration"

jobs:
  github-action-template:
    name: github-action-template

    runs-on: ubuntu-latest

    steps:
      - name: "Checkout"
        uses: actions/checkout@master

      - name: "Run action"
        uses: docker://ergebnis/github-action-template:latest
```

## Contributing

Please have a look at [`CONTRIBUTING.md`](.github/CONTRIBUTING.md).

## Code of Conduct

Please have a look at [`CODE_OF_CONDUCT.md`](.github/CODE_OF_CONDUCT.md).

## License

This package is licensed using the MIT