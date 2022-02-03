import React from 'react'
import Immutable from 'immutable'
import Modal from 'Modal'
import * as Redux from 'react-redux'
import { mount, ReactWrapper } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { closeRecipeDetails } from '../../../actions/closeRecipeDetails'
import { DetailContainer } from '../DetailContainer'
import { DetailOverlay } from './DetailOverlay'

jest.mock('../DetailContainer', () => ({
  DetailContainer: jest.fn(() => <div id="DetailContainer" />),
}))

jest.mock('../../../actions/closeRecipeDetails', () => ({
  closeRecipeDetails: jest.fn(),
}))

const mockedStoreContents = {
  menuRecipeDetails: Immutable.fromJS({
    recipeId: '1',
  }),
  basket: Immutable.fromJS({}),
  menuCollections: Immutable.fromJS({}),
  request: Immutable.fromJS({}),
  features: Immutable.fromJS({}),
  recipes: Immutable.fromJS({
    1: {
      id: '1',
      availability: [],
      boxType: 'vegetarian',
      dietType: 'Fish',
    },
    2: {
      id: '2',
      availability: [],
      boxType: 'vegetarian',
      dietType: 'Vegetarian',
    },
    3: { id: '3', availability: [], boxType: 'gourmet', dietType: 'Meat' },
  }),
}
describe('DetailOverlay component', () => {
  describe('when showOverlay is false', () => {
    let wrapper: ReactWrapper

    beforeAll(() => {
      const mockStore = configureMockStore()
      const mockedStore = mockStore(mockedStoreContents)
      const dispatch = jest.fn()
      jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
      wrapper = mount(
        <Provider store={mockedStore}>
          <DetailOverlay showOverlay={false} />
        </Provider>
      )
    })

    afterAll(() => {
      wrapper.unmount()
    })
    describe('when Escape key is pressed', () => {
      it('should not call onCloseOverlay', () => {
        const event = new global.KeyboardEvent('keyup', { keyCode: 27 })
        window.document.dispatchEvent(event)
        expect(closeRecipeDetails).not.toHaveBeenCalled()
      })
    })
  })

  describe('when showOverlay is true', () => {
    let wrapper: ReactWrapper
    afterEach(() => {
      jest.clearAllMocks()
    })

    beforeAll(() => {
      const mockStore = configureMockStore()
      const mockedStore = mockStore(mockedStoreContents)
      const dispatch = jest.fn()
      jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
      wrapper = mount(
        <Provider store={mockedStore}>
          <DetailOverlay showOverlay />
        </Provider>
      )
    })

    afterAll(() => {
      wrapper.unmount()
    })

    describe('when Escape key is pressed', () => {
      it('should call onCloseOverlay', () => {
        const event = new global.KeyboardEvent('keyup', { keyCode: 27 })
        window.document.dispatchEvent(event)
        expect(closeRecipeDetails).toHaveBeenCalled()
      })
    })
  })
  describe('DetailOverlay', () => {
    let wrapper: ReactWrapper

    beforeEach(() => {
      const mockStore = configureMockStore()
      const mockedStore = mockStore(mockedStoreContents)
      const dispatch = jest.fn()
      jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
      wrapper = mount(
        <Provider store={mockedStore}>
          <DetailOverlay showOverlay />
        </Provider>
      )
    })

    afterEach(() => {
      wrapper.unmount()
      jest.clearAllMocks()
    })

    test('should render 1 Overlay', () => {
      expect(wrapper.find(Modal).length).toBe(1)
    })

    test('should render 1 Detail component', () => {
      expect(wrapper.find(DetailContainer).length).toBe(1)
    })

    test('should be closed if showOverlay flag is false', () => {
      const mockStore = configureMockStore()
      const mockedStore = mockStore(mockedStoreContents)
      const dispatch = jest.fn()
      jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
      wrapper = mount(
        <Provider store={mockedStore}>
          <DetailOverlay showOverlay={false} />
        </Provider>
      )
    })
  })
})
