import _parsePhoneNumber, {
  isValidPhoneNumber as _isValidPhoneNumber
} from 'libphonenumber-js/core'

import metadata from './phone-metadata.json'

function call(func, ..._arguments) {
  const args = Array.prototype.slice.call(_arguments)
  args.push(metadata)

  return func.apply(this, args)
}

export function parsePhoneNumber(...args) {
  return call(_parsePhoneNumber, ...args)
}

export function isValidPhoneNumber(...args) {
  return call(_isValidPhoneNumber, ...args)
}
