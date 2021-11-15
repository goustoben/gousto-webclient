import { connect } from 'react-redux'
import NavBar from './NavBar'
import { trackClickRateRecipes } from "routes/Ratings/actions/feedback/trackClickRateRecipes"

const mapDispatchToProps = {
  trackClickRateRecipes,
}

const NavBarContainer = connect(null, mapDispatchToProps)(NavBar)

export { NavBarContainer }
