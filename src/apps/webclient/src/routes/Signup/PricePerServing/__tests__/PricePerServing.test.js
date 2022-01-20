import React from 'react'
import { shallow } from 'enzyme'
import { PricePerServing } from '../PricePerServing'

describe('PricePerServing', () => {
  let wrapper
  const onClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <PricePerServing
        image="per-two-people"
        onClick={onClick}
        cost={{
          price: '2.04',
          priceDiscounted: '2.04',
        }}
        portion={2}
      />
    )
  })

  test('renders component properly', () => {
    expect(wrapper.find('Heading').first().html()).toContain('2 people')
    expect(wrapper.find('Heading').at(1).html()).toContain('£2.04')
    expect(wrapper.find('.discount')).toHaveLength(0)
  })

  test('simulates CTA button click event', () => {
    wrapper.find('CTA').simulate('click')

    expect(onClick).toHaveBeenCalled()
  })

  describe('when a discount is applied', () => {
    beforeEach(() => {
      wrapper.setProps({
        cost: {
          priceDiscounted: '2.30',
          price: '2.4',
        },
      })
    })

    test('then should render discount label', () => {
      expect(wrapper.find('.discount').text()).toContain('£2.4')
    })
  })
})
