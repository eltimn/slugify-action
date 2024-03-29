# Slugify Github Action

This action slugifies the commit ref (branch or tag name) similar to what Gitlab uses. It also sets a shortened commit SHA.

`Slugify` will get the branch name for `push` and `pull_request` events and then process it as follows:

* Lowercased
* Anything not matching [a-z0-9-] is replaced with a -
* Maximum length is 63 bytes
* First/Last Character is not a hyphen

## inputs

`sha_length`:
  - description: 'The length to shorten the commit SHA to'
  - required: false
  - default: '7'

## outputs:
  `branch`:
  - description: 'The slugified branch'

  `sha`:
  - description: 'The <sha_length> character SHA of the commit'

## Usage

Define a workflow in `.github/workflows/continuous-integration.yml` (or add a job if you already have defined workflows).

:bulb: Read more about [Configuring a workflow](https://help.github.com/en/articles/configuring-a-workflow).

```yaml
on:
  pull_request:
  push:
    branches:
      - main
    tags:
      - "**"

name: "Continuous Integration"

jobs:
  github-action-template:
    name: github-action-template

    runs-on: ubuntu-latest

    steps:
      - name: "Checkout"
        uses: actions/checkout@v3

      - name: "Run slugify"
        id: slugify
        uses: eltimn/slugify-action@v2

      - name: "Echo slugify outputs"
        run: |
          echo ${{steps.slugify.outputs.branch}}-${{steps.slugify.outputs.sha}}
```

## License

This package is licensed using the MIT

## Publishing

Run `npm run package` to create a distribution artifact.
