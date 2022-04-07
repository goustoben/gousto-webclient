
import * as React from 'react'
import { RecipeContextProvider } from '../../model/context'
import { Tag, useRecipeBrandTag, useRecipeBrandTagline, findTag, useTag } from './useRecipeBrandTag'
import { renderHook } from '@testing-library/react-hooks'
import { useBrandInfo } from './useBrandInfo'

jest.mock('./useBrandInfo')

const useBrandInfoMock = useBrandInfo as jest.MockedFn<typeof useBrandInfo>

const TAG_1: Tag = {
  slug: 'new-eme',
  text: 'New',
  type: 'general',
  themes: [
    {
      name: 'light',
      color: '#01A92B',
      borderColor: '#01A92B',
    },
  ],
}

const TAG_2: Tag = {
  slug: 'limited-edition-eme',
  text: 'Limited Edition',
  type: 'general',
  themes: [
    {
      name: 'light',
      color: '#01A92B',
      borderColor: '#01A92B',
    },
  ],
}

const allTags = [TAG_1, TAG_2]

describe('useRecipeBrandTag', () => {
  const images = [
    { type: 'homepage-image', urls: ['a.png'] },
    { type: 'mood-image', urls: ['b.png'] },
  ]

  const renderUseRecipeTaglineHook = ({ tagline }: { tagline: string }) => {
    useBrandInfoMock.mockImplementation(() => ({
      brand: {
        tags: [TAG_1, TAG_2],
      },
    }))

    const recipeWithTagline = {
      id: '12345',
      title: 'A Recipe Title',
      media: {
        images,
      },
      tagline,
    }
    const customWrapper: React.FC = ({ children }) => (
      <RecipeContextProvider value={recipeWithTagline}>{children}</RecipeContextProvider>
    )

    return renderHook(() => useRecipeBrandTag(), { wrapper: customWrapper })
  }

  afterEach(() => jest.resetAllMocks())

  describe('when tagline matches a brand tag', () => {
    const { result } = renderUseRecipeTaglineHook({ tagline: TAG_1.slug })

    test('returns correct tag', () => {
      expect(result.current).toEqual({
        ...TAG_1,
        themes: undefined,
        theme: TAG_1.themes[0],
      })
    })
  })

  describe('when tagline does not match a brand tag', () => {
    const { result } = renderUseRecipeTaglineHook({ tagline: 'blablablabla' })

    test('returns correct tag', () => {
      expect(result.current).toEqual(null)
    })
  })
})

describe('useRecipeBrandTagline', () => {
  const images = [
    { type: 'homepage-image', urls: ['a.png'] },
    { type: 'mood-image', urls: ['b.png'] },
  ]

  afterEach(() => jest.resetAllMocks())

  describe('when recipe is not found in context', () => {
    const localWrapper: React.FC = ({ children }) => <>{children}</>

    it('should return null', () => {
      const { result } = renderHook(() => useRecipeBrandTagline(), { wrapper: localWrapper })
      expect(result.current).toEqual(null)
    })
  })

  describe('when recipe is found and has a tagline', () => {
    const localRecipe = {
      id: '12345',
      title: 'A Recipe Title',
      tagline: 'test-tagline',
      media: {
        images,
      },
    }
    const localWrapper: React.FC = ({ children }) => (
      <RecipeContextProvider value={localRecipe}>{children}</RecipeContextProvider>
    )

    it('it should return the tagline', () => {
      const { result } = renderHook(() => useRecipeBrandTagline(), { wrapper: localWrapper })
      expect(result.current).toEqual('test-tagline')
    })
  })
})

describe('findTag', () => {

  describe('when tag found', () => {
    test('it should return the tag found and the theme', () => {
      const result = ({
        ...TAG_1,
        themes: undefined,
        theme: TAG_1.themes[0]
      })
      expect(findTag(allTags, TAG_1.slug)).toEqual(result)
    })
  })

  describe('when tag is not found', () => {
    test('it should return null', () => {
      expect(findTag(allTags, 'tagline not found')).toEqual(null)
    })
  })

})

describe('useTag', () => {
  test('when no tagline, but brandTags present', () => {
    useBrandInfoMock.mockImplementation(() => ({
      brand: {
        tags: allTags,
      },
    }))
    expect(useTag(null)).toEqual(null)
  })

  afterEach(() => jest.resetAllMocks())

  test('when no brandTags, but tagline present', () => {
    useBrandInfoMock.mockImplementation(() => ({
      brand: {
        tags: [],
      },
    }))
    expect(useTag('new-eme')).toEqual(null)
  })

  afterEach(() => jest.resetAllMocks())

  test('when both brandTag and tagline present', () => {
    useBrandInfoMock.mockImplementation(() => ({
      brand: {
        tags: allTags,
      },
    }))
    expect(useTag('new-eme')).toEqual(findTag(allTags, 'new-eme'))
  })
})
