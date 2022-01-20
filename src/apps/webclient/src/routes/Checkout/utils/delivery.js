const separator = `${String.fromCharCode(44)}${String.fromCharCode(32)}`

export function transformAddressParts(address) {
  return address.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
}

export function showAddress(address) {
  if (!address) {
    return ''
  }

  let addressPieces = []

  const fields = ['houseNo', 'street', 'town', 'county', 'postcode']
  fields.forEach((field) => {
    let addressPiece
    if (address[field]) {
      addressPiece = address[field]
      if (field !== 'postcode') {
        const addressParts = address[field].includes(separator)
          ? address[field].split(separator)
          : address[field]
        addressPiece = address[field].includes(separator)
          ? addressParts.map((part) => transformAddressParts(part)).join(separator)
          : transformAddressParts(address[field])
      }
    }
    addressPieces.push(addressPiece)
    addressPieces = addressPieces.filter((item) => item)
  })

  return addressPieces.join(separator)
}

export function isAddressConfirmed(formValues) {
  const sectionName = 'delivery'

  return formValues && formValues[sectionName] && formValues[sectionName].confirmed
    ? formValues[sectionName].confirmed
    : false
}

export function transformAddresses(addresses) {
  return addresses.map((address) => {
    const label = [...address.labels][0].split(separator).map((part) => transformAddressParts(part))

    return {
      value: address.id,
      label: address.id === 'placeholder' ? 'Please select your address' : label.join(separator),
    }
  })
}
