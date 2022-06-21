import React, { Component, createRef } from 'react'

import classNames from 'classnames'
import { Heading } from 'goustouicomponents'
import PropTypes from 'prop-types'

import { homeConfig } from 'config/home'
import { HighlightChoiceBanner } from 'routes/Home/HighlightChoice'

import { Benefits } from '../Benefits'
import { CTAHomepageContainer } from '../CTA'

import css from './Hero.css'

class Hero extends Component {
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
    const { ctaUri, ctaText, isAuthenticated } = this.props
    const { isSticky, maxHeight } = this.state
    const className = isHeroCTA
      ? css.stickyContainer
      : classNames(css.mobileStickyInitial, css.mobileStickyRemoval, {
          [css.mobileSticky]: isSticky,
          [css.hideShadow]: maxHeight && isSticky,
        }) // eslint-disable-line indent

    return (
      <div
        className={className}
        style={maxHeight && !isHeroCTA ? { top: `${maxHeight}px` } : {}}
        ref={this.stickyCTARef}
      >
        <CTAHomepageContainer
          ctaUri={ctaUri}
          responsive
          sectionForTracking={isHeroCTA ? 'hero' : 'stickyCTA'}
          dataTesting={isHeroCTA ? 'homepageHeroCTA' : 'stickyCTA'}
        >
          {isSticky && !isHeroCTA && !isAuthenticated ? homeConfig.CTA.stickyCTA : ctaText}
        </CTAHomepageContainer>
        <Benefits byId="noLockIn" />
      </div>
    )
  }

  render() {
    const { dataTesting } = this.props

    return (
      <div className={css.container} data-testing={dataTesting} ref={this.heroRef}>
        <div className={css.textContainer}>
          <div className={css.title}>
            <Heading type="h1" size="fontStyle4XL" hasMargin={false}>
              {homeConfig.hero.header}
              <span className={classNames(css.titleStar)}>*</span>
            </Heading>
          </div>
          <div className={css.subTitle}>
            <Heading type="h2" size="fontStyleL" hasMargin={false}>
              {homeConfig.hero.subheader}
            </Heading>
          </div>

          <HighlightChoiceBanner />

          {this.renderGetStarted(true)}
          <div role="img" aria-label="cooking image" className={css.processImage} />
        </div>
        <div role="img" aria-label="cooking image" className={css.heroImage} />
        {this.renderGetStarted(false)}
      </div>
    )
  }
}

Hero.propTypes = {
  ctaUri: PropTypes.string.isRequired,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  dataTesting: PropTypes.string,
  isAuthenticated: PropTypes.bool,
}

Hero.defaultProps = {
  dataTesting: 'hero',
  isAuthenticated: false,
}

export { Hero }
