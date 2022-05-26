import React from 'react'

import { ExpandableSection } from 'goustouicomponents'
import PropTypes from 'prop-types'

import { checkoutClickHideOrderSummary, checkoutClickShowOrderSummary } from 'actions/trackingKeys'

import { HeaderContent } from './HeaderContent/HeaderContent'

import css from './ExpandableBoxSummary.css'

export const ExpandableBoxSummary = ({
  children,
  totalToPay,
  totalWithoutDiscount,
  trackUTMAndPromoCode,
  promoCodeValid,
}) => {
  const sendSnowplowEvent = (isExpanded) => {
    trackUTMAndPromoCode(isExpanded ? checkoutClickHideOrderSummary : checkoutClickShowOrderSummary)
  }

  const renderSectionToggle = (isExpanded, handleClick) => {
    const handleHeaderClick = (event) => {
      handleClick(event)
      sendSnowplowEvent(isExpanded)
    }

    return (
      <HeaderContent
        isExpanded={isExpanded}
        handleClick={handleHeaderClick}
        totalToPay={totalToPay}
        totalWithoutDiscount={totalWithoutDiscount}
        trackUTMAndPromoCode={trackUTMAndPromoCode}
        promoCodeValid={promoCodeValid}
      />
    )
  }

  return (
    <ExpandableSection
      className={css.expandableSection}
      disableAnimation={false}
      renderToggle={({ isExpanded, handleClick }) => renderSectionToggle(isExpanded, handleClick)}
      contentClassName={css.expandedContent}
    >
      {children}
    </ExpandableSection>
  )
}

ExpandableBoxSummary.propTypes = {
  children: PropTypes.node.isRequired,
  totalToPay: PropTypes.string,
  totalWithoutDiscount: PropTypes.string,
  trackUTMAndPromoCode: PropTypes.func,
  promoCodeValid: PropTypes.bool,
}

ExpandableBoxSummary.defaultProps = {
  totalToPay: '',
  totalWithoutDiscount: '',
  trackUTMAndPromoCode: () => {},
  promoCodeValid: false,
}
