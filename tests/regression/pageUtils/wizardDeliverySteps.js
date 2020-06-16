export const getStoreState = (win) => {
  return win.__store__.getState()
}

export const getTempDate = (win) => {
  return getStoreState(win).temp.get('date')
}

export const getDeliveryDays = (win) => {
  return getStoreState(win).boxSummaryDeliveryDays.size > 0
}
