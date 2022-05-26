import { connect } from 'react-redux'

import { SubHeader } from './SubHeader'

export const SubHeaderContainer = connect((state) => {
  const isAuthenticated = state.auth.get('isAuthenticated')

  return {
    isAuthenticated,
    fromJoin: state.persist.get('simpleHeader', false),
  }
})(SubHeader)
