
export const dateTransformer = (response) => {

  return response.data[1].attributes.ends_at
}
