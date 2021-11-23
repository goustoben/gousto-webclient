import moment from 'moment'

// Orders from the BE come with a state that has nothing to do with what the client needs
// Because of that, we have this kind of logic in all the clients
export const getClientOrderState = (state, deliveryDate, recipeItems, phase) => {
  const isDeliveryDay = moment().isSame(deliveryDate, 'day')
  const isCancellable = phase === 'awaiting_choices' || phase === 'open'

  if (phase === 'pre_menu') {
    return 'scheduled'
  }

  if (state === 'committed' && isDeliveryDay) {
    return 'dispatched'
  }

  if ((state === 'committed' && !isDeliveryDay) || (state === 'pending' && !isCancellable)) {
    return 'confirmed'
  }

  if (state === 'pending' && !recipeItems.size) {
    return 'menu open'
  }

  if (state === 'pending' && !!recipeItems.size) {
    return 'items chosen'
  }

  return state
}
