# @features/recipe-tile

This is the new **recipe-tile** feature module. It's owned by **@squad-kales**.

## Usage

Adding the dependency:
```json
"dependencies": {
  ...
  "@features/recipe-tile": "workspace:*"
}
```

Importing into JSX:
```tsx
import { RecipeTile } from '@features/recipe-tile'

function Component() {
  return (
    <RecipeTile />
  )
}
```

Setting props:
```typescript
export type Props = {
  bool: boolean
}
```
