# Contributing

## Table of contents

- [Contributing](#contributing)
  - [Table of contents](#table-of-contents)
  - [Setting Up the Environment](#setting-up-the-environment)
  - [Running Tests](#running-tests)
  - [Submitting a Pull Request (PR)](#submitting-a-pull-request-pr)
    - [After your pull request is merged](#after-your-pull-request-is-merged)

## Setting Up the Environment

1. Run `pnpm install` in the root of the repository to install all dependencies.
2. Run `pnpm build` to create an initial build of the `explorerkit-idls` and `explorerkit-translator`
3. You should now be able to edit the source code to your liking and run `pnpm dev` to ensure that your changes are being watched
4. After you are done with your changes, you can write test cases in the `tests` folder of the root of the package to ensure that your changes work as expected. You can run `pnpm test` in the root of the repository to run all the tests in the repository.

## Running Tests

You can run the tests of the project that you modified by going to the project's directory and running:

```bash
pnpm test
```

Alternatively, you can run it from anywhere by specifying the name of the project using the `--filter` option:

```bash
pnpm --filter @solanafm/explorerkit-idls
```

## Submitting a Pull Request (PR)

Before you submit your Pull Request (PR), do remember to generate a changeset by running `npx changeset` in the root of the repository. This will generate a changeset that will be used during release.

```bash
npx changeset
```

- Summarise the changes you have done for this PR and also include the changeset files in your commit when you are submitting your PR.
- Ensure that your PR is up to date with the latest changes from the main branch. You can do this by running `git pull --rebase upstream main` in the root of the repository.
- Ensure that your PR passes all the tests. You can do this by running `pnpm test` in the root of the repository.
- Once everything has been done, you can submit your PR to the `main` branch of the repository.

That's it! Thank you for your contribution!

### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```bash
  git push origin --delete my-fix-branch
  ```

- Check out the main branch:

  ```bash
  git checkout main -f
  ```

- Delete the local branch:

  ```bash
  git branch -D my-fix-branch
  ```

- Update your main with the latest upstream version:

  ```bash
  git pull --ff upstream main
  ```
