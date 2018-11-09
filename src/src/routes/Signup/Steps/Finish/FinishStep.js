import React from 'react'
import moment from 'moment'
import Immutable from 'immutable' /* eslint-disable new-cap */
import { getSlot } from 'utils/deliveries'
import Button from '../../Button'
import basketConfig from 'config/basket'
import css from '../../Signup.css'
import Image from '../../Image'

const formatSlot = (deliveryDays, date, slotId) => {
  const chosenSlot = getSlot(deliveryDays, date, slotId)
  let slotText = ''
  if (chosenSlot) {
    slotText = `${moment(`${date} ${chosenSlot.get('deliveryStartTime')}`).format('ha')} and ${moment(`${date} ${chosenSlot.get('deliveryEndTime')}`).format('ha')}`
  }

  return slotText
}

const formatDate = date => `${moment(date).format('dddd [the] Do [of] MMM')}`

const DefaultBody = ({ boxSummaryDeliveryDays, date, numPortions, postcode, slotId }) => (
	<div className={css.body}>
		<h1 className={css.heading}>All set</h1>
		<p className={css.bodyText}>
			Now choose recipes for your {numPortions}-person box, to arrive {formatDate(date)} between {formatSlot(boxSummaryDeliveryDays, date, slotId)} at {postcode}
		</p>
	</div>
)

const FamilyBody = ({ boxSummaryDeliveryDays, date, numPortions, postcode, slotId }) => (
	<div className={css.body}>
		<h1 className={css.heading}>
			The best box for you is the
			<div className={css.headingHilight}>
				{basketConfig.boxTypes[numPortions]} Box
			</div>
		</h1>
		<p className={css.bodyText}>
			Delivered {formatDate(date)}, between {formatSlot(boxSummaryDeliveryDays, date, slotId)} to {postcode}.
			<br />
			You can change your delivery day & address on our menu.
		</p>
	</div>
)

const FinishStep = ({ style = 'default', next, ...bodyProps }) => {
  const handleClick = () => {
    next()
  }

  return (
		<div className={css.stepContainer} data-testing="signupFinishStep">
			<div className={css.fullWidth}>
				<div className={css.regularHeader}>
					<Image name="all-set" />
				</div>
				{style === 'family' ? FamilyBody(bodyProps) : DefaultBody(bodyProps)}
			</div>
			<div className={css.footer}>
				<div className={css.inputContainer}>
					<Button
					  data-testing="signupFinishCTA"
					  fill
					  onClick={handleClick}
					  width="full"
					/>
				</div>
			</div>
		</div>
  )
}

DefaultBody.propTypes = {
  boxSummaryDeliveryDays: React.PropTypes.instanceOf(Immutable.Map),
  date: React.PropTypes.string,
  slotId: React.PropTypes.string,
  postcode: React.PropTypes.string,
  numPortions: React.PropTypes.number,
}

FamilyBody.propTypes = {
  boxSummaryDeliveryDays: React.PropTypes.instanceOf(Immutable.Map),
  date: React.PropTypes.string,
  slotId: React.PropTypes.string,
  postcode: React.PropTypes.string,
  numPortions: React.PropTypes.number,
}

FinishStep.propTypes = {
  boxSummaryDeliveryDays: React.PropTypes.instanceOf(Immutable.Map),
  date: React.PropTypes.string,
  slotId: React.PropTypes.string,
  postcode: React.PropTypes.string,
  numPortions: React.PropTypes.number,
  next: React.PropTypes.func,
  style: React.PropTypes.string,
}

export default FinishStep
