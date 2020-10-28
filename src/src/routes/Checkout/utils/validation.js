export function validateBasicTextLength(value, min = 1, max = 255) {
  let result = true
  const valueString = value ? String(value) : ''
  if (!(valueString.length >= min && valueString.length <= max)) {
    result = false
  }

  return result
}

export function validatePhoneFormat(phone) {
  let result = true
  const phoneString = phone ? String(phone) : ''
  if (!/^[\d ()+]+$/.test(phoneString)) {
    result = false
  }

  return result
}

export function validateDigits(digits) {
  let result = true
  const digitsString = digits ? String(digits) : ''
  if (!/^[\d]+$/.test(digitsString)) {
    result = false
  }

  return result
}
