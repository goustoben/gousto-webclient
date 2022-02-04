import React from 'react'
import { useSelector } from 'react-redux'
import { ImmutableMap } from 'routes/Menu/types/immutableMap'
import css from './FiveRecipesRecipeList.module.css'
import { RecipeHolder } from '../../routes/Menu/components/BoxSummary/RecipeHolder/RecipeHolder'

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  calcPrice: (price: number) => string
}

const RecipeNumber = ({ children }: { children: React.ReactNode }) => (
  <span className={css.number}>{children}</span>
)
const RecipePricing = ({ children }: { children: React.ReactNode }) => (
  <span className={css.perServing}>{children}</span>
)

const FirstRecipe = () => <RecipePricing>Add recipe</RecipePricing>

const SecondRecipe = ({ calcPrice }: Props) => (
  <>
    <RecipeNumber>2</RecipeNumber>
    <RecipePricing>
      for
      {' '}
      {calcPrice(6.25)}
      {' '}
      per serving
    </RecipePricing>
  </>
)

const ThirdRecipe = ({ calcPrice }: Props) => (
  <>
    <RecipeNumber>3</RecipeNumber>
    <RecipePricing>
      for
      {' '}
      {calcPrice(5)}
      {' '}
      per serving
    </RecipePricing>
  </>
)

const FourRecipe = ({ calcPrice }: Props) => (
  <>
    <RecipeNumber>4</RecipeNumber>
    <RecipePricing>
      for
      {' '}
      {calcPrice(4.37)}
      {' '}
      per serving
    </RecipePricing>
  </>
)

const FiveRecipe = ({ calcPrice }: Props) => (
  <>
    <RecipeNumber>5</RecipeNumber>
    <RecipePricing>
      for
      {' '}
      {calcPrice(4.08)}
      {' '}
      per serving
    </RecipePricing>
  </>
)

const recipeComponents = [FirstRecipe, SecondRecipe, ThirdRecipe, FourRecipe, FiveRecipe]

interface ImmutableMapBoxPrices extends ImmutableMap<string> {
  // eslint-disable-next-line no-unused-vars
  getIn(path: string[], defaultValue: string): string
}

const getDiscount = (state: { menuBoxPrices: ImmutableMapBoxPrices }) =>
  state?.menuBoxPrices?.getIn(['2', '2', 'vegetarian', 'percentageOff'], '0') || '0'

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
  const rawDiscount = useSelector(getDiscount)
  const discount = parseFloat(rawDiscount)
  const calcPrice = (price: number) => `£${(price * (1 - discount / 100)).toFixed(2)}`

  return (
    <>
      {renderComponents.map((Component, index) => (
        <RecipeHolder key={index} view={view} browserType={browser}>
          <Component calcPrice={calcPrice} />
        </RecipeHolder>
      ))}
    </>
  )
}
