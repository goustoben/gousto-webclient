const { unitTests } = require('./unit-tests')

describe('Unit tests command', () => {
  describe('When there are no local changes', () => {
    const ctx = {
      localChanges: () => [],
      stdout: jest.fn(),
    }

    test('does not write to stdout', async () => {
      await unitTests(ctx)
      expect(ctx.stdout).not.toHaveBeenCalled()
    })
  })

  describe('When there are some local changes', () => {
    const ctx = {
      localChanges: () => [{ filepath: 'something' }],
      stdout: jest.fn(),
    }

    test('writes a non-zero-length string to stdout', async () => {
      await unitTests(ctx)
      expect(ctx.stdout).toHaveBeenCalledWith('truthy')
    })
  })
})
