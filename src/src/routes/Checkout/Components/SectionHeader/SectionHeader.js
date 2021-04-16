import React from 'react'
import PropTypes from 'prop-types'
import css from './SectionHeader.css'

export const SectionHeader = ({ title }) => <div className={css.sectionContainer}>{title}</div>

SectionHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}
