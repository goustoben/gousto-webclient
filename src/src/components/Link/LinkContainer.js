import { connect } from 'react-redux'
import { trackNavigationClick } from 'actions/tracking'
import { GoustoLink } from './Link'

export const LinkContainer = connect(null, {
  trackNavigationClick: trackNavigationClick
})(GoustoLink)
