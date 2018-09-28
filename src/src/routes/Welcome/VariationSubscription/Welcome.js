import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import css from '../Welcome.css'
import SubHeader from '../SubHeader'

const Welcome = ({ user }) => (
	<section className={css.container}>
		<SubHeader nameFirst={user.get('nameFirst')} />
	</section>
)

Welcome.propTypes = {
	user: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default Welcome
