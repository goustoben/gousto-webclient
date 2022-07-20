import { connect } from 'react-redux'

import { Buttons } from './Buttons'

function mapStateToProps(state, props) {
  return {
    qty: state.basket.getIn(['recipes', props.recipeId], 0),
    numPortions: state.basket.get('numPortions'),
    limitReached: state.basket.get('limitReached'),
  }
}

const ButtonsContainer = connect(mapStateToProps)(Buttons)

export { ButtonsContainer }
