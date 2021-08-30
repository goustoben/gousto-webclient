import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './SectionHeader.css'

export const SectionHeader = ({ title, subtitle }) => (
  <div className={css.sectionContainer}>
    <div className={classNames(css.sectionTitle, { [css.hasMargin]: subtitle })}>{title}</div>
    {subtitle && <p className={css.sectionSubtitle}>{subtitle}</p>}
  </div>
)

SectionHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

SectionHeader.defaultProps = {
  subtitle: '',
}
