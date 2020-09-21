import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import home from 'config/home'
import config from 'config/routes'
import { ModuleHeaderContainer } from 'ModuleHeader'
import typography from 'design-language/typography.css'
import css from './InYourBox.css'
import { CTAHomepageContainer } from '../CTA'

const { subheading, subheadingRedesign } = home.inYourBox

const InYourBox = ({ inverse, ctaText, ctaUri, isHomePageRedesignEnabled }) => (
  <div className={classNames(css.container, { [css.homepageRedesign]: isHomePageRedesignEnabled })}>
    <div className={inverse ? css.inverseContent : css.content}>
      <ModuleHeaderContainer>It starts with a box</ModuleHeaderContainer>
      <p className={classNames(
        css.bodyText,
        { [typography.fontStyleBody]: isHomePageRedesignEnabled },
        { [typography.fontWeightBold]: isHomePageRedesignEnabled })}
      >
        {isHomePageRedesignEnabled ? subheadingRedesign : subheading}
      </p>
      <ul className={classNames(css.list, { [typography.fontStyleBody]: isHomePageRedesignEnabled })}>
        <li className={css.listItem}>
          <span className={css.tick} />
          Precise ingredients (no food waste)
        </li>
        <li className={css.listItem}>
          <span className={css.tick} />
          Quality produce from trusted suppliers
        </li>
        <li className={css.listItem}>
          <span className={css.tick} />
          100% British fresh meat
        </li>
        <li className={css.listItem}>
          <span className={css.tick} />
          Easy to follow recipe cards
        </li>
        <li className={css.listItem}>
          <span className={css.tick} />
          Meals for 2 or 4 people
        </li>
      </ul>
      <CTAHomepageContainer
        width={240}
        ctaUri={ctaUri}
        sectionForTracking="boxdescription"
        buttonContainer={false}
      >
        {ctaText}
      </CTAHomepageContainer>
    </div>
  </div>
)

InYourBox.propTypes = {
  inverse: PropTypes.bool,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  ctaUri: PropTypes.string,
  isHomePageRedesignEnabled: PropTypes.bool
}

InYourBox.defaultProps = {
  ctaText: home.CTA.main,
  ctaUri: config.client.signup,
  inverse: false,
  isHomePageRedesignEnabled: false
}

export { InYourBox }
