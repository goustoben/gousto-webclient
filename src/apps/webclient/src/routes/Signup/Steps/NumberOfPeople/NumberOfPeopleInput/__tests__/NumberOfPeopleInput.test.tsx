import React from 'react'

import { mount } from 'enzyme'

import { NumberOfPeopleInput } from 'routes/Signup/Steps/NumberOfPeople/NumberOfPeopleInput/NumberOfPeopleInput'

describe('Given <NumberOfPeopleInput /> component', () => {
  const onNumberOfPeopleChange = jest.fn()
  const defaultProps = {
    onNumberOfPeopleChange,
    numberOfPeople: 2,
  }
  describe('when rendered', () => {
    test('then component should not crash', () => {
      expect(() => {
        mount(<NumberOfPeopleInput {...defaultProps} />)
      }).not.toThrow()
    })
    describe('when amountOfPeople is 2', () => {
      test('then should render decrement and increment buttons', () => {
        const wrapper = mount(<NumberOfPeopleInput {...defaultProps} numberOfPeople={3} />)
        const buttons = wrapper.find('.changeNumberButton').hostNodes()
        expect(buttons.length).toBe(2)
      })
    })
    describe('when amountOfPeople is 6', () => {
      test('then should not render increment button', () => {
        const wrapper = mount(<NumberOfPeopleInput {...defaultProps} numberOfPeople={6} />)
        const buttons = wrapper.find('.changeNumberButton').hostNodes()
        expect(buttons.length).toBe(1)
      })
    })
    describe('when amountOfPeople is 1', () => {
      test('then should not render decrement button', () => {
        const wrapper = mount(<NumberOfPeopleInput {...defaultProps} numberOfPeople={1} />)
        const buttons = wrapper.find('.changeNumberButton').hostNodes()
        expect(buttons.length).toBe(1)
      })
      describe('when increment button is clicked', () => {
        test('then should call onNumberOfPeopleChange with numberOfPeople equal to 2', () => {
          const wrapper = mount(<NumberOfPeopleInput {...defaultProps} numberOfPeople={1} />)
          const buttons = wrapper.find('.changeNumberButton').hostNodes()
          buttons.simulate('click')
          expect(onNumberOfPeopleChange).toBeCalledWith(2)
        })
      })
    })
  })
})
