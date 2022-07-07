import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { useIsFiveRecipesEnabled } from 'hooks/useIsFiveRecipesEnabled'

import { BoxSizeStep } from '../BoxSize/BoxSizeStep'

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
  signup: Immutable.fromJS({}),
  ribbon: Immutable.fromJS({}),
})

const numPortionChange = jest.fn()
const numPortionChangeTracking = jest.fn()
const trackSignupWizardAction = jest.fn()
const next = jest.fn()

const useIsFiveRecipesEnabledUnknown: unknown = useIsFiveRecipesEnabled
const useIsFiveRecipesEnabledMock = useIsFiveRecipesEnabledUnknown as jest.Mock

describe('given the user is at the Box Size Step', () => {
  describe('When: five recipes disabled', () => {
    beforeEach(() => {
      useIsFiveRecipesEnabledMock.mockImplementation(() => ({
        isFiveRecipesExperimentEnabled: false,
        isFiveRecipesEnabled: false,
      }))

      render(
        <Provider store={mockedStore}>
          <BoxSizeStep
            numPortionChange={numPortionChange}
            numPortionChangeTracking={numPortionChangeTracking}
            next={next}
            trackSignupWizardAction={trackSignupWizardAction}
          />
        </Provider>,
      )
    })

    test('then the component renders correctly', () => {
      expect(screen.getByRole('heading', { name: 'Choose your box size' })).toBeDefined()
      expect(screen.getByText('You can choose 2, 3 or 4 recipes per box.')).toBeDefined()

      expect(screen.getByRole('heading', { name: 'Regular box' })).toBeDefined()
      expect(screen.getByText('2 adults (or 1 + leftovers)')).toBeDefined()
      expect(screen.getByText('1 adult and 1-2 children')).toBeDefined()

      expect(screen.getByRole('heading', { name: 'Large box' })).toBeDefined()
      expect(screen.getByText('4 adults (or 2-3 + leftovers)')).toBeDefined()
      expect(screen.getByText('2 adults and 2-3 children')).toBeDefined()
    })

    describe('when the user chooses the box size', () => {
      test('then proper amount of portions are set correctly regular box', () => {
        const button = screen.getByRole('button', {
          name: 'Choose regular box',
        })
        expect(button).toBeDefined()
        fireEvent(
          button,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        )
        expect(numPortionChange).toHaveBeenCalledWith(2)
        expect(numPortionChangeTracking).toHaveBeenCalledWith(2)
        expect(trackSignupWizardAction).toHaveBeenCalledWith('complete_wizard_box_size', {
          box_size: 2,
        })
        expect(next).toHaveBeenCalledWith()
      })

      test('then proper amount of portions are set correctly large box', () => {
        const button = screen.getByRole('button', {
          name: 'Choose large box',
        })
        expect(button).toBeDefined()
        fireEvent(
          button,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        )
        expect(numPortionChange).toHaveBeenCalledWith(4)
        expect(numPortionChangeTracking).toHaveBeenCalledWith(4)
        expect(trackSignupWizardAction).toHaveBeenCalledWith('complete_wizard_box_size', {
          box_size: 4,
        })
        expect(next).toHaveBeenCalledWith()
      })
    })
  })

  describe('When: five recipes enabled', () => {
    beforeEach(() => {
      useIsFiveRecipesEnabledMock.mockImplementation(() => ({
        isFiveRecipesExperimentEnabled: true,
        isFiveRecipesEnabled: true,
      }))

      render(
        <Provider store={mockedStore}>
          <BoxSizeStep
            numPortionChange={numPortionChange}
            numPortionChangeTracking={numPortionChangeTracking}
            next={next}
            trackSignupWizardAction={trackSignupWizardAction}
          />
        </Provider>,
      )
      screen.logTestingPlaygroundURL()
    })

    test('then the component renders correctly', () => {
      expect(screen.getAllByText('You can choose from')).toHaveLength(2)
      expect(screen.getByText('2 to 5')).toBeDefined()
      expect(screen.getByText('2 to 4')).toBeDefined()
      expect(screen.getAllByText('recipes per box.')).toHaveLength(2)
    })
  })
})
