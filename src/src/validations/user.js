import configAuth from 'config/auth'
import regExp from './regularExpressions'

export default {
  title: {
    field: 'title',
    rules: [

    ],
  },

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

  password: {
    field: 'password',
    rules: [
      { name: 'isLength', options: { min: configAuth.PASSWORD_MIN_LENGTH } },
    ],
  },
}
