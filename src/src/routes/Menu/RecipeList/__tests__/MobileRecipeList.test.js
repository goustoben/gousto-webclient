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
          recipes={Immutable.fromJS([ {}, {}, {}, {} ])}
          mobileGridView={false}
          showDetailRecipe={() => null}
          thematicName={null}
          isCurrentCollectionRecommendation={false}
          deliveryDate={null}
          collectionFilterChange={() => null}
        />
      )

      expect(wrapper.find(RecipeCardContainer)).toHaveLength(4)
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
