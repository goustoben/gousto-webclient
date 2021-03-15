import { connect } from 'react-redux'
import { signupGoToMenu } from 'actions/signup'
import { SellThePropositionPage } from './SellThePropositionPage'

const mapDispatchToProps = {
  signupGoToMenu,
}

export const SellThePropositionPageContainer = connect(
  null,
  mapDispatchToProps
)(SellThePropositionPage)
