import React from 'react'
import { shallow } from 'enzyme'
import { CategoryScrollTracker } from './CategoryScrollTracker'

describe('CategoryScrollTracker', () => {
  let wrapper
  const categoryId = '123'
  const categorySlug = '456'
  const trackCategoryScroll = jest.fn()
  const actionType = 'scroll_category'
  const defaultProps = {
    categoryId,
    categorySlug,
    trackCategoryScroll,
    actionType,
  }

  describe('CategoryScrollTracker', () => {
    describe('when without children', () => {
      beforeEach(() => {
        wrapper = shallow(<CategoryScrollTracker {...defaultProps} />)
      })

      test('render null', () => {
        expect(wrapper.type()).toEqual(null)
      })

      describe('when scrolling window', () => {
        const eventMap = {}
        const windowAddEventListener = jest.fn((event, cb) => {
          eventMap[event] = cb
        })
        const windowRemoveEventListener = jest.fn((event, cb) => {
          eventMap[event] = cb
        })

        beforeEach(() => {
          const props = {
            categoryId,
            categorySlug,
            trackCategoryScroll,
            actionType,
          }

          window.addEventListener = windowAddEventListener
          window.removeEventListener = windowRemoveEventListener

          wrapper = shallow(<CategoryScrollTracker {...props} />)
        })

        describe('when mounted', () => {
          test('should add event listener', () => {
            expect(windowAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
          })
        })

        describe('when unmounted', () => {
          test('should remove event listener', () => {
            wrapper.unmount()
            expect(windowRemoveEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
          })
        })

        describe('when scrolling window', () => {
          describe('when 20% with documentElement', () => {
            beforeEach(() => {
              Object.defineProperties(document, {
                documentElement: {
                  value: {
                    scrollHeight: 200,
                    clientHeight: 100,
                    scrollTop: 20,
                  },
                  writable: true,
                },
              })
            })

            test('should set state', () => {
              eventMap.scroll()

              expect(wrapper.state()).toEqual({
                [categoryId]: {
                  20: true
                }
              })
              expect(trackCategoryScroll).toHaveBeenCalledWith({
                actionType,
                categoryId,
                categorySlug,
                scrollDepth: 20,
              })
            })
          })

          describe('when 20% with body', () => {
            beforeEach(() => {
              Object.defineProperties(document, {
                documentElement: {
                  value: {
                    scrollHeight: 200,
                    clientHeight: 100,
                    scrollTop: 20,
                  },
                  writable: true,
                },
                body: {
                  value: {
                    scrollHeight: 200,
                    scrollTop: 20,
                  },
                  writable: true,
                },
              })
            })

            test('should set state', () => {
              eventMap.scroll()

              expect(wrapper.state()).toEqual({
                [categoryId]: {
                  20: true,
                }
              })
              expect(trackCategoryScroll).toHaveBeenCalledWith({
                actionType,
                categoryId,
                categorySlug,
                scrollDepth: 20,
              })
            })
          })

          describe('when 100%', () => {
            beforeEach(() => {
              Object.defineProperties(document, {
                documentElement: {
                  value: {
                    scrollHeight: 200,
                    clientHeight: 100,
                    scrollTop: 100,
                  },
                  writable: true,
                },
              })
            })

            test('should set state', () => {
              eventMap.scroll()

              expect(wrapper.state()).toEqual({
                [categoryId]: {
                  20: true,
                  40: true,
                  60: true,
                  80: true,
                  100: true,
                }
              })
              expect(trackCategoryScroll).toHaveBeenCalledWith({
                actionType,
                categoryId,
                categorySlug,
                scrollDepth: 100,
              })
            })
          })
        })
      })
    })

    describe('when with children', () => {
      beforeEach(() => {
        wrapper = shallow(
          <CategoryScrollTracker {...defaultProps} className="custom-classname">
            <div>Children</div>
          </CategoryScrollTracker>
        )
      })

      test('renders wrapper with className', () => {
        expect(wrapper.find('.custom-classname').length).toEqual(1)
      })

      describe('when scroll direction is vertical', () => {
        describe('when scrolling 20%', () => {
          test('should set state to 20', () => {
            wrapper.find('.categoryScrollContainer').simulate('scroll', {
              target: {
                scrollTop: 20,
                scrollHeight: 200,
                clientHeight: 100,
              }
            })
            expect(wrapper.state()).toEqual(
              {
                [categoryId]: {
                  20: true,
                }
              }
            )
          })
        })

        describe('when scrolling 46%', () => {
          test('should set state to 20 and 40', () => {
            wrapper.find('.categoryScrollContainer').simulate('scroll', {
              target: {
                scrollTop: 46,
                scrollHeight: 200,
                clientHeight: 100,
              }
            })
            expect(wrapper.state()).toEqual(
              {
                [categoryId]: {
                  20: true,
                  40: true,
                }
              }
            )
          })
        })

        describe('when scrolling 0%', () => {
          test('should set state to 0', () => {
            wrapper.find('.categoryScrollContainer').simulate('scroll', {
              target: {
                scrollTop: 0,
                scrollHeight: 200,
                clientHeight: 100,
              }
            })
            expect(wrapper.state()).toEqual(
              {
                [categoryId]: {
                  0: true,
                }
              }
            )
          })
        })
      })

      describe('when scroll direction is horizontal', () => {
        beforeEach(() => {
          wrapper = shallow(
            <CategoryScrollTracker {...defaultProps} scrollDirection="horizontal">
              <div>Children</div>
            </CategoryScrollTracker>
          )
        })

        describe('when scrolling 20%', () => {
          test('should set state to 20', () => {
            wrapper.find('.categoryScrollContainer').simulate('scroll', {
              target: {
                scrollLeft: 20,
                scrollWidth: 200,
                clientWidth: 100,
              }
            })
            expect(wrapper.state()).toEqual(
              {
                [categoryId]: {
                  20: true,
                }
              }
            )
          })
        })
      })
    })
  })
})
