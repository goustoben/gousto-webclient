export const passwordCriteria = (password) => [
  ...((password && password.length > 255)
    ? {
      text: 'too long',
      type: 'max',
    }
    : {
      text: '8 characters or more',
      type: 'min',
    }
  ),
  {
    text: 'at least one lower case letter (a-z)',
    type: 'lowercase',
  },
  {
    text: 'at least one upper case letter (A-Z)',
    type: 'uppercase',
  },
  {
    text: 'at least one number (0-9) or symbol',
    type: 'digits',
  },
  {
    text: 'not a common word',
    type: 'oneOf',
  },
]
