import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import Svg from 'Svg'
import { RecipeAttribute } from '../RecipeAttribute'

describe('Recipe Attribute', () => {

  test('should return a <div>', () => {
    const wrapper = shallow( <RecipeAttribute name='cookingTime' value={1} /> )

    expect(wrapper.type()).toEqual('div')
  })

  test('should have an SVG and a span as children', () => {
    const wrapper = shallow( <RecipeAttribute name='cookingTime' value={1} /> )

    expect(wrapper.find(Svg).length).toEqual(1)
    expect(wrapper.find('span').length).toEqual(1)
  })

  test('should return null when show is false', () => {
    const wrapper = shallow( <RecipeAttribute name='cookingTime' value={1} show={false} /> )
    expect(wrapper.type()).toEqual(null)
  })

  test('should display the cooking time correctly', () => {
    const wrapper = shallow(<RecipeAttribute name='cookingTime' value={1} />)
    expect( wrapper.find('span').text()).toContain('Takes 1 mins')
  })

  test('should display the use within date formatted correctly with spaces', () => {
    const wrapper = shallow(<RecipeAttribute name='useWithin' value={'5-6'} />)
    expect(wrapper.find('span').text()).toContain('Use within 5 - 6 days')
  })

  test('should display the calorie count correctly', () => {
    const wrapper = shallow(<RecipeAttribute name='cals' value={123} />)
    expect(wrapper.find('span').text()).toContain('123 cals / serving')
  })

  test('should round the calorie count correctly', () => {
    const wrapper = shallow(<RecipeAttribute name='cals' value={123.123} />)
    expect(wrapper.find('span').text()).toContain('123 cals / serving')
  })

  test('should display the cuisine correctly', () => {
    const wrapper = shallow(<RecipeAttribute name='cuisine' value={'Italian'} />)
    expect(wrapper.find('span').text()).toContain('Italian Cuisine')
  })

  test('should display the normal diet types correctly', () => {
    const diets = ['Meat', 'Fish', 'Vegetarian']

    diets.forEach(diet => {
      const wrapper = shallow(<RecipeAttribute name='diet' value={diet} />)
      expect(wrapper.find('span').text()).toContain(diet)
    })
  })

  test('should display the vegan diet type as plant-based', () => {
    const wrapper = shallow(<RecipeAttribute name='diet' value={'vegan'} />)
    expect(wrapper.find('span').text()).toContain('Plant-based')
  })

  test('should display equipment required label without the equipment listed ', () => {
    const wrapper = shallow(<RecipeAttribute name='equipmentRequired' value={Immutable.fromJS(['Spoon', 'Egg Beater'])} />)
    expect(wrapper.find('span').text()).toContain('Equipment required')
  })

  test('should display the equipment in a comma separated list when view="list" ', () => {
    const wrapper = shallow(<RecipeAttribute name='equipmentRequired' value={Immutable.fromJS(['Spoon', 'Egg Beater'])} view={'list'} />)
    expect(wrapper.find('span').text()).toContain('Spoon, Egg Beater')
  })

})
