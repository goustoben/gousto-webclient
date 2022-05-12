# Contribution Guidelines

Here is a set of guidelines for contributing to the gousto-webclient repo in different ways.

---

## Deployment process

To ensure that the different teams working on webclient can get their work deployed efficiently, we have some process around deployments.

### Merging into `develop`

Make sure you have the [Merge Autoselector Chrome extension](https://github.com/Gousto/chrome-ext-merge-autoselector) installed, so that the correct merge options are used.

- Is there a production deploy PR open already?
  - **No:**

    Merge to `develop`. A Github action will open a production deployment (see _"Managing a Production Deployment"_ below)

  - **Yes:**

    You **must** ask the owner of the production deploy if you can merge.

    A production deploy should ideally contain **one item**, and must contain no more than **5 items**.

    If the above are OK, merge into `develop` and Github will add a new line to the production deployment.

### Managing a Production Deployment

When changes are added to develop, a Github action will open a PR from `develop -> master` with the title "Production Deploy".

Inside this PR will be a checklist for each merge / commit added to the deployment, and its owner. You should tick your
checkbox as soon as you are comfortable releasing you change.

The last person to commit will be flagged as the deployment's "owner". It's their job to get the changes into production.

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
