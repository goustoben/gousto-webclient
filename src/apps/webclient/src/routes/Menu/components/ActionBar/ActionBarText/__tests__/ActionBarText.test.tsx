import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { ActionBarText } from '../ActionBarText'

describe('ActionBarText', () => {
  let rendered: RenderResult

  describe('when there are zero recipes', () => {
    beforeEach(() => {
      rendered = render(
        <ActionBarText
          numRecipes={0}
          maxRecipes={4}
          currentTierPricePerPortion={null}
          nextTierPricePerPortion={null}
          isLoading={false}
          isInEmbeddedActionBar={false}
        />
      )
    })

    test('then it should display correct text', () => {
      const { getByText } = rendered
      expect(getByText('Add first recipe')).toBeDefined()
      expect(getByText('to get started')).toBeDefined()
    })
  })

  describe('when there is one recipe', () => {
    beforeEach(() => {
      rendered = render(
        <ActionBarText
          numRecipes={1}
          maxRecipes={4}
          currentTierPricePerPortion={null}
          nextTierPricePerPortion={null}
          isLoading={false}
          isInEmbeddedActionBar={false}
        />
      )
    })

    test('then it should display correct text', () => {
      const { getByText } = rendered
      expect(getByText('Add at least 2 recipes')).toBeDefined()
      expect(getByText('to checkout')).toBeDefined()
    })
  })

  describe('when there are two recipes', () => {
    beforeEach(() => {
      rendered = render(
        <ActionBarText
          numRecipes={2}
          maxRecipes={4}
          currentTierPricePerPortion="1.59"
          nextTierPricePerPortion="1.43"
          isLoading={false}
          isInEmbeddedActionBar={false}
        />
      )
    })

    test('then it should display correct text and prices', () => {
      const { getByText } = rendered
      expect(getByText('Add 3rd recipe to reduce price per portion:')).toBeDefined()
      expect(getByText('£1.59 →')).toBeDefined()
      expect(getByText('£1.43')).toBeDefined()
    })
  })

  describe('when there are four recipes', () => {
    beforeEach(() => {
      rendered = render(
        <ActionBarText
          numRecipes={4}
          maxRecipes={4}
          currentTierPricePerPortion="1.26"
          nextTierPricePerPortion={null}
          isLoading={false}
          isInEmbeddedActionBar={false}
        />
      )
    })

    test('then it should display correct text and prices', () => {
      const { getByText } = rendered
      expect(getByText('4 recipes added at the')).toBeDefined()
      expect(getByText('best price per portion')).toBeDefined()
      expect(getByText('of £1.26')).toBeDefined()
    })
  })
})
