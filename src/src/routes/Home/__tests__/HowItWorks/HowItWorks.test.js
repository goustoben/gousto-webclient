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
  const header = <div>header</div>
  const description = <div>description</div>

  beforeEach(() => {
    wrapper = shallow(<HowItWorks header={header} description={description} />)
  })

  describe('rendering', () => {
    test('should return a div with no props', () => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should render 1 <Guide> component(s)', () => {
      expect(wrapper.find(Guide).length).toEqual(1)
    })
  })

  describe('when steps props is not passed by default', () => {
    test('should have default steps from config', () => {
      expect(wrapper.find(Guide).prop('steps')).toHaveLength(3)
    })
  })

  describe('when variant props is not passed', () => {
    beforeEach(() => {
      wrapper.setProps({
        steps,
      })
    })

    test('then should call steps with proper parameter', () => {
      expect(steps).toHaveBeenCalledWith('default')
    })
  })

  describe('when variant prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({
        steps,
        variant: 'rebrand',
      })
    })

    test('then should call steps with proper parameter', () => {
      expect(steps).toHaveBeenCalledWith('rebrand')
    })
  })
})
