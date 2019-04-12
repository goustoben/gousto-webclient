import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

import Overlay from 'Overlay'
import Detail from 'Recipe/Detail'
import DetailOverlay from 'routes/Menu/DetailOverlay/DetailOverlay'

jest.mock('Recipe/Detail')

describe('DetailOverlay', () => {
  let wrapper
  let stock
  let recipesStore
  beforeEach(() => {
    stock = Immutable.fromJS({
      1: { 2: 2 },
      2: { 2: 2 },
      3: { 2: 2 },
    })

    recipesStore = Immutable.fromJS({
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
    })
    wrapper = shallow(
      <DetailOverlay
        showOverlay
        menuRecipeDetailShow={'1'}
        recipesStore={recipesStore}
        numPortions={2}
        stock={stock}
      />
    )

    Detail.mockReturnValue(<div />)

  })

  test('should render 1 Overlay', () => {
    expect(wrapper.find(Overlay).length).toBe(1)
  })

  test('should render 1 Detail component', () => {
    expect(wrapper.find(Detail).length).toBe(1)
  })
})

describe('recipe detail overlay', () => {
  const wrapper = shallow(
    <DetailOverlay
      showOverlay={false}
      menuRecipeDetailShow={'3231'}
      recipesStore={Immutable.Map({})}
      numPortions={2}
      stock={Immutable.Map({})}
    />
  )
  test('should be closed if showOverlay flag is false', () => {
    expect(wrapper.find(Overlay).node.props.open).toBe(false)
  })
})
