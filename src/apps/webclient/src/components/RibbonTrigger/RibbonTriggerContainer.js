import { connect } from 'react-redux'
import { getIsRibbonTriggered } from 'selectors/ribbonSelectors'
import { setRibbonTriggered } from 'actions/ribbonActions'
import { RibbonTrigger } from './RibbonTrigger'

const mapStateToProps = (state) => ({
  isRibbonTriggered: getIsRibbonTriggered(state),
})

const mapDispatchToProps = {
  setRibbonTriggered,
}

export const RibbonTriggerContainer = connect(mapStateToProps, mapDispatchToProps)(RibbonTrigger)
