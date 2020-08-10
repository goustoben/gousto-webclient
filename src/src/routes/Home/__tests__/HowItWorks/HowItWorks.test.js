import React from 'react'
import { shallow } from 'enzyme'

import Guide from 'components/Guide'

import { HowItWorks } from 'routes/Home/HowItWorks/HowItWorks'

const steps = jest.fn().mockReturnValue([
  {
    image: 'media/photos/quality.jpg',
    title: 'Quality',
    description: 'Fresh ingredients, so you feel confident about every bite.',
  },
  {
    image: 'media/photos/simplicity.jpg',
    title: 'Simplicity',
    description: 'Foolproof recipes, so anyone can cook a delicious meal. (Really.)',
  },
  {
    image: 'media/photos/variety.jpg',
    title: 'Variety',
    description: 'Choose what you like: wholesome, adventurous, vegetarian, meat, fish.',
  },
])

describe('HowItWorks', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<HowItWorks />)
  })

  describe('rendering', () => {
    test('should return a div with no props', () => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should render 1 <Guide> component(s)', () => {
      expect(wrapper.find(Guide).length).toEqual(1)
    })
  })

  test('should have default steps from config', () => {
    wrapper = shallow(<HowItWorks steps={steps} />)

    expect(wrapper.find(Guide).prop('steps')).toHaveLength(3)
  })

  test('should request steps by variant', () => {
    wrapper = shallow(<HowItWorks steps={steps} />)
    expect(steps).toHaveBeenCalledWith('default', false)

    wrapper = shallow(<HowItWorks steps={steps} variant="rebrand" />)
    expect(steps).toHaveBeenCalledWith('rebrand', false)
  })

  describe('homepageRedesign', () => {
    describe('Given home page redesign is disabled', () => {
      describe('When isHomePageRedesignEnabled set to false/default', () => {
        beforeEach(() => {
          wrapper.setProps({ isHomePageRedesignEnabled: false })
        })
        test('Then HowItWorks should be rendered without homepageRedesign class attribute', () => {
          expect(wrapper.hasClass('homepageRedesign')).toBeFalsy()
        })
      })
    })

    describe('Given home page redesign is enabled', () => {
      describe('When isHomePageRedesignEnabled set to true', () => {
        beforeEach(() => {
          wrapper.setProps({ isHomePageRedesignEnabled: true })
        })
        test('Then HowItWorks should be rendered with homepageRedesign class attribute', () => {
          expect(wrapper.hasClass('homepageRedesign')).toBeTruthy()
        })
      })
    })
  })
})
