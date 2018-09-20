import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'

const groupByKey = (data) => {
	const keyedObject = data.fields.reduce((collection, field) => {
		let newCollection = collection
		if (typeof field === 'object' && field !== null) {
			const key = Object.keys(field)[0]
			newCollection = { ...collection, [key]: field[key].value }
		}

		return newCollection
	}, {})

	return Immutable.fromJS(keyedObject)
}

const content = {
	content: (state = Immutable.Map({}), action) => {
		switch (action.type) {
			case actionTypes.CONTENT_RECEIVE: {
				return state.merge(groupByKey(action.content))
			}

			default: {
				return state
			}
		}
	},

	variants: (state = Immutable.Map({}), action) => {
		switch (action.type) {
			case actionTypes.CONTENT_VARIANTS_RECEIVE: {
				return state.merge(Immutable.fromJS(action.variants))
			}

			default: {
				return state
			}
		}
	}
}

export default content
