import React from 'react'
import { shallow } from 'enzyme'

import HomeSections from 'routes/Home/HomeSections'

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
      expect(wrapper.find('Connect(Hero)')).toHaveLength(1)
      expect(wrapper.find('Connect(Carousel)')).toHaveLength(1)
      expect(wrapper.find('Connect(Testimonials)')).toHaveLength(1)
      expect(wrapper.find('HowItWorks')).toHaveLength(1)
      expect(wrapper.find('Subscription')).toHaveLength(1)
      expect(wrapper.find('Connect(InYourBox)')).toHaveLength(1)
      expect(wrapper.find('TestedLoved')).toHaveLength(1)
      expect(wrapper.find('EmailForm')).toHaveLength(1)
    })
  })

  describe('when modules prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({
        modules: ['hero', 'recipes']
      })
    })

    test('then should render only specified modules', () => {
      expect(wrapper.find('Connect(Hero)')).toHaveLength(1)
      expect(wrapper.find('Connect(Carousel)')).toHaveLength(1)
      expect(wrapper.find('Connect(Testimonials)')).toHaveLength(0)
      expect(wrapper.find('HowItWorks')).toHaveLength(0)
      expect(wrapper.find('Subscription')).toHaveLength(0)
      expect(wrapper.find('Connect(InYourBox)')).toHaveLength(0)
      expect(wrapper.find('TestedLoved')).toHaveLength(0)
      expect(wrapper.find('EmailForm')).toHaveLength(0)
    })
  })

  describe('when isHomePageRedesignEnabled is enabled', () => {
    beforeEach(() => {
      wrapper.setProps({
        isHomePageRedesignEnabled: true,
        modules: ['hero','trustPilot', 'whyChooseGousto']
      })
    })

    test('then should render Hero2 component', () => {
      expect(wrapper.find('Hero2')).toBeDefined()
      expect(wrapper.find('Hero')).toHaveLength(0)
    })

    test('then should render 3 specified modules', () => {
      expect(wrapper.find('section')).toHaveLength(3)
      expect(wrapper.find('Hero2')).toBeDefined()
      expect(wrapper.find('TrustPilot')).toBeDefined()
      expect(wrapper.find('WhyChooseGousto')).toBeDefined()
    })

    describe('and there is no such module to render', () => {
      beforeEach(() => {
        wrapper.setProps({
          modules: ['test']
        })
      })

      test('then should return an empty span without children', () => {
        expect(wrapper.find('span').children()).toHaveLength(0)
      })
    })
  })

  describe('when isHomePageRedesignEnabled is disabled', () => {
    beforeEach(() => {
      wrapper.setProps({
        isHomePageRedesignEnabled: false
      })
    })

    test('then should render Hero2 component', () => {
      expect(wrapper.find('Hero2')).toBeDefined()
      expect(wrapper.find('Hero')).toHaveLength(0)
    })

    test('then should render 8 default modules wrapped up with span', () => {
      expect(wrapper.find('span').first().children()).toHaveLength(8)
    })
  })
})
