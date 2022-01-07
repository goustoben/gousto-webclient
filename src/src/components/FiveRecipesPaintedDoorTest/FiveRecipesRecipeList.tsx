import React from 'react'
import css from './FiveRecipesRecipeList.module.css'
import { RecipeHolder } from '../../routes/Menu/BoxSummary/RecipeHolder/RecipeHolder'

const RecipeNumber = ({ children }: { children: React.ReactNode }) => (
  <span className={css.number}>{children}</span>
)
const RecipePricing = ({ children }: { children: React.ReactNode }) => (
  <span className={css.perServing}>{children}</span>
)

const FirstRecipe = () => <span>Add recipe</span>

const SecondRecipe = () => (
  <>
    <RecipeNumber>2</RecipeNumber>
    <RecipePricing>for £6.25 per serving</RecipePricing>
  </>
)

const ThirdRecipe = () => (
  <>
    <RecipeNumber>3</RecipeNumber>
    <RecipePricing>for £5 per serving</RecipePricing>
  </>
)

const FourRecipe = () => (
  <>
    <RecipeNumber>4</RecipeNumber>
    <RecipePricing>for £4.37 per serving</RecipePricing>
  </>
)

const FiveRecipe = () => (
  <>
    <RecipeNumber>5</RecipeNumber>
    <RecipePricing>for £4.08 per serving</RecipePricing>
  </>
)

const recipeComponents = [FirstRecipe, SecondRecipe, ThirdRecipe, FourRecipe, FiveRecipe]

export const FiveRecipesRecipeList = ({
  filledRecipes,
  view,
  browser,
}: {
  filledRecipes: number
  view: string
  browser: string
}) => {
  const renderComponents = recipeComponents.slice(filledRecipes)
  return (
    <>
      {renderComponents.map((Component, index) => 
          <RecipeHolder key={index} view={view} browserType={browser}>
            <Component />
          </RecipeHolder>
      )}
    </>
  )
}
