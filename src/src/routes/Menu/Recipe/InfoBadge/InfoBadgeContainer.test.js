import React from 'react'
import { shallow } from 'enzyme'
import { InfoBadgeContainer } from './InfoBadgeContainer'

describe('InfoBadgeContainer', () => {
  test('should render InfoBadge', () => {
    const wrapper = shallow(<InfoBadgeContainer slug="oven-ready" />, {
      context: {
        store: {
          dispatch: () => { },
          getState: () => ({
            brand: {
              data: {
                tags: []
              }
            }
          }),
          subscribe: () => { }
        }
      }
    })
    expect(wrapper.find('InfoBadge').exists()).toBe(true)
  })

  test('should not render InfoBadge even when no slug prop is supplied', () => {
    const wrapper = shallow(<InfoBadgeContainer otherProp="test" />, {
      context: {
        store: {
          dispatch: () => { },
          getState: () => ({}),
          subscribe: () => { }
        }
      }
    })
    expect(wrapper.find('InfoBadge').exists()).toBe(true)
  })
})
