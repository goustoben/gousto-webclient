export const addUserIdToUrl = (url, userId) => (
  (userId)
    ? `${url}/?user_id=${userId}`
    : url
)

export const slugify = (text) =>
  text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
