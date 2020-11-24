import PropTypes from 'prop-types'
import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import { ModuleHeaderContainer } from 'ModuleHeader'
import css from './InYourBox.css'
import { CTAHomepageContainer } from '../CTA'

const InYourBox = ({ inverse, ctaText, ctaUri }) => (
  <div className={css.container}>
    <div className={inverse ? css.inverseContent : css.content}>
      <ModuleHeaderContainer>It starts with a box</ModuleHeaderContainer>
      <p className={css.bodyText}>{home.inYourBox.subheading}</p>
      <ul className={css.list}>
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
}

InYourBox.defaultProps = {
  ctaText: home.CTA.main,
  ctaUri: config.client.signup,
  inverse: false,
}

export { InYourBox }
