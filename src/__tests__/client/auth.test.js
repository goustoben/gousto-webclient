import sinon from 'sinon'

import * as auth from 'client/auth'
import * as clientAuthorise from 'utils/clientAuthorise'

describe('client/auth', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()

    sandbox
      .stub(clientAuthorise, 'authorise')
      .returns(Promise.resolve('ok'))
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('clientAuthorise', () => {
    test('should call utils/clientAuthorise.authorise', async () => {
      const result = await auth.clientAuthorise('store...')

      expect(result).toEqual('ok')
    })
  })
})
