import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { ReactReduxContext } from 'react-redux'
import { CTA, seo } from 'config/home'
import routesConfig from 'config/routes'
import { generateHref } from 'Helmet/GoustoHelmet'
import { menuLoadBoxPrices } from 'actions/menu'
import { PromoBanner } from './PromoBanner'
import { HomeSections } from './HomeSections'
import { fetchMenuForCarousel } from './homeActions'

const propTypes = {
  isAuthenticated: PropTypes.bool,
  variant: PropTypes.string,
  isSignupReductionEnabled: PropTypes.bool,
  pricePerServing: PropTypes.string,
}

const defaultProps = {
  variant: 'default',
  isAuthenticated: false,
  isSignupReductionEnabled: false,
  pricePerServing: null,
}

class Home extends Component {
  static fetchData = async ({ store, options = {} }) => {
    const { pricePerServing } = options
    if (!pricePerServing) {
      await store.dispatch(menuLoadBoxPrices())
    }
  }

  componentDidMount() {
    const { store } = this.context
    const { pricePerServing } = this.props
    Home.fetchData({ store, options: { pricePerServing } })

    // requestIdleCallback is not supported on Safari:
    // https://caniuse.com/?search=requestidlecallback.  For the browsers that
    // do support it, we delay loading recipes because it's not critical for
    // page rendering.
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        store.dispatch(fetchMenuForCarousel())
      })
    } else {
      store.dispatch(fetchMenuForCarousel())
    }
  }

  getModules = (isSignupReductionEnabled) =>
    [
      isSignupReductionEnabled && 'emailForm',
      'hero',
      'trustPilot',
      'whyChooseGousto',
      'joeWicks',
      'recipes',
    ].filter(Boolean)

  render() {
    const { isAuthenticated, variant, isSignupReductionEnabled, pricePerServing } = this.props
    const modules = this.getModules(isSignupReductionEnabled)
    const { menu, signup, home } = routesConfig.client
    let ctaUri = signup
    let ctaText = CTA.text

    if (isAuthenticated) {
      ctaUri = menu
      ctaText = CTA.loggedIn.text
    }

    const link = variant !== 'default' ? [{ rel: 'canonical', href: generateHref(home) }] : []

    return (
      <div>
        <Helmet
          title={seo.title}
          meta={seo.meta}
          link={link}
          style={[
            {
              cssText: `
              #react-root {
                height: 100%;
              }
            `,
            },
          ]}
        />
        <PromoBanner />
        <HomeSections
          modules={modules}
          ctaUri={ctaUri}
          ctaText={ctaText}
          isAuthenticated={isAuthenticated}
          isSignupReductionEnabled={isSignupReductionEnabled}
          pricePerServing={pricePerServing}
        />
      </div>
    )
  }
}

Home.propTypes = propTypes
Home.defaultProps = defaultProps
Home.contextType = ReactReduxContext

export { Home }
