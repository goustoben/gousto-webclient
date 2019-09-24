import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {
  ExtraInfo,
  ExtraInfoMain,
  ExtraInfoSecondary,
  FloatCard,
  Layout2Cells,
  LayoutContentWrapper,
  ProgressBar,
} from 'goustouicomponents'
import BoxProgressMessage from 'routes/Menu/BoxProgressMessage'

import css from './RecipesInBasketProgress.css'

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isBasketFull: PropTypes.bool.isRequired,
  percentage: PropTypes.number.isRequired,
  selectedRecipesCount: PropTypes.number.isRequired,
}

const RecipesProgressBar = ({ isBasketFull, percentage, selectedRecipesCount }) => {
  const cardClasses = classnames(
    css.cardContentWrapper,
    {
      [css.greenBorder]: isBasketFull,
      [css.cardContentWrapperFull]: isBasketFull,
    }
  )

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

const RecipesInBasketProgressPresentation = (
  { isAuthenticated, isBasketFull, percentage, selectedRecipesCount }
) => {
  return (
    <FloatCard closeIcon="small-screens-only" offsetVertical="8rem">
      {
        isAuthenticated ? (
          <div className={css.wrapExtraInfo}>
            <ExtraInfo>
              <ExtraInfoMain>
                <RecipesProgressBar isBasketFull={isBasketFull} percentage={percentage} selectedRecipesCount={selectedRecipesCount} />
              </ExtraInfoMain>
              <ExtraInfoSecondary label="Next:" title="Market items">
                <LayoutContentWrapper>
                  <div className={css.extraInfo}>
                    You can add desserts, drinks, snacks & more from the Gousto Market once you confirm your order.
                  </div>
                </LayoutContentWrapper>
              </ExtraInfoSecondary>
            </ExtraInfo>
          </div>
        ) : (
          <RecipesProgressBar isBasketFull={isBasketFull} percentage={percentage} selectedRecipesCount={selectedRecipesCount} />
        )
      }
    </FloatCard>
  )
}

RecipesInBasketProgressPresentation.propTypes = propTypes

export {
  RecipesInBasketProgressPresentation
}
