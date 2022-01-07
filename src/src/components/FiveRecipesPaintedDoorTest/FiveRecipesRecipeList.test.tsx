import '@testing-library/jest-dom'
import React from 'react'
import { render} from '@testing-library/react'
import { FiveRecipesRecipeList } from './FiveRecipesRecipeList'

describe('<FiveRecipesRecipeList />', () => {
  it('should render all empty recipes at the beginning', () => {
    const screen = render(<FiveRecipesRecipeList filledRecipes={0} view={'mobile'} browser={''} />)
    const allButtons = screen.queryAllByRole('button')
    expect(allButtons.length).toBe(5)
  })

  it('should render remaining empty slots after the filled ones', () => {
    const screen = render(<FiveRecipesRecipeList filledRecipes={2} view={'mobile'} browser={''} />)
    const allButtons = screen.queryAllByRole('button')
    expect(allButtons.length).toBe(3)
    expect(screen.queryByText('Add recipe')).toBeFalsy()
    expect(screen.queryByText('for £6.25 per serving')).toBeFalsy()
    expect(screen.queryByText('for £5 per serving')).toBeTruthy()
  })

  it('should not render anything if all slots are filled', () => {
    const screen = render(<FiveRecipesRecipeList filledRecipes={5} view={'mobile'} browser={''} />)
    const allButtons = screen.queryAllByRole('button')
    expect(allButtons.length).toBe(0)
  })
})
