import PropTypes from 'prop-types'
import React, { Component, createRef } from 'react'
import classNames from 'classnames'
import home from 'config/home'
import config from 'config/routes'
import { Heading } from 'goustouicomponents'
import { CTAHomepageContainer } from '../CTA'
import css from './Hero2.css'
import { NoLockIn } from '../NoLockIn'

class Hero2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSticky: false,
      maxHeight: 0,
    }
    this.heroRef = createRef()
    this.stickyCTARef = createRef()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll = ({ hero = this.heroRef, CTA = this.stickyCTARef }) => {
    const heroSection = hero.current
    const stickyCTA = CTA.current
    let isSticky = false

    if (window.pageYOffset > heroSection.offsetHeight + heroSection.offsetTop) {
      isSticky = true
    }

    const lastSection = heroSection.parentNode.parentNode.lastChild
    const { bottom } = lastSection.getBoundingClientRect()
    const sectionHeight = this.getStickyContainerHeight(isSticky, bottom, stickyCTA)

    lastSection.style.marginBottom = sectionHeight || '0px'

    this.setState({
      isSticky,
      maxHeight: sectionHeight ? bottom : 0,
    })
  }

  getStickyContainerHeight = (isSticky, bottom, stickyCTA) => {
    if (isSticky && bottom < window.innerHeight) {
      return `${stickyCTA.clientHeight}px`
    }

    return false
  }

  renderGetStarted = (isHeroCTA) => {
    const { ctaUri, ctaText } = this.props
    const { isSticky, maxHeight } = this.state
    const className = isHeroCTA
      ? css.stickyContainer
      : classNames(css.mobileStickyInitial, css.mobileStickyRemoval, {
        [css.mobileSticky]: isSticky,
      })

    return (
      <div
        className={className}
        style={maxHeight && !isHeroCTA ? { top: `${maxHeight}px`, bottom: 'auto' } : {}}
        ref={this.stickyCTARef}
      >
        <CTAHomepageContainer
          ctaUri={ctaUri}
          responsive
          sectionForTracking={isHeroCTA ? 'hero' : 'stickyCTA'}
          dataTesting="homepageHeroCTA"
        >
          {isSticky && !isHeroCTA ? 'Get started with 30% off' : ctaText}
        </CTAHomepageContainer>
        <NoLockIn />
      </div>
    )
  }

  render() {
    const { dataTesting } = this.props

    return (
      <div className={css.container} data-testing={dataTesting} ref={this.heroRef}>
        <div className={css.textContainer}>
          <div className={css.title}>
            <Heading type="h1" size="fontStyle4XL" hasMargin={false}>Endless choice in a recipe box</Heading>
          </div>
          <div className={css.subTitle}>
            <Heading type="h2" size="fontStyleL" hasMargin={false}>Over 50 recipes every week</Heading>
          </div>
          {this.renderGetStarted(true)}
          <div className={css.processImage} />
        </div>
        <div className={css.heroImage} />
        {this.renderGetStarted(false)}
      </div>
    )
  }
}

Hero2.propTypes = {
  ctaUri: PropTypes.string,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  dataTesting: PropTypes.string,
}

Hero2.defaultProps = {
  ctaUri: config.client.menu,
  ctaText: home.CTA.main,
  dataTesting: '',
}

export {
  Hero2
}
