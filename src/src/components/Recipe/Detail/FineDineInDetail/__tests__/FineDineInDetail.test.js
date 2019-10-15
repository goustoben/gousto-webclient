import React from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import { shallow } from 'enzyme'

import FineDineInDetail from 'Recipe/Detail/FineDineInDetail'
import { CookingInstructions } from 'Recipe/CookingInstructions'
import Nutrition from 'Recipe/Detail/Nutrition'
import { ShortlistButton } from 'Recipe/ShortlistButton'

describe('<FineDineInDetail />', () => {
  const FINE_DINE_IN_DETAIL = (
    <FineDineInDetail 
      allergens={Immutable.List(['allergens'])}
      cuisine='cuisine'
      cookingTime={123}
      dairyFree={false}
      diet='vegetarian'
      equipment={Immutable.List(['spoon, mixer'])}
      id='123'
      ingredients={Immutable.fromJS([{
        allergens:'allergens',
        id:'id',
        label:'label',
        media: { images: [{urls: [{width: 10}]}] },
        name:'name',
        subIngredients:'subIngredients',
      }])}
      per100Grams={Immutable.Map({ 
        carbs: 1,
        carbsSugars: 1,
        energyKj: 1,
        energyKcal: 1,
        fat: 1,
        fatSaturates: 1,
        fibre: 1,
        protein: 1,
        salt: 1,
      })}
      perPortion={Immutable.Map({ 
        carbs: 1,
        carbsSugars: 1,
        energyKj: 1,
        energyKcal: 1,
        fat: 1,
        fatSaturates: 1,
        fibre: 1,
        protein: 1,
        salt: 1,
      })}
      showCookingInstruction={false}
      showShortlistButton={false}
      title='title'
      useWithin='5 days'
      view='detail'
      youWillNeed={Immutable.List(['spoon', 'fork'])}
    />
  )

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(FINE_DINE_IN_DETAIL, div)
  })

  let wrapper

  beforeEach(() => {
    wrapper = shallow(FINE_DINE_IN_DETAIL)
  })

  describe('<Ingredients />', () => {
    describe('when ingredients is not empty', () => {
      beforeEach(() => {
        wrapper.setProps({ 
          ingredients: Immutable.fromJS([{
            allergens:'allergens',
            id:'id',
            label:'label',
            media: { images: [{urls: [{width: 10}]}] },
            name:'name',
            subIngredients:'subIngredients',
          }])
        })
      })

      test('should return the <Ingredients />', () => {
        expect(wrapper.find('Ingredients')).toHaveLength(1)
      })
    })

    describe('when ingredients is empty', () => {
      beforeEach(() => {
        wrapper.setProps({ ingredients: Immutable.fromJS([]) })
      })
      
      test('should not return the <Ingredients />', () => {
        expect(wrapper.find('Ingredients').exists()).toBe(false)
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

  describe('<Nutrition />', () => {
    describe('when perPortion is not empty', () => {
      beforeEach(() => {
        wrapper.setProps({ 
          perPortion: Immutable.Map({ 
            carbs: 1,
            carbsSugars: 1,
            energyKj: 1,
            energyKcal: 1,
            fat: 1,
            fatSaturates: 1,
            fibre: 1,
            protein: 1,
            salt: 1,
          })
        })
      })

      test('should return the <Nutrition />', () => {
        expect(wrapper.find(Nutrition)).toHaveLength(1)
      })
    })

    describe('when perPortion is empty', () => {
      beforeEach(() => { wrapper.setProps({ perPortion: Immutable.fromJS([]) }) })

      test('should not return the <Nutrition />', () => {
        expect(wrapper.find(Nutrition).exists()).toBe(false)
      })
    })
  })

  describe('When allergens is not empty', () => {
    beforeEach(() => {
      wrapper.setProps({ allergens: Immutable.List(['allergens']) })
    })

    test('should return the <IngredientsList />', () => {
      expect(wrapper.find('IngredientsList')).toHaveLength(1)
    })

    test('should return the <Allergens />', () => {
      expect(wrapper.find('Allergens')).toHaveLength(1)
    })
  })

  describe('When ingredients is not empty', () => {
    beforeEach(() => {
      wrapper.setProps({ 
        ingredients: Immutable.fromJS([{
          allergens:'allergens',
          id:'id',
          label:'label',
          media: { images: [{urls: [{width: 10}]}] },
          name:'name',
          subIngredients:'subIngredients',
        }])
      })
    })

    test('should return the <IngredientsList />', () => {
      expect(wrapper.find('IngredientsList')).toHaveLength(1)
    })

    test('should return the <Allergens />', () => {
      expect(wrapper.find('Allergens')).toHaveLength(1)
    })
  })

  describe('When allergens and ingredients is not empty', () => {
    beforeEach(() => {
      wrapper.setProps({ 
        allergens: Immutable.List(['allergens']),
        ingredients: Immutable.fromJS([{
          allergens:'allergens',
          id:'id',
          label:'label',
          media: { images: [{urls: [{width: 10}]}] },
          name:'name',
          subIngredients:'subIngredients',
        }])
      })
    })

    test('should return the <IngredientsList />', () => {
      expect(wrapper.find('IngredientsList')).toHaveLength(1)
    })

    test('should return the <Allergens />', () => {
      expect(wrapper.find('Allergens')).toHaveLength(1)
    })
  })

  describe('When allergens and ingredients is empty', () => {
    beforeEach(() => {
      wrapper.setProps({ 
        allergens: Immutable.List([]),
        ingredients: Immutable.fromJS([])
      })
    })

    test('should not return the <IngredientsList />', () => {
      expect(wrapper.find('IngredientsList').exists()).toBe(false)
    })

    test('should not return the <Allergens />', () => {
      expect(wrapper.find('Allergens').exists()).toBe(false)
    })
  })

  describe('<CookingInstructions />', () => {
    describe('when showCookingInstruction is true', () => {
      beforeEach(() => {
        wrapper.setProps({ showCookingInstruction: true })
      })

      test('should return the <CookingInstructions />', () => {
        expect(wrapper.find(CookingInstructions)).toHaveLength(1)
      })
    })

    describe('when showCookingInstruction is false', () => {
      beforeEach(() => {
        wrapper.setProps({ showCookingInstruction: false })
      })

      test('should not return the <CookingInstructions />', () => {
        expect(wrapper.find(CookingInstructions).exists()).toBe(false)
      })
    })
  })

  describe('<ShortlistButton />', () => {
    describe('when showShortlistButton is true', () => {
      beforeEach(() => {
        wrapper.setProps({ showShortlistButton: true })
      })

      test('should return the <ShortlistButton />', () => {
        expect(wrapper.find(ShortlistButton)).toHaveLength(1)
      })
    })

    describe('when showShortlistButton is false', () => {
      beforeEach(() => {
        wrapper.setProps({ showShortlistButton: false })
      })

      test('should not return the <ShortlistButton />', () => {
        expect(wrapper.find(ShortlistButton).exists()).toBe(false)
      })
    })
  })
})
