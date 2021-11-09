import React, { Component } from 'react'
import { Modal, ModalHeader, CTA } from 'goustouicomponents'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { redirect } from 'utils/window'
import { set, get } from 'utils/cookieHelper2'
import { Cookies } from 'utils/GoustoCookies'

import { AppBannerDetails } from 'components/AppBanner'
import { AnimatedImage } from './AnimatedImage/AnimatedImage'

import css from './AppModal.css'

const COOKIE_KEY = 'cookie_app_promotion'
const COOKIE_VALUE = 'dismissed'
const COOKIE_EXPIRY_DAYS = 21

const RENDER_DELAY = 700

class AppModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      renderScheduled: false,
      shouldRender: false,
      shouldRenderImg: false,
    }
  }

  componentDidMount = () => {
    if (this.shouldRenderModal()) {
      this.scheduleRender()
    }
  }

  componentDidUpdate = ({
    isBoxSummaryVisible: prevIsBoxSummaryVisible,
    boxSummaryDismissed: prevBoxSummaryDismissed,
  }) => {
    const { isBoxSummaryVisible, boxSummaryDismissed } = this.props

    if (
      (isBoxSummaryVisible !== prevIsBoxSummaryVisible || boxSummaryDismissed !== prevBoxSummaryDismissed)
      && this.shouldRenderModal()
    ) {
      this.scheduleRender()
    }
  }

  shouldRenderModal = () => {
    const {
      isAppAwarenessEnabled,
      isMobileViewport,
      isAuthenticated,
      isBoxSummaryVisible,
      boxSummaryDismissed
    } = this.props

    let hasSeenModal = true

    if (__CLIENT__) {
      hasSeenModal = get(Cookies, COOKIE_KEY)
    }

    return isAppAwarenessEnabled
      && (!isBoxSummaryVisible || boxSummaryDismissed)
      && isAuthenticated
      && isMobileViewport
      && !hasSeenModal
  }

  scheduleRender = () => {
    const { trackAppModalView } = this.props

    trackAppModalView()

    this.setState(prevState => ({ ...prevState, renderScheduled: true }))

    const scheduleRenderTimeout = setTimeout(() => {
      this.setState(prevState => ({ ...prevState, shouldRender: true }))
    }, RENDER_DELAY)

    const phoneAnimationTimeout = setTimeout(() => {
      this.setState(prevState => ({ ...prevState, shouldRenderImg: true }))
    }, RENDER_DELAY + 100)

    this.timeouts = [scheduleRenderTimeout, phoneAnimationTimeout]
  }

  setModalViewedCookie = () => {
    if (__CLIENT__) {
      set(Cookies, COOKIE_KEY, COOKIE_VALUE, true, COOKIE_EXPIRY_DAYS)
    }
  }

  handleClose = () => {
    this.setState(prevState => ({ ...prevState, shouldRender: false, renderScheduled: false }))
    this.setModalViewedCookie()
  }

  handleCTAClick = () => {
    const { trackClickAppModalInstall } = this.props

    trackClickAppModalInstall()
    redirect(client.appsRedirect)
  }

  componentWillUnmount = () => {
    if (Array.isArray(this.timeouts)) this.timeouts.forEach(clearTimeout)
  }

  render() {
    const { shouldRender, shouldRenderImg, renderScheduled } = this.state
    const { name, ratings } = this.props

    return renderScheduled ? (
      <Modal
        isOpen={shouldRender}
        name="app-promo"
        description="modal promoting app"
        handleClose={this.handleClose}
        variant="fullScreen"
      >
        <ModalHeader>Never miss a menu</ModalHeader>
        <div className={css.container}>
          <div className={css.bodyContainer}>
            <p className={css.bodyText}>
              View our ever changing weekly menu of 50+ recipes right from your pocket
            </p>
          </div>
          <AnimatedImage
            shouldRenderImg={shouldRenderImg}
            name={name}
          />
          <div className={css.fixedToBottom}>
            <div className={css.appBannerDetails}>
              <AppBannerDetails name={name} ratings={ratings} variant="dark" />
            </div>
            <div className={css.ctaContainer}>
              <CTA data-testing="download-link" onClick={this.handleCTAClick} isFullWidth>Download now</CTA>
            </div>
          </div>
        </div>
      </Modal>
    ) : null
  }
}

AppModal.propTypes = {
  isMobileViewport: PropTypes.bool.isRequired,
  boxSummaryDismissed: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
  name: PropTypes.string.isRequired,
  ratings: PropTypes.string.isRequired,
  trackAppModalView: PropTypes.func.isRequired,
  trackClickAppModalInstall: PropTypes.func.isRequired,
  isBoxSummaryVisible: PropTypes.bool,
  isAppAwarenessEnabled: PropTypes.bool,
}

AppModal.defaultProps = {
  isAuthenticated: false,
  isBoxSummaryVisible: false,
  isAppAwarenessEnabled: false
}

export { AppModal }
