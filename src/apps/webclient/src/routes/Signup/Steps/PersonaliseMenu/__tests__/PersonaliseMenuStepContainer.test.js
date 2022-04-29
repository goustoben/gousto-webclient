import React from 'react'
import { shallow } from 'enzyme'
import { PersonaliseMenuStepContainer } from '../PersonaliseMenuStepContainer'

describe('PersonaliseMenuStepContainer', () => {
  let wrapper

  const store = {
    getState: jest.fn(),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<PersonaliseMenuStepContainer store={store} next={jest.fn()} />)
  })

  test('should be rendered properly', () => {
    const expected = {}
    expect(wrapper.find('PersonaliseMenuStep').props()).toEqual(expect.objectContaining(expected))
  })
})
