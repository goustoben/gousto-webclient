import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import menuFetchData from 'routes/Menu/fetchData'
import homeConfig from 'config/home'
import routesConfig from 'config/routes'
import { generateHref } from 'Helmet/GoustoHelmet'
import { PromoBanner } from './PromoBanner'
import { HomeSections } from './HomeSections'

const contextTypes = {
  store: PropTypes.instanceOf(Object).isRequired,
}

const propTypes = {
  isAuthenticated: PropTypes.bool,
  variant: PropTypes.string,
  redirectLoggedInUser: PropTypes.func,
  isSignupReductionEnabled: PropTypes.bool,
}

const defaultProps = {
  variant: 'default',
  isAuthenticated: false,
  redirectLoggedInUser: () => {},
  isSignupReductionEnabled: false,
}

class Home extends Component {
  componentDidMount() {
    const { store } = this.context
    const { redirectLoggedInUser } = this.props
    redirectLoggedInUser()

    this.prefetchTimer = setTimeout(() => {
      store.dispatch(menuFetchData({ query: {}, params: {} }, false, true))
    }, 500)
  }

  componentWillUnmount() {
    if (this.prefetchTimer) {
      clearTimeout(this.prefetchTimer)
    }
  }

  getModules = (isSignupReductionEnabled) => [(isSignupReductionEnabled && 'emailForm'), 'hero', 'trustPilot', 'whyChooseGousto', 'joeWicks', 'recipes'].filter(Boolean)

  render() {
    const { isAuthenticated, variant, isSignupReductionEnabled } = this.props
    const modules = this.getModules(isSignupReductionEnabled)
    const { menu, signup, home } = routesConfig.client
    const { CTA, seo } = homeConfig
    let ctaUri = signup
    let ctaText = CTA.text

    if (isAuthenticated) {
      ctaUri = menu
      ctaText = CTA.loggedIn.text
    }

    const link = [
      (variant !== 'default') ? {
        rel: 'canonical',
        href: generateHref(home),
      } : null
    ].filter(item => Boolean(item))

    return (
      <div>
        <Helmet
          title={seo.title}
          meta={seo.meta}
          link={link}
          style={[{
            cssText: `
              #react-root {
                height: 100%;
              }
            `,
          }]}
        />
        <PromoBanner />
        <HomeSections
          modules={modules}
          ctaUri={ctaUri}
          ctaText={ctaText}
          isAuthenticated={isAuthenticated}
          isSignupReductionEnabled={isSignupReductionEnabled}
        />
      </div>
    )
  }
}

Home.propTypes = propTypes
Home.defaultProps = defaultProps
Home.contextTypes = contextTypes

export {
  Home
}
