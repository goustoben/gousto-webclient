import PropTypes from 'prop-types'
import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import Content from 'containers/Content'
import { CTAHomepageContainer } from '../CTA'
import css from './Hero2.css'

const Hero = ({ ctaUri, ctaText, dataTesting }) => (
  <div className={css.container} data-testing={dataTesting}>
    <div className={css.textContainer}>
      <h1 className={css.header}>
        <Content contentKeys="propositionMainHeadline"><span>{home.hero.header}</span></Content>
      </h1>
      <h2 className={css.subHeader}>
        <Content contentKeys="propositionSupportingHeadline"><span>{home.hero.subheader}</span></Content>
      </h2>
      <CTAHomepageContainer
        width={240}
        ctaUri={ctaUri}
        align="left"
        responsive
        dataTesting="homepageHeroCTA"
      >
        {ctaText}
      </CTAHomepageContainer>
    </div>
  </div>
)

Hero.propTypes = {
  ctaUri: PropTypes.string,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  dataTesting: PropTypes.string,
}

Hero.defaultProps = {
  ctaUri: config.client.menu,
  ctaText: home.CTA.main,
}

export default Hero
