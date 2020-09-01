import React from 'react'
import PropTypes from 'prop-types'
import config from 'config'
import { AppStoreLinks } from 'components/AppStoreLinks'
import { HeadingWithSeparator } from '../HeadingWithSeparator'
import css from './LoginMobile.css'

const defaultProps = {
  showAppAwareness: false,
  isHelpPreLoginOpen: false,
}
const propTypes = {
  children: PropTypes.node.isRequired,
  isHelpPreLoginOpen: PropTypes.bool,
  showAppAwareness: PropTypes.bool,
}

const LoginMobile = ({ children, isHelpPreLoginOpen, showAppAwareness }) => {
  const { appStoreId, playStoreId } = config.apps

  return (
    <div>
      {children}
      {(showAppAwareness && !isHelpPreLoginOpen) && (
        <div className={css.appStoreLinksContainer}>
          <HeadingWithSeparator position="top">
            Download the App
          </HeadingWithSeparator>
          <AppStoreLinks appStoreId={appStoreId} playStoreId={playStoreId} />
        </div>
      )}
    </div>
  )
}

LoginMobile.defaultProps = defaultProps
LoginMobile.propTypes = propTypes

export {
  LoginMobile
}
