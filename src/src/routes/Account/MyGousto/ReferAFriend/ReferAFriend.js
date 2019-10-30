import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Image from 'Image'
import { Button } from 'goustouicomponents'
import Svg from 'Svg'
import css from './ReferAFriend.css'

const propTypes = {
  referralDetails: PropTypes.instanceOf(Immutable.Map),
}

const defaultProps = {
  referralDetails: Immutable.Map({})
}

const ReferAFriend = ({ referralDetails }) => {
  const { referralCount, referralCredit } = referralDetails && referralDetails.toJS()

  return (
    <div className={css.rafWrapper}>
      <div className={css.rafImageWrapper} />
      <div className={css.rafStampsWrapper}>
        <div className={css.rafStampDetails}>
          <div className={css.rafStamp}>
            <p className={css.rafDetailsValue}>{referralCount}</p>
            <Svg fileName="icon-stamp-full" className={css.iconStamp} />
          </div>
          <p className={css.rafDetailsLabel}>Friends who have signed up using your Gousto referral</p>
        </div>
        <div className={css.rafStampDetails}>
          <div className={css.rafStamp}>
            <p className={css.rafDetailsValue}>£{referralCredit}</p>
            <Svg fileName="icon-stamp-full" className={css.iconStamp} />
          </div>
          <p className={css.rafDetailsLabel}>Gousto credit you&#39;ve earned so far from inviting your friends</p>
        </div>
      </div>
      <div className={css.shareExperience}>
        <h3 className={css.shareHeading}>Share the Gousto experience</h3>
        <p>Refer a friend – and you both save</p>
        <Button>Invite More Friends</Button>
      </div>
    </div>
  )
}

ReferAFriend.propTypes = propTypes
ReferAFriend.defaultProps = defaultProps

export { ReferAFriend }
