import { canUseWindow } from 'utils/browserEnvironment'

export default (action, state = {}) => {
  if (canUseWindow() && window.dataLayer) {
    const { actionType, seCategory: category } = action
    const actionValue = {}
    Object.keys(action)
      .filter(key => key !== 'actionType' && key !== 'seCategory')
      .forEach(key => {
        actionValue[key] = action[key]
      })
    const event = {

      ...state,
      event: 'userAction',
      actionType,
      category,
      actionValue: JSON.stringify(actionValue)
    }
    window.dataLayer.push(event)
  }
}
