import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { ReactReduxContext } from 'react-redux'
import menuFetchData from 'routes/Menu/fetchData'
import { CTA, seo } from 'config/home'
import routesConfig from 'config/routes'
import { generateHref } from 'Helmet/GoustoHelmet'
import { menuLoadBoxPrices } from 'actions/menu'
import { PromoBanner } from './PromoBanner'
import { HomeSections } from './HomeSections'
import { useConfig } from '../../containers/ConfigProvider'

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

const ConfigConsumer = () => {
  const config = useConfig()

  return (
    <>
      {typeof config === 'object' ? (
        Object.entries(config).map(([key, val], idx) => (
          <h1 key={`config=${idx}`}>
            {key}: {val}
          </h1>
        ))
      ) : (
        <h1>No config yet</h1>
      )}
    </>
  )
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
        <ConfigConsumer />
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
