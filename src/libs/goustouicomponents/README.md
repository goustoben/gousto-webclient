# Zest - Gousto's reusable pattern library
[https://gousto.github.io/ui-components/](https://gousto.github.io/ui-components/)

This is a pattern library built so different projects that have customer facing UIs can share with each other.

## Use Zest
Zest is being shared as source React components and not as compiled modules. There are two main ways to get Zest imported into your project.

### `npm`
Requires at least Babel 7 for Server Side Rendering to work. In your `package.json`, add this:
```
ui-components: git@github.com:Gousto/ui-componentts.git#VERSION
```

### `bower`
In your `bower.json` file, add this:
```
{
  "name": "goustouicomponents",
  "dependencies": {
    "goustouicomponents": "git+ssh://git@github.com/Gousto/ui-components.git#VERSION"
  }
}
```

## Local development

### Install

```
npm install
```

### Running Storybook
Zest is using [Storybook](https://storybook.js.org/) to document components and no new components should be released without writing documentatin for them.

In order to run Storybook, you can run:
```
npm run storybook
```

We are using the [`MDX`](https://storybook.js.org/docs/formats/mdx-syntax/) syntax for the stories written with Storybook.

### Running tests
Zest is using Jest for tests:

```
npm run test:jest
```

### Testing your changes in a project

On opening a pull request, a canary tag `<BRANCH-NAME>-canary` is created.

You may use this tag in your project to test your new/updated components as per below:

If components are installed with bower 👉
```
// bower.json

{
  "name": "goustouicomponents",
  "dependencies": {
    "goustouicomponents": "git+ssh://git@github.com/Gousto/ui-components.git#<BRANCH-NAME>-canary"
  }
}
```

If components are installed with npm 👉
```
// package.json

"dependencies": {
  "goustouicomponents": "git+ssh://git@github.com/Gousto/ui-components.git#<BRANCH-NAME>-canary",
}
```

> Canary tags are removed on deletion of your branch

_N.B. On push to your branch the canary tag is updated_

### Running linters

#### ESLint
```
npm run eslint
```

#### Stylelint
```
npm run stylelint
```


## Releases

1. Open a PR against `master`
1. After a PR is merged, it will automatically trigger:
  - a new release by creating a tag with the version from `package.json`
  - a deploy of the latest version of documentation to GitHub pages

## Useful links
- [Zest online](https://gousto.github.io/ui-components/)
- [Storybook](https://storybook.js.org)
- [MDX syntax](https://storybook.js.org/docs/formats/mdx-syntax/)
- [Storybook Knobs plugin](https://github.com/storybookjs/storybook/tree/master/addons/knobs)
- [Atomic design](https://bradfrost.com/blog/post/atomic-web-design/)
