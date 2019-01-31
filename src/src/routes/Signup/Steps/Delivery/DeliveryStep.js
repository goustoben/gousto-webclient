import Immutable from 'immutable' /* eslint-disable new-cap */
import React from 'react'
import moment from 'moment'
import DropdownInput from 'Form/Dropdown'

import ModalPanel from 'Modal/ModalPanel'
import Overlay from 'Overlay'
import Button from '../../Button'
import { Button as GoustoButton } from 'goustouicomponents'

import deliverySlot from '../../../../utils/deliverySlot'

import signupCss from '../../Signup.css'
import css from './DeliveryStep.css'
import Image from '../../Image'
import Svg from 'Svg'

const formatTime = (deliveryStartTime, deliveryEndTime, tempDate) => (
  tempDate ? `${moment(`${tempDate} ${deliveryStartTime}`).format('ha')} - ${moment(`${tempDate} ${deliveryEndTime}`).format('ha')} ` : ''
)

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

const DeliveryStep = ({ boxSummaryDeliveryDays, tempDate, setTempDate, tempSlotId, setTempSlotId, boxSummaryDeliverySlotChosen, menuFetchDataPending, nextDayDeliveryPaintedDoorFeature, numPortions, isNDDPaintedDoorOpened, openNDDPaintedDoor, closeNDDPaintedDoor, next }) => {
  let { slots, deliveryDays } = getDeliveryDaysAndSlots(boxSummaryDeliveryDays, tempDate)

  if (nextDayDeliveryPaintedDoorFeature) {
    const nextDayDeliveryDays = createNextDayDeliveryDays()
    deliveryDays = [...nextDayDeliveryDays, ...deliveryDays]
    slots = {...generateNextDatDeliverySlots(nextDayDeliveryDays), ...slots}
    // createNextDayDeliveryDays().map(day => slots[day.date] = [{ label: "8AM - 7PM", subLabel: "", value: "NULL", coreSlotId: "NULL" }])
  }

  const onTempDateChange = (date) => {
    setTempDate(date)
    if (slots[date]) {
      const slotId = slots[date][0].value
      setTempSlotId(slotId)
    }
  }

  const onShowRecipe = () => {
    if (slots[tempDate][0]["coreSlotId"] === "NULL") {
      openNDDPaintedDoor()
    } else {
      boxSummaryDeliverySlotChosen({
        date: tempDate,
        slotId: tempSlotId,
      }).then(next)
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
					  onClick={onShowRecipe}
					  pending={menuFetchDataPending}
					/>
				</div>
			</div>
      <Overlay open={isNDDPaintedDoorOpened} from="top">
        <ModalPanel className={css.modal} closePortal={closeNDDPaintedDoor}>
          <h2>Express delivery is coming soon</h2>
          <div className={css.modalrow}>
            <p>We're working on speeding up our deliveries.</p>
          </div>
          <div className={css.modalrow}>
            <p>Please help us improve and tell us which statement you agree with:</p>
          </div>
          <div className={css.modalrow}>
            <input className={css.radio} name="ndd" value="true" type="radio" />
            <label className={css.label}>Next day delivery is very important to me</label>
          </div>
          <div className={css.modalrow}>
            <input className={css.radio} name="ndd" value="false" type="radio" />
            <label className={css.label}>I am OK with 3 day delivery</label>
          </div>
          <div className={css.iconDeliverySection}>
            <Svg fileName="icon-delivery" className={css.iconDelivery} />
          </div>
          <GoustoButton width="full" onClick={closeNDDPaintedDoor}>Back to delivery options</GoustoButton>
        </ModalPanel>
      </Overlay>
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
  isNDDPaintedDoorOpened: React.PropTypes.bool,
  openNDDPaintedDoor: React.PropTypes.func,
  closeNDDPaintedDoor: React.PropTypes.func,
  next: React.PropTypes.func,
}

const isAfterCutoff = () => moment().hours() >= 12

const generateNextDatDeliverySlots = nextDayDeliveryDays => {
  const slots = {}
  nextDayDeliveryDays.map(day => {
    slots[day.date] = [{ label: "8AM - 7PM", subLabel: "", value: "NULL", coreSlotId: "NULL" }]
  })

  return slots
}

export const createNextDayDeliveryDays = () => {

  const dayOffSet = isAfterCutoff() ? 2 : 1

  return [
    {
      date: deliverySlot.formatNextDayDeliveryDayDate(dayOffSet),
      value: deliverySlot.formatNextDayDeliveryDayDate(dayOffSet),
      disable: false,
      label: `${deliverySlot.formatNextDayDeliveryDayLabel(dayOffSet)} £2.99`
    },
    {
      date: deliverySlot.formatNextDayDeliveryDayDate(dayOffSet + 1),
      value: deliverySlot.formatNextDayDeliveryDayDate(dayOffSet + 1),
      disable: false,
      label: `${deliverySlot.formatNextDayDeliveryDayLabel(dayOffSet + 1)} £1.99`
    }
  ]
}
//
// class DeliveryStepPaintedDoor extends React.PureComponent {
//
//
//   render() {
//     return (
//       <Overlay open={isNDDPaintedDoorOpened} from="top">
//         <ModalPanel>
//           <div><h1>Hi</h1></div>
//         </ModalPanel>
//       </Overlay>
//     )
//   }
// }

export default DeliveryStep
