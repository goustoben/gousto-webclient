
export const dateTransformer = (response) => {
  if (response.data && response.data.length) {
    if (response.data.length > 1) {
      return response.data[response.data.length-1].attributes.ends_at
    }

    return response.data[0].attributes.ends_at
  }

  return
}
