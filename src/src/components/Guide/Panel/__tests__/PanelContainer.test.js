import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { PanelContainer } from '../PanelContainer'

describe('PanelContainer', () => {
  let wrapper
  const initialState = {
    features: Immutable.Map({
      isHomePageRedesignEnabled: Immutable.fromJS({
        value: false
      }),
    }),
  }
  const store = {
    getState: jest.fn(() => initialState),
    dispatch: jest.fn(),
    subscribe: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<PanelContainer store={store} />)
  })

  describe('Given initialState to PanelContainer component', () => {
    describe('When its rendered', () => {
      test('Then should be rendered with properly', () => {
        const expected = {
          title: [],
          description: '',
          graphicType: 'img',
          isHomePageRedesignEnabled: false,
        }
        const renderedHTML = wrapper.dive()
        expect(renderedHTML.exists('.title')).toBeTruthy()
        expect(renderedHTML.exists('.titleRedesign')).toBeFalsy()
        expect(wrapper.props()).toEqual(expect.objectContaining(expected))
      })
    })
  })

  describe('Given state updates', () => {
    describe('When its rendered', () => {
      beforeEach(() => {
        store.getState.mockReturnValue({
          ...initialState,
          features: Immutable.Map({
            isHomePageRedesignEnabled: Immutable.fromJS({
              value: true
            }),
          }),
        })
        wrapper = shallow(<PanelContainer store={store} />)
      })

      test('Then should be rendered with the updated properties', () => {
        const title = 'Panel title'
        const description = 'description goes here...'
        const expected = {
          title,
          description,
          isHomePageRedesignEnabled: true,
        }
        wrapper.setProps({
          title,
          description,
        })
        const renderedHTML = wrapper.dive()
        expect(renderedHTML.exists('.title')).toBeFalsy()
        expect(renderedHTML.exists('.titleRedesign')).toBeTruthy()
        expect(wrapper.props()).toEqual(expect.objectContaining(expected))
      })
    })
  })
})
