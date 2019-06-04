import React from 'react'
import ReactDOM from 'react-dom'
import { mount, shallow } from 'enzyme'
import Buttons from 'Recipe/Buttons/Buttons'

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
    outOfstock: false,
    disable: false,
    stock: 1000,
    menuBrowseCTAVisibilityChange: jest.fn(),
    menuRecipeDetailVisibilityChange: jest.fn(),
    surchargePerPortion: null,
    score: null,
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
        expect(childrenText).toBe('Add Recipe')
      })

      describe('and the recipe has a surcharge', () => {
        beforeEach(() => {
          wrapper.setProps({ surchargePerPortion: 2.99 })
        })

        test('renders a Surcharge component', () => {
          expect(wrapper.find('Surcharge')).toHaveLength(1)
        })

        test('shows the add recipe text', () => {
          const segmentChildren = wrapper.find('Segment').prop('children')
          const childrenText = segmentChildren.slice(0, 2).join('')
          expect(childrenText).toBe('Add Recipe')
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

      describe('and viewing on a small grid view', () => {
        beforeEach(() => {
          wrapper.setProps({ view: 'gridSmall '})
        })

        test('shows only the number of servings when on small grid view', () => {
          wrapper.setProps({ view: 'gridSmall' })
          expect(wrapper.find('Segment').at(1).prop('children')[0]).toBe(totalPortions.toString())
        })
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
          wrapper.setProps({ outOfstock: true })
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
                false,
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
                false,
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
