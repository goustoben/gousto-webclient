import React from 'react'

import { signupConfig } from 'config/signup'
import { onEnter } from 'utils/accessibility'

import { useDiscountAppliedData } from './discountAppliedBarHooks'

import css from './DiscountAppliedBar.css'

type Props = {
  promoModalVisible: boolean
  isPromoBarHidden: boolean
  trackDiscountVisibility: (wizardStep: string) => void
  wizardStep: string
  isDiscountAppliedBarDismissed: boolean
  signupDismissDiscountAppliedBar: () => void
}

const DiscountAppliedBar = ({
  promoModalVisible,
  isPromoBarHidden,
  isDiscountAppliedBarDismissed,
  trackDiscountVisibility,
  wizardStep,
  signupDismissDiscountAppliedBar,
}: Props) => {
  const { isHighlightDiscountExperimentEnabled, isDiscountEnabled, discountTip } =
    useDiscountAppliedData()
  const isHidden = isDiscountAppliedBarDismissed || promoModalVisible || isPromoBarHidden
  const onClose = () => {
    signupDismissDiscountAppliedBar()
  }

  trackDiscountVisibility(wizardStep)

  if (isHidden || (!isDiscountEnabled && isHighlightDiscountExperimentEnabled)) {
    return null
  }

  return (
    <div
      className={css.container}
      data-testid={isHidden ? 'DiscountAppliedBarContainerHidden' : 'DiscountAppliedBarContainer'}
    >
      <div className={css.successIcon} />
      {isHighlightDiscountExperimentEnabled ? (
        <span className={css.discountText}>
          <span>{signupConfig.boxSizeStep.discountApplied}: </span>
          <strong>{discountTip}</strong>
        </span>
      ) : (
        <span className={css.discountText}>
          <span className={css.discountApplied}>{signupConfig.boxSizeStep.discountApplied}!</span>{' '}
          {signupConfig.discountAppliedText}
        </span>
      )}
      <div
        className={css.closeIcon}
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={onEnter(onClose)}
      />
    </div>
  )
}

export { DiscountAppliedBar }
