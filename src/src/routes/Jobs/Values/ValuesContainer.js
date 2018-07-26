import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import Values from './Values'

const ValuesContainer = connect(() => ({}), { redirect: redirectAction.redirect })(Values)

export default ValuesContainer
