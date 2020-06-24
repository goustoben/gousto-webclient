import { connect } from 'react-redux'
import { getHomePageRedesign } from 'selectors/features'
import { Panel } from './Panel'

function mapStateToProps(state) {
  return {
    isHomePageRedesignEnabled: getHomePageRedesign(state)
  }
}

const PanelContainer = connect(mapStateToProps)(Panel)

export { PanelContainer }
