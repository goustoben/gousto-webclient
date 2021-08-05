import React from 'react'
import { render, screen, within, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { user } from 'routes/Menu/apis/sides.hook.mock'
import Modal from 'react-modal'
import { SidesModal } from './SidesModal'

Modal.setAppElement(document.body)

describe('<SideModal />', () => {
  const accessToken = 'access-token'
  const getOrder = (products = []) => ({
    data: {
      type: 'order',
      attributes: {
        menu_id: '433',
      },
      relationships: {
        shipping_address: {
          data: {
            id: '84783722',
            type: 'shipping-address',
          },
        },
        delivery_slot: {
          data: {
            id: '12',
            type: 'delivery-slot',
            meta: {
              core_id: '12',
              uuid: '332743fb-8242-4f13-84df-63985c9ab9cd',
            },
          },
        },
        delivery_day: {
          data: {
            id: '2323',
            type: 'delivery-day',
          },
        },
        components: {
          data: [
            {
              type: 'recipe',
              id: 'd17cd994-a763-4571-9d74-e4c368b297af',
              meta: {
                portion_for: 2,
              },
            },
            {
              type: 'recipe',
              id: 'eaac50d1-2376-410b-8859-55fc22666f0b',
              meta: {
                portion_for: 2,
                amendments: [],
              },
            },
            ...products,
          ],
        },
      },
    },
  })

  const getSideTileFromHeader = (headerTitle) => {
    const sideHeader = screen.getByRole('heading', {
      name: headerTitle,
      level: 3,
    })

    return sideHeader.closest('div').parentNode
  }

  const getWrappedSideTileFromHeader = (headerTitle) => within(getSideTileFromHeader(headerTitle))

  const addSidetoBasket = (headerTitle, quantity) => {
    const sideContainer = getWrappedSideTileFromHeader(headerTitle)
    const sideAddButton = sideContainer.queryByRole('button', { name: 'Add' })

    fireEvent.click(sideAddButton)

    const sidePlusButton = sideContainer.queryByRole('button', { name: '+' })

    Array.from(Array(quantity - 1).keys()).forEach(() => fireEvent.click(sidePlusButton))

    return sidePlusButton
  }

  let userId
  let onSubmit
  let isOpen
  let onClose
  let onError

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
      userId = user.withError
    })

    it('should call onError', async () => {
      render(
        <SidesModal
          accessToken={accessToken}
          userId={userId}
          order={getOrder()}
          onSubmit={onSubmit}
          isOpen={isOpen}
          onClose={onClose}
          onError={onError}
        />
      )

      await waitFor(() => expect(onError).toHaveBeenCalled())

      expect(onError).toHaveBeenCalledWith(
        new Error('Fetch error: 500'),
        expect.stringContaining('/menu/v1/side'),
        expect.objectContaining({})
      )
    })

    it('should not render', async () => {
      render(
        <SidesModal
          accessToken={accessToken}
          userId={userId}
          order={getOrder()}
          onSubmit={onSubmit}
          isOpen={isOpen}
          onClose={onClose}
          onError={onError}
        />
      )

      // wait for the onError to be called when the request failed, before checking that nothing is rendered
      await waitFor(() => expect(onError).toHaveBeenCalled())

      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('with a successful request', () => {
    beforeEach(() => {
      userId = user.withSides
    })

    describe('when closed', () => {
      beforeEach(() => {
        isOpen = false
      })

      it('should not render', () => {
        render(
          <SidesModal
            accessToken={accessToken}
            userId={userId}
            order={getOrder()}
            onSubmit={onSubmit}
            isOpen={isOpen}
            onClose={onClose}
            onError={onError}
          />
        )

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })
    })

    describe('when open', () => {
      let order = getOrder()
      const renderOpenSidesModal = async () => {
        render(<SidesModal accessToken={accessToken} userId={userId} order={order} onSubmit={onSubmit} isOpen onClose={onClose} onError={onError} />)

        // Wait for sides to load
        await waitFor(() => screen.getByRole('heading', { name: 'Fancy any sides?', level: 2 }))
      }

      it('should render the sides tiles', async () => {
        await renderOpenSidesModal()

        expect(screen.queryByRole('heading', { name: 'Allergens and Nutrition', level: 2 })).not.toBeInTheDocument()

        // First Side
        const firstSideContainer = getWrappedSideTileFromHeader('Plain Naan (x2)')
        expect(firstSideContainer.queryByText(/£1.00 ● 2 Servings/)).toBeInTheDocument()
        expect(firstSideContainer.queryByLabelText('Add or Remove Side')).toBeInTheDocument()
        const firstImage = firstSideContainer.getByAltText('Plain Naan (x2)')
        expect(firstImage).toHaveAttribute('src', 'https://production-media.gousto.co.uk/cms/product-image-landscape/Naan-3914-x400.jpg')

        // Second Side
        const secondSideContainer = getWrappedSideTileFromHeader('Blanched Peas (160g)')
        expect(secondSideContainer.queryByText(/£1.00 ● 2 Servings/)).toBeInTheDocument()
        expect(secondSideContainer.queryByLabelText('Add or Remove Side')).toBeInTheDocument()
        const secondImage = secondSideContainer.getByAltText('Blanched Peas (160g)')
        expect(secondImage).toHaveAttribute('src', 'https://production-media.gousto.co.uk/cms/product-image-landscape/Peas-3924-x400.jpg')
      })

      it('should call onClose when modal close button is clicked', async () => {
        await renderOpenSidesModal()

        const header = within(screen.getByRole('heading', { name: 'Fancy any sides?', level: 2 }).closest('div'))
        const closeButton = header.getByTestId('modalClose')

        fireEvent.click(closeButton)

        expect(onClose).toBeCalledTimes(1)
      })

      describe('when user clicks show allergens', () => {
        it('should render the sides allergens and nutrition information', async () => {
          await renderOpenSidesModal()

          // Show Allergens
          const button = screen.getByRole('button', { name: 'Show Allergens and Nutrition' })
          fireEvent.click(button)

          await waitFor(() => screen.getByRole('heading', { name: 'Allergens and Nutrition', level: 2 }))

          expect(screen.queryByRole('heading', { name: 'Fancy any sides?', level: 2 })).not.toBeInTheDocument()

          // First Side
          const firstSideContainer = getSideTileFromHeader('Plain Naan (x2)')
          // Expect description to be rendered
          expect(firstSideContainer).toContainHTML('The perfect accompaniment to any curry')
          // Expect allergy bolding
          expect(firstSideContainer).toContainHTML('<span class="bold">wheat</span>')

          // Second Side
          const secondSideContainer = getSideTileFromHeader('Blanched Peas (160g)')
          // Expect description to be rendered
          expect(secondSideContainer).toContainHTML('Delicious green peas')
          // No allergen test as peas don't have any

          // Hide Allergens
          const hideAllergensButton = screen.getByRole('button', { name: 'Hide Allergens and Nutrition' })

          fireEvent.click(hideAllergensButton)

          await waitFor(() => screen.getByRole('heading', { name: 'Fancy any sides?', level: 2 }))

          expect(screen.queryByRole('heading', { name: 'Allergens and Nutrition', level: 2 })).not.toBeInTheDocument()
        })
      })

      describe('when user selects sides and submits', () => {
        it('should display total and call onSubmit when continue button is clicked', async () => {
          await renderOpenSidesModal()

          // Footer
          const footer = within(screen.getByRole('button', { name: 'Show Allergens and Nutrition' }).closest('div'))

          expect(screen.queryByRole('heading', { name: 'Fancy any sides?', level: 2 })).toBeInTheDocument()
          expect(footer.queryByRole('button', { name: 'Continue without sides' })).toBeInTheDocument()
          expect(footer.queryByRole('button', { name: 'Continue with sides' })).not.toBeInTheDocument()

          // Add a Side
          const firstSideContainer = getWrappedSideTileFromHeader('Plain Naan (x2)')
          const firstSideAddButton = firstSideContainer.queryByRole('button', { name: 'Add' })

          fireEvent.click(firstSideAddButton)

          await waitFor(() => footer.getByText('Sides price'))

          // Check price
          expect(footer.getByText('+£1.00')).toBeInTheDocument()

          // Check continue button
          expect(footer.queryByRole('button', { name: 'Continue without sides' })).not.toBeInTheDocument()
          expect(footer.queryByRole('button', { name: 'Continue with sides' })).toBeInTheDocument()

          // Add 2 Sides
          const secondSideContainer = getWrappedSideTileFromHeader('Blanched Peas (160g)')
          const secondSideAddButton = secondSideContainer.queryByRole('button', { name: 'Add' })
          fireEvent.click(secondSideAddButton)

          const secondSidePlusButton = secondSideContainer.queryByRole('button', { name: '+' })
          fireEvent.click(secondSidePlusButton)

          // Check price
          expect(footer.getByText('+£3.00')).toBeInTheDocument()

          // Submit with Sides
          const continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

          fireEvent.click(continueWithSidesButton)

          expect(onSubmit).toHaveBeenNthCalledWith(1, {
            '50e99248-e00e-11eb-a669-02675e6927cd': 1,
            'ec295226-e008-11eb-a315-02675e6927cd': 2,
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

      describe('limits', () => {
        describe('when user tries to add a single side multiple times and it is more than the limit for that side', () => {
          it('should not let them add more than the limit', async () => {
            await renderOpenSidesModal()

            const sidePlusButton = addSidetoBasket('Plain Naan (x2)', 2)

            expect(sidePlusButton).toHaveClass('disabled')

            // The tooltip uses React.portal and
            // only renders on the page once hovered over
            fireEvent.mouseOver(sidePlusButton)

            expect(screen.queryByRole('tooltip', { name: 'Sorry, we can\'t fit anymore of this item in your box' })).toBeInTheDocument()

            // Submit with Sides
            const footer = within(screen.getByRole('button', { name: 'Show Allergens and Nutrition' }).closest('div'))
            const continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

            fireEvent.click(continueWithSidesButton)

            expect(onSubmit).toHaveBeenNthCalledWith(1, {
              '50e99248-e00e-11eb-a669-02675e6927cd': 2
            })
          })
        })

        describe('when user tries to add more sides more than the category limit', () => {
          it('should not let them add more than the category limit', async () => {
            await renderOpenSidesModal()

            const firstSidePlusButton = addSidetoBasket('Cheese & basil garlic bread', 4)
            const secondSidePlusButton = addSidetoBasket('Blanched Peas (160g)', 4)
            const thirdSidePlusButton = addSidetoBasket('Plain Naan (x2)', 2)

            expect(firstSidePlusButton).toHaveClass('disabled')
            expect(secondSidePlusButton).toHaveClass('disabled')
            expect(thirdSidePlusButton).toHaveClass('disabled')

            // The tooltip uses React.portal and
            // only renders on the page once hovered over
            fireEvent.mouseOver(thirdSidePlusButton)

            expect(screen.queryByRole('tooltip', { name: 'Sorry, we can\'t fit anymore "sides" items in your box' })).toBeInTheDocument()

            // Submit with Sides
            const footer = within(screen.getByRole('button', { name: 'Show Allergens and Nutrition' }).closest('div'))
            const continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

            fireEvent.click(continueWithSidesButton)

            expect(onSubmit).toHaveBeenNthCalledWith(1, {
              '50e99248-e00e-11eb-a669-02675e6927cd': 2,
              'aacf211c-3ad5-11eb-bb92-06c0e76c292d': 4,
              'ec295226-e008-11eb-a315-02675e6927cd': 4,
            })
          })
        })
        describe('max product limit', () => {
          const garlicBreadId = 'aacf211c-3ad5-11eb-bb92-06c0e76c292d'

          beforeEach( () => {
            const productWithQuantityOf8 = [ {
              type: 'product',
              id: 'product-id',
              meta: {
                quantity: 8,
                amendments: [],
              },
            }]
            order = getOrder(productWithQuantityOf8)
          })
          describe('when user tries to add more products than the max product limit', () => {
            it('should not let them add more than the limit', async () => {
              await renderOpenSidesModal()

              // Because there is a sides already in the order, there will already be 8 sides selected
              const sideContainer = getWrappedSideTileFromHeader('Cheese & basil garlic bread')
              const sideAddButton = sideContainer.queryByRole('button', { name: 'Add' })

              fireEvent.click(sideAddButton)
              const sidePlusButton = sideContainer.queryByRole('button', { name: '+' })

              fireEvent.click(sidePlusButton)

              expect(sidePlusButton).toHaveClass('disabled')

              // The tooltip uses React.portal and
              // only renders on the page once hovered over
              fireEvent.mouseOver(sidePlusButton)

              expect(screen.queryByRole('tooltip')).toBeInTheDocument()

              expect(screen.queryByRole('tooltip', { name: 'Sorry, we can\'t fit anymore items in your box' })).toBeInTheDocument()

              // Submit with Sides
              const footer = within(screen.getByRole('button', { name: 'Show Allergens and Nutrition' }).closest('div'))
              const continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

              fireEvent.click(continueWithSidesButton)

              expect(onSubmit).toHaveBeenNthCalledWith(1, {
                'product-id': 8,
                [garlicBreadId]: 2,
              })
            })
          })
        })
      })

      describe('stock', () => {
        const doughBallId = '5a8503be-a814-11eb-8cf7-06643a4ae7fd'

        beforeEach(() => {
          const doughBalls = [{
            type: 'product',
            id: doughBallId,
            meta: {
              quantity: 1,
              amendments: [],
            },
          }]

          order = getOrder(doughBalls)
        })

        describe('when user tries to add a single side more times than the stock for that side', () => {
          it('should not let them add more than the stock', async () => {
            await renderOpenSidesModal()

            // Because there is a side already in the order, there will already be one side selected
            const sideContainer = getWrappedSideTileFromHeader('8 Dough Ball Bites')
            const sidePlusButton = sideContainer.queryByRole('button', { name: '+' })

            fireEvent.click(sidePlusButton)
            fireEvent.click(sidePlusButton)

            expect(sidePlusButton).toHaveClass('disabled')

            // The tooltip uses React.portal and
            // only renders on the page once hovered over
            fireEvent.mouseOver(sidePlusButton)

            expect(screen.queryByRole('tooltip', { name: 'Sorry, we don\'t have any more in stock' })).toBeInTheDocument()

            // Submit with Sides
            const footer = within(screen.getByRole('button', { name: 'Show Allergens and Nutrition' }).closest('div'))
            const continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

            fireEvent.click(continueWithSidesButton)

            // We expect 3 sides because the order had 1
            expect(onSubmit).toHaveBeenNthCalledWith(1, {
              [doughBallId]: 3,
            })
          })
        })
      })
    })
  })
})
