import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import Hero from './Hero'

const mapStateToProps = () => ({})

const mapDispatchToProps = {
	redirect: redirectAction.redirect,
}

const HeroContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Hero)

export default HeroContainer
