import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import config from 'config'
import * as trackingKeys from 'actions/trackingKeys'
import { client as clientRoutes, giftCardsURL } from 'config/routes'
import { onEnter } from 'utils/accessibility'
import { AppStoreLinks } from 'components/AppStoreLinks'
import Link from 'Link'
import { FooterNotice } from './FooterNotice'
import css from './Footer.css'

const showHelpPreLogin = (helpPreLoginVisibilityChange) => (
  helpPreLoginVisibilityChange(true)
)

const renderHelpLink = (
  isAuthenticated,
  helpPreLoginVisibilityChange,
  trackNavigationClick
) => (
  isAuthenticated
    ? (
      <Link
        to={clientRoutes.helpCentre}
        data-optimizely="footer-help-link"
        data-selid="footer-learn-more"
        title="Help"
        clientRouted={false}
        secondary
        tracking={() => trackNavigationClick({
          actionType: trackingKeys.clickHelpFooter,
          seCategory: 'help',
          logged_in: true,
        })}
      >
        Help
      </Link>
    )
    : (
      <span
        data-test="help-link"
        role="button"
        tabIndex="0"
        onClick={() => {
          showHelpPreLogin(helpPreLoginVisibilityChange)
          trackNavigationClick({
            actionType: trackingKeys.clickHelpFooter,
            seCategory: 'help',
            logged_in: false,
          })
        }}
        onKeyDown={onEnter(() => showHelpPreLogin(helpPreLoginVisibilityChange))}
      >
        Help
      </span>
    )
)

