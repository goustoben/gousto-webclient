import { useRecipe } from '../../model/context'
import { useBrandInfo } from './useBrandInfo'

/* General: we use useRecipeBrandTag in Component BrangTag.tsx.
useRecipeBrandTag calls on  useTag, and useRecipeBrandTagline
(1) useRecipeBrandTagline - gets recipe from context, returns the tagline
(2) useTag calls on findTag with params of brandTags(all tags), and tagline(the chosen recipe tagline)
(3) returns foundTag - the tag object whose tagline matches the chosen recipe tagline
*/

type Theme = {
  name: string
  color: string
  borderColor?: string
  backgroundColor?: string
  iconColor?: string
}

type BrandTag = {
  slug: string
  text: string
  theme?: Theme
  themes?: Theme[]
}

export type Tag = {
  slug: string
  text: string
  themes: Theme[]
  type?: string
  icon?: string
}

export const findTag = (allTags: Tag[], tag: string): BrandTag | null => {
  const foundTag = allTags && allTags.find((tagData) => tagData.slug === tag)

  if (!foundTag) {
    return null
  }

  const foundTheme = foundTag.themes.find((theme) => theme.name === 'light')

    return {
      ...foundTag,
      themes: undefined,
      theme: foundTheme
    }

}

export const useTag = (tagline: string | null): BrandTag | null => {
  /* useBrandInfo is currently a slug. It has property 'tags' which contains objects of different tags.
  Each tag object contains properties like 'text' and 'themes */
  const brandInfo = useBrandInfo()
  const brandTags = brandInfo.brand?.tags || []

  if (!tagline || !brandTags.length) {
    return null
  }

  return findTag(brandTags, tagline)
}

export const useRecipeBrandTagline = (): string | null => {
  try {
    const recipe = useRecipe()

    if (!recipe) {
      return null
    }

    return recipe.tagline || null

  } catch (error) {
    console.error(`Failed to get recipe's tagline, error: ${error}`)
    return null
  }
}

export const useRecipeBrandTag = (): BrandTag | null => {
  const tagline = useRecipeBrandTagline()

  return useTag(tagline)
}
