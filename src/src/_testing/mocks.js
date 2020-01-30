export const safeJestMock = (obj, methodName) => {
  if (!obj) {
    throw Error('Unable to mock as `obj` was falsy')
  }

  if (!obj[methodName]) {
    throw Error(`Unable to mock as \`obj[${methodName}]\` was falsy`)
  }

  if (typeof obj[methodName] !== 'function') {
    throw Error(`Unable to mock as \`obj[${methodName}]\` was not a function`)
  }

  const mock = jest.spyOn(obj, methodName)//eslint-disable-line

  // spyOn doesn't stub out the implementation by default
  mock.mockImplementation(() => { })

  return mock
}

export const returnArgumentsFromMock = (mock, name) => {
  mock.mockImplementation((...args) => [name, args])
}
