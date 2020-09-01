import React from 'react'
import { shallow } from 'enzyme'
import { LoginMobile } from '../LoginMobile'

describe('<LoginMobile />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <LoginMobile showAppAwareness={false}>
        <div data-testing="child" />
      </LoginMobile>
    )
  })

  test('children is rendered', () => {
    expect(wrapper.find('[data-testing="child"]').length).toBe(1)
  })

  test('<AppStoreLinks /> is not rendered', () => {
    expect(wrapper.find('AppStoreLinks').length).toBe(0)
  })

  test('Heading is not rendered', () => {
    expect(wrapper.find('Heading').length).toBe(0)
  })

  describe('when showAppAwareness feature is turned on', () => {
    beforeEach(() => {
      wrapper = shallow(
        <LoginMobile showAppAwareness>
          <div />
        </LoginMobile>
      )
    })

    test('<AppStoreLinks /> is rendered', () => {
      expect(wrapper.find('AppStoreLinks').length).toBe(1)
    })

    test('Heading is rendered', () => {
      expect(wrapper.find('HeadingWithSeparator').length).toBe(1)
    })

    describe('and when login is opened through help', () => {
      beforeEach(() => {
        wrapper = shallow(
          <LoginMobile showAppAwareness isHelpPreLoginOpen>
            <div />
          </LoginMobile>
        )
      })

      test('<AppStoreLinks /> is not rendered', () => {
        expect(wrapper.find('AppStoreLinks').length).toBe(0)
      })
    })
  })
})
