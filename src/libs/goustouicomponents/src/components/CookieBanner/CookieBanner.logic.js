import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'gousto-config'
import { LayoutPageWrapper } from '../LayoutPageWrapper'
import { LayoutContentWrapper } from '../LayoutContentWrapper'
import { CTA } from '../CTA'
import css from './CookieBanner.module.css'

class CookieBanner extends React.PureComponent {
  constructor(props) {
    super(props)

    const isCookieBannerAccepted = window.localStorage.getItem('isCookieBannerAccepted') === 'true'
    this.state = { isCookieBannerAccepted }
  }

  acceptCookiePolicy = () => {
    window.localStorage.setItem('isCookieBannerAccepted', true)
    this.setState({ isCookieBannerAccepted: true })

    const { onCookieBannerDismissed } = this.props
    if (onCookieBannerDismissed) {
      onCookieBannerDismissed()
    }
  }

  render() {
    const { testingSelector } = this.props
    const { isCookieBannerAccepted } = this.state
    const { url, label } = routes.goustoWebclient.privacyPolicy

    return !isCookieBannerAccepted && (
      <div className={css.wrapper} data-testing={testingSelector}>
        <LayoutPageWrapper padding="large-screens-only">
          <LayoutContentWrapper>
            <div className={css.wrapperContent}>
              <p className={css.copy}>
                We use cookies. By continuing to browse the site you are agreeing to our use of cookies.&nbsp;
                <a className={css.link} href={url}>{label}</a>
              </p>
              <div className={css.cta}>
                <CTA
                  variant="secondary"
                  isDarkTheme
                  size="small"
                  onClick={this.acceptCookiePolicy}
                >
                  OK, I Agree
                </CTA>
              </div>
            </div>
          </LayoutContentWrapper>
        </LayoutPageWrapper>
      </div>
    )
  }
}

CookieBanner.propTypes = {
  testingSelector: PropTypes.string,
  onCookieBannerDismissed: PropTypes.func,
}

CookieBanner.defaultProps = {
  testingSelector: null,
  onCookieBannerDismissed: null,
}

export { CookieBanner }
