import React from 'react'
import Gel from 'Gel'
import classnames from 'classnames'
import css from './YourFriendGets.css'

const YourFriendGets = ({ yourFriendFirstBox, yourFriendFirstMonth }) => {
  return (
    <div className={css.yourFriendOffer}>
      <h3>Your friends get</h3>
      <div className={css.rafGelOffer}>
        <Gel className={css.rafGel} size="medium" color="black">
          <div className={css.rafGelContent}>
            <div>{yourFriendFirstBox}</div>
            <div>OFF</div>
          </div>
        </Gel>
        <Gel className={css.rafGelPlus} color="white">
          <span>+</span>
        </Gel>
        <Gel className={classnames(css.rafGel, css.rafGelLast)} size="medium" color="black">
          <div className={css.rafGelContent}>
            <div>{yourFriendFirstMonth}</div>
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
}

export { YourFriendGets }
