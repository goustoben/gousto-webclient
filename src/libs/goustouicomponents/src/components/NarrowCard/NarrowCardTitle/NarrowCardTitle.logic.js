import React from 'react'
import PropTypes from 'prop-types'
import css from './NarrowCardTitle.module.css'

const propTypes = {
  imageSrc: PropTypes.string,
  children: PropTypes.node.isRequired,
}

const defaultProps = {
  imageSrc: null,
}

const NarrowCardTitle = ({ imageSrc, children }) => (
  <div className={css.title}>
    { imageSrc && <img className={css.image} alt="" src={imageSrc} /> }
    <span className={css.titleText}>{children}</span>
  </div>
)

NarrowCardTitle.propTypes = propTypes
NarrowCardTitle.defaultProps = defaultProps

export {
  NarrowCardTitle,
}
