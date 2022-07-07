import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { useIsFiveRecipesEnabled } from 'hooks/useIsFiveRecipesEnabled'

import { SellThePropositionPage } from '../SellThePropositionPage'

jest.mock('hooks/useIsFiveRecipesEnabled', () => ({
  useIsFiveRecipesEnabled: jest.fn(),
}))

const store = configureStore()
const mockedStore = store({
  auth: Immutable.fromJS({}),
  basket: Immutable.fromJS({}),
  menu: Immutable.fromJS({
    menuLimits: [],
  }),
  menuRecipeDetails: Immutable.fromJS({}),
  tracking: Immutable.fromJS({}),
  menuCollections: Immutable.fromJS({}),
  ribbon: Immutable.fromJS({}),
})

const signupGoToMenu = jest.fn()

const useIsFiveRecipesEnabledMock = useIsFiveRecipesEnabled as jest.MockedFunction<
  typeof useIsFiveRecipesEnabled
>

describe('Given: SellThePropositionPage', () => {
  describe('When: 5 recipes turned off', () => {
    beforeEach(() => {
      useIsFiveRecipesEnabledMock.mockImplementation(() => ({
        isFiveRecipesExperimentEnabled: false,
        isFiveRecipesEnabled: false,
      }))

      render(
        <Provider store={mockedStore}>
          <SellThePropositionPage signupGoToMenu={signupGoToMenu} />
        </Provider>,
      )
      screen.logTestingPlaygroundURL()
    })

    test('renders correctly', () => {
      expect(
        screen.getByRole('heading', {
          name: /get your taste buds ready\.\.\./i,
        }),
      ).toBeDefined()
      expect(screen.getByText('Greater value')).toBeDefined()
      expect(screen.getByText('the more recipes you add')).toBeDefined()

      expect(screen.getByText('Over 75 recipes')).toBeDefined()
      expect(screen.getByText('changing weekly')).toBeDefined()

      expect(screen.getByText('Choose 2 to 4 recipes')).toBeDefined()
      expect(screen.getByText('or skip a box')).toBeDefined()

      expect(screen.getByText('Meals for every appetite')).toBeDefined()
      expect(screen.getByText('and dietary need')).toBeDefined()
    })

    test('click on see this week`s menu button should call props func', () => {
      const button = screen.getByRole('button', {
        name: /see this week’s menu/i,
      })
      fireEvent(
        button,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      )

      expect(signupGoToMenu).toBeCalledTimes(1)
    })
  })

  describe('When: 5 recipes turned on', () => {
    beforeEach(() => {
      useIsFiveRecipesEnabledMock.mockImplementation(() => ({
        isFiveRecipesExperimentEnabled: true,
        isFiveRecipesEnabled: true,
      }))

      render(
        <Provider store={mockedStore}>
          <SellThePropositionPage signupGoToMenu={signupGoToMenu} />
        </Provider>,
      )
    })

    test('Text with 5 recipes should be presented', () => {
      expect(screen.getByText('Choose 2 to 5 recipes')).toBeDefined()
    })
  })
})
