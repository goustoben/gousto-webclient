import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { MobileRecipeList } from '../MobileRecipeList'
import { CTACard } from '../CTACard'
import { RecipeCardContainer } from '../RecipeCard'

describe('MobileRecipeList', () => {
  describe('when given 4 recipes', () => {
    test('should render correctly', () => {
      const wrapper = shallow(
        <MobileRecipeList
          recipes={Immutable.List([
            { originalId: '123', recipe: Immutable.fromJS({ id: '123' }) },
            { originalId: '124', recipe: Immutable.fromJS({ id: '124' }) },
            { originalId: '125', recipe: Immutable.fromJS({ id: '125' }) },
            { originalId: '126', recipe: Immutable.fromJS({ id: '126' }) }
          ])}
          thematicName={null}
          isCurrentCollectionRecommendation={false}
          deliveryDate={null}
          collectionFilterChange={() => null}
        />
      )

      expect(wrapper.find(RecipeCardContainer)).toHaveLength(4)
      expect(wrapper.find(RecipeCardContainer).find({ recipeId: '125' }).prop('originalId')).toEqual('125')
    })
  })

  test('should render a CTACard', () => {
    const wrapper = shallow(
      <MobileRecipeList
        recipes={Immutable.fromJS([])}
      />
    )

    expect(wrapper.find(CTACard)).toHaveLength(1)
  })
})
