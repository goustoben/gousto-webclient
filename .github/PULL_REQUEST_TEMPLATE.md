# Description
<!--- Update the JIRA ticket below -->
This PR relates to the following [JIRA ticket](http://gousto.atlassian.net/browse/TECH-XXXX)
<!-- What has changed? -->
<!-- Why has it changed? -->
<!-- How has it changed? -->

# Merge Checklist - Must be complete

**Is there an [open Production Deploy](https://github.com/Gousto/gousto-webclient/pulls?q=is%3Apr+is%3Aopen+head%3Adevelop+base%3Amaster)? If so, you must check with the owner before merging!**

- [ ] I have installed the [Merge Autoselector extension](https://github.com/Gousto/chrome-ext-merge-autoselector)
- [ ] and will make sure that **"Squash and merge"** is selected if the target branch is `develop`
- [ ] [The most recent `develop` commit](https://github.com/Gousto/gousto-webclient/commits/develop) is in a **passing state**
- [ ] [The E2E tests](https://app.circleci.com/insights/github/Gousto/gousto-webclient/workflows/e2e) are in a **passing state** -> `develop` :hammer_and_pick: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/develop.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/develop)
- [ ] I have completed cross browser testing **/ or /** I have taken a decision that this work is not vulnerable to cross-browser issues

# Deploying

You shouldn't deploy changes to `develop` that you're not ready to deploy into production (`master`) in the same day

- Leaving code in `develop` means that any further code can't be (easily) deployed without either coordinating with the author, or taking responsibility for deploying their code
- If there is a production incident while there is unmerged code in `develop`, the resolution of the incident can be delayed
- We work flexibly as a company with set core hours. Just because you are finishing work when you leave the PR open, someone else may still be working and need to deploy

# How has this been tested?
<!-- Delete check list testing items that is not relevant to you code changes -->
- [ ] This pull request has added/updated jest specs to cover the changes
- [ ] This pull request has added/updated regression (Cypress) specs to cover the changes
- [ ] This pull request has been manually tested against a lower environment
- [ ] This pull request has added/updated the E2E specs to cover the changes
    - [ ] And tested the change against the [`e2e-manual`](https://github.com/Gousto/gousto-webclient/tree/e2e-manual) branch

# Experiments
<!-- Delete experiment block if this pull request DOES NOT have experiment changes  -->
- [ ] These code changes are part of an experiment
<!-- Details of whether code changes are part of an experiment -->
<!-- Listing any compromises/dispensations made as part of an experiment should streamline code review -->
<!-- by making reviewers aware of what is/isn't productionised code -->

<!-- Providing additional information such as epic link, experiment duration etc. is also benefitial -->
