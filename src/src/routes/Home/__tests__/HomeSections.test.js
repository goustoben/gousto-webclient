import React from 'react'
import { shallow } from 'enzyme'
import { HomeSections } from 'routes/Home/HomeSections'

describe('HomeSections', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<HomeSections />)
  })

  test('should be mounted', () => {
    expect(wrapper.find(HomeSections)).toBeDefined()
  })

  describe('when modules prop is not defined', () => {
    beforeEach(() => {
      wrapper.setProps({
        modules: undefined
      })
    })

    test('then should render all default modules', () => {
      expect(wrapper.find('section')).toHaveLength(5)
      expect(wrapper.find('Connect(Hero)')).toHaveLength(1)
      expect(wrapper.find('TrustPilot')).toHaveLength(1)
      expect(wrapper.find('WhyChooseGousto')).toHaveLength(1)
      expect(wrapper.find('JoeWicks')).toHaveLength(1)
      expect(wrapper.find('Connect(Carousel)')).toHaveLength(1)
    })
  })

  describe('when modules prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({
        modules: ['hero', 'recipes']
      })
    })

    test('then should render only specified modules', () => {
      expect(wrapper.find('section')).toHaveLength(2)
      expect(wrapper.find('Connect(Hero)')).toHaveLength(1)
      expect(wrapper.find('Connect(Carousel)')).toHaveLength(1)
    })
  })

  describe('when modules has a section that is not defined', () => {
    beforeEach(() => {
      wrapper.setProps({
        modules: ['hero', 'testimonials']
      })
    })

    test('then should return only defined sections', () => {
      expect(wrapper.find('section')).toHaveLength(1)
      expect(wrapper.find('Connect(Hero)')).toHaveLength(1)
    })
  })
})
