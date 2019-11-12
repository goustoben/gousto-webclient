import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import { Button } from 'goustouicomponents'
import userActions from 'actions/user'
import orderActions from 'actions/order'
import DropdownInput from 'Form/Dropdown'
import util, { DEFAULT_MESSAGE_ID } from './util'
import css from './EditDate.css'

class EditDate extends React.PureComponent {
  static propTypes = {
    editDeliveryMode: PropTypes.bool,
    orderId: PropTypes.string,
    deliveryDays: PropTypes.instanceOf(Immutable.List),
    recipesStock: PropTypes.instanceOf(Immutable.List),
    coreDeliveryDayId: PropTypes.string.isRequired,
    deliverySlotId: PropTypes.string.isRequired,
    isPendingUpdateDayAndSlot: PropTypes.bool,
    availableDeliveryDays: PropTypes.object,
    clearUpdateDateErrorAndPending: PropTypes.func,
  }

  static defaultProps = {
    editDeliveryMode: true,
    orderId: '',
    shippingAddressId: '',
    deliveryDays: Immutable.Map({}),
    recipes: Immutable.List([]),
    recipesStock: Immutable.List([]),
    orders: Immutable.Map({}),
    isPendingUpdateDayAndSlot: false,
    isErrorUpdateDayAndSlot: null,
    orderGetDeliveryDays: () => { }
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

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
    const { deliveryDaysOptions, slotsOptions } = this.constructDropdownOptions(this.props)
    const { selectedDeliveryDayId, selectedDeliverySlotId, selectedDeliveryDate } = this.constructDefaultDayAndSlot(deliveryDaysOptions, slotsOptions)

    this.setState({ deliveryDaysOptions, slotsOptions, selectedDeliveryDayId, selectedDeliverySlotId, selectedDeliveryDate })
  }

  componentWillReceiveProps(nextProps) {
    const { deliveryDays, recipesStock } = this.props

    if (deliveryDays !== nextProps.deliveryDays || recipesStock !== nextProps.recipesStock) {
      const { deliveryDaysOptions, slotsOptions } = this.constructDropdownOptions(this.props)
      const { selectedDeliveryDayId, selectedDeliverySlotId, selectedDeliveryDate } = this.constructDefaultDayAndSlot(deliveryDaysOptions, slotsOptions)

      this.setState({ deliveryDaysOptions, slotsOptions, selectedDeliveryDayId, selectedDeliverySlotId, selectedDeliveryDate })
    }
  }
  constructDropdownOptions = ({ deliveryDays, recipes, recipesStock, portionsCount, coreDeliveryDayId, deliverySlotId, orders }) => (
    util.getDeliveryDaysAndSlotsOptions(deliveryDays, recipes, recipesStock, portionsCount, coreDeliveryDayId, deliverySlotId, orders)
  )

  constructDefaultDayAndSlot = (deliveryDaysOptions, slotsOptions) => {
    const { coreDeliveryDayId, deliverySlotId } = this.props

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

    return { selectedDeliveryDayId, selectedDeliverySlotId, selectedDeliveryDate }
  }

  onCancelFunction() {
    const { orderId, editDeliveryMode } = this.props
    const { store } = this.context
    store.dispatch(userActions.userOpenCloseEditSection(orderId, !editDeliveryMode))
  }

  onSubmitFunction(orderId, selectedDeliveryDayId) {
    const { selectedDeliverySlotId, slotsOptions, selectedDeliveryDate } = this.state
    const { deliverySlotId, availableDeliveryDays } = this.props
    const { store } = this.context

    if (selectedDeliverySlotId !== deliverySlotId) {
      const { uuid } = slotsOptions[selectedDeliveryDayId].find(slot => slot.value === selectedDeliverySlotId)

      store.dispatch(orderActions.orderUpdateDayAndSlot(orderId, selectedDeliveryDayId, selectedDeliverySlotId, uuid, selectedDeliveryDate, availableDeliveryDays))
    }
  }

  canSubmit(orderDeliverySlotId, selectedDayId, selectedSlotId) {
    const { selectedDeliverySlotId } = this.state

    const slotChange = selectedDeliverySlotId !== orderDeliverySlotId

    return slotChange && selectedDayId !== DEFAULT_MESSAGE_ID && selectedSlotId !== DEFAULT_MESSAGE_ID
  }

  onDayChange(dayId, slotsOptions) {
    const { coreDeliveryDayId, deliverySlotId, clearUpdateDateErrorAndPending } = this.props
    const { deliveryDaysOptions } = this.state

    let slotId, selectedDeliveryDate
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
  }

  onSlotChange(slotId) {
    this.setState({ selectedDeliverySlotId: slotId })
  }

  render() {
    const { deliverySlotId, isPendingUpdateDayAndSlot, orderId } = this.props
    const { deliveryDaysOptions, slotsOptions } = this.state
    const { selectedDeliveryDayId, selectedDeliverySlotId } = this.state
    const canSubmit = this.canSubmit(deliverySlotId, selectedDeliveryDayId, selectedDeliverySlotId)

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
          <div className={css.button}>
            <Button
              onClick={() => this.onSubmitFunction(orderId, selectedDeliveryDayId, selectedDeliverySlotId)}
              color={'secondary'}
              width="full"
              noDecoration
              pending={isPendingUpdateDayAndSlot}
              disabled={!canSubmit}
            >
              Set delivery slot
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export { EditDate }
