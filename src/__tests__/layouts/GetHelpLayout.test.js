import React from 'react'
import { mount } from 'enzyme'
import { GetHelpLayout } from 'layouts/GetHelpLayout/GetHelpLayout'
import { BottomFixedContentWrapper } from '../../src/routes/GetHelp/components/BottomFixedContentWrapper'

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
})
