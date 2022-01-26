import moment from 'moment'

const baseRecipeSchema = {
  '@context': 'http://schema.org',
  '@type': 'Recipe',
  image: {
    '@type': 'ImageObject',
    representativeOfPage: 'True',
  },
  author: {
    '@type': 'Organization',
    '@id': 'https://www.gousto.co.uk/',
    name: 'Gousto',
  }
}

function setSchemaMarkup(collection = {}) {
  const { thumbnail, url, datepublished, ...rest } = collection
  const { image, author, ...base } = baseRecipeSchema
  const schema = {
    ...base,
    ...(thumbnail && { image: { ...image, url: thumbnail }}),
    ...(url && { author: { ...author, url }}),
    ...(datepublished && { datepublished: moment(datepublished).format('DD MMM YYYY')}),
    ...rest,
  }

  return JSON.stringify(schema)
}

export {
  setSchemaMarkup
}
