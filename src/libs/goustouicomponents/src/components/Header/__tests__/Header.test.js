import React from 'react'
import { mount } from 'enzyme'
import { routes } from 'gousto-config'
import { Header, NAVIGATION } from '../Header.logic'

describe('Header', () => {
  const { goustoWebclient } = routes
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Header isAuthenticated={false} />)
  })

  test('renders without crashing', () => {})

  test('has isExtendedNavigationVisible state set to false', () => {
    expect(wrapper.state('isExtendedNavigationVisible')).toBe(false)
  })

  test('NAVIGATION.LOGGED_OUT_ITEMS has only valid entries', () => {
    NAVIGATION.LOGGED_OUT_ITEMS.forEach((item) => {
      expect(goustoWebclient[item]).not.toBeUndefined()
      expect(goustoWebclient[item].url).not.toBeUndefined()
      expect(goustoWebclient[item].label).not.toBeUndefined()
    })
  })

  test('NAVIGATION.LOGGED_IN_ITEMS has only valid entries', () => {
    NAVIGATION.LOGGED_IN_ITEMS.forEach((item) => {
      expect(goustoWebclient[item]).not.toBeUndefined()
      expect(goustoWebclient[item].url).not.toBeUndefined()
      expect(goustoWebclient[item].label).not.toBeUndefined()
    })
  })

  test('NAVIGATION.LOGGED_OUT_ITEMS_EXTENDED has only valid entries', () => {
    const ITEMS = Object.keys(NAVIGATION.LOGGED_OUT_ITEMS_EXTENDED)

    ITEMS.forEach((item) => {
      expect(goustoWebclient[item]).not.toBeUndefined()
      expect(goustoWebclient[item].url).not.toBeUndefined()
      expect(goustoWebclient[item].label).not.toBeUndefined()

      const SUBITEMS = NAVIGATION.LOGGED_OUT_ITEMS_EXTENDED[item]

      SUBITEMS.forEach((subItem) => {
        expect(goustoWebclient[subItem]).not.toBeUndefined()
        expect(goustoWebclient[subItem].url).not.toBeUndefined()
        expect(goustoWebclient[subItem].label).not.toBeUndefined()
      })
    })
  })

  test('NAVIGATION.LOGGED_IN_ITEMS_EXTENDED has only valid entries', () => {
    const ITEMS = Object.keys(NAVIGATION.LOGGED_IN_ITEMS_EXTENDED)

    ITEMS.forEach((item) => {
      expect(goustoWebclient[item]).not.toBeUndefined()
      expect(goustoWebclient[item].url).not.toBeUndefined()
      expect(goustoWebclient[item].label).not.toBeUndefined()

      const SUBITEMS = NAVIGATION.LOGGED_IN_ITEMS_EXTENDED[item]

      SUBITEMS.forEach((subItem) => {
        expect(goustoWebclient[subItem]).not.toBeUndefined()
        expect(goustoWebclient[subItem].url).not.toBeUndefined()
        expect(goustoWebclient[subItem].label).not.toBeUndefined()
      })
    })
  })

  describe('when isExtendedNavigationVisible state is false', () => {
    beforeEach(() => {
      wrapper.setState({ isExtendedNavigationVisible: false })
    })

    test('the navExtendedOpenCTA does not have the isExtended class', () => {
      expect(wrapper.find('.navExtendedOpenCTA').hasClass('isExtended')).toBe(false)
    })

    describe('and the navExtendedOpenCTA button is clicked', () => {
      beforeEach(() => {
        wrapper.find('.navExtendedOpenCTA').simulate('click')
      })

      test('the navExtendedOpenCTA has the isExtended class', () => {
        expect(wrapper.find('.navExtendedOpenCTA').hasClass('isExtended')).toBe(true)
      })

      test('isExtendedNavigationVisible state is set to true', () => {
        expect(wrapper.state('isExtendedNavigationVisible')).toBe(true)
      })

      describe('and the navExtendedOpenCTA button is clicked again', () => {
        beforeEach(() => {
          wrapper.find('.navExtendedOpenCTA').simulate('click')
        })

        test('isExtendedNavigationVisible state is set to false', () => {
          expect(wrapper.state('isExtendedNavigationVisible')).toBe(false)
        })

        test('the navExtendedOpenCTA does not have the isExtended class', () => {
          expect(wrapper.find('.navExtendedOpenCTA').hasClass('isExtended')).toBe(false)
        })
      })
    })

    describe('when the isAuthenticated prop is set to false', () => {
      beforeEach(() => {
        wrapper.setProps({ isAuthenticated: false })
      })

      test('HeaderNavList is being passed the logged out menu items', () => {
        expect(wrapper.find('HeaderNavList').prop('items')).toEqual(wrapper.instance().convertMenuItemsToRoute(NAVIGATION.LOGGED_OUT_ITEMS))
      })

      test('HeaderNavExtendedList is being passed the logged out menu items', () => {
        expect(wrapper.find('HeaderNavExtendedList').prop('items')).toEqual(wrapper.instance().convertExtendedItemsToRoute(NAVIGATION.LOGGED_OUT_ITEMS_EXTENDED))
      })
    })

    describe('when the isAuthenticated prop is set to true', () => {
      beforeEach(() => {
        wrapper.setProps({ isAuthenticated: true })
      })

      test('HeaderNavList is being passed the logged in menu items', () => {
        expect(wrapper.find('HeaderNavList').prop('items')).toEqual(wrapper.instance().convertMenuItemsToRoute(NAVIGATION.LOGGED_IN_ITEMS))
      })

      test('HeaderNavExtendedList is being passed the logged in items', () => {
        expect(wrapper.find('HeaderNavExtendedList').prop('items')).toEqual(wrapper.instance().convertExtendedItemsToRoute(NAVIGATION.LOGGED_IN_ITEMS_EXTENDED))
      })
    })

    describe('when the isNavEnabled prop is set to true', () => {
      beforeEach(() => {
        wrapper.setProps({ isNavEnabled: true, isAuthenticated: false })
      })

      test('HeaderNavList is being rendered', () => {
        expect(wrapper.find('HeaderNavList').exists()).toBeTruthy()
      })

      test('NavExtendedOpenCTA is being rendered', () => {
        expect(wrapper.find('.navExtendedOpenCTA').exists()).toBeTruthy()
      })

      test('HeaderNavExtendedList is being rendered', () => {
        expect(wrapper.find('HeaderNavExtendedList').exists()).toBeTruthy()
      })

      describe.each([
        ['hasDataTracking', true],
        ['hasDataTracking', false],
        ['isAuthenticated', true],
        ['isAuthenticated', false],
      ])('when %s prop is %s', (prop, propValue) => {
        beforeEach(() => {
          wrapper.setProps({ [prop]: propValue })
        })

        test.each([
          ['HeaderNavList'],
          ['HeaderNavExtendedList'],
        ])('it passes it to the component %s', (subComponent) => {
          expect(wrapper.find(subComponent).prop(prop)).toBe(propValue)
        })
      })
    })

    describe('when the isNavEnabled prop is set to false', () => {
      beforeEach(() => {
        wrapper.setProps({ isNavEnabled: false, isAuthenticated: false })
      })

      test('HeaderNavList is NOT being rendered', () => {
        expect(wrapper.find('HeaderNavList').exists()).toBeFalsy()
      })

      test('NavExtendedOpenCTA is NOT being rendered', () => {
        expect(wrapper.find('.navExtendedOpenCTA').exists()).toBeFalsy()
      })

      test('HeaderNavExtendedList is NOT being rendered', () => {
        expect(wrapper.find('HeaderNavExtendedList').exists()).toBeFalsy()
      })
    })
  })

  describe('convertMenuItemsToRoute', () => {
    test('extracts from routes the object with the key passed', () => {
      expect(wrapper.instance().convertMenuItemsToRoute(['home', 'boxPrices'])).toEqual([goustoWebclient.home, goustoWebclient.boxPrices])
    })
  })

  describe('convertExtendedItemsToRoute', () => {
    test('extracts from routes the object with the key passed', () => {
      const INPUT = { home: [], boxPrices: [] }
      const OUTPUT = [goustoWebclient.home, goustoWebclient.boxPrices]

      expect(wrapper.instance().convertExtendedItemsToRoute(INPUT)).toEqual(OUTPUT)
    })

    describe('and the items have subItems', () => {
      const INPUT = {
        home: ['boxPrices', 'chooseRecipes'],
        boxPrices: ['sustainability'],
      }
      const OUTPUT = [
        {
          ...goustoWebclient.home,
          subItems: [goustoWebclient.boxPrices, goustoWebclient.chooseRecipes],
        },
        {
          ...goustoWebclient.boxPrices,
          subItems: [goustoWebclient.sustainability],
        },
      ]

      test('resolves them as subItems of the partent item', () => {
        expect(wrapper.instance().convertExtendedItemsToRoute(INPUT)).toEqual(OUTPUT)
      })
    })
  })
})
