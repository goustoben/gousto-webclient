import { connect } from 'react-redux'
import { getTagDefinition } from '../../selectors/recipe'
import { InfoBadge } from './InfoBadge'

const mapStateToProps = (state, ownProps) => ({
  brandTag: getTagDefinition(state, ownProps)
})

const InfoBadgeContainer = connect(mapStateToProps)(InfoBadge)

export { InfoBadgeContainer }
