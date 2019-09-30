import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { CookingInstructions } from 'Recipe/CookingInstructions'
import DefaultDetail from 'Recipe/Detail/DefaultDetail'

describe('<DefaultDetail />', () => {
  let wrapper
  let menuRecipeDetailVisibilityChangeSpy

  beforeEach(() => {
    menuRecipeDetailVisibilityChangeSpy = jest.fn()

    wrapper = shallow(<DefaultDetail
      view="detail"
      tag="test"
      media={Immutable.List([{ src: 'src', width: '100' }])}
      title="title"
      count={3}
      average={1}
      per100Grams={Immutable.Map({ id: 1 })}
      perPortion={Immutable.Map({ id: 2 })}
      ingredients={Immutable.List([{}])}
      allergens={Immutable.List(['test'])}
      stock={10}
      inBasket
      id='123'
      useWithin="5 days"
      cookingTime={123}
      cutoffDate="2019-09-01 10:34:23"
      description="amazing recipe"
      youWillNeed={Immutable.List(['spoon', 'fork'])}
      cuisine="Fusion"
      diet="vegetarian"
      equipment={Immutable.List(['spoon', 'mixer'])}
      menuRecipeDetailVisibilityChange={menuRecipeDetailVisibilityChangeSpy}
    />)
  })

  describe('<CookingInstructions />', () => {
    describe('when showCookingInstruction is true', () => {
      test('should contain CookingInstructions in cookingInstructionsDesktop ', () => {
        wrapper.setProps({ showCookingInstruction: true })
        expect(wrapper.find('.cookingInstructionsDesktop').find(CookingInstructions)).toHaveLength(1)
      })
    
      test('should contain CookingInstructions in cookingInstructionsMobile', () => {
        wrapper.setProps({ showCookingInstruction: true })
        expect(wrapper.find('.cookingInstructionsMobile').find(CookingInstructions)).toHaveLength(1)
      })
    })
  
    describe('when showCookingInstruction is false', () => {
      test('should contain CookingInstructions in cookingInstructionsDesktop ', () => {
        expect(wrapper.find('.cookingInstructionsDesktop').find(CookingInstructions).exists()).toBe(false)
      })
    
      test('should contain CookingInstructions in cookingInstructionsMobile', () => {
        expect(wrapper.find('.cookingInstructionsMobile').find(CookingInstructions).exists()).toBe(false)
      })
    })
  })
})
