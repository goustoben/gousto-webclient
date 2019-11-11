import React from 'react'
import PropTypes from 'prop-types'
import Link from 'Link'
import Svg from 'Svg'
import { defaultMenuItems } from '../../menuItemsHelper'
import cssMobile from '../MobileMenu.css'

const LinkMobileMenu = ({ isAuthenticated, onLoginClick, trackNavigationClick }) => (
  <span className={cssMobile.mobileMenuTestWrapper}>
    <Svg fileName='icon_menubar_account_link' className={cssMobile.accountIcon} />
    {isAuthenticated ?
      <Link
        data-testing='linkMenuAccount'
        to={defaultMenuItems.myGousto.url}
        className={cssMobile.accountMenuItem}
        clientRouted={defaultMenuItems.myGousto.clientRouted}
        tracking={() => trackNavigationClick('New ' + defaultMenuItems.myGousto.tracking)}
      >
        Account
      </Link> :
      <button type='button' className={cssMobile.accountMenuItem} onClick={onLoginClick}>Log in</button>
    }
    <Svg fileName='icon_menubar_help_link' className={cssMobile.accountIcon} />
    <Link
      to={defaultMenuItems.faq.url}
      className={cssMobile.helpMenuItem}
      clientRouted={defaultMenuItems.faq.clientRouted}
      tracking={() => trackNavigationClick('New ' + defaultMenuItems.faq.tracking)}
      target='_blank'
      rel='noopener noreferrer'
    >
      {defaultMenuItems.faq.name}
    </Link>
  </span >
)

LinkMobileMenu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  trackNavigationClick: PropTypes.func.isRequired,
}

export { LinkMobileMenu }
