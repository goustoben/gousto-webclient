import { userRules } from '../user'

describe('user utils', () => {
  describe('given userRules', () => {
    let output
    let isPassStrengthEnabled
    const sectionName = 'account'

    describe('when isPassStrengthEnabled is false', () => {
      beforeEach(() => {
        isPassStrengthEnabled = false
        output = userRules(sectionName)(isPassStrengthEnabled)
      })

      test('then should contain password rules', () => {
        expect(output['account.password']).toBeTruthy()
      })
    })

    describe('when isPassStrengthEnabled is true', () => {
      beforeEach(() => {
        isPassStrengthEnabled = true
        output = userRules(sectionName)(isPassStrengthEnabled)
      })

      test('then should not contain password rules', () => {
        expect(output['account.password']).toBeFalsy()
      })
    })
  })
})
