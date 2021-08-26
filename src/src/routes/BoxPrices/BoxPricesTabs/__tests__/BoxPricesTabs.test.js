import React from 'react'
import { shallow } from 'enzyme'
import { BoxPricesTabs } from '../BoxPricesTabs'

describe('BoxPricesTabs', () => {
  let wrapper

  const setActiveIndex = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <BoxPricesTabs
        labels={['Regular box', 'Large box']}
        activeIndex={0}
        setActiveIndex={setActiveIndex}
      />
    )
  })

  test('renders correctly', () => {
    const tabButtons = wrapper.find('TabButton')
    expect(tabButtons).toHaveLength(2)

    expect(tabButtons.at(0).props()).toMatchObject({ text: 'Regular box', isActive: true })
    expect(tabButtons.at(1).props()).toMatchObject({ text: 'Large box', isActive: false })
  })

  describe('when a tab button is clicked', () => {
    beforeEach(() => {
      wrapper.find('TabButton').at(1).simulate('click')
    })

    test('then it should invoke the callback', () => {
      expect(setActiveIndex).toHaveBeenCalledWith(1)
    })
  })
})
