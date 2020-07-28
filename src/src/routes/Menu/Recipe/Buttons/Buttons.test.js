import React from 'react'
import ReactDOM from 'react-dom'
import { mount, shallow } from 'enzyme'
import Immutable from 'immutable'
import Buttons from 'routes/Menu/Recipe/Buttons/Buttons'
import ButtonsContainer from '.'

describe('the Buttons component', () => {
  let wrapper
  const buttonsProps = {
    onAdd: jest.fn(),
    onRemove: jest.fn(),
    limitReached: false,
    recipeId: '12345',
    position: 10,
    qty: 0,
    numPortions: 2,
    view: 'grid',
    isOutOfStock: false,
    disable: false,
    stock: 1000,
    menuBrowseCTAVisibilityChange: jest.fn(),
    menuRecipeDetailVisibilityChange: jest.fn(),
    surchargePerPortion: null,
    score: null,
    basketPostcode: 'W3'
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Buttons {...buttonsProps} />, div)
  })

  describe('the appearance', () => {
    beforeEach(() => {
      wrapper = shallow(<Buttons {...buttonsProps} />)
    })

    test('renders a single Button', () => {
      expect(wrapper.find('Button')).toHaveLength(1)
    })

    describe('when the recipe is not selected', () => {
      test('renders 1 Segment', () => {
        expect(wrapper.find('Segment')).toHaveLength(1)
      })

      test('shows the add recipe text', () => {
        const childrenText = wrapper.find('Segment').prop('children').join('')
        expect(childrenText).toBe('Add recipe')
      })

      test('does not have the class for surcharge recipes in grid view', () => {
        expect(wrapper.find('Segment').hasClass('segment')).toBe(false)
      })

      describe('and the recipe has a surcharge', () => {
        beforeEach(() => {
          wrapper.setProps({ surchargePerPortion: 2.99 })
        })

        test('renders a Surcharge component', () => {
          expect(wrapper.find('Surcharge')).toHaveLength(1)
        })

        test('shows the add recipe text', () => {
          expect(wrapper.find('Segment').contains('Add recipe')).toBe(true)
        })

        test('has the classes for surcharge recipes in grid view', () => {
          expect(wrapper.find('Segment').hasClass('segment')).toBe(true)
          expect(wrapper.find('Segment').find('div').hasClass('surchargeWrapped surcharge')).toBe(true)
        })

        describe('when viewing the recipe in detail', () => {
          beforeEach(() => {
            wrapper.setProps({ view: 'detail'})
          })

          test('does not have the classes for surcharge recipes in grid view', () => {
            expect(wrapper.find('Segment').hasClass('segment')).toBe(false)
            expect(wrapper.find('Segment').find('div').hasClass('surchargeWrapped surcharge')).toBe(false)
          })
        })
      })

      describe('and the basket limit has been reached', () => {
        beforeEach(() => {
          wrapper.setProps({ limitReached: true })
        })

        test('the button is disabled', () => {
          expect(wrapper.find('Segment').prop('disabled')).toBe(true)
        })

        test('shows the correct tooltip', () => {
          expect(wrapper.find('Tooltip').prop('message')).toBe('You\'ve run out of space in your box!')
          wrapper.find('Tooltip').props().onVisibleChange(true)
          wrapper.update()
          expect(wrapper.find('Tooltip').prop('visible')).toBe(true)
        })
      })
    })

    describe('when the the recipe is already selected', () => {
      const newQty = 2
      const numPortions = 4
      const totalPortions = newQty * numPortions
      const longMessage = `${totalPortions} Servings Added`
      const shortMessage = `${totalPortions} Added`

      beforeEach(() => {
        wrapper.setProps({
          qty: newQty,
          numPortions
        })
      })

      test('renders 3 Segments', () => {
        expect(wrapper.find('Segment')).toHaveLength(3)
      })

      test('renders two Controls', () => {
        expect(wrapper.find('Control').first().prop('children')).toBe('-')
        expect(wrapper.find('Control').last().prop('children')).toBe('+')
      })

      test('shows how many servings have been added', () => {
        expect(wrapper.find('Segment').at(1).prop('children')[0]).toBe(longMessage)
      })

      test('should not have the classes for surcharge recipes in grid view', () => {
        wrapper.find('Segment').forEach(segment => expect(segment.hasClass('segmentSelected')).toBe(false))
      })

      describe('and the selected recipe has a surcharge', () => {
        beforeEach(() => {
          wrapper.setProps({ surchargePerPortion: 2.99 })
        })

        test('renders a Surcharge component', () => {
          expect(wrapper.find('Surcharge')).toHaveLength(1)
        })

        test('shows how many servings have been added', () => {
          expect(wrapper.find('Segment').at(1).prop('children')[0]).toBe(shortMessage)
        })

        test('has the classes for surcharge recipes in grid view', () => {
          wrapper.find('Segment').forEach(segment => expect(segment.hasClass('segmentSelected')).toBe(true))
          expect(wrapper.find('Segment').find('div').hasClass('surchargeHidden surcharge')).toBe(true)
        })

        describe('when viewing the recipe in detail', () => {
          beforeEach(() => {
            wrapper.setProps({ view: 'detail'})
          })

          test('does not have the classes for surcharge recipes in grid view', () => {
            wrapper.find('Segment').forEach(segment => expect(segment.hasClass('segmentSelected')).toBe(false))
            expect(wrapper.find('Segment').find('div').hasClass('surchargeHidden surcharge')).toBe(false)
          })
        })
      })

      describe('and the basket limit has been reached', () => {
        beforeEach(() => {
          wrapper.setProps({ limitReached: true })
        })

        test('shows the add button as disabled', () => {
          expect(wrapper.find('Segment').at(2).prop('disabled')).toBe(true)
        })

        test('shows the correct tooltip over the add button', () => {
          expect(wrapper.find('Tooltip').prop('message')).toBe('You\'ve run out of space in your box!')
          wrapper.find('Tooltip').props().onVisibleChange(true)
          wrapper.update()
          expect(wrapper.find('Tooltip').prop('visible')).toBe(true)
        })
      })

      describe('and the recipe is out of stock', () => {
        beforeEach(() => {
          wrapper.setProps({ isOutOfStock: true })
        })

        test('shows the add button as disabled', () => {
          expect(wrapper.find('Segment').last().prop('disabled')).toBe(true)
        })

        test('shows the correct tooltip over the add button', () => {
          expect(wrapper.find('Tooltip').prop('message')).toBe('You got the last one')
          wrapper.find('Tooltip').props().onVisibleChange(true)
          wrapper.update()
          expect(wrapper.find('Tooltip').prop('visible')).toBe(true)
        })
      })
    })
  })

  describe('the functionality', () => {
    const { recipeId, view, position, score, onAdd, onRemove } = buttonsProps

    beforeEach(() => {
      wrapper = mount(<Buttons {...buttonsProps} />)
    })

    describe('when the recipe is not selected', () => {
      let buttonContent

      beforeEach(() => {
        buttonContent = wrapper.find('Tooltip').find('Segment')
      })

      describe('and the stock is not null', () => {
        describe('and the disable prop is false', () => {
          describe('and clicking to adding a recipe', () => {
            beforeEach(() => {
              buttonContent.simulate('click')
            })

            test('adds the recipe', () => {
              expect(onAdd).toHaveBeenCalledWith(
                recipeId,
                view,
                { position, score }
              )
            })
          })
        })

        describe('and the disable prop is true', () => {
          beforeEach(() => {
            wrapper.setProps({ disable: true })
          })

          describe('and clicking to add a recipe', () => {
            beforeEach(() => {
              buttonContent.simulate('click')
            })

            test('recipe is not added', () => {
              expect(onAdd).not.toHaveBeenCalled()
            })
          })
        })
      })

      describe('and the stock is null', () => {
        beforeEach(() => {
          wrapper.setProps({ stock: null })
        })

        describe('and clicking to add a recipe', () => {
          beforeEach(() => {
            buttonContent.simulate('click')
          })

          test('does not add the recipe', () => {
            expect(onAdd).not.toHaveBeenCalled()
          })
        })
      })

      describe('given postcode is empty', () => {
        const menuBrowseCTAVisibilityChangeSpy = jest.fn()
        beforeEach(() => {
          const newButtonProps = {
            ...buttonsProps,
            menuBrowseCTAVisibilityChange: menuBrowseCTAVisibilityChangeSpy,
            basketPostcode: ''
          }
          wrapper = mount(<Buttons {...newButtonProps} />)
          buttonContent = wrapper.find('Tooltip').find('Segment')
          buttonContent.simulate('click')
        })
        test('should call menuBrowseCTAVisibilityChange', () => {
          expect(menuBrowseCTAVisibilityChangeSpy).toHaveBeenCalled()
        })
      })
    })

    describe('when the recipe is already selected', () => {
      let segmentAdd
      let segmentRemove

      beforeEach(() => {
        wrapper.setProps({ qty: 2})
        segmentRemove = wrapper.find('Segment').at(1)
        segmentAdd = wrapper.find('Segment').at(3)
      })

      describe('and the button is not disable', () => {
        describe('and stock is not null', () => {
          describe('and clicking to add a recipe', () => {
            beforeEach(() => {
              segmentAdd.simulate('click')
            })

            test('adds the recipe', () => {
              expect(onAdd).toHaveBeenCalledWith(
                recipeId,
                view,
                { position, score }
              )
            })
          })

          describe('and clicking to remove a recipe', () => {
            beforeEach(() => {
              segmentRemove.simulate('click')
            })
            test('removes the recipe', () => {
              expect(onRemove).toHaveBeenCalledWith(
                recipeId,
                view,
                position,
                score
              )
            })
          })
        })

        describe('and stock is null', () => {
          beforeEach(() => {
            wrapper.setProps({ stock: null })
          })

          describe('and clicking to add a recipe', () => {
            beforeEach(() => {
              segmentAdd.simulate('click')
            })

            test('recipe is not added', () => {
              expect(onAdd).not.toHaveBeenCalled()
            })
          })

          describe('and clicking to remove a recipe', () => {
            beforeEach(() => {
              segmentRemove.simulate('click')
            })

            test('removes the recipe', () => {
              expect(onRemove).toHaveBeenCalledWith(
                recipeId,
                view,
                position,
                score
              )
            })
          })
        })
      })

      describe('and the disable prop is true', () => {
        beforeEach(() => {
          wrapper.setProps({ disable: true })
        })

        describe('and clicking to add a recipe', () => {
          beforeEach(() => {
            segmentAdd.simulate('click')
          })

          test('recipe is not added', () => {
            expect(onAdd).not.toHaveBeenCalled()
          })
        })

        describe('and clicking to remove a recipe', () => {
          beforeEach(() => {
            segmentRemove.simulate('click')
          })

          test('removes the recipe', () => {
            expect(onRemove).toHaveBeenCalledWith(
              recipeId,
              view,
              position,
              score
            )
          })
        })
      })
    })
  })
})

describe('ButtonsContainer', () => {
  let state
  let wrapper
  beforeEach(() => {
    state = {
      auth: Immutable.fromJS({
        isAdmin: false
      }),
      basket: Immutable.fromJS({
        numPortions: 2
      }),
      recipes: Immutable.fromJS({
        1: {
          meals: [{
            numPortions: 2,
            surcharge: null
          }]
        }
      }),
      menuRecipeStock: Immutable.fromJS({
        1: {
          2: 1000
        }
      })
    }

    wrapper = shallow(<ButtonsContainer recipeId="1" />, {
      context: {
        store: {
          getState: () => state,
          dispatch: () => {},
          subscribe: () => {}
        }
      }
    })
  })

  test('should render Buttons component', () => {
    expect(wrapper.find('Buttons')).toHaveLength(1)
  })
})
