// import chai, { expect } from 'chai'
// import sinonChai from 'sinon-chai'
// import sinon from 'sinon'
// chai.use(sinonChai)

// import React from 'react'
// import Immutable from 'immutable' /* eslint-disable new-cap */
// import { shallow } from 'enzyme'
// import SubscriptionPauseImage from 'routes/Account/Subscription/SubscriptionPause/Image'
// import Image from 'Image'

// describe('Subscription Pause Image', function() {
// 	let wrapper

// 	describe('rendering', function() {
// 		it('should render null if no image data provided', function() {
// 			wrapper = shallow(<SubscriptionPauseImage />)
// 			expect(wrapper.type()).to.equal(null)
// 		})

// 		it('should render 1 div with 1 Image if photo or urls provided', function() {
// 			wrapper = shallow(<SubscriptionPauseImage photo="some-photo.jpg" />)
// 			expect(wrapper.type()).to.equal('div')
// 			expect(wrapper.find(Image).length).to.equal(1)

// 			const nextWrapper = shallow(<SubscriptionPauseImage urls={[]} />)
// 			expect(nextWrapper.type()).to.equal('div')
// 			expect(nextWrapper.find(Image).length).to.equal(1)
// 		})

// 		it('should deeply convert urls to an Immutable List', function() {
// 			wrapper = shallow(
// 				<SubscriptionPauseImage
// 					urls={[
// 						{ src: 'test1.png', width: '100' },
// 					]}
// 				/>
// 			)

// 			const expectedMedia = Immutable.fromJS([
// 				{ src: 'test1.png', width: '100' },
// 			])
// 			expect(Immutable.is(wrapper.find(Image).prop('media'), expectedMedia)).to.equal(true)
// 		})

// 		it('should log warning if photo not found', function() {
// 			const warning = sinon.stub()

// 			const SubscriptionPauseReasonInjected = require('inject-loader?utils/logger!routes/Account/Subscription/SubscriptionPause/Image/Image')({
// 				'utils/logger': { warning },
// 			}).default

// 			wrapper = shallow(<SubscriptionPauseReasonInjected photo="some-nonexistant-photo.jpg" />)

// 			expect(warning.getCall(0).args[0]).to.equal('Subscription pause image "some-nonexistant-photo.jpg" not found in photos')
// 		})
// 	})
// })
