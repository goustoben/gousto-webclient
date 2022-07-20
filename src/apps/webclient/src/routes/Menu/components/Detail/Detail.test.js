import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'

import { Title } from '../Recipe'
import { RecipeAlternativeOptions } from '../RecipeAlternativeOptions'
import { AttributeGrid } from './AttributeGrid'
import { Detail } from './Detail'
import { DetailAllergenIngredientsContainer } from './DetailAllergenIngredients'
import { DetailContainer } from './DetailContainer'
import { DetailIngredientsContainer } from './DetailIngredients'
import { DetailPerPortionContainer } from './DetailPerPortion'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => '123',
  useDispatch: jest.fn(),
}))

jest.mock('./DetailAddRecipe', () => ({
  DetailAddRecipe: () => <div />,
}))

describe('<Detail />', () => {
  const DETAIL = (
    <Detail
      media={Immutable.fromJS([{ urls: [{ width: 10 }] }])}
      equipment={Immutable.List(['spoon, mixer'])}
      id="123"
      title="title"
      view="detail"
      youWillNeed={Immutable.List(['spoon', 'fork'])}
      isChefPrepared={false}
      count={0}
      average={0}
      stock={100}
      inBasket={false}
      description="Recipe description"
      onClose={() => {}}
    />
  )

  let wrapper

  beforeEach(() => {
    wrapper = shallow(DETAIL)
  })

  test('should render two <Title /> components', () => {
    expect(wrapper.find(Title)).toHaveLength(2)
  })

  test('first <Title /> component should have class containerLG', () => {
    expect(wrapper.find(Title).at(0).hasClass('containerLG')).toBeTruthy()
  })

  test('second <Title /> component should have class containerLG', () => {
    expect(wrapper.find(Title).at(1).hasClass('containerLG')).toBeTruthy()
  })

  describe('when view is "detail"', () => {
    beforeEach(() => {
      wrapper.setProps({ view: 'detail' })
    })

    test('first <Title /> component should have class detailHeading', () => {
      expect(wrapper.find(Title).at(0).hasClass('detailHeading')).toBeTruthy()
    })

    test('second <Title /> component should have class detailHeading', () => {
      expect(wrapper.find(Title).at(1).hasClass('detailHeading')).toBeTruthy()
    })

    test('first <Title /> component should not have class fineDineInDetailHeading', () => {
      expect(wrapper.find(Title).at(0).hasClass('fineDineInDetailHeading')).toBeFalsy()
    })

    test('second <Title /> component should not have class fineDineInDetailHeading', () => {
      expect(wrapper.find(Title).at(1).hasClass('fineDineInDetailHeading')).toBeFalsy()
    })
  })

  describe('when view is "fineDineInDetail"', () => {
    beforeEach(() => {
      wrapper.setProps({ view: 'fineDineInDetail' })
    })

    test('first <Title /> component should have class fineDineInDetailHeading', () => {
      expect(wrapper.find(Title).at(0).hasClass('fineDineInDetailHeading')).toBeTruthy()
    })

    test('second <Title /> component should have class fineDineInDetailHeading', () => {
      expect(wrapper.find(Title).at(1).hasClass('fineDineInDetailHeading')).toBeTruthy()
    })

    test('first <Title /> component should not have class detailHeading', () => {
      expect(wrapper.find(Title).at(0).hasClass('detailHeading')).toBeFalsy()
    })

    test('second <Title /> component should not have class detailHeading', () => {
      expect(wrapper.find(Title).at(1).hasClass('detailHeading')).toBeFalsy()
    })
  })

  test('should render an overlay which calls the onClose function prop on click', () => {
    const onClose = jest.fn()
    wrapper.setProps({ onClose })
    wrapper.find('.modalContainer').simulate('click')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('should contain one recipe disclaimer ', () => {
    expect(wrapper.find('RecipeDisclaimer')).toHaveLength(1)
    expect(wrapper.find('RecipeDisclaimer').prop('recipeId')).toEqual('123')
  })

  describe('Equipment required', () => {
    describe('when equipment is not empty', () => {
      beforeEach(() => {
        wrapper.setProps({ equipment: Immutable.List(['spoon, mixer']) })
      })

      test('should return the equipment required', () => {
        expect(wrapper.text()).toContain('spoon, mixer')
      })
    })

    describe('when equipment is empty', () => {
      beforeEach(() => {
        wrapper.setProps({ equipment: Immutable.List([]) })
      })

      test('should not return the equipment required', () => {
        expect(wrapper.text()).not.toContain('spoon, mixer')
      })
    })
  })

  describe('You will need', () => {
    describe('when youWillNeed is not empty', () => {
      beforeEach(() => {
        wrapper.setProps({ youWillNeed: Immutable.List(['spoon', 'fork']) })
      })

      test('should return the youWillNeed', () => {
        expect(wrapper.text()).toContain('spoon, fork')
      })
    })

    describe('when youWillNeed is empty', () => {
      beforeEach(() => {
        wrapper.setProps({ youWillNeed: Immutable.List([]) })
      })

      test('should not return the youWillNeed', () => {
        expect(wrapper.text()).not.toContain('spoon, fork')
      })
    })
  })

  test('should have an <DetailIngredientsContainer /> with the correct id', () => {
    expect(wrapper.find(DetailIngredientsContainer)).toHaveLength(1)
    expect(wrapper.find(DetailIngredientsContainer).prop('recipeId')).toEqual('123')
  })

  test('should have an <DetailAllergenIngredientsContainer /> with the correct id', () => {
    expect(wrapper.find(DetailAllergenIngredientsContainer)).toHaveLength(1)
    expect(wrapper.find(DetailAllergenIngredientsContainer).prop('recipeId')).toEqual('123')
  })

  test('should have an <DetailPerPortion /> with the correct id', () => {
    expect(wrapper.find(DetailPerPortionContainer)).toHaveLength(1)
    expect(wrapper.find(DetailPerPortionContainer).prop('recipeId')).toEqual('123')
  })

  test('should have an <DetailAttributeGridContainer />', () => {
    expect(wrapper.find(AttributeGrid)).toHaveLength(1)
  })

  test('should have a <RecipeAlternativeOptions /> with correct props', () => {
    expect(wrapper.find(RecipeAlternativeOptions)).toHaveLength(1)
    expect(wrapper.find(RecipeAlternativeOptions).prop('originalId')).toEqual('123')
    expect(wrapper.find(RecipeAlternativeOptions).prop('recipeId')).toEqual('123')
    expect(wrapper.find(RecipeAlternativeOptions).prop('isOnDetailScreen')).toEqual(true)
    expect(wrapper.find(RecipeAlternativeOptions).prop('categoryId')).toEqual('123')
  })

  describe('When isFineDineIn is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isFineDineIn: true })
    })

    test('should render DetailCarousel', () => {
      expect(wrapper.find('DetailCarousel')).toHaveLength(1)
    })
  })
})

describe('DetailContainer', () => {
  let wrapper
  beforeEach(() => {
    const mockStore = configureMockStore()
    const store = mockStore({
      basket: Immutable.fromJS({
        currentMenuId: '377',
      }),
      recipes: Immutable.fromJS({
        123: {
          id: '123',
        },
      }),
    })

    wrapper = shallow(
      <DetailContainer
        media={Immutable.fromJS([{ urls: [{ width: 10 }] }])}
        equipment={Immutable.List(['spoon, mixer'])}
        id="123"
        title="title"
        view="detail"
        youWillNeed={Immutable.List(['spoon', 'fork'])}
        isChefPrepared={false}
        count={0}
        average={0}
        stock={100}
        inBasket={false}
        description="Recipe description"
        store={store}
      />,
    )
  })
  test('should render', () => {
    expect(wrapper.find('Detail')).toBeTruthy()
  })
})
