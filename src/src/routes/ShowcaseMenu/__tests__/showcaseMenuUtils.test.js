import Immutable from 'immutable'
import { getFilteredLines } from '../showcaseMenuUtils'

const menuCollectionsRaw = {
  id1: { id: 'id1', slug: 'all-recipes', shortTitle: 'All Recipes' },
  id2: { id: 'id2', slug: 'healthy-choices', shortTitle: 'Healthy Choices' },
  id3: { id: 'id3', slug: 'lean-in-15', shortTitle: 'Lean in 15' },
  id4: { id: 'id4', slug: 'fish', shortTitle: 'Fish' },
  id5: { id: 'id5', slug: 'prepped-in-5', shortTitle: 'Prepped in 5' },
  id6: { id: 'id6', slug: 'beef-pork', shortTitle: 'Beef & Pork' },
  id7: { id: 'id7', slug: 'dairy-free', shortTitle: 'Dairy-Free' },
  id8: { id: 'id8', slug: '10-minute-meals', shortTitle: '10-Minute Meals' },
  id9: { id: 'id9', slug: 'vegetarian', shortTitle: 'Vegetarian' },
  id10: {
    id: 'id10',
    slug: 'everyday-favourites',
    line: 1,
    shortTitle: 'Everyday Favourites',
  },
  id11: { id: 'id11', slug: 'chicken', shortTitle: 'Chicken' },
  id12: { id: 'id12', slug: 'plant-based', shortTitle: 'Plant-Based' },
  id13: { id: 'id13', slug: 'gluten-free', shortTitle: 'Gluten-Free' },
}

describe('given getFilteredLines is called', () => {
  describe('when menuCollections contains all matching collections', () => {
    test('then it should split them into lines according to predefined order', () => {
      const expected = [
        [
          { id: 'id1', line: 0, shortTitle: 'All Recipes', slug: 'all-recipes' },
          { id: 'id2', line: 0, shortTitle: 'Healthy Choices', slug: 'healthy-choices' },
          { id: 'id3', line: 0, shortTitle: 'Lean in 15', slug: 'lean-in-15' },
          { id: 'id4', line: 0, shortTitle: 'Fish', slug: 'fish' },
          { id: 'id5', line: 0, shortTitle: 'Prepped in 5', slug: 'prepped-in-5' },
          { id: 'id6', line: 0, shortTitle: 'Beef & Pork', slug: 'beef-pork' },
          { id: 'id7', line: 0, shortTitle: 'Dairy-Free', slug: 'dairy-free' },
        ],
        [
          { id: 'id8', line: 1, shortTitle: '10-Minute Meals', slug: '10-minute-meals' },
          { id: 'id9', line: 1, shortTitle: 'Vegetarian', slug: 'vegetarian' },
          { id: 'id10', line: 1, shortTitle: 'Everyday Favourites', slug: 'everyday-favourites' },
          { id: 'id11', line: 1, shortTitle: 'Chicken', slug: 'chicken' },
          { id: 'id12', line: 1, shortTitle: 'Plant-Based', slug: 'plant-based' },
          { id: 'id13', line: 1, shortTitle: 'Gluten-Free', slug: 'gluten-free' },
        ],
      ]
      const result = getFilteredLines(Immutable.fromJS(menuCollectionsRaw))

      expect(result).toStrictEqual(expected)
    })
  })

  describe('when there are extra collections', () => {
    test('then it should append them to alternate lines', () => {
      const menuCollections = Immutable.fromJS({
        ...menuCollectionsRaw,
        id14: { id: 'id14', slug: 'calorie-controlled', shortTitle: 'Calorie Controlled' },
        id15: { id: 'id15', slug: 'all-chopped', shortTitle: 'All Chopped' },
      })

      const expected = [
        [
          { id: 'id1', line: 0, shortTitle: 'All Recipes', slug: 'all-recipes' },
          { id: 'id2', line: 0, shortTitle: 'Healthy Choices', slug: 'healthy-choices' },
          { id: 'id3', line: 0, shortTitle: 'Lean in 15', slug: 'lean-in-15' },
          { id: 'id4', line: 0, shortTitle: 'Fish', slug: 'fish' },
          { id: 'id5', line: 0, shortTitle: 'Prepped in 5', slug: 'prepped-in-5' },
          { id: 'id6', line: 0, shortTitle: 'Beef & Pork', slug: 'beef-pork' },
          { id: 'id7', line: 0, shortTitle: 'Dairy-Free', slug: 'dairy-free' },
          { id: 'id14', line: 0, shortTitle: 'Calorie Controlled', slug: 'calorie-controlled' },
        ],
        [
          { id: 'id8', line: 1, shortTitle: '10-Minute Meals', slug: '10-minute-meals' },
          { id: 'id9', line: 1, shortTitle: 'Vegetarian', slug: 'vegetarian' },
          { id: 'id10', line: 1, shortTitle: 'Everyday Favourites', slug: 'everyday-favourites' },
          { id: 'id11', line: 1, shortTitle: 'Chicken', slug: 'chicken' },
          { id: 'id12', line: 1, shortTitle: 'Plant-Based', slug: 'plant-based' },
          { id: 'id13', line: 1, shortTitle: 'Gluten-Free', slug: 'gluten-free' },
          { id: 'id15', line: 1, slug: 'all-chopped', shortTitle: 'All Chopped' },
        ],
      ]
      const result = getFilteredLines(menuCollections)

      expect(result).toStrictEqual(expected)
    })
  })

  describe('when there are fewer collection than defined', () => {
    const menuCollections = Immutable.fromJS({
      id0: {
        id: 'id1',
        slug: 'all-recipes',
        shortTitle: 'All Recipes',
      },
      id8: { id: 'id8', slug: '10-minute-meals', shortTitle: '10-Minute Meals' },
    })

    test('then it should return only the existing collections', () => {
      const result = getFilteredLines(menuCollections)
      const expected = [
        [{ id: 'id1', line: 0, shortTitle: 'All Recipes', slug: 'all-recipes' }],
        [{ id: 'id8', line: 1, shortTitle: '10-Minute Meals', slug: '10-minute-meals' }],
      ]

      expect(result).toStrictEqual(expected)
    })
  })
})
