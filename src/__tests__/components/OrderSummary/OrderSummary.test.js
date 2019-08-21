import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import OrderSummary from 'OrderSummary'
import Receipt from 'Receipt'
import SaveButton from 'OrderSummary/SaveButton'
import SectionHeader from 'SectionHeader/SectionHeader'

describe('OrderSummary', () => {
  let wrapper
  let removeProduct
  let showProductDetail

  beforeEach(() => {
    removeProduct = function () { }
    showProductDetail = function () { }

    wrapper = shallow(
      <OrderSummary
        recipes={Immutable.fromJS({
          r1: {},
        })}
        products={Immutable.fromJS({
          p1: { isVatable: true, title: 'p1 title', listPrice: '2.00' },
          p2: {},
        })}
        recipeItems={Immutable.fromJS({
          r1: 2,
          r2: 2,
        })}
        productItems={Immutable.fromJS({
          p1: 3,
        })}
        giftItems={Immutable.fromJS({
          gp1: 1,
        })}
        numPortions={2}
        numRecipes={3}
        prices={Immutable.fromJS({
          pricePerPortion: '1.01',
          pricePerPortionDiscounted: '1.00',
          recipeTotalDiscounted: '6.00',
          recipeTotal: '24.99',
          deliveryTotal: '1.99',
          productTotal: '6.00',
          surchargeTotal: '4.99',
          total: '29.99',
          recipeDiscount: '14.99',
          percentageOff: '50',
        })}
        shippingAddress={Immutable.fromJS({
          line1: '1 Example Street',
          line2: 'Zone 2',
          line3: 'Neverland',
          town: 'London',
          postcode: 'F4 K3',
        })}
        deliveryDate="2016-05-06"
        deliverySlot={Immutable.fromJS({
          deliveryStart: '09:00:00',
          deliveryEnd: '16:59:59',
        })}
        removeProduct={removeProduct}
        showProductDetail={showProductDetail}
        onSave={() => 1}
        saving
        saveError={false}
        orderSummaryCollapsed
      />,
    )
  })

  test('should return section', () => {
    expect(wrapper.type()).toBe('section')
  })

  test('should contain 1 <SectionHeader>', () => {
    expect(wrapper.find(SectionHeader).length).toBe(1)
  })

  test('should contain 1 footer', () => {
    expect(wrapper.find('footer').length).toBe(1)
  })

  test('should pass the numPortions to the receipt', () => {
    expect(wrapper.find(Receipt).prop('numPortions')).toBe(2)
  })

  test('should pass the numRecipes to the receipt', () => {
    expect(wrapper.find(Receipt).prop('numRecipes')).toBe(3)
  })

  test('should pass the recipeTotalPrice to the receipt', () => {
    expect(wrapper.find(Receipt).prop('recipeTotalPrice')).toBe('24.99')
  })

  test('should pass the totalToPay to the receipt', () => {
    expect(wrapper.find(Receipt).prop('totalToPay')).toBe('29.99')
  })

  test('should pass the recipeDiscountAmount to the receipt', () => {
    expect(wrapper.find(Receipt).prop('recipeDiscountAmount')).toBe('14.99')
  })

  test('should pass the recipeDiscountPercent to the receipt', () => {
    expect(wrapper.find(Receipt).prop('recipeDiscountPercent')).toBe('50')
  })

  test('should pass the deliveryTotalPrice to the receipt', () => {
    expect(wrapper.find(Receipt).prop('deliveryTotalPrice')).toBe('1.99')
  })

  test('should pass the surchargeTotal to the receipt', () => {
    expect(wrapper.find(Receipt).prop('surchargeTotal')).toBe('4.99')
  })

  test('should set dashPricing to undefined', () => {
    expect(wrapper.find(Receipt).prop('dashPricing')).toBe(undefined)
  })

  test('should pass the prices to the receipt', () => {
    expect(
      Immutable.is(
        wrapper.find(Receipt).prop('prices'),
        Immutable.fromJS({
          pricePerPortion: '1.01',
          pricePerPortionDiscounted: '1.00',
          recipeTotalDiscounted: '6.00',
          recipeTotal: '24.99',
          deliveryTotal: '1.99',
          productTotal: '6.00',
          surchargeTotal: '4.99',
          total: '29.99',
          recipeDiscount: '14.99',
          percentageOff: '50',
        }),
      ),
    ).toBe(true)
  })

  test('should pass the shippingAddress to the receipt', () => {
    expect(
      Immutable.is(
        wrapper.find(Receipt).prop('shippingAddress'),
        Immutable.fromJS({
          line1: '1 Example Street',
          line2: 'Zone 2',
          line3: 'Neverland',
          town: 'London',
          postcode: 'F4 K3',
        }),
      ),
    ).toBe(true)
  })

  test('should pass the deliveryDate to the receipt', () => {
    expect(wrapper.find(Receipt).prop('deliveryDate')).toBe('2016-05-06')
  })

  test('should pass the deliverySlot to the receipt', () => {
    expect(
      Immutable.is(
        wrapper.find(Receipt).prop('deliverySlot'),
        Immutable.fromJS({
          deliveryStart: '09:00:00',
          deliveryEnd: '16:59:59',
        }),
      ),
    ).toBe(true)
  })

  test('should pass extrasTotalPrice to the receipt', () => {
    expect(wrapper.find(Receipt).prop('extrasTotalPrice')).toBe('6')
  })

  test('should pass correct vatableItems to the receipt if any products have vat', () => {
    expect(wrapper.find(Receipt).prop('vatableItems')).toBe(true)
    const products = Immutable.fromJS({
      p1: { isVatable: false, title: 'p1 title', listPrice: '2.00' },
    })
    wrapper.setProps({ products })
    expect(wrapper.find(Receipt).prop('vatableItems')).toBe(false)
  })

  test('should show vat disclaimer if vatable items in order', () => {
    expect(
      wrapper
        .find('p')
        .at(2)
        .text(),
    ).toContain('These items include VAT at 20%')
    const products = Immutable.fromJS({
      p1: { isVatable: false, title: 'p1 Title', listPrice: '2.00', images: {} },
    })
    wrapper.setProps({ products })
    expect(wrapper.find(Receipt).render().find('p.disclaimer')).toHaveLength(0)
  })

  test('should pass the onSave to the SaveButton', () => {
    expect(wrapper.find(SaveButton).prop('onSave')).toEqual(
      wrapper.prop('onSave'),
    )
  })

  test('should pass the saveError to the SaveButton', () => {
    expect(wrapper.find(SaveButton).prop('error')).toEqual(false)
    wrapper.setProps({ error: true })
    expect(wrapper.find(SaveButton).prop('saving')).toEqual(true)
  })

  test('should pass the saving to the SaveButton', () => {
    expect(wrapper.find(SaveButton).prop('saving')).toEqual(true)
    wrapper.setProps({ saving: false })
    expect(wrapper.find(SaveButton).prop('saving')).toEqual(false)
  })
  test('should check if css slide class is applied', () => {
    expect(wrapper.find('.slideUp').length).toEqual(1)
  })
  test('should NOT apply slideUp class if orderSummaryCollapsed is false', () => {
    wrapper.setProps({ orderSummaryCollapsed: false })
    expect(wrapper.find('.slideUp').exists()).toBe(false)
  })
})

