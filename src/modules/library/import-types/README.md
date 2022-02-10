# @library/import-types

This module exists to support importing asset files in TypeScript projects, such as css or sass files.

## Usage

In your feature-module `package.json`:

```
"devDependencies": {
  "@library/import-types": "workspace:*"
}
```

In your feature-module `tsconfig.json`:

// "files" overrides top-level excludes
"files": [
  "./node_modules/@library/import-types/index.d.ts"
]
```
