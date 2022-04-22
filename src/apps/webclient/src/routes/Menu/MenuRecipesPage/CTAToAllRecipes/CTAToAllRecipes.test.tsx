import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, fireEvent } from '@testing-library/react'
import { createMockStore } from 'routes/Menu/_testing/createMockStore'
import * as CollectionHooks from 'routes/Menu/domains/collections'
import { CTAToAllRecipes } from './CTAToAllRecipes'

function renderForTest(currentCollectionId: string) {
  const store = createMockStore()
  const changeCollectionById = jest.fn()

  jest.spyOn(CollectionHooks, 'useCollections').mockImplementation(
    () =>
      ({
        changeCollectionById,
        currentCollectionId,
      } as any),
  )

  render(
    <Provider store={store}>
      <CTAToAllRecipes />
    </Provider>,
  )

  return { changeCollectionById }
}

describe('CTAToAllRecipes', () => {
  describe('given the collection is recommendations', () => {
    const collectionId = CollectionHooks.CollectionId.Recommendations

    test('CTA text should be displayed', () => {
      renderForTest(collectionId)

      const cta = screen.getByText('Want to see more?')
      expect(cta).toBeTruthy()
    })

    test('clicking should change collection', () => {
      const { changeCollectionById } = renderForTest(collectionId)

      fireEvent.click(screen.getByRole('button'))

      expect(changeCollectionById).toHaveBeenCalledWith(CollectionHooks.CollectionId.AllRecipes)
    })
  })

  describe('given the collection is not recommendations', () => {
    const collectionId = CollectionHooks.CollectionId.AllRecipes

    test('then CTA text should not be displayed', () => {
      renderForTest(collectionId)

      const cta = screen.queryByText('Want to see more?')
      expect(cta).not.toBeTruthy()
    })
  })
})
