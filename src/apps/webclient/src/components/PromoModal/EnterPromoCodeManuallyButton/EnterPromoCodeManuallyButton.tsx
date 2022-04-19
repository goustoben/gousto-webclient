import React from 'react'
import PropTypes from 'prop-types'
import { CTA, Modal } from 'goustouicomponents'
import css from './EnterPromoCodeManuallyButton.module.css'

type Props = {
  onClick: () => void
  isGoustoOnDemandEnabled: boolean
}

export const EnterPromoCodeManuallyButton = ({ onClick, isGoustoOnDemandEnabled }: Props) => {
  if (isGoustoOnDemandEnabled) {
    return null
  }

  return (
    <div className={css.container}>
      <CTA
        size="medium"
        isDarkTheme
        testingSelector="enterPromoCodeManuallyButton"
        onClick={onClick}
        isFullWidth
      >
        I have a discount code to&nbsp;enter
      </CTA>
    </div>
  )
}
