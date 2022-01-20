import DOMPurify from 'dompurify'

export const sanitize = (input) => DOMPurify.sanitize(input)
