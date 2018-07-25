import Immutable from 'immutable' /* eslint-disable new-cap */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('processCookies', function() {
	let processCookies
	let cookiePrefix
	let basketPromoCodeChangeSpy
	let basketPostcodeChangePureSpy
	let basketAddressChangeSpy
	let basketChosenAddressChangeSpy
	let basketDateChangeSpy
	let basketSlotChangeSpy
	let basketNumPortionChangeSpy
	let basketRecipeAddSpy
	let basketResetSpy
	let simpleHeaderSpy
	let cookiePolicyAcceptanceChangeSpy
	let storeMock
	let dispatchSpy
	let basketRecipesClear
	let featureSet
	let getStateMock
	let getMock
	let setAffiliateSourceSpy

	let cookiesMock

	beforeEach(function() {
		basketPromoCodeChangeSpy = sinon.stub().returns('return from basketPromoCodeChangeSpy')
		basketPostcodeChangePureSpy = sinon.stub().returns('return from basketPostcodeChangePureSpy')
		basketAddressChangeSpy = sinon.stub().returns('return from basketAddressChangeSpy')
		basketChosenAddressChangeSpy = sinon.stub().returns('return from basketChosenAddressChangeSpy')
		basketDateChangeSpy = sinon.stub().returns('return from basketDateChangeSpy')
		basketSlotChangeSpy = sinon.stub().returns('return from basketSlotChangeSpy')
		basketNumPortionChangeSpy = sinon.stub().returns('return from basketNumPortionChangeSpy')
		basketRecipeAddSpy = sinon.stub().returns('return from basketRecipeAddSpy')
		basketResetSpy = sinon.stub().returns('return from basketResetSpy')
		basketRecipesClear = sinon.stub().returns('return from basketRecipesClear')
		featureSet = sinon.stub().returns('return from featureSet')
		simpleHeaderSpy = sinon.stub().returns('return from simpleHeaderSpy')
		cookiePolicyAcceptanceChangeSpy = sinon.stub().returns('return from cookiePolicyAcceptanceChangeSpy')
		setAffiliateSourceSpy = sinon.stub().returns('return from setAffiliateSourceSpy')
		dispatchSpy = sinon.spy()
		getStateMock = sinon.stub().returns({
			basket: Immutable.fromJS({
				orderId: '',
			}),
		})

		storeMock = {
			dispatch: dispatchSpy,
			getState: getStateMock,
		}

		cookiesMock = Immutable.Map({
			promo_code: '',
			prefix_basket_orderId: '',
			prefix_basket_postcode: '',
			prefix_basket_address: '',
			prefix_basket_date: '',
			prefix_basket_slotId: '',
			prefix_basket_numPortions: '',
			prefix_basket_recipes: '',
			prefix_basket_tracking: '',
		})

		cookiePrefix = 'prefix'

		getMock = (cookies, key) => cookies.get(key)

		processCookies = require('inject-loader?config/storePersistence&actions/basket&actions/features&actions/persist&actions/tracking&actions/cookies&./cookieHelper2!utils/processCookies')({  // eslint-disable-line global-require
			'config/storePersistence': {
				cookiePrefix,
			},
			'actions/basket': {
				basketPromoCodeChange: basketPromoCodeChangeSpy,
				basketPostcodeChangePure: basketPostcodeChangePureSpy,
				basketAddressChange: basketAddressChangeSpy,
				basketChosenAddressChange: basketChosenAddressChangeSpy,
				basketDateChange: basketDateChangeSpy,
				basketSlotChange: basketSlotChangeSpy,
				basketNumPortionChange: basketNumPortionChangeSpy,
				basketRecipeAdd: basketRecipeAddSpy,
				basketReset: basketResetSpy,
				basketRecipesClear,
			},
			'actions/features': {
				featureSet,
			},
			'actions/persist': {
				simpleHeader: simpleHeaderSpy,
			},
			'actions/tracking': {
				setAffiliateSource: setAffiliateSourceSpy,
			},
			'actions/cookies': {
				cookiePolicyAcceptanceChange: cookiePolicyAcceptanceChangeSpy,
			},
			'./cookieHelper2': {
				get: getMock,
			},
		}).default
	})

	it('should not dispatch anything if the cookie store is empty', function() {
		processCookies(cookiesMock, storeMock)

		expect(dispatchSpy).to.have.not.been.called
	})

	describe('with a promo_code cookie set', function() {
		beforeEach(function() {
			cookiesMock = cookiesMock.set('promo_code', 'abc123')
		})

		xit('should dispatch a basketPromoCodeChange action if the promo_code cookie is present', async function() {
			await processCookies(cookiesMock, storeMock)

			expect(basketPromoCodeChangeSpy).to.have.been.calledThrice
			expect(basketPromoCodeChangeSpy.args[0][0]).to.equal('abc123')
			expect(dispatchSpy).to.have.been.calledOnce
			expect(dispatchSpy.args[0][0]).to.equal('return from basketPromoCodeChangeSpy')
		})
	})

	describe('with a from_join cookie set', function() {
		beforeEach(function() {
			cookiesMock = cookiesMock.set('from_join', '{"something": "here"}')
		})

		it('should dispatch simpleHeader action if the from_join cookie is present', function() {
			processCookies(cookiesMock, storeMock)
			expect(simpleHeaderSpy).to.have.been.calledOnce
			expect(simpleHeaderSpy.args[0][0]).to.deep.equal({ something: 'here' })
			expect(dispatchSpy).to.have.been.calledOnce
			expect(dispatchSpy.args[0][0]).to.equal('return from simpleHeaderSpy')
		})
	})

	describe('with a persistent basket orderId cookie set', function() {
		beforeEach(function() {
			cookiesMock = cookiesMock.set('prefix_basket_orderId', '123-123-uuid')
		})

		it('should not dispatch anything', function() {
			processCookies(cookiesMock, storeMock)
			expect(dispatchSpy).to.have.not.been.called
		})

		describe('and a persistent basket postcode cookie set', function() {
			beforeEach(function() {
				cookiesMock = cookiesMock.set('prefix_basket_postcode', 'w37un')
			})

			it('should still not dispatch anything', function() {
				processCookies(cookiesMock, storeMock)
				expect(dispatchSpy).to.have.not.been.called
			})
		})
	})

	describe('with a cookie_policy cookie set', function() {
		beforeEach(function() {
			cookiesMock = cookiesMock.set('cookie_policy', { isAccepted: 'a value' })
		})

		it('should dispatch cookiePolicyAcceptanceChange action if the cookie_policy cookie is present', function() {
			processCookies(cookiesMock, storeMock)
			expect(cookiePolicyAcceptanceChangeSpy).to.have.been.calledOnce
			expect(cookiePolicyAcceptanceChangeSpy.args[0][0]).to.deep.equal('a value')
			expect(dispatchSpy).to.have.been.calledOnce
			expect(dispatchSpy.args[0][0]).to.equal('return from cookiePolicyAcceptanceChangeSpy')
		})
	})

	describe('with an orderId in the basket state', function() {
		beforeEach(function() {
			getStateMock = sinon.stub().returns({
				basket: Immutable.Map({
					orderId: '123-123-uuid',
				}),
			})
			storeMock = {
				dispatch: dispatchSpy,
				getState: getStateMock,
			}
		})

		it('should not dispatch anything', function() {
			processCookies(cookiesMock, storeMock)
			expect(dispatchSpy).to.have.not.been.called
		})

		describe('and a persistent basket postcode cookie set', function() {
			beforeEach(function() {
				cookiesMock = cookiesMock.set('prefix_basket_postcode', 'w37un')
			})

			it('should still not dispatch anything', function() {
				processCookies(cookiesMock, storeMock)
				expect(dispatchSpy).to.have.not.been.called
			})
		})
	})

	describe('with features set in cookie', function() {
		it('should call featureSet once for each feature with key, value, and experiment defaulting to false', function() {
			cookiesMock = cookiesMock.set('prefix_features', '{"featureA": {"value": true}, "featureB": {"value": false}, "featureC": {"value": "some string", "experiment": true}}')
			processCookies(cookiesMock, storeMock)
			expect(featureSet.callCount).to.equal(3)
			expect(featureSet).to.be.calledWithExactly('featureA', true, false)
			expect(featureSet).to.be.calledWithExactly('featureB', false, false)
			expect(featureSet).to.be.calledWithExactly('featureC', 'some string', true)
		})

		it('should handle features in old format set to bool or string', function() {
			cookiesMock = cookiesMock.set('prefix_features', '{"featureA": true, "featureB": false, "featureC": "some string"}')
			processCookies(cookiesMock, storeMock)
			expect(featureSet.callCount).to.equal(3)
			expect(featureSet).to.be.calledWithExactly('featureA', true, false)
			expect(featureSet).to.be.calledWithExactly('featureB', false, false)
			expect(featureSet).to.be.calledWithExactly('featureC', 'some string', false)
		})
	})

	describe('with affiliateSource available', function() {
		it('should dispatch a setAffiliateSource action', function() {
			cookiesMock = cookiesMock.set('prefix_tracking', '{"asource": "testAffiliate"}')
			processCookies(cookiesMock, storeMock)
			expect(setAffiliateSourceSpy).to.have.been.calledOnce
			expect(setAffiliateSourceSpy.args[0][0]).to.equal('testAffiliate')

			expect(dispatchSpy).to.have.been.calledOnce
			expect(dispatchSpy.args[0][0]).to.equal('return from setAffiliateSourceSpy')
		})
	})

	describe('with no persistent basket orderId cookie set', function() {
		describe('and a persistent basket postcode cookie set', function() {
			beforeEach(function() {
				cookiesMock = cookiesMock.set('prefix_basket_postcode', 'w37un')
			})

			it('should dispatch a basketPostcodeChangePure action', function() {
				processCookies(cookiesMock, storeMock)
				expect(basketPostcodeChangePureSpy).to.have.been.calledOnce
				expect(basketPostcodeChangePureSpy.args[0][0]).to.equal('w37un')

				expect(dispatchSpy).to.have.been.calledOnce
				expect(dispatchSpy.args[0][0]).to.equal('return from basketPostcodeChangePureSpy')
			})
		})

		describe('and a persistent basket address cookie set', function() {
			beforeEach(function() {
				cookiesMock = cookiesMock.set('prefix_basket_address', '{"something": "here"}')
			})

			it('should dispatch a basketAddressChange and a basketChosenAddressChange action', function() {
				processCookies(cookiesMock, storeMock)
				expect(basketAddressChangeSpy).to.have.been.calledOnce
				const addr = basketAddressChangeSpy.args[0][0]
				expect(Immutable.is(addr, Immutable.Map({ something: 'here' }))).to.equal(true)

				expect(basketChosenAddressChangeSpy).to.have.been.calledOnce
				const chosenAddr = basketChosenAddressChangeSpy.args[0][0]
				expect(Immutable.is(chosenAddr, Immutable.Map({ something: 'here' }))).to.equal(true)

				expect(dispatchSpy).to.have.been.calledTwice
				expect(dispatchSpy.args[0][0]).to.equal('return from basketAddressChangeSpy')
				expect(dispatchSpy.args[1][0]).to.equal('return from basketChosenAddressChangeSpy')
			})
		})

		describe('and a persistent basket date cookie set', function() {
			beforeEach(function() {
				cookiesMock = cookiesMock.set('prefix_basket_date', '2099-02-01')
			})

			it('should dispatch a basketDateChange action', function() {
				processCookies(cookiesMock, storeMock)
				expect(basketDateChangeSpy).to.have.been.calledOnce
				expect(basketDateChangeSpy.args[0][0]).to.equal('2099-02-01')

				expect(dispatchSpy).to.have.been.calledOnce
				expect(dispatchSpy.args[0][0]).to.equal('return from basketDateChangeSpy')
			})

			describe('and a persistent basket slotId cookie set', function() {
				beforeEach(function() {
					cookiesMock = cookiesMock.set('prefix_basket_slotId', '123-123-uuid')
				})

				it('should dispatch a basketDateChange and a basketSlotChange action', function() {
					processCookies(cookiesMock, storeMock)
					expect(basketDateChangeSpy).to.have.been.calledOnce
					expect(basketDateChangeSpy.args[0][0]).to.equal('2099-02-01')

					expect(basketSlotChangeSpy).to.have.been.calledOnce
					expect(basketSlotChangeSpy.args[0][0]).to.equal('123-123-uuid')

					expect(dispatchSpy).to.have.been.calledTwice
					expect(dispatchSpy.args[0][0]).to.equal('return from basketDateChangeSpy')
					expect(dispatchSpy.args[1][0]).to.equal('return from basketSlotChangeSpy')
				})
			})
		})

		describe('and a persistent basket numPortions cookie set', function() {
			beforeEach(function() {
				cookiesMock = cookiesMock.set('prefix_basket_numPortions', '5')
			})
			it('should dispatch a basketNumPortionChange action', function() {
				processCookies(cookiesMock, storeMock)
				expect(basketNumPortionChangeSpy).to.have.been.calledOnce
				expect(basketNumPortionChangeSpy.args[0][0]).to.equal('5')

				expect(dispatchSpy).to.have.been.calledOnce
				expect(dispatchSpy.args[0][0]).to.equal('return from basketNumPortionChangeSpy')
			})
		})

		describe('and a persistent basket recipes cookie set', function() {
			describe('with no recipes', function() {
				beforeEach(function() {
					cookiesMock = cookiesMock.set('prefix_basket_recipes', '{}')
				})
				it('should not dispatch any actions', function() {
					processCookies(cookiesMock, storeMock)
					expect(dispatchSpy).to.have.not.been.called
				})
			})

			describe('with some recipes', function() {
				beforeEach(function() {
					cookiesMock = cookiesMock.set('prefix_basket_recipes', '{"123": 1, "234": 1, "567": 1}')
				})
				it('should dispatch a basketRecipeAdd action for each recipe ID with the force add parameter set', function() {
					processCookies(cookiesMock, storeMock)

					expect(basketRecipeAddSpy).to.have.been.calledThrice
					expect(basketRecipeAddSpy.args[0][0]).to.equal('123')
					expect(basketRecipeAddSpy.args[0][1]).to.equal(null)
					expect(basketRecipeAddSpy.args[0][2]).to.equal(true)


					expect(basketRecipeAddSpy.args[1][0]).to.equal('234')
					expect(basketRecipeAddSpy.args[1][1]).to.equal(null)
					expect(basketRecipeAddSpy.args[1][2]).to.equal(true)


					expect(basketRecipeAddSpy.args[2][0]).to.equal('567')
					expect(basketRecipeAddSpy.args[2][1]).to.equal(null)
					expect(basketRecipeAddSpy.args[2][2]).to.equal(true)

					expect(basketRecipesClear).to.have.been.calledOnce

					expect(dispatchSpy.callCount).to.equal(4)
					expect(dispatchSpy.args[0][0]).to.equal('return from basketRecipesClear')

					expect(dispatchSpy.args[1][0]).to.equal('return from basketRecipeAddSpy')
					expect(dispatchSpy.args[2][0]).to.equal('return from basketRecipeAddSpy')
					expect(dispatchSpy.args[3][0]).to.equal('return from basketRecipeAddSpy')
				})
			})

			describe('with duplicate recipes', function() {
				beforeEach(function() {
					cookiesMock = cookiesMock.set('prefix_basket_recipes', '{"123": 1, "234": 2, "567": 2}')
				})

				it('should dispatch a basketRecipeAdd action for each number of each recipe ID with the force add parameter set', function() {
					processCookies(cookiesMock, storeMock)

					expect(basketRecipeAddSpy.callCount).to.equal(5)
					expect(basketRecipeAddSpy.args[0][0]).to.equal('123')
					expect(basketRecipeAddSpy.args[0][1]).to.equal(null)
					expect(basketRecipeAddSpy.args[0][2]).to.equal(true)


					expect(basketRecipeAddSpy.args[1][0]).to.equal('234')
					expect(basketRecipeAddSpy.args[1][1]).to.equal(null)
					expect(basketRecipeAddSpy.args[1][2]).to.equal(true)
					expect(basketRecipeAddSpy.args[2][0]).to.equal('234')
					expect(basketRecipeAddSpy.args[2][1]).to.equal(null)
					expect(basketRecipeAddSpy.args[2][2]).to.equal(true)

					expect(basketRecipeAddSpy.args[3][0]).to.equal('567')
					expect(basketRecipeAddSpy.args[3][1]).to.equal(null)
					expect(basketRecipeAddSpy.args[3][2]).to.equal(true)
					expect(basketRecipeAddSpy.args[4][0]).to.equal('567')
					expect(basketRecipeAddSpy.args[4][1]).to.equal(null)
					expect(basketRecipeAddSpy.args[4][2]).to.equal(true)

					expect(basketRecipesClear).to.have.been.calledOnce

					expect(dispatchSpy.callCount).to.equal(6)
					expect(dispatchSpy.args[0][0]).to.equal('return from basketRecipesClear')

					expect(dispatchSpy.args[1][0]).to.equal('return from basketRecipeAddSpy')
					expect(dispatchSpy.args[2][0]).to.equal('return from basketRecipeAddSpy')
					expect(dispatchSpy.args[3][0]).to.equal('return from basketRecipeAddSpy')
					expect(dispatchSpy.args[4][0]).to.equal('return from basketRecipeAddSpy')
					expect(dispatchSpy.args[5][0]).to.equal('return from basketRecipeAddSpy')
				})
			})
		})
	})
})
