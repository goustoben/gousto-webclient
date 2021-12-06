import { pageChange } from 'actions/page'
import { documentLocation } from 'utils/window'

export function trackPageChange(store) {
  if (documentLocation() && documentLocation().href) {
    store.dispatch(pageChange(documentLocation().href))
  }
}
