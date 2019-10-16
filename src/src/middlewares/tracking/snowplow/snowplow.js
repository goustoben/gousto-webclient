
export default (action, state = {}) => {
  if (__CLIENT__ && window.dataLayer) {
    const { actionType, seCategory:category } = action
    const actionValue = {}
    Object.keys(action)
      .filter(key => key !== 'actionType' && key !== 'seCategory')
      .forEach(key => {
        actionValue[key] = action[key]
      })
    const event = Object.assign({}, state, { event: 'userAction' }, { actionType , category }, { actionValue: JSON.stringify(actionValue) })
    window.dataLayer.push(event)
  }
}
