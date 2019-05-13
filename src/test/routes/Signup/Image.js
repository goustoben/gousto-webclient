// import chai, { expect } from 'chai'
// import sinon from 'sinon'
// import sinonChai from 'sinon-chai'
// chai.use(sinonChai)

// import React from 'react'
// import { shallow } from 'enzyme'

// describe('Signup/Image', function() {
//   let imageName
//   let Image
//   beforeEach(function() {
//     imageName = 'food'
//     const inject = {}
//     inject[`media/photos/${imageName}.jpg`] = 'food-image-url.jpg'
//     Image = require('inject-loader!routes/Signup/Image/Image')(inject).default
//   })

//   it('should inject the url of the given file name into the backgroundImage of the div', function() {
//     const wrapper = shallow(<Image name={imageName} />)
//     expect(wrapper.type()).to.equal('div')
//     expect(wrapper.prop('style')).to.deep.equal({ backgroundImage: 'url(food-image-url.jpg)' })
//   })
// })
