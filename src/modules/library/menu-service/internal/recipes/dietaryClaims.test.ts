import { TransformedRecipe } from '../transformer'
import { getDietaryClaimSlugs } from './dietaryClaims'

describe('getDietaryClaimSlugs', () => {
  const recipe: TransformedRecipe = {
    id: 'recipe-id',
    dietaryClaims: [{ slug: 'gluten-free' }, { slug: 'dairy-free' }],

    // TODO we should create a builder rather than casting
  } as TransformedRecipe

  test('should return correct slugs', () => {
    const result = getDietaryClaimSlugs(recipe)

    expect(result).toEqual(['gluten-free', 'dairy-free'])
  })
})
