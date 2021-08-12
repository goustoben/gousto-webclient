import React from 'react'
import { render, screen, within, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { user } from 'routes/Menu/apis/sides.hook.mock'
import Modal from 'react-modal'
import { SidesModal } from './SidesModal'

Modal.setAppElement(document.body)

describe('<SideModal />', () => {
  const accessToken = 'access-token'
  const getOrder = (products = []) => ({
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
  })

  const getSideTileFromHeader = (headerTitle) => {
    const sideHeader = screen.getByRole('heading', {
      name: headerTitle,
      level: 3,
    })

    return sideHeader.closest('div').parentNode
  }

  const getWrappedSideTileFromHeader = (headerTitle) => within(getSideTileFromHeader(headerTitle))

  const addSideToBasket = (headerTitle, quantity) => {
    const sideTile = getWrappedSideTileFromHeader(headerTitle)
    const sideAddButton = sideTile.queryByRole('button', { name: 'Add' })

    fireEvent.click(sideAddButton)

    const sidePlusButton = sideTile.queryByRole('button', { name: '+' })

    Array.from(Array(quantity - 1).keys()).forEach(() => fireEvent.click(sidePlusButton))

    return sidePlusButton
  }

  let order
  let onSubmit
  let isOpen
  let onClose

  beforeEach(() => {
    order = getOrder()
    onSubmit = jest.fn()
    onClose = jest.fn()
  })

  afterEach(jest.clearAllMocks)
  afterEach(cleanup)

  describe('when closed', () => {
    it('should not render', () => {
      render(
        <SidesModal
          accessToken={accessToken}
          userId={user.withSides}
          order={getOrder()}
          onSubmit={onSubmit}
          isOpen={false}
          onClose={onClose}
        />
      )

      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('when open', () => {
    beforeEach(() => {
      isOpen = true
    })

    describe('with an unsuccessful request', () => {
      it('should call onSubmit and not render', async () => {
        render(
          <SidesModal
            accessToken={accessToken}
            userId={user.withError}
            order={getOrder()}
            onSubmit={onSubmit}
            isOpen={isOpen}
            onClose={onClose}
          />
        )

        await waitFor(() => {
          expect(onSubmit).toHaveBeenNthCalledWith(1, 'sides-modal-without-sides', null)
        })

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })
    })

    describe('when sides endpoint returns with no sides', () => {
      it('should call onSubmit and not render', async () => {
        render(
          <SidesModal
            accessToken={accessToken}
            userId={user.withOutSides}
            order={getOrder()}
            onSubmit={onSubmit}
            isOpen={isOpen}
            onClose={onClose}
          />
        )

        await waitFor(() => {
          expect(onSubmit).toHaveBeenNthCalledWith(1, 'sides-modal-without-sides', null)
        })

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })
    })

    describe('when sides endpoint returns sides', () => {
      const renderOpenSidesModal = async () => {
        render(
          <SidesModal
            accessToken={accessToken}
            userId={user.withSides}
            order={order}
            onSubmit={onSubmit}
            isOpen={isOpen}
            onClose={onClose}
          />
        )

        // Wait for sides to load
        await waitFor(() => screen.getByRole('heading', { name: 'Fancy any sides?', level: 2 }))
      }

      it('should render the sides tiles', async () => {
        await renderOpenSidesModal()

        expect(screen.queryByRole('heading', { name: 'Allergens and Nutrition', level: 2 })).not.toBeInTheDocument()

        // First Side
        const firstSideTile = getWrappedSideTileFromHeader('Plain Naan (x2)')
        expect(firstSideTile.queryByText(/£1.00 ● 2 Servings/)).toBeInTheDocument()
        expect(firstSideTile.queryByLabelText('Add or Remove Side')).toBeInTheDocument()
        const firstImage = firstSideTile.getByAltText('Plain Naan (x2)')
        expect(firstImage).toHaveAttribute('src', 'https://production-media.gousto.co.uk/cms/product-image-landscape/Naan-3914-x400.jpg')

        // Second Side
        const secondSideTile = getWrappedSideTileFromHeader('Blanched Peas (160g)')
        expect(secondSideTile.queryByText(/£1.00 ● 2 Servings/)).toBeInTheDocument()
        expect(secondSideTile.queryByLabelText('Add or Remove Side')).toBeInTheDocument()
        const secondImage = secondSideTile.getByAltText('Blanched Peas (160g)')
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
          const firstSideTile = getSideTileFromHeader('Plain Naan (x2)')
          // Expect description to be rendered
          expect(firstSideTile).toContainHTML('The perfect accompaniment to any curry')
          // Expect allergy bolding
          expect(firstSideTile).toContainHTML('<span class="bold">wheat</span>')

          // Second Side
          const secondSideTile = getSideTileFromHeader('Blanched Peas (160g)')
          // Expect description to be rendered
          expect(secondSideTile).toContainHTML('Delicious green peas')
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
          const firstSideTile = getWrappedSideTileFromHeader('Plain Naan (x2)')
          const firstSideAddButton = firstSideTile.queryByRole('button', { name: 'Add' })

          fireEvent.click(firstSideAddButton)

          await waitFor(() => footer.getByText('Sides price'))

          // Check price
          expect(footer.getByText('+£1.00')).toBeInTheDocument()

          // Check continue button
          expect(footer.queryByRole('button', { name: 'Continue without sides' })).not.toBeInTheDocument()
          expect(footer.queryByRole('button', { name: 'Continue with sides' })).toBeInTheDocument()

          // Add 2 Sides
          const secondSideTile = getWrappedSideTileFromHeader('Blanched Peas (160g)')
          const secondSideAddButton = secondSideTile.queryByRole('button', { name: 'Add' })
          fireEvent.click(secondSideAddButton)

          const secondSidePlusButton = secondSideTile.queryByRole('button', { name: '+' })
          fireEvent.click(secondSidePlusButton)

          // Check price
          expect(footer.getByText('+£3.00')).toBeInTheDocument()

          // Submit with Sides
          const continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

          fireEvent.click(continueWithSidesButton)

          expect(onSubmit).toHaveBeenNthCalledWith(
            1,
            'sides-modal-with-sides',
            {
              '50e99248-e00e-11eb-a669-02675e6927cd': 1,
              'ec295226-e008-11eb-a315-02675e6927cd': 2,
            },
          )

          // Remove Sides
          const firstSideMinusButton = firstSideTile.queryByRole('button', { name: '-' })
          const secondSideMinusButton = secondSideTile.queryByRole('button', { name: '-' })

          fireEvent.click(firstSideMinusButton)
          fireEvent.click(secondSideMinusButton)
          fireEvent.click(secondSideMinusButton)

          await waitFor(() => footer.getByRole('button', { name: 'Continue without sides' }))

          // Prices should be hidden
          expect(footer.queryByText('Sides price')).not.toBeInTheDocument()

          // Submit without Sides
          const continueWithoutSidesButton = footer.getByRole('button', { name: 'Continue without sides' })

          fireEvent.click(continueWithoutSidesButton)

          expect(onSubmit).toHaveBeenNthCalledWith(
            2,
            'sides-modal-with-sides',
            {},
          )
        })
      })

      describe('limits', () => {
        describe('when user tries to add a single side multiple times and it is more than the limit for that side', () => {
          it('should not let them add more than the limit', async () => {
            await renderOpenSidesModal()

            const sidePlusButton = addSideToBasket('Plain Naan (x2)', 2)

            expect(sidePlusButton).toHaveClass('disabled')

            // The tooltip uses React.portal and
            // only renders on the page once hovered over
            fireEvent.mouseOver(sidePlusButton)

            expect(screen.queryByRole('tooltip', { name: 'Sorry, we can\'t fit anymore of this item in your box' })).toBeInTheDocument()

            // Submit with Sides
            const footer = within(screen.getByRole('button', { name: 'Show Allergens and Nutrition' }).closest('div'))
            const continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

            fireEvent.click(continueWithSidesButton)

            expect(onSubmit).toHaveBeenNthCalledWith(
              1,
              'sides-modal-with-sides',
              {
                '50e99248-e00e-11eb-a669-02675e6927cd': 2
              },
            )
          })
        })

        describe('when user tries to add more sides more than the category limit', () => {
          it('should not let them add more than the category limit', async () => {
            await renderOpenSidesModal()

            const firstSidePlusButton = addSideToBasket('Cheese & basil garlic bread', 4)
            const secondSidePlusButton = addSideToBasket('Blanched Peas (160g)', 4)
            const thirdSidePlusButton = addSideToBasket('Plain Naan (x2)', 2)

            expect(firstSidePlusButton).toHaveClass('disabled')
            expect(secondSidePlusButton).toHaveClass('disabled')
            expect(thirdSidePlusButton).toHaveClass('disabled')

            // The tooltip uses React.portal and
            // only renders on the page once hovered over
            fireEvent.mouseOver(thirdSidePlusButton)

            expect(screen.queryByRole('tooltip', { name: 'Sorry, we can\'t fit anymore "Sides" items in your box' })).toBeInTheDocument()

            // Submit with Sides
            const footer = within(screen.getByRole('button', { name: 'Show Allergens and Nutrition' }).closest('div'))
            const continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

            fireEvent.click(continueWithSidesButton)

            expect(onSubmit).toHaveBeenNthCalledWith(
              1,
              'sides-modal-with-sides',
              {
                '50e99248-e00e-11eb-a669-02675e6927cd': 2,
                'aacf211c-3ad5-11eb-bb92-06c0e76c292d': 4,
                'ec295226-e008-11eb-a315-02675e6927cd': 4,
              },
            )
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
              const sideTile = getWrappedSideTileFromHeader('Cheese & basil garlic bread')
              const sideAddButton = sideTile.queryByRole('button', { name: 'Add' })

              fireEvent.click(sideAddButton)
              const sidePlusButton = sideTile.queryByRole('button', { name: '+' })

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

              expect(onSubmit).toHaveBeenNthCalledWith(
                1,
                'sides-modal-with-sides',
                {
                  'product-id': 8,
                  [garlicBreadId]: 2,
                },
              )
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
            const sideTile = getWrappedSideTileFromHeader('8 Dough Ball Bites')
            const sidePlusButton = sideTile.queryByRole('button', { name: '+' })

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
            expect(onSubmit).toHaveBeenNthCalledWith(
              1,
              'sides-modal-with-sides',
              {
                [doughBallId]: 3,
              },
            )
          })
        })
      })
    })
  })
})
