import { documentLocation } from 'utils/window'
import { pageChange } from "actions/page/pageChange"

function trackPageChange(store) {
  if (documentLocation() && documentLocation().href) {
    store.dispatch(pageChange(documentLocation().href))
  }
}

export default trackPageChange
