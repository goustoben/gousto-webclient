import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { set } from 'utils/cookieHelper2'
import home from 'config/home'
import routes from 'config/routes'
import Cookies from 'utils/GoustoCookies'
import Home from "../Home/Home"
import HomeSections from "../Home/HomeSections"

class Join extends Home {

	static propTypes = {
	  ...Home.propTypes,
	  enableSubscription: PropTypes.bool,
	  heroLeftAlignedBox570: PropTypes.bool,
	  browser: PropTypes.string,
	}
	static defaultProps = {
	  ...Home.defaultProps,
	  enableSubscription: false,
	  heroLeftAlignedBox570: false,
	  browser: '',
	  simpleHeader: () => {},
	}

	static fetchData = Home.fetchData

	componentWillMount() {
	  if (__CLIENT__) {
	    const joinCookieValue = 'join'
	    set(Cookies, 'from_join', joinCookieValue)
	    this.props.simpleHeader(joinCookieValue)
	  }
	}

	defaultModules() {
	  return [
	    'hero', 'howItWorks', 'subscription', 'recipes',
	    'testimonials', 'whatsInYourBox',
	    'testedAndLovedBy',
	  ]
	}

	getAvailableModules() {
	  const { enableSubscription, moduleOrder } = this.props

	  const manualListOfModules = (moduleOrder) ? moduleOrder.split(',') : []
	  const modulesFeatured = {
	    subscription: enableSubscription,
	  }
	  const modules = this.getModules()

	  return modules.filter((moduleName) => {
	    if (
	      modulesFeatured[moduleName] !== undefined &&
				manualListOfModules.indexOf(moduleName) === -1
	    ) {
	      return modulesFeatured[moduleName]
	    }

	    return moduleName
	  })
	}

	render() {
	  const modules = this.getAvailableModules()

	  return (
			<span>
				<Helmet
				  title="Food Boxes | Get Fresh Food &amp; Ingredients Delivered | Gousto"
				  meta={[
				    {
				      name: 'description',
				      content: 'Choose recipes and get fresh ingredients delivered to your door. Our award-winning food boxes include FREE delivery. Enjoy a new menu each week!',
				    },
				    {
				      name: 'keywords',
				      content: 'Gousto, recipe delivery, ingredients, fresh, healthy food, cooking',
				    },
				  ]}
				  style={[{
				    cssText: `
							#react-root {
								height: 100%;
							}
						`,
				  }]}
				/>

				<HomeSections
				  modules={modules}
				  testimonials={{
				    enableStorystream: this.props.enableStorystream,
				    showLink: false,
				    ctaText: home.CTA.join,
				  }}
				  hero={{
				    ctaUri: routes.client.signup,
				    ctaText: home.CTA.join,
				  }}
				  alternativeDesktopHero={this.props.heroLeftAlignedBox570 && this.props.browser === 'desktop'}
				  recipes={{
				    ctaUri: routes.client.signup,
				    ctaText: home.CTA.join,
				  }}
				  whatsInYourBox={{
				    ctaUri: routes.client.signup,
				    ctaText: home.CTA.join,
				  }}
				/>
			</span>
	  )
	}
}

export default Join
