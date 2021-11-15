import { connect } from 'react-redux'
import { getIsRibbonTriggered } from 'selectors/ribbonSelectors'
import { RibbonTrigger } from './RibbonTrigger'
import { setRibbonTriggered } from "actions/ribbonActions/setRibbonTriggered"

const mapStateToProps = (state) => ({
  isRibbonTriggered: getIsRibbonTriggered(state),
})

const mapDispatchToProps = {
  setRibbonTriggered,
}

export const RibbonTriggerContainer = connect(mapStateToProps, mapDispatchToProps)(RibbonTrigger)
