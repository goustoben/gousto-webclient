# Menu `basket` domain

This is a hook-based API for interacting with the basket on the menu.

The basket represents an in-progress order, and so it also contains delivery information.

**todo:** recipes, promo code, "num recipes" (?), products

## Usage

**⚠️ usage info ⚠️:** if you are using this, don't import from any other route besides the one below. Do not import from `/internal/`!

```ts
import { useBasket } from 'routes/Menu/domains/basket'
```

### Recipes in basket

You can

- access the current recipes in basket with `recipes: BasketRecipe[]` **(not yet implemented)**
- use `canAddRecipes: boolean` to check if the basket is ready for the user to add recipes to
- add a recipe to the basket with `addRecipe(recipeId: string, view?: string): void`
- remove a recipe from the basket with `removeRecipe(recipeId: string, view?: string, position?: number | null): void`

```ts
const { canAddRecipes, addRecipe } = useBasket()

const onClick = React.useCallback(() => {
  if (!canAddRecipes) {
    return
  }

  addRecipe(recipeId, 'grid')
}, [ canAddRecipes, addRecipe, recipeId ])

return (
  <button disabled={!canAddRecipes} onClick={onClick}>
    Add Recipe
  </button>
)
```

### Delivery details

#### Postcode

- `postcode: string`
- `changePostcode(postcode: string): void`

#### Delivery date

- `deliveryDate: string`
- `changeDeliveryDate(date: string): void`

#### Delivery slot

- `slotId: string`
- `changeSlotById(slotId: string): void`

#### Delivery address

- `deliveryAddressId: string | null`
- `changeDeliveryAddress(address: DeliveryAddress): void`

### Order information

If the basket is part of an existing order, this will be present. Otherwise this will be an empty string.

```ts
const { orderId } = useBasket()

return <span>Order ID for basket: {orderId}</span>
```

### Menu information

```ts
const { menuId } = useBasket()

return <span>Menu ID for basket: {menuId}</span>
```

### Portion count

```ts
const { setNumPortions, numPortions } = useBasket()

const change = React.useCallback(
  () => setNumPortions(2),
  [ setNumPortions ],
)

return <span>{numPortions} portions</span>
```

## Future Improvements

- Convert the rest of Webclient to use this
- Port over any currently unported functionality
- Move internal state to a React Context rather than having it in Redux store
