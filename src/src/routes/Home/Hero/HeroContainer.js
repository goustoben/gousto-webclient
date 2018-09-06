import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import Hero from './Hero'

const mapStateToProps = state => ({
	variant: state.features.getIn(['rebrand', 'value'], false) ? 'rebrand' : 'default'
})

const mapDispatchToProps = {
	redirect: redirectAction.redirect,
}

const HeroContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Hero)

export default HeroContainer
