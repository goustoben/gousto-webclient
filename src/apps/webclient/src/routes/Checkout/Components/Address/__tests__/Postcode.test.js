import React from 'react'
import { shallow } from 'enzyme'
import { Field } from 'redux-form'
import Immutable from 'immutable'
import { Postcode } from 'routes/Checkout/Components/Address/Postcode'

describe('Postcode', () => {
  let wrapper
  const onPostcodeLookup = jest.fn()
  const postcodeTemp = 'W3 7UP'

  beforeEach(() => {
    wrapper = shallow(<Postcode onPostcodeLookup={onPostcodeLookup} postcodeTemp={postcodeTemp} />)
  })

  describe('When Postcode component is mounted', () => {
    test('Then should render input for postcode', () => {
      expect(wrapper.find(Field)).toHaveLength(2)
    })

    test('Then should render Find Address CTA', () => {
      expect(wrapper.find('[data-testing="checkoutFindAddressButton"]')).toBeDefined()
    })
  })

  describe('when find address button is clicked', () => {
    beforeEach(() => {
      wrapper.find('[testingSelector="checkoutFindAddressButton"]').simulate('click')
    })

    test('then onPostcodeLookup should be called with proper parameter', () => {
      expect(onPostcodeLookup).toHaveBeenCalledWith(postcodeTemp)
    })
  })

  describe('sensitive data masking', () => {
    test('all <Field /> component(s) should have prop "mask"', () => {
      wrapper = shallow(
        <Postcode
          addresses={Immutable.fromJS([
            { id: 1, labels: [] },
            { id: 2, labels: [] },
          ])}
        />
      )
      expect(wrapper.find(Field).at(0).prop('mask')).toEqual(true)
    })
  })
})
