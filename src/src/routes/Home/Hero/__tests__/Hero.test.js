import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import { CTAHomepageContainer } from 'routes/Home/CTA'
import { Hero } from '../Hero'

describe('Hero', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Hero />)
  })

  describe('when Hero component renders', () => {
    test('should include 2 Headings', () => {
      expect(wrapper.find('Heading')).toHaveLength(2)
    })

    test('should include 2 CTAHomepageContainer', () => {
      expect(wrapper.find(CTAHomepageContainer)).toHaveLength(2)
    })

    test('should include 2 Benefits widgets', () => {
      expect(wrapper.find('Benefits')).toHaveLength(2)
    })
  })

  describe('when isSticky is true', () => {
    beforeEach(() => {
      wrapper.setState({
        isSticky: true,
      })
    })

    test('then wrapper should not have element with mobileSticky class', () => {
      expect(wrapper.find('.mobileSticky')).toBeTruthy()
    })
  })

  describe('when isSticky is false', () => {
    beforeEach(() => {
      wrapper.setState({
        isSticky: false,
      })
    })

    test('then wrapper should not have element with mobileSticky class', () => {
      expect(wrapper.find(CTAHomepageContainer).at(1).parent().hasClass('mobileSticky')).toBeFalsy()
    })
  })

  describe('when maxHeight is equal to 0', () => {
    beforeEach(() => {
      wrapper.setState({
        maxHeight: 0,
      })
    })

    test('then sticky container should not have inline styles', () => {
      expect(wrapper.find(CTAHomepageContainer).at(1).parent().prop('style')).toEqual({})
    })
  })

  describe('when maxHeight is equal to 500', () => {
    beforeEach(() => {
      wrapper.setState({
        maxHeight: 500,
      })
    })

    test('then sticky container should have inline styles', () => {
      expect(wrapper.find(CTAHomepageContainer).at(1).parent().prop('style')).toEqual({
        top: '500px',
      })
    })
  })

  describe('CTA', () => {
    const ctaUri = '/hero'

    beforeEach(() => {
      wrapper.setProps({
        ctaUri,
      })
    })

    test('should pass ctaUri and the section correctly', () => {
      const cta = wrapper.find(CTAHomepageContainer).at(0)
      expect(cta.prop('sectionForTracking')).toBe('hero')
      expect(cta.prop('ctaUri')).toBe(ctaUri)
    })
  })

  describe('onScroll', () => {
    const eventMap = {}
    const windowAddEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb
    })
    const windowRemoveEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb
    })

    beforeEach(() => {
      window.addEventListener = windowAddEventListener
      window.removeEventListener = windowRemoveEventListener
      wrapper = shallow(<Hero />)
    })

    describe('when component is mounted', () => {
      test('then should add event listener', () => {
        expect(windowAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
      })
    })

    describe('when component is unmounted', () => {
      beforeEach(() => {
        wrapper.unmount()
      })

      test('then should remove event listener', () => {
        expect(windowRemoveEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
      })
    })

    describe('checkIfLastSection', () => {
      let instance

      beforeEach(() => {
        instance = wrapper.instance()
      })

      describe('when isSticky is false', () => {
        test('then should return 0', () => {
          expect(instance.getStickyContainerHeight(false)).toBeFalsy()
        })
      })

      describe('when isSticky is true', () => {
        const isSticky = true
        const bottom = 500
        const stickyCTA = {
          clientHeight: 150,
        }

        describe('and bottom is greater than window.innerHeight', () => {
          beforeEach(() => {
            Object.defineProperty(window, 'innerHeight', { value: 400 })
          })

          test('then should return 0', () => {
            expect(instance.getStickyContainerHeight(isSticky, bottom, stickyCTA)).toBeFalsy()
          })
        })

        describe('and bottom is less than window.innerHeight', () => {
          beforeEach(() => {
            Object.defineProperty(window, 'innerHeight', { value: 1000 })
          })

          test('then should return 150px', () => {
            expect(instance.getStickyContainerHeight(isSticky, bottom, stickyCTA)).toBe('150px')
          })
        })
      })
    })

    describe('onScroll', () => {
      const initialState = {
        features: Immutable.Map({
          isHomePageRedesignEnabled: Immutable.fromJS({
            value: false,
          }),
        }),
      }
      const store = {
        getState: jest.fn(() => initialState),
        dispatch: jest.fn(),
        subscribe: jest.fn(),
      }
      const stickyCTARef = {
        current: {
          offsetHeight: 150,
        },
      }
      const heroRef = (offsetHeight) => ({
        current: {
          offsetHeight,
          offsetTop: 50,
          parentNode: {
            parentNode: {
              lastChild: {
                getBoundingClientRect: jest.fn().mockReturnValueOnce({ bottom: 150 }),
                style: {
                  marginBottom: '0',
                },
              },
            },
          },
        },
      })

      beforeEach(() => {
        wrapper = mount(
          <Provider store={store}>
            <Hero />
          </Provider>
        )
      })

      describe('when window scroll is equal to offsetTop', () => {
        beforeEach(() => {
          Object.defineProperty(window, 'pageYOffset', { value: 100 })
          eventMap.scroll({ hero: heroRef(100), CTA: stickyCTARef })
        })

        test('then should return isSticky = false', () => {
          expect(wrapper.find(Hero).state('isSticky')).toBeFalsy()
        })
      })

      describe('when window scroll is greater than offsetTop', () => {
        beforeEach(() => {
          Object.defineProperty(window, 'pageYOffset', { value: 1700 })
          eventMap.scroll({ hero: heroRef(500), CTA: stickyCTARef })
        })

        test('then should return isSticky = true', () => {
          expect(wrapper.find(Hero).state('isSticky')).toBeTruthy()
        })
      })
    })
  })
})
