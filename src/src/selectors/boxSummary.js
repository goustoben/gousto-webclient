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
  let chosenOrder
  let buttonText
  let showWarning = false
  buttonText = prevSlotId ? 'Update delivery date' : 'Continue'
  buttonText = shouldDisplayFullScreenBoxSummary ? 'Confirm date' : buttonText
  if (tempOrderId) {
    chosenOrder = userOrders.find(order => order.get('id') === tempOrderId, Immutable.Map())

    const orderAddressName = chosenOrder.getIn(['shippingAddress', 'name'], null)
    if (orderAddressName) {
      deliveryLocationText = `Address: ${orderAddressName}`
    }
    try {
      slotId = slots[tempDate].filter(slot => slot.coreSlotId === chosenOrder.get('deliverySlotId'))[0].value
    } catch (err) {
      // couldn't find slot id for that order on that date
    }

    const noOfRecipesInOrder = chosenOrder.get('recipeItems', Immutable.List()).size
    if (noOfRecipesInOrder === 0) {
      buttonText = 'Choose recipes'
    } else {
      buttonText = 'Edit recipes'
      if (basketRecipeNo > 0) {
        showWarning = true
      }
    }
  }

  return ({ deliveryLocationText, slotId, buttonText, showWarning })
}
