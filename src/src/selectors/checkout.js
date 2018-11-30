export const hasCheckoutError = state => {
  const errors = state.checkout.get('errors')
  if(!errors) {
    return false
  }

  return errors.filter(error => error).size > 0
}
