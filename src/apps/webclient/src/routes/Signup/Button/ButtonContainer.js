import { connect } from 'react-redux'
import { Button } from './Button'

const mapStateToProps = (state) => ({
  isLastStep: state.signup.getIn(['wizard', 'isLastStep']),
  showcaseMenuSeen: state.signup.get('showcaseMenuSeen'),
})

export const ButtonContainer = connect(mapStateToProps)(Button)
