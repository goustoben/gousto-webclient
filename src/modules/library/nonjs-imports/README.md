# @library/nonjs-imports

This module exists to support importing asset files in TypeScript projects, such as CSS or PNG files.

For example,

```tsx
import css from './test.scss'
import image from './img.png'
```

Normally TypeScript won't know what to do with these files, but with this module, you can declare stub types for
non-js assets.

## Usage

In your feature-module `package.json`:

```
"devDependencies": {
  "@library/nonjs-imports": "workspace:*"
}
```

In your feature-module `tsconfig.json`:

```json5
// "files" overrides top-level excludes
"files": [
  "./node_modules/@library/nonjs-imports/index.d.ts"
]
```
