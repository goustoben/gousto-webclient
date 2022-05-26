import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { homeConfig } from 'config/home'
import routesConfig from 'config/routes'

import { Carousel } from './Carousel'
import { EmailForm } from './EmailForm'
import { Hero } from './Hero'
import { JoeWicks } from './JoeWicks'
import { PriceComparisonTable } from './PriceComparisonTable'
import { TrustPilot } from './TrustPilot'
import { WhyChooseGousto } from './WhyChooseGousto'

const propTypes = {
  modules: PropTypes.arrayOf(PropTypes.string),
  ctaUri: PropTypes.string,
  ctaText: PropTypes.string,
  pricePerServing: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isSignupReductionEnabled: PropTypes.bool,
}

const defaultProps = {
  modules: ['hero', 'trustPilot', 'whyChooseGousto', 'joeWicks', 'recipes'],
  ctaUri: routesConfig.client.menu,
  ctaText: homeConfig.CTA.text,
  isAuthenticated: false,
  isSignupReductionEnabled: false,
  pricePerServing: null,
}

class HomeSections extends Component {
  mapModules = () => {
    const { isAuthenticated, isSignupReductionEnabled, pricePerServing } = this.props

    /**
     * FYI:
     * This lint disabling required to pass lint
     * lint suggesting to wrap components in React.memo,
     * but with it page not rendering correctly
     * TODO: refactor this component with tests in future tec10
     * TICKET: https://gousto.atlassian.net/browse/TG-6505
     */
    return {
      // eslint-disable-next-line react/no-unstable-nested-components
      hero: (props) => (
        <Hero ctaText={props.ctaText} ctaUri={props.ctaUri} isAuthenticated={isAuthenticated} />
      ),
      // eslint-disable-next-line react/no-unstable-nested-components
      trustPilot: () => <TrustPilot />,
      // eslint-disable-next-line react/no-unstable-nested-components
      priceComparisonTable: () => <PriceComparisonTable />,
      // eslint-disable-next-line react/no-unstable-nested-components
      whyChooseGousto: (props) => (
        <WhyChooseGousto
          ctaText={props.ctaText}
          ctaUri={props.ctaUri}
          pricePerServing={pricePerServing}
        />
      ),
      // eslint-disable-next-line react/no-unstable-nested-components
      joeWicks: () => <JoeWicks />,
      // eslint-disable-next-line react/no-unstable-nested-components
      recipes: (props) => <Carousel ctaText={props.ctaText} ctaUri={props.ctaUri} />,
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
