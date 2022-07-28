# Menu `stock` domain

This folder contains the stock domain for Menu. It allows the querying of stock for an individual recipe.

## Usage

```ts
import { useStock } from 'routes/Menu/domains/stock'
```

### `isRecipeOutOfStock`

```ts
const { isRecipeOutOfStock } = useStock()

isRecipeOutOfStock('1234') // true | false
```

## Future improvement

- Convert to use `@library/api-webstock`
