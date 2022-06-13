import React, { useCallback } from 'react'

import actions from 'actions'
import classnames from 'classnames'
import { Button, Control, Segment } from 'goustouicomponents'
import { useDispatch } from 'react-redux'

import config from 'config/recipes'
import { useBasket, useStock } from 'routes/Menu/domains/basket'

import { basketRecipeAdd, basketRecipeRemove } from '../../../actions/basketRecipes'
import { menuRecipeDetailVisibilityChange } from '../../../actions/menuRecipeDetails'
import { Surcharge } from './Surcharge'
import { useSurchargePerPortion } from './useSurchargePerPortion'

import css from './RecipeDetailsButtons.css'

type ButtonsProps = {
  buttonText?: string
  isOutOfStock?: boolean
  position?: number
  recipeId: string
  view: string
}

const generateGetSurchargeGridClass =
  (surchargePerPortion: number | null, view: string) =>
  (className: string, ...otherClasses: string[]) => {
    const viewsToExclude = config.recipeDetailViews

    const shouldApplyClass = Boolean(surchargePerPortion && !viewsToExclude.includes(view))
    const otherClassNames = otherClasses.map((name) => css[name])

    return classnames({ [css[className]]: shouldApplyClass }, ...otherClassNames)
  }

export const RecipeDetailsButtons = ({
  buttonText = 'Add recipe',
  isOutOfStock = false,
  position = 0,
  recipeId,
  view,
}: ButtonsProps) => {
  const dispatch = useDispatch()
  const { numPortions, reachedLimit, getQuantitiesForRecipeId, canAddRecipes } = useBasket()
  const { getStockForRecipe } = useStock()
  const surchargePerPortion = useSurchargePerPortion({ recipeId, numPortions })
  const stock = getStockForRecipe(recipeId)
  const qty = getQuantitiesForRecipeId(recipeId)

  const handleAdd = useCallback(
    (isFirstInBatchOfSameRecipes: boolean) => {
      if (stock !== null && canAddRecipes) {
        dispatch(basketRecipeAdd(recipeId, view, { position }))

        if (isFirstInBatchOfSameRecipes) {
          dispatch(menuRecipeDetailVisibilityChange())
        }
      } else if (config.recipeDetailViews.includes(view)) {
        dispatch(menuRecipeDetailVisibilityChange())
        setTimeout(() => {
          dispatch(actions.menuBrowseCTAVisibilityChange(true))
        }, 500)
      } else {
        dispatch(actions.menuBrowseCTAVisibilityChange(true))
      }
    },
    [dispatch, stock, canAddRecipes, recipeId, view, position],
  )

  const handleRemove = useCallback(() => {
    dispatch(basketRecipeRemove(recipeId, view, position))
  }, [dispatch, recipeId, view, position])

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
