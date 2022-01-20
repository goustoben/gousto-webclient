export const passwordCriteria = [
  { rule: 'validation.min.string.password', message: '8 characters or more' },
  { rule: 'validation.max.string.password', message: 'too long' },
  {
    rule: 'validation.one_uppercase_character.password',
    message: 'at least one uppercase letter (A-Z)',
  },
  {
    rule: 'validation.one_lowercase_character.password',
    message: 'at least one lower case letter (a-z)',
  },
  {
    rule: 'validation.one_symbol_or_number.password',
    message: 'at least one number (0-9) or symbol',
  },
  { rule: 'validation.password_policy.password', message: 'not a common word' },
]
