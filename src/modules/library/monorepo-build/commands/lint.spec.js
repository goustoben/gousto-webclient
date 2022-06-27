const { lint } = require('./lint')

describe('Lint command', () => {
  const change = (relativePath) => ({
    deleted: false,
    filepath: 'src/module/' + relativePath,
    relativePath,
  })

  const deletion = (relativePath) => ({
    deleted: true,
    filepath: 'src/module/' + relativePath,
    relativePath,
  })

  describe('when there are no local changes', () => {
    const ctx = {
      localChanges: () => [],
      stdout: jest.fn(),
    }

    test('does not write to stdout', async () => {
      await lint(ctx)
      expect(ctx.stdout).not.toHaveBeenCalled()
    })
  })

  describe('When local .eslintignore is changed', () => {
    const ctx = {
      localChanges: () => [change('.eslintignore')],
      stdout: jest.fn(),
    }

    test('will write a dot to stdout, forcing complete re-linting', async () => {
      await lint(ctx)
      expect(ctx.stdout).toHaveBeenCalledTimes(1)
      expect(ctx.stdout).toHaveBeenCalledWith('.')
    })
  })

  describe('When local .eslintrc.js is changed', () => {
    const ctx = {
      localChanges: () => [deletion('.eslintrc.js')],
      stdout: jest.fn(),
    }

    test('will write a dot to stdout, forcing complete re-linting', async () => {
      await lint(ctx)
      expect(ctx.stdout).toHaveBeenCalledTimes(1)
      expect(ctx.stdout).toHaveBeenCalledWith('.')
    })
  })

  describe('When local changes include deleted and non-JS/TS files', () => {
    const ctx = {
      localChanges: () => [
        change('typescript.ts'),
        change('typescript/react.tsx'),
        change('javascript.js'),
        change('javascript/react.jsx'),
        change('stylesheet.css'),
        change('package.json'),
        change('tests/fixture.json'),
        deletion('deleted/react.js'),
        deletion('deleted/picture.png'),
      ],
      stdout: jest.fn(),
    }

    let entries
    beforeAll(async () => {
      await lint(ctx)
      const line = ctx.stdout.mock.calls[0][0]
      entries = line.split(' ')
    })

    test('Excludes deleted files', () => {
      expect(entries.includes('deleted/react.js')).toBe(false)
      expect(entries.includes('deleted/picture.png')).toBe(false)
    })

    test('Excludes non-js files', () => {
      expect(entries.includes('stylesheet.css')).toBe(false)
      expect(entries.includes('package.json')).toBe(false)
      expect(entries.includes('tests/fixture.json')).toBe(false)
    })

    test('Includes other files, as relative paths', () => {
      expect(entries.includes('typescript.ts')).toBe(true)
      expect(entries.includes('typescript/react.tsx')).toBe(true)
      expect(entries.includes('javascript.js')).toBe(true)
      expect(entries.includes('javascript/react.jsx')).toBe(true)
    })
  })
})
