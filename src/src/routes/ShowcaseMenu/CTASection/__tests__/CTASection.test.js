import React from 'react'
import { shallow } from 'enzyme'
import { CTASection } from '../CTASection'

describe('CTASection', () => {
  let wrapper

  const onClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<CTASection onClick={onClick} />)
  })

  test('renders correctly', () => {
    expect(wrapper.find('CTA').exists()).toBe(true)
  })

  describe('when the CTA is clicked', () => {
    beforeEach(() => {
      wrapper.find('CTA').simulate('click')
    })

    test('then it should invoke onClick', () => {
      expect(onClick).toHaveBeenCalledWith()
    })
  })
})
