import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import ModalPanel from 'Modal/ModalPanel'
import css from 'routes/Account/Subscription/SubscriptionPause/Screen/Screen.css'
import Screen from 'routes/Account/Subscription/SubscriptionPause/Screen/Screen'
import ReasonsScreen from 'routes/Account/Subscription/SubscriptionPause/ReasonsScreen'
import GenericScreen from 'routes/Account/Subscription/SubscriptionPause/GenericScreen'
import PendingOrderReminder from 'routes/Account/Subscription/SubscriptionPause/PendingOrderReminder'

describe('Screen', () => {
  afterEach(done => {
    done()
  })
  describe('rendering', () => {
    let wrapper

    test('should render a <ModalPanel>', () => {
      wrapper = shallow(<Screen />)
      expect(wrapper.type()).toBe(ModalPanel)
    })

    test('should pass onGoBack to <ModalPanel> if provided and enableBack is true and pending is false', () => {
      const onGoBack = sinon.spy()
      wrapper = shallow(
        <Screen enableBack onGoBack={onGoBack} pending={false} />,
      )
      expect(wrapper.prop('onGoBack')).toBe(onGoBack)
    })

    test('should NOT pass onGoBack to <ModalPanel> if pending is true', () => {
      const onGoBack = sinon.spy()
      wrapper = shallow(<Screen enableBack onGoBack={onGoBack} pending />)
      expect(wrapper.prop('onGoBack')).toBe(undefined)
    })

    test('should NOT pass onGoBack to <ModalPanel> if enabledBack if false', () => {
      const onGoBack = sinon.spy()
      wrapper = shallow(
        <Screen enableBack={false} onGoBack={onGoBack} pending={false} />,
      )
      expect(wrapper.prop('onGoBack')).toBe(undefined)
    })

    test('should render a <ReasonsScreen> for type "reasonGrid" & spread screenData as props', () => {
      wrapper = shallow(
        <Screen screenData="reasonGrid" screenData={{ a: 2, b: 3 }} />,
      )
      const reasonsScreen = wrapper.find(ReasonsScreen)

      expect(reasonsScreen.length).toBe(1)
      expect(reasonsScreen.prop('a')).toBe(2)
      expect(reasonsScreen.prop('b')).toBe(3)
    })

    test('should render a <ReasonsScreen> for type "reasonList" & spread screenData as props', () => {
      wrapper = shallow(
        <Screen type="reasonList" screenData={{ a: 4, b: 5 }} />,
      )
      const reasonsScreen = wrapper.find(ReasonsScreen)

      expect(reasonsScreen.length).toBe(1)
      expect(reasonsScreen.prop('a')).toBe(4)
      expect(reasonsScreen.prop('b')).toBe(5)
    })

    test('should render a <GenericScreen> for any other type & spread screenData as props', () => {
      wrapper = shallow(
        <Screen type="somethingElse" screenData={{ a: 6, b: 7 }} />,
      )
      const genericScreen = wrapper.find(GenericScreen)

      expect(genericScreen.length).toBe(1)
      expect(genericScreen.prop('a')).toBe(6)
      expect(genericScreen.prop('b')).toBe(7)
    })
    test('should render a <PendingOrderReminder> for any "pausedPendingBoxes" type & spread screenData as props', () => {
      wrapper = shallow(
        <Screen type="pausedPendingBoxes" screenData={{ a: 6, b: 7 }} />,
      )
      const genericScreen = wrapper.find(PendingOrderReminder)

      expect(genericScreen.length).toBe(1)
      expect(genericScreen.prop('a')).toBe(6)
      expect(genericScreen.prop('b')).toBe(7)
    })
    test('should render a title & pretitle if provided', () => {
      const testTitle = 'testTitle'
      const testPreTitle = 'preTitle'
      wrapper = shallow(
        <Screen screenData={{ title: testTitle, preTitle: testPreTitle }} />,
      )
      const preTitleSpan = `.${css.preTitle.split(' ').join('.')}`
      expect(wrapper.find('h1').length).toEqual(1)
      expect(wrapper.find('h1').text()).toEqual(testTitle)
      expect(wrapper.find(preTitleSpan).length).toEqual(1)
      expect(wrapper.find(preTitleSpan).text()).toEqual(testPreTitle)
    })
    test('should not render a title & pretitle if not provided', () => {
      wrapper = shallow(<Screen screenData={{}} />)
      const preTitleSpan = `.${css.preTitle.split(' ').join('.')}`
      expect(wrapper.find('h1').length).toEqual(0)
      expect(wrapper.find(preTitleSpan).length).toEqual(0)
    })
  })
})
