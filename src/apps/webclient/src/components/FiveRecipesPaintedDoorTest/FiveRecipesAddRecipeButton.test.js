import '@testing-library/jest-dom'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { render, screen, fireEvent, } from '@testing-library/react'
import { FiveRecipesAddRecipeButton } from './FiveRecipesAddRecipeButton'

const setState = jest.fn()
const useStateSpy = jest.spyOn(React, 'useState')
useStateSpy.mockImplementation((init) => [init, setState])
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('<FiveRecipesAddRecipeButton />', () => {
  beforeEach(() => {
    useSelector.mockReturnValue(true)
    useDispatch.mockReturnValue(() => {})
  })
  it('should render modal when user clicks add recipe button', () => {
    render(<FiveRecipesAddRecipeButton />)

    fireEvent.click(screen.getByRole('button', { name: /add recipe/i }))
    expect(setState).toHaveBeenCalledWith(true)
  })
})