export const Footer = ({
  copyright,
  helpPreLoginVisibilityChange,
  isAuthenticated,
  simple,
  type,
  trackNavigationClick,
  isGiftCardsLinkVisible,
  isCorporateEnquiriesLinkVisible,
  isOnLandingPage,
}) => {
  const renderTermsLink = () => (
    <li className={css.menuItem}>
      Terms
      (
      <Link to={clientRoutes.termsOfUse} data-selid="footer-terms-of-use" title="Terms &amp; Conditions" clientRouted={false} secondary>Website</Link>
      )
      (
      <Link to={clientRoutes.termsAndConditions} data-selid="footer-terms-and-conditions" title="Terms &amp; Conditions for Sale of Goods" clientRouted={false} secondary>Sale</Link>
      )
    </li>
  )

  const renderPrivacyLink = () => (
    <li className={css.menuItem}>
      <Link to={clientRoutes.privacyPolicy} data-selid="footer-privacy-statement" title="Privacy Policy" clientRouted secondary>Privacy Policy</Link>
    </li>
  )

  const renderModernSlaveryLink = () => (
    <li className={css.menuItem}>
      <Link to={clientRoutes.modernSlavery} data-selid="footer-modern-slavery-statement" title="Modern Slavery" clientRouted secondary>
        Modern Slavery
        <span className={css.modernSlaveryLink}> Statement</span>
      </Link>
    </li>
  )

  const renderGiftCardsLink = () =>
    isGiftCardsLinkVisible && (
      <li className={css.menuItem}>
        <Link
          to={giftCardsURL}
          data-selid="footer-gift-cards"
          title="Gift Cards"
          clientRouted={false}
          secondary
          tracking={() => trackNavigationClick({
            actionType: trackingKeys.clickGiftCardsFooterLink,
          })}
        >
          Gift Cards
        </Link>
      </li>
    )

  const renderCorporateEnquiriesLink = () =>
    isCorporateEnquiriesLinkVisible && (
      <li className={css.menuItem}>
        <Link
          to={clientRoutes.corporateEnquiries}
          data-selid="footer-corporate-enquiries"
          title="Corporate enquiries"
          clientRouted={false}
          secondary
          tracking={() => trackNavigationClick({
            actionType: trackingKeys.clickCorporateEnquiriesLinkFooter,
          })}
        >
          Corporate Enquiries
        </Link>
      </li>
    )

  const renderSimpleList = () => (
    <ul className={css.menuList}>
      {renderTermsLink()}
      {renderPrivacyLink()}
      {renderModernSlaveryLink()}
    </ul>
  )

  const trackWeeklyRecipesClick = () => trackNavigationClick({ actionType: trackingKeys.clickRecipeNavigationFooter })
  const renderFullList = () => (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link to={clientRoutes.home} data-selid="footer-home" title="Home" clientRouted={false} secondary>Home</Link>
      </li>
      <li className={css.menuItem}>
        {/* eslint-disable-next-line */}
        <span data-test="week-recipes" onClick={trackWeeklyRecipesClick} role="button" tabIndex={0}>
          <Link
            to={clientRoutes.menu}
            data-selid="footer-this-weeks-recipes"
            title="This Week's Recipes"
            clientRouted
            secondary
          >
            This Week&apos;s Recipes
          </Link>
        </span>
      </li>
      <li className={css.menuItem}>
        {renderHelpLink(isAuthenticated, helpPreLoginVisibilityChange, trackNavigationClick)}
      </li>
      {renderTermsLink()}
      <li className={css.menuItem}>
        <Link data-selid="footer-cookbook" to={clientRoutes.cookbook} title="Cookbook" clientRouted={false} secondary>Cookbook</Link>
      </li>
      <li className={css.menuItem}>
        <Link to={clientRoutes.jobs} data-selid="footer-jobs" title="Jobs" clientRouted={false} secondary>Jobs</Link>
      </li>
      <li className={css.menuItem}>
        <Link to={clientRoutes.weCare} data-selid="footer-we-care" title="We Care" clientRouted={false} secondary>We Care</Link>
      </li>
      <li className={css.menuItem}>
        <Link to={clientRoutes.blog} data-selid="footer-blog" title="Blog" clientRouted={false} secondary>Blog</Link>
      </li>
      <li className={css.menuItem}>
        <Link to={clientRoutes.ourSuppliers} data-selid="footer-our-suppliers" title="Our Suppliers" clientRouted={false} secondary>Our Suppliers</Link>
      </li>
      {renderPrivacyLink()}
      {renderModernSlaveryLink()}
      {renderGiftCardsLink()}
      {renderCorporateEnquiriesLink()}
    </ul>
  )

  const renderSocial = () => (
    <div className={css.appLinks}>
      <ul className={css.links}>
        <li className={css.link}>
          <Link to="http://www.facebook.com/goustocooking" data-selid="footer-facebook" clientRouted={false} secondary>
            <span role="img" aria-label="facebook" className={css.facebook} />
          </Link>
        </li>
        <li className={css.link}>
          <Link to="https://twitter.com/goustocooking" data-selid="footer-twitter" clientRouted={false} secondary>
            <span role="img" aria-label="twitter" className={css.twitter} />
          </Link>
        </li>
        <li className={css.link}>
          <Link to="https://www.youtube.com/UKGousto/" data-selid="footer-youtube" clientRouted={false} secondary>
            <span role="img" aria-label="youtube" className={css.youtube} />
          </Link>
        </li>
        <li className={css.link}>
          <Link to="http://instagram.com/goustocooking" data-selid="footer-instagram" clientRouted={false} secondary>
            <span role="img" aria-label="instagram" className={css.instagram} />
          </Link>
        </li>
      </ul>
      <AppStoreLinks appStoreId={config.apps.appStoreId} playStoreId={config.apps.playStoreId} />
    </div>
  )

  const copyrightText = (
    <p>
      &copy; Gousto
      {moment().format('YYYY')}
      . All rights reserved.
    </p>
  )

  const renderCopyright = () => (
    <div id="copyright" className={css.copyright}>
      {copyrightText}
    </div>
  )
  const renderNo1Notice = () => (
    <FooterNotice id="number-one-notice">
      * Our ‘No.1 Recipe Box for Choice’ claim is based on Gousto having more recipes available on the weekly menu than other UK recipe boxes from 1st September 2021 to 6th January 2022. The full details of this comparison can be found here:&nbsp;
      <a href="https://cook.gousto.co.uk/choice">Verification of choice</a>
    </FooterNotice>
  )

  const renderVerificationOfValueNotice = () => (
    <FooterNotice id="verification-of-value-notice">
      ** Our &apos;UK&apos;s best value recipe box&apos; claim is based on Gousto offering the cheapest price on standard box prices (i.e. with no applied offers or discounts) and include any delivery costs charged by each company. These cost comparisons are tracked on a monthly basis. The full details of this comparison can be found here:&nbsp;
      <a href="https://cook.gousto.co.uk/value/">Verification of value</a>
      .
    </FooterNotice>
  )

  const renderSimpleFooter = () => (
    <div>
      {renderSimpleList()}
      {renderCopyright()}
    </div>
  )

  const renderMediumFooter = () => (
    <div>
      {renderSocial()}
      {renderFullList()}
      {copyright && renderCopyright()}
      {isOnLandingPage && renderNo1Notice()}
      {isOnLandingPage && renderVerificationOfValueNotice()}
    </div>
  )

  const renderLargeFooter = () => (
    <div>
      {renderMediumFooter()}
    </div>
  )

  const renderFooter = () => {
    let footer = null

    if (simple) {
      // Back compatibility of simple prop
      return renderSimpleFooter()
    }

    switch (type) {
    case 'simple':
      footer = renderSimpleFooter()
      break
    case 'medium':
      footer = renderMediumFooter()
      break
    case 'large':
      footer = renderLargeFooter()
      break
    default: {
      footer = renderMediumFooter()
      break
    }
    }

    return footer
  }

  return (
    <footer className={css.footer}>
      {renderFooter()}
    </footer>
  )
}

Footer.propTypes = {
  copyright: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  helpPreLoginVisibilityChange: PropTypes.func.isRequired,
  simple: PropTypes.bool,
  type: PropTypes.string,
  trackNavigationClick: PropTypes.func.isRequired,
  isGiftCardsLinkVisible: PropTypes.bool,
  isCorporateEnquiriesLinkVisible: PropTypes.bool,
  isOnLandingPage: PropTypes.bool,
}

Footer.defaultProps = {
  copyright: true,
  isAuthenticated: false,
  simple: false,
  type: 'medium',
  isGiftCardsLinkVisible: true,
  isCorporateEnquiriesLinkVisible: true,
  isOnLandingPage: false,
}
