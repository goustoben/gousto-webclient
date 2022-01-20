import { parseObjectKeysToCamelCase } from 'utils/jsonHelper'

export const reduceCurrentUserData = (state, data) => {
  if (!data || !data.user) {
    return state
  }

  const parsedUser = parseObjectKeysToCamelCase(data.user)

  return {
    ...state,
    currentUser: parsedUser
  }
}
