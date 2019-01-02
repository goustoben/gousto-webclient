import React from 'react'
import Gel from 'Gel'
import classnames from 'classnames'
import css from './RAFOffer.css'

const RAFOffer = ({ youGet, yourFriendFirstBox, yourFriendFirstMonth, colorOffer }) => {

  return (
    <div className={css.rafOffer}>
      <div>
        <h3>You Get</h3>
        <Gel className={css.rafGel} size="large" color={colorOffer}>
          <div className={css.rafGelContent}>
            <div>{youGet}</div>
            <div>credit</div>
          </div>
        </Gel>
        <p>towards your next box</p>
      </div>
      <div className={css.yourFriendOffer}>
        <h3>Your friends get</h3>
        <div className={css.rafGelOffer}>
          <Gel className={css.rafGel} size="medium" color="black">
            <div className={css.rafGelContentFriends}>
              <div>{yourFriendFirstBox}</div>
              <div>OFF</div>
            </div>
          </Gel>
          <Gel className={css.rafGelPlus} color="white">
            <span>+</span>
          </Gel>
          <Gel className={classnames(css.rafGel, css.rafGelLast)} size="medium" color="black">
            <div className={css.rafGelContentFriends}>
              <div>{yourFriendFirstMonth}</div>
              <div>OFF</div>
            </div>
          </Gel>
        </div>
        <div>
          <p>their first box</p>
          <p>their first month</p>
        </div>
      </div>
    </div>
  )
}

export { RAFOffer }
