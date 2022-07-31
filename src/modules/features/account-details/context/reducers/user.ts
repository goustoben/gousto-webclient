import type { User } from '../../models/user'

type Payload = {
  data: User,
}

type State = {
  user: User,
}

export const reduceUserGetData = (state: State, payload: Payload): State => {
  return {
    ...state,
    user: {
      ...state.user,
      ...payload.data,
    },
  }
}
