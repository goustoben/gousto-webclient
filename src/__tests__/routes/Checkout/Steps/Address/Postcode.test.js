import React from 'react'
import { shallow } from 'enzyme'
import { Field } from 'redux-form'
import Immutable from 'immutable' /* eslint-disable new-cap */
import Postcode from 'routes/Checkout/Components/Address/Postcode'

describe('Postcode', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Postcode />)
  })

  describe('rendering', () => {
    test('should render 1 <Field> component by default', () => {
      expect(wrapper.find(Field).length).toEqual(1)
    })
  })

  describe.skip('sensitive data masking', function() {
    test('all <Field /> component(s) should have prop "mask"', () => {
      wrapper = shallow(
				<Postcode
				  addresses={Immutable.fromJS([
				    { id: 1, labels: [] },
				    { id: 2, labels: [] },
				  ])}
				/>,
      )
      expect(
        wrapper
          .find(Field)
          .at(0)
          .prop('mask'),
      ).toEqual(true)
    })
  })
})
