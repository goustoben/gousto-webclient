import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import config from 'config'
import { getWindow, redirect } from 'utils/window'
import { LoadingOverlay } from 'Loading'
import css from './Page.css'

const imageUrl = require('media/photos/gousto-share-box.jpg')

class Page extends React.PureComponent {
  static COVID_19_LINK = 'https://cook.gousto.co.uk/coronavirus-3'

  componentDidMount() {
    const { isSignupReductionEnabled, disabled, isAuthenticated, email, loginVisibilityChange, goustoReference, trackUserAttributes } = this.props
    const { location } = getWindow()

    if (isSignupReductionEnabled) {
      redirect(Page.COVID_19_LINK)
    }

    if (!disabled && isAuthenticated && email) {
      this.updateDataLayer(email, goustoReference)
    }

    if (location && location.hash && location.hash.includes('login') && !isAuthenticated) {
      loginVisibilityChange(true)
    }
    trackUserAttributes()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isSignupReductionEnabled) {
      redirect(Page.COVID_19_LINK)
    }

    if (!nextProps.disabled && nextProps.isAuthenticated) {
      if (!nextProps.email) {
        this.fetchData()
      } else {
        this.updateDataLayer(nextProps.email, nextProps.goustoReference)
      }
    }
  }

  updateDataLayer = (email, goustoReference) => {
    const { dataLayer } = getWindow()
    if (dataLayer && Array.isArray(dataLayer)) {
      dataLayer.push({ email, goustoReference })
    }
  }

  fetchData = () => {
    const { isAuthenticated, email, disabled, userLoadData } = this.props

    if (isAuthenticated && !email && !disabled) {
      return userLoadData()
    }

    return new Promise(resolve => { resolve() })
  }

  render() {
    const { contentFetchPending, children } = this.props

    return (
      <span>
        <div className={classnames(css.container, contentFetchPending ? css.blurStyle : '')}>
          <Helmet
            title={config.template.head.title}
            meta={[
              {
                name: 'description',
                content: config.template.head.description,
              },
              {
                name: 'keywords',
                content: config.template.head.keywords,
              },
              {
                name: 'twitter:image',
                content: imageUrl,
              },
              {
                name: 'twitter:description',
                content: config.template.head.title,
              },
              {
                name: 'twitter:title',
                content: config.template.head.title,
              },
            ]}
          />
          {children}
        </div>
        {contentFetchPending && <div className={css.loadingContainer}><LoadingOverlay /></div>}
      </span>
    )
  }
}

Page.propTypes = {
  children: PropTypes.object.isRequired,
  email: PropTypes.string,
  goustoReference: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  loginVisibilityChange: PropTypes.func.isRequired,
  contentFetchPending: PropTypes.bool.isRequired,
  isSignupReductionEnabled: PropTypes.bool,
  trackUserAttributes: PropTypes.func.isRequired,
  userLoadData: PropTypes.func.isRequired,
}

Page.defaultProps = {
  isSignupReductionEnabled: false,
  email: null,
  goustoReference: null,
}

export default Page
