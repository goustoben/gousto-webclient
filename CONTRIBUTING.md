# Contribution Guidelines

Here is a set of guidelines for contributing to the gousto-webclient repo in different ways.

---

## Deployment process

To ensure that the different teams working on webclient can get their work deployed efficiently, we have some process around deployments.

### Merging into `develop`

Make sure you have the [Merge Autoselector Chrome extension](https://github.com/Gousto/chrome-ext-merge-autoselector) installed, so that the correct merge options are used.

- Is there a production deploy PR open already?
  - **No:**

    Merge to `develop` and open a production deployment (see _"Opening a Production Deployment"_ below)
  - **Yes:**

    You **must** ask the owner of the production deploy if you can merge.

    A production deploy must contain at most **5 items**. You cannot merge into `develop` if the open production deploy already has 5 items.

    If you can, merge to `develop` and update the production deploy (see _"Updating a Production Deployment"_ below)

### Opening a Production Deployment

If you merge into `develop` and there isn't currently a production deploy PR, you must open one. You will then be the owner of that production deployment, see _"Merging a Production Deployment"_ below.

1. Create a pull request to merge `develop` into `master`
2. Call this pull request `Production deploy`
3. Put the following contents into the body (to merge PR #123 "My cool feature"):

    ```
    - [ ] My cool feature (#123) - @githubusername
    ```
4. The checkbox is to be ticked when you are happy for the feature to be merged. This should be after a quick test on staging.

### Updating a Production Deployment

To add a new item to a production deploy, open the PR on GitHub and update the description with a new line entry for your PR.

For example, if you have just added PR #456, "Another cool feature", you would add the following line entry:

```
- [ ] Another cool feature (#456) - @yourgithubusername
```

You are now the owner of this production deploy, and responsible for merging it to `master`. See _"Merging a Production Deployment"_ below.

### Merging a Production Deployment

Make sure you have the [Merge Autoselector Chrome extension](https://github.com/Gousto/chrome-ext-merge-autoselector) installed, so that the correct merge options are used.

You may merge a production deployment to `master` when:

- All checkboxes in the PR description have been ticked
- The end to end tests on the most recent `develop` build has passed.

---

## Failing builds on `develop`

If the `develop` build is failing, especially on end-to-end tests, it makes it difficult for us to ensure code quality and so it's a blocker for us deploying more work. Therefore, to ensure that the failures get resolved promptly, there is some process around it.

**There should be NO merges into `develop` if the most recent commit to `develop` has a failing build.**

- If a `develop` build fails, the author of that commit must immediately re-run the build on CircleCI.
- If the build fails again, there must be a **P2 Internal Production Incident** raised
- The author of the failing commit is the **Incident Resolver** and must take responsibility to find an **Incident Owner**. (Ideally someone in their squad, but could be from the wider Webclient team)
- The **Incident Owner** should then announce the incident on #guild-frontend slack channel, and follow the Gousto Production Incident Process.
- Fixing the E2E test becomes their top priority, and any help needed from others is also a priority.

## Seeing file ownership

There is a script which does some reporting of the repo based on the `CODEOWNERS` file. You can use this script from inside the `src` directory, with the following commands:

### npm run codeowners:report

Lists the number of files owned by each owner

```
Files by owner:
 - @Gousto/guild-frontend: 1627 files
 - @Gousto/squad-radishes: 537 files
 - @Gousto/squad-rockets: 617 files
 - @Gousto/squad-haricots: 199 files
```

### npm run codeowners:unowned

Lists the number of unowned files in the repository (i.e. owned by `@Gousto/guild-frontend`)

```
...
 - tests\regression\runtests.sh
 - tests\regression\runtestsmobile.sh
 - tests\regression\support\commands\index.js
 - tests\regression\support\index.js
 - tests\regression\support\overwrites\index.js

1627 unowned files
```