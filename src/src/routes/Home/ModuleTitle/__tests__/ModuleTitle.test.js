import React from 'react'
import { shallow } from 'enzyme'
import { ModuleTitle } from '../ModuleTitle'

describe('Given ModuleTitle', () => {
  let wrapper
  const title = 'some text'

  beforeEach(() => {
    wrapper = shallow(<ModuleTitle title={title} />)
  })

  test('should renders correctly', () => {
    expect(wrapper.find(ModuleTitle)).toBeDefined()
    expect(wrapper.find('.title').exists()).toBeTruthy()
    expect(wrapper.find('.subTitle').exists()).toBeFalsy()
  })

  describe('when subTitle is passed', () => {
    beforeEach(() => {
      wrapper.setProps({
        subTitle: 'sub title text',
      })
    })

    test('then should render subTitle', () => {
      expect(wrapper.find('.title').exists()).toBeTruthy()
      expect(wrapper.find('.subtitleContainer').exists()).toBeTruthy()
    })
  })
})
