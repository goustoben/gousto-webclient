const baseColor = '#333d47'
const baseBackgroundColor = '#fff'
const invalidColor = '#c20026'
const invalidBackgroundColor = '#fbf4f4'
const placeholderColor = '#c0c5c9'

export const checkoutStyles = {
  base: {
    color: baseColor,
    backgroundColor: baseBackgroundColor,
    transition: 'none',
    padding: '7px 15px',
    fontSize: '18px',
    lineHeight: 1.4,
  },
  focus: {
    color: baseColor,
  },
  valid: {
    color: baseColor,
    backgroundColor: baseBackgroundColor,
  },
  invalid: {
    color: invalidColor,
    backgroundColor: invalidBackgroundColor,
  },
  placeholder: {
    base: {
      color: placeholderColor,
    },
    focus: {
      color: placeholderColor,
    },
  },
}
