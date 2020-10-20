import React from 'react'
import { shallow } from 'enzyme'

import { ModalContentContainer } from '../ModalContentContainer'

jest.mock('selectors/features', () => ({
  getIsMultiSkipEnabled: () => true
}))

const mockContext = {
  context: {
    store: {
      getState: jest.fn(),
      dispatch: jest.fn(),
      subscribe: jest.fn()
    }
  }
}

let wrapper

describe('Given ModalContentContainer is rendered', () => {
  beforeEach(() => {
    wrapper = shallow(<ModalContentContainer />, mockContext)
  })

  test('Then the expected value for isMultiSkipEnabled is passed', () => {
    expect(wrapper.find('ModalContent').prop('isMultiSkipEnabled')).toEqual(true)
  })
})
