import { connect } from 'react-redux'
import { trackConfirmationCTA } from '../actions/getHelp'
import { Confirmation } from './Confirmation'

const ConfirmationContainer = connect(null, { trackConfirmationCTA })(Confirmation)

export {
  ConfirmationContainer
}
