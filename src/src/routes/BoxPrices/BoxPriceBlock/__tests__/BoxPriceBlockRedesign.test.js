import React from 'react'
import { shallow } from 'enzyme'
import { BoxPriceBlock } from '../BoxPriceBlockRedesign'

describe('Given BoxPriceBlockRedesign', () => {
  let wrapper
  const boxPricesBoxSizeSelected = jest.fn()
  const boxPriceMock = [
    {
      num_portions: 2,
      price_per_portion: '6.25',
      total: '24.99',
    },
    {
      num_portions: 3,
      price_per_portion: '5.00',
      total: '29.99',
    },
  ]

  beforeEach(() => {
    wrapper = shallow(<BoxPriceBlock boxInfo={boxPriceMock} numPersons={2} selectedBox={2} boxPricesBoxSizeSelected={boxPricesBoxSizeSelected} />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.containerRedesignActive').exists()).toBeTruthy()
    expect(wrapper.find('.carouselItem').exists()).toBeTruthy()
    expect(wrapper.find('.itemHeading').exists()).toBeTruthy()
    expect(wrapper.find('.select').exists()).toBeTruthy()
    expect(wrapper.find('.selectDescription').exists()).toBeTruthy()
    expect(wrapper.find('.list').exists()).toBeTruthy()
    expect(wrapper.find('.listItem').exists()).toBeTruthy()
    expect(wrapper.find('.buttonGroup').exists()).toBeTruthy()
    expect(wrapper.find('.boxSizeButtonActive').exists()).toBeTruthy()
    expect(wrapper.find('.boxSizeButton').exists()).toBeTruthy()
    expect(wrapper.find('.suitableTitle')).toHaveLength(2)
    expect(wrapper.find('.selectItem')).toHaveLength(2)
    expect(wrapper.find('.amount')).toHaveLength(2)
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.find('CTA').exists()).toBeTruthy()
    expect(wrapper.find('Offer')).toHaveLength(2)
  })

  test('boxPricesBoxSizeSelected should be called', () => {
    wrapper.find('CTA').simulate('click')
    expect(boxPricesBoxSizeSelected.mock.calls.length).toEqual(1)
  })

  test('boxSizeButton should be called', () => {
    wrapper.find('.boxSizeButton').simulate('click')
    expect(wrapper.state().selected).toEqual(1)
  })
})
