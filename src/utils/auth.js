
export function isActive(roles) {
  return roles.some(role => ['user', 'admin', '*'].includes(role))
}

export function isSuspended(roles) {
  return roles.includes('suspended_user')
}

export function needsReactivating(roles) {
  return roles.includes('cancelled_user')
}

export function isAdmin(roles) {
  return roles.some(role => ['admin', '*'].includes(role))
}

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return re.test(email)
}
