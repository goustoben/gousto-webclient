import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import css from './ReferAFriend.css'

const propTypes = {
  referralDetails: PropTypes.instanceOf(Immutable.Map),
}

const defaultProps = {
  referralDetails: Immutable.Map({})
}

const ReferAFriend = ({ referralDetails }) => (
  <div className={css.rafWrapper}>

  </div>
)

ReferAFriend.propTypes = propTypes
ReferAFriend.defaultProps = defaultProps

export { ReferAFriend }
