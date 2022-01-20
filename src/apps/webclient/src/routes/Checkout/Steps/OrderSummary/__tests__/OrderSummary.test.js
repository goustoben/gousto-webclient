import React from 'react'
import { shallow } from 'enzyme'
import { OrderSummary } from '../OrderSummary'

describe('OrderSummary', () => {
  let wrapper
  const onStepChange = jest.fn()
  const props = {
    onStepChange,
  }

  beforeEach(() => {
    wrapper = shallow(<OrderSummary {...props} />)
  })

  test('should render OrderSummary component', () => {
    expect(wrapper).toBeDefined()
  })
})
