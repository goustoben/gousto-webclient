import React from 'react'
import { shallow } from 'enzyme'
import { AppStoreLinks } from '../AppStoreLinks'

describe('<AppStoreLinks />', () => {
  let wrapper
  const onClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<AppStoreLinks appStoreId="12345" playStoreId="67890" onClick={onClick} />)
  })

  test('should inject the specified app store IDs into the markup', () => {
    expect(wrapper.type()).toEqual('div')

    expect(wrapper.find('a').get(0).props.href.includes('id=67890')).toBe(true)
    expect(wrapper.find('a').get(1).props.href.includes('id12345')).toBe(true)
  })

  describe('when clicking on play store button', () => {
    beforeEach(() => {
      wrapper.find('a').at(0).simulate('click')
    })

    test('onClick is called passing the play store as reference', () => {
      expect(onClick).toHaveBeenCalledWith('playStore')
    })
  })

  describe('when clicking on app store button', () => {
    beforeEach(() => {
      wrapper.find('a').at(1).simulate('click')
    })

    test('onClick is called passing the app store as reference', () => {
      expect(onClick).toHaveBeenCalledWith('appStore')
    })
  })
})
