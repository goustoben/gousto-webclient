export const hasCheckoutError = state => {
  const errors = state.checkout.get('errors')
  if(!errors) {
    return false
  }

  return errors.filter(error => error).size > 0
}

export const getAboutYouFormName = state => {
  const { request } = state
  
  return request.get('browser') === 'mobile' ? 'yourdetails' : 'aboutyou'
}

export const getDeliveryFormName = state => {
  const { request } = state
  
  return request.get('browser') === 'mobile' ? 'yourdetails' : 'delivery'
}
