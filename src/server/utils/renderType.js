
export const isServerSideRenderEligible = (headers) => {
  if (headers['x-pre-render'] === 'false') {
    return false
  }

  return true
}
