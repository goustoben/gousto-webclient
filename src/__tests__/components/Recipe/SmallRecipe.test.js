import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Title from 'Recipe/Title'
import Image from 'Recipe/Image'
import AddButton from 'Recipe/AddButton'
import DisabledOverlay from 'Recipe/DisabledOverlay'

import SmallRecipe from 'Recipe/SmallRecipe'

describe('<SmallRecipe />', () => {
  let wrapper
  let recipe = Immutable.fromJS({
    id: 1,
    title: 'test',
    rating: {
      count: 1,
      average: 4,
    },
    url: '',
    cookingTime: 1,
    cookingTimeFamily: 1,
    shelfLifeDays: '',
    media: {
      images: [
        {
          urls: [
            {},
            {},
            {
              src: 'test',
            },
          ],
        },
      ],
    },
  })

  beforeEach(() => {
    wrapper = shallow(<SmallRecipe recipe={recipe} />)
  })

  test('should contain one Image component', () => {
    expect(wrapper.find(Image).length).toEqual(1)
  })

  test('should contain one simple Title component', () => {
    expect(wrapper.find(Title).length).toEqual(1)
    expect(wrapper.find(Title).prop('view')).toBe('gridSmall')
  })

  test('should contain one DisabledOverlay component', () => {
    expect(wrapper.find(DisabledOverlay).length).toEqual(1)
  })

  test('should contain one AddButton component', () => {
    expect(wrapper.find(AddButton).length).toEqual(1)
  })
})
