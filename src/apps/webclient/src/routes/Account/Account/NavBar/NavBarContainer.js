import { connect } from 'react-redux'
import { trackClickRateRecipes } from '../../../Ratings/actions/feedback'
import NavBar from './NavBar'

const mapDispatchToProps = {
  trackClickRateRecipes,
}

const NavBarContainer = connect(null, mapDispatchToProps)(NavBar)

export { NavBarContainer }
