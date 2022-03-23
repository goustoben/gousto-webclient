import React from 'react'
import { render, screen, within, fireEvent, waitFor, cleanup } from '@testing-library/react'
import * as OrderAPI from 'apis/orders'
import { user } from 'routes/Menu/apis/sides.hook.mock'
import Modal from 'react-modal'
import {
  withMockEnvironmentAndDomain
} from '_testing/isomorphic-environment-test-utils'
import { SidesModal } from './SidesModal'

jest.setTimeout(10000)

Modal.setAppElement(document.body)

describe('<SideModal />', () => {
  const accessToken = 'access-token'
  const orderId = 'order-id'

  const getOrder = (products = []) => ({
    id: orderId,
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

  let onSubmit
  let onClose
  let trackAddSide
  let trackSidesContinueClicked
  let trackViewSidesAllergens
  let trackCloseSidesAllergens
  let updateOrderItems

  const SideIds = {
    PlainNaan: '50e99248-e00e-11eb-a669-02675e6927cd',
    BlanchedPeas: 'ec295226-e008-11eb-a315-02675e6927cd',
    GarlicBread: 'aacf211c-3ad5-11eb-bb92-06c0e76c292d',
    DoughBall: '5a8503be-a814-11eb-8cf7-06643a4ae7fd',
  }

  beforeEach(() => {
    jest.clearAllMocks() // trying to avoid potential collisions with tests that aren't cleaning up their mocks properly.
    updateOrderItems = jest.spyOn(OrderAPI, 'updateOrderItems').mockImplementation().mockResolvedValue()
    onSubmit = jest.fn()
    onClose = jest.fn()
    trackAddSide = jest.fn()
    trackSidesContinueClicked = jest.fn()
    trackViewSidesAllergens = jest.fn()
    trackCloseSidesAllergens = jest.fn()
  })

  afterEach(jest.clearAllMocks)
  afterEach(cleanup)

  // mock the environment and domain config used by these tests to generate endpoints
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  const SideModalWithMockedProps = ({
    // eslint-disable-next-line react/prop-types
    userId,
    // eslint-disable-next-line react/prop-types
    order = getOrder(),
    // eslint-disable-next-line react/prop-types
    isOpen,
  }) => (
    <SidesModal
      accessToken={accessToken}
      userId={userId}
      order={order}
      onSubmit={onSubmit}
      isOpen={isOpen}
      onClose={onClose}
      trackAddSide={trackAddSide}
      trackSidesContinueClicked={trackSidesContinueClicked}
      trackViewSidesAllergens={trackViewSidesAllergens}
      trackCloseSidesAllergens={trackCloseSidesAllergens}
    />
  )

  const renderModal = ({
    userId,
    order = getOrder(),
    isOpen,
  }) => render(<SideModalWithMockedProps userId={userId} order={order} isOpen={isOpen} />)

  /*
   * Sides/Products looks like;
   *  {
   *    [SideIds.PlainNaan]: 1,
   *    [SideIds.BlanchedPeas]: 2,
   *  }
   */
  const expectSubmitToHaveBeenNthCalledWith = async (nth, sides, totalQntOfSides, totalPrice, products = {}) => {
    // We track submitting with sides
    await waitFor(() => expect(updateOrderItems).toBeCalledTimes(nth))
    await waitFor(() => expect(trackSidesContinueClicked).toBeCalledTimes(nth))
    await waitFor(() => expect(onSubmit).toBeCalledTimes(nth))

    const sideIds = Object.keys(sides)
    const sideIdsAndProducts = [...sideIds, ...Object.keys(products)]

    expect(updateOrderItems).toHaveBeenNthCalledWith(
      nth,
      'access-token',
      'order-id',
      {
        item_choices: expect.arrayContaining(sideIdsAndProducts.map((id) => ({
          id,
          quantity: sides[id] || products[id],
          type: 'Product'
        }))),
        restrict: 'Product'
      }
    )

    expect(trackSidesContinueClicked).toHaveBeenNthCalledWith(
      nth,
      expect.arrayContaining(sideIds),
      // Total price of sides
      totalPrice,
      // Total quantity of sides
      totalQntOfSides,
    )

    expect(onSubmit).toHaveBeenNthCalledWith(
      nth,
      'sides-modal-with-sides',
      {
        ...sides,
        ...products,
      }
    )
  }

  describe('when modal is not open', () => {
    it('should not render', () => {
      renderModal({ isOpen: false, userId: user.withSides })

      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('when modal is open', () => {
    describe('with an unsuccessful request', () => {
      it('should call submitWithNoSides and not render', async () => {
        expect.assertions(3)

        renderModal({ isOpen: true, userId: user.withError })

        await waitFor(() => {
          expect(onSubmit).toHaveBeenNthCalledWith(1, 'sides-modal-without-sides', null)
        })

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })
    })

    describe('when sides endpoint returns with no sides', () => {
      it('should call submitWithNoSides and not render', async () => {
        expect.assertions(3)

        renderModal({ isOpen: true, userId: user.withOutSides })

        await waitFor(() => {
          expect(onSubmit).toHaveBeenNthCalledWith(1, 'sides-modal-without-sides', null)
        })

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })
    })

    describe('when sides endpoint returns sides', () => {
      const renderOpenSidesModal = async (order) => {
        const rtl = renderModal({ isOpen: true, userId: user.withSides, order })

        // Wait for sides to load
        await screen.findByRole('heading', { name: 'Fancy any sides?', level: 2 })

        return rtl
      }

      it('should render the sides tiles', async () => {
        await renderOpenSidesModal()

        expect(screen.queryByRole('heading', { name: 'Allergens and Nutrition', level: 2 })).not.toBeInTheDocument()

        // plainNaan Side
        const plainNaanSideTile = getWrappedSideTileFromHeader('Plain Naan (x2)')
        expect(plainNaanSideTile.queryByText(/£1.00 ● 2 Servings/)).toBeInTheDocument()
        expect(plainNaanSideTile.queryByLabelText('Add or Remove Side')).toBeInTheDocument()
        const plainNaanImage = plainNaanSideTile.getByAltText('Plain Naan (x2)')
        expect(plainNaanImage).toHaveAttribute('src', 'https://production-media.gousto.co.uk/cms/product-image-landscape/Naan-3914-x400.jpg')

        // blanchedPeas Side
        const blanchedPeasSideTile = getWrappedSideTileFromHeader('Blanched Peas (160g)')
        expect(blanchedPeasSideTile.queryByText(/£1.00 ● 2 Servings/)).toBeInTheDocument()
        expect(blanchedPeasSideTile.queryByLabelText('Add or Remove Side')).toBeInTheDocument()
        const blanchedPeasImage = blanchedPeasSideTile.getByAltText('Blanched Peas (160g)')
        expect(blanchedPeasImage).toHaveAttribute('src', 'https://production-media.gousto.co.uk/cms/product-image-landscape/Peas-3924-x400.jpg')
      })

      it('should call onClose when modal close button is clicked and hide allergens', async () => {
        await renderOpenSidesModal()

        const header = within(screen.getByRole('heading', { name: 'Fancy any sides?', level: 2 }).closest('div'))
        const closeButton = header.getByTestId('modalClose')

        // Show Allergens
        const button = screen.getByRole('button', { name: 'Show Allergens and Nutrition' })

        fireEvent.click(button)

        await screen.findByRole('heading', { name: 'Allergens and Nutrition', level: 2 })

        fireEvent.click(closeButton)

        expect(onClose).toBeCalledTimes(1)

        await screen.findByRole('heading', { name: 'Fancy any sides?', level: 2 })
      })

      describe('when user clicks show allergens', () => {
        it('should render the sides allergens and nutrition information', async () => {
          await renderOpenSidesModal()

          // Show Allergens
          const button = screen.getByRole('button', { name: 'Show Allergens and Nutrition' })

          fireEvent.click(button)

          // Track showing Allergens information
          expect(trackViewSidesAllergens).toBeCalledTimes(1)

          await screen.findByRole('heading', { name: 'Allergens and Nutrition', level: 2 })

          expect(screen.queryByRole('heading', { name: 'Fancy any sides?', level: 2 })).not.toBeInTheDocument()

          // plainNaan Side
          const plainNaanSideTile = getSideTileFromHeader('Plain Naan (x2)')
          // Expect description to be rendered
          expect(plainNaanSideTile).toContainHTML('The perfect accompaniment to any curry')
          // Expect allergy bolding
          expect(plainNaanSideTile).toContainHTML('<span class="bold">wheat</span>')

          // blanchedPeas Side
          const blanchedPeasSideTile = getSideTileFromHeader('Blanched Peas (160g)')
          // Expect description to be rendered
          expect(blanchedPeasSideTile).toContainHTML('Delicious green peas')
          // No allergen test as peas don't have any

          // Hide Allergens
          const hideAllergensButton = screen.getByRole('button', { name: 'Hide Allergens and Nutrition' })

          fireEvent.click(hideAllergensButton)

          // Track closing Allergens information
          expect(trackCloseSidesAllergens).toBeCalledTimes(1)

          await screen.findByRole('heading', { name: 'Fancy any sides?', level: 2 })

          expect(screen.queryByRole('heading', { name: 'Allergens and Nutrition', level: 2 })).not.toBeInTheDocument()
        })
      })

      describe('when user selects sides and submits', () => {
        describe('when updating products is successful', () => {
          it('should display total and call onSubmit when continue button is clicked', async () => {
            const { rerender } = await renderOpenSidesModal()

            // Footer
            let footer = within(screen.getByRole('button', { name: 'Show Allergens and Nutrition' }).closest('div'))

            expect(footer.queryByRole('button', { name: 'Continue without sides' })).toBeInTheDocument()
            expect(footer.queryByRole('button', { name: 'Continue with sides' })).not.toBeInTheDocument()

            // Add a Side
            const plainNaanSideTile = getWrappedSideTileFromHeader('Plain Naan (x2)')
            const plainNaanSideAddButton = plainNaanSideTile.queryByRole('button', { name: 'Add' })

            fireEvent.click(plainNaanSideAddButton)

            await footer.findByText('Sides price')

            // We track adding a side
            expect(trackAddSide).toHaveBeenNthCalledWith(1, SideIds.PlainNaan, orderId)

            // Check price
            expect(footer.getByText('+£1.00')).toBeInTheDocument()

            // Check continue button
            expect(footer.queryByRole('button', { name: 'Continue without sides' })).not.toBeInTheDocument()
            expect(footer.queryByRole('button', { name: 'Continue with sides' })).toBeInTheDocument()

            // Add 2 Sides
            addSideToBasket('Blanched Peas (160g)', 2)

            // We track adding a side
            expect(trackAddSide).toHaveBeenNthCalledWith(2, SideIds.BlanchedPeas, orderId)
            expect(trackAddSide).toHaveBeenNthCalledWith(3, SideIds.BlanchedPeas, orderId)

            // Check price
            expect(footer.getByText('+£3.00')).toBeInTheDocument()

            // Submit with Sides
            let continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

            fireEvent.click(continueWithSidesButton)

            // We successfully submitted the sides
            await expectSubmitToHaveBeenNthCalledWith(
              1,
              {
                [SideIds.PlainNaan]: 1,
                [SideIds.BlanchedPeas]: 2,
              },
              // Total quantity of sides
              3,
              // Total price of sides
              3
            )

            expect(continueWithSidesButton).toBeDisabled()

            // Close and Open Modal should reset disabled state and resets selected products base on Order
            rerender(<SideModalWithMockedProps userId={user.withSides} isOpen={false} />)

            await waitFor(() => expect(screen.queryByRole('heading', { name: 'Fancy any sides?', level: 2 })).not.toBeInTheDocument())

            const doughBalls = [{
              type: 'product',
              id: SideIds.DoughBall,
              meta: {
                quantity: 1,
                amendments: [],
              },
            }]

            rerender(<SideModalWithMockedProps userId={user.withSides} isOpen order={getOrder(doughBalls)} />)

            await waitFor(() => expect(screen.queryByRole('heading', { name: 'Fancy any sides?', level: 2 })).toBeInTheDocument())

            // Reselect footer and continueWithSidesButton
            footer = within(screen.getByRole('button', { name: 'Show Allergens and Nutrition' }).closest('div'))
            continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

            expect(continueWithSidesButton).not.toBeDisabled()

            // Reselect tiles and remove Sides
            const doughBallSideTile = getWrappedSideTileFromHeader(('8 Dough Ball Bites'))

            const doughBallSideMinusButton = doughBallSideTile.queryByRole('button', { name: '-' })

            fireEvent.click(doughBallSideMinusButton)

            await footer.findByRole('button', { name: 'Continue without sides' })

            // Prices should be hidden
            expect(footer.queryByText('Sides price')).not.toBeInTheDocument()

            // Submit without Sides
            const continueWithoutSidesButton = footer.getByRole('button', { name: 'Continue without sides' })

            fireEvent.click(continueWithoutSidesButton)

            // We successfully submitted the sides
            await expectSubmitToHaveBeenNthCalledWith(
              2,
              {},
              // Total quantity of sides
              0,
              // Total price of sides
              0
            )

            expect(continueWithoutSidesButton).toBeDisabled()
          })
        })

        describe('when updating products is unsuccessful', () => {
          it('should continue with by calling onSubmit with null', async () => {
            updateOrderItems.mockRejectedValue(new Error('Something went wrong'))

            await renderOpenSidesModal()

            // Footer
            const footer = within(screen.getByRole('button', { name: 'Show Allergens and Nutrition' }).closest('div'))

            // Add a Side
            const plainNaanSideTile = getWrappedSideTileFromHeader('Plain Naan (x2)')
            const plainNaanSideAddButton = plainNaanSideTile.queryByRole('button', { name: 'Add' })

            fireEvent.click(plainNaanSideAddButton)

            // Submit with Sides
            const continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

            fireEvent.click(continueWithSidesButton)

            // When the request fails
            expect(updateOrderItems).toHaveBeenCalledTimes(1)

            // We call submit with no products/sides
            await waitFor(() => {
              expect(onSubmit).toHaveBeenNthCalledWith(1, 'sides-modal-failed-to-save-sides', null)
            })
          })
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

            // We successfully submitted the sides
            await expectSubmitToHaveBeenNthCalledWith(
              1,
              {
                [SideIds.PlainNaan]: 2
              },
              // Total quantity of sides
              2,
              // Total price of sides
              2
            )
          })
        })

        describe('when user tries to add more sides more than the category limit', () => {
          it('should not let them add more than the category limit', async () => {
            await renderOpenSidesModal()

            const garlicBreadSidePlusButton = addSideToBasket('Cheese & basil garlic bread', 4)
            const blanchedPeasSidePlusButton = addSideToBasket('Blanched Peas (160g)', 4)
            const plainNaanSidePlusButton = addSideToBasket('Plain Naan (x2)', 2)

            expect(garlicBreadSidePlusButton).toHaveClass('disabled')
            expect(blanchedPeasSidePlusButton).toHaveClass('disabled')
            expect(plainNaanSidePlusButton).toHaveClass('disabled')

            // The tooltip uses React.portal and
            // only renders on the page once hovered over
            fireEvent.mouseOver(plainNaanSidePlusButton)

            expect(screen.queryByRole('tooltip', { name: 'Sorry, we can\'t fit anymore "Sides" items in your box' })).toBeInTheDocument()

            // Submit with Sides
            const footer = within(screen.getByRole('button', { name: 'Show Allergens and Nutrition' }).closest('div'))
            const continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

            fireEvent.click(continueWithSidesButton)

            // We successfully submitted the sides
            await expectSubmitToHaveBeenNthCalledWith(
              1,
              {
                [SideIds.BlanchedPeas]: 4,
                [SideIds.GarlicBread]: 4,
                [SideIds.PlainNaan]: 2,
              },
              // Total quantity of sides
              10,
              // Total price of sides
              14
            )
          })
        })

        describe('max product limit', () => {
          describe('when user tries to add more products than the max product limit', () => {
            it('should not let them add more than the limit', async () => {
              const productId = 'product-id'
              const productWithQuantityOf8 = [ {
                type: 'product',
                id: productId,
                meta: {
                  quantity: 8,
                  amendments: [],
                },
              }]

              await renderOpenSidesModal(getOrder(productWithQuantityOf8))

              // Because there is a sides already in the order, there will already be 8 sides selected
              const sidePlusButton = addSideToBasket('Cheese & basil garlic bread', 2)

              expect(sidePlusButton).toHaveClass('disabled')

              // The tooltip uses React.portal and
              // only renders on the page once hovered over
              fireEvent.mouseOver(sidePlusButton)

              expect(screen.queryByRole('tooltip', { name: 'Sorry, we can\'t fit anymore items in your box' })).toBeInTheDocument()

              // Submit with Sides
              const footer = within(screen.getByRole('button', { name: 'Show Allergens and Nutrition' }).closest('div'))
              const continueWithSidesButton = footer.getByRole('button', { name: 'Continue with sides' })

              fireEvent.click(continueWithSidesButton)

              // We successfully submitted the sides
              await expectSubmitToHaveBeenNthCalledWith(
                1,
                {
                  [SideIds.GarlicBread]: 2,
                },
                // Total quantity of sides
                2,
                // Total price of sides
                4,
                // Products
                {
                  [productId]: 8,
                }
              )
            })
          })
        })
      })

      describe('stock', () => {
        describe('when user tries to add a single side more times than the stock for that side', () => {
          it('should not let them add more than the stock', async () => {
            const doughBalls = [{
              type: 'product',
              id: SideIds.DoughBall,
              meta: {
                quantity: 1,
                amendments: [],
              },
            }]

            await renderOpenSidesModal(getOrder(doughBalls))

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
            // We successfully submitted the sides
            await expectSubmitToHaveBeenNthCalledWith(
              1,
              {
                [SideIds.DoughBall]: 3,
              },
              // Total quantity of sides
              3,
              // Total price of sides
              6.75
            )
          })
        })
      })
    })
  })
})
