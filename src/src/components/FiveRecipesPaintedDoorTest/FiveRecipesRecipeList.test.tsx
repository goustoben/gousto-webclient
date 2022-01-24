import '@testing-library/jest-dom'
import React from 'react'
import Immutable from 'immutable'
import { FiveRecipesRecipeList } from './FiveRecipesRecipeList'
import { createStore, renderWithStore } from '../../../jest/helper'

describe('<FiveRecipesRecipeList />', () => {
  let store = createStore({})

  beforeEach(() => {
    store = createStore({})
  })

  const renderRecipeList = (filledRecipes: number) => renderWithStore(<FiveRecipesRecipeList filledRecipes={filledRecipes} view="mobile" browser="" />, store)

  it('should render all empty recipes at the beginning', () => {
    const screen = renderRecipeList(0)

    const allButtons = screen.queryAllByRole('button')

    expect(allButtons.length).toBe(5)
  })

  it('should render remaining empty slots after the filled ones', () => {
    const screen = renderRecipeList(2)

    const allButtons = screen.queryAllByRole('button')

    expect(allButtons.length).toBe(3)
    expect(screen.queryByText('Add recipe')).toBeFalsy()
    expect(screen.queryByText(/for[\s\S]*£6.25[\s\S]*per[\s\S]*serving/i)).toBeFalsy()
    expect(screen.queryByText(/for[\s\S]*£5[\s\S]*per[\s\S]*serving/i)).toBeTruthy()
  })

  it('should not render anything if all slots are filled', () => {
    const screen = renderRecipeList(5)

    const allButtons = screen.queryAllByRole('button')

    expect(allButtons.length).toBe(0)
  })

  describe('When the user has a discount', () => {
    it('', () => {
      store = createStore({
        menuBoxPrices: Immutable.fromJS({
          2: {
            2: {
              vegetarian: {
                percentageOff: '60.00',
              },
            },
          },
        })
      })

      const screen = renderRecipeList(2)

      const allButtons = screen.queryAllByRole('button')

      expect(allButtons.length).toBe(3)
      expect(screen.queryByText('Add recipe')).toBeFalsy()
      expect(screen.queryByText(/for[\s\S]*£2.50[\s\S]*per[\s\S]*serving/i)).toBeFalsy()
      expect(screen.queryByText(/for[\s\S]*£2.00[\s\S]*per[\s\S]*serving/i)).toBeTruthy()
    })
  })
})
