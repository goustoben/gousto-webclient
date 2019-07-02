import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {
  FloatCard,
  Layout2Cells,
  LayoutContentWrapper,
  ProgressBar,
} from 'goustouicomponents'
import BoxProgressMessage from 'routes/Menu/BoxProgressMessage'

import css from './RecipesInBasketProgress.css'

const propTypes = {
  selectedRecipesCount: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
  isBasketFull: PropTypes.bool.isRequired,
}

const RecipesInBasketProgressPresentation = (
  { selectedRecipesCount, percentage, isBasketFull }
) => {
  const cardClasses = classnames(
    css.cardContentWrapper,
    {
      [css.greenBorder]: isBasketFull,
      [css.cardContentWrapperFull]: isBasketFull,
    }
  )

  return (
    <FloatCard closeIcon="small-screens-only" offsetVertical="6rem">
        <div className={cardClasses}>
          <LayoutContentWrapper>
            { isBasketFull ?
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
    </FloatCard>
  )
}

RecipesInBasketProgressPresentation.propTypes = propTypes

export {
  RecipesInBasketProgressPresentation
}
