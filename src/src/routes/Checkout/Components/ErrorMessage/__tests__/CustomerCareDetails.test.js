import React from 'react'
import { shallow } from 'enzyme'
import { CustomerCareDetails } from '../CustomerCareDetails'

describe('given CustomerCareDetails', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CustomerCareDetails />)
  })

  test('then it should render correctly', () => {
    expect(wrapper.find('.customerCarePart')).toHaveLength(2)

    const phonePart = wrapper.find('.customerCarePart').at(0)
    expect(phonePart.find('Svg').prop('fileName')).toBe('icon-phone')
    expect(phonePart.find('span').prop('children')).toBe('020 3011 1002')

    const emailPart = wrapper.find('.customerCarePart').at(1)
    expect(emailPart.find('Svg').prop('fileName')).toBe('icon-details-email')
    expect(emailPart.find('span').prop('children')).toBe('info@gousto.co.uk')
  })
})
