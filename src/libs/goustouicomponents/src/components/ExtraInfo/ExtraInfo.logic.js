import React from 'react'
import AirbnbPropTypes from 'airbnb-prop-types'
import css from './ExtraInfo.module.css'

const propTypes = {
  children: AirbnbPropTypes.or([
    AirbnbPropTypes.componentWithName('ExtraInfoMain'),
    AirbnbPropTypes.componentWithName('ExtraInfoSecondary'),
  ]).isRequired,
}

const ExtraInfo = ({ children }) => (<div className={css.wrapper}>{children}</div>)

ExtraInfo.propTypes = propTypes

export {
  ExtraInfo,
}
