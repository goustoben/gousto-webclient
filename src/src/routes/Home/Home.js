import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

import menuFetchData from 'routes/Menu/fetchData'
import home from 'config/home'
import routes from 'config/routes'
import { generateHref } from 'Helmet/GoustoHelmet'
import { PromoBanner } from './PromoBanner'
import HomeSections from './HomeSections'

class Home extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static propTypes = {
    moduleOrder: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    variant: PropTypes.string,
    redirectLoggedInUser: PropTypes.func,
    isSignupReductionEnabled: PropTypes.bool,
    isHomePageRedesignEnabled: PropTypes.bool,
  }

  static defaultProps = {
    variant: 'default',
    isSignupReductionEnabled: false,
    isHomePageRedesignEnabled: false,
  }

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

  getModules() {
    const { moduleOrder } = this.props

    if (moduleOrder) {
      return moduleOrder.split(',')
    }

    return this.defaultModules()
  }

  defaultModules() {
    const { isAuthenticated, isHomePageRedesignEnabled } = this.props
    if (isAuthenticated && !isHomePageRedesignEnabled) {
      return [
        'hero', 'howItWorks', 'subscription', 'recipes',
        'whatsInYourBox', 'testimonials',
        'testedAndLovedBy',
      ]
    }

    if (isHomePageRedesignEnabled) {
      return [
        'hero', 'trustPilot', 'whyChooseGousto', 'joeWicks', 'recipes'
      ]
    }

    return [
      'hero', 'howItWorks', 'subscription', 'recipes',
      'whatsInYourBox', 'emailForm', 'testimonials',
      'testedAndLovedBy',
    ]
  }

  render() {
    const { isAuthenticated, variant, isSignupReductionEnabled, isHomePageRedesignEnabled } = this.props
    const modules = this.getModules()
    let ctaUri
    let ctaText

    if (isAuthenticated) {
      ctaUri = routes.client.menu
      ctaText = isHomePageRedesignEnabled ? home.CTA.loggedIn.mainRedesign : home.CTA.loggedIn.main
    } else {
      ctaUri = routes.client.signup
      ctaText = isHomePageRedesignEnabled ? home.CTA.mainRedesign : home.CTA.main
    }

    const link = [
      (variant !== 'default') ? {
        rel: 'canonical',
        href: generateHref(routes.client.home),
      } : null
    ].filter(item => Boolean(item))

    return (
      <span>
        <Helmet
          title="Recipe Boxes | Get Fresh Food &amp; Recipes Delivered | Gousto"
          meta={[
            {
              name: 'description',
              content: 'Change the way you eat with our easy to follow recipes. We deliver fresh boxes of ingredients and delicious recipes 7 days a week. Get started now!',
            },
            {
              name: 'keywords',
              content: 'Gousto, recipe delivery, ingredients, fresh, healthy food, cooking, recipe box',
            },
          ]}
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
          isSignupReductionEnabled={isSignupReductionEnabled}
          isHomePageRedesignEnabled={isHomePageRedesignEnabled}
          modules={modules}
          testimonials={{
            ctaUri,
            ctaText,
          }}
          hero={{
            ctaUri,
            ctaText,
            dataTesting: 'hero',
            variant,
            isHomePageRedesignEnabled,
            isAuthenticated,
          }}
          recipes={{
            ctaUri,
            ctaText,
          }}
          whatsInYourBox={{
            ctaUri,
            ctaText,
          }}
          howItWorks={{
            variant,
          }}
          whyChooseGousto={{
            ctaUri,
            ctaText,
          }}
        />
      </span>
    )
  }
}

export default Home
