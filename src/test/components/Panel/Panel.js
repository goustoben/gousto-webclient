import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'

import Svg from 'Svg'
import Panel from 'components/Guide/Panel'

describe('Panel', function () {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<Panel />)
  })

  it('should return a div with no props', function () {
    expect(wrapper.type()).to.equal('div')
  })

  describe('props', function () {

    beforeEach(function() {
      wrapper = shallow(<Panel title="title--test" description="description--test" />)
    })

    it('should see an img NOT SVG', function () {
      expect(wrapper.find('img')).to.have.length(1)
      expect(wrapper.find('Svg')).to.have.length(0)
    })

    it('title and description', function () {
      expect(wrapper.text()).contains('title--test')
      expect(wrapper.text()).contains('description--test')
    })

    it('should see a SVG NOT img', function () {
      wrapper = shallow(<Panel graphicType="svg" />)
      expect(wrapper.find('img')).to.have.length(0)
      expect(wrapper.find('Svg')).to.have.length(1)
    })
  })

})
