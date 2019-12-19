import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { maxRecipesNum } from 'config/basket'

import {
  Layout2Cells,
  LayoutContentWrapper,
  ProgressBar,
} from 'goustouicomponents'
import BoxProgressMessage from 'routes/Menu/BoxProgressMessage'

import css from './RecipesInBasketProgressContent.css'

const propTypes = {
  selectedRecipesCount: PropTypes.number.isRequired,
}

const recipeCountToPercentage = (selectedRecipesCount) => (
  Math.round((selectedRecipesCount / maxRecipesNum) * 100)
)

const RecipesInBasketProgressContent = ({ selectedRecipesCount }) => {
  const isBasketFull = selectedRecipesCount >= maxRecipesNum

  const cardClasses = classnames(
    css.cardContentWrapper,
    {
      [css.greenBorder]: isBasketFull,
      [css.cardContentWrapperFull]: isBasketFull,
    }
  )

  const percentage = recipeCountToPercentage(selectedRecipesCount)

  return (
    <div className={cardClasses}>
      <LayoutContentWrapper>
        {isBasketFull ?
          <Layout2Cells>
            <span className={css.iconProgressCompleted} />
            <BoxProgressMessage
              className={css.message}
              numRecipes={selectedRecipesCount}
            />
          </Layout2Cells>
          :
          <div className={css.cardContentWrapperPartial}>
            <Layout2Cells>
              <p className={css.percentageNumber}>{percentage}%</p>
              <BoxProgressMessage
                className={css.message}
                numRecipes={selectedRecipesCount}
              />
            </Layout2Cells>
            <div className={css.progressBarWrapper}>
              <ProgressBar percentage={percentage} theme="transition-1" />
            </div>
          </div>
        }
      </LayoutContentWrapper>
    </div>
  )
}

RecipesInBasketProgressContent.propTypes = propTypes

export {
  RecipesInBasketProgressContent
}
