import React from 'react'
import PropTypes from 'prop-types'
import Gel from 'Gel'
import classnames from 'classnames'
import css from './YourFriendGets.module.css'

const YourFriendGets = ({ yourFriendFirstBoxOffer, yourFriendFirstMonthOffer }) => (
  <div className={css.yourFriendOffer}>
    <h3 className={css.yourFriendOfferTitle}>Your friends get</h3>
    <div className={css.rafGelOffer}>
      <Gel className={css.rafGel} size="medium" color="black">
        <div className={css.rafGelContent}>
          <div>{yourFriendFirstBoxOffer}</div>
          <div>OFF</div>
        </div>
      </Gel>
      <Gel className={css.rafGelPlus} color="white">
        <span>+</span>
      </Gel>
      <Gel className={classnames(css.rafGel, css.rafGelLast)} size="medium" color="black">
        <div className={css.rafGelContent}>
          <div>{yourFriendFirstMonthOffer}</div>
          <div>OFF</div>
        </div>
      </Gel>
    </div>
    <div className={css.yourFriendLabels}>
      <p>their first box</p>
      <p>their first month</p>
    </div>
  </div>
)

const propTypes = {
  yourFriendFirstBoxOffer: PropTypes.string,
  yourFriendFirstMonthOffer: PropTypes.string,
}

const defaultProps = {
  yourFriendFirstBoxOffer: '',
  yourFriendFirstMonthOffer: '',
}

YourFriendGets.propTypes = propTypes
YourFriendGets.defaultProps = defaultProps

export { YourFriendGets }
