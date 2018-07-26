import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import FadeHero from './FadeHero'

const FadeHeroContainer = connect(() => ({}), { redirect: redirectAction.redirect })(FadeHero)

export default FadeHeroContainer
