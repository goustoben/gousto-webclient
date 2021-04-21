import PropTypes from 'prop-types'
import React, { Component } from 'react'
import homeConfig from 'config/home'
import routesConfig from 'config/routes'
import { Hero } from './Hero'
import { Carousel } from './Carousel'
import { TrustPilot } from './TrustPilot'
import { WhyChooseGousto } from './WhyChooseGousto'
import { JoeWicks } from './JoeWicks'
import { EmailForm } from './EmailForm'

const propTypes = {
  modules: PropTypes.arrayOf(PropTypes.string),
  ctaUri: PropTypes.string,
  ctaText: PropTypes.string,
  pricePerServing: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isSignupReductionEnabled: PropTypes.bool,
  isCarouselShiftEnabled: PropTypes.bool,
  isHomePageFlexibilityMessageEnabled: PropTypes.bool,
}

const defaultProps = {
  modules: ['hero', 'trustPilot', 'whyChooseGousto', 'joeWicks', 'recipes'],
  ctaUri: routesConfig.client.menu,
  ctaText: homeConfig.CTA.text,
  isAuthenticated: false,
  isSignupReductionEnabled: false,
  pricePerServing: null,
  isCarouselShiftEnabled: false,
  isHomePageFlexibilityMessageEnabled: false,
}

class HomeSections extends Component {
  mapModules = () => {
    const {
      isAuthenticated,
      isSignupReductionEnabled,
      pricePerServing,
      isCarouselShiftEnabled,
      isHomePageFlexibilityMessageEnabled,
    } = this.props

    return {
      hero: (props) => (
        <Hero
          ctaText={props.ctaText}
          ctaUri={props.ctaUri}
          isAuthenticated={isAuthenticated}
          isHomePageFlexibilityMessageEnabled={isHomePageFlexibilityMessageEnabled}
        />
      ),
      trustPilot: () => <TrustPilot />,
      whyChooseGousto: (props) => (
        <WhyChooseGousto
          ctaText={props.ctaText}
          ctaUri={props.ctaUri}
          pricePerServing={pricePerServing}
        />
      ),
      joeWicks: () => <JoeWicks isCarouselShiftEnabled={isCarouselShiftEnabled} />,
      recipes: (props) => (
        <Carousel
          ctaText={props.ctaText}
          ctaUri={props.ctaUri}
          isCarouselShiftEnabled={isCarouselShiftEnabled}
        />
      ),
      ...(isSignupReductionEnabled ? { emailForm: () => <EmailForm /> } : {}),
    }
  }

  renderModule = (name, order) => {
    const mappedModules = this.mapModules()
    if (!mappedModules[name]) {
      return null
    }

    const moduleConfig = homeConfig[name] || {}
    const { ctaUri, ctaText } = this.props
    const componentProps = Object.assign(moduleConfig, {
      ctaUri,
      ctaText,
    })

    return (
      <section key={order} data-module-name={name}>
        {mappedModules[name](componentProps)}
      </section>
    )
  }

  render() {
    const { modules } = this.props

    return <div>{modules.map((name, order) => this.renderModule(name, order))}</div>
  }
}

HomeSections.propTypes = propTypes
HomeSections.defaultProps = defaultProps

export { HomeSections }
