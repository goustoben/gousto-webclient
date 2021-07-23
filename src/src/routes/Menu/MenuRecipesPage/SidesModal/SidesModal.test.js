import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import fixture from 'fixtures/menu/v1/sides/POST.json'
import { render, screen, within, fireEvent, waitFor, cleanup } from '@testing-library/react'
import * as sidesApis from 'routes/Menu/apis/sides'
import { SidesModal } from './SidesModal'

describe('<SideModal />', () => {
  const accessToken = 'access-token'
  const userId = 'user-id'
  const order = { id: '1234', type: 'order ' }

  const sides = fixture.data
  let onSubmit
  let isOpen
  let onClose
  let onError

  const getSidesForOrder = jest.spyOn(sidesApis, 'getSidesForOrder')

  beforeEach(() => {
    onSubmit = jest.fn()
    onClose = jest.fn()
    onError = jest.fn()
  })

  afterEach(jest.clearAllMocks)
  afterEach(cleanup)

  describe('with an unsuccessful request', () => {
    beforeEach(() => {
      isOpen = true
      getSidesForOrder.mockResolvedValue([null, { message: 'internal server error' }, 500])
    })

    it('should call onError', async () => {
      render(<SidesModal accessToken={accessToken} userId={userId} order={order} onSubmit={onSubmit} isOpen={isOpen} onClose={onClose} onError={onError} />)

      await waitFor(() => expect(onError).toHaveBeenCalledWith({ message: 'internal server error' }))
    })

    it('should not render', async () => {
      render(<SidesModal accessToken={accessToken} userId={userId} order={order} onSubmit={onSubmit} isOpen={isOpen} onClose={onClose} onError={onError} />)

      // wait for the onError to be called when the request failed, before checking that nothing is rendered
      await waitFor(() => expect(onError).toHaveBeenCalled())

      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('with a successful request', () => {
    beforeEach(() => {
      getSidesForOrder.mockResolvedValue([sides, null, 200])
    })

    describe('when closed', () => {
      beforeEach(() => {
        isOpen = false
      })

      it('should not render', () => {
        render(<SidesModal accessToken={accessToken} userId={userId} order={order} onSubmit={onSubmit} isOpen={isOpen} onClose={onClose} onError={onError} />)

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })

      it('should not call getSidesForOrder', async () => {
        render(<SidesModal accessToken={accessToken} userId={userId} order={order} onSubmit={onSubmit} isOpen={isOpen} onClose={onClose} onError={onError} />)

        expect(getSidesForOrder).not.toHaveBeenCalled()
      })
    })

    describe('when open', () => {
      beforeEach(() => {
        isOpen = true

        render(<SidesModal accessToken={accessToken} userId={userId} order={order} onSubmit={onSubmit} isOpen={isOpen} onClose={onClose} onError={onError} />)
      })

      const getSideTileFromHeader = (headerTitle) => {
        const sideHeader = screen.getByRole('heading', {
          name: headerTitle,
          level: 3,
        })

        return sideHeader.closest('div').parentNode
      }

      const getWrappedSideTileFromHeader = (headerTitle) => within(getSideTileFromHeader(headerTitle))

      it('should call getSidesForOrder with correct params', async () => {
        render(<SidesModal accessToken={accessToken} userId={userId} order={order} onSubmit={onSubmit} isOpen={isOpen} onClose={onClose} onError={onError} />)

        await waitFor(() => screen.getByRole('heading', { name: 'Fancy any sides?', level: 2 }))

        expect(getSidesForOrder).toHaveBeenCalledWith(accessToken, order, userId)
      })

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
})
