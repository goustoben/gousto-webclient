# @features/homepage experiment

This is the new **homepage** feature module. It's owned by **@squad-kales**.

## Usage

Adding the dependency:
```json
"dependencies": {
  ...
  "@features/homepage": "workspace:*"
}
```

Importing into JSX:
```tsx
import { RecipeTile } from '@features/homepage'

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
