import React from 'react'
import { shallow } from 'enzyme'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { BeforeDeliveryDay } from '..'

describe('BeforeDeliveryDay', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <BeforeDeliveryDay />
    )
  })

  test('renders without crashing', () => {})

  test('renders GetHelpLayout2', () => {
    expect(wrapper.find('GetHelpLayout2').exists()).toBe(true)
  })

  test('renders Heading', () => {
    expect(wrapper.find('Heading').exists()).toBe(true)
  })

  test('Heading has the size set to fontStyleM', () => {
    expect(wrapper.find('Heading').prop('size')).toBe('fontStyleM')
  })

  test('Heading content is relevant', () => {
    expect(wrapper.find('Heading').prop('children')).toMatch(/did.*arrive/)
  })

  test('renders a paragraph with relevant content', () => {
    expect(wrapper.find('p').text()).toMatch(/track.*My Gousto/)
  })

  test('renders CTA inside BottomFixedContent', () => {
    expect(wrapper.find('BottomFixedContent').find('CTA').exists()).toBe(true)
  })

  describe('when CTA is clicked', () => {
    beforeEach(() => {
      browserHistory.push = jest.fn()

      const CTA = wrapper.find('BottomFixedContent').find('CTA')
      CTA.simulate('click')
    })

    test('the CTA points to My Gousto page', () => {
      expect(browserHistory.push).toHaveBeenCalledWith(client.myGousto)
    })
  })
})
