import React from 'react'
import { mount } from 'enzyme'
import { GetHelpLayout } from '../GetHelpLayout'
import { BottomFixedContentWrapper } from '../../../components/BottomFixedContentWrapper'

describe('GetHelpLayout', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <GetHelpLayout title="test title" body="test body description">
        <div className="unique" />
        <BottomFixedContentWrapper><div /></BottomFixedContentWrapper>
      </GetHelpLayout>
    )
  })

  test('component is rendering header correctly', () => {
    expect(wrapper.find('Heading').text()).toBe('test title')
  })

  test('component is rendering bottom bar correctly', () => {
    expect(wrapper.find('.bodyContent').find('BottomFixedContentWrapper').exists()).toBe(false)
    expect(wrapper.find('.footerContent').find('BottomFixedContentWrapper').exists()).toBe(true)
  })

  test('component content is rendering correctly', () => {
    expect(wrapper.find('.bodyContent').find('.unique').exists()).toBe(true)
  })

  describe('when the ctaBackUrl prop is passed', () => {
    const DUMMY_URL = '/test-url'

    beforeEach(() => {
      wrapper.setProps({ ctaBackUrl: DUMMY_URL })
    })

    test('sets the correct url prop to CTABack component', () => {
      expect(wrapper.find('CTABack').prop('url')).toBe(DUMMY_URL)
    })
  })
})
