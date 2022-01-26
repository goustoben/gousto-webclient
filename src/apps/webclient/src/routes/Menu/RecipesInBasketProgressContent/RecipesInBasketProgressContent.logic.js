import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {
  Layout2Cells,
  LayoutContentWrapper,
  ProgressBar,
} from 'goustouicomponents'
import { BoxProgressMessage } from 'routes/Menu/BoxProgressMessage'
import { use5RecipesPaintedDoorTest } from '../../../components/FiveRecipesPaintedDoorTest/use5RecipesPaintedDoorTest'

import css from './RecipesInBasketProgressContent.css'

const propTypes = {
  selectedRecipesCount: PropTypes.number.isRequired,
}

const RecipesInBasketProgressContent = ({ selectedRecipesCount }) => {
  const { maxRecipes } = use5RecipesPaintedDoorTest()
  const isBasketFull = selectedRecipesCount >= maxRecipes

  const cardClasses = classnames(
    css.cardContentWrapper,
    {
      [css.greenBorder]: isBasketFull,
      [css.cardContentWrapperFull]: isBasketFull,
    }
  )

  const percentage = Math.round((selectedRecipesCount / maxRecipes) * 100)

  return (
    <div className={cardClasses}>
      <LayoutContentWrapper>
        {isBasketFull ? (
          <Layout2Cells>
            <span className={css.iconProgressCompleted} />
            <BoxProgressMessage
              className={css.message}
              numRecipes={selectedRecipesCount}
            />
          </Layout2Cells>
        ) : (
          <div className={css.cardContentWrapperPartial}>
            <Layout2Cells>
              <p className={css.percentageNumber}>
                {percentage}
                %
              </p>
              <BoxProgressMessage
                className={css.message}
                numRecipes={selectedRecipesCount}
              />
            </Layout2Cells>
            <div className={css.progressBarWrapper}>
              <ProgressBar percentage={percentage} theme="transition-1" />
            </div>
          </div>
        )}
      </LayoutContentWrapper>
    </div>
  )
}

RecipesInBasketProgressContent.propTypes = propTypes

export {
  RecipesInBasketProgressContent
}
