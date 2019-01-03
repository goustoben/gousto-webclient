import React from 'react'
import css from './RAFOffer.css'
import { YouGet } from './YouGet.js'
import { YourFriendGets } from './YourFriendGets.js'

const RAFOffer = ({ youGet, yourFriendFirstBox, yourFriendFirstMonth, colorOffer }) => {

  return (
    <div className={css.rafOffer}>
      <YouGet youGet={youGet} colorOffer={colorOffer} />
      <YourFriendGets yourFriendFirstBox={yourFriendFirstBox} yourFriendFirstMonth={yourFriendFirstMonth} />
    </div>
  )
}

export { RAFOffer }
