import React from 'react'
import PropTypes from 'prop-types'
import { CTA } from 'goustouicomponents'
import { onEnter } from 'utils/accessibility'
import css from './CTASection.module.css'

export const CTASection = ({ onClick }) => (
  <div className={css.ctaSection}>
    <div className={css.buttonContainer}>
      <CTA
        testingSelector="showcaseMenuCTA"
        onClick={onClick}
        onKeyDown={onEnter(onClick)}
        isFullWidth
      >
        Build my box
      </CTA>
    </div>
  </div>
)

CTASection.propTypes = {
  onClick: PropTypes.func.isRequired,
}
