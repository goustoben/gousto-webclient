import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import Perks from './Perks'

const PerksContainer = connect(() => ({}), { redirect: redirectAction.redirect })(Perks)

export default PerksContainer
