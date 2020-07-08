import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { ThreeColumnRecipeList } from '../ThreeColumnRecipeList'
import { CTACard } from '../CTACard'
import { RecipeTileContainer } from '../../Recipe'

describe('ThreeColumnRecipeList', () => {
  describe('when given 4 recipes', () => {
    test('should render 4 recipes', () => {
      const wrapper = shallow(
        <ThreeColumnRecipeList
          recipes={Immutable.List([
            { originalId: '123', recipe: Immutable.fromJS({ id: '123' }) },
            { originalId: '124', recipe: Immutable.fromJS({ id: '124' }) },
            { originalId: '125', recipe: Immutable.fromJS({ id: '125' }) },
            { originalId: '126', recipe: Immutable.fromJS({ id: '126' }) }
          ])}
          thematicName={null}
          isCurrentCollectionRecommendation={false}
          deliveryDate={null}
        />
      )

      expect(wrapper.find(RecipeTileContainer)).toHaveLength(4)
      expect(wrapper.find(RecipeTileContainer).find({ recipeId: '125' }).prop('originalId')).toEqual('125')
    })
  })

  test('should render a CTACard', () => {
    const wrapper = shallow(
      <ThreeColumnRecipeList
        recipes={Immutable.fromJS([])}
      />
    )

    expect(wrapper.find(CTACard)).toHaveLength(1)
  })
})
