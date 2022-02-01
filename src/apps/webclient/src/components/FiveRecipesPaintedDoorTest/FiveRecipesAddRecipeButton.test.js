import '@testing-library/jest-dom'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { render, screen, fireEvent, } from '@testing-library/react'
import { experimentFiveRecipesAddRecipe } from 'actions/trackingKeys'
import { FiveRecipesAddRecipeButton } from './FiveRecipesAddRecipeButton'
import * as FiveRecipesTracking from './useFiveRecipesTracking'

const setState = jest.fn()
const useStateSpy = jest.spyOn(React, 'useState')
useStateSpy.mockImplementation((init) => [init, setState])
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

const useFiveRecipesTracking = jest.spyOn(FiveRecipesTracking, 'useFiveRecipesTracking')
const trackFiveRecipes = jest.fn()
describe('<FiveRecipesAddRecipeButton />', () => {
  beforeEach(() => {
    useSelector.mockReturnValue(true)
    useDispatch.mockReturnValue(() => {})
    useFiveRecipesTracking.mockImplementation(() => trackFiveRecipes )
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render modal when user clicks add recipe button', () => {
    render(<FiveRecipesAddRecipeButton recipeId="test" />)

    fireEvent.click(screen.getByRole('button', { name: /add recipe/i }))
    expect(setState).toHaveBeenCalledWith(true)
  })

  it('should track event when clicked', () => {
    render(<FiveRecipesAddRecipeButton recipeId="test" />)

    fireEvent.click(screen.getByRole('button', { name: /add recipe/i }))
    expect(trackFiveRecipes).toHaveBeenCalledWith(experimentFiveRecipesAddRecipe, {recipe_id: 'test'})
  })
})
