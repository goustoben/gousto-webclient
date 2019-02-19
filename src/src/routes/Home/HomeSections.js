import PropTypes from 'prop-types'
import React, { Component } from 'react'
import config from 'config/home'
import classnames from 'classnames'
import Hero from './Hero'
import Hero2 from './Hero2'
import Carousel from './Carousel'
import Testimonials from './Testimonials'
import HowItWorks from './HowItWorks'
import Subscription from './Subscription'
import InYourBox from './InYourBox'
import TestedLoved from './TestedLoved'
import EmailForm from './EmailForm'
import css from './Home.css'

class HomeSections extends Component {

	static propTypes = {
	  modules: PropTypes.arrayOf(PropTypes.string),
	  hero: PropTypes.object,
	  recipes: PropTypes.object,
	  testimonials: PropTypes.object,
	  howItWorks: PropTypes.object,
	  subscription: PropTypes.object,
	  whatsInYourBox: PropTypes.object,
	  testedAndLovedBy: PropTypes.object,
	  alternativeDesktopHero: PropTypes.bool,
	};
	static defaultProps = {
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
	};

	modules = {
	  hero: props => (this.props.alternativeDesktopHero ? <Hero2 {...props} /> : <Hero {...props} />),
	  recipes: props => <Carousel {...props} />,
	  testimonials: props => <Testimonials {...props} />,
	  howItWorks: props => <HowItWorks {...props} />,
	  subscription: props => <Subscription {...props} />,
	  whatsInYourBox: props => <InYourBox {...props} />,
	  testedAndLovedBy: props => <TestedLoved {...props} />,
	  emailForm: props => <EmailForm {...props} />,
	}

	renderModule(name, order) {
	  let module = null

	  if (this.modules[name]) {
	    if (name.includes('hero')) {
	      const componentProps = this.props[name] || {}
	      module = <section key={order} className={css.heroSection} data-module-name={name}>{this.modules[name](componentProps)}</section>
	    } else {
	      const inverse = order % 2 !== 0
	      const moduleConfig = config[name] || {}
	      moduleConfig.inverse = inverse
	      const componentProps = Object.assign(moduleConfig, this.props[name] || {})
	      module = (
					<div key={order} className={classnames(css.sectionContainer, css[`${name}-container`])}>
						<section className={classnames(inverse ? css.inverseSection : css.section, css[`${name}-section`])} data-module-name={name}>
							{this.modules[name](componentProps)}
						</section>
					</div>
	      )
	    }
	  }

	  return module
	}

	render() {
	  return (
			<span>
				{this.props.modules.map((name, order) => this.renderModule(name, order))}
			</span>
	  )
	}
}

export default HomeSections
