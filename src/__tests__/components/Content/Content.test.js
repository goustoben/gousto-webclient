import React from 'react'
import { shallow } from 'enzyme'
import Content from 'Content'
import Immutable from 'immutable' /* eslint-disable new-cap */
import SectionHeader from 'SectionHeader'

describe('Content', () => {
  let state
  let invalidState
  let wrapper

  beforeEach(() => {
    state = {
      user: Immutable.Map({
        nameFirst: 'Alice',
        message: 'Try our new recipes',
      }),
      content: Immutable.Map({
        welcomeTitleMessage: 'Hey Alice,',
        welcomeMessageMessage: 'Try our new recipes!',
      }),
    }

    invalidState = {
      user: Immutable.Map({}),
      content: Immutable.Map({}),
    }
  })

  describe('for react component', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Content
          contentKeys="welcomeTitleMessage"
          propNames="title"
          state={state}
        >
          <SectionHeader title="Test title" />
        </Content>,
      )
    })

    test('should render one <SectionHeader />', () => {
      expect(wrapper.find(SectionHeader).length).toBe(1)
    })

    test('should set title to "Hey Alice,"', () => {
      expect(wrapper.find(SectionHeader).prop('title')).toBe('Hey Alice,')
    })

    describe('when state is invalid', () => {
      test('should set title to "Test title"', () => {
        wrapper.setProps({ state: invalidState })
        expect(wrapper.find(SectionHeader).prop('title')).toBe('Test title')
      })
    })
  })

  describe('for html container', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Content contentKeys="welcomeMessageMessage" state={state}>
          <p>Test message</p>
        </Content>,
      )
    })

    test('should render one paragraph', () => {
      expect(wrapper.find('p').length).toBe(1)
    })

    test('should set message to "Try our new recipes!"', () => {
      expect(wrapper.find('p').text()).toEqual('Try our new recipes!')
    })

    describe('when state is invalid', () => {
      test('should set message to "Test message"', () => {
        wrapper.setProps({ state: invalidState })
        expect(wrapper.find('p').text()).toEqual('Test message')
      })
    })
  })
})
