import React from 'react'

import {
  ExtraInfo,
  ExtraInfoMain,
  ExtraInfoSecondary,
  FloatCard,
  LayoutContentWrapper,
} from 'goustouicomponents'
import PropTypes from 'prop-types'

import { useNumPortions } from 'routes/Menu/domains/basket/internal/useNumPortions'
import { useSupportedBoxTypes } from 'routes/Menu/domains/basket/internal/useSupportedBoxTypes'

import { RecipesInBasketProgressContent } from './RecipesInBasketProgressContent'

import css from './RecipesInBasketProgress.css'

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  selectedRecipesCount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
}

const RecipesInBasketProgressPresentation = ({
  isAuthenticated,
  selectedRecipesCount,
  onClose,
}) => {
  const { maxRecipesForPortion } = useSupportedBoxTypes()
  const { numPortions } = useNumPortions()
  const maxRecipesNum = maxRecipesForPortion(numPortions)
  const percentage = Math.round((selectedRecipesCount / maxRecipesNum) * 100)

  if (!selectedRecipesCount) {
    return null
  }

  return (
    <FloatCard
      closeIcon="small-screens-only"
      offsetVertical="8rem"
      onCloseIconClick={() => onClose(maxRecipesNum, percentage)}
    >
      {isAuthenticated ? (
        <div className={css.wrapExtraInfo}>
          <ExtraInfo>
            <ExtraInfoMain>
              <RecipesInBasketProgressContent
                selectedRecipesCount={selectedRecipesCount}
                percentage={percentage}
              />
            </ExtraInfoMain>
            <ExtraInfoSecondary label="Next:" title="Market items">
              <LayoutContentWrapper>
                <div className={css.extraInfo}>
                  You can add desserts, drinks, snacks & more from the Gousto Market once you
                  confirm your order.
                </div>
              </LayoutContentWrapper>
            </ExtraInfoSecondary>
          </ExtraInfo>
        </div>
      ) : (
        <RecipesInBasketProgressContent
          selectedRecipesCount={selectedRecipesCount}
          percentage={percentage}
        />
      )}
    </FloatCard>
  )
}

RecipesInBasketProgressPresentation.propTypes = propTypes

export { RecipesInBasketProgressPresentation }
