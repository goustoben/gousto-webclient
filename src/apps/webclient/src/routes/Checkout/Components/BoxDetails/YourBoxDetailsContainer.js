import { connect } from 'react-redux'
import { YourBoxDetails } from './YourBoxDetails'

function mapStateToProps(state) {
  return {
    numPortions: state.basket.get('numPortions'),
    numRecipes: state.basket.get('numRecipes'),
  }
}

export const YourBoxDetailsContainer = connect(mapStateToProps, {})(YourBoxDetails)
