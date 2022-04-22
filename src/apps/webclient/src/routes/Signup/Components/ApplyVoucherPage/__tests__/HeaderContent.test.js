import React from 'react'
import { shallow } from 'enzyme'
import { HeaderContent } from '../HeaderContent'

describe('Given HeaderContent', () => {
  let wrapper
  const handleClick = jest.fn()
  const trackUTMAndPromoCode = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <HeaderContent
        isExpanded={false}
        handleClick={handleClick}
        trackUTMAndPromoCode={trackUTMAndPromoCode}
      />,
    )
  })

  test('renders properly', () => {
    expect(wrapper.find('.header').exists()).toBeTruthy()
    expect(wrapper.find('.title').exists()).toBeTruthy()
    expect(wrapper.find('Svg').exists()).toBeTruthy()
  })

  describe('when user click on dropdown', () => {
    beforeEach(() => {
      wrapper.find('.header').simulate('click')
    })

    test('then trackUTMAndPromoCode should be called', () => {
      expect(trackUTMAndPromoCode).toHaveBeenCalledWith('click_god_voucher_info')
    })

    test('then handleClick should be called', () => {
      expect(handleClick).toHaveBeenCalled()
    })
  })
})
