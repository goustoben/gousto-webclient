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
    deliveryDays: PropTypes.instanceOf(Immutable.Map),
    recipesStock: PropTypes.instanceOf(Immutable.List),
    coreDeliveryDayId: PropTypes.string.isRequired,
    deliverySlotId: PropTypes.string.isRequired,
    isPendingUpdateDayAndSlot: PropTypes.bool,
    clearUpdateDateErrorAndPending: PropTypes.func,
    recipes: PropTypes.instanceOf(Immutable.List),
    orders: PropTypes.instanceOf(Immutable.Map),
    portionsCount: PropTypes.string
  }

  static defaultProps = {
    editDeliveryMode: true,
    orderId: '',
    deliveryDays: Immutable.Map({}),
    recipesStock: Immutable.List([]),
    isPendingUpdateDayAndSlot: false,
    orderGetDeliveryDays: () => { },
    recipes: Immutable.List([]),
    orders: Immutable.Map({}),
    portionsCount: '2'
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
    const { deliveryDays, recipesStock, coreDeliveryDayId, deliverySlotId, recipes, portionsCount, orders } = this.props
    this.setDayAndSlotOptionsAndSelected(deliveryDays, recipesStock, coreDeliveryDayId, deliverySlotId, recipes, portionsCount, orders )
  }

  componentWillReceiveProps(nextProps) {
    const { deliveryDays, recipesStock, coreDeliveryDayId, deliverySlotId, recipes, portionsCount, orders} = this.props

    if (deliveryDays !== nextProps.deliveryDays || recipesStock !== nextProps.recipesStock) {
      this.setDayAndSlotOptionsAndSelected(nextProps.deliveryDays, nextProps.recipesStock, coreDeliveryDayId, deliverySlotId, recipes, portionsCount, orders)
    }
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

  onSubmitFunction() {
    const { selectedDeliverySlotId, selectedDeliveryDayId, slotsOptions, selectedDeliveryDate } = this.state
    const { orderId, deliverySlotId, deliveryDays } = this.props
    const { store } = this.context

    if (selectedDeliverySlotId !== deliverySlotId) {
      const { uuid } = slotsOptions[selectedDeliveryDayId].find(slot => slot.value === selectedDeliverySlotId)

      store.dispatch(orderActions.orderUpdateDayAndSlot(orderId, selectedDeliveryDayId, selectedDeliverySlotId, uuid, selectedDeliveryDate, deliveryDays))
    }
  }

  canSubmit(deliverySlotId, selectedDayId, selectedSlotId) {
    const { selectedDeliverySlotId } = this.state

    const slotChange = selectedDeliverySlotId !== deliverySlotId

    return slotChange && selectedDayId !== DEFAULT_MESSAGE_ID && selectedSlotId !== DEFAULT_MESSAGE_ID
  }

  onDayChange(dayId, slotsOptions) {
    const { store } = this.context
    const { coreDeliveryDayId, deliverySlotId, clearUpdateDateErrorAndPending, orderId } = this.props
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
    store.dispatch(userActions.userTrackDateSelected(orderId, deliverySlotId, slotId))
  }

  onSlotChange(slotId) {
    const { store } = this.context
    const { deliverySlotId, orderId } = this.props
    this.setState({ selectedDeliverySlotId: slotId })
    store.dispatch(userActions.userTrackSlotSelected(orderId, deliverySlotId, slotId))
  }

  render() {
    const { deliverySlotId, isPendingUpdateDayAndSlot } = this.props
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
              onClick={() => this.onSubmitFunction()}
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
