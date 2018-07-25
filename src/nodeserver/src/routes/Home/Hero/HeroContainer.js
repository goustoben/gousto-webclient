import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import Hero from './Hero'

const HeroContainer = connect(() => ({}), { redirect: redirectAction.redirect })(Hero)

export default HeroContainer
