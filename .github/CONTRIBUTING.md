## Contributing

### Create an Issue

If you find a bug, have a suggestion, or a feature request submit an issue.

* Check existing issues before creating one.
* Provide as much information as possible, including a minimal, reproducible example of the issue you're encountering (if possible).

### Submit a Pull Request

Before you submit your pull request please read and consider the following guidelines:

* Please open an issue that describes the enhancement/bug fix before creating the PR. Doing so allows for discussion around the code change proposal.
* Search our repo for an open or closed pull request that relates to your issue.
* Fork the repository and submit a pull request back to the `master` branch.
* If your pull request fixes an issue, make sure to [reference the issue so it is closed with the pull request](https://github.com/gitbucket/gitbucket/wiki/How-to-Close-Reference-issues-&-pull-request). (eg. 'fixes #8')

## Code Styling

All code is linted for consistency.

* To check for style lint run `npm run lint`. To fix linting errors, run `npm run lint:fix`

## Releasing

Releases are automated via GitHub Actions. When a version tag is pushed, the workflow runs lint, tests, and build, then publishes to npm.

### Steps

1. Bump the version in `package.json`
2. Commit the version bump
3. Create a git tag matching the version (prefixed with `v`)
4. Push the commit and tag

### Stable release

```bash
# Update version in package.json to 0.31.0
git add package.json
git commit -m "Bump version to 0.31.0"
git tag v0.31.0
git push origin main --tags
```

### Prerelease (beta, alpha, rc)

Prerelease tags publish under their respective npm dist-tag (e.g., `beta`) so they don't become the default install.

```bash
# Update version in package.json to 0.31.0-beta.1
git add package.json
git commit -m "Bump version to 0.31.0-beta.1"
git tag v0.31.0-beta.1
git push origin main --tags
```

**Note:** The tag version must match the version in `package.json` or the workflow will fail.
