import React from 'react'

import classnames from 'classnames'

import { use5RecipesAwareness } from '../use5RecipesAwareness'

import css from './FiveRecipesAwarenessOrderListBanner.css'

export enum OrderState {
  MenuOpen = 'menu open',
  Cancelled = 'cancelled',
  Dispatched = 'dispatched',
  Confirmed = 'confirmed',
  RecipesChosen = 'recipes chosen',
}

export const FiveRecipesAwarenessOrderListBanner = ({ orderState }: { orderState: OrderState }) => {
  const { isEnabled } = use5RecipesAwareness()

  const canShowBanner =
    orderState !== OrderState.Cancelled &&
    orderState !== OrderState.Confirmed &&
    orderState !== OrderState.Dispatched

  if (!canShowBanner || !isEnabled) {
    return null
  }

  const fiveRecipesContainerCss = classnames(css.fiveRecipesContainer, css.leftArrow)

  return (
    <div className={fiveRecipesContainerCss}>
      <p className={css.fiveRecipesText}>
        You can now choose up to <b>5 recipes </b> &#127881;
      </p>
    </div>
  )
}
