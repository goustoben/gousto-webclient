import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import config from 'config'
import actions from 'actions'
import { trackUserAttributes } from 'actions/tracking'
import { getWindow } from 'utils/window'
import { LoadingOverlay } from 'Loading'
import css from './Page.css'

const imageUrl = require('media/photos/gousto-share-box.jpg')

class Page extends React.PureComponent {

  static propTypes = {
    children: PropTypes.object.isRequired,
    email: PropTypes.string,
    goustoReference: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    loginVisibilityChange: PropTypes.func.isRequired,
    contentFetchPending: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static fetchData = ({ store }) => {
    const state = store.getState()
    if (state.auth.get('isAuthenticated') && !state.user.get('email') && !state.auth.get('isAdmin')) {
      return store.dispatch(actions.userLoadData())
    }

    return new Promise(resolve => { resolve() })
  }

  componentDidMount() {
    if (!this.props.disabled && this.props.isAuthenticated && this.props.email) {
      this.updateDataLayer(this.props.email, this.props.goustoReference)
    }
    const location = getWindow().location

    if (location && location.hash && location.hash.includes('login') && !this.props.isAuthenticated) {
      this.props.loginVisibilityChange(true)
    }
    this.context.store.dispatch(trackUserAttributes())
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.disabled && nextProps.isAuthenticated) {
      if (!nextProps.email) {
        Page.fetchData({ store: this.context.store })
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

  render() {
    return (
      <span>
        <div className={classnames(css.container, this.props.contentFetchPending ? css.blurStyle : '')}>
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
          {this.props.children}
        </div>
        {this.props.contentFetchPending && <div className={css.loadingContainer}><LoadingOverlay /></div>}
      </span>
    )
  }
}

export default Page
