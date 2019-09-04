import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

import actions from 'actions'
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
    enableStorystream: PropTypes.bool,
    moduleOrder: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    variant: PropTypes.string,
    redirectLoggedInUser: PropTypes.func,
    nddFeature: PropTypes.bool
  }

  static defaultProps = {
    variant: 'default',
  }

  static fetchData({ store }) {
    return store.dispatch(actions.homeLoadCarousel())
  }

  componentDidMount() {
    const store = this.context.store
    const { redirectLoggedInUser } = this.props
    redirectLoggedInUser()

    this.prefetchTimer = setTimeout(() => {
      menuFetchData({ store, query: {}, params: {} }, false, true)
    }, 500)

    Home.fetchData({ store })
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
    if (this.props.isAuthenticated) {
      return [
        'hero', 'howItWorks', 'subscription', 'recipes',
        'whatsInYourBox', 'testimonials',
        'testedAndLovedBy',
      ]
    }

    return [
      'hero', 'howItWorks', 'subscription', 'recipes',
      'whatsInYourBox', 'emailForm', 'testimonials',
      'testedAndLovedBy',
    ]
  }

  render() {
    const { isAuthenticated, enableStorystream, variant } = this.props
    const modules = this.getModules()
    let ctaUri
    let ctaText

    if (isAuthenticated) {
      ctaUri = routes.client.menu
      ctaText = home.CTA.loggedIn.main
    } else {
      ctaUri = routes.client.signup
      ctaText = home.CTA.main
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
              content: 'Our award-winning food boxes make home cooking simple and tasty. We deliver fresh ingredients and delicious recipes 7 days a week. Get started now!',
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
        <div>{ this.props.nddFeature }</div>
        <HomeSections
          modules={modules}
          testimonials={{
            ctaUri,
            ctaText,
            enableStorystream,
          }}
          hero={{
            ctaUri,
            ctaText,
            dataTesting: 'hero',
            variant,
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
        />
      </span>
    )
  }
}

export default Home
