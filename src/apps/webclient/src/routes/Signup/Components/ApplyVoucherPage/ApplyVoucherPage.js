import React from 'react'
import PropTypes from 'prop-types'
import { ExpandableSection } from 'goustouicomponents'
import { CheckoutButton } from 'routes/Checkout/Components/CheckoutButton/CheckoutButton'
import { InformationalPageTemplate } from '../InformationalPageTemplate'
import { HeaderContent } from './HeaderContent'
import css from './ApplyVoucherPage.css'

export const ApplyVoucherPage = ({
  applyVoucherCustomText,
  signupApplyVoucherGoToDeliveries,
  trackUTMAndPromoCode,
}) => {
  const renderToggleContent = (isExpanded, handleClick) => (
    <HeaderContent
      isExpanded={isExpanded}
      handleClick={handleClick}
      trackUTMAndPromoCode={trackUTMAndPromoCode}
    />
  )

  return (
    <InformationalPageTemplate
      headerText="Apply voucher to your account"
      testingSelector="applyVoucherPage"
      isGoustoOnDemandEnabled
    >
      {applyVoucherCustomText && <p className={css.customText}>{applyVoucherCustomText}</p>}
      <p className={css.customText}>
        Additional costs will apply for surcharge recipes and items from the Gousto Market.
      </p>
      <ExpandableSection
        className={css.expandableSection}
        disableAnimation={false}
        contentClassName={css.expandedContent}
        renderToggle={({ isExpanded, handleClick }) => renderToggleContent(isExpanded, handleClick)}
      >
        <p>On the app, it is under upcoming deliveries on the home tab.</p>
        <p>On the website, it is under upcoming deliveries in My Gousto.</p>
      </ExpandableSection>
      <div className={css.ctaContainer}>
        <CheckoutButton
          onClick={signupApplyVoucherGoToDeliveries}
          isFullWidth
          testingSelector="applyVoucherCTA"
          noHorizontalPadding
        >
          Apply voucher
        </CheckoutButton>
      </div>
    </InformationalPageTemplate>
  )
}

ApplyVoucherPage.propTypes = {
  signupApplyVoucherGoToDeliveries: PropTypes.func.isRequired,
  trackUTMAndPromoCode: PropTypes.func.isRequired,
  applyVoucherCustomText: PropTypes.string,
}

ApplyVoucherPage.defaultProps = {
  applyVoucherCustomText: '',
}
