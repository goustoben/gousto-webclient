import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { shallow, mount } from 'enzyme'

import Buttons from 'Recipe/Buttons/Buttons'
import { Button, Segment } from 'goustouicomponents'

describe('<Buttons />', function() {
  let qty
  let onAdd
  let onRemove
  let recipeId
  let numPortions
  let limitReached

  beforeEach(function() {
    qty = 0
    recipeId = 1
    numPortions = 2
    limitReached = false
    onAdd = sinon.stub()
    onRemove = sinon.stub()
  })
  afterEach(function(done) {
    done()
  })

  it('should return a <Button>', function() {
    const wrapper = shallow(<Buttons
      onAdd={onAdd}
      onRemove={onRemove}
      numPortions={numPortions}
      limitReached={limitReached}
      qty={qty}
      recipeId={recipeId}
    />)

    expect(wrapper.find(Button).length).to.deep.equal(1)
  })

  it('should return a <Button> with correct static width, fill, and color props', function() {
    const wrapper = shallow(<Buttons
      onAdd={onAdd}
      onRemove={onRemove}
      numPortions={numPortions}
      limitReached={limitReached}
      qty={qty}
      recipeId={recipeId}
    />)

    const button = wrapper.find(Button)

    expect(button.prop('color')).to.equal('primary')
    expect(button.prop('fill')).to.equal(false)
    expect(button.prop('width')).to.equal('full')
  })

  it('should return a <Segment> when qty is 0', function() {
    const wrapper = shallow(<Buttons
      onAdd={onAdd}
      onRemove={onRemove}
      numPortions={numPortions}
      limitReached={limitReached}
      qty={qty}
      recipeId={recipeId}
    />)

    expect(wrapper.find(Segment).length).to.deep.equal(1)
  })

  it('should return 3 <Segment> when qty is greater than 0', function() {
    qty = 2
    const wrapper = shallow(<Buttons
      onAdd={onAdd}
      onRemove={onRemove}
      numPortions={numPortions}
      limitReached={limitReached}
      qty={qty}
      recipeId={recipeId}
    />)

    expect(wrapper.find(Segment).length).to.deep.equal(3)
  })

  it('should call onAdd when a <Button> is clicked with 0 qty value', function() {
    const wrapper = mount(<Buttons
      onAdd={onAdd}
      onRemove={onRemove}
      numPortions={numPortions}
      limitReached={limitReached}
      qty={qty}
      recipeId={recipeId}
    />)
    wrapper.find('div').forEach(node => {
      node.simulate('click')
    })

    expect(onAdd).to.have.been.calledOnce
  })

  it('should NOT call onAdd when a <Button> is clicked with 0 qty and basket limit reached', function() {
    const wrapper = mount(<Buttons
      onAdd={onAdd}
      onRemove={onRemove}
      numPortions={numPortions}
      limitReached
      qty={0}
      recipeId={recipeId}
    />)
    wrapper.find('div').forEach(node => {
      node.simulate('click')
    })

    expect(onAdd).to.have.not.been.called
  })

  it('should NOT call onAdd when a <Button> is clicked with qty > 2 and basket limit reached', function() {
    const wrapper = mount(<Buttons
      onAdd={onAdd}
      onRemove={onRemove}
      numPortions={numPortions}
      limitReached
      qty={2}
      recipeId={recipeId}
    />)
    wrapper.find('div').forEach(node => {
      node.simulate('click')
    })

    expect(onAdd).to.have.not.been.called
  })

  it('should NOT call onAdd when a <Button> is clicked with 0 qty and out of stock', function() {
    const wrapper = mount(<Buttons
      onAdd={onAdd}
      onRemove={onRemove}
      numPortions={numPortions}
      limitReached={false}
      outOfstock
      qty={0}
      recipeId={recipeId}
    />)
    wrapper.find('div').forEach(node => {
      node.simulate('click')
    })

    expect(onAdd).to.have.not.been.called
  })

  it('should NOT call onAdd when a <Button> is clicked with qty > 0 and out of stock', function() {
    const wrapper = mount(<Buttons
      onAdd={onAdd}
      onRemove={onRemove}
      numPortions={numPortions}
      limitReached={false}
      outOfstock
      qty={2}
      recipeId={recipeId}
    />)
    wrapper.find('div').forEach(node => {
      node.simulate('click')
    })

    expect(onAdd).to.have.not.been.called
  })

  it('should call onAdd and onRemove when a <Button> is clicked with qty value', function() {
    qty = 2
    const wrapper = mount(<Buttons
      onAdd={onAdd}
      onRemove={onRemove}
      numPortions={numPortions}
      limitReached={limitReached}
      qty={qty}
      recipeId={recipeId}
    />)
    wrapper.find('div').forEach(node => {
      node.simulate('click')
    })

    expect(onAdd).to.have.been.calledOnce
    expect(onRemove).to.have.been.calledOnce
  })

  it('should call onAdd and onRemove when a <Button> is clicked with qty value', function() {
    qty = 2
    const wrapper = mount(<Buttons
      onAdd={onAdd}
      onRemove={onRemove}
      numPortions={numPortions}
      limitReached={limitReached}
      qty={qty}
      recipeId={recipeId}
    />)
    wrapper.find('div').forEach(node => {
      node.simulate('click')
    })

    expect(onAdd).to.have.been.calledOnce
    expect(onRemove).to.have.been.calledOnce
  })

  it('should display `x Servings Added` with the number of servings if the view is not gridSmall', function() {
    const wrapper = mount(<Buttons
      onAdd={onAdd}
      onRemove={onRemove}
      numPortions={numPortions}
      limitReached={limitReached}
      qty={3}
      recipeId={recipeId}
    />)
    expect(wrapper.find(Segment).at(2).text()).to.equal('6 Servings Added')
  })

  it('should just display display `x` (the number of servings) if the view is gridSmall', function() {
    const wrapper = mount(<Buttons
      onAdd={onAdd}
      onRemove={onRemove}
      numPortions={numPortions}
      limitReached={limitReached}
      qty={3}
      recipeId={recipeId}
      view="gridSmall"
    />)
    expect(wrapper.find(Segment).at(2).text()).to.equal('6')
  })

  it('should not be disabled when stock is null and once cliked should call menuBrowseCTAVisibilityChange - details view', () => {
    const menuBrowseCTAVisibilityChange = sinon.stub()
    const menuRecipeDetailVisibilityChange = sinon.stub()

    const clock = sinon.useFakeTimers()
    const wrapper = mount(
			<Buttons
			  onAdd={onAdd}
			  onRemove={onRemove}
			  numPortions={numPortions}
			  limitReached={limitReached}
			  qty={0}
			  stock={null}
			  recipeId={recipeId}
			  view="detail"
			  menuBrowseCTAVisibilityChange={menuBrowseCTAVisibilityChange}
			  menuRecipeDetailVisibilityChange={menuRecipeDetailVisibilityChange}
			/>
    )

    wrapper.find(Segment).at(1).simulate('click')

    expect(menuRecipeDetailVisibilityChange).to.have.been.calledOnce
    clock.tick(600)
    expect(menuBrowseCTAVisibilityChange).to.have.been.calledOnce
  })

  it('should not be disabled when stock is null and once cliked should call menuBrowseCTAVisibilityChange - grid view', () => {
    const menuBrowseCTAVisibilityChange = sinon.stub()
    const menuRecipeDetailVisibilityChange = sinon.stub()
    const clock = sinon.useFakeTimers()
    const wrapper = mount(
			<Buttons
			  onAdd={onAdd}
			  onRemove={onRemove}
			  numPortions={numPortions}
			  limitReached={limitReached}
			  qty={0}
			  stock={null}
			  recipeId={recipeId}
			  view="grid"
			  menuBrowseCTAVisibilityChange={menuBrowseCTAVisibilityChange}
			  menuRecipeDetailVisibilityChange={menuRecipeDetailVisibilityChange}
			/>
    )

    wrapper.find(Segment).at(1).simulate('click')

    expect(menuBrowseCTAVisibilityChange).to.have.been.calledOnce
    clock.tick(600)
    expect(menuRecipeDetailVisibilityChange).to.have.not.been.called

    clock.restore()
  })
})
