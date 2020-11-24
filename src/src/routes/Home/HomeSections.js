import PropTypes from 'prop-types'
import React, { Component } from 'react'
import config from 'config/home'
import classnames from 'classnames'
import Hero from './Hero'
import { Hero2 } from './Hero2'
import { Carousel } from './Carousel'
import Testimonials from './Testimonials'
import { HowItWorks } from './HowItWorks'
import { Subscription } from './Subscription'
import { InYourBox } from './InYourBox'
import TestedLoved from './TestedLoved'
import { EmailForm } from './EmailForm'
import { TrustPilot } from './TrustPilot'
import { WhyChooseGousto } from './WhyChooseGousto'
import { JoeWicks } from './JoeWicks'
import css from './Home.css'

const propTypes = {
  modules: PropTypes.arrayOf(PropTypes.string),
  hero: PropTypes.objectOf(PropTypes.object),
  recipes: PropTypes.objectOf(PropTypes.object),
  testimonials: PropTypes.objectOf(PropTypes.object),
  howItWorks: PropTypes.objectOf(PropTypes.object),
  subscription: PropTypes.objectOf(PropTypes.object),
  whatsInYourBox: PropTypes.objectOf(PropTypes.object),
  testedAndLovedBy: PropTypes.objectOf(PropTypes.object),
  alternativeDesktopHero: PropTypes.bool,
  isSignupReductionEnabled: PropTypes.bool,
  isHomePageRedesignEnabled: PropTypes.bool,
}

const defaultProps = {
  modules: [
    'hero', 'howItWorks', 'subscription', 'recipes',
    'whatsInYourBox', 'emailForm', 'testimonials',
    'testedAndLovedBy',
  ],
  hero: {},
  recipes: {},
  testimonials: {},
  howItWorks: {},
  subscription: {},
  whatsInYourBox: {},
  testedAndLovedBy: {},
  alternativeDesktopHero: false,
  isSignupReductionEnabled: false,
  isHomePageRedesignEnabled: false,
}

class HomeSections extends Component {
  modules = {
    hero: props => (props.isHomePageRedesignEnabled ? <Hero2 {...props} /> : <Hero {...props} />),
    recipes: props => <Carousel {...props} />,
    testimonials: props => <Testimonials {...props} />,
    howItWorks: props => <HowItWorks {...props} />,
    subscription: props => <Subscription {...props} />,
    whatsInYourBox: props => <InYourBox {...props} />,
    testedAndLovedBy: props => <TestedLoved {...props} />,
    emailForm: props => <EmailForm {...props} />,
    trustPilot: () => <TrustPilot />,
    whyChooseGousto: props => <WhyChooseGousto {...props} />,
    joeWicks: () => <JoeWicks />,
  }

  renderModule(name, order) {
    let module = null
    const { [name]: sectionProps } = this.props

    if (this.modules[name]) {
      if (name.includes('hero')) {
        const componentProps = sectionProps || {}
        module = <section key={order} className={css.heroSection} data-module-name={name}>{this.modules[name](componentProps)}</section>
      } else {
        const inverse = order % 2 === 0
        const moduleConfig = config[name] || {}
        moduleConfig.inverse = inverse
        const componentProps = Object.assign(moduleConfig, sectionProps || {})
        module = (
          <div key={order} className={classnames(css.sectionContainer, css[`${name}-container`])}>
            <section
              className={
                classnames(
                  css[`${name}-section`],
                  {
                    [css.inverseSection]: inverse,
                    [css.section]: !inverse,
                    [css.inverseSectionSignupOverride]: name === 'howItWorks',
                  }
                )
              }
              data-module-name={name}
            >
              {this.modules[name](componentProps)}
            </section>
          </div>
        )
      }
    }

    return module
  }

  renderRedesignModule = (name, order) => {
    if (!this.modules[name]) {
      return null
    }

    const moduleConfig = config[name] || {}
    const { [name]: sectionProps } = this.props
    const componentProps = Object.assign(moduleConfig, sectionProps || {})

    return (
      <section
        key={order}
        className={css[name]}
        data-module-name={name}
      >
        {this.modules[name](componentProps)}
      </section>
    )
  }

  render() {
    const { modules, isHomePageRedesignEnabled } = this.props

    return (
      <span>
        {modules.map((name, order) => (
          isHomePageRedesignEnabled ? this.renderRedesignModule(name, order) : this.renderModule(name, order))
        )}
      </span>
    )
  }
}

HomeSections.propTypes = propTypes
HomeSections.defaultProps = defaultProps

export default HomeSections
