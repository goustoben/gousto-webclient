import React from 'react'

import { shallow } from 'enzyme'
import { Button, Segment } from 'goustouicomponents'

import { useBasket } from 'routes/Menu/domains/basket'

import { BrowseCTAButton } from './BrowseCTAButton'

jest.mock('routes/Menu/domains/basket')
const useBasketMock = useBasket

describe('BrowseCTAButton', () => {
  let boxDetailsVisibilityChange
  let menuBrowseCTAVisibilityChange
  const view = 'desktop'

  beforeEach(() => {
    boxDetailsVisibilityChange = jest.fn()
    menuBrowseCTAVisibilityChange = jest.fn()

    useBasketMock.mockReturnValue({
      removeRecipe: jest.fn(),
    })
  })

  test('should return a Button', () => {
    const wrapper = shallow(
      <BrowseCTAButton
        boxSummaryShow={false}
        boxDetailsVisibilityChange={boxDetailsVisibilityChange}
        menuBrowseCTAVisibilityChange={menuBrowseCTAVisibilityChange}
        view={view}
      />,
    )

    expect(wrapper.type()).toEqual(Button)
  })

  describe('when box summary is not shown', () => {
    test('should call boxDetailsVisibilityChange & menuBrowseCTAVisibilityChange', () => {
      const wrapper = shallow(
        <BrowseCTAButton
          boxSummaryShow={false}
          boxDetailsVisibilityChange={boxDetailsVisibilityChange}
          menuBrowseCTAVisibilityChange={menuBrowseCTAVisibilityChange}
          view={view}
        />,
      )
      wrapper.find(Segment).simulate('click')

      expect(menuBrowseCTAVisibilityChange).toHaveBeenCalledTimes(1)
      expect(menuBrowseCTAVisibilityChange).toHaveBeenCalledWith(false)

      expect(boxDetailsVisibilityChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('when box summary is shown', () => {
    test('should call boxDetailsVisibilityChange with false', () => {
      const wrapper = shallow(
        <BrowseCTAButton
          boxSummaryShow
          boxDetailsVisibilityChange={boxDetailsVisibilityChange}
          menuBrowseCTAVisibilityChange={menuBrowseCTAVisibilityChange}
          view={view}
        />,
      )
      wrapper.find(Segment).simulate('click')

      expect(menuBrowseCTAVisibilityChange).not.toHaveBeenCalled()

      expect(boxDetailsVisibilityChange).toHaveBeenCalledTimes(1)
    })
  })
})