describe('OrderSummary SectionHeader', () => {
  let wrapper
  let header

  beforeEach(() => {
    wrapper = shallow(
      <OrderSummary
        deliveryDate="2016-05-06"
        numPortions={2}
        numRecipes={2}
        products={{}}
        recipes={{}}
        deliveryTotalPrice={'2.50'}
        onSave={function () { }}
      />,
    )

    header = wrapper.find(SectionHeader)
  })

  test('should contain 2 <p>s', () => {
    expect(header.find('p').length).toBe(2)
  })

  test('should contain delivery message with date formatted "dddd, Do MMM" in first p', () => {
    expect(
      header
        .find('p')
        .first()
        .text(),
    ).toBe('Your box will arrive Friday, 6th May')
  })

  test('should contain "Here\'s what\'s inside your box" in second p', () => {
    expect(
      header
        .find('p')
        .last()
        .text(),
    ).toBe('Here\'s what\'s inside your box')
  })
})

describe('OrderSummary footer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <OrderSummary
        deliveryDate="2016-05-06"
        numPortions={2}
        numRecipes={2}
        products={{}}
        recipes={{}}
        deliveryTotalPrice={'2.50'}
        onSave={function () { }}
        orderSummaryCollapsed
      />,
    )
  })

  test('should contain 1 <a>', () => {
    expect(wrapper.find('footer a').length).toBe(1)
  })

  test('should display text "View order details >" for link by default ', () => {
    expect(wrapper.find('footer a').text()).toBe('View order details >')
  })

  test('should set state.orderSummaryOpen to false by default', () => {
    expect(wrapper.state().orderSummaryOpen).toBe(false)
  })

  test('should toggle state.orderSummaryOpen on link onClick', () => {
    wrapper.find('footer a').simulate('click')
    wrapper.update()

    expect(wrapper.state().orderSummaryOpen).toBe(true)

    wrapper.find('footer a').simulate('click')
    wrapper.update()

    expect(wrapper.state().orderSummaryOpen).toBe(false)
  })

  test('should display text "Hide order details" for link if state.orderSummaryOpen', () => {
    wrapper.setState({ orderSummaryOpen: true })

    expect(wrapper.find('footer a').text()).toBe('Hide order details')
  })
  test('should not render footer when orderSumaryCollapsed is false', () => {
    wrapper.setProps({ orderSummaryCollapsed: false })
    expect(wrapper.find('footer').exists()).toBe(false)
  })
})
