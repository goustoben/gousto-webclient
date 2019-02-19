import PropTypes from 'prop-types'
import React from 'react'

import Link from 'Link'
import { Alert } from 'goustouicomponents'
import Content from 'containers/Content'
import config from 'config/resetPassword'
import configRoutes from 'config/routes'

const FormAlert = ({ errorResetPassword }) => {
  const errorMessage = config[errorResetPassword] || config.default

  return (errorResetPassword) ? (
		<Alert type="danger">
			<span>
				<Content contentKeys={errorMessage.key}>
					<span>{errorMessage.placeholder}</span>
				</Content>
				{errorResetPassword === 'password_token-invalid' ?
					<span>
						&nbsp;Please&nbsp;
						<Link to={configRoutes.client.resetForm} clientRouted={false}>
							request a new link
						</Link>
						&nbsp;to reset your password!
					</span>
				  : null}
			</span>
		</Alert>
  ) : null
}

FormAlert.propTypes = {
  errorResetPassword: PropTypes.string,
}

export default FormAlert
