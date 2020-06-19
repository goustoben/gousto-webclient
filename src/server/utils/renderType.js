export const isServerSideFetchEligible = (headers, path) => {
  const isNonProdMenuRoute = (path === '/menu' || path.startsWith('/menu/')) && __ENV__ !== 'production'
  if (isNonProdMenuRoute || headers['x-pre-render'] === 'false') {
    return false
  }

  return true
}
