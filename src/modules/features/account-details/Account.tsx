import React from 'react'
import { useGetUser } from './hooks/useGetUser'
import { AccountContextProvider } from './context'
import { useAccountReducer } from './context/reducers'
import { PersonalDetails } from './components/PersonalDetails'

function Account() {
  const { state, dispatch } = useAccountReducer()

  useGetUser(dispatch)

  return (
    <AccountContextProvider value={{ ...state, dispatch }}>
        <PersonalDetails />
    </AccountContextProvider>
  );
}

export default Account;
