import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { Ingredient } from '../Ingredient'

const INGREDIENT = {
  ingredientUuid: '3c07d126-f655-437c-aa1d-c38dbbae0398',
  label: '8ml soy sauce',
  srcSet: 'ingredient-soy-image-url 50w',
}

describe('Ingredient', () => {
  let wrapper
  let image
  beforeAll(() => {
    wrapper = mount(
      <Ingredient
        srcSet={INGREDIENT.srcSet}
        label={INGREDIENT.label}
      />)

    image = wrapper.find('.ingredientImage')
  })

  test('renders image with srcset for the ingredient', () => {
    expect(image.prop('srcSet')).toEqual(INGREDIENT.srcSet)
  })

  test('renders label for the ingredient', () => {
    const label = wrapper.find('.ingredientLabel')
    expect(label.text()).toBe(INGREDIENT.label)
  })

  test('renders image with alt for the ingredient', () => {
    expect(image.prop('alt')).toEqual(INGREDIENT.label)
  })

  describe('when image triggers onError', () => {
    beforeEach(() => {
      act(() => {
        wrapper.find('.ingredientImage').prop('onError')()
      })
      wrapper.update()
      image = wrapper.find('.ingredientImage')
    })

    test('renders image with placeholder srcset', () => {
      expect(image.prop('srcSet')).toEqual('recipe-placeholder.png')
    })
  })
})
