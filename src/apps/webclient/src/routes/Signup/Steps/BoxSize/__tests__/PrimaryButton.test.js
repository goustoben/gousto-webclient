import React from 'react'
import { shallow } from 'enzyme'
import { PrimaryButton } from '../PrimaryButton'

describe('PrimaryButton', () => {
  let wrapper

  const onPrimaryButtonClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <PrimaryButton
        value={2}
        ctaText="Choose regular box"
        onPrimaryButtonClick={onPrimaryButtonClick}
      />,
    )
  })

  test('renders correctly', () => {
    expect(wrapper.find('Connect(Button)').exists()).toBe(true)
  })

  describe('when the button is clicked', () => {
    beforeEach(() => {
      wrapper.find('Connect(Button)').simulate('click')
    })

    test('then it should invoke the callback', () => {
      expect(onPrimaryButtonClick).toHaveBeenCalledWith(2)
    })
  })
})
