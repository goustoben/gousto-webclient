import { connect } from 'react-redux'
import { getHomePageRedesign } from 'selectors/features'
import { ModuleHeader } from './ModuleHeader'

function mapStateToProps(state) {
  return {
    isHomePageRedesignEnabled: getHomePageRedesign(state)
  }
}

const ModuleHeaderContainer = connect(mapStateToProps)(ModuleHeader)

export { ModuleHeaderContainer }
