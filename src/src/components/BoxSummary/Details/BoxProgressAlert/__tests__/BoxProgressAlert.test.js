import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import config from 'config/basket'
import BoxProgressAlert from '../BoxProgressAlert'

describe('<BoxProgressAlert', () => {
  test('renders without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
      <BoxProgressAlert numRecipes={0} />,
      div
    )
  })

  describe('when mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<BoxProgressAlert numRecipes={0} />)
    })

    test('renders a progress message', () => {
      expect(wrapper.find('BoxProgressMessage')).toHaveLength(1)
    })

    test('wraps an Alert within a data-testing container', () => {
      expect(wrapper.find('Alert').parent().prop('data-testing')).toBe('boxProgressAlert')
    })

    describe('and fewer than the maximum number of recipes are selected', () => {
      test('renders an info alert', () => {
        expect(wrapper.find('Alert').prop('type')).toBe('info')
      })
    })

    describe('and the maximum number of recipes are selected', () => {
      beforeEach(() => {
        wrapper.setProps({ numRecipes: config.maxRecipesNum })
      })

      test('renders a success alert', () => {
        expect(wrapper.find('Alert').prop('type')).toBe('success')
      })
    })
  })
})
