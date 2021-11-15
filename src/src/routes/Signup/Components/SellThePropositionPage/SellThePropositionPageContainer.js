import { connect } from 'react-redux'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { SellThePropositionPage } from './SellThePropositionPage'
import { signupGoToMenu } from "actions/signup/signupGoToMenu"

const mapStateToProps = (state) => ({
  isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
})

const mapDispatchToProps = {
  signupGoToMenu,
}

export const SellThePropositionPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellThePropositionPage)
