# Contributing to Gousto 2 Front End

## <a name="issue"></a> Found an Issue?
If you find a bug in the source code or a mistake in the documentation, you can help us by
submitting an issue by following our [Website Issue Management] guide. Even better you can [submit a Pull Request](#pr)
with a fix.

## <a name="feature"></a> Want a Feature?
You can request a new feature by submitting an issue to our [Trello Backlog][trello-backlog2].  If you
would like to implement a new feature then consider what kind of change it is:

* **Major Changes** that you wish to contribute to the project should be discussed first with [Tim Haines][tim-haines] so that we can better coordinate our efforts, prevent
duplication of work, and help you to craft the change so that it is successfully accepted into the
project.
* **Small Changes** can be crafted and submitted to the [GitHub Repository][github] as a Pull Request.

## <a name="submit"></a> Submission Guidelines

### Submitting an Issue
Before you submit your issue search the archive, maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue following the [Website Issue Management] guide.
Help us to maximize the effort we can spend fixing issues and adding new
features, by not reporting duplicate issues.  Providing the following information will increase the
chances of your issue being dealt with quickly:

* **Overview of the Issue** - if an error is being thrown a non-minified stack trace helps
* **Motivation for or Use Case** - explain why this is a bug for you
* **Browsers and Operating System** - is this a problem with all browsers or only IE8?
* **Reproduce the Error** - provide a live example (using or
  [JSFiddle][jsfiddle]) or a unambiguous set of steps.
* **Related Issues** - has a similar issue been reported before?
* **Suggest a Fix** - if you can't fix the bug yourself, perhaps you can point to what might be
  causing the problem (line of code or commit)

### <a name="pr"></a>Submitting a Pull Request
Before you submit your pull request consider the following guidelines:

* Search [GitHub](https://github.com/Gousto/gousto-webclient/pulls) for an open or closed Pull Request
  that relates to your submission. You don't want to duplicate effort.
* Fork the main repository (my-forked-repo)
* Make your changes in a new git branch:

     ```shell
     git checkout -b my-fix-branch master
     ```

* Create your patch
* Follow our [Coding Rules](#rules).
* Commit your changes using a descriptive commit message that follows our
  [commit message conventions](#commit-message-format) and passes our the git `pre-commit` hook.

     ```shell
     git commit -a
     ```
  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

* Push your branch to GitHub:

    ```shell
    git push my-forked-repo my-fix-branch
    ```

* In GitHub, send a pull request to `gousto-webclient:master`
* Your PR should contain a high level description of the changes the PR makes
* Ensure you label your PR appropriately from the available labels:
  * WIP
    * This is work in progress. This should **not be merged**
  * don't merge
    * **Don't merge** (for whatever reason)
  * question
    * PR requires some technical input from another developer. **Do not merge** until relevant question has been answered
  * requires core
    * PR is dependent on [gousto2-core](Gousto Core). This PR should **not be merged**
  * staging
    * PR will be deployed to staging. Once staged, the PR will be left open, and either merged to master or closed and actioned appropriately
  * stakeholder
    * PR contains work that was either poorly defined, or requires some further input from the business. ** Do not merge ** until [Tim Haines][tim-haines] has followed up with the relevant stakeholders and removed the label and provided input.
  * [developer-name]
    * PR requires action (probably review) by the labelled developer.
* Your PR will then be reviewed by one or more of the team
* If we suggest changes then:
  * Make the required updates.
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push my-forked-repo my-fix-branch -f
    ```

## <a name="rules"></a> Coding Rules
To ensure consistency throughout the source code, keep these rules in mind as you are working:

Where possible, we follow the rules contained in

* [Google's HTML & CSS Style Guide][css-style-guide]
* [Google's JavaScript Style Guide][js-style-guide]

## <a name="commit"></a> Git Commit Guidelines

Git commit messages should be formatted so that they are easy to follow when looking through the **project history**.

### <a name="commit-message-format"></a>Commit Message Format
Each commit message consists of a **message**.

Any line of the commit **message** cannot be longer 80 characters! This allows the message to be easier
to read on github as well as in various git tools.

The **message** contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

[jsfiddle]: http://jsfiddle.net
[github]: https://github.com/Gousto/gousto-webclient
[gousto2-core]: https://github.com/Gousto/Gousto2-Core
[js-style-guide]: http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
[css-style-guide]: https://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml
[Website Issue Management]: https://docs.google.com/a/gousto.co.uk/document/d/1vKFEwDLUJ91Ye8sAuIVpsxZG8H3669KsTUyV147ZoiY/edit?usp=sharing
[trello-backlog2]: https://trello.com/b/HcYdGfGO/backlog-2
[tim-haines]: mailto:tim@gousto.co.uk
