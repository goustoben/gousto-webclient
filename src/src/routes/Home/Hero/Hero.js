import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import home from 'config/home'
import config from 'config/routes'
import Content from 'containers/Content'
import typography from 'design-language/typography.css'
import { CTAHomepageContainer } from '../CTA'
import css from './Hero.css'

// ContentKeys have been changed to Keys+"Default" to bypass CMS until CMS is working properly

const Hero = ({ redirect, ctaUri, ctaText, dataTesting, variant, trackGetStarted, isHomePageRedesignEnabled }) => (
  <div
    className={classnames(css[`container--${variant}`], { [css.homepageRedesign]: isHomePageRedesignEnabled })}
    data-testing={dataTesting}
  >
    <div
      className={
        classnames(css[`textContainer--${variant}`])
      }
    >
      <h1 className={classnames(css.header, { [typography.fontStyle4XL]: isHomePageRedesignEnabled })}>
        <Content contentKeys="propositionMainHeadlineDefault">
          <span>{home.hero.header(isHomePageRedesignEnabled)}</span>
        </Content>
      </h1>
      <h2 className={classnames(css.subHeader, { [typography.fontStyleM]: isHomePageRedesignEnabled })}>
        <Content contentKeys="propositionSupportingHeadlineDefault"><span>{home.hero.subheader(isHomePageRedesignEnabled)}</span></Content>
      </h2>
      <div className={css.cta}>
        <CTAHomepageContainer
          width={240}
          onClick={() => {
            redirect(ctaUri)
            trackGetStarted('hero')
          }}
          dataTesting="homepageHeroCTA"
        >
          {ctaText}
        </CTAHomepageContainer>
      </div>
    </div>
    <div className={css.spacer} />
  </div>
)

Hero.propTypes = {
  redirect: PropTypes.func,
  ctaUri: PropTypes.string,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  dataTesting: PropTypes.string,
  variant: PropTypes.string,
  trackGetStarted: PropTypes.func,
  isHomePageRedesignEnabled: PropTypes.bool,
}

Hero.defaultProps = {
  ctaUri: config.client.menu,
  ctaText: home.CTA.main,
  variant: 'default',
  trackGetStarted: () => {},
  isHomePageRedesignEnabled: false,
}

export default Hero
