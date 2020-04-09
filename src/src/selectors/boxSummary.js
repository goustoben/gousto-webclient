import Immutable from 'immutable'

export const getBoxSummaryTextProps = (state, tempDate, tempSlotId, tempOrderId, slots) => {
  const {
    basket,
    user,
    features
  } = state
  const postcode = basket.get('postcode')
  const address = basket.get('address')
  const basketRecipeNo = basket.get('recipes', Immutable.Map({})).size
  const prevSlotId = basket.get('prevSlotId')
  const shouldDisplayFullScreenBoxSummary = features.getIn(['fullScreenBoxSummary', 'value'], false)
  const userOrders = user.get('orders')

  let deliveryLocationText = address ? `Address: ${address.get('name')}` : `${postcode}`
  let slotId = tempSlotId
  let buttonText
  let showWarning = false
  buttonText = prevSlotId ? 'Update delivery date' : 'Continue'
  buttonText = shouldDisplayFullScreenBoxSummary ? 'Confirm date' : buttonText

  if (!tempOrderId) {
    return ({ deliveryLocationText, slotId, buttonText, showWarning })
  }

  const chosenOrder = userOrders.find(order => order.get('id') === tempOrderId, Immutable.Map())

  const orderAddressName = chosenOrder.getIn(['shippingAddress', 'name'], null)
  if (orderAddressName) {
    deliveryLocationText = `Address: ${orderAddressName}`
  }

  const slotFind = slots[tempDate].filter(slot => slot.coreSlotId === chosenOrder.get('deliverySlotId'))
  slotId = slotFind && slotFind.length && slotFind[0].value

  const noOfRecipesInOrder = chosenOrder.get('recipeItems', Immutable.List()).size

  buttonText = 'Choose recipes'
  if (noOfRecipesInOrder > 0) {
    buttonText = 'Edit recipes'
    if (basketRecipeNo > 0) {
      showWarning = true
    }
  }

  return ({ deliveryLocationText, slotId, buttonText, showWarning })
}
export const getSlotDisabledSlotId = ({ slot }) => slot.get('disabledSlotId')
export const getSlotCoreSlotId = ({ slot }) => slot.get('coreSlotId')
export const getSlotDeliveryStartTime = ({ slot }) => slot.get('deliveryStartTime')
export const getSlotDeliveryEndTime = ({ slot }) => slot.get('deliveryEndTime')
export const getSlotDeliveryPrice = ({ slot }) => slot.get('deliveryPrice')
