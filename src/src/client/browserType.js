import { browserTypeChange } from 'actions/request'
import actual from 'actual'

export const browserType = (store) => {
  if (actual('width', 'px') < 768) {
    store.dispatch(browserTypeChange('mobile'))
  } else if (actual('width', 'px') < 1025) {
    store.dispatch(browserTypeChange('tablet'))
  } else {
    store.dispatch(browserTypeChange('desktop'))
  }
}
