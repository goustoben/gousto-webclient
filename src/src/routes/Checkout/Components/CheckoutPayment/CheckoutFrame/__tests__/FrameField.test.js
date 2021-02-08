import React from 'react'
import { shallow } from 'enzyme'
import { FrameField } from '../FrameField'

describe('given FrameField', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <FrameField
        header="header string"
        dataFrames="frames data"
        errorDataTesting="errorSelector"
        errorMessage="error message"
        showError={false}
      />
    )
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.fieldContainer')).toHaveLength(1)
    expect(wrapper.find('InputError').exists()).toBeFalsy()
  })

  describe('when showError is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        showError: true
      })
    })

    test('then should render InputError', () => {
      expect(wrapper.find('InputError').exists()).toBeTruthy()
    })
  })

  describe('when hasLockIcon is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        hasLockIcon: true
      })
    })

    test('then should render icon', () => {
      expect(wrapper.find('.lockIconContainer')).toHaveLength(1)
      expect(wrapper.find('Svg').exists()).toBeTruthy()
    })
  })
})
