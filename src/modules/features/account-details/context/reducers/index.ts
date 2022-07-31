import { useMemo, useReducer } from 'react'

import type { User } from '../../models/user'
import * as userReducers from './user'

type PayloadKeys = 'data'
type PayloadTypes = User

type State = {
  user: User,
}

export enum ActionTypes {
  USER_DATA_RECEIVED = 'USER_DATA_RECEIVED',
}

export type Action = {
  type: ActionTypes,
  payload: Record<PayloadKeys, PayloadTypes>,
}

export const initialState = {
  user: {} as User,
}

const accountReducer = (state: State, action: Action): State => {
  const { type, payload } = action

  switch (type) {
    case ActionTypes.USER_DATA_RECEIVED:
      return userReducers.reduceUserGetData(state, payload)
    default:
      return state
  }
}

export const useAccountReducer = () => {
  const [state, dispatch] = useReducer(accountReducer, initialState)
  const memoizedContextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return memoizedContextValue
}
