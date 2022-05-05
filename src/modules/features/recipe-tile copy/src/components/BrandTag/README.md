# BrandTag

Component that renders out the brand tag e.g 'NEW'.

todos: css, storybook, citrus

### how to use

BrandTag component does not take in any arguments. 

It gets recipe from recipeContext, so it has to be within recipeContext provider.

It also sources data from useBrandInfo (currently a stub).

### brand tag

You can 
- render out the brand tag based on the recipe in recipeContext. 
- basically, the brand tag has several properties that can be rendered such as text and colour.


### how it works 

- BrandTag component calls the function `useRecipeBrandTag`. This is exported from the file `useRecipeBrandTag`.
- `useRecipeBrandTag` calls the function  `useRecipeBrandTagline` which returns you the tagline of the recipe in recipeContext or null if there is no recipe. 
- `useRecipeBrandTag` passes the tagline to the function `usetag`.
- `usetag` calls the function `findTag` which takes in 2 arguments - (1) data from useBrandInfo, and (2) the tagline. `findTag` searches for the tag with the same tagline, and returns that tag. 
- the returned tag will have the properties of 'text' and 'colour' that we will render.


