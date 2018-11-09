export default function dottify(object) {
  let dottified = ''

  if (object !== null && typeof object === 'object') {
    const firstKey = Object.keys(object)[0]
    if (firstKey) {
      dottified = firstKey
      if (typeof object[firstKey] === 'object' && object[firstKey] !== null) {
        dottified += `.${dottify(object[firstKey])}`
      }
    }
  }

  return dottified
}
