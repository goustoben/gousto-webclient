export const anyUnset = (...params) => !params.length || params.some(param => param === undefined || param === null)
