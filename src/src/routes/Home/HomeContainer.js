import { connect } from 'react-redux'
import { knownVariants, defaultVariant } from 'config/home'
import actions from 'actions/auth'
import { getMenuService } from 'selectors/features'
import Home from './Home'

export const getKnownVariant = variant => (
  (knownVariants.includes(variant)) ? variant : defaultVariant
)

const mapStateToProps = (state, props) => ({
  enableStorystream: state.features.getIn(['enableStorystream', 'value'], false),
  moduleOrder: state.features.getIn(['hp_module_order', 'value']),
  isAuthenticated: state.auth.get('isAuthenticated'),
  variant: (props.location && props.location.query) ? getKnownVariant(props.location.query.variant) : defaultVariant,
  menuServiceFeatureFlag: getMenuService(state)
})

const mapDispatchToProps = {
  redirectLoggedInUser: actions.redirectLoggedInUser
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
