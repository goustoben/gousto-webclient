# Menu page

This route is the `/menu` page on Webclient. It allows the users (both logged-in users, and prospects) to browse the recipes on the currently available menus, and place an order.

Ownership is currently split between Kales, Radishes, and Beetroots.

The **Kales** own:

-
-

The **Radishes** own:

-
-

The **Beetroots** own:

-
-

## Dependencies

The Menu domain depends on `@features/recipe-tile` and `@library/menu-service`.

## Structure

The entry point for this page is the `./route` file which is rendered by the webclient core routes.

The page is then composed of a `MenuContainer` with a `MenuRecipesPageWrapper` inside.

The `MenuContainer` (the overall high-level menu page) renders:

- a `Helmet` to allow us to modify the `<head>` (and change the `title` etc)
- `BoxSummaryContainer`, the box summary at the bottom right
- `RecipesInBasketProgress`, the floating chip at the bottom left

The `MenuRecipesPageWrapper` (the 'recipes' view, a wrapper around the `MenuRecipesPage`) renders:

- `CollectionsNav`, which allows the user to change collection
- `RecipeGrid`, which shows the list of `RecipeTile`

_(previously there were other pages within 'menu', these were `/menu/food-brand` and `/menu-thematic`, hence the split between `Menu` and `MenuRecipesPage`)_

### Domains

There a number of 'domains' inside menu, these are reflected in `./domains/`

You can read more about them in their respective READMEs:

- [auth](./domains/auth/)
- [basket](./domains/basket/)
- [brand](./domains/brand/)
- [collections](./domains/collections/)
- [menu](./domains/menu/)
- [orders](./domains/orders/)
- [pricing](./domains/pricing/)
- [stock](./domains/stock/)

If a domain is big enough, it might justify being a feature module. Examples of our recent feature modules:

- [`@features/recipe-tile`](/Users/james.monger/Development/gousto-webclient/src/modules/features/recipe-tile)
- [`@library/api-webstock`](/Users/james.monger/Development/gousto-webclient/src/modules/library/api-webstock)
- [`@library/menu-service`](/Users/james.monger/Development/gousto-webclient/src/modules/library/menu-service)

## Future improvements

Looking for a tech objective? Need a tech10% idea? Here is a list of future improvements that can be made to this area.

- Merge `RecipeGrid`, `RecipeListWrapper` and `RecipeList` into one component. The split is mostly there as a legacy hangover
- Refactor `Menu`/`MenuWrapper`/`MenuContainer` into a single function component
- Refactor `CollectionsNav` to be a function component

Some less specific ones which need doing throughout our codebase. You can generally do one or two of these quite easily if you have a spare hour.

- Converting `class` components to `function` components
- TypeScript-ifying files
- Resolving eslint warnings
