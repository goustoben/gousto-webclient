import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import SubHero from './SubHero'

const SubHeroContainer = connect(() => ({}), { redirect: redirectAction.redirect })(SubHero)

export default SubHeroContainer
