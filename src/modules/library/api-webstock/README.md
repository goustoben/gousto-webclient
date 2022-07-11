# @library/api-webstock

This is a wrapper around the webstock API in core

It's owned by @squad-radishes

## Installing

Add the following peer dependency ([why?](../../../../docs/modules.md#production-dependencies)) then call `yarn`.

```
"peerDependencies": {
  "@library/api-webstock": "workspace:*"
}
```

## Usage

```ts
import { useStock } from '@library/api-webstock'

function MyComponent() {
  // read below for explanation
  const useStockHTTPDeps = {
    coreUrl: 'base-core-url/',
    getFetcher,
    deliveryDayId: '1234',
  }

  const { isRecipeInStock } = useStock(useStockHTTPDeps, { minimumThreshold: 3 })

  return <span>Recipe is {isRecipeInStock(recipeId, numPortions) ? 'in' : 'out of'} stock</span>
}
```

### Dependencies

There are a few dependencies which need to be passed in here:

- `coreUrl`: The root url of the core API
- `getFetcher`: A `fetch` function for use with SWR. See `routes/Menu/apis/fetch`
- `deliveryDayId`: The delivery day to query

### Configuration

You can use the following configuration options:

- `minimumThreshold`: The minimum quantity a recipe must exceed, to be considered in stock
