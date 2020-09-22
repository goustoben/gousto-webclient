import React from 'react'
import { shallow } from 'enzyme'
import { AppStoreLinks } from '../AppStoreLinks'

describe('<AppStoreLinks />', () => {
  let wrapper
  const onClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <AppStoreLinks
        appStoreId="test-app-store-id"
        playStoreId="test-play-store-id"
        onClick={onClick}
      />
    )
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
