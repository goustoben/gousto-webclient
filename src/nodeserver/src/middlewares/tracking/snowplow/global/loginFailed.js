import actions from 'actions/actionTypes'

export default function loginFailed(action, state) {
	return {
		type: action.type,
		data: {
			reason: state.error.get(actions.USER_LOGIN),
		},
	}
}
