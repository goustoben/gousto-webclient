import { shallow } from 'enzyme'
import React from 'react'

import { Button, Segment } from 'goustouicomponents'
import BrowseCTAButton from '../BrowseCTAButton/BrowseCTAButton'

describe('BrowseCTAButton', () => {
  let boxSummaryShow, boxDetailsVisibilityChange, menuBrowseCTAVisibilityChange
  const view = 'desktop'

  beforeEach(() => {
    boxDetailsVisibilityChange = jest.fn()
    menuBrowseCTAVisibilityChange = jest.fn()
  })

  test('should return a Button', () => {
    const wrapper = shallow(
      <BrowseCTAButton
        boxSummaryShow={false}
        boxDetailsVisibilityChange={boxDetailsVisibilityChange}
        menuBrowseCTAVisibilityChange={menuBrowseCTAVisibilityChange}
        view={view}
      />
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
        />
      )
      wrapper.find(Segment).simulate('click')

      expect(menuBrowseCTAVisibilityChange).toHaveBeenCalledTimes(1)
      expect(menuBrowseCTAVisibilityChange).toHaveBeenCalledWith(false)

      expect(boxDetailsVisibilityChange).toHaveBeenCalledTimes(1)
      expect(boxDetailsVisibilityChange).toHaveBeenCalledWith(true, view)
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
        />
      )
      wrapper.find(Segment).simulate('click')

      expect(menuBrowseCTAVisibilityChange).not.toHaveBeenCalled()

      expect(boxDetailsVisibilityChange).toHaveBeenCalledTimes(1)
      expect(boxDetailsVisibilityChange).toHaveBeenCalledWith(false, '')
    })
  })
})
