# Menu `menu` domain

This is a 'bridge' module to connect to the menu service from webclient.

It mostly exists for compatability reasons:

- get data from redux store/query
- send request to `@library/menu-service`
- return the response

It will automatically package all the necessary data for the request.

## Usage

```ts
import { useMenu } from 'routes/Menu/domains/menu'

function SomeComponent() {
  const { getRecipesForCollectionId } = useMenu()

  return recipes.map(r => renderRecipe(r))
}
```
