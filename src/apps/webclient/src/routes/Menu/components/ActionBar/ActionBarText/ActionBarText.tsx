import React, { ReactNode } from 'react'

import classNames from 'classnames'

import { formatOptionalPrice } from '../actionBarUtils'

import css from './ActionBarText.module.css'

type FormatterProps = {
  children: ReactNode
}

const Bold = ({ children }: FormatterProps) => <span className={css.bold}>{children}</span>

const Info = ({ children }: FormatterProps) => <span className={css.info}>{children}</span>

const Success = ({ children }: FormatterProps) => <span className={css.success}>{children}</span>

type Props = {
  recipeCount: number
  maxRecipes: number
  nextTierPricePerPortion: string | null
  isInEmbeddedActionBar: boolean
}

export const ActionBarText = ({
  recipeCount,
  maxRecipes,
  nextTierPricePerPortion,
  isInEmbeddedActionBar,
}: Props) => {
  const renderContent = () => {
    if (recipeCount === 0) {
      return (
        <Info>
          <Bold>Add first recipe</Bold> to get started
        </Info>
      )
    } else if (recipeCount === 1) {
      return (
        <Info>
          <Bold>Add more recipes</Bold> to complete your box
        </Info>
      )
    } else if (recipeCount < maxRecipes) {
      const recipeCountDiff = maxRecipes - recipeCount

      return (
        <Info>
          <span>
            <Bold>
              Add {recipeCountDiff} more recipe{recipeCountDiff > 1 ? 's' : ''}
            </Bold>
            &nbsp;for the best price per portion of&nbsp;
            {formatOptionalPrice(nextTierPricePerPortion)}
          </span>
        </Info>
      )
    } else {
      return (
        <Success>
          <span>{recipeCount} recipes added at the </span>
          <Bold>best price per portion of {formatOptionalPrice(nextTierPricePerPortion)}</Bold>
        </Success>
      )
    }
  }

  return (
    <div className={classNames(css.text, { [css.isInEmbeddedActionBar]: isInEmbeddedActionBar })}>
      {renderContent()}
    </div>
  )
}
