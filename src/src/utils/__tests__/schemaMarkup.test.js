import { setSchemaMarkup } from 'utils/schemaMarkup'

describe('schemaMarkup', () => {
  let markup

  describe('when function has no params', () => {
    beforeEach(() => {
      markup = setSchemaMarkup()
    })

    test('then should return a string by default', () => {
      expect(typeof markup).toBe('string')
    })

    test('then result should match default params', () => {
      const expected = {
        '@context': 'http://schema.org',
        '@type': 'Recipe',
      }
      expect(markup).toMatch(JSON.stringify(expected))
    })
  })

  describe('when function has params', () => {
    const schemaProps = {
      name: 'Asian Recipes',
      description: 'Asian Recipes description',
      thumbnail: 'imageSrc',
      url: 'https://www.gousto.co.uk/cookbook/asian-recipes',
      datepublished: '28 May 2019',
      recipeingredient: 'Asian Recipes'
    }

    const expected = {
      '@context': 'http://schema.org',
      '@type': 'Recipe',
      image: {
        '@type': 'ImageObject',
        representativeOfPage: 'True',
        url: 'imageSrc'
      },
      author: {
        '@type': 'Organization',
        '@id': 'https://www.gousto.co.uk/',
        name: 'Gousto',
        url: 'https://www.gousto.co.uk/cookbook/asian-recipes'
      },
      datepublished: '28 May 2019',
      name: 'Asian Recipes',
      description: 'Asian Recipes description',
      recipeingredient: 'Asian Recipes'
    }

    beforeEach(() => {
      markup = setSchemaMarkup(schemaProps)
    })

    test('then should match all the params', () => {
      expect(markup).toMatch(JSON.stringify(expected))
    })
  })
})
