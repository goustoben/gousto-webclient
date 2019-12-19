const serverError = {
  serverError: (state = '404', action) => (
    (action.type === '@@router/LOCATION_CHANGE' && __CLIENT__) ? '404' : state
  ),
}

export default serverError
