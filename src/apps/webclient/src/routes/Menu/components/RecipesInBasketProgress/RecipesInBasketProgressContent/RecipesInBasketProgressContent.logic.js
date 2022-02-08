import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import config from 'config'
import {
  Layout2Cells,
  LayoutContentWrapper,
  ProgressBar,
} from 'goustouicomponents'
import css from './RecipesInBasketProgressContent.css'
import { BoxProgressMessage } from '../../BoxProgressMessage'

const propTypes = {
  selectedRecipesCount: PropTypes.number.isRequired,
}

const RecipesInBasketProgressContent = ({ selectedRecipesCount }) => {
  const { maxRecipesNum } = config.basket
  const isBasketFull = selectedRecipesCount >= maxRecipesNum

  const cardClasses = classnames(
    css.cardContentWrapper,
    {
      [css.greenBorder]: isBasketFull,
      [css.cardContentWrapperFull]: isBasketFull,
    }
  )

  const percentage = Math.round((selectedRecipesCount / maxRecipesNum) * 100)

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
