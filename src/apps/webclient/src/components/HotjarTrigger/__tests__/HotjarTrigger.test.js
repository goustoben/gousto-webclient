import React from 'react'
import { mount } from 'enzyme'
import { HotjarTrigger } from '../HotjarTrigger'

describe('HotjarTrigger', () => {
  let wrapper
  const hj = jest.fn()

  describe('when mounted', () => {
    beforeAll(() => {
      jest.clearAllMocks()
      global.hj = hj

      wrapper = mount(<HotjarTrigger name="showcase_menu" />)
    })

    test('then it should not actually render anything', () => {
      expect(wrapper.children()).toHaveLength(0)
    })

    test('then it should invoke the hotjar trigger', () => {
      expect(hj).toHaveBeenCalledWith('trigger', 'showcase_menu')
    })
  })

  describe('when mounted with shouldInvoke=false', () => {
    beforeAll(() => {
      jest.clearAllMocks()
      global.hj = hj

      wrapper = mount(<HotjarTrigger name="showcase_menu" shouldInvoke={false} />)
    })

    test('then it should not invoke the trigger', () => {
      expect(hj).not.toHaveBeenCalled()
    })
  })

  describe('when mounted but hj is undefined', () => {
    beforeAll(() => {
      jest.clearAllMocks()
      delete global.hj

      wrapper = mount(<HotjarTrigger name="showcase_menu" />)
    })

    test('then it should not invoke the trigger', () => {
      expect(hj).not.toHaveBeenCalled()
    })
  })
})
