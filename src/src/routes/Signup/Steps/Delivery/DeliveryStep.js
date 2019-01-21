import Immutable from 'immutable' /* eslint-disable new-cap */
import React from 'react'
import moment from 'moment'
import DropdownInput from 'Form/Dropdown'
import Button from '../../Button'

import signupCss from '../../Signup.css'
import css from './DeliveryStep.css'
import Image from '../../Image'

const formatTime = (deliveryStartTime, deliveryEndTime, tempDate) => (
  tempDate ? `${moment(`${tempDate} ${deliveryStartTime}`).format('ha')} - ${moment(`${tempDate} ${deliveryEndTime}`).format('ha')} ` : ''
)

const isAfterCutoff = () => moment().hours() >= 12

const createNextDayDeliveryDays = () => {

  const dayOffSet = isAfterCutoff ? 2 : 1

  return [
    {
      date: moment().add(dayOffSet , 'day').format('YYYY-MM-DD'),
      value: moment().add(dayOffSet , 'day').format('YYYY-MM-DD'),
      disable: false,
      label: `${moment().add(dayOffSet, 'day').format('ddd D MMM')} £2.99`
    },
    {
      date: moment().add(dayOffSet + 1, 'day').format('YYYY-MM-DD'),
      value: moment().add(dayOffSet + 1, 'day').format('YYYY-MM-DD'),
      disable: false,
      label: `${moment().add(dayOffSet + 1, 'day').format('ddd D MMM')} £2.99`
    }
  ]
}

const getDeliveryDaysAndSlots = (boxSummaryDeliveryDays, tempDate) => {
  const slots = {}
  const deliveryDays = boxSummaryDeliveryDays.map((dd) => {
    const date = dd.get('date')
    slots[date] = dd.get('slots').map(slot => ({
      label: formatTime(slot.get('deliveryStartTime'), slot.get('deliveryEndTime'), tempDate),
      subLabel: (slot.get('deliveryPrice') === '0.00') ? 'Free' : `£${slot.get('deliveryPrice')}`,
      value: slot.get('id'),
      coreSlotId: slot.get('coreSlotId'),
    })).toArray()

    let disabled = dd.get('alternateDeliveryDay') !== null
    disabled = (dd && dd.get('alternateDeliveryDay') !== null)

    return { date, value: date, disabled, label: moment(date).format('ddd D MMM') }
  })
    .toArray()
    .sort((a, b) => moment.utc(a.value).diff(moment.utc(b.value)))

  return { slots, deliveryDays }
}

const DeliveryStep = ({ boxSummaryDeliveryDays, tempDate, setTempDate, tempSlotId, setTempSlotId, boxSummaryDeliverySlotChosen, menuFetchDataPending, nextDayDeliveryPaintedDoorFeature, next }) => {
  let { slots, deliveryDays } = getDeliveryDaysAndSlots(boxSummaryDeliveryDays, tempDate)

  if (nextDayDeliveryPaintedDoorFeature) {
    deliveryDays = [...createNextDayDeliveryDays(), ...deliveryDays]
    createNextDayDeliveryDays().map(day => slots[day.date] = [{ label: "8AM - 7PM", subLabel: "FREE", value: "NULL", coreSlotId: "NULL" }])
  }

  const onTempDateChange = (date) => {
    setTempDate(date)
    if (slots[date]) {
      const slotId = slots[date][0].value
      setTempSlotId(slotId)
    }
  }

  return (
		<span className={signupCss.stepContainer} data-testing="signupDeliveryStep">
			<div className={signupCss.fullWidth}>
				<div className={signupCss.header}>
					<Image name="delivery-day" />
					<h1 className={signupCss.heading}>Which delivery day would you like?</h1>
				</div>
				<div className={signupCss.body}>
					<div className={css.container}>
						<div className={css.row}>
							<div className={css.left} data-testing="signupDeliveryDay">
								<DropdownInput
								  color="secondary"
								  uppercase
								  className={css.dropdown}
								  options={deliveryDays}
								  onChange={onTempDateChange}
								  value={tempDate}
								/>
							</div>
							<div className={css.right} data-testing="signupDeliveryTime">
								<DropdownInput
								  color="secondary"
								  uppercase
								  options={slots[tempDate] ? slots[tempDate] : []}
								  onChange={setTempSlotId}
								  value={tempSlotId}
								/>
							</div>
						</div>
					</div>
					<p className={signupCss.bodyText}>
						Our insulated box and ice packs help keep your food cool. And if you're not home, we can leave your box in your chosen safe place.
					</p>
				</div>
			</div>
			<div className={signupCss.footer}>
				<div className={signupCss.inputContainer}>
					<Button
					  data-testing="signupDeliveryCTA"
					  disabled={!tempDate || !tempSlotId}
					  width="full"
					  onClick={() => (
					    boxSummaryDeliverySlotChosen({
					      date: tempDate,
					      slotId: tempSlotId,
					    }).then(next)
					  )}
					  pending={menuFetchDataPending}
					/>
				</div>
			</div>
		</span>
  )
}

DeliveryStep.propTypes = {
  boxSummaryDeliveryDays: React.PropTypes.instanceOf(Immutable.Map),
  tempDate: React.PropTypes.string,
  tempSlotId: React.PropTypes.string,
  setTempDate: React.PropTypes.func,
  setTempSlotId: React.PropTypes.func,
  boxSummaryDeliverySlotChosen: React.PropTypes.func,
  menuFetchDataPending: React.PropTypes.bool,
  nextDayDeliveryPaintedDoorFeature: React.PropTypes.bool,
  next: React.PropTypes.func,
}

export default DeliveryStep
