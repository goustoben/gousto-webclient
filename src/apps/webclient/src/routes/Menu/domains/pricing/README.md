# Pricing domain

This is a hook-based API for interacting with pricing

If you're using this, don't import from any file other than `index.ts`.

## Usage

```ts
import { usePricing } from 'routes/Menu/domains/pricing'
```

You can also use the `Pricing` type.

```ts
import { Pricing } from 'routes/Menu/domains/pricing'
```

### Getting current Pricing and Pending state

This will query the V2 API and cache the result using SWR, therefore it can be called as many time as needed without triggering unnecessary re-fetches.

`pricing` is an object containing all pricing informations calculated based on the current items in the basket and discounts. Can also be undefined on null so you should always check for it's validity before reading data from it.

`isPending` is a boolean that will return the loading state of the fetch call.

`isValid` is a boolean that is true when there's sufficient data to query the `/pricing` endpoint and therefore receive real data.

Usage example:

```ts
const { pricing, isPending } = usePricing()

if (isPending) {
  return <div> Loading... </div>
}

return <h2> ({pricing?.recipeTotal}) </h2>
```
