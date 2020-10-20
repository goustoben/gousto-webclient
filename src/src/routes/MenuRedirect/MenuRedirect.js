import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { onEnter } from 'utils/accessibility'
import Image from 'components/Image'
import { Heading, CTA } from 'goustouicomponents'
import { clickGetStartedOnMenu2, clickLoginOnMenu2 } from 'actions/trackingKeys'
import { client } from 'config/routes'

import css from './MenuRedirect.css'

import desktopImage from './images/desktop.png'
import mobileTop from './images/mobile-top.png'
import mobileBottom from './images/mobile-bottom.png'

class MenuRedirect extends PureComponent {
  openLoginModal = (e) => {
    const { isAuthenticated, loginVisibilityChange, trackLoginClick } = this.props

    if (!isAuthenticated) {
      e.stopPropagation()
      loginVisibilityChange(true)
      trackLoginClick(clickLoginOnMenu2)
    }
  }

  redirectToWizard = () => {
    const { trackGetStarted } = this.props
    trackGetStarted(clickGetStartedOnMenu2)
    browserHistory.push(client.signup)
  }

  render() {
    const { device } = this.props

    return (
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.desktopImage}>
            <Image media={desktopImage} size={0} />
          </div>
          <div className={css.mobileImage}>
            <Image media={mobileTop} size={0} />
          </div>
          <div className={css.hungrySection}>
            <Heading size="fontStyle3XL">Hungry, are we?</Heading>
            <p className={css.subTitle}>To see our full range of mouth-watering recipes, we’ll need to you to answer a few quick questions.</p>

            <div className={css.startButton}>
              <CTA
                size="medium"
                onClick={this.redirectToWizard}
                isFullWidth={device === 'mobile'}
              >
                Get started
              </CTA>
            </div>

            <p className={css.haveAnAccount}>
              Already have an account?
              &nbsp;
              <span
                role="button"
                tabIndex={0}
                className={css.loginButton}
                onClick={this.openLoginModal}
                onKeyDown={onEnter(this.openLoginModal)}
              >
                Log in
              </span>
            </p>
          </div>
          <div className={css.mobileImage}>
            <Image className={css.mobileImage} media={mobileBottom} size={0} />
          </div>
        </div>
      </div>
    )
  }
}

MenuRedirect.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loginVisibilityChange: PropTypes.func.isRequired,
  device: PropTypes.string.isRequired,
  trackGetStarted: PropTypes.func.isRequired,
  trackLoginClick: PropTypes.func.isRequired,
}

export { MenuRedirect }
