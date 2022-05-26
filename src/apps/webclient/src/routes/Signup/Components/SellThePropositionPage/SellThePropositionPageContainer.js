import { connect } from 'react-redux'

import { signupGoToMenu } from 'actions/signup'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'

import { SellThePropositionPage } from './SellThePropositionPage'

const mapStateToProps = (state) => ({
  isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
})

const mapDispatchToProps = {
  signupGoToMenu,
}

export const SellThePropositionPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SellThePropositionPage)
