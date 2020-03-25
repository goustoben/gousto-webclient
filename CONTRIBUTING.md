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

You are now the owner of this production deploy, and responsible for merging it to develop. See _"Merging a Production Deployment"_ below.

### Merging a Production Deployment

Make sure you have the [Merge Autoselector Chrome extension](https://github.com/Gousto/chrome-ext-merge-autoselector) installed, so that the correct merge options are used.

You may merge a production deployment to `master` when:

- All checkboxes in the PR description have been ticked
- The end to end tests on the most recent `develop` build has passed.

---
