import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import Hero2 from './Hero2'

const HeroContainer2 = connect(() => ({}), { redirect: redirectAction.redirect })(Hero2)

export default HeroContainer2
