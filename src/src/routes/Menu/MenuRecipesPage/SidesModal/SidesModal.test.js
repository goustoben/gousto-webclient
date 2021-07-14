import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import fixture from 'fixtures/menu/v1/sides/POST.json'
import { render, screen, within, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { SidesModal } from './SidesModal'

describe('<SideModal />', () => {
  const sides = fixture.data
  let onSubmit
  let isOpen
  let onClose

  beforeEach(() => {
    onSubmit = jest.fn()
    onClose = jest.fn()
  })

  afterEach(cleanup)

  describe('when closed', () => {
    beforeEach(() => {
      isOpen = false
    })

    it('should not render', () => {
      render(<SidesModal sides={sides} onSubmit={onSubmit} isOpen={isOpen} onClose={onClose} />)

      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('when open', () => {
    beforeEach(() => {
      isOpen = true

      render(<SidesModal sides={sides} onSubmit={onSubmit} isOpen={isOpen} onClose={onClose} />)
    })

    const getSideTileFromHeader = (headerTitle) => {
      const sideHeader = screen.getByRole('heading', {
        name: headerTitle,
        level: 3,
      })

      return sideHeader.closest('div').parentNode
    }

    const getWrappedSideTileFromHeader = (headerTitle) => within(getSideTileFromHeader(headerTitle))

    it('should render the sides tiles', () => {
      expect(screen.queryByRole('heading', { name: 'Fancy any sides?', level: 2 })).toBeInTheDocument()
      expect(screen.queryByRole('heading', { name: 'Allergens and Nutrition', level: 2 })).not.toBeInTheDocument()

      // First Side
      const firstSideContainer = getWrappedSideTileFromHeader('Tony’s Chocolonely Milk Chocolate bar (180g)')
      expect(firstSideContainer.queryByText(/£3.98 ● 2 Servings/)).toBeInTheDocument()
      expect(firstSideContainer.queryByLabelText('Add or Remove Side')).toBeInTheDocument()
      const firstImage = firstSideContainer.getByAltText('Tony’s Chocolonely Milk Chocolate bar (180g)')
      expect(firstImage).toHaveAttribute('src', 'https://production-media.gousto.co.uk/cms/product-image-landscape/Tonys-Milk-Choc-x400.jpg')

      // Second Side
      const secondSideContainer = getWrappedSideTileFromHeader('Gu Sumptuous Salted Caramel Cheesecakes (2 x 92g)')
      expect(secondSideContainer.queryByText(/£3.30 ● 2 Servings/)).toBeInTheDocument()
      expect(secondSideContainer.queryByLabelText('Add or Remove Side')).toBeInTheDocument()
      const secondImage = secondSideContainer.getByAltText('Gu Sumptuous Salted Caramel Cheesecakes (2 x 92g)')
      expect(secondImage).toHaveAttribute('src', 'https://production-media.gousto.co.uk/cms/product-image-landscape/Gu-Sumptuous-Salted-Caramel-Cheesecakes-2-x-92g-x400.jpg')
    })

    it('should call onClose when modal close button is clicked', () => {
      const header = within(screen.getByRole('heading', { name: 'Fancy any sides?', level: 2 }).closest('div'))
      const closeButton = header.getByTestId('modalClose')

      fireEvent.click(closeButton)

      expect(onClose).toBeCalledTimes(1)
    })

    describe('when user clicks show allergens', () => {
      it('should render the sides allergens and nutrition information', async () => {
        expect(screen.queryByRole('heading', { name: 'Fancy any sides?', level: 2 })).toBeInTheDocument()

        // Show Allergens
        const button = screen.getByRole('button', { name: 'Show Allergens and Nutrition' })
        fireEvent.click(button)

        await waitFor(() => screen.getByRole('heading', { name: 'Allergens and Nutrition', level: 2 }))

        expect(screen.queryByRole('heading', { name: 'Fancy any sides?', level: 2 })).not.toBeInTheDocument()

        // First Side
        const firstSideContainer = getSideTileFromHeader('Tony’s Chocolonely Milk Chocolate bar (180g)')
        expect(firstSideContainer).toContainHTML('Belgian Fairtrade')
        // Expect allergy bolding
        expect(firstSideContainer).toContainHTML('<span class="bold">milk</span>')

        // Second Side
        const secondSideContainer = getSideTileFromHeader('Gu Sumptuous Salted Caramel Cheesecakes (2 x 92g)')
        expect(secondSideContainer).toContainHTML('A layered cheesecake with sumptuous guérande')
        // Expect allergy bolding
        expect(secondSideContainer).toContainHTML('<span class="bold">egg</span>')

        // Hide Allergens
        const hideAllergensButton = screen.getByRole('button', { name: 'Hide Allergens and Nutrition' })

        fireEvent.click(hideAllergensButton)

        await waitFor(() => screen.getByRole('heading', { name: 'Fancy any sides?', level: 2 }))

        expect(screen.queryByRole('heading', { name: 'Allergens and Nutrition', level: 2 })).not.toBeInTheDocument()
      })
    })

    describe('when user selects sides and submits', () => {
      test('should display total and call onSubmit when continue button is clicked', async () => {
        // Footer
        const footer = within(screen.getByRole('button', { name: 'Show Allergens and Nutrition' }).closest('div'))

        expect(screen.queryByRole('heading', { name: 'Fancy any sides?', level: 2 })).toBeInTheDocument()
        expect(footer.queryByRole('button', { name: 'Continue without sides' })).toBeInTheDocument()
        expect(footer.queryByRole('button', { name: 'Continue with sides' })).not.toBeInTheDocument()

        // Add a Side
        const firstSideContainer = getWrappedSideTileFromHeader('Tony’s Chocolonely Milk Chocolate bar (180g)')
        const firstSideAddButton = firstSideContainer.queryByRole('button', { name: 'Add' })

        fireEvent.click(firstSideAddButton)

        await waitFor(() => footer.getByText('Sides price'))

        // Check price
        expect(footer.getByText('+£3.98')).toBeInTheDocument()

        // Check continue button
        expect(footer.queryByRole('button', { name: 'Continue without sides' })).not.toBeInTheDocument()
        expect(footer.queryByRole('button', { name: 'Continue with sides' })).toBeInTheDocument()

        // Add 2 Sides
        const secondSideContainer = getWrappedSideTileFromHeader('Gu Sumptuous Salted Caramel Cheesecakes (2 x 92g)')
        const secondSideAddButton = secondSideContainer.queryByRole('button', { name: 'Add' })
        fireEvent.click(secondSideAddButton)

        const secondSidePlusButton = secondSideContainer.queryByRole('button', { name: '+' })
        fireEvent.click(secondSidePlusButton)

        // Check price
        expect(footer.getByText('+£10.58')).toBeInTheDocument()

        // Submit with Sides
        const continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

        fireEvent.click(continueWithSidesButton)

        expect(onSubmit).toHaveBeenNthCalledWith(1, {
          '012d8f6a-609e-11eb-913f-06a5bb631817': 1,
          'b5d42e5e-ffe4-11e9-8705-06be524fd222': 2,
        })

        // Remove Sides
        const firstSideMinusButton = firstSideContainer.queryByRole('button', { name: '-' })
        const secondSideMinusButton = secondSideContainer.queryByRole('button', { name: '-' })

        fireEvent.click(firstSideMinusButton)
        fireEvent.click(secondSideMinusButton)
        fireEvent.click(secondSideMinusButton)

        await waitFor(() => footer.getByRole('button', { name: 'Continue without sides' }))

        // Prices should be hidden
        expect(footer.queryByText('Sides price')).not.toBeInTheDocument()

        // Submit without Sides
        const continueWithoutSidesButton = footer.getByRole('button', { name: 'Continue without sides' })

        fireEvent.click(continueWithoutSidesButton)

        expect(onSubmit).toHaveBeenNthCalledWith(2, {})
      })
    })
  })
})
