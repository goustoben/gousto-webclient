# Basket

This is a hook-based API for interacting with the basket on the menu.

The basket represents an in-progress order, and so it also contains delivery information.

If you're using this, don't import from any file other than `index.js`.

**todo:** recipes, promo code, "num recipes" (?), products

## Usage

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

const onClick = () => {
    if (!canAddRecipes) {
        return
    }

    addRecipe(props.recipeId, 'grid')
}

return <button disabled={!canAddRecipes} onClick={onClick}>Add Recipe</button>
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

return <span>Order ID for basket: { orderId }</span>
```

### Menu information

```ts
const { menuId } = useBasket()

return <span>Menu ID for basket: { menuId }</span>
```

### Portion count

```ts
const { numPortions } = useBasket()

return <span>{ numPortions } portions</span>
```
