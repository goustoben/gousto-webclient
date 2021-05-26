import {
  getCollectionDescriptorsInLines,
  getCollectionDescriptorsSingleLine,
} from '../showcaseMenuSelectors'

jest.mock('routes/Menu/selectors/collections', () => ({
  getDisplayedCollections: jest.fn(() => null),
}))

const state = {}

describe('showcaseMenuSelectors', () => {
  describe('given getCollectionDescriptorsInLines is called', () => {
    test('then it should separate the hard-coded collections into lines', () => {
      const expected = [
        [
          { slug: 'all-recipes', shortTitle: 'All Recipes' },
          { slug: 'healthy-choices', shortTitle: 'Healthy Choices' },
          { slug: 'lean-in-15', shortTitle: 'Lean in 15' },
          { slug: 'fish', shortTitle: 'Fish' },
          { slug: 'prepped-in-5', shortTitle: 'Prepped in 5' },
          { slug: 'beef-pork', shortTitle: 'Beef & Pork' },
          { slug: 'dairy-free', shortTitle: 'Dairy-Free' },
        ],
        [
          { slug: '10-minute-meals', shortTitle: '10-Minute Meals' },
          { slug: 'vegetarian', shortTitle: 'Vegetarian' },
          {
            slug: 'everyday-favourites',
            line: 1,
            shortTitle: 'Everyday Favourites',
          },
          { slug: 'chicken', shortTitle: 'Chicken' },
          { slug: 'plant-based', shortTitle: 'Plant-Based' },
          { slug: 'gluten-free', shortTitle: 'Gluten-Free' },
        ],
      ]

      const result = getCollectionDescriptorsInLines(state)

      expect(result).toMatchObject(expected)
    })
  })

  describe('given getCollectionDescriptorsSingleLine is called', () => {
    test('then it should return the collections as one array preserving order', () => {
      const expected = [
        { slug: 'all-recipes', shortTitle: 'All Recipes' },
        { slug: 'healthy-choices', shortTitle: 'Healthy Choices' },
        { slug: 'lean-in-15', shortTitle: 'Lean in 15' },
        { slug: 'fish', shortTitle: 'Fish' },
        { slug: 'prepped-in-5', shortTitle: 'Prepped in 5' },
        { slug: 'beef-pork', shortTitle: 'Beef & Pork' },
        { slug: 'dairy-free', shortTitle: 'Dairy-Free' },
        { slug: '10-minute-meals', shortTitle: '10-Minute Meals' },
        { slug: 'vegetarian', shortTitle: 'Vegetarian' },
        {
          slug: 'everyday-favourites',
          line: 1,
          shortTitle: 'Everyday Favourites',
        },
        { slug: 'chicken', shortTitle: 'Chicken' },
        { slug: 'plant-based', shortTitle: 'Plant-Based' },
        { slug: 'gluten-free', shortTitle: 'Gluten-Free' },
      ]

      const result = getCollectionDescriptorsSingleLine(state)

      expect(result).toMatchObject(expected)
    })
  })
})
