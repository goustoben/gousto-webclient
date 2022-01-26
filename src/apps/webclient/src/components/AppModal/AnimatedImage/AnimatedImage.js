import React from 'react'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'

import iphoneImg from 'media/images/app-modal-iphone@2x.png'
import androidImg from 'media/images/app-modal-android@2x.png'

import css from './AnimatedImage.css'

const defaultStyle = {
  transition: 'transform 400ms ease-in-out',
  transform: 'translateY(100%)'
}

const transitionStyles = {
  entering: { transform: 'translateY(0)' },
  entered: { transform: 'translateY(0)' },
  exiting: { transform: 'translateY(100%)' },
  exited: { transform: 'translateY(100%)' },
}

const AnimatedImage = ({ shouldRenderImg, name }) => (
  <div className={css.phoneImgContainer}>
    <Transition in={shouldRenderImg} timeout={250}>
      {state => (
        <img
          className={css.phoneImg}
          src={name === 'iOS' ? iphoneImg : androidImg}
          alt="Gousto app"
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        />
      )}
    </Transition>
  </div>
)

AnimatedImage.propTypes = {
  shouldRenderImg: PropTypes.bool.isRequired,
  name: PropTypes.oneOf(['iOS', 'Android']).isRequired
}

export { AnimatedImage }
