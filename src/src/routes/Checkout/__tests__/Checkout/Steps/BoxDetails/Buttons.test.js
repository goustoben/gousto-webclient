import sinon from 'sinon'

import React from 'react'
import { shallow, mount } from 'enzyme'
import Buttons from 'routes/Checkout/Components/RecipeSummary/Buttons/Buttons'

describe('<Buttons />', () => {
  let qty
  let onAdd
  let onRemove
  let recipeId
  let numPortions
  let limitReached
  let wrapper

  beforeEach(() => {
    qty = 0
    recipeId = 1
    numPortions = 2
    limitReached = false
    onAdd = sinon.spy()
    onRemove = sinon.spy()
    wrapper = shallow(
      <Buttons
        onAdd={onAdd}
        onRemove={onRemove}
        numPortions={numPortions}
        limitReached={limitReached}
        qty={qty}
        recipeId={recipeId}
        showControl
      />,
    )
  })
  afterEach(done => {
    done()
  })

  describe('rendering', () => {
    test('should return a <Button>', () => {
      expect(wrapper.find('Button').length).toEqual(1)
    })

    test('should return a <Button> with correct static width and color props', () => {
      const button = wrapper.find('Button')

      expect(button.prop('color')).toEqual('primary')
      expect(button.prop('fill')).toEqual(true)
      expect(button.prop('width')).toEqual('auto')
    })

    test('should return 1 <Segment> when qty is greater than 0 when showControl is false', () => {
      wrapper = shallow(
        <Buttons
          onAdd={onAdd}
          onRemove={onRemove}
          numPortions={numPortions}
          limitReached={limitReached}
          qty={2}
          recipeId={recipeId}
          showControl={false}
        />,
      )

      expect(wrapper.find('Segment').length).toEqual(1)
    })

    test('should return 3 <Segment> when qty is greater than 0 when showControl is true', () => {
      wrapper = shallow(
        <Buttons
          onAdd={onAdd}
          onRemove={onRemove}
          numPortions={numPortions}
          limitReached={limitReached}
          qty={2}
          recipeId={recipeId}
          showControl
        />,
      )

      expect(wrapper.find('Segment').length).toEqual(3)
    })
  })

  describe('onAdd and onRemove control', () => {
    test('should NOT call onAdd when a <Button> is clicked with qty > 2 and basket limit reached', () => {
      wrapper = mount(
        <Buttons
          onAdd={onAdd}
          onRemove={onRemove}
          numPortions={numPortions}
          limitReached
          qty={2}
          recipeId={recipeId}
          showControl
        />,
      )

      expect(onAdd.called).not.toBe(true)
    })

    test('should NOT call onAdd when a <Button> is clicked with qty > 0 and out of stock', () => {
      wrapper = mount(
        <Buttons
          onAdd={onAdd}
          onRemove={onRemove}
          numPortions={numPortions}
          limitReached={false}
          outOfstock
          qty={2}
          recipeId={recipeId}
          showControl
        />,
      )
      wrapper.find('Button').forEach(node => {
        node.simulate('click')
      })

      expect(onAdd.called).not.toBe(true)
    })

    test('should call onAdd and onRemove when a <Button> is clicked with qty value', () => {
      wrapper = mount(
        <Buttons
          onAdd={onAdd}
          onRemove={onRemove}
          numPortions={numPortions}
          limitReached={limitReached}
          qty={2}
          recipeId={recipeId}
          showControl
        />,
      )
      wrapper.find('div').forEach(node => {
        node.simulate('click')
      })

      expect(onRemove.calledOnce).toBe(true)
    })

    test('should call only onAdd when a <Button> is clicked with qty value 1', () => {
      wrapper = mount(
        <Buttons
          onAdd={onAdd}
          onRemove={onRemove}
          numPortions={numPortions}
          limitReached={limitReached}
          qty={1}
          recipeId={recipeId}
          showControl
        />,
      )
      wrapper.find('Button').forEach(node => {
        node.simulate('click')
      })

      expect(onRemove.called).toBe(false)
    })
  })
})
