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
}

const defaultProps = {
  variant: 'default',
  isAuthenticated: false,
  redirectLoggedInUser: () => {},
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

  getModules = () => ['hero', 'trustPilot', 'whyChooseGousto', 'joeWicks', 'recipes']

  render() {
    const { isAuthenticated, variant } = this.props
    const modules = this.getModules()
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
