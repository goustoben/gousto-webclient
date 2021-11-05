import { pageChange } from 'actions/page'
import { documentLocation } from 'utils/window'

function trackPageChange(store) {
  if (documentLocation() && documentLocation().href) {
    store.dispatch(pageChange(documentLocation().href))
  }
}

export default trackPageChange
