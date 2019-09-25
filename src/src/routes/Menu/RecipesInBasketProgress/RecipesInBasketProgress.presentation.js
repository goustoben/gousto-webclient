import React from 'react'
import PropTypes from 'prop-types'

import {
  ExtraInfo,
  ExtraInfoMain,
  ExtraInfoSecondary,
  FloatCard,
  LayoutContentWrapper,
} from 'goustouicomponents'
import { RecipesInBasketProgressContent } from 'routes/Menu/RecipesInBasketProgressContent'

import css from './RecipesInBasketProgress.css'

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  selectedRecipesCount: PropTypes.number.isRequired,
}

const RecipesInBasketProgressPresentation = (
  { isAuthenticated, selectedRecipesCount }
) => {
  return (
    <FloatCard closeIcon="small-screens-only" offsetVertical="8rem">
      {
        isAuthenticated ? (
          <div className={css.wrapExtraInfo}>
            <ExtraInfo>
              <ExtraInfoMain>
                <RecipesInBasketProgressContent selectedRecipesCount={selectedRecipesCount} />
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
          <RecipesInBasketProgressContent selectedRecipesCount={selectedRecipesCount} />
        )
      }
    </FloatCard>
  )
}

RecipesInBasketProgressPresentation.propTypes = propTypes

export {
  RecipesInBasketProgressPresentation
}
