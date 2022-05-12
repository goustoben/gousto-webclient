import React, { ButtonHTMLAttributes } from 'react'
import { useSelector, RootStateOrAny } from 'react-redux'

import { Button, ButtonColorVariant } from '@gousto-internal/citrus-react'
import { PriceAndDiscountTip } from '../PriceAndDiscountTip'

import css from './ExpandBoxSummaryButton.css'

type Props = {
  numRecipes: number
  onClick: ButtonHTMLAttributes<Element>['onClick']
  showBrowseCTA: boolean
}

export const ExpandBoxSummaryButton = ({ numRecipes, onClick, showBrowseCTA }: Props) => {
  const showDetails = useSelector<RootStateOrAny, boolean>((state) =>
    state.boxSummaryShow.get('show'),
  )

  if (showBrowseCTA) {
    return null
  }

  return (
    <div className={css.buttonContainer}>
      <Button
        height={48}
        colorVariant={ButtonColorVariant.Secondary}
        onClick={onClick}
        data-testing="expandBoxSummaryButton"
      >
        <PriceAndDiscountTip numRecipes={numRecipes} />
        <span className={css.iconDesktop} data-testing="boxSummaryIcon">
          <span
            className={showDetails ? css.arrowDown : css.arrowUp}
            data-testing="boxSummaryArrow"
          />
        </span>
      </Button>
    </div>
  )
}
