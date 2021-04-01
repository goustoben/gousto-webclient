import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { TextFrame } from './TextFrame'
import desktopImage from './assets/desktop-image.jpg'
import topImage from './assets/mobile-tablet-top.jpg'
import bottomImage from './assets/tablet-bottom.jpg'
import css from './SellThePropositionPage.css'

export const SellThePropositionPage = ({ signupGoToMenu }) => (
  <div data-testing="sellThePropositionPage">
    <div className={css.mobileContainer}>
      <img className={css.image} src={topImage} alt="Sample dishes offered by Gousto" />
      <TextFrame
        signupGoToMenu={signupGoToMenu}
        isFullWidth
        ctaTestingSelector="sellThePropositionCTA_mobile"
      />
      <img
        className={classNames(css.image, css.bottomImage)}
        src={bottomImage}
        alt="More sample dishes offered by Gousto"
      />
    </div>
    <div className={css.desktopContainer}>
      <div className={css.column}>
        <img className={css.image} src={desktopImage} alt="Sample dishes offered by Gousto" />
      </div>
      <div className={css.column}>
        <TextFrame
          signupGoToMenu={signupGoToMenu}
          isFullWidth={false}
          ctaTestingSelector="sellThePropositionCTA_desktop"
        />
      </div>
    </div>
  </div>
)

SellThePropositionPage.propTypes = {
  signupGoToMenu: PropTypes.func.isRequired,
}
