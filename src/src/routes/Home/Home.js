import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import menuFetchData from 'routes/Menu/fetchData'
import { CTA, seo } from 'config/home'
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
  pricePerServing: PropTypes.string,
  updatePricePerServing: PropTypes.func,
  isCarouselShiftEnabled: PropTypes.bool,
}

const defaultProps = {
  variant: 'default',
  isAuthenticated: false,
  redirectLoggedInUser: () => {},
  isSignupReductionEnabled: false,
  pricePerServing: null,
  updatePricePerServing: () => {},
  isCarouselShiftEnabled: false,
}

class Home extends Component {
  componentDidMount() {
    const { store } = this.context
    const { redirectLoggedInUser, updatePricePerServing } = this.props
    redirectLoggedInUser()
    updatePricePerServing()

    this.prefetchTimer = setTimeout(() => {
      store.dispatch(menuFetchData({ query: {}, params: {} }, false, true))
    }, 500)
  }

  componentWillUnmount() {
    if (this.prefetchTimer) {
      clearTimeout(this.prefetchTimer)
    }
  }

  getModules = (isSignupReductionEnabled, isCarouselShiftEnabled) =>
    [
      isSignupReductionEnabled && 'emailForm',
      'hero',
      'trustPilot',
      'whyChooseGousto',
      isCarouselShiftEnabled ? 'recipes' : 'joeWicks',
      isCarouselShiftEnabled ? 'joeWicks' : 'recipes',
    ].filter(Boolean)

  render() {
    const {
      isAuthenticated,
      variant,
      isSignupReductionEnabled,
      pricePerServing,
      isCarouselShiftEnabled,
    } = this.props
    const modules = this.getModules(isSignupReductionEnabled, isCarouselShiftEnabled)
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
          isCarouselShiftEnabled={isCarouselShiftEnabled}
        />
      </div>
    )
  }
}

Home.propTypes = propTypes
Home.defaultProps = defaultProps
Home.contextTypes = contextTypes

export { Home }
