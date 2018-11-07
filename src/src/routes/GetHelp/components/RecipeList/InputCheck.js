
import React, { PureComponent } from 'react'

import css from './InputCheck.css'

class InputCheck extends PureComponent {
	state = {
		isChecked: this.props.isChecked
	}

	onChangeHandler = (id) => {
		const { isChecked } = this.state
		const toggle = !isChecked

		this.setState({ isChecked: toggle })

		this.props.onChange({ id, isChecked: toggle })
	}

	render() {
		const { id, label } = this.props

		return (
			<div className={css.inputCheckContainer}>
				<input
					id={id}
					type="checkbox"
					checked={this.state.isChecked}
					onChange={() => this.onChangeHandler(id)}
				/>
				<div className={css.inputCheckMask}></div>
				<label className={css.inputCheckLabel} htmlFor={id}>
					{label}
				</label>
			</div>
		)
	}
}

export {
    InputCheck
}
