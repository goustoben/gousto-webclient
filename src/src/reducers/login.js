import actionTypes from 'actions/actionTypes'

const login = {
	loginVisibility: (state = false, action) => {
		switch (action.type) {
			case actionTypes.LOGIN_VISIBILITY_CHANGE: {
				return action.visibility
			}

			default:
				return state
		}
	},
}

export default login
