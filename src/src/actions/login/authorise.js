import { isActive, isSuspended, needsReactivating } from "utils/auth"

export const authorise = roles => {
  let err
  if (!isActive(roles)) {
    const msg = 'This account is does not exist. Please sign up or contact customer care.'
    err = new Error(msg)
  }
  if (isSuspended(roles)) {
    const msg = 'This account is suspended. Please contact customer care.'
    err = new Error(msg)
  }
  if (needsReactivating(roles)) {
    const msg = 'This account is deactivated. Please contact customer care to reactivate.'
    err = new Error(msg)
  }
  if (err) {
    throw err
  }

  return true
}
