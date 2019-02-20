import React from 'react'
import { shallow, mount } from 'enzyme'

import {
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode,
} from 'react-dom'

import { SpotlightWrapper } from 'Spotlight/SpotlightWrapper'

jest.mock('react-dom', () => ({
  unstable_renderSubtreeIntoContainer: jest.fn(),
  unmountComponentAtNode: jest.fn(),
}))

describe('SpotlightWrapper', () => {
  let wrapper
  const spotlightWrapperHtml = '<div class="__goustoSpotlight__"></div>'

  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    wrapper = null
    unstable_renderSubtreeIntoContainer.mockClear()
    unmountComponentAtNode.mockClear()
  })

  describe('rendering', () => {
    test('should render nothing by default', () => {
      wrapper = shallow(<SpotlightWrapper />)

      expect(wrapper.html()).toBeNull()
    })
  })

  describe('lifecycle', () => {
    beforeEach(() => {
      wrapper = mount(
        <SpotlightWrapper />
      )
    })

    afterEach(() => {
      wrapper.unmount()
    })

    describe('componentDidMount', () => {
      test('should call renderWrapper', () => {
        expect(document.body.innerHTML).toEqual(spotlightWrapperHtml)
      })
    })

    describe('componentWillUnmount', () => {
      test('should call close', () => {
        expect(wrapper.instance().node).toBeTruthy()

        wrapper.unmount()

        expect(document.body.innerHTML).not.toEqual(spotlightWrapperHtml)
      })
    })
  })

  describe('renderWrapper', () => {
    beforeEach(() => {
      wrapper = mount(
        <SpotlightWrapper />
      )
    })

    afterEach(() => {
      wrapper.unmount()
    })

    describe('when node does not exist', () => {
      test("should mount children and add render subtree into DOM", () => {
        expect(document.body.innerHTML).toEqual(spotlightWrapperHtml)
        expect(unstable_renderSubtreeIntoContainer).toHaveBeenCalled()
      })
    })

    describe('when node exists', () => {
      test("shouldn't mount component", () => {
        wrapper.instance().renderWrapper()

        expect(document.body.innerHTML).toEqual(spotlightWrapperHtml)
        expect(unstable_renderSubtreeIntoContainer).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('close', () => {
    beforeEach(() => {
      wrapper = mount(
        <SpotlightWrapper />
      )
    })

    afterEach(() => {
      wrapper.unmount()
    })

    describe('when node does not exist', () => {
      test("shouldn't unmount component", () => {
        wrapper.instance().node = null
        wrapper.unmount()

        expect(unmountComponentAtNode).not.toHaveBeenCalled()
      })
    })

    describe('when node exists', () => {
      test('should unmount component and remove node, subtree from DOM', () => {
        wrapper.unmount()

        expect(unmountComponentAtNode).toHaveBeenCalled()
      })
    })
  })
})
