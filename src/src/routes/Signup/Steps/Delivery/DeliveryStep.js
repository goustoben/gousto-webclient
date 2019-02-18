import Immutable from 'immutable'
import PropTypes from 'prop-types'
/* eslint-disable new-cap */
import React from 'react'
import moment from 'moment'
import DropdownInput from 'Form/Dropdown'

import ModalPanel from 'Modal/ModalPanel'
import Overlay from 'Overlay'
import { createNextDayDeliveryDays, generateNextDayDeliverySlots, getDateOffset } from 'utils/deliverySlot'
import { Button as GoustoButton } from 'goustouicomponents'
import Button from '../../Button'

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

const DeliveryStep = ({ 
  boxSummaryDeliveryDays,
  tempDate,
  setTempDate,
  tempSlotId,
  setTempSlotId,
  boxSummaryDeliverySlotChosen,
  menuFetchDataPending,
  nextDayDeliveryPaintedDoorFeature,
  next,
  trackDeliveryDayDropDownOpened,
  trackDeliveryDayDropDownClosed,
  trackDeliverySlotDropDownOpened,
  trackDeliveryDayEdited,
  trackDeliverySlotEdited,
  isNDDPaintedDoorOpened,
  openNDDPaintedDoor,
  closeNDDPaintedDoor,
  trackDeliveryPreferenceModalViewed,
  trackDeliveryPreferenceModalClosed,
  trackDeliveryPreferenceSelected
}) => {
  let { slots, deliveryDays } = getDeliveryDaysAndSlots(boxSummaryDeliveryDays, tempDate)

  if (nextDayDeliveryPaintedDoorFeature) {
    const nextDayDeliveryDays = createNextDayDeliveryDays()
    deliveryDays = [...nextDayDeliveryDays, ...deliveryDays]
    slots = { ...generateNextDayDeliverySlots(nextDayDeliveryDays), ...slots }
  }

  const onTempDateChange = date => {
    // If the date value has changed
    if (date !== tempDate) {
      // Track the edit
      const slotId = slots[date] ? slots[date][0].value : null
      trackDeliveryDayEdited(date, getDateOffset(date), slotId)
    }

    setTempDate(date)
    if (slots[date]) {
      const slotId = slots[date][0].value
      setTempSlotId(slotId)
    }
  }

  const isNDDSlotSelected = () => slots[tempDate][0]["coreSlotId"] === "NULL"

  const onShowRecipe = () => {
    if (isNDDSlotSelected()) {
      openNDDPaintedDoor()
      trackDeliveryPreferenceModalViewed(tempDate, getDateOffset(tempDate), tempSlotId)
    } else {
      boxSummaryDeliverySlotChosen({
        date: tempDate,
        slotId: tempSlotId,
      }).then(next)
    }
  }

  const onTempSlotChange = slotId => {
    // If the slot id has changed
    if (slotId !== tempSlotId) {
      // Track the edit
      trackDeliverySlotEdited(tempDate, getDateOffset(tempDate), slotId)
    }
    setTempSlotId(slotId)
  }

  const onDayDropdownOpen = e => {
    trackDeliveryDayDropDownOpened(tempDate, getDateOffset(tempDate), tempSlotId)
  }

  const onDayDropdownClose = e => {
    trackDeliveryDayDropDownClosed(tempDate, getDateOffset(tempDate), tempSlotId)
  }

  const onSlotDropdownOpen = e => {
    trackDeliverySlotDropDownOpened(tempDate, getDateOffset(tempDate), tempSlotId)
  }

  const onPopupClose = () => {
    const answer = document.querySelector('[name="ndd"]:checked') ? document.querySelector('[name="ndd"]:checked').value : ''
    trackDeliveryPreferenceModalClosed(tempDate, getDateOffset(tempDate), tempSlotId, answer)
    closeNDDPaintedDoor()
  }

  const onClickNddPreference = event => {
    if (event.target.checked) {
      trackDeliveryPreferenceSelected(tempDate, getDateOffset(tempDate), tempSlotId, event.target.value)
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
                  onOpen={onDayDropdownOpen}
                  onClose={onDayDropdownClose}
                />
              </div>
              <div className={css.right} data-testing="signupDeliveryTime">
                <DropdownInput
                  color="secondary"
                  uppercase
                  options={slots[tempDate] ? slots[tempDate] : []}
                  onChange={onTempSlotChange}
                  value={tempSlotId}
                  onOpen={onSlotDropdownOpen}
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
        <ModalPanel className={css.modal} closePortal={onPopupClose}>
          <div className={css.modalTitleDiv}>
            <h2 className={css.modalFirstTitle}>We're working on speeding
              <span>up our deliveries</span>
            </h2>
          </div>
          <div className={css.modalrow}>
            <p>The delivery date you selected isn't available yet but we would love to get your feedback about deliveries.</p>
          </div>
          <div className={css.modalrow}>
            <p>Please help us improve and tell us which statement you agree with:</p>
          </div>
          <div className={css.modalrow}>
            <label className={css.label}>
              <input className={css.radio} name="ndd" value="prefer ndd" type="radio" onClick={onClickNddPreference}/>
              <span>Fast delivery (24-48 hour) is very important to me</span>
            </label>
          </div>
          <div className={css.modalrow}>
            <label className={css.label}>
            <input className={css.radio} name="ndd" value="fine without ndd" type="radio" onClick={onClickNddPreference}/>
              <span>I am OK with 3 day delivery</span>
            </label>
          </div>
          <div className={css.iconDeliverySection}>
            <Svg fileName="icon-delivery" className={css.iconDelivery} />
          </div>
          <GoustoButton width="full" onClick={onPopupClose}>Back to delivery options</GoustoButton>
        </ModalPanel>
      </Overlay>
    </span>
  )
}

DeliveryStep.propTypes = {
  boxSummaryDeliveryDays: PropTypes.instanceOf(Immutable.Map),
  tempDate: PropTypes.string,
  tempSlotId: PropTypes.string,
  setTempDate: PropTypes.func,
  setTempSlotId: PropTypes.func,
  boxSummaryDeliverySlotChosen: PropTypes.func,
  trackDeliveryDayDropDownOpened: PropTypes.func,
  trackDeliveryDayDropDownClosed: PropTypes.func,
  trackDeliverySlotDropDownOpened: PropTypes.func,
  trackDeliveryDayEdited: PropTypes.func,
  trackDeliverySlotEdited: PropTypes.func,
  menuFetchDataPending: PropTypes.bool,
  nextDayDeliveryPaintedDoorFeature: PropTypes.bool,
  isNDDPaintedDoorOpened: PropTypes.bool,
  openNDDPaintedDoor: PropTypes.func,
  closeNDDPaintedDoor: PropTypes.func,
  trackDeliveryPreferenceModalViewed: PropTypes.func,
  trackDeliveryPreferenceModalClosed: PropTypes.func,
  trackDeliveryPreferenceSelected: PropTypes.func,
  next: PropTypes.func,
}

export default DeliveryStep
