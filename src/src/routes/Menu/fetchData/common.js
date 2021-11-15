export const options = {
    method: 'GET',
    cache: 'default',
    headers: {},
    timeout: null,
    includeCookies: false,
    useMenuService: true
}
export const getTasteProfileIdFromQuery = (query) => {
  if (query && query.tasteProfileId) {
    return query.tasteProfileId
  }

  return null
}
