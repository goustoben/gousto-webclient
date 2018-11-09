import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Button from 'Recipe/Buttons'

const AddButton = require('inject-loader?config!Recipe/AddButton')({
  config: {
    menu: {
      stockThreshold: 0,
    },
  },
}).default

describe('<AddButton />', function() {
  let wrapper

  it('should contain one Button component if there is stock and not in basket', function() {
    wrapper = shallow(<AddButton id="1" view="grid" stock={4} inBasket={false} />)

    expect(wrapper.find(Button).length).to.deep.equal(1)
  })

  it('should contain one Button component if there is in stock and in basket', function() {
    wrapper = shallow(<AddButton id="1" view="grid" stock={0} inBasket />)

    expect(wrapper.find(Button).length).to.deep.equal(1)
  })

  it('should NOT contain one Button component if there is no stock and not in basket', function() {
    wrapper = shallow(<AddButton id="1" view="grid" stock={0} inBasket={false} />)

    expect(wrapper.find(Button).length).to.deep.equal(0)
  })

  it('should contain one Button component if there is null stock and not in basket', function() {
    wrapper = shallow(<AddButton id="1" view="grid" stock={null} inBasket={false} />)

    expect(wrapper.find(Button).length).to.deep.equal(1)
  })
})
