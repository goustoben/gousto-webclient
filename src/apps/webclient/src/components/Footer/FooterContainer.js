import { connect } from 'react-redux'
import { getIsAuthenticated } from 'selectors/auth'
import { getIsGiftCardsLinkVisible, getIsCorporateEnquiriesLinkVisible } from 'selectors/features'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { trackNavigationClick } from 'actions/tracking'
import { Footer } from './Footer'

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: getIsAuthenticated(state),
  simple: ownProps.simple || state.persist.get('simpleHeader', false),
  type: ownProps.type,
  isGiftCardsLinkVisible: getIsGiftCardsLinkVisible(state),
  isCorporateEnquiriesLinkVisible: getIsCorporateEnquiriesLinkVisible(state),
})

export const FooterContainer = connect(mapStateToProps, {
  helpPreLoginVisibilityChange,
  trackNavigationClick,
})(Footer)
