import React from 'react'
import css from './Form.css'

const Form = (props) => (
	<form { ...props }>
		{props.children}
		<input type="submit" name="submit" value="submit" className={css.hideSubmit} />
	</form>
)

Form.propTypes = {
  children: React.PropTypes.node.isRequired,
}

Form.defaultProps = {
  method: 'post',
}

export default Form
