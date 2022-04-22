import { getDietaryTags } from 'utils/recipe'
import { useBasket, NumberOfPortions } from '../../../domains/basket'
import { CollectionSlug } from '../../../domains/collections'
import { useRecipe } from '../../../context/recipeContext'
import { VisibleAttribute } from './RecipeAttribute'
import { detailedRecipePriorityOrder } from './config'

type AttributeConfigInGrid = {
  name: VisibleAttribute
  value: string | number | boolean
  icon: string
  show: boolean
}

export const useAttributes = ({ maxNoAttributes }: { maxNoAttributes?: number } = {}) => {
  const recipe = useRecipe()
  const { numPortions } = useBasket()

  if (!recipe) {
    return []
  }

  const cookingTime: number | null =
    numPortions === NumberOfPortions.Two
      ? (recipe.get('cookingTime') as number)
      : (recipe.get('cookingTimeFamily') as number)

  const useWithin = recipe.get('shelfLifeDays') as string
  const fiveADay = recipe.get('fiveADay') as number
  const diet = recipe.get('dietType') as string
  const cals = recipe.getIn(['nutritionalInformation', 'perPortion', 'energyKcal'], 0) as number
  const cuisine = recipe.get('cuisine') as string
  const isChefPrepared = recipe.get('chefPrepared' || false) as boolean

  const dietaryTagSlugs: string[] = getDietaryTags(recipe)
  const dairyFree = dietaryTagSlugs.some((slug) => slug === CollectionSlug.DairyFree)
  const glutenFree = dietaryTagSlugs.some((slug) => slug === CollectionSlug.GlutenFree)

  const attributes: AttributeConfigInGrid[] = [
    {
      name: 'cookingTime',
      value: cookingTime || 0,
      icon: 'icon-time',
      show: !isChefPrepared && Boolean(cookingTime),
    },
    {
      name: 'useWithin',
      value: useWithin,
      icon: 'icon-use-within',
      show: Boolean(useWithin),
    },
    {
      name: 'diet',
      value: diet,
      icon: 'icon-diet',
      show: Boolean(diet) && ['vegetarian', 'vegan'].includes(diet.toLowerCase()),
    },
    { name: 'fiveADay', value: fiveADay, icon: 'icon-five-a-day', show: fiveADay > 0 },
    { name: 'cals', value: cals || '', icon: 'icon-calories', show: Boolean(cals) },
    { name: 'cuisine', value: cuisine || '', icon: 'icon-cuisine', show: Boolean(cuisine) },
    { name: 'glutenFree', value: glutenFree, icon: 'icon-gluten-free', show: Boolean(glutenFree) },
    { name: 'dairyFree', value: dairyFree, icon: 'icon-dairy-free', show: Boolean(dairyFree) },
    {
      name: 'numPortions',
      value: numPortions || 0,
      icon: 'icon-servings',
      show: Boolean(isChefPrepared) && Boolean(numPortions),
    },
  ]

  const attributesInPriorityOrder = detailedRecipePriorityOrder.reduce(
    (acc: AttributeConfigInGrid[], attributeName) => {
      const anAttribute = attributes.find(({ name }) => name === attributeName)

      return anAttribute ? [...acc, anAttribute] : acc
    },
    [],
  )

  return attributesInPriorityOrder.filter(({ show }) => show !== false).slice(0, maxNoAttributes)
}
