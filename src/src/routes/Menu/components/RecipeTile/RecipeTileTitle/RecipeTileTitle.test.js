import React from 'react'
import { shallow } from 'enzyme'
import { RecipeTileTitle } from './RecipeTileTitle'
import css from './RecipeTileTitle.css'

describe('RecipeTileTitle', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<RecipeTileTitle title="Steak and Chips" />)
  })

  test('shound render correctly', () => {
    expect(wrapper.equals(<h2 className={css.recipeTileTitle}>Steak and Chips</h2>)).toEqual(true)
  })
})
