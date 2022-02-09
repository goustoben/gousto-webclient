import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { RecipeRating } from './Rating'

describe('<RecipeRating />', () => {
  let count
  let average
  beforeEach(() => {
    count = 1
    average = 2
  })

  afterEach(() => cleanup())

  test('should return an outer <span>', () => {
    const { baseElement } = render(<RecipeRating count={count} average={average} />)
    expect(baseElement).toContainHTML('class="ratingContainer"')
    const [reviewCounter] = screen.getAllByText('reviews', { exact: false })
    expect(reviewCounter).toBeTruthy()
  })
  test('should have two span when the count prop is greater than 0', () => {
    const { baseElement } = render(<RecipeRating count={count} average={average} />)
    expect(baseElement).toContainHTML('class="starColor"')
    expect(baseElement).toContainHTML('class="description"')
  })
  test('should render nothing when the count prop is 0', () => {
    count = 0
    const { baseElement } = render(<RecipeRating count={count} average={average} />)
    expect(baseElement).toContainHTML('<body><div /></body>')
    expect(baseElement).not.toContainHTML('class="ratingContainer"')
  })
  test('should have one child when the count prop is greater than 0 but the view is simple', () => {
    const { baseElement } = render(<RecipeRating count={count} average={average} view="simple" />)
    expect(baseElement).toContainHTML('class="starColor"')
    expect(baseElement).not.toContainHTML('class="description"')
  })
  test('should not show the number of reviews when the view is simple', () => {
    const { baseElement } = render(<RecipeRating count={count} average={average} view="simple" />)
    const [reviewCounter] = screen.queryAllByText('reviews', { exact: false })
    expect(baseElement).toContainHTML('class="starColor"')
    expect(reviewCounter).toBeFalsy()
  })
})
