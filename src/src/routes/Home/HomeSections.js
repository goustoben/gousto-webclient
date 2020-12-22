import PropTypes from 'prop-types'
import React, { Component } from 'react'
import homeConfig from 'config/home'
import routesConfig from 'config/routes'
import { Hero } from './Hero'
import { Carousel } from './Carousel'
import { TrustPilot } from './TrustPilot'
import { WhyChooseGousto } from './WhyChooseGousto'
import { JoeWicks } from './JoeWicks'

const propTypes = {
  modules: PropTypes.arrayOf(PropTypes.string),
  ctaUri: PropTypes.string,
  ctaText: PropTypes.string,
  isAuthenticated: PropTypes.bool,
}

const defaultProps = {
  modules: ['hero', 'trustPilot', 'whyChooseGousto', 'joeWicks', 'recipes'],
  ctaUri: routesConfig.client.menu,
  ctaText: homeConfig.CTA.text,
  isAuthenticated: false,
}

class HomeSections extends Component {
  mapModules = () => {
    const { isAuthenticated } = this.props

    return {
      hero: (props) => <Hero ctaText={props.ctaText} ctaUri={props.ctaUri} isAuthenticated={isAuthenticated} />,
      trustPilot: () => <TrustPilot />,
      whyChooseGousto: (props) => <WhyChooseGousto ctaText={props.ctaText} ctaUri={props.ctaUri} />,
      joeWicks: () => <JoeWicks />,
      recipes: (props) => <Carousel ctaText={props.ctaText} ctaUri={props.ctaUri} />,
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
      ctaText
    })

    return (
      <section
        key={order}
        data-module-name={name}
      >
        {mappedModules[name](componentProps)}
      </section>
    )
  }

  render() {
    const { modules } = this.props

    return (
      <div>
        {modules.map((name, order) => this.renderModule(name, order))}
      </div>
    )
  }
}

HomeSections.propTypes = propTypes
HomeSections.defaultProps = defaultProps

export {
  HomeSections
}
