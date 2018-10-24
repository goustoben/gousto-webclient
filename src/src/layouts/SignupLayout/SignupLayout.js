import PropTypes from 'prop-types'
import React from 'react'
import Header from 'Header'
import CookieBanner from 'CookieBanner'
import css from './SignupLayout.css'


class SignupLayout extends React.PureComponent {
	static propTypes = {
		children: PropTypes.object.isRequired,
	}

	render() {
		return (
			<div className={css.pageContainer}>
				<div className={css.headerContainer}>
					<CookieBanner />
					<Header simple noContactBar small />
				</div>
				{this.props.children}
			</div>
		)
	}
}

export default SignupLayout
