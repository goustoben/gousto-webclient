import React from 'react'

import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useDispatch } from 'react-redux'

import { items } from '../../../Components/SellThePropositionPage/SellThePropositionPage'
import { trackSignupPersonalisationComplete } from '../../../signupActions'
import { PersonaliseMenuStep } from '../PersonaliseMenuStep'

jest.mock('../../../signupActions', () => ({
  ...jest.requireActual('../../../signupActions'),
  trackSignupPersonalisationComplete: jest.fn(),
}))
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))
const dispatch = jest.fn()

describe('given the user is at the Personalise Menu Step', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useDispatch.mockReturnValue(dispatch)
  })

  afterEach(jest.clearAllMocks)
  afterEach(cleanup)

  describe('when the component renders', () => {
    let renderedPersonaliseMenuStep

    beforeEach(() => {
      renderedPersonaliseMenuStep = render(<PersonaliseMenuStep />)
    })

    test('it has the correct title and instructions', () => {
      const { getByText } = renderedPersonaliseMenuStep

      expect(
        screen.getByRole('heading', { name: 'Get your taste buds ready...', level: 1 }),
      ).toBeInTheDocument()
      expect(getByText(/Select up to/)).toBeInTheDocument()
      expect(getByText(/three/)).toBeInTheDocument()
      expect(
        getByText(/of your favourite cuisines and we’ll show you recipes we think you’ll love/),
      ).toBeInTheDocument()
    })

    test('it has the correct SellTheProposition text and image', () => {
      const { getByText } = renderedPersonaliseMenuStep
      items.forEach((item) => {
        expect(getByText(item.strongText)).toBeInTheDocument()
        expect(getByText(item.strongText)).toHaveClass('strong')
        expect(getByText(item.normalText)).toBeInTheDocument()
      })
      expect(screen.getByAltText('stack of gousto boxes')).toBeInTheDocument()
    })

    test('it has the See This Weeks Menu button', () => {
      const { getByRole } = renderedPersonaliseMenuStep
      expect(getByRole('button', { name: 'See this week’s menu' })).toBeInTheDocument()
    })

    describe('when the user has selected 3 cuisines', () => {
      test('it should disable the rest of the buttons', () => {
        const { getByRole, getByText } = renderedPersonaliseMenuStep

        const cuisines = [
          { text: 'American' },
          { text: 'British' },
          { text: 'East Asian' },
          { text: 'Indian' },
          { text: 'Italian' },
          { text: 'Mediterranean' },
          { text: 'Mexican' },
          { text: 'None of these' },
        ]
        const selected = ['American', 'British', 'East Asian']

        selected.forEach((cuisine) => {
          const element = getByText(cuisine)
          fireEvent.click(element)
        })

        cuisines.forEach((cuisine) => {
          const input = getByText(cuisine.text).closest('label').querySelector('input')

          if (selected.includes(cuisine.text)) {
            expect(input).toBeChecked()
          } else {
            expect(input).not.toBeChecked()
          }
        })

        expect(getByRole('button', { name: 'See this week’s menu' })).not.toBeDisabled()
      })
    })
    describe('when the user has selected none of these', () => {
      test('it should disable the rest of the buttons', () => {
        const { getByRole, getByText } = renderedPersonaliseMenuStep

        const cuisines = [
          { text: 'American' },
          { text: 'British' },
          { text: 'East Asian' },
          { text: 'Indian' },
          { text: 'Italian' },
          { text: 'Mediterranean' },
          { text: 'Mexican' },
          { text: 'None of these' },
        ]
        const selected = ['None of these']

        selected.forEach((cuisine) => {
          const element = getByText(cuisine)
          fireEvent.click(element)
        })

        cuisines.forEach((cuisine) => {
          const input = getByText(cuisine.text).closest('label').querySelector('input')

          if (selected.includes(cuisine.text)) {
            expect(input).toBeChecked()
            expect(input).not.toBeDisabled()
          } else {
            expect(input).not.toBeChecked()
            expect(input).toBeDisabled()
          }
        })

        expect(getByRole('button', { name: 'See this week’s menu' })).not.toBeDisabled()
      })
    })
    describe('when the user clicks the button to see this weeks menu', () => {
      test('it should save the selected cuisines in session storage', () => {
        const { getByRole, getByText } = renderedPersonaliseMenuStep

        const selected = ['American', 'British', 'East Asian']

        const checkoutButton = getByRole('button', { name: 'See this week’s menu' })

        selected.forEach((cuisine) => {
          const element = getByText(cuisine)
          fireEvent.click(element)
        })

        fireEvent.click(checkoutButton)

        expect(window.sessionStorage.getItem('selectedCuisines')).toEqual(JSON.stringify(selected))
      })
      test('it should dispatch a tracking action', () => {
        const { getByRole, getByText } = renderedPersonaliseMenuStep

        const selected = ['American', 'British', 'East Asian']
        const checkoutButton = getByRole('button', { name: 'See this week’s menu' })

        selected.forEach((cuisine) => {
          const element = getByText(cuisine)
          fireEvent.click(element)
        })

        fireEvent.click(checkoutButton)

        expect(checkoutButton).not.toBeDisabled()
        expect(trackSignupPersonalisationComplete).toHaveBeenCalledWith(selected)
      })
    })
  })
})
