export const isRecipeInBasket = (recipe, basketRecipes) => basketRecipes.has(recipe.get('id'))

export const getScrollOffset = (threshold, animationThreshold, scrolledPastPoint) => {
  if (window.pageYOffset < threshold && scrolledPastPoint) {
    return ({
      scrolledPastPoint: false,
      scrollJumped: false
    })
  }
  if (window.pageYOffset >= threshold && !scrolledPastPoint) {
    return ({
      scrolledPastPoint: true,
      scrollJumped: (window.pageYOffset - threshold) > animationThreshold,
    })
  }
}

export const getMenuLimits = (data) => {
  const menuLimits = {}
  data.forEach(menu => {
    let limits = []
    if (menu.relationships && menu.relationships.limits && menu.relationships.limits.data ) {
      limits = menu.relationships.limits.data
    }

    menuLimits[menu.id] = {
      limits,
      startsAt: menu.attributes.starts_at,
      endsAt: menu.attributes.ends_at
    }
  })

  return menuLimits
}

const permutator = (inputArr) => {
  const result = []

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice()
        const next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}

const flattenAlternatives = (variantGroup) => {
  const main = {
    id: variantGroup.id,
    coreRecipeId: variantGroup.core_recipe_id,
    displayName: variantGroup.attributes && variantGroup.attributes.short_display_name
  }

  const children = variantGroup.relationships
    .filter(relation => relation.data.type === 'recipe')
    .map(relation => ({
      id: relation.data.id,
      coreRecipeId: relation.data.core_recipe_id,
      displayName: relation.data.attributes && relation.data.attributes.short_display_name
    }))

  return [main, ...children]
}

// permute a variant group so that a lookup table entry is created for all recipes in that group
// e.g. getVariantPermutations({ id: 'a', alternatives: [ { id: 'b' }, { id: 'c' } ] })
// {
//     'a': [ { id: 'b' }, { id: 'c' } ],
//     'b': [ { id: 'a' }, { id: 'c' } ],
//     'c': [ { id: 'a' }, { id: 'b' } ]
// }
// this transformation makes lookups from state significantly easier
const getVariantPermutations = (variantGroup) => {
  const flatAlternatives = flattenAlternatives(variantGroup)

  // if there is only 1 or 0 alternatives
  if (flatAlternatives.length < 2) {
    return null
  }

  const permutations = permutator(flatAlternatives)

  // we only need a single permutation for each key,
  // [ 'a', 'b', 'c' ] and [ 'a', 'c', 'b' ] are the same for indexing purposes (it only takes the first item as key)
  // so we can discard any subsequent permutations for that key
  const filteredPermutationsByKey = permutations.reduce((acc, cur) => {
    const firstItem = cur[0]

    if (acc[firstItem.coreRecipeId]) {
      return acc
    }

    return {
      ...acc,
      [firstItem.coreRecipeId]: cur
    }
  }, {})

  return Object.values(filteredPermutationsByKey)
}

const getMenuVariantsForMenu = (menuVariantGroups) => {
  const menuOutput = {}

  // a menuVariantGroup is one parent recipe and all its alternatives
  menuVariantGroups.forEach(variantGroup => {
    const permutations = getVariantPermutations(variantGroup)

    if (!permutations) {
      return
    }
    if (!variantGroup.relationships || !variantGroup.relationships[0] || !variantGroup.relationships[0].type) {
      return
    }

    if (variantGroup.relationships[0].type === 'alternative') {
      // for each permutation, set up a parent/child relationship
      permutations.forEach(permutationGroup => {
        const [parent, ...alternatives] = permutationGroup

        if (menuOutput[parent.coreRecipeId]) {
          return
        }

        menuOutput[parent.coreRecipeId] = {
          displayName: parent.displayName,
          alternatives
        }
      })
    }

    if (variantGroup.relationships[0].type === 'side') {
      const [parent, ...sides] = flattenAlternatives(variantGroup)
      if (menuOutput[parent.coreRecipeId]) {
        return
      }

      menuOutput[parent.coreRecipeId] = {
        displayName: parent.displayName,
        sides
      }
    }
  })

  return menuOutput
}

export const getMenuVariants = (menus) => {
  const output = {}

  menus.forEach(menu => {
    if (!menu || !menu.relationships || !menu.relationships.recipe_options || !menu.relationships.recipe_options.data) {
      return
    }

    const {
      id: menuId,
      relationships: { recipe_options: { data: menuVariantGroups } }
    } = menu

    output[menuId] = getMenuVariantsForMenu(menuVariantGroups)
  })

  return output
}

export const switchSelectedVariants = (originalVariants, payload) => {
  const currentCollectionVariants = originalVariants[payload.collectionId]
  let filteredCollectionVariants = { ...currentCollectionVariants}
  if (currentCollectionVariants) {
    filteredCollectionVariants = Object.assign({}, ...Object.entries(currentCollectionVariants)
      .filter(([ , value]) => value !== payload.originalRecipeId)
      .map(([k, v]) => ({[k]: v})))
  }
  const newVariants = {
    ...originalVariants,
    [payload.collectionId]: {
      ...filteredCollectionVariants,
      [payload.originalRecipeId]: payload.variantId
    }
  }

  return newVariants
}
