import config from 'config'

export const addUserIdToHelpUrl = (isAuthenticated, userId) => {
  const { routes } = config

  return (isAuthenticated)
    ? `${routes.zendesk.faqs}/?user_id=${userId}`
    : routes.zendesk.faqs
}

export const slugify = (text) =>
  text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
