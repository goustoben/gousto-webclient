import React, { PropTypes } from 'react'
import Button from 'Button'
import css from './OrderSummary.css'

class SaveButton extends React.PureComponent {

	static propTypes = {
		onClick: PropTypes.func,
		error: PropTypes.string,
		saving: PropTypes.bool,
		saveRequired: PropTypes.bool.isRequired,
	}

	static defaultProps = {
		onClick: () => {},
		saving: false,
		saveRequired: false,
	}

	state = {
		showButton: this.props.saveRequired,
		showError: false,
		showSuccess: false,
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.saveRequired && nextProps.saveRequired) {
			this.setState({ showButton: true })
		}

		if (this.props.saving && !nextProps.saving) {
			if (!nextProps.error) {
				this.setState({ showSuccess: true, showButton: false }, () => {
					setTimeout(() => { this.setState({ showSuccess: false }) }, 5000)
				})
			} else {
				this.setState({ showError: true }, () => {
					setTimeout(() => { this.setState({ showError: false }) }, 5000)
				})
			}
		}
	}

	render = () => (
		<div>
			{!!this.state.showButton &&
				<div className={css.button}>
					<Button
						disabled={this.props.saving}
						onClick={this.props.onClick}
						pending={this.props.saving}
						width="full"
					>
						Update Order
					</Button>
				</div>
			}
			{this.state.showSuccess ? <div className={css.success}>SAVED</div> : ''}
			{this.state.showError ? <div className={css.error}>ERROR SAVING CHOICES</div> : ''}
		</div>
	)
}


export default SaveButton
