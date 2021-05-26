import React from 'react'
import { shallow, mount } from 'enzyme'
import { ScrollCarousel } from '../ScrollCarousel'
import { useDebouncedCallback } from '../useDebouncedCallback'

jest.mock('../useDebouncedCallback', () => ({
  useDebouncedCallback: jest.fn(() => () => {}),
}))

const stepSizePx = 256

describe('ScrollCarousel', () => {
  let wrapper
  const trackScrollOneStep = jest.fn()

  describe('when rendered', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ScrollCarousel stepSizePx={stepSizePx} trackScrollOneStep={trackScrollOneStep}>
          test recipe cards
        </ScrollCarousel>
      )
    })

    test('renders correctly', () => {
      expect(wrapper.find('.scrollCarousel').prop('children')).toEqual('test recipe cards')
      expect(wrapper.find('ArrowButton')).toHaveLength(2)
    })
  })

  describe('when mounted with effects invoked', () => {
    const scrollTo = jest.fn()
    const scroll = jest.fn()

    beforeEach(() => {
      global.HTMLDivElement.prototype.scrollTo = scrollTo
      global.HTMLDivElement.prototype.scroll = scroll
      wrapper = mount(
        <ScrollCarousel stepSizePx={stepSizePx} trackScrollOneStep={trackScrollOneStep}>
          test recipe cards
        </ScrollCarousel>
      )
    })

    test('then should reset scroll position', () => {
      expect(scrollTo).toHaveBeenCalledWith(0, 0)
    })

    describe('when an arrow button is clicked', () => {
      describe('left', () => {
        beforeEach(() => {
          wrapper.find('ArrowButton').at(0).simulate('click')
        })

        test('then it should scroll one step left and track it', () => {
          expect(scroll).toHaveBeenCalledWith({
            behavior: 'smooth',
            left: -stepSizePx,
          })
          expect(trackScrollOneStep).toHaveBeenCalledWith('left')
        })
      })

      describe('right', () => {
        beforeEach(() => {
          wrapper.find('ArrowButton').at(1).simulate('click')
        })

        test('then it should scroll one step right and track it', () => {
          expect(scroll).toHaveBeenCalledWith({
            behavior: 'smooth',
            left: stepSizePx,
          })
          expect(trackScrollOneStep).toHaveBeenCalledWith('right')
        })
      })
    })
  })

  describe('when updateArrowsVisibility is called', () => {
    const mockRef = {
      current: {
        scrollTo: jest.fn(),
        scroll: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    }

    beforeEach(() => {
      jest.spyOn(React, 'useRef').mockImplementation(() => mockRef)

      useDebouncedCallback.mockImplementationOnce((f) => {
        f()
      })
    })

    test('then it does not fail', () => {
      expect(() => {
        shallow(
          <ScrollCarousel stepSizePx={stepSizePx} trackScrollOneStep={trackScrollOneStep}>
            test recipe cards
          </ScrollCarousel>
        )
      }).not.toThrow()
    })
  })
})
