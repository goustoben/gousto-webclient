import React from 'react'

import { render, RenderResult } from '@testing-library/react'

import { ActionBarText } from '../ActionBarText'

describe('ActionBarText', () => {
  let rendered: RenderResult

  describe('when there are zero recipes', () => {
    beforeEach(() => {
      rendered = render(
        <ActionBarText
          recipeCount={0}
          maxRecipes={4}
          nextTierPricePerPortion={null}
          isInEmbeddedActionBar={false}
        />,
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
          recipeCount={1}
          maxRecipes={4}
          nextTierPricePerPortion={null}
          isInEmbeddedActionBar={false}
        />,
      )
    })

    test('then it should display correct text', () => {
      const { getByText } = rendered
      expect(getByText('Add more recipes')).toBeDefined()
      expect(getByText('to complete your box')).toBeDefined()
    })
  })

  describe('when there are two recipes', () => {
    beforeEach(() => {
      rendered = render(
        <ActionBarText
          recipeCount={2}
          maxRecipes={4}
          nextTierPricePerPortion="1.43"
          isInEmbeddedActionBar={false}
        />,
      )
    })

    test('then it should display correct text and prices', () => {
      const { getByText } = rendered
      expect(getByText('Add 2 more recipes')).toBeDefined()
      expect(getByText('for the best price per portion of £1.43')).toBeDefined()
    })
  })

  describe('when there are three recipes', () => {
    beforeEach(() => {
      rendered = render(
        <ActionBarText
          recipeCount={3}
          maxRecipes={4}
          nextTierPricePerPortion="1.43"
          isInEmbeddedActionBar={false}
        />,
      )
    })

    test('then it should display correct text and prices', () => {
      const { getByText } = rendered
      expect(getByText('Add 1 more recipe')).toBeDefined()
      expect(getByText('for the best price per portion of £1.43')).toBeDefined()
    })
  })

  describe('when there are four recipes', () => {
    beforeEach(() => {
      rendered = render(
        <ActionBarText
          recipeCount={4}
          maxRecipes={4}
          nextTierPricePerPortion="1.26"
          isInEmbeddedActionBar={false}
        />,
      )
    })

    test('then it should display correct text and prices', () => {
      const { getByText } = rendered
      expect(getByText('4 recipes added at the')).toBeDefined()
      expect(getByText('best price per portion of £1.26')).toBeDefined()
    })
  })
})
