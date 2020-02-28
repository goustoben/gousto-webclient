import { flushPromises } from './utils'

describe('test utils', () => {
  describe('flushPromises', () => {
    let a
    let b

    describe('Given 2 promises that run one after the other', () => {
      beforeEach(() => {
        a = 0
        b = 0
      })

      describe('When flushPromises is not used', () => {
        test('The expects run before the promises resolve', () => {
          Promise.resolve().then(() => {
            a = 1
          }).then(() => {
            b = 2
          })

          expect(a).toBe(0)
          expect(b).toBe(0)
        })
      })

      describe('When flushPromises is used with await', () => {
        test('The expects run after the promises resolve and their then clauses are executed', async () => {
          Promise.resolve().then(() => {
            a = 1
          }).then(() => {
            b = 2
          })
          await flushPromises()

          expect(a).toBe(1)
          expect(b).toBe(2)
        })
      })

      describe('When something simpler like await Promise.resolve() is used', () => {
        test('Only one promise resolves before the expects', async () => {
          Promise.resolve().then(() => {
            a = 1
          }).then(() => {
            b = 2
          })
          await Promise.resolve()

          expect(a).toBe(1)
          expect(b).toBe(0)
        })

        test('All the promises resolve if used as many as promises are used', async () => {
          Promise.resolve().then(() => {
            a = 1
          }).then(() => {
            b = 2
          })
          await Promise.resolve()
          await Promise.resolve()

          expect(a).toBe(1)
          expect(b).toBe(2)
        })
      })
    })
  })
})
