import React, { useCallback } from 'react'

import actions from 'actions'
import classnames from 'classnames'
import { Button, Control, Segment } from 'goustouicomponents'
import { useDispatch } from 'react-redux'

import { recipesConfig } from 'config/recipes'
import { useBasket, useSupportedBoxTypes } from 'routes/Menu/domains/basket'
import { useStock } from 'routes/Menu/domains/stock'

import { menuRecipeDetailVisibilityChange } from '../../../actions/menuRecipeDetails'
import { Surcharge } from './Surcharge'
import { useSurchargePerPortion } from './useSurchargePerPortion'

import css from './RecipeDetailsButtons.css'

type ButtonsProps = {
  buttonText?: string
  isOutOfStock?: boolean
  position?: string
  recipeId: string
  view: string
}

const generateGetSurchargeGridClass =
  (surchargePerPortion: number | null, view: string) =>
  (className: string, ...otherClasses: string[]) => {
    const viewsToExclude = recipesConfig.recipeDetailViews

    const shouldApplyClass = Boolean(surchargePerPortion && !viewsToExclude.includes(view))
    const otherClassNames = otherClasses.map((name) => css[name])

    return classnames({ [css[className]]: shouldApplyClass }, ...otherClassNames)
  }

export const RecipeDetailsButtons = ({
  buttonText = 'Add recipe',
  isOutOfStock = false,
  position = '',
  recipeId,
  view,
}: ButtonsProps) => {
  const dispatch = useDispatch()
  const {
    numPortions,
    reachedLimit,
    getQuantitiesForRecipeId,
    canAddRecipes,
    addRecipe,
    removeRecipe,
  } = useBasket()
  const { maxRecipesForPortion } = useSupportedBoxTypes()
  const maxRecipesNum = maxRecipesForPortion(numPortions)
  const { getStockForRecipe } = useStock()
  const surchargePerPortion = useSurchargePerPortion({ recipeId, numPortions })
  const stock = getStockForRecipe(recipeId, numPortions)
  const qty = getQuantitiesForRecipeId(recipeId)

  const handleAdd = useCallback(
    (isFirstInBatchOfSameRecipes: boolean) => {
      if (stock !== null && canAddRecipes) {
        addRecipe(recipeId, view, { position }, maxRecipesNum)

        if (isFirstInBatchOfSameRecipes) {
          dispatch(menuRecipeDetailVisibilityChange())
        }
      } else if (recipesConfig.recipeDetailViews.includes(view)) {
        dispatch(menuRecipeDetailVisibilityChange())
        setTimeout(() => {
          dispatch(actions.menuBrowseCTAVisibilityChange(true))
        }, 500)
      } else {
        dispatch(actions.menuBrowseCTAVisibilityChange(true))
      }
    },
    [dispatch, stock, canAddRecipes, recipeId, view, position, maxRecipesNum, addRecipe],
  )

  const handleRemove = useCallback(() => {
    removeRecipe(recipeId, view, position)
  }, [recipeId, view, position, removeRecipe])

  const getSegments = (disabled: boolean) => {
    const getSurchargeGridClass = generateGetSurchargeGridClass(surchargePerPortion, view)
    const segmentSelectedClass = getSurchargeGridClass('segmentSelected', 'sentenceCaseSegment')

    if (qty > 0) {
      const totalQty = qty * numPortions
      const defaultContent = ' Servings Added'
      const textContent = surchargePerPortion ? ' Added' : defaultContent

      return [
        <Segment key={0} onClick={handleRemove} size="small" className={segmentSelectedClass}>
          <Control placement="left">-</Control>
        </Segment>,
        <Segment fill={false} key={1} size="large" className={segmentSelectedClass}>
          {`${totalQty}${textContent}`}
          {surchargePerPortion && (
            <div className={getSurchargeGridClass('surchargeHidden', 'surcharge')}>
              <Surcharge surcharge={surchargePerPortion} />
            </div>
          )}
        </Segment>,
        <Segment
          key={2}
          onClick={() => handleAdd(false)}
          size="small"
          disabled={disabled}
          className={segmentSelectedClass}
          data-testing="menuAddServings"
        >
          <Control>+</Control>
        </Segment>,
      ]
    }

    return (
      <Segment
        onClick={() => {
          handleAdd(true)
        }}
        disabled={disabled}
        fill
        className={getSurchargeGridClass('segment', 'sentenceCaseSegment')}
      >
        {buttonText}
        {surchargePerPortion && (
          <div className={getSurchargeGridClass('surchargeWrapped', 'surcharge')}>
            <Surcharge surcharge={surchargePerPortion} />
          </div>
        )}
      </Segment>
    )
  }

  const disabled = isOutOfStock || reachedLimit
  const dataTesting = qty < 1 ? 'menuRecipeAdd' : 'menuAddServings'

  return (
    <Button
      fill={false}
      className={css.btnWrapper}
      data-testing={disabled ? 'menuRecipeAddDisabled' : dataTesting}
      width="full"
    >
      {getSegments(disabled)}
    </Button>
  )
}
