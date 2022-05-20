import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { ReactReduxContext } from 'react-redux'
import menuFetchData from 'routes/Menu/fetchData'
import { CTA, seo } from 'config/home'
import routesConfig from 'config/routes'
import { generateHref } from 'Helmet/GoustoHelmet'
import { menuLoadBoxPrices } from 'actions/menu'
import { RibbonTriggerContainer } from 'components/RibbonTrigger'
import { PromoBanner } from './PromoBanner'
import { HomeSections } from './HomeSections'
import { priceComparisonTableToken } from './PriceComparisonTable'

const propTypes = {
  isAuthenticated: PropTypes.bool,
  variant: PropTypes.string,
  redirectLoggedInUser: PropTypes.func,
  isSignupReductionEnabled: PropTypes.bool,
  pricePerServing: PropTypes.string,
}

const defaultProps = {
  variant: 'default',
  isAuthenticated: false,
  redirectLoggedInUser: () => {},
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
    const { redirectLoggedInUser, pricePerServing } = this.props
    redirectLoggedInUser()
    Home.fetchData({ store, options: { pricePerServing } })

    this.prefetchTimer = setTimeout(() => {
      store.dispatch(menuFetchData({ query: {}, params: {} }, false, true))
    }, 500)
  }

  componentWillUnmount() {
    if (this.prefetchTimer) {
      clearTimeout(this.prefetchTimer)
    }
  }

  getModules = (isSignupReductionEnabled) =>
    [
      isSignupReductionEnabled && 'emailForm',
      'hero',
      'trustPilot',
      priceComparisonTableToken,
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
        <RibbonTriggerContainer name="home-page" />
      </div>
    )
  }
}

Home.propTypes = propTypes
Home.defaultProps = defaultProps
Home.contextType = ReactReduxContext

export { Home }
