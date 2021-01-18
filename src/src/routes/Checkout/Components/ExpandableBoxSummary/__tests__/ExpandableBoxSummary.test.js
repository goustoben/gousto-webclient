import React from 'react'
import { mount } from 'enzyme'
import { ExpandableBoxSummary } from '../ExpandableBoxSummary'

describe('ExpandableBoxSummary', () => {
  let wrapper
  const trackUTMAndPromoCode = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <ExpandableBoxSummary trackUTMAndPromoCode={trackUTMAndPromoCode}>
        <div>children</div>
      </ExpandableBoxSummary>
    )
  })

  test('should renders correctly', () => {
    expect(wrapper.find(ExpandableBoxSummary).exists()).toBeTruthy()
    expect(wrapper.find('ExpandableSection').exists()).toBeTruthy()
    expect(wrapper.find('HeaderContent').exists()).toBeTruthy()
  })

  describe('when user click on HeaderContent', () => {
    beforeEach(() => {
      wrapper.find('HeaderContent').simulate('click')
    })

    test('then trackUTMAndPromoCode should be called', () => {
      expect(trackUTMAndPromoCode).toHaveBeenCalled()
    })
  })
})
