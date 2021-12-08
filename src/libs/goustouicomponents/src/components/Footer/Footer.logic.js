import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'
import typography from 'design-language/typography.module.css'
import { routes } from 'gousto-config'
import AppStoreIcon from '../../design-language/icons/icon-Appstore.svg'
import GooglePlayIcon from '../../design-language/icons/icon-Playstore.svg'
import { LayoutPageWrapper } from '../LayoutPageWrapper'
import css from './Footer.module.css'

const year = new Date().getFullYear()
const { goustoWebclient, external } = routes

const Footer = ({ hasDataTracking, isAuthenticated }) => (
  <footer className={classnames(css.wrapper, typography.fontStyleBody)}>
    <LayoutPageWrapper padding="large-screens-only">
      <ul className={css.socialMediaLinks}>
        <li>
          <a
            href={external.facebook.url}
            target={external.facebook.target}
            rel="noopener noreferrer"
            className={css.link}
          >
            <span className={classnames(css.socialMediaIcon, css.facebookIcon)} />
          </a>
        </li>
        <li>
          <a
            href={external.twitter.url}
            target={external.twitter.target}
            rel="noopener noreferrer"
            className={css.link}
          >
            <span className={classnames(css.socialMediaIcon, css.twitterIcon)} />
          </a>
        </li>
        <li>
          <a
            href={external.youtube.url}
            target={external.youtube.target}
            rel="noopener noreferrer"
            className={css.link}
          >
            <span className={classnames(css.socialMediaIcon, css.youtubeIcon)} />
          </a>
        </li>
        <li>
          <a
            href={external.instagram.url}
            target={external.instagram.target}
            rel="noopener noreferrer"
            className={css.link}
          >
            <span className={classnames(css.socialMediaIcon, css.instagramIcon)} />
          </a>
        </li>
      </ul>
      <ul className={css.appStoreLinks}>
        <li>
          <a
            href={external.playstore.url}
            target={external.playstore.target}
            rel="noopener noreferrer"
            className={css.link}
          >
            <GooglePlayIcon data-testing="playstore-icon" alt={external.playstore.label} />
          </a>
        </li>
        <li>
          <a
            href={external.appstore.url}
            target={external.appstore.target}
            rel="noopener noreferrer"
            className={css.link}
          >
            <AppStoreIcon data-testing="appstore-icon" alt={external.appstore.label} />
          </a>
        </li>
      </ul>
      <nav>
        <ul className={css.navigationLinks}>
          <li className={css.showOnDesktop}>
            <a href={goustoWebclient.home.url} className={css.link}>
              {goustoWebclient.home.label}
            </a>
          </li>
          <li className={css.showOnDesktop}>
            <a href={goustoWebclient.chooseRecipes.url} className={css.link}>
              {goustoWebclient.chooseRecipes.labelAlternative}
            </a>
          </li>
          <li>
            {hasDataTracking ? (
              <a
                href={goustoWebclient.help.url}
                className={css.link}
                data-tracking-action="click_help_footer"
                data-tracking-property={JSON.stringify({ logged_in: isAuthenticated })}
              >
                {goustoWebclient.help.label}
              </a>
            ) : (
              <a href={goustoWebclient.help.url} className={css.link}>
                {goustoWebclient.help.label}
              </a>
            )}
          </li>
          <li>
            <a href={goustoWebclient.termsOfUse.url} className={css.link}>
              {goustoWebclient.termsOfUse.label}
            </a>
          </li>
          <li>
            <a href={goustoWebclient.termsAndConditions.url} className={css.link}>
              {goustoWebclient.termsAndConditions.label}
            </a>
          </li>
          <li>
            <a href={goustoWebclient.cookbook.url} className={css.link}>
              {goustoWebclient.cookbook.label}
            </a>
          </li>
          <li>
            <a href={goustoWebclient.jobs.url} className={css.link}>
              {goustoWebclient.jobs.label}
            </a>
          </li>
          <li>
            <a href={goustoWebclient.sustainability.url} className={css.link}>
              {goustoWebclient.sustainability.labelAlternative}
            </a>
          </li>
          <li>
            <a href={goustoWebclient.blog.url} className={css.link}>
              {goustoWebclient.blog.label}
            </a>
          </li>
          <li className={css.showOnDesktop}>
            <a href={goustoWebclient.suppliers.url} className={css.link}>
              {goustoWebclient.suppliers.label}
            </a>
          </li>
          <li>
            <a href={goustoWebclient.privacyPolicy.url} className={css.link}>
              {goustoWebclient.privacyPolicy.label}
            </a>
          </li>
          <li>
            <a href={goustoWebclient.modernSlavery.url} className={css.link}>
              {goustoWebclient.modernSlavery.label}
            </a>
          </li>
        </ul>
      </nav>
      <div className={classnames(css.copyright, typography.fontStyleS)}>
        &copy; Gousto&nbsp;
        {year}
        . All rights reserved.
      </div>
    </LayoutPageWrapper>
  </footer>
)

Footer.propTypes = {
  /**
   * Adds `data-tracking-action` and `data-tracking-property` to some items,
   * which works in the clients which have enabled that way of tracking.
   */
  hasDataTracking: propTypes.bool,
  isAuthenticated: propTypes.bool,
}

Footer.defaultProps = {
  hasDataTracking: false,
  isAuthenticated: false,
}

export { Footer }
