import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import { Button } from 'goustouicomponents'
import DropdownInput from 'Form/Dropdown'
import util from './util'
import css from './EditDate.css'

class EditDate extends React.PureComponent {
  constructor(props) {
    super(props)
    const { coreDeliveryDayId, deliverySlotId } = this.props

    this.state = {
      selectedDeliveryDayId: coreDeliveryDayId,
      selectedDeliverySlotId: deliverySlotId,
      deliveryDaysOptions: [],
      slotsOptions: {},
      selectedDeliveryDate: ''
    }
  }

  componentDidMount() {
    const { deliveryDays, recipesStock, coreDeliveryDayId, deliverySlotId, recipes, portionsCount, orders } = this.props
    this.setDayAndSlotOptionsAndSelected(deliveryDays, recipesStock, coreDeliveryDayId, deliverySlotId, recipes, portionsCount, orders)
  }

  componentWillReceiveProps(nextProps) {
    const { deliveryDays, recipesStock, coreDeliveryDayId, deliverySlotId, recipes, portionsCount, orders } = this.props

    if (deliveryDays !== nextProps.deliveryDays || recipesStock !== nextProps.recipesStock) {
      this.setDayAndSlotOptionsAndSelected(nextProps.deliveryDays, nextProps.recipesStock, coreDeliveryDayId, deliverySlotId, recipes, portionsCount, orders)
    }
  }

  onSubmitFunction() {
    const { selectedDeliverySlotId, selectedDeliveryDayId, slotsOptions, selectedDeliveryDate } = this.state
    const { orderId, deliverySlotId, deliveryDays, orderUpdateDayAndSlot } = this.props

    if (selectedDeliverySlotId !== deliverySlotId) {
      const { uuid } = slotsOptions[selectedDeliveryDayId].find(slot => slot.value === selectedDeliverySlotId)

      orderUpdateDayAndSlot(orderId, selectedDeliveryDayId, selectedDeliverySlotId, uuid, selectedDeliveryDate, deliveryDays)
    }
  }

  onDayChange(dayId, slotsOptions) {
    const {
      clearUpdateDateErrorAndPending,
      coreDeliveryDayId,
      deliverySlotId,
      orderId,
      userTrackDateSelected,
    } = this.props
    const { deliveryDaysOptions } = this.state

    let slotId
    let selectedDeliveryDate
    if (dayId === coreDeliveryDayId) {
      slotId = deliverySlotId
    } else {
      const defaultSlotOption = slotsOptions[dayId].find(slotOption => slotOption.isDefaultSlot)
      selectedDeliveryDate = deliveryDaysOptions.find(day => day.value === dayId).date
      if (defaultSlotOption) {
        slotId = defaultSlotOption.value
      } else {
        slotId = slotsOptions[dayId][0].value
      }
    }

    this.setState({ selectedDeliveryDayId: dayId, selectedDeliverySlotId: slotId, selectedDeliveryDate })
    clearUpdateDateErrorAndPending()
    userTrackDateSelected(orderId, deliverySlotId, slotId)
  }

  onSlotChange(slotId) {
    const { deliverySlotId, orderId, userTrackSlotSelected } = this.props
    this.setState({ selectedDeliverySlotId: slotId })
    userTrackSlotSelected(orderId, deliverySlotId, slotId)
  }

  setDayAndSlotOptionsAndSelected = (deliveryDays, recipesStock, coreDeliveryDayId, deliverySlotId, recipes, portionsCount, orders) => {
    const { deliveryDaysOptions, slotsOptions } = util.getDeliveryDaysAndSlotsOptions(deliveryDays, recipes, recipesStock, portionsCount, coreDeliveryDayId, deliverySlotId, orders)

    let selectedDeliveryDayId = coreDeliveryDayId
    let selectedDeliverySlotId = deliverySlotId

    if (!deliveryDaysOptions.some(option => option.value === selectedDeliveryDayId)) {
      selectedDeliveryDayId = deliveryDaysOptions[0] ? deliveryDaysOptions[0].value : ''
    }
    if (!slotsOptions[selectedDeliveryDayId]
      || !slotsOptions[selectedDeliveryDayId].some(option => option.value === selectedDeliverySlotId)) {
      selectedDeliverySlotId = slotsOptions[selectedDeliveryDayId] && slotsOptions[selectedDeliveryDayId][0] ? slotsOptions[selectedDeliveryDayId][0].value : ''
    }

    const selectedDeliveryDate = deliveryDaysOptions.find(day => day.value === selectedDeliveryDayId).date

    this.setState({ deliveryDaysOptions, slotsOptions, selectedDeliveryDayId, selectedDeliverySlotId, selectedDeliveryDate })
  }

  render() {
    const { deliverySlotId, isPendingUpdateDayAndSlot } = this.props
    const { deliveryDaysOptions, slotsOptions } = this.state
    const { selectedDeliveryDayId, selectedDeliverySlotId } = this.state
    const canSubmit = selectedDeliverySlotId !== deliverySlotId

    return (
      <div className={css.editDeliveryOuterContainer}>
        <div className={css.editDeliveryInnerContainer}>
          <div className={css.row}>
            <div className={css.dropDownContainer}>
              <DropdownInput
                options={deliveryDaysOptions}
                onChange={(dayId) => this.onDayChange(dayId, slotsOptions)}
                className={css.daysDropDown}
                value={selectedDeliveryDayId}
              />
            </div>
            <div className={css.dropDownContainer}>
              <DropdownInput
                options={slotsOptions[selectedDeliveryDayId]}
                onChange={(slotId) => this.onSlotChange(slotId)}
                className={css.slotsDropDown}
                value={selectedDeliverySlotId}
              />
            </div>
          </div>
          <Button
            onClick={() => this.onSubmitFunction()}
            color="secondary"
            width="full"
            noDecoration
            pending={isPendingUpdateDayAndSlot}
            disabled={!canSubmit}
          >
            Set delivery slot
          </Button>
        </div>
      </div>
    )
  }
}

EditDate.propTypes = {
  clearUpdateDateErrorAndPending: PropTypes.func,
  coreDeliveryDayId: PropTypes.string.isRequired,
  deliveryDays: PropTypes.instanceOf(Immutable.Map),
  deliverySlotId: PropTypes.string.isRequired,
  isPendingUpdateDayAndSlot: PropTypes.bool,
  orderId: PropTypes.string,
  orderUpdateDayAndSlot: PropTypes.func.isRequired,
  orders: PropTypes.instanceOf(Immutable.Map),
  portionsCount: PropTypes.string,
  recipes: PropTypes.instanceOf(Immutable.List),
  recipesStock: PropTypes.instanceOf(Immutable.List),
  userTrackDateSelected: PropTypes.func.isRequired,
  userTrackSlotSelected: PropTypes.func.isRequired,
}

EditDate.defaultProps = {
  orderId: '',
  deliveryDays: Immutable.Map(),
  recipesStock: Immutable.List(),
  isPendingUpdateDayAndSlot: false,
  clearUpdateDateErrorAndPending: () => null,
  recipes: Immutable.List(),
  orders: Immutable.Map(),
  portionsCount: '2'
}

export { EditDate }
