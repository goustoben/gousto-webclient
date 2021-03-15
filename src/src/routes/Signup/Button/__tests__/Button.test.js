import React from 'react'
import { shallow } from 'enzyme'
import { Button } from '../Button'

describe('Button', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Button isLastStep={false} />)
  })

  describe('when the isSellThePropositionEnabled feature is enabled', () => {
    beforeEach(() => {
      wrapper.setProps({
        isSellThePropositionEnabled: true,
      })
    })

    describe('and when it is not the last step', () => {
      test('then the text should be Next', () => {
        expect(wrapper.prop('children')).toBe('Next')
      })
    })

    describe('and when it is the last step', () => {
      beforeEach(() => {
        wrapper.setProps({
          isLastStep: true,
        })
      })

      test('then the text should be Confirm', () => {
        expect(wrapper.prop('children')).toBe('Confirm')
      })
    })
  })
})
