import PropTypes from 'prop-types'
import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import Content from 'containers/Content'
import { CTAHomepageContainer } from '../CTA'
import css from './Hero.css'

// ContentKeys have been changed to Keys+"Default" to bypass CMS until CMS is working properly

const Hero = ({ ctaUri, ctaText, dataTesting, variant }) => (
  <div
    className={css[`container--${variant}`]}
    data-testing={dataTesting}
  >
    <div className={css[`textContainer--${variant}`]}>
      <h1 className={css.header}>
        <Content contentKeys="propositionMainHeadlineDefault">
          <span>{home.hero.header}</span>
        </Content>
      </h1>
      <h2 className={css.subHeader}>
        <Content contentKeys="propositionSupportingHeadlineDefault">
          <span>{home.hero.subheader}</span>
        </Content>
      </h2>
      <div className={css.cta}>
        <CTAHomepageContainer
          width={240}
          ctaUri={ctaUri}
          sectionForTracking="hero"
          dataTesting="homepageHeroCTA"
        >
          {ctaText}
        </CTAHomepageContainer>
      </div>
      <div className={css.noLockIn}>
        <div className={css.lockInIcon} />
        <div className={css.lockSign}>
          <span className={css.lockInBold}>No lock in. </span>
          Pause or cancel anytime
        </div>
      </div>
    </div>
    <div className={css.spacer} />
  </div>
)

Hero.propTypes = {
  ctaUri: PropTypes.string,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  dataTesting: PropTypes.string,
  variant: PropTypes.string,
}

Hero.defaultProps = {
  ctaUri: config.client.menu,
  ctaText: home.CTA.main,
  variant: 'default',
}

export default Hero
