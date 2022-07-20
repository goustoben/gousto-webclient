import Immutable from 'immutable'

export function getDietaryClaimSlugs(recipe: Immutable.Map<string, any>): Immutable.List<string> {
  if (!recipe) {
    return Immutable.List([])
  }

  const claims: Immutable.List<Immutable.Map<string, any>> = recipe.get('dietaryClaims', Immutable.List([]))

  return claims.map(tag => tag?.get('slug')) as Immutable.List<string>
}
