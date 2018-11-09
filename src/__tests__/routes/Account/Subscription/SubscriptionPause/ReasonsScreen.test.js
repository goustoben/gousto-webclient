import React from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import { shallow } from 'enzyme'
import ReasonsScreen from 'routes/Account/Subscription/SubscriptionPause/ReasonsScreen/ReasonsScreen'
import { Cancel } from 'containers/SubscriptionPause/callsToAction'

describe('ReasonsScreen', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<ReasonsScreen />)
    })

    test('should render a <div>', () => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should render 1 <span> with correct label per reason', () => {
      const reasons = Immutable.fromJS({
        1: { id: '1', label: 'Label 1' },
        2: { id: '2', label: 'Label 2' },
      })

      wrapper = shallow(<ReasonsScreen reasons={reasons} />)

      expect(wrapper.find('span').length).toEqual(2)
      expect(
        wrapper
          .find('span')
          .at(0)
          .text(),
      ).toEqual('Label 1')
      expect(
        wrapper
          .find('span')
          .at(1)
          .text(),
      ).toEqual('Label 2')
    })

    test('should render a <Cancel>', () => {
      expect(wrapper.find(Cancel).length).toEqual(1)
    })
  })
})
