import configAuth from 'config/auth'
import { addPrefix } from 'validations/util'

const rules = (isPassStrengthEnabled) => ({
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
