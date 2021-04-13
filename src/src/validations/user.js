import configAuth from 'config/auth'
import { addPrefix } from 'validations/util'
import regExp from './regularExpressions'

const rules = (isPassStrengthEnabled) => ({
  firstName: {
    field: 'first name',
    rules: [
      { name: 'isLength', options: { min: 1 } },
      { name: 'isLength', options: { max: 200 } },
      { name: 'matches', options: regExp.name },
    ],
  },

  lastName: {
    field: 'last name',
    rules: [
      { name: 'isLength', options: { min: 1 } },
      { name: 'isLength', options: { max: 200 } },
      { name: 'matches', options: regExp.name },
    ],
  },

  ...(!isPassStrengthEnabled && {
    password: {
      field: 'password',
      rules: [
        { name: 'isLength', options: { min: configAuth.PASSWORD_MIN_LENGTH } },
      ],
    }
  }),
})

export const userRules = (userSectionName) => (isPassStrengthEnabled) => (
  addPrefix(userSectionName,{
    ...rules(isPassStrengthEnabled)
  })
)
