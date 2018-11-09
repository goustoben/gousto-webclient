import { connect } from 'react-redux'

import BoxDetails from './BoxDetails'

function mapStateToProps(state) {
  return {
    recipes: state.basket.get('recipes'),
    browser: state.request.get('browser'),
  }
}

const BoxDetailsDesktopContainer = connect(mapStateToProps, {})(BoxDetails)

export default BoxDetailsDesktopContainer
