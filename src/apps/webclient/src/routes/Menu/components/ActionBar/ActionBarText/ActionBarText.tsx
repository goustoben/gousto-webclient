import React, { ReactNode } from 'react'
import classNames from 'classnames'
import { ordinal, formatOptionalPrice } from '../actionBarUtils'
import css from './ActionBarText.module.css'

type FormatterProps = {
  children: ReactNode
}

const Bold = ({ children }: FormatterProps) => <span className={css.bold}>{children}</span>

const Info = ({ children }: FormatterProps) => <span className={css.info}>{children}</span>

const Success = ({ children }: FormatterProps) => <span className={css.success}>{children}</span>

type Props = {
  numRecipes: number
  maxRecipes: number
  currentTierPricePerPortion: string | null
  nextTierPricePerPortion: string | null
  isLoading: boolean
  isInEmbeddedActionBar: boolean
}

export const ActionBarText = ({
  numRecipes,
  maxRecipes,
  currentTierPricePerPortion,
  nextTierPricePerPortion,
  isLoading,
  isInEmbeddedActionBar,
}: Props) => {
  const renderContent = () => {
    if (numRecipes === 0) {
      return (
        <Info>
          <Bold>Add first recipe</Bold> to get started
        </Info>
      )
    } else if (numRecipes === 1) {
      return (
        <Info>
          <Bold>Add at least 2 recipes</Bold> to checkout
        </Info>
      )
    } else if (numRecipes < maxRecipes) {
      return (
        <>
          <span>Add {ordinal(numRecipes + 1)} recipe to reduce price per portion: </span>
          {!isLoading && (
            <Bold>
              {formatOptionalPrice(currentTierPricePerPortion)} →{' '}
              <Success>{formatOptionalPrice(nextTierPricePerPortion)}</Success>
            </Bold>
          )}
        </>
      )
    } else {
      return (
        <Success>
          <span>{numRecipes} recipes added at the </span>
          <Bold>best price per portion</Bold>{' '}
          {!isLoading && <>of {formatOptionalPrice(currentTierPricePerPortion)}</>}
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
