import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'

import Values from 'routes/Jobs/Values/Values'
import css from 'routes/Jobs/Values/Values.css'

describe('Values', function() {
  it('should include 1 row of values', function() {
    const wrapper = shallow(<Values />)
    const className = `.${css.valueRow.split(' ').join('.')}`
    expect(wrapper.find(className)).to.have.length(1)
  })
  it('should include 3 headers', function() {
    const wrapper = shallow(<Values />)
    const className = `h1.${css.valueHeader.split(' ').join('.')}`
    expect(wrapper.find(className)).to.have.length(3)
  })
  it('should include 3 blocks of copy', function() {
    const wrapper = shallow(<Values />)
    const className = `p.${css.valueListItem.split(' ').join('.')}`
    expect(wrapper.find(className)).to.have.length(3)
  })
})
